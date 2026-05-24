import { describe, expect, it, vi } from 'vitest'
import { loginWithPassword } from './auth'

describe('loginWithPassword', () => {
  it('returns a mock session for the demo account', async () => {
    vi.useFakeTimers()
    const resultPromise = loginWithPassword({
      email: 'demo@example.com',
      password: 'Password123!',
      rememberMe: true,
    })
    await vi.advanceTimersByTimeAsync(300)

    await expect(resultPromise).resolves.toEqual({
      token: 'mock-token-persistent',
      user: {
        email: 'demo@example.com',
        name: 'Demo User',
      },
    })
    vi.useRealTimers()
  })

  it('rejects invalid credentials', async () => {
    vi.useFakeTimers()
    const resultPromise = loginWithPassword({
      email: 'demo@example.com',
      password: 'wrong-password',
      rememberMe: false,
    })
    const expectation = expect(resultPromise).rejects.toThrow('账号或密码错误')
    await vi.advanceTimersByTimeAsync(300)

    await expectation
    vi.useRealTimers()
  })
})
