---
paths:
  - "app/**/*.tsx"
  - "app/**/*.ts"
  - "lib/**/*.ts"
---

# データ取得・更新ルール

フルスタック構成（Prisma 等で直接 DB アクセス）とバックエンド別構成（API 連携）の両方のパターンを定義します。

---

## フルスタック構成（DB 直接アクセス）

### Prisma シングルトンパターン

```tsx
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// NOTE: globalThis の型拡張に as unknown as を使用しているが、
// これは Prisma 公式推奨パターンのため許容する（他での as キャストは禁止）
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Data Access Layer（`lib/db/`）

DB アクセスを集約し、ページや Server Actions から利用する。

```tsx
// lib/db/queries/users.ts
import 'server-only'; // Client Component からの import を防止

import { prisma } from '@/lib/prisma';
import { cache } from 'react';

// React cache でリクエスト内での重複排除
export const getUsers = cache(async () => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
});

export const getUserById = cache(async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { posts: { orderBy: { createdAt: 'desc' } } },
  });
});
```

```tsx
// lib/db/mutations/users.ts
import 'server-only';

import { prisma } from '@/lib/prisma';

export async function createUser(data: { name: string; email: string }) {
  return prisma.user.create({ data });
}

export async function updateUser(id: string, data: { name?: string; email?: string }) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
```

### Server Actions でのデータ更新

```tsx
// lib/actions/user.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createUser, updateUser, deleteUser } from '@/lib/db/mutations/users';

// ✅ 必ずバリデーションスキーマを定義
const CreateUserSchema = z.object({
  name: z.string().min(1, '名前は必須です').max(255),
  email: z.string().email('有効なメールアドレスを入力してください'),
});

export async function createUserAction(prevState: unknown, formData: FormData) {
  const parsed = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await createUser(parsed.data);
  } catch (error) {
    return { error: 'ユーザーの作成に失敗しました' };
  }

  revalidatePath('/users');
  redirect('/users');
}

const UpdateUserSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
});

export async function updateUserAction(id: string, formData: FormData) {
  const parsed = UpdateUserSchema.safeParse({
    name: formData.get('name') || undefined,
    email: formData.get('email') || undefined,
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await updateUser(id, parsed.data);
  revalidatePath('/users');
  revalidatePath(`/users/${id}`);
}

export async function deleteUserAction(id: string) {
  await deleteUser(id);
  revalidatePath('/users');
  redirect('/users');
}
```

### `useOptimistic` による楽観的 UI 更新

Server Actions と組み合わせて、レスポンスを待たずに即座に UI を更新する。

```tsx
'use client';
import { useOptimistic } from 'react';
import { addTodoAction } from '@/lib/actions/todo';

type Todo = { id: string; text: string; sending?: boolean };

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: { text: string }) => [
      ...state,
      { id: crypto.randomUUID(), ...newTodo, sending: true },
    ],
  );

  return (
    <form
      action={async (formData) => {
        addOptimisticTodo({ text: formData.get('text') as string });
        await addTodoAction(formData);
      }}
    >
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
      <input name="text" />
      <button type="submit">追加</button>
    </form>
  );
}
```

### キャッシュ更新パターン

```tsx
import { revalidatePath, revalidateTag } from 'next/cache';

// パスベースの再検証（該当ページ全体を再検証）
revalidatePath('/users');
revalidatePath('/users/[id]', 'page');
revalidatePath('/users', 'layout');

// タグベースの再検証（特定データのみ）
// fetch 時にタグを付与
fetch('/api/users', { next: { tags: ['users'] } });
// 更新時にタグで再検証
revalidateTag('users');
```

### `'use cache'` ディレクティブ

関数やコンポーネント単位でキャッシュを制御する新しいパターン。

```tsx
import { cacheLife, cacheTag } from 'next/cache';

// ✅ 関数レベルのキャッシュ
async function getUsers() {
  'use cache';
  cacheLife('hours');    // キャッシュ有効期間
  cacheTag('users');     // タグベースの再検証用
  return await prisma.user.findMany();
}

// ✅ コンポーネントレベルのキャッシュ
async function UserStats() {
  'use cache';
  cacheLife('minutes');
  const stats = await computeStats();
  return <StatsDisplay stats={stats} />;
}
```

### `after()` API

レスポンス送信後にバックグラウンド処理を実行。ログ記録や分析に使用。

```tsx
import { after } from 'next/server';

