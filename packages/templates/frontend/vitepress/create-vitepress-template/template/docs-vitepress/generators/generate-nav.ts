import type { DefaultTheme } from 'vitepress'
import { scanChannel } from './filesystem'
import { mergeByLink } from './merge'
import { toChannelKey } from './path'
import type { NavOverride } from './types'

/**
 * 根据顶层内容频道目录,自动生成导航栏。
 * 每个频道生成一项,链接指向该频道下排序最靠前的页面。
 *
 * @param channels  频道目录名列表,例如 ['guide', 'api']
 * @param override  手动覆盖 / 追加项,按 link 匹配合并
 * @param localeDir 语言内容目录前缀,默认语言传空字符串
 */
export function generateNav(
  channels: string[],
  override: NavOverride = [],
  localeDir = '',
): DefaultTheme.NavItem[] {
  const generated: DefaultTheme.NavItem[] = channels.map((channel) => {
    const nodes = scanChannel(channel, localeDir)
    const first = nodes[0]

    return {
      text: capitalize(channel),
      link: first ? first.link : toChannelKey(channel, localeDir),
    }
  })

  return mergeByLink(generated, override)
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
