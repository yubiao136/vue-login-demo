export interface LoginPayload {
  email: string
  password: string
  rememberMe: boolean
}

export interface AuthUser {
  email: string
  name: string
}

export interface LoginResult {
  token: string
  user: AuthUser
}

const VALID_EMAIL = 'demo@example.com'
const VALID_PASSWORD = 'Password123!'

export async function loginWithPassword(payload: LoginPayload): Promise<LoginResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 300))

  if (payload.email === VALID_EMAIL && payload.password === VALID_PASSWORD) {
    return {
      token: payload.rememberMe ? 'mock-token-persistent' : 'mock-token-session',
      user: {
        email: payload.email,
        name: 'Demo User',
      },
    }
  }

  throw new Error('账号或密码错误，请检查后重试。')
}
