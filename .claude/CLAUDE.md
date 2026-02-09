## プロジェクト概要

北海道 道の駅コレクション（仮）: 北海道の道の駅（約130箇所）を地図で探し、GPS連携の訪問記録をスタンプラリー形式で残せるWebアプリ

### Phase 1（MVP）主要機能
- 地図表示・検索（Leaflet + OpenStreetMap、道東/道北/道央/道南エリアフィルタ）
- 道の駅一覧・詳細ページ（SSG/ISR）
- 訪問記録（GPS連携ゴールド/シルバーバッジ + メモ）
- お気に入り / 巡りたいリスト
- ゲーミフィケーション（エリア制覇バッジ、マイルストーン 10/30/50/100/130）
- ユーザー認証（Google OAuth + Email）
- オフラインデータキャッシュ（Service Worker）

### 技術スタック
- Next.js 15 (App Router) + TypeScript
- Supabase (PostgreSQL + Auth + Storage)
- Tailwind CSS + shadcn/ui
- Leaflet + react-leaflet (OpenStreetMap)
- Service Worker (next-pwa等)
- Vercel (ホスティング)

### 画面構成
- `/` - トップ（地図 + 検索）
- `/stations` - 道の駅一覧
- `/stations/[id]` - 道の駅詳細
- `/auth/login`, `/auth/signup` - 認証
- `/mypage` - マイページ（訪問記録・達成率・バッジ）
- `/mypage/favorites` - お気に入りリスト
- `/mypage/badges` - バッジ一覧
- `/admin` - 管理画面
- `/admin/reports` - 情報修正リクエスト管理（Phase 2）

### フェーズ構成
- **Phase 1**: MVP（地図・訪問記録・GPS連携・お気に入り・ゲーミフィケーション・オフラインキャッシュ）
- **Phase 2**: 写真記録、ルート計画、情報修正リクエスト
- **Phase 3**: 道の駅Tips（構造化レビュー）、ランキング・統計、SNS連携

詳細は `docs/spec.md` を参照。

---

# Next.js プロジェクトガイド

## コマンド

```bash
# 開発サーバー起動
npm run dev                             # next dev（Next.js 16ではTurbopackがデフォルト）
npx next dev --turbopack                # Turbopack明示（Next.js 15）

# ビルド
npm run build                           # next build（本番ビルド）
npm run start                           # next start（本番サーバー）

# テスト実行
npx vitest                              # ウォッチモード
npx vitest run                          # 全テスト（1回実行）
npx vitest run --filter=ファイル名      # 特定テスト
npx vitest --coverage                   # カバレッジ付き

# E2Eテスト
npx playwright test                     # 全E2Eテスト
npx playwright test --ui               # UIモード
npx playwright test tests/e2e/login    # 特定ファイル

# Lint・フォーマット（ESLint / Biome を直接使用）
npx eslint .                           # Lint実行
npx eslint --fix .                     # 自動修正
npx prettier --write .                 # フォーマット

# DB関連（Prismaを使用する場合）
npx prisma generate                     # クライアント生成
npx prisma db push                     # スキーマをDBに反映
npx prisma migrate dev                 # マイグレーション作成・実行
npx prisma migrate deploy             # 本番マイグレーション
npx prisma studio                      # DB管理UI

# 型チェック
npx tsc --noEmit                       # TypeScript型チェック
```

---

## ディレクトリ構造

```
app/                        # App Router（ルーティング）
├── layout.tsx              # ルートレイアウト
├── page.tsx                # トップページ
├── loading.tsx             # ローディングUI
├── error.tsx               # エラーUI
├── not-found.tsx           # 404ページ
├── forbidden.tsx           # 403ページ（experimental）
├── unauthorized.tsx        # 401ページ（experimental）
├── (auth)/                 # Route Group（URLに影響なし）
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx          # ネストレイアウト
│   └── page.tsx
└── api/                    # Route Handlers（APIエンドポイント）
    └── users/route.ts

instrumentation.ts          # 起動時フック・エラー監視（プロジェクトルート）

components/                 # UIコンポーネント
├── ui/                     # 汎用UI（Button, Input, Modal等）
├── features/               # 機能別コンポーネント
└── layouts/                # レイアウトコンポーネント

lib/                        # ユーティリティ・共通ロジック
├── db/                     # データアクセス層（フルスタック時）
│   ├── queries/            # 読み取り系クエリ
│   └── mutations/          # 書き込み系操作
├── api/                    # APIクライアント（バックエンド別構成時）
├── prisma.ts               # Prismaクライアント（シングルトン）
├── actions/                # Server Actions
└── utils/                  # ヘルパー関数

hooks/                      # カスタムフック
types/                      # 型定義

public/                     # 静的ファイル

tests/                      # テスト（Vitestの場合。コロケーションも可）
├── unit/                   # ユニットテスト
├── integration/            # 統合テスト
└── e2e/                    # E2Eテスト（Playwright）
```

