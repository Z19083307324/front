<!-- src/components/Activity/Announcement.vue -->
<template>
  <el-card class="announcement-card" shadow="hover">
    <template #header>
      <div class="announcement-header">
        <i class="el-icon-megaphone" style="margin-right: 8px;"></i>
        <span>平台公告</span>
      </div>
    </template>
    <div class="announcement-list">
      <div 
        v-for="item in announcements" 
        :key="item.id" 
        class="announcement-item"
        @click="handleAnnouncementClick(item)"
      >
        <div class="announcement-content">
          <el-tag 
            :type="item.type" 
            size="mini"
            style="margin-right: 8px;"
          >
            {{ getTagText(item.type) }}
          </el-tag>
          <span class="announcement-title">{{ item.title }}</span>
        </div>
        <span class="announcement-time">{{ item.time }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Announcement',
  props: {
    announcements: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleAnnouncementClick(item) {
      this.$emit('announcement-click', item)
    },
    getTagText(type) {
      const map = {
        'info': '通知',
        'warning': '注意',
        'success': '新活动'
      }
      return map[type] || '公告'
    }
  }
}
</script>

<style scoped>
.announcement-card {
  margin-top: 20px;
}
.announcement-header {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.announcement-list {
  max-height: 200px;
  overflow-y: auto;
}
.announcement-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.announcement-item:last-child {
  border-bottom: none;
}
.announcement-item:hover {
  background-color: #f5f7fa;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0 -8px;
  border-radius: 4px;
}
.announcement-content {
  display: flex;
  align-items: center;
}
.announcement-title {
  font-size: 14px;
  color: #303133;
}
.announcement-time {
  font-size: 12px;
  color: #909399;
}
</style>