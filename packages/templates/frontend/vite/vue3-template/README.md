# create-xxx

基于 create-vue 官方脚手架,集成 Element Plus、Pinia、Vue Router、Axios 的 Vue 3 项目模板。

## 使用

```bash
pnpm create xxx my-app
# 或
npx create-xxx my-app
```

改名后使用方式变为:

bash

```bash
pnpm create @dengzhibo/vue3-template my-app
npx @dengzhibo/create-vue3-template my-app
```

创建后:

```bash
cd my-app
pnpm install
pnpm dev
```

## 要求

- Node.js >= 18

## 维护

模板的基线版本、改动清单、升级流程见 [docs/TEMPLATE.md](./docs/TEMPLATE.md)。

### 发版检查

1. 用当前代码生成一个项目:`node bin/index.js ../test-app`
2. 进入 `../test-app`,执行 `pnpm install && pnpm lint && pnpm type-check && pnpm build`
3. 回到本仓库,执行 `npm pack --dry-run`,确认清单里只有 `bin/` 和 `template/`,没有 `node_modules`、`dist`
4. 更新 `CHANGELOG.md` 和 `package.json` 的 `version`,然后 `npm publish`