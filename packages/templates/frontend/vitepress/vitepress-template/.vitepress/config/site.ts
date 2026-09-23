import type { DefaultTheme, UserConfig } from 'vitepress'

/** 站点部署的基准路径 (Base URL) */
const VITE_BASE = (import.meta.env?.VITE_BASE as string) || '/'
/** 站点生产环境完整域名 (用于 RSS、Sitemap 生成) */
const VITE_SITE_URL = (import.meta.env?.VITE_SITE_URL as string) 

/**
 * 站点基础配置
 * 包含了 HTML 头部元数据、路由模式、国际化语言以及构建输出规则
 */
export const siteConfig: UserConfig<DefaultTheme.Config> = {
  // ==================== 1. 站点元数据与基础信息 ====================

  /** 站点标题，显示在浏览器标签页和导航栏 */
  title: '我的文档站点',

  /** 站点描述，主要用于搜索引擎 SEO 的 <meta name="description"> 标签 */
  description: '基于 VitePress 的项目文档',

  /** 站点 HTML 的 lang 属性，影响浏览器翻译提示与页面默认字体渲染 */
  lang: 'zh-CN',

  /** 
   * 站点部署的基准路径 (Base URL)
   * - 部署在根域名 (https://example.com/) 时设为 '/'
   * - 部署在 GitHub Pages 或子路径 (https://example.com/docs/) 时设为 '/docs/'
   * - 建议：生产环境可通过 import.meta.env.VITE_BASE 动态读取
   */
  base: VITE_BASE,

  // ==================== 2. 交互与外观配置 ====================

  /** 
   * 暗黑模式/外观切换支持
   * - true: 开启切换按钮，默认跟随系统首选项
   * - 'dark': 默认强制显示暗色模式
   * - false: 禁用暗色模式切换
   */
  appearance: true,

  /**
   * 是否在页面底部显示 Git 提交的“最后更新时间”
   * - 需要配合 themeConfig.lastUpdated 的文本配置一起使用
   * - 注意：Git 仓库未提交过的全新文件可能不显示时间
   */
  lastUpdated: true,

  // ==================== 3. 路由与链接策略 ====================

  /** 
   * 简洁 URL 模式 (去除 .html 后缀)
   * - true: 开启后访问 /guide/start 而不是 /guide/start.html
   * - 注意：需要服务器 (如 Nginx/Vercel/GitHub Pages) 支持重写规则，否则直接刷新页面可能 404
   */
  cleanUrls: true,

  /** 
   * 是否忽略死链接校验 (死链检测)
   * - false (默认): 构建打包时如果存在无效相对链接，会自动报错中断构建 (强烈建议生产环境设为 false)
   * - true: 忽略死链警告，强制构建完成
   * - ['/invalid-link']: 也可以传数组只忽略特定的死链接
   */
  ignoreDeadLinks: [
    // 忽略特定前缀或正则表达式匹配到的死链
    /^https?:\/\/localhost/
  ],

  /**
   * 自动生成 sitemap.xml 供搜索引擎抓取 (SEO 核心配置)
   * - 替换为你的真实线上域名
   */
  sitemap: {
    hostname: VITE_SITE_URL 
  },

  // ==================== 4. 目录结构与构建输出 ====================

  /** 
   * Markdown 源码文件所在的相对目录
   * - 设为 './src' 后，VitePress 会将项目根目录下的 src/ 识别为文档根路径
   * - 所有 index.md、api.md 都应放置在 src 目录下
   */
  srcDir: './src',

  /** 
   * 项目打包编译后的静态文件输出目录
   * - 当前配置为 '../dist'，代表输出到项目根目录外的 dist 文件夹
   * - 若希望输出在项目根目录下的 dist，建议设为 './dist' 或使用 process.cwd() 计算
   */
  outDir: './dist',

   /**
   * Vite底层配置，VitePress是基于Vite构建，这里直接透传Vite配置项
   * - publicDir：指定静态资源public文件夹的位置
   * - 当前srcDir是 ./src，配置文件运行时的基准目录在 src/.vitepress
   * - public目录里面放置logo、图片等不需要编译、直接原样输出的静态资源
   */
  vite: {
    publicDir: '../public'
  },
}