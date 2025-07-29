# CodePipeline S3 Demo

GitHub Pull Request Approve後にS3静的サイトへ自動デプロイするCodePipeline練習環境

## 🏗️ アーキテクチャ

```
GitHub (PR Approve) → CodePipeline → CodeBuild → S3 Static Website
```

## 📁 ファイル構成

```
codepipeline-s3-demo/
├── index.html          # メインページ
├── style.css           # スタイルシート
├── script.js           # JavaScript
├── buildspec.yml       # CodeBuild設定
└── README.md           # このファイル
```

## 🚀 デプロイフロー

1. **GitHub**: Pull Requestを作成・Approve
2. **CodePipeline**: 自動的にトリガー
3. **CodeBuild**: buildspec.ymlに基づいてビルド
4. **S3**: 静的サイトとしてホスティング

## 🔧 セットアップ

### 必要なAWSリソース

- S3バケット (ホスティング用)
- S3バケット (アーティファクト用)
- CodePipeline
- CodeBuild プロジェクト
- IAMロール

### 料金見積もり

- S3: ~$2.00/月
- CodePipeline: $1.00/月
- CodeBuild: ~$0.50/月 (100分)
- **合計: 約$3.50/月**

## 📊 機能

- ✅ 自動デプロイメント
- ✅ リアルタイムタイムスタンプ
- ✅ レスポンシブデザイン
- ✅ ビルドログ表示

## 🔄 更新方法

1. ファイルを編集
2. GitHubにpush
3. Pull Request作成
4. Approve → 自動デプロイ

## 📝 ログ

デプロイ状況はCodeBuildのログで確認できます。

---

**練習環境**: AWS CodePipeline + S3 Static Website Hosting
