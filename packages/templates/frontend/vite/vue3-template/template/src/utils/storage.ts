const PREFIX = 'app:'
const TOKEN_KEY = 'token'

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? null : (JSON.parse(raw) as T)
  } catch {
    return null
  }
}

export function setItem(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // 存储已满或被禁用时静默失败
  }
}

export function removeItem(key: string) {
  localStorage.removeItem(PREFIX + key)
}

export const getToken = () => getItem<string>(TOKEN_KEY)
export const setToken = (token: string) => setItem(TOKEN_KEY, token)
export const removeToken = () => removeItem(TOKEN_KEY)