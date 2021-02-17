import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '教师登录'
    }
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: '教师首页'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router