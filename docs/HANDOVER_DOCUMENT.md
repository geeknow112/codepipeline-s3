# 📋 CodePipeline S3 Demo プロジェクト引継ぎ資料

## 🎯 プロジェクト概要

**プロジェクト名**: CodePipeline S3 Demo  
**目的**: GitHub → CodePipeline → S3 の自動デプロイフロー学習環境  
**リポジトリ**: https://github.com/geeknow112/codepipeline-s3  
**最終更新**: 2025-08-01  

## 🏗️ システム構成

```
GitHub (PR merge) → CodePipeline → CodeBuild (Tests) → S3 Static Website
```

### AWSリソース
- **S3バケット (Website)**: `codepipeline-s3-demo-website-20250729`
- **S3バケット (Artifacts)**: `codepipeline-s3-demo-artifacts-20250729`
- **CodePipeline**: `codepipeline-s3-demo`
- **CodeBuild**: `codepipeline-s3-demo-build`
- **IAMロール**: `CodeBuildS3DemoRole`
- **リージョン**: `ap-northeast-1`

## 🔧 技術スタック

### ランタイム環境
- **Node.js**: 12.22.12 (CodeBuild制約)
- **PHP**: 7.4.33 (CodeBuild制約)
- **CodeBuildイメージ**: `aws/codebuild/amazonlinux2-x86_64-standard:3.0`

### テストフレームワーク
- **Jest**: Node.js テスト (29テスト)
- **PHPUnit**: PHP テスト (15テスト) - バージョン 8.5

### 依存関係
```json
// package.json
{
  "devDependencies": {
    "jest": "^27.5.1"
  }
}

// composer.json  
{
  "require-dev": {
    "phpunit/phpunit": "^8.5"
  }
}
```

## 📁 プロジェクト構造

```
codepipeline-s3/
├── scripts/                    # 運用スクリプト
│   └── deploy/
│       ├── emergency-deploy.sh # 緊急デプロイ
│       └── manual-deploy.sh    # 手動デプロイ
├── docs/                       # ドキュメント
│   ├── troubleshooting.md      # トラブルシューティング
│   └── github-connection-fix.md # GitHub接続修正
├── tests/                      # テストファイル
│   ├── simple.test.js          # Jest基本テスト
│   ├── website.test.js         # Jest包括テスト
│   ├── WebsiteTest.php         # PHPUnit メインテスト
│   └── WebsiteValidatorTest.php # PHPUnit バリデータテスト
├── src/                        # PHPソースコード
│   └── WebsiteValidator.php    # ウェブサイト検証ヘルパー
├── index.html                  # メインページ
├── style.css                   # スタイルシート
├── script.js                   # JavaScript
├── buildspec.yml               # CodeBuild設定
├── package.json                # Node.js設定
├── composer.json               # PHP設定
├── phpunit.xml                 # PHPUnit設定
├── DEPLOYMENT.md               # デプロイ手順書
├── INCIDENT_REPORT.md          # インシデントレポート
└── README.md                   # プロジェクト説明
```

## 🚀 デプロイフロー

### 1. 正常フロー (推奨)
```
1. ブランチ作成 → 2. 変更実装 → 3. PR作成 → 4. レビュー → 5. Merge → 6. 自動デプロイ
```

### 2. 緊急デプロイ
```bash
# OAuth エラー等でCodePipelineが動作しない場合
./scripts/deploy/emergency-deploy.sh
./deploy-with-profile.sh codepipeline-s3-demo-website-20250729
```

## 🧪 テスト実行

### ローカルテスト
```bash
# Node.js テスト
npm test

# PHP テスト  
./vendor/bin/phpunit --verbose

# 全テスト (buildspec.yml準拠)
./scripts/deploy/emergency-deploy.sh
```

### CodeBuildテスト
- **自動実行**: PR merge時
- **手動実行**: CodeBuildコンソールから
- **ログ確認**: CloudWatch Logs `/aws/codebuild/codepipeline-s3-demo-build`

