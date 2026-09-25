import { describe, expect, it } from 'vitest'
import { generateNav } from '../generate-nav'

describe('generateNav', () => {
  it('每个频道生成一项,链接指向排序最靠前的页面', () => {
    const result = generateNav(['guide', 'api'])

    expect(result).toEqual([
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Api', link: '/api/' },
    ])
  })

  it('override 按 link 匹配替换生成结果', () => {
    const result = generateNav(['guide'], [{ text: '新手指南', link: '/guide/getting-started' }])

    expect(result).toEqual([{ text: '新手指南', link: '/guide/getting-started' }])
  })
})
