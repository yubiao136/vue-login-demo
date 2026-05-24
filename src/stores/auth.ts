import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { loginWithPassword, type AuthUser, type LoginPayload } from '../services/auth'

const TOKEN_KEY = 'vue-login-demo:token'
const USER_KEY = 'vue-login-demo:user'

function readStoredUser(): AuthUser | null {
  const raw = window.localStorage.getItem(USER_KEY) ?? window.sessionStorage.getItem(USER_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(
    window.localStorage.getItem(TOKEN_KEY) ?? window.sessionStorage.getItem(TOKEN_KEY) ?? '',
  )
  const user = ref<AuthUser | null>(readStoredUser())
  const isAuthenticated = computed(() => Boolean(token.value && user.value))

  function persistSession(nextToken: string, nextUser: AuthUser, rememberMe: boolean) {
    const targetStorage = rememberMe ? window.localStorage : window.sessionStorage
    const otherStorage = rememberMe ? window.sessionStorage : window.localStorage

    otherStorage.removeItem(TOKEN_KEY)
    otherStorage.removeItem(USER_KEY)
    targetStorage.setItem(TOKEN_KEY, nextToken)
    targetStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }

  async function login(payload: LoginPayload) {
    const result = await loginWithPassword(payload)
    token.value = result.token
    user.value = result.user
    persistSession(result.token, result.user, payload.rememberMe)
  }

  function logout() {
    token.value = ''
    user.value = null
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.removeItem(USER_KEY)
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
})
