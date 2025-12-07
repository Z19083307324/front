<!-- src/components/Activity/ActivityGrid.vue -->
<template>
  <div class="activity-grid">
    <div class="grid-container" :class="`grid-${columns}`">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @card-click="handleCardClick"
      />
    </div>
  </div>
</template>

<script>
import ActivityCard from './ActivityCard.vue'

export default {
  name: 'ActivityGrid',
  components: {
    ActivityCard
  },
  props: {
    activities: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 3,
      validator: value => [2, 3, 4].includes(value)
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
.activity-grid {
  padding: 20px 0;
}
.grid-container {
  display: grid;
  gap: 20px;
}
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1200px) {
  .grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 992px) {
  .grid-3, .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>