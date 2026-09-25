# Getting Started

This guide will help you quickly set up a VitePress documentation site.

## Requirements

- Node.js 18+
- pnpm 8+ (recommended) or npm/yarn

## Installation

Create a new project using our template:

```bash
# Using npx
npx @dengzhibo/vitepress-template

# Or using pnpm
pnpm create vitepress-template
```

## Project Structure

After creation, you'll see the following directory structure:

```
my-docs/
├── .vitepress/
│   ├── config/          # Configuration modules
│   │   ├── i18n.ts      # i18n configuration
│   │   ├── nav.ts       # Navigation config
│   │   ├── sidebar.ts   # Sidebar config
│   │   └── ...
│   ├── config.ts        # Main config file
│   └── theme/           # Custom theme
├── src/
│   ├── zh/              # Chinese docs
│   ├── en/              # English docs
│   ├── vi/              # Vietnamese docs
│   └── index.md         # Home page
├── public/              # Static assets
└── package.json
```

## Development

Start the development server:

```bash
pnpm dev
```

Visit http://localhost:5173 to view your documentation site.

## Build

Build for production:

```bash
pnpm build
```

After building, static files will be output to the `dist` directory.

## Preview

Preview the production build:

```bash
pnpm preview
```

## Next Steps

- Learn how to [configure](/en/guide/configuration) your site
- Check out the [API Reference](/en/api/) for more features
