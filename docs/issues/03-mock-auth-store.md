# 实现 Mock 登录服务与登录态存储

Labels: `type:code`, `complexity:simple`

> 初始不要添加 `ai-task`。前置 PR 合并后再放行。

## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：Mock 登录服务和 Pinia 登录态。

## 任务说明

实现账号密码 Mock 登录。成功账号为 `demo@example.com` / `Password123!`。登录成功后保存 token 和用户信息；勾选记住我时写入 localStorage，否则写入 sessionStorage。

## 验收标准

- [ ] 正确账号返回 mock token 和用户信息。
- [ ] 错误账号抛出明确错误。
- [ ] Pinia store 能保存 token、user 和 isAuthenticated。
- [ ] 记住我写入 localStorage。
- [ ] 不记住我写入 sessionStorage。
- [ ] 退出登录清空两种存储。

## 测试建议

- 运行：`pnpm test`

## 非目标

- 不接真实后端。
- 不处理页面跳转。
- 不做刷新 token。

## 依赖

Blocked by: #<初始化 Vue 登录页项目骨架 Issue 编号>
