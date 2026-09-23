#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 当前 Scaffold 的 template 目录
const templateDir = path.resolve(__dirname, '../template')

// 用户执行命令时所在的目录
const targetDir = process.cwd()

console.log('')
console.log('🚀 Creating VitePress project...')
console.log('')

// 检查 template 是否存在
if (!fs.existsSync(templateDir)) {
  console.error('❌ Template directory not found:')
  console.error(templateDir)
  // process.exit(1)
}

// 防止直接覆盖当前目录已有文件
const existingFiles = fs.readdirSync(targetDir)

if (existingFiles.length > 0) {
  console.error('❌ Target directory is not empty.')
  console.error('')
  console.error(`Directory: ${targetDir}`)
  console.error('')
  console.error('Please run this command inside an empty directory.')
  // process.exit(1)
}

// 复制模板
fs.cpSync(templateDir, targetDir, {
  recursive: true,
})

// 删除模板中的 node_modules（如果存在）
const nodeModules = path.join(targetDir, 'node_modules')

if (fs.existsSync(nodeModules)) {
  fs.rmSync(nodeModules, {
    recursive: true,
    force: true,
  })
}

console.log('✓ Template copied')
console.log('')

// 安装依赖
try {
  console.log('📦 Installing dependencies...')
  console.log('')

  execSync('pnpm install', {
    cwd: targetDir,
    stdio: 'inherit',
  })

  console.log('')
  console.log('✓ Dependencies installed')
} catch {
  console.log('')
  console.warn('⚠️ Failed to install dependencies automatically.')
  console.warn('You can run "pnpm install" manually.')
}

console.log('')
console.log('🎉 Project created successfully!')
console.log('')
console.log('Next steps:')
console.log('')
console.log('  pnpm dev')
console.log('')