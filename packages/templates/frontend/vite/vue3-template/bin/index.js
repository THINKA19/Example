#!/usr/bin/env node

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const templateDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../template')

// 拷贝时跳过:垃圾目录,以及用于控制打包的 .npmignore
const SKIP = new Set(['node_modules', 'dist', '.npmignore'])

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

// ---------- 参数解析 ----------
const args = process.argv.slice(2)
const noInstall = args.includes('--no-install')
const name = args.find((arg) => !arg.startsWith('-'))

if (!name) {
  fail('请指定项目名,例如:npx create-xxx my-app(在当前空目录创建则用 .)')
}

const targetDir = path.resolve(process.cwd(), name)
const projectName = path.basename(targetDir)

if (!/^[a-z0-9][a-z0-9._-]*$/i.test(projectName)) {
  fail(`项目名 "${projectName}" 不合法,只能包含字母、数字、点、下划线和连字符`)
}

// ---------- 前置校验 ----------
if (!fs.existsSync(templateDir)) {
  fail(`未找到模板目录:${templateDir}`)
}
if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  fail(`目录 "${targetDir}" 已存在且不为空,请换一个名字或在空目录中执行`)
}

console.log('\n🚀 正在创建项目...\n')

// ---------- 1. 拷贝模板 ----------
fs.cpSync(templateDir, targetDir, {
  recursive: true,
  filter: (src) => !SKIP.has(path.basename(src)),
})

// ---------- 2. _gitignore -> .gitignore ----------
// npm 发布时会丢弃 .gitignore,所以模板里用 _ 前缀
const gitignore = path.join(targetDir, '_gitignore')
if (fs.existsSync(gitignore)) {
  fs.renameSync(gitignore, path.join(targetDir, '.gitignore'))
}

// ---------- 3. 写入项目名(模板暂无 package.json 时跳过) ----------
const pkgPath = path.join(targetDir, 'package.json')
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.name = projectName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

console.log('✔ 模板已生成')

// ---------- 4. 安装依赖(可用 --no-install 跳过) ----------
let installed = false
if (!noInstall && fs.existsSync(pkgPath)) {
  try {
    console.log('\n📦 正在安装依赖...\n')
    execSync('pnpm install', { cwd: targetDir, stdio: 'inherit' })
    installed = true
    console.log('\n✔ 依赖安装完成')
  } catch {
    console.warn('\n⚠ 依赖自动安装失败(可能未安装 pnpm 或网络异常),请稍后手动执行 pnpm install')
  }
}

// ---------- 5. 后续提示 ----------
const steps = []
if (path.resolve(name) !== process.cwd()) steps.push(`cd ${name}`)
if (!installed) steps.push('pnpm install')
steps.push('pnpm dev')

console.log(`\n🎉 项目已创建:${targetDir}\n\n接下来:\n${steps.map((s) => `  ${s}`).join('\n')}\n`)