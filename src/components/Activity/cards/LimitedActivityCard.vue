<template>
  <el-card class="activity-card limited-activity" shadow="hover" @click="$emit('click')">
    <div class="card-header">
      <el-tag type="warning" size="mini">限时</el-tag>
      <span class="activity-status">{{ activity.status }}</span>
    </div>
    <div class="time-badge">
      <i class="el-icon-alarm-clock"></i>
      <span>倒计时 {{ getRemainingDays() }}天</span>
    </div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <div class="tags">
        <el-tag v-for="tag in activity.tags" :key="tag" size="mini">{{ tag }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'LimitedActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  methods: {
    getRemainingDays() {
      const end = new Date(this.activity.endTime)
      const now = new Date()
      const diff = end - now
      return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style scoped>
.limited-activity {
  border-top: 3px solid #ffa726;
}
.time-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 167, 38, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  display:none;
}
.time-badge i {
  margin-right: 4px;
}
</style>