# API設計

> **Note**: Route Handlers の詳細な仕様は `api-openapi.yaml` (OpenAPI 3.0形式) も参照してください。
> 本ドキュメントは Next.js App Router のデータアクセスパターン全体を設計対象としています。

---

## 1. 基本方針

### 1.1 データアクセスパターンの使い分け

Next.js App Router では、従来の REST API 一本ではなく、3 つのデータアクセスパターンを目的に応じて使い分ける。

| パターン | 用途 | 例 |
|---------|------|-----|
| **Server Actions** | データの変更（Create / Update / Delete） | 訪問記録の作成、お気に入り追加 |
| **Route Handlers** | 外部向け JSON API、OAuth コールバック | オフラインキャッシュ用 stations API |
| **Server Components 直接データ取得** | ページ表示時のデータ読み込み（SSG/ISR/SSR） | 道の駅一覧、マイページ |

#### 判断フローチャート

```
データの変更（CUD）か？
  ├── Yes → Server Actions（lib/actions/）
  └── No（読み取りのみ）
        ├── 外部からの JSON API アクセスが必要か？
        │     ├── Yes → Route Handlers（app/api/）
        │     └── No → Server Components で直接データ取得（lib/db/queries/）
        └── OAuth コールバック等の特殊処理
              └── Route Handlers（app/api/）
```

### 1.2 Supabase Client の使用パターン

| コンテキスト | Client 種別 | 用途 |
|-------------|------------|------|
| Server Components / Server Actions / Route Handlers | `createServerClient` (`@supabase/ssr`) | DB クエリ、認証チェック |
| Client Components | `createBrowserClient` (`@supabase/ssr`) | リアルタイム通信、クライアント側認証状態の取得 |
| Middleware | `createServerClient` (`@supabase/ssr`) | 認証セッションのリフレッシュ |

```typescript
// lib/supabase/server.ts - サーバー側クライアント
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

### 1.3 バリデーション方針

- 全ての Server Actions の入力は **Zod スキーマ** で検証する
- クライアント側のバリデーションは UX 向上目的のみ。サーバー側バリデーションを省略しない
- Zod スキーマは `lib/validations/` に集約し、Server Actions とクライアントの両方から参照可能にする

### 1.4 認証チェック方針

- データ変更を伴う Server Actions は全て認証チェックを行う
- 認証チェックには `supabase.auth.getUser()` を使用する（`getSession()` はトークン検証が不十分なため使わない）
- 未認証時は `{ error: 'Unauthorized' }` を返す（例外をスローしない）

### 1.5 命名規則（snake_case / camelCase 変換方針）

> **設計メモ**: DB のカラム名は snake_case、TypeScript の型定義は camelCase を使用する。データ取得関数（`lib/db/queries/`）内で snake_case → camelCase のマッピングを行い、アプリケーション層以上では常に camelCase で扱う。
>
> `facilities` JSONB カラムについても同様に、DB 内は snake_case（`ev_charger`, `baby_room`, `handicap_toilet` 等）で保存し、TypeScript 型では camelCase（`evCharger`, `babyRoom`, `handicapToilet`）に変換する。変換はデータ取得関数内のマッピング処理で一元的に行う。

---

## 2. Server Actions 一覧（Phase 1）

### 2.1 共通型定義

```typescript
// types/actions.ts

/** Server Actions の統一戻り値型 */
type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: ActionError };

type ActionError = {
  code: 'UNAUTHORIZED' | 'VALIDATION_ERROR' | 'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN' | 'INTERNAL_ERROR';
  message: string;
  fieldErrors?: Record<string, string[]>;
};
```

### 2.2 訪問記録

#### `createVisit` - 訪問記録作成

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/visits.ts` |
| 認証 | 必須 |
| 説明 | 道の駅への訪問を記録する。GPS 座標が提供された場合、道の駅との距離を計算し、1km 以内であれば `is_gps_verified = true`（ゴールドバッジ）とする |

**入力スキーマ（Zod）:**

```typescript
// lib/validations/visit.ts
import { z } from 'zod';

export const CreateVisitSchema = z.object({
  stationId: z.string().uuid('無効な道の駅IDです'),
  visitedAt: z.string().date('無効な日付形式です'),
  memo: z.string().max(1000, 'メモは1000文字以内で入力してください').optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
}).refine(
  (data) => {
    // 緯度と経度は両方指定するか両方省略する
    return (data.latitude === undefined) === (data.longitude === undefined);
  },
  { message: '緯度と経度は両方指定してください', path: ['latitude'] }
);
```

**戻り値:**

```typescript
ActionResult<{
  id: string;           // 作成された visit の UUID
  isGpsVerified: boolean; // GPS 認証済みかどうか
  isFirstVisit: boolean;  // この道の駅への初回訪問か
  newBadges: Badge[];     // 今回の訪問で獲得した新バッジ（エリア制覇・マイルストーン）
}>
```

