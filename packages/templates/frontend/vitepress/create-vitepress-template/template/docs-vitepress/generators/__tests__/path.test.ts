import { describe, expect, it } from 'vitest'
import { fileNameToTitle, toChannelKey, toLink } from '../path'

describe('toLink', () => {
  it('去掉 .md 后缀', () => {
    expect(toLink('guide/getting-started.md')).toBe('/guide/getting-started')
  })

  it('index.md 归到目录本身', () => {
    expect(toLink('api/index.md')).toBe('/api/')
  })

  it('语言前缀是路径的一部分,自动带出,不需要额外拼接逻辑', () => {
    expect(toLink('zh/guide/getting-started.md')).toBe('/zh/guide/getting-started')
  })
})

describe('fileNameToTitle', () => {
  it('短横线转标题格式', () => {
    expect(fileNameToTitle('getting-started.md')).toBe('Getting Started')
  })

  it('下划线同样支持', () => {
    expect(fileNameToTitle('api_reference')).toBe('Api Reference')
  })
})

describe('toChannelKey', () => {
  it('默认语言不带前缀', () => {
    expect(toChannelKey('guide')).toBe('/guide/')
  })

  it('非默认语言带语言前缀', () => {
    expect(toChannelKey('guide', 'zh')).toBe('/zh/guide/')
  })
})
