import * as p from '@clack/prompts'
import { resolve } from 'node:path'
import type { Answers, LocaleAnswer } from './types'

/** 内置可选语言清单,问答阶段用来生成多选列表 */
const LOCALE_CATALOG: Record<string, { lang: string, label: string }> = {
  en: { lang: 'en-US', label: 'English' },
  zh: { lang: 'zh-CN', label: '简体中文' },
  vi: { lang: 'vi-VN', label: 'Tiếng Việt' },
  ja: { lang: 'ja-JP', label: '日本語' },
  fr: { lang: 'fr-FR', label: 'Français' },
}

function exitOnCancel<T>(value: T | symbol): T {
  if (p.isCancel(value)) {
    p.cancel('已取消。')
    process.exit(0)
  }
  return value as T
}

export async function collectAnswers(cliTargetDir?: string): Promise<Answers> {
  p.intro('create-my-docs')

  const targetDirInput = exitOnCancel(
    await p.text({
      message: '项目目录',
      placeholder: 'my-docs',
      initialValue: cliTargetDir,
      validate: value => (value.trim() ? undefined : '请输入目录名'),
    }),
  )

  const projectName = exitOnCancel(
    await p.text({
      message: '站点标题',
      placeholder: 'My Docs',
      defaultValue: 'My Docs',
    }),
  )

  const projectDescription = exitOnCancel(
    await p.text({
      message: '站点描述',
      placeholder: 'A VitePress Site',
      defaultValue: 'A VitePress Site',
    }),
  )

  const authorName = exitOnCancel(
    await p.text({
      message: '作者 / 组织名(写入 LICENSE)',
      placeholder: 'Your Name',
      defaultValue: 'Your Name',
    }),
  )

  const repoUrl = exitOnCancel(
    await p.text({
      message: 'GitHub 仓库地址',
      placeholder: 'https://github.com/your-org/your-repo',
      validate: value =>
        /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/.test(value) ? undefined : '请输入合法的 GitHub 仓库地址',
    }),
  )

  const defaultLocaleCode = exitOnCancel(
    await p.select({
      message: '默认语言(不带 URL 前缀)',
      options: Object.entries(LOCALE_CATALOG).map(([code, meta]) => ({
        value: code,
        label: `${meta.label} (${code})`,
      })),
      initialValue: 'en',
    }),
  )

  const extraLocaleCodes = exitOnCancel(
    await p.multiselect({
      message: '还需要哪些语言?(可多选,默认语言已自动包含,不用再选)',
      options: Object.entries(LOCALE_CATALOG)
        .filter(([code]) => code !== defaultLocaleCode)
        .map(([code, meta]) => ({ value: code, label: `${meta.label} (${code})` })),
      required: false,
    }),
  )

  const useDocker = exitOnCancel(
    await p.confirm({ message: '需要生成 Docker 部署配置吗?', initialValue: true }),
  )

  const useCi = exitOnCancel(
    await p.confirm({ message: '需要生成 GitHub Actions CI/CD 吗?', initialValue: true }),
  )

  const packageManager = exitOnCancel(
    await p.select({
      message: '包管理器',
      options: [
        { value: 'pnpm', label: 'pnpm(推荐)' },
        { value: 'npm', label: 'npm' },
        { value: 'yarn', label: 'yarn' },
      ],
      initialValue: 'pnpm',
    }),
  )

  p.outro('问答完成,开始生成项目…')

  const locales: LocaleAnswer[] = [
    { code: defaultLocaleCode, ...LOCALE_CATALOG[defaultLocaleCode] },
    ...extraLocaleCodes.map(code => ({ code, ...LOCALE_CATALOG[code] })),
  ]

  return {
    projectName,
    projectDescription,
    authorName,
    repoUrl: repoUrl.replace(/\/$/, ''),
    locales,
    useDocker,
    useCi,
    packageManager: packageManager as Answers['packageManager'],
    targetDir: resolve(process.cwd(), targetDirInput),
  }
}
