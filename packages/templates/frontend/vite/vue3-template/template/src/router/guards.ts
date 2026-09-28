import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'

const APP_TITLE = import.meta.env.VITE_APP_TITLE

export function setupGuards(router: Router) {
  router.beforeEach(async (to) => {
    document.title = to.meta.title ? `${to.meta.title} - ${APP_TITLE}` : APP_TITLE

    const userStore = useUserStore()
    // 默认需要登录，只有显式标记 requiresAuth: false 的页面才放行
    const requiresAuth = to.meta.requiresAuth !== false

    // 未登录
    if (!userStore.isLoggedIn) {
      return requiresAuth ? { path: '/login', query: { redirect: to.fullPath } } : true
    }

    // 已登录再访问登录页，回首页
    if (to.path === '/login') return { path: '/' }

    // 已登录但还没拿到用户信息（如刷新页面）
    if (!userStore.userInfo) {
      try {
        await userStore.fetchUserInfo()
      } catch {
        userStore.logout()
        return { path: '/login', query: { redirect: to.fullPath } }
      }
    }

    // TODO：需要权限控制时，在这里根据 userStore.userInfo.roles 和 to.meta 判断，
    //       无权限则 return { path: '/403' }
    return true
  })
}