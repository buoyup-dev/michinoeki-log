# 🚗 北海道 道の駅アプリ — 要件定義書

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | 北海道 道の駅コレクション（仮） |
| 概要 | 北海道の道の駅を地図で探し、訪問記録をスタンプラリー形式で残せるWebアプリ |
| 技術スタック | Next.js (App Router) + Supabase + Vercel |
| 対象エリア | 北海道の道の駅（約130箇所） |
| 対象デバイス | PC・スマホ両対応（レスポンシブ） |

---

## 2. ユーザー種別と権限

| ユーザー種別 | 閲覧 | 訪問記録 | レビュー投稿 | 管理 |
|-------------|------|---------|-------------|------|
| 未ログインユーザー | ✅ 地図・一覧・詳細閲覧可 | ❌ | ❌ | ❌ |
| ログインユーザー | ✅ | ✅ | ✅ | ❌ |
| 管理者 | ✅ | ✅ | ✅ | ✅ 道の駅データ管理 |

### 認証方式
- Supabase Auth を利用
- Google ログイン（OAuth）
- メール + パスワード
- 未ログインでも道の駅の閲覧・検索は可能

---

## 3. 機能要件

### Phase 1: MVP（最優先）

#### 3.1 地図表示・検索
- 北海道の道の駅を地図上にピンで表示（Leaflet + OpenStreetMap）
- 現在地取得 → 近くの道の駅を表示
- エリア（振興局）・キーワードで絞り込み
- ピンタップで道の駅の概要カードを表示

#### 3.2 道の駅一覧・詳細
- カード形式の一覧表示（写真・名前・エリア・訪問済みバッジ）
- 詳細ページ：基本情報（住所・営業時間・定休日・電話番号・公式URL）
- 詳細ページ：アクセス情報、設備情報（トイレ・EV充電・Wi-Fi等）

#### 3.3 訪問記録（スタンプラリー）
- 「訪問した！」ボタンで訪問を記録（日付を記録）
- 訪問済み道の駅にスタンプ風のバッジを表示
- マイページで訪問済み一覧・達成率（◯/130）を表示
- 地図上で訪問済み/未訪問をビジュアルで区別

### Phase 2: エンゲージメント強化

#### 3.4 写真・メモ記録
- 訪問時に写真（最大3枚）とメモを投稿可能
- Supabase Storage に画像保存
- 自分の訪問履歴をタイムライン表示

#### 3.5 口コミ・レビュー
- 5段階評価 + テキストレビュー
- 道の駅詳細ページにレビュー一覧を表示
- 不適切レビューの通報機能

### Phase 3: 拡張機能

#### 3.6 ルート計画
- 複数の道の駅を選択してドライブルートを生成
- ルートの所要時間・距離を表示

#### 3.7 ランキング・統計
- 訪問数ランキング（ユーザー別）
- 人気の道の駅ランキング（訪問数・評価順）
- エリア別の制覇率

#### 3.8 SNS連携
- 訪問記録やスタンプカードをSNSにシェア
- OGP画像の自動生成

---

## 4. 画面構成

```
/ ........................... トップ（地図 + 検索）
/stations ................... 道の駅一覧（カード表示）
/stations/[id] .............. 道の駅詳細
/auth/login ................. ログイン
/auth/signup ................ 新規登録
/mypage ..................... マイページ（訪問記録・達成率）
/mypage/visits .............. 訪問履歴一覧
/admin ...................... 管理画面（道の駅データCRUD）
```

---

## 5. データベース設計（Supabase）

### stations（道の駅マスター）
| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | PK |
| name | text | 道の駅名 |
| name_kana | text | ふりがな |
| address | text | 住所 |
| latitude | float8 | 緯度 |
| longitude | float8 | 経度 |
| phone | text | 電話番号 |
| business_hours | text | 営業時間 |
| closed_days | text | 定休日 |
| website_url | text | 公式サイトURL |
| image_url | text | メイン画像URL |
| area | text | エリア（振興局名） |
| description | text | 説明文 |
| facilities | jsonb | 設備情報（トイレ, EV充電, Wi-Fi等） |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |

