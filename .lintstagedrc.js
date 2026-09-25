import path from 'node:path'

export default {
  // Lint 所有文件，但排除模板目录
  '*.{js,ts,vue,md,json}': (filenames) => {
    // 过滤掉模板目录的文件
    const filesToLint = filenames.filter((filename) => {
      // 规范化路径（转换为 Unix 风格）
      const normalized = filename.split(path.sep).join('/')
      // 检查是否在模板目录中
      return !normalized.includes('packages/templates/')
    })

    // 如果没有需要 lint 的文件，返回空数组
    if (filesToLint.length === 0) {
      return []
    }

    // 返回 ESLint 命令（处理 Windows 路径中的空格）
    return `eslint --fix ${filesToLint.map(f => `"${f}"`).join(' ')}`
  },
}
