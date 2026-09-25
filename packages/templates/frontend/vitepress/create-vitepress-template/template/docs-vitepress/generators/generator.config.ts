import { resolve } from 'node:path'

/**
 * 内容源目录,需与 config/site.ts 里的 srcDir 保持一致。
 * 若项目按纯 ESM 运行导致 __dirname 报错,改为:
 *   import { fileURLToPath } from 'node:url'
 *   resolve(fileURLToPath(new URL('../src', import.meta.url)))
 */
export const SRC_DIR = resolve(__dirname, '../src')

/** frontmatter 中用于排序的字段名 */
export const ORDER_FIELD = 'order'

/** frontmatter 中用于隐藏页面的字段名 */
export const HIDDEN_FIELD = 'hidden'

/**
 * 扫描时忽略的文件 / 目录名。
 *
 * 注意:这里不能加 'index.md'。scanChannel 每次只扫描某个频道子目录
 * (比如 <srcDir>/api),永远不会碰到 <srcDir>/index.md(站点首页),
 * 所以不需要在这里排除它;如果加上,会把 api/index.md 这类"频道落地页"
 * 一起误伤,导致该频道在 nav / sidebar 里生成不出来。
 */
export const IGNORE_LIST = ['public', '.vitepress']

/** 排序字段缺省时的兜底权重 */
export const DEFAULT_ORDER = 999
