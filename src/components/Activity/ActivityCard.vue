<!-- src/components/Activity/ActivityCard.vue -->
<template>
  <component :is="cardComponent" :activity="activity" @click="handleCardClick" />
</template>

<script>
import HotActivityCard from './cards/HotActivityCard.vue'
import LimitedActivityCard from './cards/LimitedActivityCard.vue'
import NewUserActivityCard from './cards/NewUserActivityCard.vue'
import PointsActivityCard from './cards/PointsActivityCard.vue'
import VipActivityCard from './cards/VipActivityCard.vue'
import FestivalActivityCard from './cards/FestivalActivityCard.vue'

export default {
  name: 'ActivityCard',
  components: {
    HotActivityCard,
    LimitedActivityCard,
    NewUserActivityCard,
    PointsActivityCard,
    VipActivityCard,
    FestivalActivityCard
  },
  props: {
    activity: {
      type: Object,
      required: true
    }
  },
  computed: {
    cardComponent() {
      const componentMap = {
        'hot': 'HotActivityCard',
        'limited': 'LimitedActivityCard',
        'new_user': 'NewUserActivityCard',
        'points': 'PointsActivityCard',
        'vip': 'VipActivityCard',
        'festival': 'FestivalActivityCard'
      }
      return componentMap[this.activity.type] || 'HotActivityCard'
    }
  },
  methods: {
    handleCardClick() {
      this.$emit('card-click', this.activity)
    }
  }
}
</script>