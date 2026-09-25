import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const DIST_DIR = resolve(process.cwd(), 'docs/.vitepress/dist')

interface BrokenLink {
  file: string
  link: string
  reason: string
}

function walkHtmlFiles(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name)
    if (statSync(fullPath).isDirectory())
      walkHtmlFiles(fullPath, files)
    else if (extname(fullPath) === '.html')
      files.push(fullPath)
  }
  return files
}

/** 从 html 内容里提取所有 <a href="..."> 的链接,不处理 script/link 等静态资源标签 */
function extractLinks(html: string): string[] {
  return [...html.matchAll(/<a\s+[^>]*href="([^"]+)"/g)].map(m => m[1])
}

/** 只校验站内链接,跳过外链、纯锚点、mailto: 等协议链接 */
function isInternalLink(link: string): boolean {
  if (!link || link.startsWith('#'))
    return false
  if (/^[a-z][a-z0-9+.-]*:/i.test(link)) // http:, https:, mailto: 等
    return false
  return link.startsWith('/')
}

/** 站内链接 -> dist 目录下对应的文件系统路径 */
function resolveToFile(link: string): string {
  const [pathname] = link.split('#')

  if (pathname.endsWith('/'))
    return join(DIST_DIR, pathname, 'index.html')

  if (extname(pathname)) // 带扩展名,视为静态资源(图片等),直接比对
    return join(DIST_DIR, pathname)

  // VitePress cleanUrls 场景下,不带扩展名的路径实际落地为 <path>.html
  return `${join(DIST_DIR, pathname)}.html`
}

/** 校验链接里的锚点(#xxx)在目标文件中是否存在对应 id */
function checkAnchor(filePath: string, link: string): boolean {
  const hashIndex = link.indexOf('#')
  if (hashIndex === -1)
    return true

  const anchor = link.slice(hashIndex + 1)
  if (!anchor || !existsSync(filePath))
    return true // 文件本身不存在的情况已经在上一步报告,这里不重复报错

  const html = readFileSync(filePath, 'utf-8')
  return html.includes(`id="${anchor}"`)
}

function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`[check-links] 构建产物目录不存在: ${DIST_DIR}`)
    console.error('请先运行 pnpm docs:build 再执行本脚本')
    process.exit(1)
  }

  const htmlFiles = walkHtmlFiles(DIST_DIR)
  const broken: BrokenLink[] = []

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8')

    for (const link of extractLinks(html)) {
      if (!isInternalLink(link))
        continue

      const targetFile = resolveToFile(link)

      if (!existsSync(targetFile)) {
        broken.push({ file, link, reason: '目标页面 / 资源不存在' })
        continue
      }

      if (!checkAnchor(targetFile, link))
        broken.push({ file, link, reason: '锚点不存在' })
    }
  }

  if (broken.length > 0) {
    console.error(`\n❌ 发现 ${broken.length} 个死链:\n`)
    for (const { file, link, reason } of broken)
      console.error(`  ${file.replace(DIST_DIR, '')}\n    -> ${link}  (${reason})`)

    process.exit(1)
  }

  console.log(`✅ 死链检测通过,共扫描 ${htmlFiles.length} 个页面。`)
}

main()
