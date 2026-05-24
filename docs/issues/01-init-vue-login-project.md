# 初始化 Vue 登录页项目骨架

Labels: `type:code`, `complexity:simple`

> 初始不要添加 `ai-task`。人工确认后，本 Issue 可作为第一批放行任务。

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
