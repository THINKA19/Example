# 配置指南

了解如何配置你的 VitePress 文档站点。

## 基础配置

主配置文件位于 `.vitepress/config.ts`，它是所有配置的入口点。

### 站点元数据

在 `.vitepress/config/site.ts` 中配置站点的基本信息：

```ts
export const siteConfig = {
  title: '我的文档站点',
  description: '基于 VitePress 的项目文档',
  lang: 'zh-CN',
  base: '/',
}
```

### 主题配置

在 `.vitepress/config/theme.ts` 中配置主题相关选项：

```ts
export const themeConfig = {
  logo: '/logo.svg',
  nav: [...],
  sidebar: {...},
  footer: {...},
}
```

## 国际化配置

### 添加新语言

在 `.vitepress/config/i18n.ts` 中添加新的语言配置：

```ts
export const jaConfig = {
  label: '日本語',
  lang: 'ja-JP',
  title: 'マイドキュメント',
  themeConfig: {
    nav: [...],
    sidebar: {...},
  }
}
```

### 语言目录结构

为每个语言创建对应的内容目录：

```
src/
├── zh/          # 中文
├── en/          # 英文
├── vi/          # 越南语
└── ja/          # 日语（新增）
```

## 导航配置

在 `.vitepress/config/nav/index.ts` 中配置顶部导航栏。

## 侧边栏配置

在 `.vitepress/config/sidebar/index.ts` 中配置侧边栏菜单。

## 搜索配置

在 `.vitepress/config/search.ts` 中配置本地搜索功能。

## SEO 配置

在 `.vitepress/config/seo.ts` 中配置 SEO 相关的 meta 标签。

## 更多资源

- [VitePress 官方文档](https://vitepress.dev)
- [配置参考](https://vitepress.dev/reference/site-config)
