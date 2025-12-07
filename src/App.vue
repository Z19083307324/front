<template>
  <div id="app">
    <el-container>
      <!-- <el-header style="background-color: #545c64; color: white;">
        <el-menu 
          :default-active="activeIndex" 
          mode="horizontal" 
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">用户管理</el-menu-item>
          <el-menu-item index="3">仪表盘</el-menu-item>
        </el-menu>
      </el-header> -->
      
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key) {
      console.log(key)
      if (key === '1') this.$router.push('/')
      if (key === '2') this.$router.push('/user')
      if (key === '3') this.$router.push('/dashboard')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>