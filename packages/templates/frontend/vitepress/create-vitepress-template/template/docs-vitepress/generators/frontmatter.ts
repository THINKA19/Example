import matter from 'gray-matter'
import { DEFAULT_ORDER, HIDDEN_FIELD, ORDER_FIELD } from './generator.config'

export interface ParsedFrontmatter {
  title?: string
  order: number
  hidden: boolean
  /** frontmatter 之外的正文内容,用于兜底提取标题 */
  rawContent: string
}

/** 解析 md 文件原始内容,提取 frontmatter 并对缺省字段做兜底,不涉及任何文件 IO */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const { data, content } = matter(raw)

  return {
    title: typeof data.title === 'string' ? data.title : undefined,
    order: typeof data[ORDER_FIELD] === 'number' ? data[ORDER_FIELD] : DEFAULT_ORDER,
    hidden: data[HIDDEN_FIELD] === true,
    rawContent: content,
  }
}

/** frontmatter 未写 title 时,兜底从正文第一个一级标题里提取 */
export function extractFallbackTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : fallback
}
