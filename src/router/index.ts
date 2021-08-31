import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home/Home.vue'),
    redirect: '/project',
    children: [
      {
        path: '/project',
        name: 'Project',
        component: () => import('@/pages/Project/Project.vue'),
        meta: {
          name: '所有项目'
        }
      },
      {
        path: '/piece',
        name: 'Piece',
        component: () => import('@/pages/Piece/Piece.vue'),
        meta: {
          name: '在线审片'
        }
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('@/pages/Schedule/Schedule.vue'),
        meta: {
          name: '日程安排'
        }
      },
      {
        path: '/team',
        name: 'Team',
        component: () => import('@/pages/Team/Team.vue'),
        meta: {
          name: '团队管理'
        }
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/pages/Setting/Setting.vue'),
        meta: {
          name: '设置'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router
