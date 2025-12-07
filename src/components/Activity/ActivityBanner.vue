<!-- src/components/Activity/ActivityBanner.vue -->
<template>
  <div class="activity-banner">
    <el-card shadow="hover">
      <div class="banner-content" @click="handleBannerClick">
        <img :src="banner.image" :alt="banner.title" class="banner-image">
        <div class="banner-overlay">
          <h3>{{ banner.title }}</h3>
          <p class="banner-time">
            {{ formatTime(banner.startTime) }} - {{ formatTime(banner.endTime) }}
          </p>
          <el-tag :type="getStatusType(banner.status)" size="medium">
            {{ banner.status }}
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ActivityBanner',
  props: {
    banner: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    handleBannerClick() {
      this.$emit('banner-click', this.banner)
    },
    formatTime(time) {
      return new Date(time).toLocaleDateString()
    },
    getStatusType(status) {
      const types = {
        'active': 'success',
        'upcoming': 'warning',
        'ended': 'info'
      }
      return types[status] || 'info'
    }
  }
}
</script>

<style scoped>
.activity-banner {
  margin-bottom: 20px;
}
.banner-content {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}
.banner-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s;
}
.banner-content:hover .banner-image {
  transform: scale(1.02);
}
.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  padding: 20px;
}
.banner-overlay h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
}
.banner-time {
  margin: 0 0 10px 0;
  opacity: 0.9;
}
</style>