import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,

  // template/ 里的文件是待渲染的模板素材(.ejs 混着 EJS 语法和目标语言代码),
  // 不是这个仓库要跑 lint 的源码,必须排除,否则会被当成语法错误的 TS/JSON 文件报一堆假错误
  ignores: [
    'template/**',
    'dist/**',
  ],
})
