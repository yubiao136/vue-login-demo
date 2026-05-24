<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

async function logout() {
  authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <main class="dashboard-shell">
    <section class="dashboard-panel">
      <div>
        <p class="eyebrow">Dashboard</p>
        <h1>欢迎回来，{{ authStore.user?.name }}</h1>
        <p class="subcopy">当前登录账号：{{ authStore.user?.email }}</p>
      </div>

      <el-button type="primary" plain data-testid="logout-button" @click="logout">
        退出登录
      </el-button>
    </section>
  </main>
</template>

<style scoped>
.dashboard-shell {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background:
    linear-gradient(135deg, rgba(244, 247, 251, 0.94), rgba(231, 241, 237, 0.92)),
    url('../assets/hero.png') center / 320px auto no-repeat;
}

.dashboard-panel {
  display: flex;
  width: min(100%, 760px);
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 40px;
  border: 1px solid #d9e2ee;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.12);
}

.eyebrow {
  margin: 0 0 10px;
  color: #2c6b5c;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #172033;
  font-size: 34px;
  line-height: 1.15;
  letter-spacing: 0;
}

.subcopy {
  margin: 12px 0 0;
  color: #637084;
}

@media (max-width: 680px) {
  .dashboard-panel {
    align-items: flex-start;
    flex-direction: column;
    padding: 28px;
  }

  h1 {
    font-size: 28px;
  }
}
</style>
