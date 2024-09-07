import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/HomeView', // 当访问 '/' 时，重定向到 '/HomeView'
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView,
    meta: { title: 'HomeView' }
  },
  {
    path: '/ManageUser',
    name: 'ManageUser',
    component: () => import('../views/ManageUser.vue'),
    meta: { title: 'ManageUser' }
  },
  {
    path: '/WorkSpace',
    name: 'WorkSpace',
    component: () => import('../views/WorkSpace.vue'),
    meta: { title: 'WorkSpace' }
  },
  {
    path: '/Upload',
    name: 'Upload',
    component: () => import('../views/UploadPage.vue'),
    meta: { title: 'Upload' }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title  // 更新标题
  next();
})

export default router
