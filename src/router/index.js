import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
//路由配置
//后台
const backendRoutes = [
  {
    path: '/back',
    component: BackendLayout,
    //子路由
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue')
      }
    ]
  }]

//创建路由实例
const router = createRouter({
  //路由模式
  history: createWebHistory(),
  routes: backendRoutes
})

export default router//导出路由实例