export async function createUserAction(formData: FormData) {
  const user = await createUser(parsed.data);
  after(() => {
    // レスポンス後に非同期実行（ユーザーを待たせない）
    sendWelcomeEmail(user.email);
    logAuditEvent('user_created', user.id);
  });
  revalidatePath('/users');
}
```

---

## バックエンド別構成（API 連携）

> ⚠️ **Next.js 15+ では `fetch()` のデフォルトが `no-store`（キャッシュなし）に変更**されています。キャッシュが必要な場合は明示的に `cache: 'force-cache'` または `next: { revalidate: N }` を指定してください。

### API クライアント（`lib/api/`）

```tsx
// lib/api/client.ts
import 'server-only';

const API_BASE_URL = process.env.API_BASE_URL!;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, options?: { tags?: string[]; revalidate?: number }): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.getHeaders(),
      next: {
        tags: options?.tags,
        revalidate: options?.revalidate,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { ...this.getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  private getHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    };
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

### Server Components での fetch

```tsx
// app/users/page.tsx（Server Component）
import { apiClient } from '@/lib/api/client';

type UsersResponse = {
  data: User[];
  meta: { total: number; page: number };
};

export default async function UsersPage() {
  const { data: users } = await apiClient.get<UsersResponse>('/api/v1/users', {
    tags: ['users'],
    revalidate: 60, // 60秒キャッシュ
  });

  return <UserList users={users} />;
}
```

### Route Handlers（BFF パターン）

クライアントサイドから呼び出す API やバックエンド API のプロキシに使用。

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/lib/api/client';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get('page') || '1';

  try {
    const data = await apiClient.get(`/api/v1/users?page=${page}`);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: 'Failed to fetch users' },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
```

---

## 共通パターン

### エラーハンドリング

```tsx
// Server Component でのエラーハンドリング
// ⚠️ Next.js 15+ では params は Promise
export default async function UserPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getUserById(id);

  if (!user) {
    notFound(); // not-found.tsx を表示
  }

  return <UserProfile user={user} />;
}

// Server Actions でのエラーハンドリング
export async function updateUserAction(id: string, formData: FormData) {
  try {
    const parsed = UpdateUserSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return { errors: parsed.error.flatten().fieldErrors };
    }
    await updateUser(id, parsed.data);
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    return { error: '更新に失敗しました。もう一度お試しください。' };
  }
}
```

### 入力バリデーション（Zod）

```tsx
// ✅ Good - サーバー側で必ずバリデーション
import { z } from 'zod';

const UserSchema = z.object({
  name: z.string().min(1, '必須項目です').max(255),
  email: z.string().email('有効なメールアドレスを入力してください'),
  age: z.number().int().min(0).max(150).optional(),
});

type UserInput = z.infer<typeof UserSchema>;

// ❌ Bad - クライアント側バリデーションのみ
// フォームの required 属性だけに頼る
```

### セキュリティ

```tsx
// ✅ server-only パッケージで Client Component からの import を防止
// lib/db/queries/users.ts
import 'server-only';
// → Client Component から import するとビルドエラー

// ✅ 環境変数の管理
// サーバー専用（Client Component からアクセス不可）
DATABASE_URL="postgresql://..."
API_SECRET_KEY="secret-key"

// クライアントにも公開（公開して問題ない値のみ）
NEXT_PUBLIC_APP_URL="https://example.com"
NEXT_PUBLIC_GA_ID="G-XXXXX"

// ❌ Bad - 機密情報を NEXT_PUBLIC_ にしない
NEXT_PUBLIC_DATABASE_URL="..."   // 絶対にダメ
NEXT_PUBLIC_API_SECRET="..."     // 絶対にダメ
```

---

## 禁止事項

### ❌ Server Component で `use` フック系を使用

```tsx
// ❌ Bad
export default function UsersPage() {
  const [users, setUsers] = useState([]); // Server Component では使用不可
  useEffect(() => { fetchUsers(); }, []);
}

// ✅ Good - async Server Component
export default async function UsersPage() {
  const users = await getUsers();
  return <UserList users={users} />;
}
```

### ❌ Client Component で直接 DB アクセス

```tsx
// ❌ Bad - Client Component で Prisma を使う
'use client';
import { prisma } from '@/lib/prisma'; // ビルドエラー（server-only）

// ✅ Good - Server Action 経由
'use client';
import { createUserAction } from '@/lib/actions/user';

function CreateUserForm() {
  const [state, formAction] = useActionState(createUserAction, null);
  return <form action={formAction}>...</form>;
}
```

### ❌ Server Actions のバリデーション省略

```tsx
// ❌ Bad - バリデーションなし
'use server';
export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  await db.user.create({ data: { name } }); // 危険
}

// ✅ Good - Zod でバリデーション
'use server';
export async function createUser(formData: FormData) {
  const parsed = CreateUserSchema.safeParse({
    name: formData.get('name'),
  });
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  await db.user.create({ data: parsed.data });
}
```
