import type { UserConfig } from 'vitepress'

export const seo: Pick<UserConfig, 'head'> = {
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
}
