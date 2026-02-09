---
name: pr-review
description: PRのコードレビューを実施
disable-model-invocation: false
allowed-tools: Read, Grep, Glob, Bash
---

# PRレビュースキル

Pull Requestのコードレビューを実施します。

## 実行手順

### 1. PR情報の取得
```bash
gh pr view $ARGUMENTS
gh pr diff $ARGUMENTS
```

### 2. 変更ファイルの確認
変更されたファイルを一つずつ確認します。

### 3. レビュー観点

#### Next.js固有のチェック
- [ ] `'use client'` が適切か（末端コンポーネントに限定されているか）
- [ ] `params` / `searchParams` を `await` しているか（Next.js 15+）
- [ ] Server Actions にバリデーション（Zod）があるか
- [ ] バンドルサイズへの影響（不要な Client Component、大きなライブラリ）
- [ ] 環境変数の漏洩リスク（`NEXT_PUBLIC_` に機密情報がないか）
- [ ] `server-only` でサーバー専用コードを保護しているか
- [ ] キャッシュ戦略が適切か（`'use cache'` / revalidatePath / revalidateTag）
- [ ] `fetch()` のキャッシュ設定が意図通りか（デフォルトは `no-store`）
- [ ] Data Access Layer（`lib/db/`）を経由しているか

#### 共通チェック
- [ ] テストが書かれているか
- [ ] セキュリティ上の問題がないか
- [ ] TypeScript の型安全性（`as` キャスト、`any` の回避）
- [ ] コーディング規約に従っているか
- [ ] 命名は明確か

### 4. レビューコメントの投稿
問題を発見した場合、以下の形式でコメント：

```
[severity] 問題の説明

**該当箇所**: ファイル名:行番号

**現在のコード**:
問題のあるコード

**改善案**:
改善後のコード
```

### 5. レビュー結果の投稿
```bash
gh pr review $ARGUMENTS --comment --body "レビュー結果"
# または
gh pr review $ARGUMENTS --approve --body "LGTM"
gh pr review $ARGUMENTS --request-changes --body "修正をお願いします"
```

## 使用例

```
/pr-review 456
```
