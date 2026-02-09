---
paths:
  - "app/**/*.tsx"
  - "app/**/*.ts"
  - "components/**/*.tsx"
  - "components/**/*.ts"
---

# App Router ルール

App Router 構成における Server/Client Components、レイアウト規約、ルーティングパターンを定義します。

---

## Server Components vs Client Components

### 判断基準

| 条件 | Server Component | Client Component |
|------|:---:|:---:|
| データフェッチ（DB、API） | ✅ | - |
| 機密情報へのアクセス（API キー、トークン） | ✅ | - |
| バンドルサイズを小さくしたい | ✅ | - |
| `useState`, `useEffect` を使う | - | ✅ |
| `onClick`, `onChange` 等のイベント | - | ✅ |
| ブラウザ API（localStorage, window） | - | ✅ |
| カスタムフック（状態を含む） | - | ✅ |

### `'use client'` の正しい使い方

コンポーネントツリーの**末端に配置**する。親を Client Component にすると、子もすべて Client Component になる。

```tsx
// ❌ Bad - ページ全体を Client Component にしている
'use client';
export default function DashboardPage() {
  const [tab, setTab] = useState('overview');
  return (
    <div>
      <h1>Dashboard</h1>
      <TabSwitcher tab={tab} onChange={setTab} />
      <HeavyDataTable />  {/* これもClientになりバンドル増大 */}
    </div>
  );
}

// ✅ Good - インタラクション部分だけ Client Component
// app/dashboard/page.tsx（Server Component）
export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <div>
      <h1>Dashboard</h1>
      <TabSwitcher />       {/* Client Component */}
      <DataTable data={data} /> {/* Server Component - データは props で渡す */}
    </div>
  );
}

// components/features/TabSwitcher.tsx
'use client';
export function TabSwitcher() {
  const [tab, setTab] = useState('overview');
  return <div>...</div>;
}
```

### Server Component での非同期処理

```tsx
// ✅ Server Component は async/await が使える
// ⚠️ Next.js 15+ では params は Promise
export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getUserById(id);
  if (!user) notFound();
  return <UserProfile user={user} />;
}
```

### Client Component での params / searchParams

Client Component では `use()` フックで Promise をアンラップする。

```tsx
'use client';
import { use } from 'react';

export default function UserPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  return <div>User: {id}</div>;
}
```

---

## レイアウト規約

### 特殊ファイル

| ファイル | 用途 | 必須/任意 |
|---------|------|:---:|
| `layout.tsx` | 共通レイアウト（ナビ、サイドバー等） | ルートは必須 |
| `page.tsx` | ルートのUI | 必須 |
| `loading.tsx` | ローディング状態（Suspense） | 任意 |
| `error.tsx` | エラーハンドリング（ErrorBoundary） | 任意 |
| `not-found.tsx` | 404ページ | 任意 |
| `forbidden.tsx` | 403ページ（experimental） | 任意 |
| `unauthorized.tsx` | 401ページ（experimental） | 任意 |
| `template.tsx` | 再マウントされるレイアウト | 任意 |

### layout.tsx のルール

```tsx
// ✅ ルートレイアウト（必須）
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// ⚠️ layout.tsx では以下を避ける
// - searchParams へのアクセス（再レンダリングされない）
// - pathname の直接参照（Server Component なので usePathname は使えない）
```

### error.tsx のルール

```tsx
// error.tsx は必ず Client Component
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  );
}
```

### loading.tsx のルール

```tsx
// loading.tsx は自動的に Suspense boundary を作る
export default function Loading() {
  return <div>読み込み中...</div>;
}
```

---

## Route Groups と特殊フォルダ

### Route Groups `(group)/`

URL に影響を与えずにルートを整理する。

```
app/
├── (marketing)/         # URL: /about, /contact
│   ├── about/page.tsx
│   └── contact/page.tsx
├── (app)/               # URL: /dashboard, /settings
│   ├── layout.tsx       # アプリ用レイアウト（認証必須）
│   ├── dashboard/page.tsx
│   └── settings/page.tsx
└── (auth)/              # URL: /login, /register
    ├── layout.tsx       # 認証用レイアウト（シンプル）
    ├── login/page.tsx
    └── register/page.tsx
```

### プライベートフォルダ `_folder/`

ルーティングから除外される。共通コンポーネントの配置に使用。

```
app/dashboard/
├── _components/         # ルーティングされない
│   ├── Sidebar.tsx
│   └── StatsCard.tsx
├── layout.tsx
└── page.tsx
```

---

## Middleware / Proxy

### Next.js 15: middleware.ts（Edge Runtime）

```tsx
// middleware.ts（プロジェクトルート）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session-token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*'],
};
```

### Next.js 16: proxy.ts（Node.js Runtime）

Next.js 16 では `middleware.ts` は非推奨。`proxy.ts` に移行し、Node.js ランタイムで実行される。

```tsx
// proxy.ts（プロジェクトルート）
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('session-token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', request.url));
  }
}
```

### 注意事項

- **Next.js 15**: Edge Runtime で実行（Node.js API の一部は使用不可、DB 直接アクセス不可）
- **Next.js 16**: Node.js Runtime で実行（フル Node.js API が使用可能）
- レスポンスヘッダーの設定、リダイレクト、リライトに使用
- 軽量に保つ（重い処理は避ける）

---

## 認証・認可ヘルパー

### `forbidden()` / `unauthorized()`（experimental）

`notFound()` と同様に 403 / 401 を返す API。`forbidden.tsx` / `unauthorized.tsx` で表示をカスタマイズ可能。

```tsx
import { unauthorized, forbidden } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) unauthorized();  // 401 → unauthorized.tsx を表示

  const canAccess = await checkPermission(session.userId, 'dashboard');
  if (!canAccess) forbidden();   // 403 → forbidden.tsx を表示

  return <Dashboard />;
}
```

> ⚠️ `next.config.ts` で `experimental.authInterrupts: true` の設定が必要

---

## 禁止事項

### ❌ ページコンポーネントでの直接 DB アクセス

```tsx
// ❌ Bad - ページに直接 Prisma
export default async function UsersPage() {
  const users = await prisma.user.findMany(); // Data Access Layer を経由すべき
  return <UserList users={users} />;
}

// ✅ Good - Data Access Layer 経由
export default async function UsersPage() {
  const users = await getUsers(); // lib/db/queries/users.ts
  return <UserList users={users} />;
}
```

### ❌ Server Component での状態管理

```tsx
// ❌ Bad - Server Component で useState
export default function UserList() {
  const [search, setSearch] = useState(''); // エラー
  return <input onChange={(e) => setSearch(e.target.value)} />;
}

// ✅ Good - Client Component に分離
// components/features/SearchInput.tsx
'use client';
export function SearchInput() {
  const [search, setSearch] = useState('');
  return <input onChange={(e) => setSearch(e.target.value)} />;
}
```

### ❌ `'use client'` の伝播放置

```tsx
// ❌ Bad - 不要な 'use client' が子に伝播
'use client';
export default function Layout({ children }) {
  return <div>{children}</div>; // children もすべて Client に
}
```