---

## アーキテクチャ方針

### Server Components（デフォルト）vs Client Components

- **Server Components**（デフォルト）：データフェッチ、DB アクセス、機密ロジック
- **Client Components**（`'use client'`）：インタラクション、ブラウザ API、状態管理

```tsx
// ✅ Server Component（デフォルト）- データフェッチに最適
async function UserList() {
  const users = await getUsers(); // サーバーで直接データ取得
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// ✅ Client Component - インタラクションが必要な場合のみ
'use client';
function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
```

### Server Actions

データ更新は Server Actions で行う。

```tsx
// lib/actions/user.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const CreateUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const parsed = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  await db.user.create({ data: parsed.data });
  revalidatePath('/users');
}
```

### `next/form` コンポーネント

クライアントサイドナビゲーション付きのフォーム送信に使用。

```tsx
import Form from 'next/form';

export default function SearchForm() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">検索</button>
    </Form>
  );
}
```

### `after()` API

レスポンス送信後にバックグラウンド処理（ログ、分析等）を実行。

```tsx
import { after } from 'next/server';

export default async function Page() {
  const data = await fetchData();
  after(() => {
    logAnalytics({ page: '/dashboard', data });
  });
  return <Dashboard data={data} />;
}
```

### Route Handlers（API エンドポイント）

外部からの API アクセスや Webhook 受信に使用。

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await getUsers();
  return NextResponse.json({ data: users });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json({ data: user }, { status: 201 });
}
```

### Data Access Layer（`lib/db/`）

DB アクセスを集約し、Server Components や Server Actions から利用する。

```tsx
// lib/db/queries/users.ts
import 'server-only';
import { prisma } from '@/lib/prisma';

export async function getUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
}
```

---

## TypeScript ベストプラクティス

### strict モード必須

`tsconfig.json` で `"strict": true` を有効にする。

### 型定義

```tsx
// ✅ Props型を明示
type UserCardProps = {
  user: User;
  onEdit?: (id: string) => void;
};

function UserCard({ user, onEdit }: UserCardProps) {
  // ...
}

// ✅ Server Actions の戻り値型
type ActionResult = {
  error?: { fieldErrors: Record<string, string[]> };
  success?: boolean;
};
```

### `as` キャストの禁止

```tsx
// ❌ Bad - 型アサーション
const user = data as User;

// ✅ Good - Zodでランタイムバリデーション
const user = UserSchema.parse(data);
```

---

## よくある指摘事項

### 1. `'use client'` の過剰使用
→ Server Component で十分な場合は使わない。インタラクションが必要なコンポーネントだけに限定

### 2. ハイドレーションエラー
→ サーバーとクライアントのレンダリング結果の不一致。`Date.now()`、`Math.random()` 等を直接使わない

### 3. 環境変数の漏洩
→ `NEXT_PUBLIC_` プレフィックスなしの環境変数はサーバー専用。Client Component から参照しない

### 4. Server Actions のバリデーション不足
→ 必ず Zod 等で入力バリデーション。クライアント側バリデーションだけに依存しない

### 5. `fetch` のキャッシュ設定不備
→ Next.js 15 以降、`fetch()` はデフォルトで**キャッシュされない**（`no-store`）。キャッシュが必要な場合は明示的に `cache: 'force-cache'` や `next: { revalidate: 60 }` を指定

### 6. `params` / `searchParams` の非同期アクセス忘れ
→ Next.js 15+ で `params` と `searchParams` は `Promise` ベース。必ず `await` する

```tsx
// ❌ Bad - 同期アクセス（Next.js 15+ でエラー）
export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
}

// ✅ Good - Promise を await
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getUser(id);
}
```

### 7. 巨大な Client Component
→ `'use client'` のコンポーネントが大きすぎるとバンドルサイズが増大。分割して末端に配置
