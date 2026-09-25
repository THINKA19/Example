import type { Answers } from '../prompts/types'
import { firstCommit } from './first-commit'
import { gitInit } from './git-init'
import { huskyInstall } from './husky-install'
import { installDeps } from './install-deps'

export interface RunHooksOptions {
  /** 非交互 / e2e 测试场景下,可以跳过真正的安装和提交,只做纯生成 */
  skipInstall?: boolean
  skipGit?: boolean
}

export async function runPostGenerateHooks(answers: Answers, options: RunHooksOptions = {}): Promise<void> {
  if (!options.skipGit)
    await gitInit(answers.targetDir)

  if (!options.skipInstall) {
    await installDeps(answers.targetDir, answers.packageManager)
    await huskyInstall(answers.targetDir)
  }

  if (!options.skipGit && !options.skipInstall)
    await firstCommit(answers.targetDir)
}

export { firstCommit, gitInit, huskyInstall, installDeps }
