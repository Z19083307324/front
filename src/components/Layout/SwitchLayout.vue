<!-- src/components/Layout/SwitchLayout.vue -->
<template>
  <div class="switch-layout">
    <el-tooltip content="宫格布局" placement="top">
      <el-button
        :type="layoutType === 'grid' ? 'primary' : 'default'"
        icon="el-icon-menu"
        circle
        @click="switchLayout('grid')"
      />
    </el-tooltip>
    <el-tooltip content="轮播布局" placement="top">
      <el-button
        :type="layoutType === 'carousel' ? 'primary' : 'default'"
        icon="el-icon-picture"
        circle
        @click="switchLayout('carousel')"
      />
    </el-tooltip>
    <!-- <el-tooltip content="列表布局" placement="top">
      <el-button
        :type="layoutType === 'list' ? 'primary' : 'default'"
        icon="el-icon-menu"
        circle
        @click="switchLayout('list')"
      />
    </el-tooltip> -->
    
    <div class="layout-options">
      <el-select v-model="columns" size="small" style="width: 100px;">
        <el-option label="2列" :value="2"></el-option>
        <el-option label="3列" :value="3"></el-option>
        <el-option label="4列" :value="4"></el-option>
      </el-select>
      
      <el-select v-model="sortBy" size="small" style="width: 120px; margin-left: 10px;">
        <el-option label="按时间排序" value="time"></el-option>
        <el-option label="按参与人数" value="participants"></el-option>
        <el-option label="按进度排序" value="progress"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchLayout',
  props: {
    layoutType: {
      type: String,
      default: 'grid'
    }
  },
  data() {
    return {
      columns: 3,
      sortBy: 'time'
    }
  },
  watch: {
    columns(newVal) {
      this.$emit('columns-change', newVal)
    },
    sortBy(newVal) {
      this.$emit('sort-change', newVal)
    }
  },
  methods: {
    switchLayout(type) {
      this.$emit('layout-change', type)
    }
  }
}
</script>

<style scoped>
.switch-layout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
  border-bottom: 1px solid #e4e7ed;
  margin-bottom: 20px;
}
.layout-options {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>