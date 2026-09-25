# Configuration Guide

Learn how to configure your VitePress documentation site.

## Basic Configuration

The main configuration file is located at `.vitepress/config.ts`, which serves as the entry point for all configurations.

### Site Metadata

Configure basic site information in `.vitepress/config/site.ts`:

```ts
export const siteConfig = {
  title: 'My Documentation Site',
  description: 'Project documentation based on VitePress',
  lang: 'en-US',
  base: '/',
}
```

### Theme Configuration

Configure theme-related options in `.vitepress/config/theme.ts`:

```ts
export const themeConfig = {
  logo: '/logo.svg',
  nav: [...],
  sidebar: {...},
  footer: {...},
}
```

## Internationalization

### Adding a New Language

Add new language configuration in `.vitepress/config/i18n.ts`:

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

### Language Directory Structure

Create corresponding content directories for each language:

```
src/
├── zh/          # Chinese
├── en/          # English
├── vi/          # Vietnamese
└── ja/          # Japanese (new)
```

## Navigation Configuration

Configure the top navigation bar in `.vitepress/config/nav/index.ts`.

## Sidebar Configuration

Configure the sidebar menu in `.vitepress/config/sidebar/index.ts`.

## Search Configuration

Configure local search in `.vitepress/config/search.ts`.

## SEO Configuration

Configure SEO-related meta tags in `.vitepress/config/seo.ts`.

## More Resources

- [VitePress Official Docs](https://vitepress.dev)
- [Configuration Reference](https://vitepress.dev/reference/site-config)
