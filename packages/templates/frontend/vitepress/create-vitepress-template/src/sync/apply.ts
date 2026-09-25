import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import * as p from '@clack/prompts'
import { logger } from '../utils/logger'
import type { FileDiff } from './diff'

export async function applyDiffs(targetDir: string, freshDir: string, diffs: FileDiff[]): Promise<void> {
  const scaffoldChanges = diffs.filter(d => d.owner === 'scaffold' && d.status !== 'unchanged')
  const askChanges = diffs.filter(d => d.owner === 'ask' && d.status !== 'unchanged')
  const userChanges = diffs.filter(d => d.owner === 'user' && d.status !== 'unchanged')

  for (const diff of scaffoldChanges)
    overwrite(targetDir, freshDir, diff.filePath)

  if (scaffoldChanges.length > 0)
    logger.success(`已自动更新 ${scaffoldChanges.length} 个脚手架维护的文件`)

  if (userChanges.length > 0) {
    logger.warn(`跳过 ${userChanges.length} 个业务方维护的文件(不会被覆盖):`)
    userChanges.forEach(d => console.warn(`  - ${d.filePath}`))
  }

  if (askChanges.length === 0)
    return

  const selected = await p.multiselect({
    message: `以下 ${askChanges.length} 个文件有更新但需要人工确认,选择要覆盖的项(不选则保留现状)`,
    options: askChanges.map(d => ({ value: d.filePath, label: `${d.filePath} (${d.status})` })),
    required: false,
  })

  if (p.isCancel(selected))
    return

  const chosen = selected as string[]
  for (const filePath of chosen)
    overwrite(targetDir, freshDir, filePath)

  if (chosen.length > 0)
    logger.success(`已按你的选择更新 ${chosen.length} 个文件`)
}

function overwrite(targetDir: string, freshDir: string, filePath: string): void {
  const destPath = join(targetDir, filePath)
  mkdirSync(dirname(destPath), { recursive: true })
  copyFileSync(join(freshDir, filePath), destPath)
}
