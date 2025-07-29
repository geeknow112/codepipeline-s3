# CodePipeline S3 Demo

GitHub Pull Request Approve後にS3静的サイトへ自動デプロイするCodePipeline練習環境

## 🏗️ アーキテクチャ

```
GitHub (PR Approve) → CodePipeline → CodeBuild (Node.js + PHP Tests) → S3 Static Website
```

## 📁 ファイル構成

```
codepipeline-s3-demo/
├── index.html              # メインページ
├── style.css               # スタイルシート
├── script.js               # JavaScript
├── buildspec.yml           # ハイブリッドCodeBuild設定
├── package.json            # Node.js設定・Jest設定
├── composer.json           # PHP設定・PHPUnit設定
├── phpunit.xml             # PHPUnit設定
├── src/                    # PHPソースコード
│   └── WebsiteValidator.php # ウェブサイト検証ヘルパー
├── tests/                  # テストファイル
│   ├── simple.test.js      # Jest テスト (Node.js)
│   ├── WebsiteTest.php     # PHPUnit メインテスト
│   ├── WebsiteValidatorTest.php # PHPUnit バリデータテスト
│   └── results/            # テスト結果出力用
└── README.md               # このファイル
```

## 🧪 ハイブリッド自動テスト機能

### **Node.js + Jest テスト (5テスト)**
- ✅ **ファイル存在テスト**: HTML, CSS, JS ファイル
- ✅ **コンテンツ検証**: タイトル、スタイル確認

### **PHP + PHPUnit テスト (15テスト)**
- ✅ **ファイル存在テスト**: 全プロジェクトファイル
- ✅ **HTML構造テスト**: DOCTYPE, タグ構造, メタタグ
- ✅ **CSS検証テスト**: 構文、レスポンシブデザイン
- ✅ **JavaScript検証テスト**: 構文、関数、イベントリスナー
- ✅ **コンテンツ検証テスト**: 期待されるコンテンツ
- ✅ **設定ファイルテスト**: buildspec.yml、package.json等
- ✅ **セキュリティテスト**: 機密情報漏洩チェック
- ✅ **バリデータテスト**: WebsiteValidatorクラスのテスト

### **テスト実行フロー**
```
1. File Existence Tests (ファイル存在確認)
2. Content Validation (コンテンツ検証)
3. Node.js Jest Tests (5テスト実行)
4. PHP PHPUnit Tests (15テスト実行)
5. PHP Syntax Validation (PHP構文チェック)
```

### **ローカルでのテスト実行**

#### **Node.js テスト**
```bash
npm test                    # Jest テスト実行
npm run test:coverage       # カバレッジ付きテスト
```

#### **PHP テスト**
```bash
composer install            # 依存関係インストール
./vendor/bin/phpunit        # PHPUnit テスト実行
./vendor/bin/phpunit --coverage-html coverage  # カバレッジ付き
```

## 🚀 デプロイフロー

1. **GitHub**: Pull Requestを作成・Approve
2. **CodePipeline**: 自動的にトリガー
3. **CodeBuild**: 
   - Node.js 12 + PHP 7.4 環境セットアップ
   - 🧪 **Jest テスト実行** (5テスト)
   - 🧪 **PHPUnit テスト実行** (15テスト)
   - 構文検証・セキュリティチェック
4. **テスト成功時**: S3に自動デプロイ
5. **テスト失敗時**: デプロイ停止・通知

## 🔧 セットアップ

### 必要なAWSリソース

- S3バケット (ホスティング用)
- S3バケット (アーティファクト用)
- CodePipeline
- CodeBuild プロジェクト (Node.js + PHP対応)
- IAMロール

### 料金見積もり

- S3: ~$2.00/月
- CodePipeline: $1.00/月
- CodeBuild: ~$0.75/月 (ハイブリッドテストで実行時間増加)
- **合計: 約$3.75/月**

## 📊 機能

- ✅ 自動デプロイメント
- ✅ 🧪 **ハイブリッド自動テスト** (Node.js + PHP)
- ✅ **20テスト実行** (Jest 5 + PHPUnit 15)
- ✅ **テスト失敗時のデプロイ停止**
- ✅ **多言語テストレポート**
- ✅ **包括的構文・セキュリティ検証**
- ✅ リアルタイムタイムスタンプ
- ✅ レスポンシブデザイン

## 🔄 更新方法

1. ファイルを編集
2. **テストを追加/更新** (Jest または PHPUnit)
3. GitHubにpush
4. Pull Request作成
5. **ハイブリッドテスト実行** (Node.js + PHP)
6. テスト成功時 → Approve → 自動デプロイ
7. テスト失敗時 → デプロイ停止

## 🚨 テスト失敗のデモ

テスト失敗時の動作を確認するには：

1. `tests/failure-demo.test.js`の失敗テストをアンコメント (Jest)
2. または `tests/WebsiteTest.php`にわざと失敗するテストを追加 (PHPUnit)
3. コミット・プッシュ
4. Pull Request作成
5. パイプラインがBuildステージで失敗することを確認

## 📝 ログ・レポート

- **Jest テスト結果**: CodeBuildログで確認
- **PHPUnit テスト結果**: CodeBuildログ + JUnit XMLレポート
- **テストカバレッジ**: 両言語のカバレッジレポート
- **デプロイ状況**: CodePipelineコンソールで確認

## 🎯 学習ポイント

- **マルチ言語CI/CDパイプライン**の構築
- **Node.js + PHP ハイブリッドテスト環境**
- **Jest + PHPUnit 統合テスト**
- **包括的テストスイート設計**
- **テスト失敗時のデプロイ防止**

## 🔍 テスト詳細

### **Jest テスト (tests/simple.test.js)**
- 基本的なファイル存在・内容確認
- 高速実行 (~10秒)

### **PHPUnit テスト (tests/WebsiteTest.php, tests/WebsiteValidatorTest.php)**
- 包括的な構造・構文・セキュリティ検証
- 詳細なバリデーション (~30秒)

---

**練習環境**: AWS CodePipeline + S3 Static Website Hosting + Hybrid Automated Testing (Node.js + PHP)
