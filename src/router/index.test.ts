import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { router } from './index'
import { useAuthStore } from '../stores/auth'

describe('router guards', () => {
  beforeEach(async () => {
    window.localStorage.clear()
    window.sessionStorage.clear()
    setActivePinia(createPinia())
    await router.push('/login')
  })

  it('redirects unauthenticated users to login', async () => {
    await router.push('/dashboard')

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/dashboard')
  })

  it('redirects authenticated users away from login', async () => {
    vi.useFakeTimers()
    const authStore = useAuthStore()
    const loginPromise = authStore.login({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: true,
    })
    await vi.advanceTimersByTimeAsync(300)
    await loginPromise

    await router.push('/dashboard')
    await router.push('/login')

    expect(router.currentRoute.value.name).toBe('dashboard')
    vi.useRealTimers()
  })

  it('blocks dashboard access after logout', async () => {
    vi.useFakeTimers()
    const authStore = useAuthStore()
    const loginPromise = authStore.login({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: true,
    })
    await vi.advanceTimersByTimeAsync(300)
    await loginPromise

    await router.push('/dashboard')
    expect(router.currentRoute.value.name).toBe('dashboard')

    authStore.logout()
    // Navigate away first so the guard re-evaluates on the next push
    await router.push('/login')
    await router.push('/dashboard')

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/dashboard')
    vi.useRealTimers()
  })
})
