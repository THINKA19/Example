import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execa } from 'execa'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { generateProject } from '../src/generate'
import type { Answers } from '../src/prompts/types'
import { getTemplateDir } from '../src/registry/fetch-template'
import sampleAnswers from './fixtures/answers.sample.json'

/**
 * 这个测试会真的执行 install + lint + test + build + check-links,
 * 耗时通常几十秒到几分钟,默认跳过。
 * 需要时设置环境变量 RUN_E2E_SMOKE=1 再运行 `pnpm test:e2e`。
 */
const runSmoke = process.env.RUN_E2E_SMOKE === '1'

describe.skipIf(!runSmoke)('generated project build smoke test (e2e)', () => {
  let targetDir: string

  beforeAll(async () => {
    targetDir = mkdtempSync(join(tmpdir(), 'create-my-docs-smoke-'))
    const templateDir = await getTemplateDir()
    const answers: Answers = { ...(sampleAnswers as unknown as Answers), targetDir }
    await generateProject(templateDir, answers)
    await execa('pnpm', ['install'], { cwd: targetDir, stdio: 'inherit' })
  }, 5 * 60 * 1000)

  afterAll(() => {
    rmSync(targetDir, { recursive: true, force: true })
  })

  it('lint 通过', async () => {
    await execa('pnpm', ['lint'], { cwd: targetDir })
  })

  it('generators 单元测试通过', async () => {
    await execa('pnpm', ['test'], { cwd: targetDir })
  })

  it('构建通过', async () => {
    await execa('pnpm', ['docs:build'], { cwd: targetDir })
    expect(existsSync(join(targetDir, 'docs/.vitepress/dist/index.html'))).toBe(true)
  }, 2 * 60 * 1000)

  it('死链检测通过', async () => {
    await execa('pnpm', ['check-links'], { cwd: targetDir })
  })
})
