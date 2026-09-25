import { resolve } from 'node:path'
import { generateProject } from './generate'
import { runPostGenerateHooks } from './hooks'
import { collectAnswers } from './prompts'
import { getTemplateDir } from './registry/fetch-template'
import { runUpgrade } from './sync'
import { logger } from './utils/logger'

async function main(): Promise<void> {
  const [, , command, ...rest] = process.argv

  if (command === 'upgrade') {
    const targetDir = resolve(process.cwd(), rest[0] ?? '.')
    await runUpgrade(targetDir)
    return
  }

  // 默认命令是 create:第一个非 flag 参数当作目标目录名的初始值,
  // 支持 `create-my-docs` / `create-my-docs my-docs` 两种用法
  const cliTargetDir = command && !command.startsWith('-') ? command : rest[0]

  const answers = await collectAnswers(cliTargetDir)
  const templateDir = await getTemplateDir()

  logger.step('正在生成项目文件…')
  await generateProject(templateDir, answers)
  logger.success('项目文件生成完成')

  await runPostGenerateHooks(answers)

  logger.step('全部完成 🎉')
  console.log(`
  cd ${answers.targetDir}
  ${answers.packageManager} run docs:dev
`)
}

main().catch((error) => {
  logger.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