### profiles（ユーザープロフィール）
| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | PK (= auth.users.id) |
| display_name | text | 表示名 |
| avatar_url | text | アバター画像URL |
| created_at | timestamptz | 作成日時 |

### visits（訪問記録）
| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| station_id | uuid | FK → stations.id |
| visited_at | date | 訪問日 |
| memo | text | メモ |
| created_at | timestamptz | 作成日時 |

### visit_photos（訪問写真）※Phase 2
| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | PK |
| visit_id | uuid | FK → visits.id |
| photo_url | text | 画像URL（Supabase Storage） |
| created_at | timestamptz | 作成日時 |

### reviews（口コミ）※Phase 2
| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| station_id | uuid | FK → stations.id |
| rating | int2 | 評価（1〜5） |
| comment | text | レビュー本文 |
| created_at | timestamptz | 作成日時 |
| updated_at | timestamptz | 更新日時 |

### RLS（Row Level Security）方針
- **stations**: 全ユーザー SELECT 可。INSERT/UPDATE/DELETE は管理者のみ。
- **visits**: SELECT は本人のみ。INSERT は認証ユーザー。DELETE は本人のみ。
- **reviews**: SELECT は全ユーザー。INSERT は認証ユーザー。UPDATE/DELETE は本人のみ。

---

## 6. 技術スタック詳細

| レイヤー | 技術 | 備考 |
|---------|------|------|
| フロントエンド | Next.js 15 (App Router) | React Server Components活用 |
| スタイリング | Tailwind CSS | shadcn/ui コンポーネント |
| 地図 | Leaflet + react-leaflet | OpenStreetMap（無料） |
| 認証 | Supabase Auth | Google OAuth + Email |
| DB | Supabase (PostgreSQL) | RLS でアクセス制御 |
| ストレージ | Supabase Storage | 訪問写真の保存 |
| ホスティング | Vercel | Next.js と相性最良 |
| 道の駅データ | 初期データはシード投入 | 国交省オープンデータ等を活用 |

---

## 7. 非機能要件

- **パフォーマンス**: 地図の初期表示 2秒以内。道の駅データは SSG/ISR で事前生成。
- **SEO**: 道の駅詳細ページは SSG で生成し、検索エンジンからの流入を狙う。
- **アクセシビリティ**: キーボード操作対応、適切なalt属性。
- **セキュリティ**: Supabase RLS で認可制御。入力値のバリデーション。

---

## 8. MVP 開発ロードマップ

| ステップ | 内容 | 目安 |
|---------|------|------|
| 1 | プロジェクト初期化 + Supabase セットアップ | 0.5日 |
| 2 | 道の駅マスターデータ投入（シード） | 0.5日 |
| 3 | 地図表示 + ピン表示 | 1日 |
| 4 | 道の駅一覧・詳細ページ | 1日 |
| 5 | 認証（Google + Email） | 0.5日 |
| 6 | 訪問記録（スタンプラリー）機能 | 1日 |
| 7 | マイページ（達成率・訪問履歴） | 1日 |
| 8 | レスポンシブ対応 + UI仕上げ | 1日 |
| 9 | Vercel デプロイ + 動作確認 | 0.5日 |
| **合計** | | **約7日** |

---

## 9. 今後の検討事項

- 道の駅データの取得方法（国交省オープンデータ or スクレイピング or 手動登録）
- 位置情報の精度と GPS 訪問認証の是非（近くにいないと訪問記録できない等）
- 画像のリサイズ・最適化（Supabase Edge Functions or クライアント側）
- PWA 対応（オフラインでの地図閲覧）
- 将来の全国展開時のデータ構造拡張性
