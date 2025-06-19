# 美少女魔法使いダンジョンクリッカーゲーム ✨

React + TypeScriptで作られた魔法少女をテーマにしたクリッカーゲームです。

## 🎮 ゲーム機能

- 🎯 **クリック攻撃システム** & 自動戦闘
- ⚡ **魔法スキルシステム** - 攻撃時のランダムフレーズ
- 💥 **悲鳴システム** - プレイヤー被ダメージ時の反応
- 🎒 **装備システム** - ドロップ・装備・アップグレード機能
- ⭐ **装備強化** - 5個でアップグレード（カタカナ名変更）
- 📊 **ステータス強化** - 3列グリッドレイアウト
- 🏆 **称号・レベルアップシステム**
- 🎁 **アイテムコレクション** - 売却機能付き
- 🏰 **ダンジョン・フロアシステム**

## 🚀 クイックスタート

### Docker を使用（推奨）

#### 本番環境（ビルド済み）
```bash
# リポジトリをクローン
git clone https://github.com/markun128/magical-girl-dungeon-clicker.git
cd magical-girl-dungeon-clicker

# Docker Composeで起動
docker-compose up -d

# ブラウザで http://localhost:3000 にアクセス
```

#### 開発環境（ホットリロード）
```bash
# 開発環境で起動
docker-compose -f docker-compose.dev.yml up -d

# ブラウザで http://localhost:3000 にアクセス
```

### 通常のNode.js環境

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start

# ブラウザで http://localhost:3000 にアクセス
```

## 🛠️ 技術仕様

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: カスタムCSS（グラデーション・アニメーション）
- **コンテナ**: Docker + Nginx
- **レスポンシブ対応**: モバイル・デスクトップ

## 📦 Dockerコマンド

```bash
# 本番環境ビルド・起動
docker-compose up --build

# 開発環境起動
docker-compose -f docker-compose.dev.yml up --build

# コンテナ停止
docker-compose down

# ログ確認
docker-compose logs -f
```

## 🎯 ゲームの遊び方

1. **攻撃**: モンスターをクリックして攻撃
2. **自動戦闘**: ゴールドを使って自動戦闘を有効化
3. **装備**: ドロップした装備を装着してステータス強化
4. **アップグレード**: 同じ装備5個で強化（名前がカタカナに変更）
5. **魔法**: レベルアップで新しい魔法を習得
6. **ダンジョン**: フロアを進んで強敵に挑戦

## 🤖 開発者

Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

## 📄 ライセンス

MIT License