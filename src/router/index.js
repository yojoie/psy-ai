import { createRouter, createWebHistory, matchedRouteKey } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'

//路由配置

//后台
const backendRoutes = [
  //后台功能
  {
    path: '/back',
    redirect: '/back/dashboard',
    component: BackendLayout,
    //子路由
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        //元数据
        meta: {
          title: '数据分析',
          icon: 'PieChart'
        }
      },
      {
        path: 'knowledge',
        component: () => import('@/views/knowledge.vue'),
        meta: {
          title: '知识文章',
          icon: 'ChatLineSquare'
        }
      },
      {
        path: 'consultations',
        component: () => import('@/views/consultations.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message'
        }
      },
      {
        path: 'emotional',
        component: () => import('@/views/emotional.vue'),
        meta: {
          title: '情绪日志',
          icon: 'User'
        }
      }]
  },
  //用户健全
  {
    //父级路由
    path: '/auth',
    component: AuthLayout,
    //子路由
    children: [
      {
        path: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
          title: '登录'
        }
      }
      ,
      {
        path: 'register',
        component: () => import('@/views/register.vue'),

        meta: {
          title: '注册'
        }
      }
    ]

  }



]


//创建路由实例
const router = createRouter({
  //路由模式
  history: createWebHistory(),
  routes: backendRoutes
})

//路由前置守卫
router.beforeEach((to, from, next) => {
  //检查是否登录
  const token = localStorage.getItem('token')
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    //后台用户
    if (userInfo.userType == 2) {
      if (to.path.startsWith('/back')) {
        next()
      }
      else {
        next('/back/dashboard')
      }
    }
    //前台用户
    else if (userInfo.userType == 1) {

    }


  } else {
    //未登录
    //如果是跳转后台，返回登录页面
    if (to.path.startsWith('/back')) {
      next('/auth/login')
    } else {
      //重定向到登录页
      next()
    }

  }
})


//导出路由实例
export default router
