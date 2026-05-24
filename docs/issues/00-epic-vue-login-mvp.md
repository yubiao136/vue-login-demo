# [Epic] Vue 登录页面 MVP

Labels: `epic`

> 不要添加 `ai-task`。

## 背景

新建 Vue 登录页面 MVP，用于验证蜂鸟从 GitHub Issue 到 Claude Code 执行、PR 交付的真实链路。

## 文档

- 需求文档：`docs/01-登录页面需求文档.md`
- 技术方案：`docs/02-登录页面技术方案.md`
- Issue 拆解：`docs/03-蜂鸟执行Issue拆解.md`

## 子 Issue

- [ ] 初始化 Vue 登录页项目骨架
- [ ] 实现登录页 UI 与表单校验
- [ ] 实现 Mock 登录服务与登录态存储
- [ ] 实现路由守卫与登录跳转
- [ ] 实现最小 Dashboard 与退出登录
- [ ] 补齐登录流程自动化测试

## 整体验收

- [ ] 用户可访问 `/login` 完成账号密码登录。
- [ ] 登录成功后进入 `/dashboard`。
- [ ] 未登录访问 `/dashboard` 自动回到 `/login`。
- [ ] 退出登录后清空登录态。
- [ ] CI 中 lint、test、build 全部通过。
