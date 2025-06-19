# ✨ 美少女魔法使いダンジョンクリッカーゲーム ✨

<div align="center">

![Game Screenshot](https://img.shields.io/badge/Game-Magical%20Girl%20Clicker-ff69b4?style=for-the-badge&logo=gamemaker&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**React + TypeScriptで作られた萌え系クリッカーゲーム**

[🎮 プレイする](#-クイックスタート) • [🚀 機能](#-ゲーム機能) • [🐳 Docker](#-docker実行方法) • [🛠️ 開発](#-開発環境)

</div>

---

## 📖 概要

美少女魔法使い「セラフィナ」となってダンジョンを攻略するクリッカーゲームです。
モンスターを倒し、装備を集め、魔法を習得しながら階層を進んでいきましょう！

## 🎮 ゲーム機能

### ⚔️ バトルシステム
- **クリック攻撃** - モンスターをクリックして攻撃
- **自動戦闘** - ゴールドで自動攻撃を有効化
- **魔法攻撃** - レベルアップで新しい魔法を習得
- **悲鳴システム** - 被ダメージ時のリアクション

### 🎒 装備システム
- **装備ドロップ** - モンスター討伐で装備を獲得
- **装備強化** - 同じ装備5個でアップグレード
- **カタカナ化** - 最大強化時に名前がカッコよく変化
- **ステータス向上** - 攻撃力・防御力・HP・クリティカル率

### 📊 成長システム
- **レベルアップ** - 経験値でキャラクター成長
- **ステータス強化** - ゴールドで各能力値を向上
- **称号システム** - 条件達成で新しい称号を獲得
- **魔法習得** - プレイヤーレベルで新魔法解放

### 🏰 ダンジョン探索
- **フロア進行** - 強敵を倒して上の階層へ
- **ダンジョン変化** - フロアごとに異なる環境
- **モンスター進化** - 階層が上がると敵も強化

### 🎁 コレクション
- **アイテム収集** - 様々なアイテムをコレクション
- **売却システム** - 不要アイテムをゴールドに換金
- **レアリティ** - Common～Legendaryの装備レアリティ

## 🚀 クイックスタート

### 🐳 Docker を使用（推奨）

#### 本番環境
```bash
# リポジトリをクローン
git clone https://github.com/markun128/magical-girl-dungeon-clicker.git
cd magical-girl-dungeon-clicker

# Docker Composeで起動
docker-compose up -d

# ブラウザで http://localhost:3000 にアクセス
```

#### 開発環境
```bash
# 開発環境で起動（ホットリロード対応）
docker-compose -f docker-compose.dev.yml up -d
```

### 💻 通常のNode.js環境

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start

# ブラウザで http://localhost:3000 にアクセス
```

## 🛠️ 技術仕様

| 項目 | 技術 |
|------|------|
| **フロントエンド** | React 18 + TypeScript |
| **スタイリング** | カスタムCSS（グラデーション・アニメーション） |
| **ビルドツール** | Create React App |
| **コンテナ** | Docker + Nginx |
| **デプロイ** | マルチステージビルド |

## 🐳 Docker実行方法

### 基本コマンド
```bash
# 本番環境ビルド・起動
docker-compose up --build

# バックグラウンド実行
docker-compose up -d

# 開発環境起動
docker-compose -f docker-compose.dev.yml up --build

# コンテナ停止
docker-compose down

# ログ確認
docker-compose logs -f magical-girl-game
```

### Docker構成
- **本番環境**: Nginx + 静的ファイル配信（軽量）
- **開発環境**: Node.js + ホットリロード（開発効率）
- **ポート**: 3000番でアクセス可能

## 🎯 ゲームの遊び方

### 1. 基本操作
1. **攻撃** - モンスターをクリックして攻撃
2. **自動戦闘** - 「自動戦闘開始」ボタンで放置プレイ
3. **魔法選択** - 魔法パネルで使用する魔法を変更

### 2. 成長要素
1. **レベルアップ** - 経験値でキャラクター強化
2. **ステータス強化** - ゴールドで攻撃力・HP・防御力等を向上
3. **装備収集** - ドロップした装備で大幅パワーアップ

### 3. 装備システム
1. **装備入手** - モンスター討伐でランダムドロップ
2. **装備変更** - 装備パネルで装着・取り外し
3. **装備強化** - 同じ装備5個で「⭐UP!」ボタンを押下

### 4. 上級者向け
1. **フロア攻略** - 「次の階層へ」で難易度アップ
2. **称号収集** - 様々な条件で称号を獲得
3. **効率プレイ** - 自動戦闘とステータス強化の最適化

## 📱 対応環境

- **ブラウザ**: Chrome, Firefox, Safari, Edge（最新版）
- **デバイス**: デスクトップ、タブレット、モバイル
- **解像度**: レスポンシブ対応

## 🎨 ゲーム画面

### メイン画面
- **左上**: キャラクター情報・称号・レベル
- **中央**: バトルエリア・魔法フレーズ表示
- **右上**: モンスター情報・HP表示
- **下部**: 各種パネル（ステータス・魔法・装備・コレクション・ログ）

### UI特徴
- **グラデーション** - 美しいカラーリング
- **アニメーション** - スムーズな画面効果
- **レスポンシブ** - モバイルでも快適プレイ

## 🚧 開発環境

### セットアップ
```bash
# リポジトリクローン
git clone https://github.com/markun128/magical-girl-dungeon-clicker.git
cd magical-girl-dungeon-clicker

# 依存関係インストール
npm install

# 開発サーバー起動
npm start
```

### 利用可能スクリプト
```bash
npm start          # 開発サーバー起動
npm run build      # 本番ビルド
npm test          # テスト実行
npm run eject     # 設定ファイル展開
```

### ディレクトリ構造
```
src/
├── components/          # Reactコンポーネント
│   ├── GameDisplay.tsx  # メインゲーム画面
│   ├── StatsPanel.tsx   # ステータス表示
│   ├── EquipmentPanel.tsx # 装備管理
│   └── ...
├── data/               # ゲームデータ
│   ├── equipmentData.ts # 装備データ
│   ├── magicData.ts    # 魔法データ
│   └── ...
├── types/              # TypeScript型定義
└── App.tsx            # メインアプリケーション
```

## 🎯 今後の予定

- [ ] 🎵 BGM・効果音の追加
- [ ] 🏆 ランキングシステム
- [ ] 💾 セーブデータ機能
- [ ] 🌟 新しい魔法・装備の追加
- [ ] 🎪 イベントシステム
- [ ] 🤝 マルチプレイ要素

## 🤝 コントリビューション

プルリクエストやIssueは大歓迎です！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 クレジット

このゲームは [Claude Code](https://claude.ai/code) を使用して開発されました。

**Co-Authored-By:** Claude <noreply@anthropic.com>

---

<div align="center">

**🌟 気に入ったらスターをお願いします！ 🌟**

[![GitHub stars](https://img.shields.io/github/stars/markun128/magical-girl-dungeon-clicker?style=social)](https://github.com/markun128/magical-girl-dungeon-clicker/stargazers)

</div>