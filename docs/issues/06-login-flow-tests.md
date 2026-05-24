# 补齐登录流程自动化测试

Labels: `type:code`, `complexity:simple`

> 初始不要添加 `ai-task`。前置 PR 合并后再放行。

## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：登录流程的自动化测试补齐。

## 任务说明

补齐登录页、Mock 服务、Pinia store、路由守卫和 Dashboard 的自动化测试，确保核心登录链路可在 CI 中验证。

## 验收标准

- [ ] 覆盖空表单校验。
- [ ] 覆盖登录成功。
- [ ] 覆盖登录失败。
- [ ] 覆盖未登录访问 Dashboard 跳转登录页。
- [ ] 覆盖已登录访问登录页跳转 Dashboard。
- [ ] 覆盖退出登录清理状态。
- [ ] `pnpm test` 通过。

## 测试建议

- 运行：`pnpm test`
- 运行：`pnpm lint`
- 运行：`pnpm build`

## 非目标

- 不引入端到端浏览器测试。
- 不测试真实后端。
- 不追求完整视觉回归。

## 依赖

Blocked by: #<实现登录页 UI 与表单校验 Issue 编号>, #<实现 Mock 登录服务与登录态存储 Issue 编号>, #<实现路由守卫与登录跳转 Issue 编号>, #<实现最小 Dashboard 与退出登录 Issue 编号>
