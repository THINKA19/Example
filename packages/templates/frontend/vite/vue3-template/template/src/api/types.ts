/** 后端统一响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  msg: string
}

/** 分页请求参数 */
export interface PageParams {
  page: number
  pageSize: number
}

/** 分页响应数据 */
export interface PageResult<T> {
  list: T[]
  total: number
}