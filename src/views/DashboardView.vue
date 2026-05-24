<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

interface QuickAction {
  title: string
  description: string
  icon: string
}

interface StatItem {
  label: string
  value: string
  trend: string
  trendUp: boolean
}

interface ActivityItem {
  action: string
  target: string
  time: string
}

const router = useRouter()
const authStore = useAuthStore()

const quickActions: QuickAction[] = [
  { title: '新建文档', description: '创建新的项目文档', icon: '📄' },
  { title: '上传文件', description: '上传资源到工作区', icon: '📁' },
  { title: '邀请成员', description: '邀请同事加入项目', icon: '👥' },
]

const stats: StatItem[] = [
  { label: '进行中项目', value: '12', trend: '+2', trendUp: true },
  { label: '待完成任务', value: '48', trend: '-8', trendUp: false },
  { label: '存储空间', value: '6.2 GB', trend: '73% 已用', trendUp: false },
]

const activities: ActivityItem[] = [
  { action: '更新了项目', target: 'Vue Login Demo', time: '2 分钟前' },
  { action: '创建了新任务', target: 'Dashboard 静态布局', time: '1 小时前' },
  { action: '上传了文件', target: '设计稿 v2.3.fig', time: '3 小时前' },
  { action: '完成了里程碑', target: 'Q2 版本发布', time: '昨天' },
  { action: '添加了评论', target: '代码审查 #42', time: '2 天前' },
]

async function logout() {
  authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <main class="dashboard-shell">
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-text">
          <h1 class="welcome-title">欢迎回来，{{ authStore.user?.name }}</h1>
          <p class="user-email" data-testid="user-email">{{ authStore.user?.email }}</p>
        </div>
        <el-button
          type="primary"
          plain
          data-testid="logout-button"
          class="logout-button"
          @click="logout"
        >
          退出登录
        </el-button>
      </header>

      <!-- Quick Actions -->
      <section class="section" aria-label="Quick actions">
        <h2 class="section-title">快捷操作</h2>
        <div class="action-grid">
          <div
            v-for="action in quickActions"
            :key="action.title"
            class="action-card"
            tabindex="0"
            role="button"
          >
            <span class="action-icon">{{ action.icon }}</span>
            <span class="action-title">{{ action.title }}</span>
            <span class="action-desc">{{ action.description }}</span>
          </div>
        </div>
      </section>

      <!-- Status Overview -->
      <section class="section" aria-label="Status overview">
        <h2 class="section-title">状态概览</h2>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.value }}</span>
            <span :class="['stat-trend', stat.trendUp ? 'trend-up' : 'trend-down']">
              {{ stat.trend }}
            </span>
          </div>
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="section" aria-label="Recent activity">
        <h2 class="section-title">最近活动</h2>
        <div class="activity-list">
          <div v-for="(item, index) in activities" :key="index" class="activity-item">
            <span class="activity-dot" />
            <div class="activity-body">
              <p class="activity-text">
                <strong>{{ item.action }}</strong> {{ item.target }}
              </p>
              <p class="activity-time">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.dashboard-shell {
  min-height: 100vh;
  padding: 32px;
  background:
    linear-gradient(135deg, rgba(244, 247, 251, 0.94), rgba(231, 241, 237, 0.92)),
    url('../assets/hero.png') center / 320px auto no-repeat;
}

.dashboard-container {
  width: min(100%, 900px);
  margin: 0 auto;
}

/* ── Header ── */

.dashboard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
}

.welcome-title {
  margin: 0;
  color: #172033;
  font-size: 34px;
  line-height: 1.15;
  letter-spacing: 0;
}

.user-email {
  margin: 8px 0 0;
  color: #637084;
  font-size: 15px;
}

.logout-button {
  flex-shrink: 0;
  min-height: 40px;
  border-radius: 8px;
}

/* ── Sections ── */

.section {
  margin-bottom: 32px;
}

.section-title {
  margin: 0 0 16px;
  color: #2c6b5c;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

/* ── Quick Actions ── */

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.action-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px;
  border: 1px solid #d9e2ee;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.06);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 28px 80px rgba(23, 32, 51, 0.12);
}

.action-card:focus-visible {
  outline: 2px solid #2c6b5c;
  outline-offset: 2px;
}

.action-icon {
  font-size: 28px;
  line-height: 1;
}

.action-title {
  color: #172033;
  font-size: 16px;
  font-weight: 600;
}

.action-desc {
  color: #6f7a8d;
  font-size: 13px;
  line-height: 1.5;
}

/* ── Stats ── */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px;
  border: 1px solid #d9e2ee;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.06);
}

.stat-label {
  color: #637084;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0;
}

.stat-value {
  color: #172033;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
}

.stat-trend {
  font-size: 13px;
  font-weight: 600;
}

.trend-up {
  color: #2c6b5c;
}

.trend-down {
  color: #b91c1c;
}

/* ── Activity ── */

.activity-list {
  padding: 0;
  border: 1px solid #d9e2ee;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(23, 32, 51, 0.06);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 24px;
}

.activity-item + .activity-item {
  border-top: 1px solid #eef2f7;
}

.activity-dot {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background: #2c6b5c;
}

.activity-body {
  flex: 1;
  min-width: 0;
}

.activity-text {
  margin: 0;
  color: #172033;
  font-size: 14px;
  line-height: 1.5;
}

.activity-text strong {
  font-weight: 600;
}

.activity-time {
  margin: 2px 0 0;
  color: #6f7a8d;
  font-size: 12px;
}

/* ── Responsive ── */

@media (max-width: 768px) {
  .dashboard-shell {
    padding: 20px;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  .welcome-title {
    font-size: 26px;
  }

  .action-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .logout-button {
    width: 100%;
  }

  .activity-item {
    padding: 14px 16px;
  }
}
</style>
