#!/bin/bash

# S3デプロイスクリプト (lober-system プロファイル用)
# 使用方法: ./deploy-with-profile.sh [BUCKET-NAME]

PROFILE_NAME="lober-system"
DEPLOY_DIR="deploy-artifacts"
BUCKET_NAME=${1:-"codepipeline-s3-demo-website-20250729"}

echo "🚀 S3デプロイ開始 (Profile: $PROFILE_NAME)"
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
    exit 1
fi

# 3. AWS認証情報の確認 (プロファイル指定)
if ! aws sts get-caller-identity --profile "$PROFILE_NAME" &> /dev/null; then
    echo "❌ エラー: プロファイル $PROFILE_NAME の認証情報が設定されていません"
    exit 1
fi

echo "✅ 認証情報確認完了 (Profile: $PROFILE_NAME)"

# 4. S3バケットの存在確認
if ! aws s3 ls "s3://$BUCKET_NAME" --profile "$PROFILE_NAME" &> /dev/null; then
    echo "❌ エラー: バケット $BUCKET_NAME が存在しません"
    echo "利用可能なバケット:"
    aws s3 ls --profile "$PROFILE_NAME" | grep codepipeline
    exit 1
fi

echo "✅ S3バケット確認完了: $BUCKET_NAME"

# 5. 静的Webサイト設定の確認・設定
echo "🌐 静的Webサイトホスティング設定中..."
aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html --profile "$PROFILE_NAME"

# 6. ファイルをS3にアップロード
echo "📤 ファイルをS3にアップロード中..."
aws s3 sync "$DEPLOY_DIR/" "s3://$BUCKET_NAME/" --delete --profile "$PROFILE_NAME"

# 7. Content-Typeを正しく設定
echo "🏷️  Content-Typeを設定中..."
aws s3 cp "$DEPLOY_DIR/index.html" "s3://$BUCKET_NAME/index.html" --content-type "text/html" --profile "$PROFILE_NAME"
aws s3 cp "$DEPLOY_DIR/style.css" "s3://$BUCKET_NAME/style.css" --content-type "text/css" --profile "$PROFILE_NAME"
aws s3 cp "$DEPLOY_DIR/script.js" "s3://$BUCKET_NAME/script.js" --content-type "application/javascript" --profile "$PROFILE_NAME"

# 8. バケットポリシー設定 (パブリックアクセス許可)
echo "🔓 パブリックアクセス設定中..."
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --profile "$PROFILE_NAME" --policy '{
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
}' 2>/dev/null || echo "⚠️  バケットポリシー設定をスキップ (権限不足の可能性)"

# 9. デプロイ完了
echo ""
echo "🎉 デプロイ完了!"
echo "🌐 Webサイト URL: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo ""
echo "📋 確認コマンド:"
echo "aws s3 ls s3://$BUCKET_NAME/ --profile $PROFILE_NAME"
echo "curl -I http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo ""
echo "🔄 更新する場合は、このスクリプトを再実行してください"
