import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { downloadTemplate } from 'giget'
import { logger } from '../utils/logger'
import { REMOTE_TEMPLATE_REPO, TEMPLATE_SOURCE } from './template.config'

/**
 * 返回一个"模板根目录"的本地文件系统路径,调用方不需要关心它是内置的
 * 还是刚从远程下载下来的临时目录。
 */
export async function getTemplateDir(): Promise<string> {
  if (TEMPLATE_SOURCE === 'local')
    return getLocalTemplateDir()

  return fetchRemoteTemplateDir()
}

function getLocalTemplateDir(): string {
  // dist/registry/fetch-template.js -> ../../template
  return join(dirname(fileURLToPath(import.meta.url)), '../../template')
}

async function fetchRemoteTemplateDir(): Promise<string> {
  const tempDir = mkdtempSync(join(tmpdir(), 'create-my-docs-'))

  logger.step(`正在从 ${REMOTE_TEMPLATE_REPO} 拉取最新模板…`)
  await downloadTemplate(REMOTE_TEMPLATE_REPO, { dir: tempDir, forceClean: true })
  logger.success('模板拉取完成')

  return tempDir
}
