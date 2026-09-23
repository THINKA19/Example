import type { DefaultTheme } from 'vitepress'

/**
 * VitePress 默认主题全局配置
 * 包含站点 Logo、导航菜单、侧边栏、搜索、页脚以及全站中文本地化文案
 */
export const themeConfig: DefaultTheme.Config = {
  // ==================== 1. 品牌与基本视觉 ====================

  /** 站点标题左侧的 Logo 图标 (相对 public 目录) */
  logo: '/logo.svg',

  /** 
   * 自定义导航栏标题
   * - 设为 false 表示仅显示 logo，隐藏标题文字
   */
  siteTitle: '自定义导航栏标题', 

  /** 
   * 右侧“本页目录”大纲配置
   * - level: [2, 3] 代表只解析并展示 Markdown 中的 h2 和 h3 标题不建议包含 h1）
   */
  outline: {
    level: [2, 5],
    label: '本页目录'
  },

  // ==================== 2. 社交链接与编辑互动 ====================

  /** 导航栏右上角的社交账号/仓库链接列表 */
  socialLinks: [
    { icon: 'github', link: 'https://github.com/your-username/your-repo' }
  ],

  /** 
   * 页面底部的“在 GitHub 上编辑此页”配置
   * - 注意：pattern 中的路径需与 GitHub 上的真实文件目录保持一致
   * - 如果源文件放在 src 目录下，应写为 /src/:path
   */
  editLink: {
    pattern: 'https://github.com/your-username/your-repo/edit/main/src/:path',
    text: '在 GitHub 上编辑此页'
  },

  // ==================== 3. 底部页脚与更新信息 ====================

  /** 页面最下方的全局页脚配置 (仅在没有侧边栏的首页等无侧边栏页面生效) */
  footer: {
    message: '基于 MIT 许可协议发布',
    copyright: 'Copyright © 2024-present 您的名字'
  },

  /** 
   * 文章底部的“最后更新时间”文本格式化
   * - 需要同步在 siteConfig 中开启 lastUpdated: true
   */
  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium'
    }
  },

  /** 文档底部上一篇 / 下一篇切换按钮的提示文本 */
  docFooter: {
    prev: '上一页',
    next: '下一页'
  },

  // ==================== 4. UI 本地化与无障碍文案 (中文适配) ====================

  /** 暗色模式切换开关提示词 */
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',

  /** 移动端顶部侧边栏展开菜单按钮文案 */
  sidebarMenuLabel: '菜单',

  /** 右下角“回到顶部”按钮文案 */
  returnToTopLabel: '回到顶部',

  /** 404 错误页面中文文案配置 */
  notFound: {
    title: '页面未找到',
    quote: '看似你来到了一个未知的荒野...',
    linkLabel: '返回首页',
    linkText: '带我回家'
  },

  /** 识别到外部链接时的无障碍提示文案 (Accessibility) */
  externalLinkIcon: true,
}