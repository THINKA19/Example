# 脚手架设计思路

## create-turbo 脚手架

> 不要直接在 `create-turbo` 上二次开发，借鉴 Turborepo 的架构思想，但自己设计“脚手架层”。

`create-turbo` 不是一个独立的网站，而是一个 **NPM 脚手架工具（CLI 命令）**。它是著名前端部署平台 **Vercel** 旗下开源构建系统 **Turborepo** 的官方脚手架。

* 常用启动命令

```Bash
npx create-turbo@latest
# 或
pnpm dlx create-turbo@latest
# 或
yarn dlx create-turbo@latest
# 或
bunx create-turbo@latest
```

## 根目录组织结构

* 根目录结构

```plain
create-my-monorepo/            # 脚手架自身的根目录
│
├── bin/                       # 【脚手架入口】CLI 命令行执行脚本
├── docs/                      # 【脚手架文档】编写使用指南与开发说明
├── templates/                  # 【预设模板】直接全量拷贝的 Monorepo 项目原型
│
├── .gitignore                 # 脚手架自身的 git 忽略配置[cite: 1]
├── .npmignore                 # 发布 npm 时排除的文件 (如忽略 docs、template 源码等)[cite: 1]
├── CHANGELOG.md               # 版本变更日志[cite: 1]
├── LICENSE                    # 开源协议[cite: 1]
├── package.json               # 脚手架自身的 package.json (必须声明 "bin" 字段)[cite: 1]
└── README.md                  # 脚手架首页介绍[cite: 1]
```













# 脚手架内部架构设计说明

## v0.0.1 (2026-09-28) 

### 新增

* 搭建脚手架基础目录结构，初始化项目模板基础文件夹

