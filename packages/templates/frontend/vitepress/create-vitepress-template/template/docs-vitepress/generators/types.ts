import type { DefaultTheme } from 'vitepress'

/** 扫描内容目录后,统一产出的节点结构(文件或目录) */
export interface ContentNode {
  /** 文件系统绝对路径 */
  absPath: string
  /** 相对 srcDir 的路径,例如 zh/guide/getting-started.md */
  relPath: string
  /** 最终页面链接,例如 /zh/guide/getting-started */
  link: string
  /** frontmatter.title,缺省时从正文一级标题或文件名兜底 */
  title: string
  /** frontmatter 中的排序权重,数字越小越靠前,缺省为 999 */
  order: number
  /** frontmatter.hidden === true 时不出现在 nav / sidebar 中 */
  hidden: boolean
  /** 是否是目录节点(用于生成多级 sidebar 分组) */
  isDir: boolean
  /** 子节点,仅目录节点存在 */
  children?: ContentNode[]
}

export type NavOverride = DefaultTheme.NavItem[]
export type SidebarOverride = DefaultTheme.SidebarItem[]
