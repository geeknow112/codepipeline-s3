# CodePipeline S3 Demo

GitHub Pull Request Approve後にS3静的サイトへ自動デプロイするCodePipeline練習環境

## 🏗️ アーキテクチャ

```
GitHub (PR Approve) → CodePipeline → CodeBuild (with Tests) → S3 Static Website
```

## 📁 ファイル構成

```
codepipeline-s3-demo/
├── index.html          # メインページ
├── style.css           # スタイルシート
├── script.js           # JavaScript
├── buildspec.yml       # CodeBuild設定（テスト含む）
├── package.json        # Node.js設定・テスト設定
├── tests/              # テストファイル
│   ├── website.test.js # 包括的なWebサイトテスト
│   └── failure-demo.test.js # テスト失敗デモ用
└── README.md           # このファイル
```

## 🧪 自動テスト機能

### テストの種類
- ✅ **ファイル存在テスト**: 必要なファイルが存在するか
- ✅ **HTML構造テスト**: 適切なHTML構造か
- ✅ **CSS検証テスト**: CSS構文とレスポンシブデザイン
- ✅ **JavaScript検証テスト**: JS構文とDOM操作
- ✅ **コンテンツ検証テスト**: 期待されるコンテンツが含まれているか
- ✅ **設定ファイルテスト**: buildspec.yml、package.json等
- ✅ **セキュリティテスト**: 機密情報の漏洩チェック

### テスト実行フロー
```
1. File Existence Tests (ファイル存在確認)
2. Content Validation (コンテンツ検証)
3. HTML Structure Tests (HTML構造テスト)
4. CSS Validation (CSS検証)
5. JavaScript Validation (JavaScript検証)
6. Security Tests (セキュリティテスト)
```

### ローカルでのテスト実行
```bash
# 全テスト実行
npm test

# カバレッジ付きテスト
npm run test:coverage

# ウォッチモード
npm run test:watch
```

## 🚀 デプロイフロー

1. **GitHub**: Pull Requestを作成・Approve
2. **CodePipeline**: 自動的にトリガー
3. **CodeBuild**: 
   - 依存関係インストール
   - 🧪 **自動テスト実行**
   - ビルド処理
4. **テスト成功時**: S3に自動デプロイ
5. **テスト失敗時**: デプロイ停止・通知

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
- ✅ 🧪 **包括的自動テスト**
- ✅ **テスト失敗時のデプロイ停止**
- ✅ **テストカバレッジレポート**
- ✅ リアルタイムタイムスタンプ
- ✅ レスポンシブデザイン
- ✅ ビルドログ表示

## 🔄 更新方法

1. ファイルを編集
2. **テストを追加/更新**
3. GitHubにpush
4. Pull Request作成
5. **自動テスト実行**
6. テスト成功時 → Approve → 自動デプロイ
7. テスト失敗時 → デプロイ停止

## 🚨 テスト失敗のデモ

テスト失敗時の動作を確認するには：

1. `tests/failure-demo.test.js`の失敗テストをアンコメント
2. コミット・プッシュ
3. Pull Request作成
4. パイプラインがBuildステージで失敗することを確認

## 📝 ログ

- **テスト結果**: CodeBuildログで詳細確認
- **カバレッジ**: CodeBuildレポートで確認
- **デプロイ状況**: CodePipelineコンソールで確認

## 🎯 学習ポイント

- CI/CDパイプラインでの自動テスト統合
- テスト失敗時のデプロイ防止
- Jest を使用した包括的テストスイート
- CodeBuildでのテストレポート生成

---

**練習環境**: AWS CodePipeline + S3 Static Website Hosting + Automated Testing
