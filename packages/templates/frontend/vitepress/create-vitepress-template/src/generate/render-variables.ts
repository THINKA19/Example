import ejs from 'ejs'

/**
 * 统一的模板渲染入口。全项目只有这一处调用 ejs.render,
 * 方便以后要换渲染引擎时只改一个文件。
 */
export function renderTemplate(content: string, vars: Record<string, unknown>): string {
  return ejs.render(content, vars, {
    // 关闭调试信息里的文件名要求,避免渲染报错时提示路径不存在
    rmWhitespace: false,
  })
}

/** 判断文件是否需要渲染(约定:以 .ejs 结尾的文件才走渲染流程) */
export function isTemplateFile(fileName: string): boolean {
  return fileName.endsWith('.ejs')
}

/** 渲染后目标文件名要去掉 .ejs 后缀 */
export function stripTemplateExt(fileName: string): string {
  return fileName.endsWith('.ejs') ? fileName.slice(0, -4) : fileName
}
