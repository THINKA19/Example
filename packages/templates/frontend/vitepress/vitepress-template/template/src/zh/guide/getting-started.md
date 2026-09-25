# 快速开始

本指南将帮助你快速搭建 VitePress 文档站点。

## 环境要求

- Node.js 18+ 
- pnpm 8+（推荐）或 npm/yarn

## 安装

使用我们的模板创建新项目：

```bash
# 使用 npx
npx @dengzhibo/vitepress-template

# 或者使用 pnpm
pnpm create vitepress-template
```

## 项目结构

创建完成后，你会看到以下目录结构：

```
my-docs/
├── .vitepress/
│   ├── config/          # 配置模块
│   │   ├── i18n.ts      # 国际化配置
│   │   ├── nav.ts       # 导航配置
│   │   ├── sidebar.ts   # 侧边栏配置
│   │   └── ...
│   ├── config.ts        # 主配置文件
│   └── theme/           # 自定义主题
├── src/
│   ├── zh/              # 中文文档
│   ├── en/              # 英文文档
│   ├── vi/              # 越南语文档
│   └── index.md         # 首页
├── public/              # 静态资源
└── package.json
```

## 开发

启动开发服务器：

```bash
pnpm dev
```

访问 http://localhost:5173 查看你的文档站点。

## 构建

构建生产版本：

```bash
pnpm build
```

构建完成后，静态文件将输出到 `dist` 目录。

## 预览

预览生产构建：

```bash
pnpm preview
```

## 下一步

- 学习如何[配置](/guide/configuration)你的站点
- 查看[API 参考](/api/)了解更多功能
