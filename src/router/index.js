// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ActivityManage from '@/views/ActivityManage.vue'
import ActivityList from '@/views/ActivityList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ActivityManage',
    component: ActivityManage,
    meta: {
      title: '运营活动管理'
    }
  },
  {
    path: '/list',
    name: 'ActivityList',
    component: ActivityList,
    meta: {
      title: '活动列表'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router