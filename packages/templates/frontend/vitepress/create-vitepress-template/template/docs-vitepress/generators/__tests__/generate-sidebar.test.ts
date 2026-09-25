import { describe, expect, it } from 'vitest'
import { generateSidebar } from '../generate-sidebar'

describe('generateSidebar', () => {
  it('按 frontmatter 生成 guide 频道的 sidebar 项,含子目录分组', () => {
    const result = generateSidebar('guide')

    expect(result).toEqual([
      { text: 'Getting Started', link: '/guide/getting-started' },
      {
        text: 'Advanced',
        collapsed: true,
        items: [{ text: 'Deep Dive', link: '/guide/advanced/deep-dive' }],
      },
    ])
  })

  it('index.md 作为频道落地页,正确生成 "/api/" 链接', () => {
    const result = generateSidebar('api')

    expect(result).toEqual([{ text: 'API Reference', link: '/api/' }])
  })

  it('override 可以在末尾追加额外项', () => {
    const result = generateSidebar('api', [{ text: 'FAQ', link: '/api/faq' }])

    expect(result).toHaveLength(2)
    expect(result[1]).toEqual({ text: 'FAQ', link: '/api/faq' })
  })
})
