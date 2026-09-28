import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/storage'
import type { ApiResponse } from '@/api/types'

/* ============ 后端约定：换后端时只改这一块 ============ */
const SUCCESS_CODE = 200
const UNAUTHORIZED_CODE = 401
const REQUEST_TIMEOUT = 15_000
const TOKEN_HEADER = 'Authorization'
const formatToken = (token: string) => `Bearer ${token}`
/* ====================================================== */

declare module 'axios' {
  interface AxiosRequestConfig {
    /** 为 true 时请求失败不弹全局错误提示 */
    silent?: boolean
  }
}

/** 业务错误（HTTP 200 但 code 非成功） */
export class ApiError extends Error {
  code: number
  constructor(message: string, code: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
  }
}

const HTTP_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  403: '没有权限访问',
  404: '请求的资源不存在',
  500: '服务器内部错误',
  502: '网关错误',
  503: '服务暂不可用',
  504: '网关超时',
}

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
})

function showError(message: string, silent?: boolean) {
  if (!silent) ElMessage.error(message)
}

// 多个请求同时 401 时，只处理一次
let isHandlingUnauthorized = false

function handleUnauthorized(message?: string, silent?: boolean) {
  const current = router.currentRoute.value

  // 已经在登录页（如账号密码错误），只提示，不跳转
  if (current.path === '/login') {
    showError(message || '用户名或密码错误', silent)
    return
  }
  if (isHandlingUnauthorized) return
  isHandlingUnauthorized = true

  showError('登录已过期，请重新登录', silent)
  useUserStore().logout()
  router
    .replace({ path: '/login', query: { redirect: current.fullPath } })
    .finally(() => {
      isHandlingUnauthorized = false
    })
}

function getHttpErrorMessage(error: AxiosError<Partial<ApiResponse>>): string {
  const serverMsg = error.response?.data?.msg
  if (serverMsg) return serverMsg

  const status = error.response?.status
  if (status) return HTTP_MESSAGES[status] ?? `请求失败（${status}）`

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return '请求超时，请稍后重试'
  return '网络异常，请检查网络连接'
}

// 请求拦截：注入 token
service.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers[TOKEN_HEADER] = formatToken(token)
  return config
})

// 响应拦截：先处理业务层，再处理 HTTP 层
service.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse
    if (res.code === SUCCESS_CODE) return response

    const message = res.msg || '请求失败'
    if (res.code === UNAUTHORIZED_CODE) {
      handleUnauthorized(res.msg, response.config.silent)
    } else {
      showError(message, response.config.silent)
    }
    return Promise.reject(new ApiError(message, res.code))
  },
  (error: AxiosError<Partial<ApiResponse>>) => {
    // 主动取消的请求不提示
    if (axios.isCancel(error)) return Promise.reject(error)

    const silent = error.config?.silent
    if (error.response?.status === 401) {
      handleUnauthorized(error.response.data?.msg, silent)
    } else {
      showError(getHttpErrorMessage(error), silent)
    }
    return Promise.reject(error)
  },
)

/** 发请求并直接返回业务数据 T（即响应里的 data 字段） */
async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await service.request<ApiResponse<T>>(config)
  return data.data
}

const http = {
  get: <T = unknown>(url: string, params?: object, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'get', params }),

  post: <T = unknown>(url: string, data?: object, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'post', data }),

  put: <T = unknown>(url: string, data?: object, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'put', data }),

  delete: <T = unknown>(url: string, params?: object, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, method: 'delete', params }),
}

export default http