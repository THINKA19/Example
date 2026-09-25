import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { extractFallbackTitle, parseFrontmatter } from './frontmatter'
import { IGNORE_LIST, SRC_DIR } from './generator.config'
import { fileNameToTitle, toLink, toRelPath } from './path'
import type { ContentNode } from './types'

/**
 * 扫描指定频道目录,返回排好序的 ContentNode 树。
 *
 * @param channel   频道目录名,例如 'guide'
 * @param localeDir 语言内容目录前缀,例如 'zh'。默认语言传空字符串(默认值),
 *                  此时直接扫描 <srcDir>/guide,不带任何语言前缀。
 */
export function scanChannel(channel: string, localeDir = ''): ContentNode[] {
  const channelDir = localeDir
    ? join(SRC_DIR, localeDir, channel)
    : join(SRC_DIR, channel)

  return scanDir(channelDir)
}

function scanDir(dirPath: string): ContentNode[] {
  const entries = readdirSync(dirPath).filter(name => !IGNORE_LIST.includes(name))

  const nodes = entries
    .map((name) => {
      const fullPath = join(dirPath, name)
      return statSync(fullPath).isDirectory()
        ? buildDirNode(fullPath, name)
        : buildFileNode(fullPath)
    })
    .filter((n): n is ContentNode => n !== null)

  return nodes.sort((a, b) => a.order - b.order)
}

function buildDirNode(fullPath: string, dirName: string): ContentNode {
  const children = scanDir(fullPath)
  const relPath = toRelPath(fullPath)

  return {
    absPath: fullPath,
    relPath,
    link: `/${relPath}/`,
    title: fileNameToTitle(dirName),
    order: children[0]?.order ?? Number.MAX_SAFE_INTEGER,
    hidden: false,
    isDir: true,
    children,
  }
}

function buildFileNode(fullPath: string): ContentNode | null {
  if (!fullPath.endsWith('.md'))
    return null

  const raw = readFileSync(fullPath, 'utf-8')
  const { title, order, hidden, rawContent } = parseFrontmatter(raw)
  const relPath = toRelPath(fullPath)
  const fileName = fullPath.split('/').pop()!
  const fallbackTitle = extractFallbackTitle(rawContent, fileNameToTitle(fileName))

  return {
    absPath: fullPath,
    relPath,
    link: toLink(relPath),
    title: title ?? fallbackTitle,
    order,
    hidden,
    isDir: false,
  }
}
