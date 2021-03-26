import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login';
import Index from '@/views/Index';

import CourseList from '@/views/Course/CourseList.vue';
import CourseIndex from '@/views/Course/CourseIndex.vue';
import TeacherHome from '@/views/Teacher/TeacherHome.vue';
import AddCourse from '@/views/Course/AddCourse.vue';
import StudentManage from '@/views/Course/StudentManage.vue';
import PeriodDetail from '@/views/Course/PeriodDetail.vue';
import TestDetail from '@/views/Course/TestDetail.vue';

import ClassManage from '@/views/Course/menu/ClassManage.vue';
import Period from '@/views/Course/menu/Period.vue';
import PeriodTest from '@/views/Course/menu/PeriodTest.vue';
import Discuss from '@/views/Course/menu/Discuss.vue';
import Statistics from '@/views/Course/menu/Statistics.vue';
import Setting from '@/views/Course/menu/Setting.vue';
import WeekMission from '@/views/Course/menu/WeekMission.vue';
import WeekMissionList from '@/views/Course/menu/WeekMissionList.vue';
import WeekLessonMission from '@/views/Course/menu/WeekLessonMission.vue';
import WeekMissionDetail from '@/views/Course/menu/WeekMissionDetail.vue';


const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

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
      // 班级学生管理页面
      {
        name: 'StudentManage',
        path: 'student',
        component: StudentManage,
        meta: {
          title: '学生管理'
        }
      },
      // 班级学生管理页面
      {
        name: 'PeriodDetail',
        path: 'period-detail',
        component: PeriodDetail,
        meta: {
          title: '学时详情'
        }
      },
      // 随堂测试编辑页面
      {
        name: 'TestDetail',
        path: 'test-detail',
        component: TestDetail,
        meta: {
          title: '测试详情'
        }
      },
      // 课程首页
      {
        name: 'CourseIndex',
        // path: 'course',
        path: 'course/:course_id',
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
          // 周任务 周列表
          {
            name: 'WeekMission',
            path: 'week-mission',
            component: WeekMission,
          },
          // 周任务 周的任务列表
          {
            name: 'WeekMissionList',
            path: 'week-mission/week-mission-list/:week_id',
            component: WeekMissionList,
          },

          // 周任务 周的任务列表
          {
            name: 'WeekMissionDetail',
            path: 'week-mission/week-mission-list/:week_id/week-mission-detail/:week_mission_id',
            component: WeekMissionDetail,
          },


          // 随堂测试
          {
            name: 'PeriodTest',
            path: 'period-test',
            component: PeriodTest,
            meta: {
              title: '课程详情 - 随堂测试'
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router