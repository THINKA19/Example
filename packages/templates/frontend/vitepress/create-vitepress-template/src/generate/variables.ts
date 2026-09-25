import type { Answers } from '../prompts/types'

export interface LocaleVariable {
  code: string
  lang: string
  label: string
  /** 内容目录前缀,相对 docs/src。默认语言为空字符串 */
  contentDir: string
  /** 最终 defineConfig().locales 对象的 key,默认语言固定为 'root' */
  localesKey: string
  isRoot: boolean
}

export interface TemplateVariables {
  PROJECT_NAME: string
  PROJECT_NAME_KEBAB: string
  PROJECT_DESCRIPTION: string
  AUTHOR_NAME: string
  YEAR: string
  REPO_URL: string
  PACKAGE_MANAGER: string
  locales: LocaleVariable[]
}

function toKebabCase(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-docs'
}

/**
 * 把问答结果(Answers)转换成渲染模板需要的变量表。
 * 只有这一处知道"第一个 locale 是默认语言、且它的 localesKey 必须是 root"
 * 这条 VitePress 硬性规则,其余代码都只消费这里算好的结果。
 */
export function resolveVariables(answers: Answers): TemplateVariables {
  const locales: LocaleVariable[] = answers.locales.map((locale, index) => {
    const isRoot = index === 0
    return {
      code: locale.code,
      lang: locale.lang,
      label: locale.label,
      contentDir: isRoot ? '' : locale.code,
      localesKey: isRoot ? 'root' : locale.code,
      isRoot,
    }
  })

  return {
    PROJECT_NAME: answers.projectName,
    PROJECT_NAME_KEBAB: toKebabCase(answers.projectName),
    PROJECT_DESCRIPTION: answers.projectDescription,
    AUTHOR_NAME: answers.authorName,
    YEAR: String(new Date().getFullYear()),
    REPO_URL: answers.repoUrl,
    PACKAGE_MANAGER: answers.packageManager,
    locales,
  }
}
