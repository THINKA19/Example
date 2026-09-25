import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Answers } from '../prompts/types'
import { copyDir } from './copy-template'
import { generateLocales } from './locales-generator'
import { resolveVariables } from './variables'

export async function generateProject(templateRoot: string, answers: Answers): Promise<void> {
  const vars = resolveVariables(answers)
  const targetDir = answers.targetDir

  mkdirSync(targetDir, { recursive: true })

  // 根目录通用文件(.editorconfig / eslint / husky / package.json 等)
  copyDir(join(templateRoot, 'base'), targetDir, { vars })

  if (answers.useDocker)
    copyDir(join(templateRoot, 'docker'), join(targetDir, 'docker'), { vars })

  if (answers.useCi)
    copyDir(join(templateRoot, 'workflows'), join(targetDir, '.github/workflows'), { vars })

  copyDir(join(templateRoot, 'scripts'), join(targetDir, 'scripts'), { vars })

  // docs/.vitepress 除 locales 外的部分(config/*.ts、generators/*、theme/*)
  // constants.ts.ejs 会在这一步顺带被渲染,不需要单独处理
  copyDir(join(templateRoot, 'docs-vitepress'), join(targetDir, 'docs/.vitepress'), { vars })

  // 多语言:config/locales/{code}/* + docs/src/{contentDir}/*
  generateLocales(templateRoot, targetDir, vars)

  // 记录本次生成的选项快照,供以后 `create-my-docs upgrade` 读取比对
  writeFileSync(
    join(targetDir, 'scaffold.config.json'),
    JSON.stringify(
      {
        scaffoldVersion: getPackageVersion(),
        generatedAt: new Date().toISOString(),
        answers,
      },
      null,
      2,
    ),
    'utf-8',
  )
}

function getPackageVersion(): string {
  const pkgPath = join(dirname(fileURLToPath(import.meta.url)), '../../package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  return pkg.version as string
}
