# 蜂鸟执行 Issue 拆解

本文是 Codex / Trae Solo 生成的 Issue 草案。初始创建 GitHub Issue 时不要给子 Issue 加 `ai-task`；人工确认后，按依赖顺序分批放行。

## 父级 Epic

标题：`[Epic] Vue 登录页面 MVP`

标签：

- `epic`

说明：

- 不加 `ai-task`。
- 用于追踪整体需求、文档链接、子 Issue 清单和验收状态。

正文：

```markdown
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
```

## 子 Issue 1：初始化 Vue 登录页项目骨架

标签：

- `type:code`
- `complexity:simple`

依赖：None - can start immediately

```markdown
## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：初始化 Vue 登录页面项目骨架。

## 任务说明

创建 Vue 3 + Vite + TypeScript 项目，接入 Element Plus、Vue Router、Pinia、Vitest，并配置 GitHub Actions 执行 lint、test、build。

## 验收标准

- [ ] 项目使用 pnpm 管理依赖。
- [ ] `pnpm dev` 可以启动本地开发服务。
- [ ] `pnpm lint` 可以通过类型检查。
- [ ] `pnpm test` 可以运行测试。
- [ ] `pnpm build` 可以完成生产构建。
- [ ] GitHub Actions 包含 install、lint、test、build。

## 测试建议

- 运行：`pnpm install`
- 运行：`pnpm lint`
- 运行：`pnpm test`
- 运行：`pnpm build`

## 非目标

- 不实现完整登录业务。
- 不接真实后端。
- 不做复杂页面样式。

## 依赖

None - can start immediately
```

## 子 Issue 2：实现登录页 UI 与表单校验

标签：

- `type:code`
- `complexity:simple`

依赖：初始化 Vue 登录页项目骨架

```markdown
## 背景

来自父级需求：#<Epic 编号>

本 Issue 只实现：登录页 UI 和表单校验。

## 任务说明

实现 `/login` 页面，包含邮箱账号、密码、记住我和登录按钮。使用 Element Plus 表单校验邮箱必填、邮箱格式、密码必填和密码最小 8 位。

## 验收标准

- [ ] `/login` 页面展示邮箱、密码、记住我、登录按钮。
- [ ] 空表单提交时显示必填校验。
- [ ] 非邮箱格式提交时显示邮箱格式错误。
- [ ] 密码少于 8 位时显示长度错误。
- [ ] 登录按钮在提交期间支持 loading 状态。

## 测试建议

- 运行：`pnpm test`
- 手工访问 `/login` 验证表单行为。

## 非目标

- 不实现真实登录。
- 不处理路由守卫。
- 不实现 Dashboard。

## 依赖

Blocked by: #<初始化 Vue 登录页项目骨架 Issue 编号>
```

## 子 Issue 3：实现 Mock 登录服务与登录态存储

标签：

- `type:code`
- `complexity:simple`

依赖：初始化 Vue 登录页项目骨架

```markdown
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
```

## 子 Issue 4：实现路由守卫与登录跳转

标签：

- `type:code`
- `complexity:simple`

依赖：实现 Mock 登录服务与登录态存储

```markdown
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
```

## 子 Issue 5：实现最小 Dashboard 与退出登录

标签：

- `type:code`
- `complexity:simple`

依赖：实现登录态存储、实现路由守卫

```markdown
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
```

## 子 Issue 6：补齐登录流程自动化测试

标签：

- `type:code`
- `complexity:simple`

依赖：登录页、Mock 服务、路由守卫、Dashboard

```markdown
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
```
