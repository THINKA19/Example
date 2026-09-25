import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true })
}

export function isEmptyDir(dir: string): boolean {
  if (!existsSync(dir))
    return true
  return readdirSync(dir).length === 0
}

export function removeDir(dir: string): void {
  if (existsSync(dir))
    rmSync(dir, { recursive: true, force: true })
}

/** 递归列出目录下所有文件的相对路径,主要给 e2e 测试断言用 */
export function listFilesRecursive(dir: string, base = dir): string[] {
  const result: string[] = []

  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name)
    if (statSync(fullPath).isDirectory())
      result.push(...listFilesRecursive(fullPath, base))
    else
      result.push(fullPath.slice(base.length + 1))
  }

  return result
}
