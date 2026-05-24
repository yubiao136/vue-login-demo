import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from './DashboardView.vue'
import { useAuthStore } from '../stores/auth'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

describe('DashboardView', () => {
  beforeEach(async () => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    setActivePinia(createPinia())
    push.mockReset()

    vi.useFakeTimers()
    const authStore = useAuthStore()
    const loginPromise = authStore.login({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: true,
    })
    await vi.advanceTimersByTimeAsync(300)
    await loginPromise
    vi.useRealTimers()
  })

  it('shows current user info', () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('demo@example.com')
    expect(wrapper.text()).toContain('Demo User')
  })

  it('shows welcome title', () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('欢迎回来')
  })

  it('shows quick actions section', () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('快捷操作')
    expect(wrapper.text()).toContain('新建文档')
    expect(wrapper.text()).toContain('上传文件')
    expect(wrapper.text()).toContain('邀请成员')
  })

  it('shows status overview section', () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('状态概览')
    expect(wrapper.text()).toContain('进行中项目')
    expect(wrapper.text()).toContain('待完成任务')
    expect(wrapper.text()).toContain('存储空间')
  })

  it('shows a logout button with correct text', () => {
    const wrapper = mount(DashboardView)
    const logoutButton = wrapper.find('[data-testid="logout-button"]')

    expect(logoutButton.exists()).toBe(true)
    expect(logoutButton.text()).toBe('退出登录')
  })

  it('shows recent activity section', () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('最近活动')
    expect(wrapper.text()).toContain('Vue Login Demo')
    expect(wrapper.text()).toContain('Dashboard 静态布局')
  })

  it('logs out and redirects to login', async () => {
    const wrapper = mount(DashboardView)

    await wrapper.find('[data-testid="logout-button"]').trigger('click')
    await flushPromises()

    expect(window.localStorage.getItem('vue-login-demo:token')).toBeNull()
    expect(push).toHaveBeenCalledWith('/login')
  })
})