**処理フロー:**

1. 認証チェック
2. 入力バリデーション（Zod）
3. stationId の存在確認（stations テーブル）
4. GPS 座標が提供されている場合、Haversine 公式で道の駅との距離を計算
   - 1km 以内 → `is_gps_verified = true`
   - それ以外 → `is_gps_verified = false`
5. 初回訪問かどうかを判定（同一 user_id + station_id の既存レコード有無）
6. visits テーブルに INSERT
7. 初回訪問の場合、レスポンスに isFirstVisit: true を含める
8. バッジ判定（エリア制覇・マイルストーン）
9. `revalidatePath('/mypage')` でキャッシュを無効化
10. 結果を返す

---

#### `deleteVisit` - 訪問記録削除

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/visits.ts` |
| 認証 | 必須 |
| 説明 | 自分の訪問記録を削除する。RLS により他人の記録は削除できない |

**入力スキーマ（Zod）:**

```typescript
export const DeleteVisitSchema = z.object({
  visitId: z.string().uuid('無効な訪問記録IDです'),
});
```

**戻り値:**

```typescript
ActionResult<void>
```

**処理フロー:**

1. 認証チェック
2. 入力バリデーション
3. visitId の存在確認 + 所有者チェック
4. visits テーブルから DELETE
5. `revalidatePath('/mypage')` でキャッシュを無効化

---

### 2.3 お気に入り

#### `addFavorite` - お気に入り追加

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/favorites.ts` |
| 認証 | 必須 |
| 説明 | 道の駅をお気に入りに追加する。既にお気に入り済みの場合は CONFLICT エラー |

**入力スキーマ（Zod）:**

```typescript
// lib/validations/favorite.ts
import { z } from 'zod';

export const AddFavoriteSchema = z.object({
  stationId: z.string().uuid('無効な道の駅IDです'),
});
```

**戻り値:**

```typescript
ActionResult<{
  id: string; // 作成された favorite の UUID
}>
```

**処理フロー:**

1. 認証チェック
2. 入力バリデーション
3. stationId の存在確認
4. 重複チェック（user_id + station_id のユニーク制約）
5. favorites テーブルに INSERT
6. `revalidatePath('/mypage/favorites')` でキャッシュを無効化

---

#### `removeFavorite` - お気に入り解除

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/favorites.ts` |
| 認証 | 必須 |
| 説明 | 道の駅をお気に入りから解除する |

**入力スキーマ（Zod）:**

```typescript
export const RemoveFavoriteSchema = z.object({
  stationId: z.string().uuid('無効な道の駅IDです'),
});
```

**戻り値:**

```typescript
ActionResult<void>
```

**処理フロー:**

1. 認証チェック
2. 入力バリデーション
3. favorites テーブルから DELETE（user_id + station_id で特定）
4. `revalidatePath('/mypage/favorites')` でキャッシュを無効化

---

### 2.4 プロフィール

#### `updateProfile` - プロフィール更新

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/profile.ts` |
| 認証 | 必須 |
| 説明 | 自分のプロフィール（表示名・アバター URL）を更新する |

**入力スキーマ（Zod）:**

```typescript
// lib/validations/profile.ts
import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  displayName: z.string()
    .min(1, '表示名は必須です')
    .max(50, '表示名は50文字以内で入力してください'),
  avatarUrl: z.string().url('無効なURLです').optional().or(z.literal('')),
});
```

**戻り値:**

```typescript
ActionResult<{
  id: string;
  displayName: string;
  avatarUrl: string | null;
}>
```

**処理フロー:**

1. 認証チェック
2. 入力バリデーション
3. profiles テーブルを UPDATE（WHERE id = auth.uid()）
4. `revalidatePath('/mypage')` でキャッシュを無効化

---

### 2.5 Server Actions 一覧サマリ（一般ユーザー向け）

| アクション名 | ファイルパス | 認証 | 概要 |
|-------------|-------------|------|------|
| `createVisit` | `lib/actions/visits.ts` | 必須 | 訪問記録作成（GPS バッジ判定含む） |
| `deleteVisit` | `lib/actions/visits.ts` | 必須 | 訪問記録削除 |
| `addFavorite` | `lib/actions/favorites.ts` | 必須 | お気に入り追加 |
| `removeFavorite` | `lib/actions/favorites.ts` | 必須 | お気に入り解除 |
| `updateProfile` | `lib/actions/profile.ts` | 必須 | プロフィール更新 |

---

### 2.6 管理者向け Server Actions

#### `createStation` - 道の駅作成（管理者専用）

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/stations.ts` |
| 認証 | 必須（管理者のみ） |
| 説明 | 道の駅マスターデータを新規作成する。`profiles.role === 'admin'` のチェックを行う |

**入力スキーマ（Zod）:**

```typescript
// lib/validations/station.ts
import { z } from 'zod';

