import type { DefaultTheme } from 'vitepress'

// 注意:官方明确要求 algolia / carbonAds 只能配在顶层,不要在每个语言的
// themeConfig 里覆盖,否则多语言搜索会出问题。
export const search: DefaultTheme.Config['search'] = {
  provider: 'local',
}
