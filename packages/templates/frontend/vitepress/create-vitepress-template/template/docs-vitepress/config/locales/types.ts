import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

/** 语言注册表条目 */
export interface LocaleRegistryEntry {
  /** 内部标识,对应 config/locales/{code}/ 目录名 */
  code: string
  /**
   * 最终 defineConfig().locales 对象的 key。
   * VitePress 硬性要求:默认语言必须用 'root',其余语言用目录名(如 'zh')。
   */
  localesKey: string
  /** 内容目录前缀,相对 docs/src。root 语言留空字符串 */
  contentDir: string
  /** <html lang="..."> 属性值,遵循 BCP 47,如 'zh-CN' */
  lang: string
  /** 语言切换器中展示的名称 */
  label: string
}

/** 每个语言最终导出的配置对象类型,对齐 VitePress locales 字典的 value 类型 */
export type ResolvedLocale = LocaleSpecificConfig<DefaultTheme.Config> & {
  label?: string
  link?: string
}
