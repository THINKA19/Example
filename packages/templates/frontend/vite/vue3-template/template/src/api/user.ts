import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar?: string
  roles: string[]
}

export const login = (data: LoginParams) => request.post<LoginResult>('/auth/login', data)

export const getUserInfo = () => request.get<UserInfo>('/user/info')