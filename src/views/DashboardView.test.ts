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

  it('shows current user and logs out', async () => {
    const wrapper = mount(DashboardView)

    expect(wrapper.text()).toContain('demo@example.com')

    await wrapper.find('[data-testid="logout-button"]').trigger('click')
    await flushPromises()

    expect(window.localStorage.getItem('vue-login-demo:token')).toBeNull()
    expect(push).toHaveBeenCalledWith('/login')
  })
})
