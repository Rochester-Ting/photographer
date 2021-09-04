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
        redirect: '/projectHome',
        component: () => import('@/pages/ProjectMain/ProjectMain.vue'),
        children: [
          {
            path: '/projectHome',
            name: 'ProjectHome',
            component: () => import('@/pages/Project/Project.vue'),
            meta: {
              name: '所有项目',
              key: 'Project'
            }
          },
          {
            path: '/projectDetail',
            name: 'ProjectDetail',
            component: () => import('@/pages/ProjectDetail/ProjectDetail.vue'),
            meta: {
              name: '项目详情',
              key: 'Project'
            }
          },
          {
            path: '/shootList',
            name: 'ShootList',
            component: () => import('@/pages/ShootList/ShootList.vue'),
            meta: {
              name: '分镜头列表',
              key: 'Project'
            }
          },
          {
            path: '/projectWhole',
            name: 'ProjectWhole',
            component: () => import('@/pages/ProjectWhole/ProjectWhole.vue'),
            meta: {
              name: '项目统筹',
              key: 'Project'
            }
          },
          {
            path: '/takeNoticed',
            name: 'TakeNoticed',
            component: () => import('@/pages/TakeNoticed/TakeNoticed.vue'),
            meta: {
              name: '拍摄计划 & 通告',
              key: 'Project'
            }
          },
          {
            path: '/mediaLibrary',
            name: 'MediaLibrary',
            component: () => import('@/pages/MediaLibrary/MediaLibrary.vue'),
            meta: {
              name: '媒体库',
              key: 'Project'
            }
          }
        ]
      },

      {
        path: '/piece',
        name: 'Piece',
        component: () => import('@/pages/Piece/Piece.vue'),
        meta: {
          name: '在线审片',
          key: 'Piece'
        }
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('@/pages/Schedule/Schedule.vue'),
        meta: {
          name: '日程安排',
          key: 'Schedule'
        }
      },
      {
        path: '/team',
        name: 'Team',
        component: () => import('@/pages/Team/Team.vue'),
        meta: {
          name: '团队管理',
          key: 'Team'
        }
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/pages/Setting/Setting.vue'),
        meta: {
          name: '设置',
          key: 'Setting'
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
