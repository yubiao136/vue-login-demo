import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    setActivePinia(createPinia())
  })

  it('stores persistent login state when remember me is enabled', async () => {
    vi.useFakeTimers()
    const authStore = useAuthStore()
    const loginPromise = authStore.login({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: true,
    })
    await vi.advanceTimersByTimeAsync(300)
    await loginPromise

    expect(authStore.isAuthenticated).toBe(true)
    expect(window.localStorage.getItem('vue-login-demo:token')).toBe('mock-token-persistent')
    expect(window.sessionStorage.getItem('vue-login-demo:token')).toBeNull()
    vi.useRealTimers()
  })

  it('clears all stored state on logout', async () => {
    vi.useFakeTimers()
    const authStore = useAuthStore()
    const loginPromise = authStore.login({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: false,
    })
    await vi.advanceTimersByTimeAsync(300)
    await loginPromise

    authStore.logout()

    expect(authStore.isAuthenticated).toBe(false)
    expect(window.localStorage.getItem('vue-login-demo:token')).toBeNull()
    expect(window.sessionStorage.getItem('vue-login-demo:token')).toBeNull()
    vi.useRealTimers()
  })
})
