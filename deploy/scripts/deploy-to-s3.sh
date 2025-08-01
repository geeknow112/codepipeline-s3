#!/bin/bash

# S3デプロイスクリプト
# 使用方法: ./deploy-to-s3.sh YOUR-BUCKET-NAME

if [ $# -eq 0 ]; then
    echo "❌ エラー: S3バケット名を指定してください"
    echo "使用方法: ./deploy-to-s3.sh YOUR-BUCKET-NAME"
    exit 1
fi

BUCKET_NAME=$1
DEPLOY_DIR="deploy-artifacts"

echo "🚀 S3デプロイ開始"
echo "バケット名: $BUCKET_NAME"
echo "デプロイディレクトリ: $DEPLOY_DIR"

# 1. デプロイファイルの存在確認
if [ ! -d "$DEPLOY_DIR" ]; then
    echo "❌ エラー: $DEPLOY_DIR ディレクトリが見つかりません"
    echo "先に緊急デプロイスクリプトを実行してください: ./scripts/deploy/emergency-deploy.sh"
    exit 1
fi

# 2. AWS CLI の確認
if ! command -v aws &> /dev/null; then
    echo "❌ エラー: AWS CLI がインストールされていません"
    echo "AWS CLI をインストールしてください: https://aws.amazon.com/cli/"
    exit 1
fi

# 3. AWS認証情報の確認
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ エラー: AWS認証情報が設定されていません"
    echo "以下のコマンドで設定してください:"
    echo "aws configure"
    exit 1
fi

# 4. S3バケットの存在確認
if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
    echo "⚠️  バケット $BUCKET_NAME が存在しません。作成しますか? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "📦 S3バケットを作成中..."
        aws s3 mb "s3://$BUCKET_NAME"
        
        echo "🌐 静的Webサイトホスティングを有効化中..."
        aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html
        
        echo "🔓 パブリックアクセスを設定中..."
        aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy '{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicReadGetObject",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
                }
            ]
        }'
    else
        echo "❌ デプロイを中止しました"
        exit 1
    fi
fi

# 5. ファイルをS3にアップロード
echo "📤 ファイルをS3にアップロード中..."
aws s3 sync "$DEPLOY_DIR/" "s3://$BUCKET_NAME/" --delete

# 6. Content-Typeを正しく設定
echo "🏷️  Content-Typeを設定中..."
aws s3 cp "$DEPLOY_DIR/index.html" "s3://$BUCKET_NAME/index.html" --content-type "text/html"
aws s3 cp "$DEPLOY_DIR/style.css" "s3://$BUCKET_NAME/style.css" --content-type "text/css"
aws s3 cp "$DEPLOY_DIR/script.js" "s3://$BUCKET_NAME/script.js" --content-type "application/javascript"

# 7. デプロイ完了
echo ""
echo "🎉 デプロイ完了!"
echo "🌐 Webサイト URL: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo ""
echo "📋 確認コマンド:"
echo "aws s3 ls s3://$BUCKET_NAME/"
echo "curl -I http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo ""
echo "🔄 更新する場合は、このスクリプトを再実行してください"
