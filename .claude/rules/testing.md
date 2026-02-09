---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "e2e/**/*"
  - "__tests__/**/*"
  - "tests/**/*"
---

# テストルール

Vitest + React Testing Library（ユニット・統合テスト）と Playwright（E2E テスト）の規約を定義します。

---

## テスト構成

```
tests/
├── unit/                    # ユニットテスト
│   ├── lib/
│   │   └── utils.test.ts
│   └── components/
│       └── Button.test.tsx
├── integration/             # 統合テスト
│   ├── actions/
│   │   └── user-actions.test.ts
│   └── api/
│       └── users-route.test.ts
└── e2e/                     # E2Eテスト（Playwright）
    ├── auth.spec.ts
    └── users.spec.ts

# または、コロケーション方式
components/
├── Button/
│   ├── Button.tsx
│   └── Button.test.tsx      # コンポーネントと同じ場所に配置
```

---

## Vitest + React Testing Library

### コンポーネントテスト

```tsx
// components/ui/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('テキストが表示される', () => {
    render(<Button>送信</Button>);
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
  });

  it('クリック時にonClickが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>送信</Button>);
    await user.click(screen.getByRole('button', { name: '送信' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled時はクリックできない', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} disabled>送信</Button>);
    await user.click(screen.getByRole('button', { name: '送信' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### フォームコンポーネントのテスト

```tsx
// components/features/CreateUserForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CreateUserForm } from './CreateUserForm';

// Server Action のモック
vi.mock('@/lib/actions/user', () => ({
  createUserAction: vi.fn(),
}));

describe('CreateUserForm', () => {
  it('入力して送信できる', async () => {
    const user = userEvent.setup();
    const { createUserAction } = await import('@/lib/actions/user');

    render(<CreateUserForm />);

    await user.type(screen.getByLabelText('名前'), 'テストユーザー');
    await user.type(screen.getByLabelText('メール'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(createUserAction).toHaveBeenCalled();
    });
  });

  it('バリデーションエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<CreateUserForm />);

    // 空のまま送信
    await user.click(screen.getByRole('button', { name: '作成' }));

    await waitFor(() => {
      expect(screen.getByText('名前は必須です')).toBeInTheDocument();
    });
  });
});
```

### Server Components のテスト方針

Server Components は直接テストが困難なため、以下の戦略を取る：

```tsx
// ✅ Data Access Layer を単体テスト
// tests/unit/lib/db/queries/users.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsers, getUserById } from '@/lib/db/queries/users';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe('User Queries', () => {
  it('getUsers がユーザー一覧を返す', async () => {
    const { prisma } = await import('@/lib/prisma');
    const mockUsers = [{ id: '1', name: 'Test', email: 'test@example.com' }];
    vi.mocked(prisma.user.findMany).mockResolvedValue(mockUsers);

    const users = await getUsers();
    expect(users).toEqual(mockUsers);
  });
});
```

### Server Actions のテスト

```tsx
// tests/integration/actions/user-actions.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUserAction } from '@/lib/actions/user';

vi.mock('@/lib/db/mutations/users', () => ({
  createUser: vi.fn(),
}));
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('createUserAction', () => {
  it('有効なデータで作成できる', async () => {
    const { createUser } = await import('@/lib/db/mutations/users');
    vi.mocked(createUser).mockResolvedValue({ id: '1', name: 'Test', email: 'test@example.com' });

    const formData = new FormData();
    formData.set('name', 'Test User');
    formData.set('email', 'test@example.com');

    const result = await createUserAction(null, formData);
    expect(createUser).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('バリデーションエラー時にエラーを返す', async () => {
    const formData = new FormData();
    formData.set('name', '');
    formData.set('email', 'invalid-email');

    const result = await createUserAction(null, formData);
    expect(result).toHaveProperty('errors');
    expect(result.errors).toHaveProperty('email');
  });
});
```

---

## Playwright（E2E テスト）

### 基本構造

```tsx
// tests/e2e/users.spec.ts
import { test, expect } from '@playwright/test';

test.describe('ユーザー管理', () => {
  test.beforeEach(async ({ page }) => {
    // テスト前のセットアップ（ログイン等）
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('ユーザー一覧が表示される', async ({ page }) => {
    await page.goto('/users');
    await expect(page.getByRole('heading', { name: 'ユーザー一覧' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('ユーザーを作成できる', async ({ page }) => {
    await page.goto('/users/new');

    await page.fill('input[name="name"]', '新規ユーザー');
    await page.fill('input[name="email"]', 'new@example.com');
    await page.click('button[type="submit"]');

    await page.waitForURL('/users');
    await expect(page.getByText('新規ユーザー')).toBeVisible();
  });

  test('バリデーションエラーが表示される', async ({ page }) => {
    await page.goto('/users/new');

    // 空のまま送信
    await page.click('button[type="submit"]');

    await expect(page.getByText('名前は必須です')).toBeVisible();
  });
});
```

### Page Object Model パターン

```tsx
// tests/e2e/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByLabel('メールアドレス');
    this.passwordInput = page.getByLabel('パスワード');
    this.submitButton = page.getByRole('button', { name: 'ログイン' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

---

## テストの命名規則

### 日本語テスト名（推奨）

```tsx
describe('UserService', () => {
  it('ユーザーを作成できる', () => { ... });
  it('重複メールアドレスでエラーになる', () => { ... });
  it('存在しないユーザーIDでnullを返す', () => { ... });
});
```

### テスト名のパターン

```tsx
// 正常系
it('ユーザー一覧を取得できる', () => { ... });
it('ユーザーを作成できる', () => { ... });

// 異常系
it('バリデーションエラー時にエラーを返す', () => { ... });
it('存在しないIDで404を返す', () => { ... });

// 境界値
it('名前が255文字の場合に作成できる', () => { ... });
it('名前が256文字の場合にエラーになる', () => { ... });
```

---

## Mock パターン

### MSW（Mock Service Worker）

```tsx
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/v1/users', () => {
    return HttpResponse.json({
      data: [
        { id: '1', name: 'User 1', email: 'user1@example.com' },
        { id: '2', name: 'User 2', email: 'user2@example.com' },
      ],
    });
  }),

  http.post('/api/v1/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { data: { id: '3', ...body } },
      { status: 201 },
    );
  }),
];
```

### vi.mock

```tsx
// Next.js のモジュールモック
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/current-path',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

// 環境変数のモック
vi.stubEnv('DATABASE_URL', 'postgresql://test:test@localhost/test');
```

---

## テスト実行コマンド

```bash
# Vitest
npx vitest                              # ウォッチモード
npx vitest run                          # 全テスト（1回実行）
npx vitest run tests/unit               # ディレクトリ指定
npx vitest run --filter=UserService     # フィルタ
npx vitest --coverage                   # カバレッジ

# Playwright
npx playwright test                     # 全E2Eテスト
npx playwright test --ui               # UIモード
npx playwright test tests/e2e/users    # 特定ファイル
npx playwright test --grep="ユーザー"   # テスト名フィルタ
npx playwright show-report             # レポート表示
```
