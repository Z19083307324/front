// src/api/activity.js
import { mockActivities } from '@/utils/mockData'

export default {
  // 获取活动列表
  getActivityList() {
    return mockActivities.getActivityList()
  },
  getActivityListWithPagination(params = {}) {
    return mockActivities.getActivityListWithPagination(params)
  },
  // 获取活动详情
  getActivityDetail(id) {
    return mockActivities.getActivityDetail(id)
  },
  
  // 更新活动状态
  updateActivityStatus(id, status) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: "状态更新成功"
        })
      }, 300)
    })
  },
  updateActivity(id, data) {
    return mockActivities.updateActivity(id, data)
  }
}