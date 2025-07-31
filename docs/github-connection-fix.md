# GitHub OAuth エラー対処ガイド

## 🚨 問題: CodePipeline Source Stage でOAuthエラー

### 症状
- CodePipelineのSourceステージで失敗
- "OAuth authentication failed" または類似のエラー
- GitHubからのソースコード取得ができない

## 🔧 対処方法

### 1. AWSコンソールでの確認・修正

#### A. CodeStar Connections確認
```
1. AWSコンソール → Developer Tools → Settings → Connections
2. GitHub connectionの状態を確認
3. Status が "Available" でない場合は再設定
```

#### B. CodePipeline設定更新
```
1. CodePipeline → パイプライン選択
2. Edit → Source stage → Edit
3. Connection を再選択または新規作成
4. Repository と Branch を再設定
```

### 2. GitHub側での確認

#### A. OAuth Apps確認
```
1. GitHub → Settings → Developer settings → OAuth Apps
2. AWS CodePipeline関連のアプリを確認
3. 必要に応じて再認証
```

#### B. Personal Access Token使用
```
1. GitHub → Settings → Developer settings → Personal access tokens
2. 新しいトークンを生成 (repo, admin:repo_hook権限)
3. CodePipelineでWebhook設定を更新
```

### 3. 代替設定方法

#### A. CodeStar Connection新規作成
```bash
# AWS CLI使用例
aws codestar-connections create-connection \
    --provider-type GitHub \
    --connection-name "github-codepipeline-connection" \
    --region ap-northeast-1
```

#### B. Webhook手動設定
```
1. GitHub Repository → Settings → Webhooks
2. Add webhook
3. Payload URL: CodePipeline webhook URL
4. Content type: application/json
5. Events: Push, Pull request
```

## 🔍 トラブルシューティング

### エラーパターン別対処

#### "OAuth token expired"
- GitHub OAuth App で再認証
- Personal Access Token の更新

#### "Repository access denied"
- GitHubリポジトリの権限確認
- Organization設定でThird-party accessを許可

#### "Webhook delivery failed"
- GitHub Webhook設定の確認
- CodePipeline endpoint の確認

### 確認コマンド

```bash
# GitHub CLI で認証状態確認
gh auth status

# AWS CLI で接続状態確認
aws codestar-connections list-connections --region ap-northeast-1

# CodePipeline状態確認
aws codepipeline get-pipeline-state --name YOUR_PIPELINE_NAME --region ap-northeast-1
```

## 📋 推奨設定

### セキュアな設定
1. **CodeStar Connections使用** (OAuth Appより推奨)
2. **最小権限の原則** (必要な権限のみ付与)
3. **定期的な認証更新** (トークンローテーション)

### 監視設定
1. **CloudWatch Alarms** でパイプライン失敗を監視
2. **SNS通知** でエラー時の即座な通知
3. **CloudTrail** でAPI呼び出しをログ記録

## 🚀 修正後の確認

1. CodePipelineを手動実行
2. Source stageの成功を確認
3. 後続のBuild, Deploy stageの動作確認
4. GitHub Webhookの動作テスト (新しいcommitでトリガー確認)
