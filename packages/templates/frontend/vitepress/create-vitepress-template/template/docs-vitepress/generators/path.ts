import { relative, sep } from 'node:path'
import { SRC_DIR } from './generator.config'

/** 文件系统绝对路径 -> 相对 srcDir 的路径,统一转为正斜杠 */
export function toRelPath(absPath: string): string {
  return relative(SRC_DIR, absPath).split(sep).join('/')
}

/**
 * 相对路径 -> VitePress 最终页面链接(去掉 .md 后缀,index 归到目录本身)。
 * 语言前缀是"白捡"的:relPath 本身就包含了 zh/vi 这类目录前缀,
 * 这里不需要额外拼接任何语言相关逻辑。
 */
export function toLink(relPath: string): string {
  const withoutExt = relPath.replace(/\.md$/, '')
  return `/${withoutExt.replace(/\/index$/, '/')}`
}

/** 文件名 / 目录名兜底转标题,例如 getting-started -> Getting Started */
export function fileNameToTitle(name: string): string {
  const base = name.replace(/\.md$/, '')
  return base
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * 频道在 nav / sidebar 字典里对应的 key。
 * 例如 ('guide', '')   -> '/guide/'
 *      ('guide', 'zh') -> '/zh/guide/'
 */
export function toChannelKey(channel: string, localeDir = ''): string {
  return localeDir ? `/${localeDir}/${channel}/` : `/${channel}/`
}
