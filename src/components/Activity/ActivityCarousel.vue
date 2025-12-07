<!-- src/components/Activity/ActivityCarousel.vue -->
<template>
  <div class="activity-carousel">
    <el-carousel 
      :interval="5000" 
      height="400px" 
      indicator-position="outside"
      arrow="always"
    >
      <el-carousel-item v-for="(group, index) in activityGroups" :key="index">
        <div class="carousel-group">
          <ActivityCard
            v-for="activity in group"
            :key="activity.id"
            :activity="activity"
            class="carousel-item"
            @card-click="handleCardClick"
          />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import ActivityCard from './ActivityCard.vue'

export default {
  name: 'ActivityCarousel',
  components: {
    ActivityCard
  },
  props: {
    activities: {
      type: Array,
      default: () => []
    },
    itemsPerSlide: {
      type: Number,
      default: 3
    }
  },
  computed: {
    activityGroups() {
      const groups = []
      for (let i = 0; i < this.activities.length; i += this.itemsPerSlide) {
        groups.push(this.activities.slice(i, i + this.itemsPerSlide))
      }
      return groups
    }
  },
  methods: {
    handleCardClick(activity) {
      this.$emit('card-click', activity)
    }
  }
}
</script>

<style scoped>
.activity-carousel {
  padding: 20px 0;
}
.carousel-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  height: 100%;
}
.carousel-item {
  flex: 0 0 calc(33.333% - 20px);
  max-width: calc(33.333% - 20px);
}
::v-deep .el-carousel__container {
  height: 500px !important;
}
</style>