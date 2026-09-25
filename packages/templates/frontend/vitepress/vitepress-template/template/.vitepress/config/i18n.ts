import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

/**
 * 国际化（i18n）配置模块
 * 
 * 支持多语言站点配置，包括：
 * - 默认语言（中文）
 * - 英文（English）
 * - 越南语（Tiếng Việt）
 * 
 * 每个语言配置包含：
 * 1. label: 语言选择器显示的名称
 * 2. lang: HTML lang 属性
 * 3. title: 站点标题
 * 4. description: 站点描述
 * 5. themeConfig: 主题配置（导航、侧边栏、UI 文案等）
 */

// ==================== 中文配置 ====================
export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: '简体中文',
  lang: 'zh-CN',
  title: '我的文档站点',
  description: '基于 VitePress 的项目文档',
  
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '指南', link: '/zh/guide/' },
      { text: 'API 参考', link: '/zh/api/' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/zh/about/' },
          { text: '更新日志', link: '/zh/changelog/' },
        ],
      },
    ],

    // 侧边栏
    sidebar: {
      '/zh/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/zh/guide/' },
            { text: '快速开始', link: '/zh/guide/getting-started' },
            { text: '配置', link: '/zh/guide/configuration' },
          ],
        },
      ],
      '/zh/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/zh/api/' },
            { text: 'API 文档', link: '/zh/api/reference' },
          ],
        },
      ],
    },

    // UI 本地化文案
    outline: {
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/src/:path',
      text: '在 GitHub 上编辑此页',
    },
    footer: {
      message: '基于 MIT 许可协议发布',
      copyright: 'Copyright © 2024-present 您的名字',
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    notFound: {
      title: '页面未找到',
      quote: '看似你来到了一个未知的荒野...',
      linkLabel: '返回首页',
      linkText: '带我回家',
    },
  },
}

// ==================== 英文配置 ====================
export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: 'English',
  lang: 'en-US',
  title: 'My Documentation Site',
  description: 'Project documentation based on VitePress',
  
  themeConfig: {
    // Navigation
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Guide', link: '/en/guide/' },
      { text: 'API Reference', link: '/en/api/' },
      {
        text: 'More',
        items: [
          { text: 'About', link: '/en/about/' },
          { text: 'Changelog', link: '/en/changelog/' },
        ],
      },
    ],

    // Sidebar
    sidebar: {
      '/en/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/en/guide/' },
            { text: 'Getting Started', link: '/en/guide/getting-started' },
            { text: 'Configuration', link: '/en/guide/configuration' },
          ],
        },
      ],
      '/en/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/en/api/' },
            { text: 'API Documentation', link: '/en/api/reference' },
          ],
        },
      ],
    },

    // UI Localization
    outline: {
      label: 'On this page',
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/src/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2024-present Your Name',
    },
    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    notFound: {
      title: 'Page Not Found',
      quote: 'It seems you have wandered into an unknown wilderness...',
      linkLabel: 'Go to home',
      linkText: 'Take me home',
    },
  },
}

// ==================== 越南语配置 ====================
export const viConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  label: 'Tiếng Việt',
  lang: 'vi-VN',
  title: 'Trang Tài Liệu Của Tôi',
  description: 'Tài liệu dự án dựa trên VitePress',
  
  themeConfig: {
    // Điều hướng
    nav: [
      { text: 'Trang chủ', link: '/vi/' },
      { text: 'Hướng dẫn', link: '/vi/guide/' },
      { text: 'Tham khảo API', link: '/vi/api/' },
      {
        text: 'Thêm',
        items: [
          { text: 'Giới thiệu', link: '/vi/about/' },
          { text: 'Nhật ký thay đổi', link: '/vi/changelog/' },
        ],
      },
    ],

    // Thanh bên
    sidebar: {
      '/vi/guide/': [
        {
          text: 'Hướng dẫn',
          items: [
            { text: 'Giới thiệu', link: '/vi/guide/' },
            { text: 'Bắt đầu nhanh', link: '/vi/guide/getting-started' },
            { text: 'Cấu hình', link: '/vi/guide/configuration' },
          ],
        },
      ],
      '/vi/api/': [
        {
          text: 'Tham khảo API',
          items: [
            { text: 'Tổng quan', link: '/vi/api/' },
            { text: 'Tài liệu API', link: '/vi/api/reference' },
          ],
        },
      ],
    },

    // Bản địa hóa UI
    outline: {
      label: 'Trên trang này',
    },
    docFooter: {
      prev: 'Trang trước',
      next: 'Trang tiếp',
    },
    lastUpdated: {
      text: 'Cập nhật lần cuối',
    },
    editLink: {
      pattern: 'https://github.com/your-username/your-repo/edit/main/src/:path',
      text: 'Chỉnh sửa trang này trên GitHub',
    },
    footer: {
      message: 'Phát hành theo Giấy phép MIT',
      copyright: 'Bản quyền © 2024-nay Tên Của Bạn',
    },
    darkModeSwitchLabel: 'Giao diện',
    lightModeSwitchTitle: 'Chuyển sang chế độ sáng',
    darkModeSwitchTitle: 'Chuyển sang chế độ tối',
    sidebarMenuLabel: 'Trình đơn',
    returnToTopLabel: 'Quay lại đầu trang',
    notFound: {
      title: 'Không Tìm Thấy Trang',
      quote: 'Có vẻ như bạn đã đi vào một vùng hoang dã chưa biết...',
      linkLabel: 'Về trang chủ',
      linkText: 'Đưa tôi về nhà',
    },
  },
}

/**
 * 语言配置映射表
 * 用于在 config.ts 中集成到 VitePress 配置
 * 
 * root 设为中文但文件在 zh/ 目录下，rewrites 重写 URL
 */
export const localesConfig = {
  root: {
    label: '简体中文',
    lang: 'zh-CN',
  },
  en: enConfig,
  vi: viConfig,
}
