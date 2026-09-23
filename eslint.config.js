import antfu from '@antfu/eslint-config'

export default antfu({
  // ignores:['**/*.md']
  // 仅对 markdown 内的代码块关掉某些过于严格的规则，而不是完全忽略文件
  markdown: true,
})
