import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    redirect: '/HomeView', // 当访问 '/' 时，重定向到 '/HomeView'
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView,
    meta: { title: 'scMoAnno' }
  },
  {
    path: '/ManageUser',
    name: 'ManageUser',
    component: () => import('../views/ManageUser.vue'),
    meta: { title: 'ManageUser', requiresAuth:true, requiresLogin:true }
  },
  {
    path: '/WorkSpace',
    name: 'WorkSpace',
    component: () => import('../views/WorkSpace.vue'),
    meta: { title: 'WorkSpace', requiresLogin:true }
  },
  {
    path: '/Upload',
    name: 'Upload',
    component: () => import('../views/UploadPage.vue'),
    meta: { title: 'Upload', requiresLogin:true }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { title: 'Register' }
  },
  {
    path: '/Example',
    name: 'Example',
    component: () => import('../views/Example.vue'),
    meta: { title: 'Example' }
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: 'Profile' }
  },
  {
    path: '/Feedback',
    name: 'Feedback',
    component: () => import('../views/FeedbackView.vue'),
    meta: { title: 'Feedback' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title  // 更新标题
  next();
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title  // 更新标题
  // 登录检测
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // 获取 sessionStorage 中的用户数据
    const user = JSON.parse(sessionStorage.getItem('userData')) || {}
    if (!user.userName) {
      // 如果没有用户数据，重定向到登录页面
      ElMessage.error('You are not logged in.')
      next({
        path: '/Login',
        query: { redirect: to.fullPath },
      });
    } else {
      // 如果有用户数据
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!user.isAdmin) {
          ElMessage.error('This page requires authorization.')
          next({
            path: '/HomeView',
            query: { redirect: to.fullPath },
          });
        }
      }
      // 允许访问
      next();
    }
  } else {
    // 不需要认证的路由，允许访问
    next();
  }
})

export default router

