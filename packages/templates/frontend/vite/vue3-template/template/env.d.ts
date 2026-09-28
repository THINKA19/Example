/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题，用于 document.title 和 index.html */
  readonly VITE_APP_TITLE: string
  /** 接口前缀，请求的 baseURL */
  readonly VITE_API_BASE_URL: string
  /** 开发环境代理目标，仅 vite.config.ts 使用 */
  readonly VITE_PROXY_TARGET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}