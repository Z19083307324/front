<template>
  <el-card class="activity-card newuser-activity" shadow="hover" @click="$emit('click')">
    <div class="newuser-badge">新人专享</div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <p class="activity-description">{{ activity.description }}</p>
      <div class="coupon">
        <span class="coupon-amount">￥100</span>
        <span class="coupon-text">优惠券</span>
      </div>
      <el-button type="success" size="small" class="join-button">立即领取</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'NewUserActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.newuser-activity {
  border-top: 3px solid #4caf50;
}
.newuser-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #4caf50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display:none;
}
.coupon {
  background: #fff8e1;
  border: 1px dashed #ffb300;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  margin: 10px 0;
}
.coupon-amount {
  font-size: 24px;
  font-weight: bold;
  color: #ff6f00;
  display: block;
}
.coupon-text {
  font-size: 12px;
  color: #ff6f00;
}
.join-button {
  width: 100%;
  margin-top: 10px;
}
</style>