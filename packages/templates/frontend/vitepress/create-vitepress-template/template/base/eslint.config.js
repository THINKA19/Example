import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  markdown: true,
  formatters: true,

  // 团队自定义规则写在这里,不要改上面的预设参数,
  // 方便脚手架升级时替换预设本身而不影响你的自定义项
  rules: {
    'no-console': 'off',
  },
})
