import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo, login as loginApi, type LoginParams, type UserInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() ?? '')
  const userInfo = ref<UserInfo | null>(null)

  const isLoggedIn = computed(() => !!token.value)

  async function login(params: LoginParams) {
    const res = await loginApi(params)
    token.value = res.token
    setToken(res.token)
  }

  async function fetchUserInfo() {
    userInfo.value = await getUserInfo()
    return userInfo.value
  }

  /** 清除登录态（退出登录 / 登录失效共用） */
  function logout() {
    token.value = ''
    userInfo.value = null
    removeToken()
  }

  return { token, userInfo, isLoggedIn, login, fetchUserInfo, logout }
})