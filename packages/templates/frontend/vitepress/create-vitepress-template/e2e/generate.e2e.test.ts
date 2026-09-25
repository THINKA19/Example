import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { generateProject } from '../src/generate'
import type { Answers } from '../src/prompts/types'
import { getTemplateDir } from '../src/registry/fetch-template'
import sampleAnswers from './fixtures/answers.sample.json'

describe('generateProject (e2e)', () => {
  let targetDir: string

  beforeAll(async () => {
    targetDir = mkdtempSync(join(tmpdir(), 'create-my-docs-e2e-'))
    const templateDir = await getTemplateDir()
    const answers: Answers = { ...(sampleAnswers as unknown as Answers), targetDir }
    await generateProject(templateDir, answers)
  })

  afterAll(() => {
    rmSync(targetDir, { recursive: true, force: true })
  })

  it('生成根目录关键文件', () => {
    expect(existsSync(join(targetDir, 'package.json'))).toBe(true)
    expect(existsSync(join(targetDir, '.gitignore'))).toBe(true)
    expect(existsSync(join(targetDir, '.npmrc'))).toBe(true)
    expect(existsSync(join(targetDir, 'scaffold.config.json'))).toBe(true)
  })

  it('package.json 里的项目名按站点标题转成了 kebab-case', () => {
    const pkg = JSON.parse(readFileSync(join(targetDir, 'package.json'), 'utf-8'))
    expect(pkg.name).toBe('my-docs')
  })

  it('README.md 渲染了变量,不残留 EJS 占位符', () => {
    const readme = readFileSync(join(targetDir, 'README.md'), 'utf-8')
    expect(readme).toContain('My Docs')
    expect(readme).not.toContain('<%=')
  })

  it('生成了默认语言(root)和 zh 两套内容与配置', () => {
    expect(existsSync(join(targetDir, 'docs/src/guide/getting-started.md'))).toBe(true)
    expect(existsSync(join(targetDir, 'docs/src/zh/guide/getting-started.md'))).toBe(true)
    expect(existsSync(join(targetDir, 'docs/.vitepress/config/locales/en/index.ts'))).toBe(true)
    expect(existsSync(join(targetDir, 'docs/.vitepress/config/locales/zh/index.ts'))).toBe(true)
  })

  it('registry.ts 按选择的语言生成,默认语言的 localesKey 是 root', () => {
    const registry = readFileSync(
      join(targetDir, 'docs/.vitepress/config/locales/registry.ts'),
      'utf-8',
    )
    expect(registry).toContain('localesKey: \'root\'')
    expect(registry).toContain('code: \'zh\'')
  })

  it('按选项生成了 docker 与 CI 配置', () => {
    expect(existsSync(join(targetDir, 'docker/Dockerfile'))).toBe(true)
    expect(existsSync(join(targetDir, '.github/workflows/ci.yml'))).toBe(true)
  })

  it('generators 源码与单元测试被完整拷贝', () => {
    expect(existsSync(join(targetDir, 'docs/.vitepress/generators/generator.config.ts'))).toBe(true)
    expect(existsSync(join(targetDir, 'docs/.vitepress/generators/__tests__/filesystem.test.ts'))).toBe(true)
  })
})
