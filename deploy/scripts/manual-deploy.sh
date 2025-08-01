#!/bin/bash

# 手動デプロイスクリプト - CodePipeline問題回避用

echo "🚀 手動デプロイ実行中..."

cd codepipeline-s3

# 1. テスト実行
echo "=== テスト実行 ==="
npm test --silent
if [ $? -ne 0 ]; then
    echo "❌ Jest テスト失敗"
    exit 1
fi

./vendor/bin/phpunit --verbose
if [ $? -ne 0 ]; then
    echo "❌ PHPUnit テスト失敗"
    exit 1
fi

echo "✅ 全テスト成功"

# 2. デプロイファイル準備
echo "=== デプロイファイル準備 ==="
mkdir -p deploy
cp index.html style.css script.js deploy/

# 3. S3デプロイコマンド表示
echo "=== S3デプロイコマンド ==="
echo "以下のコマンドを実行してください："
echo ""
echo "# S3バケット名を確認"
echo "aws s3 ls | grep codepipeline"
echo ""
echo "# ファイルをS3にアップロード"
echo "aws s3 sync deploy/ s3://YOUR-BUCKET-NAME/ --delete"
echo ""
echo "# 個別ファイルのContent-Type設定"
echo "aws s3 cp deploy/index.html s3://YOUR-BUCKET-NAME/index.html --content-type text/html"
echo "aws s3 cp deploy/style.css s3://YOUR-BUCKET-NAME/style.css --content-type text/css"
echo "aws s3 cp deploy/script.js s3://YOUR-BUCKET-NAME/script.js --content-type application/javascript"

echo ""
echo "🎯 手動デプロイ準備完了"
echo "v2.1.2の変更がS3サイトに反映されます"
