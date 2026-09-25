export default {
  // 对所有 JS/TS/Vue/JSON 文件运行 ESLint
  // 但排除 packages/templates 目录下的文件（模板项目有自己的配置）
  '*.{js,ts,vue,md,json}': (filenames) => {
    // 过滤掉模板目录的文件
    const filesToLint = filenames.filter(
      filename => !filename.includes('packages/templates/'),
    )

    // 如果没有需要 lint 的文件，返回空数组
    if (filesToLint.length === 0) {
      return []
    }

    // 返回 ESLint 命令
    return `eslint --fix ${filesToLint.join(' ')}`
  },
}
