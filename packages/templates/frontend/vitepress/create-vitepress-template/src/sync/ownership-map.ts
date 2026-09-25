export type FileOwner = 'scaffold' | 'user' | 'ask'

export interface OwnershipRule {
  /** 简单 glob:* 匹配单层路径片段,** 匹配任意层级 */
  pattern: string
  owner: FileOwner
  reason: string
}

/**
 * 文件归属表 —— 整个 sync 模块的核心数据。
 * 判断"要不要覆盖"是二元问题,比对文件内容做区间级 diff/合并简单可靠得多,
 * 这也是我们在 config 架构设计阶段就选择"文件级归属"而不是"注释标记区"的原因。
 *
 * 规则按顺序匹配,写在前面的优先级更高。
 */
export const OWNERSHIP_MAP: OwnershipRule[] = [
  // ---- 脚手架完全接管,可以整体覆盖 ----
  { pattern: 'docs/.vitepress/generators/**', owner: 'scaffold', reason: '生成算法,业务方不应该改' },
  { pattern: 'docs/.vitepress/config.ts', owner: 'scaffold', reason: '入口文件,极薄,不需要业务方改' },
  { pattern: 'docs/.vitepress/config/index.ts', owner: 'scaffold', reason: '聚合器,结构稳定' },
  { pattern: 'docs/.vitepress/config/locales/registry.ts', owner: 'scaffold', reason: '由脚手架根据语言选项生成' },
  { pattern: 'docs/.vitepress/config/locales/index.ts', owner: 'scaffold', reason: '由脚手架生成的聚合文件' },
  { pattern: 'docs/.vitepress/config/locales/types.ts', owner: 'scaffold', reason: '共享类型定义' },
  { pattern: 'scripts/check-links.ts', owner: 'scaffold', reason: '通用工具脚本' },
  { pattern: 'vitest.config.ts', owner: 'scaffold', reason: '测试配置,结构稳定' },

  // ---- 业务方可能改过细节,更新前需要人工确认 ----
  { pattern: '.github/workflows/*.yml', owner: 'ask', reason: '业务方可能已按需改过部署细节' },
  { pattern: 'docker/*', owner: 'ask', reason: '业务方可能已调整过端口 / 镜像等细节' },
  { pattern: 'eslint.config.js', owner: 'ask', reason: '业务方可能已追加自定义规则' },
  { pattern: 'package.json', owner: 'ask', reason: '需要合并 devDependencies,不能整体覆盖' },
  { pattern: 'docs/.vitepress/config/constants.ts', owner: 'ask', reason: '仓库地址等信息可能已单独更新' },
  { pattern: 'docs/.vitepress/config/themeConfig.ts', owner: 'ask', reason: '公共主题配置可能已自定义' },

  // ---- 业务方完全拥有,脚手架升级永远不碰 ----
  { pattern: 'docs/src/**', owner: 'user', reason: '实际文档内容' },
  { pattern: 'docs/.vitepress/config/locales/*/nav.ts', owner: 'user', reason: '业务方手写的 override' },
  { pattern: 'docs/.vitepress/config/locales/*/sidebar.ts', owner: 'user', reason: '业务方手写的 override' },
  { pattern: 'docs/.vitepress/config/locales/*/meta.ts', owner: 'user', reason: '业务方翻译过的文案' },
  { pattern: 'docs/.vitepress/theme/**', owner: 'user', reason: '业务方自定义的主题样式与组件' },
  { pattern: 'README.md', owner: 'user', reason: '业务方通常会重写' },
  { pattern: 'LICENSE', owner: 'user', reason: '业务方可能已更换协议或补充版权信息' },

  // ---- 兜底:未知文件一律先问,不擅自覆盖 ----
  { pattern: '**', owner: 'ask', reason: '默认兜底,未知文件先询问' },
]

/** 极简 glob 匹配,足够覆盖上面这些规则,不引入额外的 glob 依赖 */
export function matchPattern(filePath: string, pattern: string): boolean {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&')
  const withDoubleStar = escaped.replace(/\*\*/g, '__DOUBLE_STAR__')
  const withSingleStar = withDoubleStar.replace(/\*/g, '[^/]*')
  const regexSource = withSingleStar.replace(/__DOUBLE_STAR__/g, '.*')
  return new RegExp(`^${regexSource}$`).test(filePath)
}

export function getOwner(filePath: string): OwnershipRule {
  const rule = OWNERSHIP_MAP.find(r => matchPattern(filePath, r.pattern))
  // 兜底规则 '**' 永远能匹配,这里的 ! 是安全的
  return rule!
}
