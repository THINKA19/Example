import type { DefaultTheme } from 'vitepress'
import { scanChannel } from './filesystem'
import { mergeByLink } from './merge'
import type { ContentNode, SidebarOverride } from './types'

/**
 * 根据频道目录自动生成 Sidebar 分组数据(单个频道的数组,不含最外层 path key)。
 *
 * @param channel   频道目录名,例如 'guide'
 * @param override  手动覆盖 / 追加项,按 link 匹配合并(仅作用于顶层数组)
 * @param localeDir 语言内容目录前缀,默认语言传空字符串
 */
export function generateSidebar(
  channel: string,
  override: SidebarOverride = [],
  localeDir = '',
): DefaultTheme.SidebarItem[] {
  const nodes = scanChannel(channel, localeDir)
  const generated = nodes
    .filter(node => !node.hidden)
    .map(nodeToSidebarItem)

  return mergeByLink(generated, override)
}

function nodeToSidebarItem(node: ContentNode): DefaultTheme.SidebarItem {
  if (node.isDir && node.children) {
    return {
      text: node.title,
      collapsed: true,
      items: node.children
        .filter(child => !child.hidden)
        .map(nodeToSidebarItem),
    }
  }

  return {
    text: node.title,
    link: node.link,
  }
}
