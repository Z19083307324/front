<template>
  <el-card class="activity-card hot-activity" shadow="hover" @click="$emit('click')">
    <div class="card-header">
      <el-tag type="danger" size="mini">热门</el-tag>
      <span class="activity-status">{{ activity.status }}</span>
    </div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <p class="activity-description">{{ activity.description }}</p>
      <div class="activity-info">
        <div class="info-item">
          <i class="el-icon-time"></i>
          <span>{{ formatDate(activity.startTime) }}</span>
        </div>
        <div class="info-item">
          <i class="el-icon-user"></i>
          <span>{{ formatParticipants(activity.participants) }}</span>
        </div>
      </div>
      <div class="progress-container">
        <div class="progress-label">进度: {{ activity.progress }}%</div>
        <el-progress :percentage="activity.progress" :show-text="false" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'HotActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatParticipants(num) {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
      return num.toString()
    }
  }
}
</script>

<style scoped>
.hot-activity {
  border-top: 3px solid #ff6b6b;
}
</style>