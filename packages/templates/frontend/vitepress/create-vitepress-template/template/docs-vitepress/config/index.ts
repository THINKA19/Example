import type { DefaultTheme, UserConfig } from 'vitepress'
import { locales } from './locales'
import { search } from './search'
import { seo } from './seo'
import { site } from './site'
import { themeConfig } from './themeConfig'

export const resolvedConfig: UserConfig<DefaultTheme.Config> = {
  ...site,
  ...seo,
  themeConfig: {
    ...themeConfig,
    search,
    // 注意:这里不再放 nav / sidebar,它们随语言变化,
    // 已经分别放进每个语言自己的 themeConfig 里,由 VitePress 按当前
    // 访问的语言自动做浅合并。
  },
  locales,
}
