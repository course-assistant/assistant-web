import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';

import CourseList from '@/views/Course/CourseList.vue';
import CourseIndex from '@/views/Course/CourseIndex.vue';
import TeacherHome from '@/views/Teacher/TeacherHome.vue';
import AddCourse from '@/views/Course/AddCourse.vue';
import ClassManage from '@/views/Course/menu/ClassManage.vue';
import Period from '@/views/Course/menu/Period.vue';
import WeekMission from '@/views/Course/menu/WeekMission.vue';
import Discuss from '@/views/Course/menu/Discuss.vue';
import Statistics from '@/views/Course/menu/Statistics.vue';
import Setting from '@/views/Course/menu/Setting.vue';

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
      // 课程列表
      {
        name: 'CourseList',
        path: '',
        component: CourseList,
        meta: {
          title: '教师首页'
        }
      },
      // 添加课程页面
      // 教师个人页面
      {
        name: 'AddCourse',
        path: 'addcourse',
        component: AddCourse,
        meta: {
          title: '添加课程'
        }
      },
      // 教师个人页面
      {
        name: 'TeacherHome',
        path: 'teacher',
        component: TeacherHome,
        meta: {
          title: '教师个人空间'
        }
      },
      // 课程首页
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
            name: 'ClassManage',
            path: 'class',
            component: ClassManage,
            meta: {
              title: '课程详情 - 班级管理'
            }
          },
          // 课程学时
          {
            name: 'Period',
            path: 'period',
            component: Period,
            meta: {
              title: '课程详情 - 课程学时'
            }
          },
          // 周任务
          {
            name: 'WeekMission',
            path: 'weekMission',
            component: WeekMission,
            meta: {
              title: '课程详情 - 周任务'
            }
          },
          // 课堂讨论
          {
            name: 'Discuss',
            path: 'discuss',
            component: Discuss,
            meta: {
              title: '课程详情 - 课堂讨论'
            }
          },
          // 统计
          {
            name: 'Statistics',
            path: 'statistics',
            component: Statistics,
            meta: {
              title: '课程详情 - 统计'
            }
          },
          // 管理
          {
            name: 'Setting',
            path: 'setting',
            component: Setting,
            meta: {
              title: '课程详情 - 管理'
            }
          }
        ],
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router