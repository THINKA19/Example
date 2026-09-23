import antfu from '@antfu/eslint-config'

export default antfu({
  // 对 markdown 内的代码块关掉某些过于严格的规则
  markdown: true,

  // Node.js CLI 脚本允许使用全局变量
  rules: {
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
  },

  // 忽略某些文件的检查
  ignores: [
    '**/README.md', // 忽略所有 README
    '**/*.md', // 或者忽略所有 markdown
    '**/template/**', // 忽略所有模板目录内容
    '**/node_modules/**',
    '**/dist/**',
    '**/.vitepress/**',
  ],
})
