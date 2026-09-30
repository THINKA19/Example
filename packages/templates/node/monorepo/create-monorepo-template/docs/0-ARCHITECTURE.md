# 脚手架内部架构设计说明

## v0.0.1 (2026-09-28) 

### 新增

* 搭建脚手架基础目录结构，初始化项目模板基础文件夹

```plain
create-xxx/
├── bin/index.js
├── docs/ARCHITECTURE.md
├── template/
│   ├── _gitignore
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── package.json
└── README.md
```

## v0.0.2 (2026-09-28) 

### 修改

* vue 初始化，去掉样板代码

## v0.0.3 (2026-09-28) 

### 新增

工程化配置

* .env 环境变量
* .npmrc
* .nvmrc

## v0.0.3 (2026-09-28) 

* element-plus 配置

```bash
pnpm add element-plus axios @element-plus/icons-vue
pnpm add -D unplugin-vue-components unplugin-auto-import

# 3. 按下面的内容新增、修改文件，然后
pnpm dev     # 首次运行会生成 auto-imports.d.ts 和 components.d.ts，一并提交
```

## v0.0.5 (2026-09-28) 

* 基础配置