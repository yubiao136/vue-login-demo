<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import heroImage from '../assets/hero.png'
import { useAuthStore } from '../stores/auth'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const isSubmitting = ref(false)
const errorMessage = ref('')

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: true,
})

const rules: FormRules<LoginForm> = {
  email: [
    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码至少 8 位', trigger: 'blur' },
  ],
}

function validateLoginForm() {
  if (!form.email) {
    return '请输入邮箱账号'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return '请输入正确的邮箱格式'
  }
  if (!form.password) {
    return '请输入密码'
  }
  if (form.password.length < 8) {
    return '密码至少 8 位'
  }
  return ''
}

async function submitLogin() {
  if (!formRef.value) {
    return
  }

  errorMessage.value = ''
  const validationMessage = validateLoginForm()
  if (validationMessage) {
    errorMessage.value = validationMessage
    return
  }

  const isValid = await formRef.value.validate().catch(() => false)
  if (!isValid) {
    return
  }

  isSubmitting.value = true
  try {
    await authStore.login({ ...form })
    ElMessage.success('登录成功')
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    await router.push(redirect)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '登录失败，请稍后重试。'
  } finally {
    isSubmitting.value = false
  }
}

defineExpose({ submitLogin })
</script>

<template>
  <main class="login-shell">
    <section class="brand-panel" aria-label="Product introduction">
      <div class="brand-lockup">
        <span class="brand-mark">VL</span>
        <span class="brand-name">Vue Login Demo</span>
      </div>
      <div class="brand-copy">
        <p class="eyebrow">Secure workspace</p>
        <h1>登录到你的工作台</h1>
        <p>
          一个用于蜂鸟执行链路验证的 Vue 登录页 MVP，覆盖表单校验、Mock 登录、路由守卫和退出登录。
        </p>
      </div>
      <img class="hero-image" :src="heroImage" alt="Layered interface illustration" />
    </section>

    <section class="form-panel" aria-label="Login form">
      <div class="form-card">
        <div class="form-heading">
          <p class="eyebrow">Welcome back</p>
          <h2>账号登录</h2>
        </div>

        <el-alert
          v-if="errorMessage"
          class="login-error"
          :title="errorMessage"
          type="error"
          show-icon
          :closable="false"
        />

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          size="large"
          @submit.prevent="submitLogin"
        >
          <el-form-item label="邮箱账号" prop="email">
            <el-input
              v-model="form.email"
              autocomplete="username"
              placeholder="demo@example.com"
              data-testid="email-input"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              placeholder="Password123!"
              show-password
              data-testid="password-input"
            />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
          </div>

          <el-button
            class="login-button"
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
            data-testid="login-button"
          >
            登录
          </el-button>
        </el-form>

        <p class="demo-account">演示账号：demo@example.com / Password123!</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.login-shell {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 480px);
  min-height: 100vh;
  background: #f4f7fb;
}

.brand-panel {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 48px;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(12, 36, 67, 0.94), rgba(28, 91, 78, 0.9)),
    url('../assets/hero.png') center 72% / 420px auto no-repeat;
}

.brand-panel::after {
  position: absolute;
  inset: auto -20% -18% 35%;
  height: 42%;
  content: '';
  background: rgba(255, 255, 255, 0.08);
  transform: rotate(-8deg);
}

.brand-lockup,
.brand-copy,
.hero-image {
  position: relative;
  z-index: 1;
}

.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.brand-mark {
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.14);
}

.brand-name {
  font-size: 16px;
}

.brand-copy {
  max-width: 560px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #2c6b5c;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.brand-copy .eyebrow {
  color: #9de7d0;
}

.brand-copy h1,
.form-heading h2 {
  margin: 0;
  line-height: 1.08;
  letter-spacing: 0;
}

.brand-copy h1 {
  max-width: 620px;
  color: #ffffff;
  font-size: 52px;
}

.brand-copy p:last-child {
  max-width: 540px;
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 17px;
  line-height: 1.7;
}

.hero-image {
  width: min(42vw, 360px);
  align-self: flex-end;
  opacity: 0.9;
}

.form-panel {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.form-card {
  width: min(100%, 420px);
}

.form-heading {
  margin-bottom: 28px;
}

.form-heading h2 {
  color: #172033;
  font-size: 32px;
}

.login-error {
  margin-bottom: 20px;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -4px 0 22px;
}

.login-button {
  width: 100%;
  min-height: 44px;
  border-radius: 8px;
}

.demo-account {
  margin: 18px 0 0;
  color: #6f7a8d;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 860px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    min-height: 320px;
    padding: 28px;
  }

  .brand-copy h1 {
    font-size: 36px;
  }

  .hero-image {
    display: none;
  }

  .form-panel {
    min-height: auto;
    padding: 32px 20px 40px;
  }
}
</style>
