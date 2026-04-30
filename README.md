# anthropic-blog

一个模仿 [Anthropic](https://anthropic.com) 官网视觉风格的个人 Hexo 博客主题。

## 关于这个项目

我非常喜欢 Anthropic 这家公司，以及他们开发的 Claude。某天突发奇想：能不能把 Anthropic 官网的设计风格搬到一个 Hexo 博客上？

于是就有了这个项目。

由于我是编程新手，整个开发过程几乎全程借助 **Claude Code** 完成——从主题结构、CSS 样式到 EJS 模板，都是在 AI 的帮助下一步步做出来的。最终大概实现了原版设计 85% 左右的还原度，移动端布局可能还有一些 bug 没有修复。

这个项目目前已停止更新，仅作为存档保留。

## 技术栈

- [Hexo](https://hexo.io/) 7
- EJS 模板
- 纯 CSS（无 Tailwind、无 SCSS）
- 自托管 Anthropic 官方字体（AnthropicSans / AnthropicSerif / AnthropicMono）

## 本地运行

```bash
npm install
npx hexo clean && npx hexo server
```

## 主题预览

主题完整代码在 `themes/anthropic/` 目录下。配色、字体、间距均参照 Anthropic 官网，具体包括：

- 象牙色背景 `#F0EEE6`
- 深色 Featured Card 区域
- Anthropic 三款官方变体字体
- 无阴影、无渐变的极简卡片风格
- 首页 Hero 区 + 文章卡片列表布局

## 声明

本项目仅为个人学习用途，与 Anthropic 公司无任何关联。字体及设计语言版权归 Anthropic 所有。