export const CreateStationSchema = z.object({
  name: z.string().min(1, '道の駅名は必須です').max(100),
  nameKana: z.string().nullable().optional(),
  // 設計メモ: name_kana は初期シードデータでは不明な場合がある。
  // 管理者による手動登録時もふりがなが不明な場合は省略可能とする。
  address: z.string().min(1, '住所は必須です').max(500),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().max(20).optional(),
  businessHours: z.string().max(500).optional(),
  closedDays: z.string().max(500).optional(),
  websiteUrl: z.string().url('無効なURLです').optional().or(z.literal('')),
  imageUrl: z.string().url('無効なURLです').optional().or(z.literal('')),
  area: z.string().min(1, 'エリア（振興局名）は必須です'),
  areaGroup: z.enum(['道東', '道北', '道央', '道南']),
  description: z.string().max(2000).optional(),
  facilities: z.object({
    toilet: z.boolean(),
    evCharger: z.boolean(),
    wifi: z.boolean(),
    restaurant: z.boolean(),
    shop: z.boolean(),
    babyRoom: z.boolean(),
    handicapToilet: z.boolean(),
    atm: z.boolean(),
    information: z.boolean(),
    parking: z.number().int().min(0).nullable(),
  }).optional(),
});
```

**戻り値:**

```typescript
ActionResult<{ id: string }>
```

**処理フロー:**

1. 認証チェック（`supabase.auth.getUser()`）
2. 管理者権限チェック（`profiles.role === 'admin'`）。管理者でない場合は `{ code: 'FORBIDDEN' }` を返す
3. 入力バリデーション（Zod）
4. `facilities` の camelCase → snake_case 変換
5. stations テーブルに INSERT
6. `revalidatePath('/stations')` + `revalidatePath('/')` でキャッシュを無効化
7. 結果を返す

---

#### `updateStation` - 道の駅更新（管理者専用）

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/stations.ts` |
| 認証 | 必須（管理者のみ） |
| 説明 | 道の駅マスターデータを更新する。Partial 更新に対応 |

**入力スキーマ（Zod）:**

```typescript
export const UpdateStationSchema = z.object({
  id: z.string().uuid('無効な道の駅IDです'),
}).merge(CreateStationSchema.partial());
// id は必須、それ以外のフィールドは全て optional
```

**戻り値:**

```typescript
ActionResult<void>
```

**処理フロー:**

1. 認証チェック
2. 管理者権限チェック（`profiles.role === 'admin'`）
3. 入力バリデーション
4. stationId の存在確認
5. stations テーブルを UPDATE
6. `revalidatePath('/stations')` + `revalidatePath('/stations/[id]')` + `revalidatePath('/')` でキャッシュを無効化

---

#### `deleteStation` - 道の駅削除（管理者専用）

| 項目 | 内容 |
|------|------|
| ファイルパス | `lib/actions/stations.ts` |
| 認証 | 必須（管理者のみ） |
| 説明 | 道の駅マスターデータを削除する |

**入力スキーマ（Zod）:**

```typescript
export const DeleteStationSchema = z.object({
  id: z.string().uuid('無効な道の駅IDです'),
});
```

**戻り値:**

```typescript
ActionResult<void>
```

**処理フロー:**

1. 認証チェック
2. 管理者権限チェック（`profiles.role === 'admin'`）
3. 入力バリデーション
4. stationId の存在確認
5. stations テーブルから DELETE
6. `revalidatePath('/stations')` + `revalidatePath('/')` でキャッシュを無効化

> **注意**: visits テーブル・favorites テーブルの外部キーは `ON DELETE RESTRICT` で設定されている。関連する訪問記録やお気に入りが存在する道の駅は削除できない。削除を試みた場合は `{ code: 'CONFLICT', message: '関連する訪問記録またはお気に入りが存在するため削除できません' }` を返す。

---

### 2.7 管理者向け Server Actions 一覧サマリ

| アクション名 | ファイルパス | 認証 | 概要 |
|-------------|-------------|------|------|
| `createStation` | `lib/actions/stations.ts` | 必須（管理者） | 道の駅マスターデータ作成 |
| `updateStation` | `lib/actions/stations.ts` | 必須（管理者） | 道の駅マスターデータ更新（Partial） |
| `deleteStation` | `lib/actions/stations.ts` | 必須（管理者） | 道の駅マスターデータ削除（関連データあれば不可） |

---

## 3. Route Handlers 一覧（Phase 1）

### 3.1 GET `/api/stations` - 道の駅一覧（オフラインキャッシュ用）

