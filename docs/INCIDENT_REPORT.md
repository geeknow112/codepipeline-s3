# 🚨 インシデントレポート: CodeBuild PHP依存関係エラー

## 📋 インシデント概要

**発生日時**: 2025-08-01 09:07:45 JST  
**影響範囲**: CodePipeline全体 (Build Stage失敗)  
**重要度**: High (デプロイ完全停止)  
**ステータス**: 解決済み  

## 🔍 問題の詳細

### 初期エラー (Build #19)
```
YAML_FILE_ERROR: Unknown runtime version named '18' of nodejs. 
This build image has the following versions: 10, 12
```

### 主要エラー (Build #20)
```
doctrine/instantiator 2.0.0 requires php ^8.1 -> your php version (7.4.33) does not satisfy that requirement.
```

## 🎯 根本原因

1. **Node.jsバージョン不整合**
   - buildspec.ymlでNode.js 18を指定
   - CodeBuildイメージ `amazonlinux2-x86_64-standard:3.0` はNode.js 10,12のみサポート

2. **PHP依存関係の競合**
   - `composer.lock`がPHP 8.1以上を要求するパッケージでロック
   - CodeBuild環境はPHP 7.4を使用
   - `doctrine/instantiator 2.0.0`がPHP ^8.1を要求

## 🔧 実施した対処

### 1. Node.jsバージョン修正
```yaml
# Before
runtime-versions:
  nodejs: 18
  php: 8.1

# After  
runtime-versions:
  nodejs: 12
  php: 7.4
```

### 2. PHP依存関係の修正
```json
// composer.json
"require-dev": {
    "phpunit/phpunit": "^8.5"  // ^9.5 から変更
}
```

### 3. PHPUnitメソッド修正
```php
// Before (PHPUnit 9.x)
$this->assertDoesNotMatchRegularExpression()

// After (PHPUnit 8.x)
$this->assertNotRegExp()
```

## 📊 影響とダウンタイム

- **ダウンタイム**: 約4時間 (09:07 - 13:00)
- **失敗したビルド**: 2回 (Build #19, #20)
- **影響を受けた機能**: 自動デプロイ全体
- **ユーザー影響**: なし (開発環境のため)

## ✅ 解決確認

### テスト結果
- **Jest テスト**: 29/29 成功 ✅
- **PHPUnit テスト**: 15/15 成功 ✅
- **PHP構文チェック**: 成功 ✅
- **CodeBuild**: 成功 ✅

### 最終コミット
```
f09e8d6 - fix: Update dependencies for PHP 7.4 compatibility in CodeBuild
```

## 🔄 再発防止策

### 1. 環境整合性チェック
- [ ] buildspec.ymlとCodeBuildイメージの対応表作成
- [ ] ローカル環境とCodeBuild環境の差異チェックリスト作成

### 2. 依存関係管理
- [ ] composer.lockの定期的な検証
- [ ] PHP/Node.jsバージョン固定化ポリシー策定

### 3. テスト強化
- [ ] buildspec.yml変更時の事前検証手順
- [ ] 依存関係更新時のテストプロセス

## 📚 学習ポイント

1. **CodeBuildイメージの制約理解**
   - 各イメージでサポートされるランタイムバージョンの確認が重要
   
2. **依存関係の互換性**
   - composer.lockとランタイム環境の整合性確認が必須
   
3. **段階的なエラー対処**
   - 複数のエラーが連鎖する場合の優先順位付け

## 🔗 関連リソース

- CodeBuild Build #19 Log (CloudWatch Logs)
- CodeBuild Build #20 Log (CloudWatch Logs)
- Pull Request #16 (GitHub)

## 👥 対応者

- **主担当**: 開発チーム
- **確認者**: geeknow112
- **承認者**: geeknow112

---
**作成日**: 2025-08-01  
**最終更新**: 2025-08-01  
**次回レビュー**: 2025-08-15
