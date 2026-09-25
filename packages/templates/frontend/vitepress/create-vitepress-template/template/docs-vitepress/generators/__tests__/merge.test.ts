import { describe, expect, it } from 'vitest'
import { mergeByLink } from '../merge'

describe('mergeByLink', () => {
  const generated = [
    { text: 'Guide', link: '/guide/' },
    { text: 'API', link: '/api/' },
  ]

  it('override 中 link 匹配时,替换原位置的项', () => {
    const result = mergeByLink(generated, [{ text: 'API (Beta)', link: '/api/' }])

    expect(result).toEqual([
      { text: 'Guide', link: '/guide/' },
      { text: 'API (Beta)', link: '/api/' },
    ])
  })

  it('override 中 link 不存在时,追加到数组末尾', () => {
    const result = mergeByLink(generated, [{ text: 'Changelog', link: '/changelog/' }])

    expect(result).toHaveLength(3)
    expect(result[2]).toEqual({ text: 'Changelog', link: '/changelog/' })
  })

  it('不传 override 时原样返回,不改变 generated 本身', () => {
    const result = mergeByLink(generated)
    expect(result).toEqual(generated)
    expect(result).not.toBe(generated) // 返回新数组,不是同一引用
  })
})
