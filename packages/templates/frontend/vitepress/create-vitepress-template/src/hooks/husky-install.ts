import { execa } from 'execa'
import { logger } from '../utils/logger'

/**
 * husky 的 prepare 脚本(package.json 里的 "prepare": "husky")在
 * install 阶段已经会自动跑一次,这里只是兜底:如果因为某些包管理器
 * 跳过了 prepare 生命周期,手动再触发一次,确保 git hooks 生效。
 */
export async function huskyInstall(targetDir: string): Promise<void> {
  try {
    await execa('npx', ['husky'], { cwd: targetDir })
    logger.success('git hooks 已启用')
  }
  catch {
    logger.warn('husky 初始化失败,已跳过(不影响项目本身正常使用)')
  }
}
