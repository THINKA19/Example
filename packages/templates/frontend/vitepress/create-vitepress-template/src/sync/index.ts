import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { generateProject } from '../generate'
import { getTemplateDir } from '../registry/fetch-template'
import { logger } from '../utils/logger'
import { applyDiffs } from './apply'
import { diffProject } from './diff'

/**
 * `npx create-my-docs upgrade` 的主流程:
 * 1. 读取项目里 scaffold.config.json 记录的生成时选项
 * 2. 用同样的选项,在临时目录里重新跑一遍完整生成流程,得到"最新模板版本"
 * 3. 对比临时目录与用户项目,按文件归属表分类
 * 4. scaffold 类直接覆盖,user 类跳过,ask 类交给用户勾选
 */
export async function runUpgrade(targetDir: string): Promise<void> {
  const configPath = join(targetDir, 'scaffold.config.json')

  if (!existsSync(configPath)) {
    logger.error('当前目录找不到 scaffold.config.json,无法确定生成时的选项,升级已中止')
    process.exit(1)
  }

  const { answers } = JSON.parse(readFileSync(configPath, 'utf-8'))
  const freshDir = mkdtempSync(join(tmpdir(), 'create-my-docs-upgrade-'))

  try {
    const templateDir = await getTemplateDir()
    await generateProject(templateDir, { ...answers, targetDir: freshDir })

    const diffs = diffProject(targetDir, freshDir)
    const changedCount = diffs.filter(d => d.status !== 'unchanged').length

    if (changedCount === 0) {
      logger.success('已经是最新版本,没有需要更新的文件')
      return
    }

    await applyDiffs(targetDir, freshDir, diffs)
  }
  finally {
    rmSync(freshDir, { recursive: true, force: true })
  }
}

export { applyDiffs } from './apply'
export { diffProject } from './diff'
export type { FileDiff } from './diff'
export { getOwner, OWNERSHIP_MAP } from './ownership-map'