| 項目 | 内容 |
|------|------|
| ファイルパス | `app/api/stations/route.ts` |
| 認証 | 不要 |
| 説明 | 全道の駅データを JSON で返す。Service Worker によるオフラインキャッシュの対象 |
| キャッシュ | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` |

**クエリパラメータ:**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| area_group | string | No | エリアグループで絞り込み（`道東` / `道北` / `道央` / `道南`） |

**レスポンス (200):**

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "道の駅 あびらD51ステーション",
      "nameKana": "あびらでぃーごじゅういちすてーしょん",
      "address": "北海道勇払郡安平町追分柏が丘49-1",
      "latitude": 42.9072,
      "longitude": 141.8197,
      "phone": "0145-26-7789",
      "businessHours": "9:00-18:00（11月-3月は9:00-17:00）",
      "closedDays": "年末年始（12/31-1/3）",
      "websiteUrl": "https://example.com",
      "imageUrl": "/images/stations/abira-d51.jpg",
      "area": "胆振総合振興局",
      "areaGroup": "道央",
      "description": "SL「D51」を展示する鉄道記念館を併設...",
      "facilities": {
        "toilet": true,
        "evCharger": false,
        "wifi": true,
        "restaurant": true,
        "shop": true,
        "babyRoom": true,
        "handicapToilet": true,
        "atm": false,
        "information": true,
        "parking": 150
      }
    }
  ],
  "meta": {
    "total": 130,
    "updatedAt": "2026-02-09T00:00:00Z"
  }
}
```

**設計意図:**
- オフラインキャッシュ用途のため、全件を一括返却する（約 130 件、データサイズは小さい）
- ページネーションは不要（全件でも数十 KB 程度）
- `meta.updatedAt` でキャッシュの鮮度を判断可能にする

---

### 3.2 GET `/api/stations/[id]` - 道の駅詳細

| 項目 | 内容 |
|------|------|
| ファイルパス | `app/api/stations/[id]/route.ts` |
| 認証 | 不要 |
| 説明 | 指定した道の駅の詳細情報を返す |
| キャッシュ | `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` |

**パスパラメータ:**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | string (UUID) | Yes | 道の駅 ID |

**レスポンス (200):**

```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "道の駅 あびらD51ステーション",
    "nameKana": "あびらでぃーごじゅういちすてーしょん",
    "address": "北海道勇払郡安平町追分柏が丘49-1",
    "latitude": 42.9072,
    "longitude": 141.8197,
    "phone": "0145-26-7789",
    "businessHours": "9:00-18:00（11月-3月は9:00-17:00）",
    "closedDays": "年末年始（12/31-1/3）",
    "websiteUrl": "https://example.com",
    "imageUrl": "/images/stations/abira-d51.jpg",
    "area": "胆振総合振興局",
    "areaGroup": "道央",
    "description": "SL「D51」を展示する鉄道記念館を併設...",
    "facilities": {
      "toilet": true,
      "evCharger": false,
      "wifi": true,
      "restaurant": true,
      "shop": true,
      "babyRoom": true,
      "handicapToilet": true,
      "atm": false,
      "information": true,
      "parking": 150
    },
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-02-01T00:00:00Z"
  }
}
```

**レスポンス (404):**

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "指定された道の駅が見つかりません"
  }
}
```

---

### 3.3 GET `/api/auth/callback` - OAuth コールバック

| 項目 | 内容 |
|------|------|
| ファイルパス | `app/api/auth/callback/route.ts` |
| 認証 | 不要（コールバック受信用） |
| 説明 | Supabase Auth の OAuth フロー（PKCE）でリダイレクトされるコールバックエンドポイント |

**クエリパラメータ:**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| code | string | Yes | 認証コード（Supabase が付与） |
| next | string | No | 認証後のリダイレクト先パス（デフォルト: `/`） |

**処理フロー:**

1. `code` クエリパラメータを取得
2. `supabase.auth.exchangeCodeForSession(code)` でセッションを確立
3. `next` パラメータまたは `/` にリダイレクト

> **注記**: profiles テーブルへのレコード自動作成は DB トリガー（`auth.users` INSERT 時に発火）が担当する。コールバック Route Handler では `exchangeCodeForSession` によるセッション確立のみを行い、profiles の作成ロジックは含まない。これにより、Email/Password 登録時にも同じトリガーで profiles が自動作成される。

**レスポンス:** 302 リダイレクト（JSON レスポンスではない）

---

### 3.4 Route Handlers 一覧サマリ

| メソッド | パス | 認証 | 概要 |
|---------|------|------|------|
| GET | `/api/stations` | 不要 | 道の駅一覧（オフラインキャッシュ用） |
| GET | `/api/stations/[id]` | 不要 | 道の駅詳細 |
| GET | `/api/auth/callback` | 不要 | OAuth コールバック |

---

## 4. データ取得関数一覧（lib/db/queries/）

Server Components から直接呼び出すデータ取得関数。全て `'server-only'` モジュールとして定義する。

> **設計メモ（地図表示用のデータ取得方針）**: 地図ページ（トップページ）では `getStations()` でマスターデータ（約130件）を取得し、ログインユーザーの場合は `getVisitedStationIds(userId)` と `getFavoriteStationIds(userId)` を `Promise.all` で並行取得してクライアント側で結合する。一括取得関数は用意せず、個別クエリの並行実行で対応する。約130件のマスターデータなのでパフォーマンス問題はなく、クエリの責務を分離することで再利用性を確保する。

### 4.1 道の駅

```typescript
// lib/db/queries/stations.ts
import 'server-only';

