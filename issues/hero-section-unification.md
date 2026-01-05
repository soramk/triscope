# 各占いのヒーローセクションを西洋占星術スタイルに統一

## 目的

各占い(手相、タロット、数秘術など)のヒーローセクションを、西洋占星術のヒーローセクションに合わせて統一感のあるデザインに修正する。

## 西洋占星術のヒーローセクションの特徴

- 2カラムレイアウト(左:テキスト、右:診断フォーム)
- バッジ要素で小さなカテゴリ表示 (`bg-indigo-50 text-indigo-600`)
- 大きなセリフフォントの見出し (`text-4xl md:text-6xl font-extrabold serif`)
- アイコン要素の配置 (太陽・月・星など)
- `hero-bg`クラスでグラデーション背景
- `fade-in`アニメーション
- 統合された診断フォーム (右カラム)

## 修正対象

- [x]  `so/palmistry/index.html` - 手相 ✅ 完了
- [x] `so/physiognomy/index.html` - 人相 ✅ 完了
- [x] `so/feng-shui/index.html` - 風水 ✅ 完了
- [x] `so/onomancy/index.html` - 姓名判断 ✅ 完了
- [x] `boku/tarot/index.html` - タロット ✅ 完了
- [x] `boku/i-ching/index.html` - 易 ✅ 完了
- [x] `boku/runes/index.html` - ルーン ✅ 完了
- [x] `boku/crystallomancy/index.html` - 水晶占い ✅ 完了
- [x] `boku/omikuji/index.html` - おみくじ ✅ 完了
- [x] `mei/numerology/index.html` - 数秘術 ✅ 完了
- [x] `mei/bazi/index.html` - 四柱推命 ✅ 完了
- [x] `mei/nine-star-ki/index.html` - 九星気学 ✅ 完了
- [x] `mei/sanmei-gaku/index.html` - 算命学 ✅ 完了
- [x] `mei/zi-wei-dou-shu/index.html` - 紫微斗数 ✅ 完了

**全14ページのヒーローセクション統一が完璧に完了しました!** 🎉

**完了した作業**:

- すべてのページに`hero-bg`クラスと`fade-in`アニメーションを適用
- 2カラムレイアウト(左:テキスト、右:インタラクティブ要素)に統一
- 各占いの個性を活かした配色とアイコンを維持
- 統一されたバッジデザインとボタンスタイルを実装

## 実装方針

各ページの特性を活かしつつ、西洋占星術と同様の以下の要素を組み込む:

### 1. 背景スタイル

```css
.hero-bg {
    background-color: #FDFBF7;
    background-image:
        radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.05) 0%, transparent 40%);
}
```

### 2. HTML構造

```html
<header id="hero" class="relative hero-bg py-20 px-4 overflow-hidden border-b border-indigo-50">
    <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- 左カラム: テキスト -->
        <div class="fade-in">
            <!-- バッジ -->
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-6 uppercase tracking-widest">
                <i data-lucide="sparkles" class="w-3 h-3"></i>
                <span>カテゴリ</span>
            </div>
            <!-- 見出し -->
            <h1 class="text-4xl md:text-6xl font-extrabold serif leading-tight mb-6 text-indigo-950">
                タイトル
                <span class="text-indigo-600">キャッチフレーズ</span>
            </h1>
            <!-- 説明文 -->
            <p class="text-lg text-slate-500 mb-8 max-w-xl leading-relaxed"></p>
            <!-- アイコン -->
            <div class="flex items-center space-x-4"></div>
        </div>
        <!-- 右カラム: フォーム -->
        <div class="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-indigo-50 fade-in">
            <!-- 診断フォーム -->
        </div>
    </div>
</header>
```

### 3. アニメーション

```css
.fade-in {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## 優先順位

1. 高 - mei カテゴリ (命術: 数秘術、四柱推命など) - 既に診断フォームが存在
2. 中 - so カテゴリ (相術: 手相、人相など) - インタラクティブ要素が存在
3. 低 - boku カテゴリ (卜術: タロット、易など) - カードドロー等の特殊UIがある

## 注意事項

- 各ページの個性(カラースキーム、アイコンなど)は維持する
- 既存の機能(診断フォーム、インタラクティブ要素)は保持する
- レスポンシブデザインを確保する
- アクセシビリティを損なわないようにする

## 完了基準

- 全15ページのヒーローセクションが統一されたレイアウトとスタイルを持つ
- 各ページの個性が維持されている
- モバイル/デスクトップで適切に表示される
- アニメーションがスムーズに動作する
