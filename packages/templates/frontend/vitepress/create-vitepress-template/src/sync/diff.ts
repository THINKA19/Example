import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { listFilesRecursive } from '../utils/fs-extra'
import type { FileOwner } from './ownership-map'
import { getOwner } from './ownership-map'

export interface FileDiff {
  filePath: string
  owner: FileOwner
  status: 'added' | 'changed' | 'unchanged'
}

/**
 * 对比 targetDir(用户现有项目)与 freshDir(用同样的问答结果重新跑一次
 * generateProject 产出的"最新模板版本"),逐文件打上归属标签和差异状态。
 */
export function diffProject(targetDir: string, freshDir: string): FileDiff[] {
  const freshFiles = listFilesRecursive(freshDir)
  const diffs: FileDiff[] = []

  for (const filePath of freshFiles) {
    const owner = getOwner(filePath).owner
    const targetFile = join(targetDir, filePath)
    const freshFile = join(freshDir, filePath)

    if (!existsSync(targetFile)) {
      diffs.push({ filePath, owner, status: 'added' })
      continue
    }

    const same = readFileSync(targetFile, 'utf-8') === readFileSync(freshFile, 'utf-8')
    diffs.push({ filePath, owner, status: same ? 'unchanged' : 'changed' })
  }

  return diffs
}
