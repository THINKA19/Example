// 继承 Commitlint 官方的常规规范（Conventional Commits），包含 feat, fix, docs, style, refactor 等默认类型
export default {
  extends: ['@commitlint/config-conventional'],

  // 可选：自定义提交规范规则（0: 禁用, 1: 警告, 2: 错误）
  rules: {
    // 规定 type 的可选范围（例如限定只能用这些前缀）
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 Bug
        'docs',     // 文档变更
        'style',    // 代码格式（不影响代码运行的变动）
        'refactor', // 重构（既不是新增功能，也不是修改 bug 的代码变动）
        'perf',     // 性能优化
        'test',     // 增加测试
        'chore',    // 构建过程或辅助工具的变动
        'revert',   // 回退提交
        'ci',       // CI/CD 配置文件变动
      ],
    ],
    // 规定 subject（提交描述）不能为空
    'subject-empty': [2, 'never'],
    // 规定 type（提交类型）不能为空
    'type-empty': [2, 'never'],
  },
}