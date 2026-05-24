# Vue Login Demo

Vue Login Demo 是一个用于蜂鸟真实执行链路验证的 Vue 3 登录页面 MVP。项目覆盖账号密码登录、Element Plus 表单校验、前端 Mock 登录、Pinia 登录态、路由守卫、最小 Dashboard 和退出登录。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Element Plus
- Vue Router
- Pinia
- Vitest + Vue Test Utils
- pnpm

## 默认账号

- 邮箱：`demo@example.com`
- 密码：`Password123!`

## 本地运行

```bash
pnpm install
pnpm dev
```

访问：`http://localhost:5173/login`

## 验证命令

```bash
pnpm lint
pnpm test
pnpm build
```

## 项目文档

- [登录页面需求文档](docs/01-登录页面需求文档.md)
- [登录页面技术方案](docs/02-登录页面技术方案.md)
- [蜂鸟执行 Issue 拆解](docs/03-蜂鸟执行Issue拆解.md)

## 范围边界

第一版只做前端 Mock，不接真实后端，不实现注册、忘记密码、验证码、第三方登录、复杂权限系统、国际化和主题系统。
