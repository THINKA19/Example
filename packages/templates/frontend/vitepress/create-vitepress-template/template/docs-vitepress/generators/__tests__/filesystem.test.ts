import { describe, expect, it } from 'vitest'
import { scanChannel } from '../filesystem'

describe('scanChannel', () => {
  it('文件与子目录按 order 排序,子目录节点携带 children', () => {
    const nodes = scanChannel('guide')

    expect(nodes).toHaveLength(2)
    expect(nodes[0]).toMatchObject({ title: 'Getting Started', isDir: false, order: 1 })
    expect(nodes[1]).toMatchObject({ title: 'Advanced', isDir: true, order: 2 })
    expect(nodes[1].children).toEqual([
      expect.objectContaining({ title: 'Deep Dive', link: '/guide/advanced/deep-dive' }),
    ])
  })

  it('回归测试:api/index.md 这类频道落地页不会被误伤过滤掉', () => {
    const nodes = scanChannel('api')

    expect(nodes).toHaveLength(1)
    expect(nodes[0]).toMatchObject({ title: 'API Reference', link: '/api/' })
  })
})
