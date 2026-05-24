import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginView from './LoginView.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => ({ query: {} }),
  useRouter: () => ({ push }),
}))

describe('LoginView', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    setActivePinia(createPinia())
    push.mockReset()
  })

  it('shows validation messages for an empty submit', async () => {
    const wrapper = mount(LoginView)

    await (wrapper.vm as unknown as { submitLogin: () => Promise<void> }).submitLogin()
    await flushPromises()
    await flushPromises()

    expect(wrapper.text()).toContain('请输入邮箱账号')
  })

  it('logs in with demo credentials and redirects to dashboard', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LoginView)

    await wrapper.find('input[placeholder="demo@example.com"]').setValue('demo@example.com')
    await wrapper.find('input[placeholder="Password123!"]').setValue('Password123!')
    await wrapper.find('form').trigger('submit')
    await vi.advanceTimersByTimeAsync(300)
    await flushPromises()

    expect(push).toHaveBeenCalledWith('/dashboard')
    expect(window.localStorage.getItem('vue-login-demo:token')).toBe('mock-token-persistent')
    vi.useRealTimers()
  })

  it('shows a clear message for invalid credentials', async () => {
    vi.useFakeTimers()
    const wrapper = mount(LoginView)

    await wrapper.find('input[placeholder="demo@example.com"]').setValue('demo@example.com')
    await wrapper.find('input[placeholder="Password123!"]').setValue('Wrong123!')
    await wrapper.find('form').trigger('submit')
    await vi.advanceTimersByTimeAsync(300)
    await flushPromises()

    expect(wrapper.text()).toContain('账号或密码错误')
    expect(push).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})
