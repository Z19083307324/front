<template>
  <el-card class="activity-card festival-activity" shadow="hover" @click="$emit('click')">
    <div class="festival-theme">
      <i class="el-icon-moon-night"></i>
      <span>节日特惠</span>
    </div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <p class="activity-date">
        {{ formatDate(activity.startTime) }} - {{ formatDate(activity.endTime) }}
      </p>
      <div class="discount-tag">
        <span class="discount-text">最高</span>
        <span class="discount-value">5折</span>
      </div>
      <div class="festival-tags">
        <el-tag v-for="tag in activity.tags" :key="tag" size="mini" type="info">{{ tag }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'FestivalActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.festival-activity {
  border-top: 3px solid #ff9800;
  position: relative;
}
.festival-theme {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 152, 0, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  z-index: 1;
}
.festival-theme i {
  margin-right: 4px;
}
.activity-date {
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}
.discount-tag {
  background: linear-gradient(45deg, #ff9800, #ff5722);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  margin: 10px 0;
}
.discount-text {
  font-size: 12px;
  margin-right: 4px;
}
.discount-value {
  font-size: 24px;
  font-weight: bold;
}
.festival-tags {
  margin-top: 10px;
}
.festival-tags .el-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>