/** 道の駅一覧を取得（SSG/ISR 用） */
export async function getStations(options?: {
  areaGroup?: '道東' | '道北' | '道央' | '道南';
  search?: string; // 道の駅名、ふりがな（name_kana）、住所を対象にあいまい検索（ILIKE）
}): Promise<Station[]>

/** 道の駅詳細を取得 */
export async function getStationById(id: string): Promise<Station | null>

/** 全道の駅数を取得 */
export async function getStationCount(): Promise<number>

/** エリアグループ別の道の駅数を取得 */
export async function getStationCountByAreaGroup(): Promise<Record<string, number>>

/** 道の駅一覧を取得（管理画面用、全件・作成日時降順） */
export async function getStationsForAdmin(): Promise<Station[]>
```

**型定義:**

```typescript
// types/station.ts
type Station = {
  id: string;
  name: string;
  nameKana: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  businessHours: string | null;
  closedDays: string | null;
  websiteUrl: string | null;
  imageUrl: string | null;
  area: string;
  areaGroup: string;
  description: string | null;
  facilities: StationFacilities;
  createdAt: string;
  updatedAt: string;
};

type StationFacilities = {
  toilet: boolean;
  evCharger: boolean;
  wifi: boolean;
  restaurant: boolean;
  shop: boolean;
  babyRoom: boolean;
  handicapToilet: boolean;
  atm: boolean;           // ATM
  information: boolean;   // 案内所・情報コーナー
  parking: number | null;  // 駐車台数（null = 不明）
};
```

---

### 4.2 訪問記録

```typescript
// lib/db/queries/visits.ts
import 'server-only';

/** ユーザーの訪問記録一覧を取得（新しい順） */
export async function getVisitsByUserId(userId: string, options?: {
  limit?: number;
  offset?: number;
}): Promise<VisitWithStation[]>

/** ユーザーの訪問統計を取得 */
export async function getVisitStats(userId: string): Promise<VisitStats>

/** 特定の道の駅へのユーザーの訪問記録を取得 */
export async function getVisitsByUserAndStation(
  userId: string,
  stationId: string
): Promise<Visit[]>

/** ユーザーが訪問済みの道の駅IDの一覧を取得（DISTINCT） */
export async function getVisitedStationIds(userId: string): Promise<string[]>
```

**型定義:**

```typescript
// types/visit.ts
type Visit = {
  id: string;
  userId: string;
  stationId: string;
  visitedAt: string;       // ISO date (YYYY-MM-DD)
  memo: string | null;
  latitude: number | null;
  longitude: number | null;
  isGpsVerified: boolean;
  createdAt: string;
};

type VisitWithStation = Visit & {
  station: Pick<Station, 'id' | 'name' | 'imageUrl' | 'areaGroup'>;
};

type VisitStats = {
  totalVisits: number;           // 総訪問回数（再訪問含む）
  uniqueStationsVisited: number; // 訪問した道の駅数（ユニーク）
  totalStations: number;         // 全道の駅数（約130）
  completionRate: number;        // 達成率（0.0 - 1.0）
  gpsVerifiedCount: number;      // ゴールドバッジ数
  selfReportedCount: number;     // シルバーバッジ数（ユニーク - ゴールド）
  thisMonthVisits: number;       // 今月の訪問数
};
```

---

### 4.3 お気に入り

```typescript
// lib/db/queries/favorites.ts
import 'server-only';

/** ユーザーのお気に入り一覧を取得 */
export async function getFavoritesByUserId(userId: string, options?: {
  orderBy?: 'createdAt' | 'areaGroup';
  // 注記: データ取得関数内で camelCase から DB の snake_case（created_at / area_group）に変換する
}): Promise<FavoriteWithStation[]>

/** 特定の道の駅がお気に入りかどうかを判定 */
export async function isFavorited(
  userId: string,
  stationId: string
): Promise<boolean>

/** ユーザーのお気に入り道の駅IDの一覧を取得 */
export async function getFavoriteStationIds(userId: string): Promise<string[]>
```

**型定義:**

```typescript
// types/favorite.ts
type Favorite = {
  id: string;
  userId: string;
  stationId: string;
  createdAt: string;
};

type FavoriteWithStation = Favorite & {
  station: Pick<Station, 'id' | 'name' | 'imageUrl' | 'areaGroup' | 'address'>;
};
```

---

### 4.4 バッジ

```typescript
// lib/db/queries/badges.ts
import 'server-only';

/** ユーザーのバッジ一覧を取得（獲得済み + 未獲得） */
export async function getBadges(userId: string): Promise<BadgeStatus[]>
```

**型定義:**

```typescript
// types/badge.ts

