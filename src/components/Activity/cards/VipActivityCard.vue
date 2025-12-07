<template>
  <el-card class="activity-card vip-activity" shadow="hover" @click="$emit('click')">
    <div class="vip-badge">
      <i class="el-icon-crown"></i>
      <span>会员专属</span>
    </div>
    <el-image
      :src="activity.image"
      class="card-image"
      fit="cover"
    ></el-image>
    <div class="card-content">
      <h4 class="activity-title">{{ activity.title }}</h4>
      <ul class="privilege-list">
        <li><i class="el-icon-check"></i> 专属折扣</li>
        <li><i class="el-icon-check"></i> 双倍积分</li>
        <li><i class="el-icon-check"></i> 优先购买</li>
        <li><i class="el-icon-check"></i> 专属客服</li>
      </ul>
      <div class="vip-level">
        <span>适用等级: </span>
    <el-tag size="mini">VIP1</el-tag>
        <el-tag size="mini" type="warning">VIP2</el-tag>
        <el-tag size="mini" type="success">VIP3</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'VipActivityCard',
  props: {
    activity: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.vip-activity {
  border-top: 3px solid #9c27b0;
  position: relative;
}
.vip-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #9c27b0, #673ab7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  z-index: 1;
}
.vip-badge i {
  margin-right: 4px;
}
.privilege-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}
.privilege-list li {
  padding: 4px 0;
  color: #666;
}
.privilege-list i {
  color: #4caf50;
  margin-right: 8px;
}
.vip-level {
  margin-top: 10px;
}
.vip-level span {
  font-size: 12px;
  color: #999;
  margin-right: 8px;
}
.vip-level .el-tag {
  margin-right: 4px;
}
</style>