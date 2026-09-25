interface LinkedItem {
  link?: string
}

/**
 * 用 override 覆盖或追加到 generated 数组中,按 link 字段匹配。
 * - override 中的 link 与 generated 某一项相同 -> 替换该项(保留原有位置)
 * - override 中的 link 在 generated 中不存在 -> 追加到数组末尾
 *
 * 全站只有这一套合并规则,nav.ts / sidebar.ts(不论哪个语言)都通过
 * generate-nav / generate-sidebar 间接调用这里。
 */
export function mergeByLink<T extends LinkedItem>(generated: T[], override: T[] = []): T[] {
  const result = [...generated]

  for (const item of override) {
    const index = result.findIndex(g => g.link && item.link && g.link === item.link)
    if (index >= 0)
      result[index] = item
    else
      result.push(item)
  }

  return result
}
