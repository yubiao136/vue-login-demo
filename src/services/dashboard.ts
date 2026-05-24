export interface QuickAction {
  title: string
  description: string
  icon: string
}

export interface StatItem {
  label: string
  value: string
  trend: string
  trendUp: boolean
}

export interface ActivityItem {
  action: string
  target: string
  time: string
}

/**
 * Mock data for Dashboard homepage.
 *
 * Replace these exports with async function calls when migrating to a real API.
 */

export const mockQuickActions: QuickAction[] = [
  { title: '新建文档', description: '创建新的项目文档', icon: '📄' },
  { title: '上传文件', description: '上传资源到工作区', icon: '📁' },
  { title: '邀请成员', description: '邀请同事加入项目', icon: '👥' },
]

export const mockStats: StatItem[] = [
  { label: '进行中项目', value: '12', trend: '+2', trendUp: true },
  { label: '待完成任务', value: '48', trend: '-8', trendUp: false },
  { label: '存储空间', value: '6.2 GB', trend: '73% 已用', trendUp: false },
]

export const mockActivities: ActivityItem[] = [
  { action: '更新了项目', target: 'Vue Login Demo', time: '2 分钟前' },
  { action: '创建了新任务', target: 'Dashboard 静态布局', time: '1 小时前' },
  { action: '上传了文件', target: '设计稿 v2.3.fig', time: '3 小时前' },
  { action: '完成了里程碑', target: 'Q2 版本发布', time: '昨天' },
  { action: '添加了评论', target: '代码审查 #42', time: '2 天前' },
]
