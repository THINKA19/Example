export type TemplateSource = 'local' | 'remote'

/**
 * 模板来源策略:
 * - 'local'  模板打包进 npm 包本体的 template/ 目录里,离线可用,版本和 CLI 强绑定
 * - 'remote' 每次生成时用 giget 从 Git 仓库拉取最新模板,可以脱离 CLI 版本单独发布模板更新
 *
 * 默认用 local,足够简单可靠;团队规模变大、模板需要独立于 CLI 迭代节奏时,
 * 再切换成 remote 且不需要改动其余代码。
 */
export const TEMPLATE_SOURCE: TemplateSource = 'local'

/** TEMPLATE_SOURCE 为 'remote' 时,从这个仓库拉取模板 */
export const REMOTE_TEMPLATE_REPO = 'github:your-org/create-my-docs-template'
