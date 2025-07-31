# CodePipeline トリガーされない問題の診断

## 🔍 AWSコンソールで確認すべき項目

### 1. CodePipeline設定確認
```
AWS Console → CodePipeline → パイプライン選択

確認項目:
□ Source stage の設定
  - Repository: geeknow112/codepipeline-s3
  - Branch: main
  - Change detection: GitHub webhooks (推奨) または CloudWatch Events
  
□ パイプライン実行履歴
  - 最後の実行時刻
  - 実行状態（成功/失敗/実行中）
  
□ Source stage詳細
  - Connection status: Available
  - OAuth認証状態
```

### 2. GitHub Webhook確認
```
GitHub → geeknow112/codepipeline-s3 → Settings → Webhooks

確認項目:
□ Webhook存在確認
□ Payload URL: AWS CodePipeline endpoint
□ Content type: application/json
□ SSL verification: Enable
□ Events: Push events
□ Active: ✓
□ Recent Deliveries: 成功しているか
```

### 3. CodeStar Connections確認
```
AWS Console → Developer Tools → Settings → Connections

確認項目:
□ GitHub connection status: Available
□ Connection name
□ 最終更新時刻
```

## 🔧 修正方法

### 方法1: Webhook手動設定
```
1. CodePipeline → パイプライン → Source stage → Edit
2. "GitHub webhooks" を選択
3. Webhook URLをコピー
4. GitHub → Settings → Webhooks → Add webhook
5. Payload URL: コピーしたURL
6. Content type: application/json
7. Events: Just the push event
8. Active: ✓
```

### 方法2: CloudWatch Events使用
```
1. CodePipeline → パイプライン → Source stage → Edit
2. "CloudWatch Events" を選択
3. EventBridge rule が自動作成される
4. GitHub push時にEventBridge経由でトリガー
```

### 方法3: 手動実行でテスト
```
1. CodePipeline → パイプライン選択
2. "Release change" ボタンをクリック
3. 手動でパイプライン実行
4. 各ステージの動作確認
```

## 🚨 緊急対処法

### 手動デプロイ実行
```bash
# 1. 最新コードでテスト実行
npm test
./vendor/bin/phpunit

# 2. S3に直接デプロイ
aws s3 sync . s3://YOUR-BUCKET-NAME/ \
  --exclude "node_modules/*" \
  --exclude "vendor/*" \
  --exclude ".git/*" \
  --exclude "tests/*"
```

## 📋 診断コマンド

### AWS CLI使用可能な場合
```bash
# パイプライン一覧
aws codepipeline list-pipelines

# パイプライン状態確認
aws codepipeline get-pipeline-state --name YOUR-PIPELINE-NAME

# 実行履歴確認
aws codepipeline list-pipeline-executions --pipeline-name YOUR-PIPELINE-NAME
```

### GitHub CLI使用
```bash
# Webhook確認（admin権限必要）
gh api repos/geeknow112/codepipeline-s3/hooks

# 最新のpush確認
gh api repos/geeknow112/codepipeline-s3/commits/main
```
