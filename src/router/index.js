import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';
import CourseList from '@/components/CourseList.vue';
import CourseIndex from '@/components/CourseIndex.vue';


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
    component: Index,
    meta: {
      title: '教师首页'
    },
    children: [
      // 教师列表
      {
        name: 'CourseList',
        path: '',
        component: CourseList,
        meta: {
          title: '教师首页'
        }
      },
      // 教师列表
      {
        name: 'CourseIndex',
        path: 'course',
        component: CourseIndex,
        meta: {
          title: '课程详情'
        }
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router