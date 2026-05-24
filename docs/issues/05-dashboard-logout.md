# 实现最小 Dashboard 与退出登录

Labels: `type:code`, `complexity:simple`

> 初始不要添加 `ai-task`。前置 PR 合并后再放行。

## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：登录后的最小 Dashboard 和退出登录。

## 任务说明

实现 `/dashboard` 占位页，展示当前用户邮箱和退出登录按钮。点击退出后清空登录态并跳转 `/login`。

## 验收标准

- [ ] Dashboard 展示当前用户名称或邮箱。
- [ ] 点击退出登录后清空 token 和 user。
- [ ] 退出后跳转 `/login`。
- [ ] 退出后再次访问 `/dashboard` 会被路由守卫拦截。

## 测试建议

- 运行：`pnpm test`
- 手工登录后点击退出验证。

## 非目标

- 不实现真实业务工作台。
- 不实现导航菜单。
- 不实现用户资料编辑。

## 依赖

Blocked by: #<实现 Mock 登录服务与登录态存储 Issue 编号>, #<实现路由守卫与登录跳转 Issue 编号>
