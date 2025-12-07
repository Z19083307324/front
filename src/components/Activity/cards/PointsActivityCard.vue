<template>
  <el-card class="activity-card points-activity" shadow="hover" @click="$emit('click')">
    <div class="points-header">
      <i class="el-icon-coin"></i>
      <span>积分兑换</span>
    </div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <div class="points-info">
        <div class="points-required">
          <span class="points-label">所需积分:</span>
          <span class="points-value">5000</span>
        </div>
        <div class="stock-info">
          <span class="stock-label">库存:</span>
          <span class="stock-value">{{ activity.participants }}/10000</span>
        </div>
      </div>
      <el-progress :percentage="activity.progress" />
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PointsActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.points-activity {
  border-top: 3px solid #2196f3;
}
.points-header {
  background: #e3f2fd;
  padding: 8px;
  text-align: center;
  color: #1976d2;
  font-weight: bold;
  margin: -20px -20px 10px -20px;
  border-radius: 4px 4px 0 0;
}
.points-header i {
  margin-right: 8px;
}
.points-info {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.points-label, .stock-label {
  font-size: 12px;
  color: #666;
}
.points-value {
  font-size: 18px;
  font-weight: bold;
  color: #ff9800;
  margin-left: 4px;
}
.stock-value {
  font-weight: bold;
  color: #4caf50;
  margin-left: 4px;
}
</style>