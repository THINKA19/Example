import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题，用于 document.title */
    title?: string
    /** 是否需要登录，默认 true；公开页面显式写 false */
    requiresAuth?: boolean
    /** 是否在菜单中隐藏 */
    hidden?: boolean
  }
}