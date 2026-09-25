export interface LocaleAnswer {
  /** 语言标识,例如 'en' / 'zh' / 'vi',第一个永远是默认语言 */
  code: string
  /** <html lang="..."> 属性值,遵循 BCP 47 */
  lang: string
  /** 语言切换器中展示的名称 */
  label: string
}

export interface Answers {
  projectName: string
  projectDescription: string
  authorName: string
  /** GitHub 仓库地址,不带结尾斜杠,例如 https://github.com/acme/docs */
  repoUrl: string
  /** 第一项永远是默认语言(对应最终 locales 里的 'root') */
  locales: LocaleAnswer[]
  useDocker: boolean
  useCi: boolean
  packageManager: 'pnpm' | 'npm' | 'yarn'
  targetDir: string
}
