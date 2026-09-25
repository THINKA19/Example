import { execa } from 'execa'
import { logger } from '../utils/logger'

export async function firstCommit(targetDir: string): Promise<void> {
  try {
    await execa('git', ['add', '-A'], { cwd: targetDir })
    await execa('git', ['commit', '-m', 'chore: initial commit from create-my-docs'], { cwd: targetDir })
    logger.success('已创建初始 commit')
  }
  catch {
    logger.warn('创建初始 commit 失败,已跳过(可以稍后手动提交)')
  }
}
