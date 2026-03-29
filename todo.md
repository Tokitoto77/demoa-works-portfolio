# Demoa-works Portfolio 開発チェックリスト

## 完了済み機能

### 基本構成
- [x] ポートフォリオサイトの基本構成完成（ヘッダー、制作事例、できること、自己紹介、FAQ、CTA）
- [x] ココナラ出品ページへのリンク統一完了（https://coconala.com/services/4032014）
- [x] FAQセクション直後にサービス詳細資料リンク追加（Google Slidesへのリンク）

### 制作事例セクション
- [x] ピラティススタジオLP実績掲載（サンプル、スマホモックアップ）
- [x] ハウスクリーニングLP実績掲載（サンプル、スマホモックアップ、提案書PDF）
- [x] ハウスクリーニング提案書PDFの最適化完了（2.6MB→1.4MB）
- [x] ハウスクリーニング エアコンお掃除キャンペーンLP画像入れ替え完了（新しいスマホモックアップ）
- [x] ハウスクリーニング 提案書PDF差し替え完了（新しい提案書14ページ）

### データベース機能
- [x] web-db-user機能を追加（PostgreSQL、Node.js + Express、Manus OAuth、tRPC）
- [x] visitorProfiles テーブルスキーマ設計・実装
- [x] データベースマイグレーション実行（pnpm db:push）
- [x] server/db.ts にクエリヘルパー実装（3関数）
- [x] server/routers.ts にtRPC APIエンドポイント実装（3エンドポイント）
- [x] server/visitor.test.ts で包括的なテスト実装（10テスト、全て成功）

## 進行中の機能

### フロントエンド統合
- [ ] 訪問者プロフィール保存フォームコンポーネント実装
- [ ] tRPCフックを使用したフロントエンド統合
- [ ] フォーム検証とエラーハンドリング

### 追加LP実績
- [x] コーチングLP画像入れ替え完了（新しい実際版 EXECUTIVE ENGLISH COACHING）
- [x] メディアファイル最適化完了（12个ファイルをS3にアップロード）
- [ ] ハンドメイドLP実績掲載（未完成）
- [ ] その他LP実績追加予定

### 今後の検討項目
- [ ] YouTubeの動画埋め込み検討（https://youtu.be/AljQrHY-F6I）
- [ ] 訪問者プロフィール管理ダッシュボード（管理者向け）
- [ ] 訪問者データの分析・レポート機能

## 技術スタック
- フロントエンド: React + TypeScript + Vite
- スタイリング: Tailwind CSS
- アイコン: lucide-react
- バックエンド: Node.js + Express + tRPC
- データベース: PostgreSQL（Drizzle ORM）
- 認証: Manus OAuth
- テスト: Vitest
- デプロイ: GitHub Pages

## 最新チェックポイント
- b3a7f26e: 提案書PDF最適化完了
