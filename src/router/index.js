import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';
import CourseList from '@/components/CourseList.vue';
import CourseIndex from '@/components/CourseIndex.vue';

import ClassManagement from '@/components/Course/ClassManagement.vue';
import Period from '@/components/Course/Period.vue';

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
        },
        children: [
          // 班级管理
          {
            name: 'ClassManagement',
            path: 'class',
            component: ClassManagement,
            meta: {
              title: '课程详情 - 班级管理'
            }
          }, {
            name: 'Period',
            path: 'period',
            component: Period,
            meta: {
              title: '课程详情 - 课程学时'
            }
          }
        ],
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