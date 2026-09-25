import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { isTemplateFile, renderTemplate, stripTemplateExt } from './render-variables'

/** dotfile 在模板里存成这些名字,拷贝到目标项目时需要改回真实文件名。
 *  原因:直接在 npm 包里放 .gitignore / .npmrc 这类文件,发布时容易被
 *  npm 自身的默认忽略规则误判掉,主流脚手架(如 create-vite)都是这么处理的。 */
const DOTFILE_RENAME: Record<string, string> = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc',
  _dockerignore: '.dockerignore',
}

/** 这些目录由 generate/locales-generator.ts 单独处理,通用拷贝逻辑要跳过它们 */
const SKIP_DIRS = new Set(['_lang', '_root', '_locale'])

export interface CopyOptions {
  vars: Record<string, unknown>
}

/** 递归拷贝一个模板目录到目标目录,处理 dotfile 改名与 .ejs 渲染 */
export function copyDir(srcDir: string, destDir: string, options: CopyOptions): void {
  mkdirSync(destDir, { recursive: true })

  for (const name of readdirSync(srcDir)) {
    if (SKIP_DIRS.has(name))
      continue

    const srcPath = join(srcDir, name)

    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, join(destDir, name), options)
      continue
    }

    copyFile(srcPath, destDir, name, options)
  }
}

function copyFile(srcPath: string, destDir: string, name: string, { vars }: CopyOptions): void {
  const targetName = DOTFILE_RENAME[name] ?? stripTemplateExt(name)
  const destPath = join(destDir, targetName)

  const raw = readFileSync(srcPath, 'utf-8')
  const content = isTemplateFile(name) ? renderTemplate(raw, vars) : raw

  writeFileSync(destPath, content, 'utf-8')
}
