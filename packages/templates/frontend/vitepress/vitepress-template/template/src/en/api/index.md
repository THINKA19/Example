# API Reference

View the complete API documentation.

## Core API

### Configuration API

TypeScript type definitions and available options for the main configuration file.

#### `defineConfig()`

Helper function for defining VitePress configuration with type hints.

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  // configuration options
})
```

### Theme API

Interfaces and configuration options for customizing themes.

#### `themeConfig`

Theme configuration object containing navigation, sidebar, search, and other options.

```ts
interface ThemeConfig {
  nav?: NavItem[]
  sidebar?: Sidebar
  socialLinks?: SocialLink[]
  footer?: Footer
  // ...more options
}
```

## Internationalization API

### `locales`

Multi-language configuration object.

```ts
interface LocaleConfig {
  label: string
  lang: string
  title?: string
  description?: string
  themeConfig?: ThemeConfig
}
```

Example:

```ts
export default defineConfig({
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '我的文档',
    },
  },
})
```

## More Resources

Check out the [VitePress Official API Documentation](https://vitepress.dev/reference/site-config) for the complete API list.
