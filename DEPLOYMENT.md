# 🚀 CodePipeline S3 Demo デプロイ手順

## 📋 デプロイ方法

このプロジェクトには3つのデプロイ方法があります：

### 1. 🔄 自動デプロイ (推奨)
GitHub → CodePipeline → S3 の自動パイプライン

### 2. 🚨 緊急デプロイ
OAuth エラーなどでCodePipelineが動作しない場合

### 3. 🛠️ 手動デプロイ
完全手動でのS3デプロイ

---

## 🚨 緊急デプロイ手順

### ステップ1: 緊急デプロイスクリプト実行
```bash
./scripts/deploy/emergency-deploy.sh
```

このスクリプトは以下を実行します：
- ✅ 最新コードの確認
- ✅ Node.js テスト実行 (Jest)
- ✅ PHP テスト実行 (PHPUnit)
- ✅ buildspec.yml 準拠検証
- ✅ デプロイファイル準備 (`deploy-artifacts/` フォルダ作成)

### ステップ2: AWS認証情報設定
```bash
aws configure
```

以下の情報を入力：
- AWS Access Key ID
- AWS Secret Access Key
- Default region name (例: us-east-1)
- Default output format (json)

### ステップ3: S3デプロイ実行
```bash
./deploy-to-s3.sh YOUR-BUCKET-NAME
```

例：
```bash
./deploy-to-s3.sh my-codepipeline-demo-site
```

---

## 🛠️ 手動デプロイ手順

### 1. テスト実行
```bash
# Node.js テスト
npm test

# PHP テスト
composer test
```

### 2. デプロイファイル準備
```bash
mkdir -p deploy-manual
cp index.html style.css script.js deploy-manual/
```

### 3. S3バケット作成 (初回のみ)
```bash
# バケット作成
aws s3 mb s3://YOUR-BUCKET-NAME

# 静的Webサイト設定
aws s3 website s3://YOUR-BUCKET-NAME --index-document index.html

# パブリックアクセス許可
aws s3api put-bucket-policy --bucket YOUR-BUCKET-NAME --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}'
```

### 4. ファイルアップロード
```bash
# ファイル同期
aws s3 sync deploy-manual/ s3://YOUR-BUCKET-NAME/ --delete

# Content-Type設定
aws s3 cp deploy-manual/index.html s3://YOUR-BUCKET-NAME/index.html --content-type text/html
aws s3 cp deploy-manual/style.css s3://YOUR-BUCKET-NAME/style.css --content-type text/css
aws s3 cp deploy-manual/script.js s3://YOUR-BUCKET-NAME/script.js --content-type application/javascript
```

---

## 🌐 デプロイ後の確認

### Webサイトアクセス
```
http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com
```

### ファイル確認
```bash
aws s3 ls s3://YOUR-BUCKET-NAME/
```

### レスポンス確認
```bash
curl -I http://YOUR-BUCKET-NAME.s3-website-us-east-1.amazonaws.com
```

---

## 🔧 トラブルシューティング

### AWS認証エラー
```bash
aws sts get-caller-identity
```

### バケットアクセスエラー
- バケット名の重複確認
- リージョンの確認
- IAM権限の確認

### Content-Type問題
```bash
# 個別ファイルの再アップロード
aws s3 cp index.html s3://YOUR-BUCKET-NAME/ --content-type text/html
```

---

## 📁 デプロイファイル構成

```
deploy-artifacts/
├── index.html    # メインページ
├── style.css     # スタイルシート
└── script.js     # JavaScript
```

---

## 🎯 デプロイ成功の確認項目

- ✅ 全テスト通過 (Node.js + PHP)
- ✅ ファイル存在確認
- ✅ Content-Type正常設定
- ✅ Webサイト正常表示
- ✅ レスポンシブデザイン動作

---

## 📞 サポート

デプロイに問題がある場合は、以下を確認してください：

1. `docs/troubleshooting.md` - 一般的な問題
2. `docs/github-connection-fix.md` - GitHub連携問題
3. テストログの確認
4. AWS CloudWatch ログの確認
