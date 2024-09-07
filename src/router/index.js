import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/HomeView', // 当访问 '/' 时，重定向到 '/HomeView'
  },
  {
    path: '/HomeView',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/workspace',
    name: 'workspace',
    component: () => import('../views/WorkSpace.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