/** バッジの種別 */
type BadgeType = 'area_complete' | 'milestone';

/** エリア制覇バッジの対象 */
type AreaGroup = '道東' | '道北' | '道央' | '道南';

/** マイルストーンバッジの閾値 */
type MilestoneThreshold = 10 | 30 | 50 | 100 | 130;

type BadgeDefinition = {
  id: string;                              // 例: 'area_道東', 'milestone_10'
  type: BadgeType;
  label: string;                           // 例: '道東制覇', '10駅達成'
  description: string;
  areaGroup?: AreaGroup;                   // type=area_complete の場合
  threshold?: MilestoneThreshold;          // type=milestone の場合
  requiredCount: number;                   // 獲得に必要な訪問駅数
};

type BadgeStatus = BadgeDefinition & {
  isEarned: boolean;                       // 獲得済みか
  earnedAt: string | null;                 // 獲得日時（isEarned=true の場合）
  currentCount: number;                    // 現在の訪問駅数（対象範囲内）
  progress: number;                        // 進捗率（0.0 - 1.0）
};
```

**設計メモ:**

バッジ定義はDBテーブルとしては持たず、コード内に定数として定義する（約 130 駅 x 4 エリア + 5 マイルストーン = 少量の定義）。判定は `getVisitStats` で取得した訪問データをもとにリアルタイムで計算する。

```typescript
// lib/constants/badges.ts
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // エリア制覇バッジ
  { id: 'area_道東', type: 'area_complete', label: '道東制覇', areaGroup: '道東', requiredCount: /* 道東の駅数 */, ... },
  { id: 'area_道北', type: 'area_complete', label: '道北制覇', areaGroup: '道北', requiredCount: /* 道北の駅数 */, ... },
  { id: 'area_道央', type: 'area_complete', label: '道央制覇', areaGroup: '道央', requiredCount: /* 道央の駅数 */, ... },
  { id: 'area_道南', type: 'area_complete', label: '道南制覇', areaGroup: '道南', requiredCount: /* 道南の駅数 */, ... },
  // マイルストーンバッジ
  { id: 'milestone_10',  type: 'milestone', label: '10駅達成',  threshold: 10,  requiredCount: 10,  ... },
  { id: 'milestone_30',  type: 'milestone', label: '30駅達成',  threshold: 30,  requiredCount: 30,  ... },
  { id: 'milestone_50',  type: 'milestone', label: '50駅達成',  threshold: 50,  requiredCount: 50,  ... },
  { id: 'milestone_100', type: 'milestone', label: '100駅達成', threshold: 100, requiredCount: 100, ... },
  { id: 'milestone_130', type: 'milestone', label: '全駅制覇',  threshold: 130, requiredCount: 130, ... },
];
```

---

### 4.5 プロフィール

```typescript
// lib/db/queries/profiles.ts
import 'server-only';

/** ユーザーのプロフィールを取得 */
export async function getProfile(userId: string): Promise<Profile | null>
```

**型定義:**

```typescript
// types/profile.ts

/**
 * サーバー側で使用する Profile 型（role を含む）。
 * role フィールドは管理者判定に使用する。
 */
type Profile = {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';  // DB default: 'user'
  createdAt: string;
};

/**
 * クライアントに返す際に使用する公開プロフィール型。
 * role はセキュリティ上クライアントに露出させない。
 * Server Components で Profile を取得後、クライアントに渡す際は
 * PublicProfile に変換（role を除外）して使用すること。
 */
type PublicProfile = Omit<Profile, 'role'>;
```

---

### 4.6 データ取得関数一覧サマリ

| 関数名 | ファイルパス | 戻り値 | 用途 |
|--------|-------------|--------|------|
| `getStations` | `lib/db/queries/stations.ts` | `Station[]` | 道の駅一覧（フィルタ・検索） |
| `getStationById` | `lib/db/queries/stations.ts` | `Station \| null` | 道の駅詳細 |
| `getStationCount` | `lib/db/queries/stations.ts` | `number` | 全道の駅数 |
| `getStationCountByAreaGroup` | `lib/db/queries/stations.ts` | `Record<string, number>` | エリア別道の駅数 |
| `getStationsForAdmin` | `lib/db/queries/stations.ts` | `Station[]` | 管理画面用道の駅一覧（全件） |
| `getVisitsByUserId` | `lib/db/queries/visits.ts` | `VisitWithStation[]` | 訪問履歴 |
| `getVisitStats` | `lib/db/queries/visits.ts` | `VisitStats` | 訪問統計・達成率 |
| `getVisitsByUserAndStation` | `lib/db/queries/visits.ts` | `Visit[]` | 特定道の駅の訪問履歴 |
| `getVisitedStationIds` | `lib/db/queries/visits.ts` | `string[]` | 訪問済み道の駅IDの一覧（地図用） |
| `getFavoritesByUserId` | `lib/db/queries/favorites.ts` | `FavoriteWithStation[]` | お気に入り一覧 |
| `isFavorited` | `lib/db/queries/favorites.ts` | `boolean` | お気に入り判定 |
| `getFavoriteStationIds` | `lib/db/queries/favorites.ts` | `string[]` | お気に入り道の駅IDの一覧（地図用） |
| `getBadges` | `lib/db/queries/badges.ts` | `BadgeStatus[]` | バッジ一覧（進捗込み） |
| `getProfile` | `lib/db/queries/profiles.ts` | `Profile \| null` | プロフィール |

---

## 5. GPS バッジ判定ロジック

### 5.1 Haversine 公式による距離計算

ユーザーの GPS 座標と道の駅の座標から、地表面上の距離（km）を計算する。

```typescript
// lib/utils/geo.ts

