import type { UserConfig } from 'vitepress'

export const site: Pick<UserConfig, 'srcDir' | 'cleanUrls' | 'lastUpdated'> = {
  // 所有 Markdown 内容集中放在 src 目录,与 .vitepress 框架配置物理隔离
  srcDir: 'src',
  cleanUrls: true,
  lastUpdated: true,
}
