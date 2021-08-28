import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router