## 🔑 認証情報

### AWS Profile
```bash
# 使用プロファイル
AWS_PROFILE=your-profile

# 確認コマンド
aws sts get-caller-identity --profile your-profile
```

### GitHub Token
```bash
# 保存場所 (実際のトークンは別途確認)
/mnt/c/Users/youre/Documents/git_repo/cloudwatch-monitoring/.env
GITHUB_TOKEN=ghp_****************************
```

## ⚠️ 既知の問題と対処法

### 1. CodeBuildランタイムエラー
**症状**: `Unknown runtime version named 'X' of nodejs`  
**対処**: buildspec.ymlでサポート済みバージョンを使用
```yaml
runtime-versions:
  nodejs: 12  # 10, 12 のみサポート
  php: 7.4    # 7.4, 8.0 サポート
```

### 2. PHP依存関係エラー
**症状**: `doctrine/instantiator requires php ^8.1`  
**対処**: PHP 7.4対応のパッケージバージョンを使用
```bash
composer install --no-interaction --prefer-dist --optimize-autoloader
```

### 3. GitHub OAuth エラー
**症状**: `OAuth token expired`  
**対処**: Personal Access Token の更新
- 参照: `docs/github-connection-fix.md`

## 🔄 定期メンテナンス

### 月次作業
- [ ] 依存関係の脆弱性チェック (`npm audit`, `composer audit`)
- [ ] CodeBuildログの確認・クリーンアップ
- [ ] S3バケットの使用量確認

### 四半期作業
- [ ] Node.js/PHPバージョンの更新検討
- [ ] CodeBuildイメージの更新検討
- [ ] テストカバレッジの確認・改善

## 📞 エスカレーション

### レベル1: 一般的な問題
- buildspec.yml構文エラー
- テスト失敗
- デプロイスクリプトエラー

### レベル2: インフラ問題  
- CodeBuild権限エラー
- S3アクセスエラー
- IAMロール問題

### レベル3: 重大な問題
- CodePipeline完全停止
- セキュリティインシデント
- データ損失

## 📚 参考資料

### 内部ドキュメント
- [DEPLOYMENT.md](./DEPLOYMENT.md) - デプロイ手順
- [docs/troubleshooting.md](./docs/troubleshooting.md) - トラブルシューティング
- [INCIDENT_REPORT.md](./INCIDENT_REPORT.md) - 過去のインシデント

### 外部リソース
- [AWS CodeBuild User Guide](https://docs.aws.amazon.com/codebuild/)
- [AWS CodePipeline User Guide](https://docs.aws.amazon.com/codepipeline/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [PHPUnit Documentation](https://phpunit.de/documentation.html)

## 🎯 今後の改善計画

### 短期 (1ヶ月)
- [ ] CodeBuildイメージの更新 (Node.js 18対応)
- [ ] テストカバレッジの向上
- [ ] エラーハンドリングの強化

### 中期 (3ヶ月)
- [ ] マルチ環境対応 (dev/staging/prod)
- [ ] セキュリティスキャンの自動化
- [ ] パフォーマンステストの追加

### 長期 (6ヶ月)
- [ ] Container化の検討
- [ ] Infrastructure as Code (CDK/Terraform)
- [ ] モニタリング・アラートの強化

---

## 📝 引継ぎチェックリスト

### 技術的理解
- [ ] システム構成の理解
- [ ] デプロイフローの理解
- [ ] テスト実行方法の理解
- [ ] トラブルシューティング手順の理解

### アクセス権限
- [ ] GitHubリポジトリアクセス確認
- [ ] AWS Console アクセス確認
- [ ] CodeBuild/CodePipeline 操作権限確認

### 実践演習
- [ ] ローカルでのテスト実行
- [ ] PR作成・merge実行
- [ ] 緊急デプロイスクリプト実行
- [ ] エラー発生時の対処実践

---

**作成者**: 開発チーム  
**引継ぎ日**: 2025-08-01  
**次回更新予定**: 2025-09-01
