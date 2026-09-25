import { execa } from 'execa'
import { logger } from '../utils/logger'

export async function installDeps(targetDir: string, packageManager: string): Promise<void> {
  logger.step(`正在使用 ${packageManager} 安装依赖…`)

  try {
    await execa(packageManager, ['install'], { cwd: targetDir, stdio: 'inherit' })
    logger.success('依赖安装完成')
  }
  catch {
    logger.warn(`依赖安装失败,已跳过。请手动进入项目目录后运行 \`${packageManager} install\``)
  }
}
