#!/bin/bash

# 緊急デプロイスクリプト - OAuth エラー回避用
# CodePipeline の Source stage エラー時の手動デプロイ

echo "🚨 Emergency Deployment Script"
echo "OAuth エラー回避のための手動デプロイ実行"

# 1. 最新コードの確認
echo "=== 1. 最新コードの確認 ==="
git status
git log --oneline -3

# 2. テスト実行
echo "=== 2. テスト実行 ==="
echo "Node.js テスト実行中..."
npm test

echo "PHP テスト実行中..."
./vendor/bin/phpunit --verbose

# 3. buildspec.yml に従った検証
echo "=== 3. buildspec.yml 準拠検証 ==="
echo "ファイル存在確認..."
test -f index.html && echo "✅ index.html exists"
test -f style.css && echo "✅ style.css exists"
test -f script.js && echo "✅ script.js exists"

echo "コンテンツ検証..."
grep -q "CodePipeline S3 Demo" index.html && echo "✅ Title found"
grep -q "body" style.css && echo "✅ Body styles found"

echo "PHP構文チェック..."
find tests -name "*.php" -exec php -l {} \;

# 4. アーティファクト準備
echo "=== 4. デプロイ用ファイル準備 ==="
mkdir -p deploy-artifacts
cp index.html style.css script.js deploy-artifacts/
echo "✅ デプロイファイル準備完了"

# 5. S3デプロイ (手動)
echo "=== 5. S3デプロイ準備 ==="
echo "以下のコマンドでS3にデプロイできます:"
echo "aws s3 sync deploy-artifacts/ s3://YOUR-S3-BUCKET-NAME/ --delete"
echo "aws s3 cp deploy-artifacts/index.html s3://YOUR-S3-BUCKET-NAME/index.html --content-type text/html"
echo "aws s3 cp deploy-artifacts/style.css s3://YOUR-S3-BUCKET-NAME/style.css --content-type text/css"
echo "aws s3 cp deploy-artifacts/script.js s3://YOUR-S3-BUCKET-NAME/script.js --content-type application/javascript"

echo "🎯 緊急デプロイ準備完了"
echo "OAuth問題解決後、通常のCodePipelineを再開してください"
