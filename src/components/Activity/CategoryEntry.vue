<!-- src/components/Activity/CategoryEntry.vue -->
<template>
  <el-card class="category-card" shadow="hover">
    <div class="category-content" @click="handleCategoryClick">
      <div class="category-icon">
        <i :class="category.icon" style="font-size: 24px;"></i>
      </div>
      <div class="category-info">
        <h4>{{ category.name }}</h4>
        <p class="category-count">{{ category.count }}个活动</p>
      </div>
      <i class="el-icon-arrow-right arrow-icon"></i>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CategoryEntry',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleCategoryClick() {
      this.$emit('category-click', this.category)
    }
  }
}
</script>

<style scoped>
.category-card {
  margin-bottom: 15px;
  cursor: pointer;
}
.category-content {
  display: flex;
  align-items: center;
  padding: 15px;
}
.category-icon {
  width: 50px;
  height: 50px;
  background: #f0f9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: #409EFF;
}
.category-info {
  flex: 1;
}
.category-info h4 {
  margin: 0 0 5px 0;
  font-size: 16px;
}
.category-count {
  margin: 0;
  color: #909399;
  font-size: 14px;
}
.arrow-icon {
  color: #c0c4cc;
  font-size: 18px;
}
.category-card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s;
}
</style>