import { execa } from 'execa'
import { logger } from '../utils/logger'

export async function gitInit(targetDir: string): Promise<void> {
  try {
    await execa('git', ['init'], { cwd: targetDir })
    logger.success('git 仓库已初始化')
  }
  catch {
    logger.warn('git init 失败,已跳过(可能未安装 git,或目录已是仓库)')
  }
}
