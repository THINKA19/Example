# API 参考

查看完整的 API 文档。

## 核心 API

### 配置 API

主配置文件的 TypeScript 类型定义和可用选项。

#### `defineConfig()`

定义 VitePress 配置的辅助函数，提供类型提示。

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 配置选项
})
```

### 主题 API

自定义主题的接口和配置选项。

#### `themeConfig`

主题配置对象，包含导航、侧边栏、搜索等选项。

```ts
interface ThemeConfig {
  nav?: NavItem[]
  sidebar?: Sidebar
  socialLinks?: SocialLink[]
  footer?: Footer
  // ...更多选项
}
```

## 国际化 API

### `locales`

多语言配置对象。

```ts
interface LocaleConfig {
  label: string
  lang: string
  title?: string
  description?: string
  themeConfig?: ThemeConfig
}
```

示例：

```ts
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'My Docs',
    },
  },
})
```

## 更多资源

查看 [VitePress 官方 API 文档](https://vitepress.dev/reference/site-config) 了解完整的 API 列表。
