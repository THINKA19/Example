import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { copyDir } from './copy-template'
import type { LocaleVariable, TemplateVariables } from './variables'

/**
 * 生成多语言相关的一切:
 * 1. docs/.vitepress/config/locales/{code}/{index,meta,nav,sidebar}.ts —— 每个语言一份,来自 _lang 模板
 * 2. docs/.vitepress/config/locales/registry.ts 和 index.ts —— 需要遍历所有语言,程序化生成,不走文件模板
 * 3. docs/src/{contentDir}/** —— 默认语言用 _root 模板,其余语言用 _locale 模板
 */
export function generateLocales(templateRoot: string, targetDir: string, vars: TemplateVariables): void {
  const localesConfigDir = join(targetDir, 'docs/.vitepress/config/locales')
  const langTemplateDir = join(templateRoot, 'docs-vitepress/config/locales/_lang')
  const rootContentTemplateDir = join(templateRoot, 'docs-src/_root')
  const localeContentTemplateDir = join(templateRoot, 'docs-src/_locale')

  mkdirSync(localesConfigDir, { recursive: true })

  for (const locale of vars.locales) {
    // EJS 模板里既要用到全局变量(PROJECT_NAME 等),也要用到当前语言自己的字段
    const localeVars = { ...vars, ...locale }

    copyDir(langTemplateDir, join(localesConfigDir, locale.code), { vars: localeVars })

    const contentTarget = locale.isRoot
      ? join(targetDir, 'docs/src')
      : join(targetDir, 'docs/src', locale.contentDir)

    copyDir(
      locale.isRoot ? rootContentTemplateDir : localeContentTemplateDir,
      contentTarget,
      { vars: localeVars },
    )
  }

  writeFileSync(join(localesConfigDir, 'registry.ts'), buildRegistryFile(vars.locales), 'utf-8')
  writeFileSync(join(localesConfigDir, 'index.ts'), buildLocalesIndexFile(vars.locales), 'utf-8')
}

function buildRegistryFile(locales: LocaleVariable[]): string {
  const entries = locales
    .map(l =>
      `  { code: '${l.code}', localesKey: '${l.localesKey}', contentDir: '${l.contentDir}', lang: '${l.lang}', label: '${l.label}' },`,
    )
    .join('\n')

  return `import type { LocaleRegistryEntry } from './types'

/**
 * 语言注册表,由 create-my-docs 根据生成时的问答结果自动生成。
 * 新增语言建议重新跑一次 \`npx create-my-docs upgrade\`,而不是手写这个文件。
 */
export const localeRegistry: LocaleRegistryEntry[] = [
${entries}
]

export function getRegistryEntry(code: string): LocaleRegistryEntry {
  const entry = localeRegistry.find(item => item.code === code)
  if (!entry)
    throw new Error(\`[locales/registry] 未找到语言注册项: \${code}\`)

  return entry
}
`
}

function buildLocalesIndexFile(locales: LocaleVariable[]): string {
  const imports = locales.map(l => `import { ${l.code} } from './${l.code}'`).join('\n')
  const entries = locales.map(l => `  [getRegistryEntry('${l.code}').localesKey]: ${l.code},`).join('\n')

  return `import type { DefaultTheme, LocaleConfig } from 'vitepress'
${imports}
import { getRegistryEntry } from './registry'

/**
 * 按 registry.ts 里的 localesKey,把各语言配置拼成 VitePress 需要的 locales 字典。
 * 默认语言会被放到 'root' 这个 key 下 —— 这是 VitePress 的硬性要求,不是约定。
 */
export const locales: LocaleConfig<DefaultTheme.Config> = {
${entries}
}
`
}
