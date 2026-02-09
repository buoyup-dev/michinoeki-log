---
name: fix-issue
description: GitHub Issueを解決するワークフロー
disable-model-invocation: false
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# Issue修正スキル

GitHub Issueを解決するための標準ワークフローです。

## 実行手順

### 1. Issue内容の確認
引数で渡されたIssue番号（$ARGUMENTS）の内容を確認します。

```bash
gh issue view $ARGUMENTS
```

### 2. 関連コードの調査
- Issueの内容から関連するファイルを特定
- 既存の実装を理解

### 3. 修正の実施
- 必要なコード変更を実施
- Next.js規約に従う（CLAUDE.mdとrules参照）

### 4. テストの作成・実行
```bash
# 関連テストの実行
npx vitest run --filter=関連ファイル名

# E2Eテスト（UI変更の場合）
npx playwright test tests/e2e/関連ファイル

# 新規テストが必要な場合は作成
```

### 5. コードフォーマット・型チェック
```bash
npx eslint --fix .
npx tsc --noEmit
```

### 6. 確認事項
- [ ] Server/Client Components が適切に分離されているか
- [ ] ハイドレーションエラーが発生しないか
- [ ] Server Actions にバリデーションがあるか
- [ ] 型安全性が保たれているか（`as` キャストを使っていないか）
- [ ] テストがパスするか
- [ ] セキュリティ上の問題がないか（環境変数漏洩等）

### 7. コミット
```bash
git add <変更ファイル>
git commit -m "fix: #{Issue番号} {修正内容の要約}"
```

## 使用例

```
/fix-issue 123
```
