# 实现路由守卫与登录跳转

Labels: `type:code`, `complexity:simple`

> 初始不要添加 `ai-task`。前置 PR 合并后再放行。

## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：登录态驱动的路由守卫。

## 任务说明

配置 `/login`、`/dashboard` 和 `/` 路由。未登录访问 Dashboard 时跳转登录页；已登录访问登录页时跳转 Dashboard；登录成功后按 redirect 参数或默认 `/dashboard` 跳转。

## 验收标准

- [ ] `/` 重定向到 `/dashboard`。
- [ ] 未登录访问 `/dashboard` 跳转 `/login`。
- [ ] 未登录重定向时保留 redirect 参数。
- [ ] 已登录访问 `/login` 跳转 `/dashboard`。
- [ ] 登录成功后跳转 redirect 或 `/dashboard`。

## 测试建议

- 运行：`pnpm test`
- 手工验证未登录直接访问 `/dashboard`。

## 非目标

- 不做角色权限。
- 不做菜单系统。
- 不做真实后端鉴权。

## 依赖

Blocked by: #<实现 Mock 登录服务与登录态存储 Issue 编号>