const EARTH_RADIUS_KM = 6371;

/**
 * Haversine 公式で 2 点間の距離（km）を計算する
 */
export function calculateDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/** GPS 認証の閾値（km） */
export const GPS_VERIFICATION_RADIUS_KM = 1.0;

/**
 * GPS 座標が道の駅から指定半径以内かどうかを判定する
 */
export function isWithinRadius(
  userLat: number, userLon: number,
  stationLat: number, stationLon: number,
  radiusKm: number = GPS_VERIFICATION_RADIUS_KM
): boolean {
  return calculateDistance(userLat, userLon, stationLat, stationLon) <= radiusKm;
}
```

### 5.2 バッジ種別の決定ロジック

`createVisit` Server Action 内で以下のように判定する。

```
GPS座標が提供されている？
  ├── No → is_gps_verified = false（シルバーバッジ）
  └── Yes
        ├── 道の駅から1km以内？
        │     ├── Yes → is_gps_verified = true（ゴールドバッジ）
        │     └── No  → is_gps_verified = false（シルバーバッジ）
        └── ※座標は visits テーブルに記録する（後から検証可能にするため）
```

### 5.3 配置場所

| ファイル | 内容 |
|---------|------|
| `lib/utils/geo.ts` | `calculateDistance`, `isWithinRadius` |
| `lib/actions/visits.ts` | `createVisit` 内で上記関数を呼び出し、`is_gps_verified` を決定 |

---

## 6. エラーハンドリング

### 6.1 Server Actions のエラー戻り値

全ての Server Actions は `ActionResult<T>` 型を返す。例外をスローせず、戻り値でエラーを表現する。

```typescript
// 成功時
return { success: true, data: { id: visit.id, isGpsVerified: true, ... } };

// エラー時
return {
  success: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: '入力内容に誤りがあります',
    fieldErrors: {
      stationId: ['無効な道の駅IDです'],
    },
  },
};
```

### 6.2 エラーコード一覧

| コード | HTTPステータス相当 | 説明 | 対処 |
|--------|-------------------|------|------|
| `UNAUTHORIZED` | 401 | 未認証 / セッション切れ | ログインページへリダイレクト |
| `FORBIDDEN` | 403 | 権限不足（管理者専用操作を一般ユーザーが実行等） | 権限エラーメッセージを表示 |
| `VALIDATION_ERROR` | 422 | 入力値のバリデーション失敗 | `fieldErrors` を表示 |
| `NOT_FOUND` | 404 | 対象リソースが存在しない | ユーザーに通知 |
| `CONFLICT` | 409 | 重複データ（お気に入り二重登録等）/ 関連データ存在による削除不可 | 既に登録済みである旨を表示 |
| `INTERNAL_ERROR` | 500 | サーバー内部エラー | 汎用エラーメッセージを表示 |

### 6.3 Route Handlers のエラーレスポンス

Route Handlers は HTTP ステータスコードと JSON で返す。

```typescript
// 400 Bad Request
return NextResponse.json(
  { error: { code: 'BAD_REQUEST', message: 'パラメータが不正です' } },
  { status: 400 }
);

// 404 Not Found
return NextResponse.json(
  { error: { code: 'NOT_FOUND', message: '指定された道の駅が見つかりません' } },
  { status: 404 }
);

// 500 Internal Server Error
return NextResponse.json(
  { error: { code: 'INTERNAL_ERROR', message: 'サーバーエラーが発生しました' } },
  { status: 500 }
);
```

### 6.4 クライアント側での扱い

```typescript
// Client Component での Server Action 呼び出し例
'use client';

import { createVisit } from '@/lib/actions/visits';
import { useTransition } from 'react';

