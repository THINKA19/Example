import type { DefaultTheme } from 'vitepress'
import { SOCIAL_LINKS } from './constants'

/**
 * 只放"所有语言共享、不需要翻译"的字段。
 * 需要按语言变化的字段(editLink 文案、outlineTitle、docFooter 等)
 * 放在 locales/{lang}/meta.ts 的 localeThemeConfig 里,靠 themeConfig 的
 * 浅合并特性覆盖到当前语言。
 */
export const themeConfig: Partial<DefaultTheme.Config> = {
  outline: [2, 3],
  socialLinks: SOCIAL_LINKS,
}
