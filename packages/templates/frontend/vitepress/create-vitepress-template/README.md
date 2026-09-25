# create-my-docs

基于 [VitePress](https://vitepress.dev) 官方脚手架扩展的团队文档站生成器。

在官方 `vitepress init` 生成的基础骨架之上,内置了:

- 内容(`docs/src`)与框架配置(`docs/.vitepress`)物理隔离(`srcDir`)
- 根据文件结构 + frontmatter 自动生成 nav / sidebar,支持手动 override
- 多语言(i18n),新增语言只需要在问答阶段多选一项
- ESLint(`@antfu/eslint-config`)、commitlint、husky pre-commit / commit-msg
- Docker 多阶段构建 + docker-compose + 针对 VitePress 优化的 nginx 配置(可选)
- GitHub Actions:CI(lint + 单测 + 构建 + 死链检测)、release-please 自动发版、构建镜像并部署(可选)
- generators 单元测试(vitest)+ 死链检测脚本
- `create-my-docs upgrade`:安全地把已生成的项目升级到脚手架最新版本

## 使用(生成新项目)

```bash
npx create-my-docs my-docs
```

会进入交互式问答:站点标题、描述、作者、GitHub 仓库地址、默认语言、需要哪些额外语言、
是否需要 Docker / CI、用哪个包管理器。回答完毕后自动生成项目、装依赖、初始化 git 仓库并创建首次
commit。

生成完成后:

```bash
cd my-docs
pnpm run docs:dev
```

## 升级已生成的项目

脚手架发布新版本后,进入已生成的项目目录:

```bash
npx create-my-docs upgrade
```

升级流程会读取项目根目录的 `scaffold.config.json`(记录了生成时的问答结果),用同样的选项
在临时目录里重新生成一份最新版本,然后按 `src/sync/ownership-map.ts` 里的文件归属表逐文件比对:

| 归属 | 处理方式 |
|---|---|
| `scaffold` | 自动覆盖(生成算法、聚合器、脚手架维护的公共配置) |
| `user` | 永远跳过,只打印提示(文档内容、业务方手写的 nav/sidebar override、自定义主题) |
| `ask` | 列出差异,交互式勾选要不要覆盖(CI/Docker 细节、`package.json` 等可能被业务方改过的文件) |

## 本地开发这个脚手架工具

```bash
pnpm install

# 不需要先 build,直接跑一次完整生成流程验证改动
pnpm dev my-docs

# 生成流程本身的 e2e 测试(不含真实 install/build,秒级完成)
pnpm test

# 附加对生成出的项目做真实 install + lint + test + build + check-links 的冒烟测试
# (会真的联网装依赖,耗时较长,默认不跑)
RUN_E2E_SMOKE=1 pnpm test

# 打包发布用的 dist/(bin/cli.js 依赖这份产物)
pnpm build
```

## 目录结构

```
create-my-docs/
├─ bin/cli.js                 # 可执行入口,指向 dist/index.js
├─ src/                       # CLI 逻辑:问答、生成、后置钩子、模板来源、升级同步
│  ├─ prompts/
│  ├─ generate/
│  ├─ hooks/
│  ├─ registry/
│  ├─ sync/
│  └─ utils/
├─ template/                  # 会被拷贝渲染进目标项目的模板本体,自身不会被执行
│  ├─ base/                   # 根目录通用文件(.ejs 后缀的会被渲染,dotfile 用 _ 前缀转义)
│  ├─ docker/
│  ├─ workflows/              # 生成时放进目标项目的 .github/workflows/
│  ├─ docs-vitepress/         # docs/.vitepress 全套(config + generators + theme)
│  ├─ docs-src/               # docs/src 起始内容(_root 默认语言,_locale 其余语言)
│  └─ scripts/
├─ e2e/                       # 脚手架自身的端到端测试(测的是"生成流程对不对",
│  └─ fixtures/                # 而不是 template/docs-vitepress/generators/__tests__ 测的
│                              # "生成出来的 nav/sidebar 逻辑对不对")
└─ .github/workflows/         # 脚手架工具自己的 CI 与 npm 发布流程
```

## 模板来源

默认从打包进 npm 包里的 `template/` 目录读取(见 `src/registry/template.config.ts`)。
如果模板需要脱离 CLI 版本单独迭代,把 `TEMPLATE_SOURCE` 改成 `'remote'` 并配置
`REMOTE_TEMPLATE_REPO`,生成时会改为用 [giget](https://github.com/unjs/giget) 从 Git 仓库拉取。

## 发布

推送到 `main` 后,`release.yml` 用 [release-please](https://github.com/googleapis/release-please)
根据 Conventional Commits 自动生成版本号、CHANGELOG、GitHub Release;Release 发布后自动
`pnpm build` 并 `pnpm publish` 到 npm。
