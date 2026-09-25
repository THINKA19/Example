import { describe, expect, it } from 'vitest'
import { extractFallbackTitle, parseFrontmatter } from '../frontmatter'

describe('parseFrontmatter', () => {
  it('解析完整 frontmatter', () => {
    const raw = '---\ntitle: Hello\norder: 2\nhidden: true\n---\n# Body\n'
    const result = parseFrontmatter(raw)

    expect(result.title).toBe('Hello')
    expect(result.order).toBe(2)
    expect(result.hidden).toBe(true)
    expect(result.rawContent.trim()).toBe('# Body')
  })

  it('缺省字段时使用默认值', () => {
    const raw = '# Just a heading\n'
    const result = parseFrontmatter(raw)

    expect(result.title).toBeUndefined()
    expect(result.order).toBe(999)
    expect(result.hidden).toBe(false)
  })

  it('order 字段类型不对时兜底为默认值,而不是静默出错', () => {
    const raw = '---\norder: "1"\n---\ncontent\n'
    const result = parseFrontmatter(raw)

    expect(result.order).toBe(999)
  })
})

describe('extractFallbackTitle', () => {
  it('从正文一级标题提取', () => {
    expect(extractFallbackTitle('# My Title\n\nbody', 'fallback')).toBe('My Title')
  })

  it('没有一级标题时使用兜底值', () => {
    expect(extractFallbackTitle('no heading here', 'fallback')).toBe('fallback')
  })
})
