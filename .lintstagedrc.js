import path from 'node:path'
import fs from 'node:fs'

export default {
  // Lint 所有文件，但排除模板目录
  '*.{js,ts,vue,md,json}': (filenames) => {
    // 调试日志
    fs.writeFileSync('lint-staged-debug.log', `Total files: ${filenames.length}\n`)
    fs.appendFileSync('lint-staged-debug.log', `Files:\n${filenames.join('\n')}\n\n`)

    // 过滤掉模板目录的文件
    const filesToLint = filenames.filter((filename) => {
      // 规范化路径（转换为 Unix 风格）
      const normalized = filename.split(path.sep).join('/')
      const shouldLint = !normalized.includes('packages/templates/')
      
      fs.appendFileSync('lint-staged-debug.log', `${filename} -> ${normalized} -> ${shouldLint}\n`)
      
      return shouldLint
    })

    fs.appendFileSync('lint-staged-debug.log', `\nFiles to lint: ${filesToLint.length}\n`)

    // 如果没有需要 lint 的文件，返回空数组
    if (filesToLint.length === 0) {
      return []
    }

    // 返回 ESLint 命令
    const command = `eslint --fix ${filesToLint.map(f => `"${f}"`).join(' ')}`
    fs.appendFileSync('lint-staged-debug.log', `Command: ${command}\n`)
    return command
  },
}