function VisitButton({ stationId }: { stationId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await createVisit({
        stationId,
        visitedAt: new Date().toISOString().split('T')[0],
      });

      if (!result.success) {
        switch (result.error.code) {
          case 'UNAUTHORIZED':
            // ログインページへリダイレクト
            break;
          case 'VALIDATION_ERROR':
            // fieldErrors を表示
            break;
          default:
            // 汎用エラーメッセージ
            break;
        }
        return;
      }

      // 成功時の処理
      if (result.data.newBadges.length > 0) {
        // 新バッジ獲得の演出
      }
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? '記録中...' : '訪問した！'}
    </button>
  );
}
```

---

## 7. Phase 2/3 の API（概要）

### 7.1 Phase 2

| 種別 | 名前 | 概要 |
|------|------|------|
| Server Action | `uploadVisitPhotos` | 訪問記録に写真（最大3枚）を添付。Supabase Storage へアップロード |
| Server Action | `deleteVisitPhoto` | 訪問写真を削除 |
| Server Action | `createRoute` | ルート計画を作成（お気に入りから選択した道の駅リスト） |
| Server Action | `updateRoute` | ルート計画を更新 |
| Server Action | `deleteRoute` | ルート計画を削除 |
| Server Action | `createStationReport` | 情報修正リクエストを送信 |
| Server Action | `resolveStationReport` | 修正リクエストを承認/却下（管理者） |
| Query 関数 | `getVisitPhotos` | 訪問記録の写真一覧 |
| Query 関数 | `getRoutesByUserId` | ルート計画一覧 |
| Query 関数 | `getStationReports` | 修正リクエスト一覧（管理者用） |

### 7.2 Phase 3

| 種別 | 名前 | 概要 |
|------|------|------|
| Server Action | `createTip` | Tips を投稿 |
| Server Action | `updateTip` | Tips を編集 |
| Server Action | `deleteTip` | Tips を削除 |
| Server Action | `markTipHelpful` | Tips に「参考になった」を付ける |
| Server Action | `reportTip` | 不適切な Tips を通報 |
| Query 関数 | `getTipsByStationId` | 道の駅の Tips 一覧 |
| Query 関数 | `getTipsByUserId` | ユーザーの投稿 Tips 一覧 |
| Query 関数 | `getUserRanking` | 訪問数ランキング |
| Query 関数 | `getStationRanking` | 人気道の駅ランキング |
| Query 関数 | `getAreaCompletionStats` | エリア別制覇率統計 |

---

## 8. ファイル構成まとめ

```
lib/
├── actions/                    # Server Actions
│   ├── visits.ts               # createVisit, deleteVisit
│   ├── favorites.ts            # addFavorite, removeFavorite
│   ├── profile.ts              # updateProfile
│   └── stations.ts             # createStation, updateStation, deleteStation（管理者専用）
├── db/
│   └── queries/                # データ取得関数（server-only）
│       ├── stations.ts         # getStations, getStationById, getStationsForAdmin, ...
│       ├── visits.ts           # getVisitsByUserId, getVisitStats, getVisitedStationIds, ...
│       ├── favorites.ts        # getFavoritesByUserId, isFavorited, getFavoriteStationIds
│       ├── badges.ts           # getBadges
│       └── profiles.ts         # getProfile
├── supabase/
│   ├── server.ts               # サーバー側 Supabase Client
│   └── client.ts               # クライアント側 Supabase Client
├── validations/                # Zod スキーマ
│   ├── visit.ts                # CreateVisitSchema, DeleteVisitSchema
│   ├── favorite.ts             # AddFavoriteSchema, RemoveFavoriteSchema
│   ├── profile.ts              # UpdateProfileSchema
│   └── station.ts              # CreateStationSchema, UpdateStationSchema, DeleteStationSchema
├── utils/
│   └── geo.ts                  # calculateDistance, isWithinRadius
└── constants/
    └── badges.ts               # BADGE_DEFINITIONS

types/
├── actions.ts                  # ActionResult, ActionError
├── station.ts                  # Station, StationFacilities
├── visit.ts                    # Visit, VisitWithStation, VisitStats
├── favorite.ts                 # Favorite, FavoriteWithStation
├── badge.ts                    # BadgeDefinition, BadgeStatus, ...
└── profile.ts                  # Profile, PublicProfile

app/
└── api/
    ├── stations/
    │   ├── route.ts            # GET /api/stations
    │   └── [id]/
    │       └── route.ts        # GET /api/stations/[id]
    └── auth/
        └── callback/
            └── route.ts        # GET /api/auth/callback
```

---

## 変更履歴

| 日付 | 変更者 | 内容 |
|------|--------|------|
| 2026-02-09 | Claude Code | spec.md v3 ベースで作成 |
| 2026-02-09 | Claude Code | 整合性修正: 管理者API追加、Profile型修正、地図用関数追加、命名規則方針明記 |
| 2026-02-09 | Claude Code | database.md との不整合修正: (1) StationFacilities に atm, information を追加 (2) createVisit の処理フローで初回訪問判定を INSERT 前に移動 (3) nameKana を nullable/optional に変更 (4) getFavoritesByUserId の orderBy を camelCase に修正 (5) UpdateStationSchema の不要な .omit({}) を削除 |
