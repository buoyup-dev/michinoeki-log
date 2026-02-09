# 環境構築ガイド

## 1. 前提条件

| ソフトウェア | バージョン | インストール方法 |
|-------------|-----------|-----------------|
| | | |

---

## 2. リポジトリのクローン

```bash
git clone [repository-url]
cd [project-name]
```

---

## 3. 依存関係のインストール

```bash
# バックエンド
composer install

# フロントエンド
npm install
```

---

## 4. 環境設定

```bash
# 環境ファイルのコピー
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate
```

### 4.1 必須の環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| DB_DATABASE | データベース名 | app_local |
| DB_USERNAME | DBユーザー名 | root |
| DB_PASSWORD | DBパスワード | |

---

## 5. データベースセットアップ

```bash
# データベース作成（手動で作成するか、以下のコマンド）
php artisan migrate

# シードデータ投入
php artisan db:seed
```

---

## 6. 開発サーバーの起動

```bash
# バックエンド
php artisan serve

# フロントエンド（別ターミナル）
npm run dev
```

アクセスURL: http://localhost:8000

---

## 7. 動作確認

- [ ] トップページが表示される
- [ ] ログインができる
- [ ] APIが正常に動作する

---

## 8. トラブルシューティング

### Q: [よくある問題]
**A:** [解決方法]

---

## 変更履歴

| 日付 | 変更者 | 内容 |
|------|--------|------|
| YYYY-MM-DD | | 初版作成 |
