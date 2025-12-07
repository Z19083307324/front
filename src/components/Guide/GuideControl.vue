<!-- src/components/Guide/GuideControl.vue -->
<template>
  <div v-if="visible" class="guide-control">
    <el-popover
      placement="top-start"
      width="300"
      trigger="hover"
    >
      <div class="guide-control-content">
        <h4>新手引导</h4>
        <p>需要查看当前页面的操作引导吗？</p>
        <div class="control-actions">
          <el-button type="primary" size="mini" @click="startGuide">
            开始引导
          </el-button>
          <el-button size="mini" @click="dontShowAgain">
            不再提示
          </el-button>
        </div>
      </div>
      
      <el-button
        slot="reference"
        class="guide-control-btn"
        type="warning"
        icon="el-icon-guide"
        circle
      />
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'GuideControl',
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.checkGuide()
  },
  methods: {
    checkGuide() {
      const guideKey = `${this.pageName}-guide`
      const hasSeen = localStorage.getItem(`guide_seen_${guideKey}`)
      this.visible = !hasSeen
    },
    
    startGuide() {
      this.$emit('start-guide')
      this.visible = false
    },
    
    dontShowAgain() {
      const guideKey = `${this.pageName}-guide`
      localStorage.setItem(`guide_seen_${guideKey}`, 'true')
      this.visible = false
    }
  }
}
</script>

<style scoped>
.guide-control {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}

.guide-control-btn {
  width: 50px;
  height: 50px;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(255, 153, 0, 0.4);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.guide-control-content h4 {
  margin: 0 0 10px 0;
  color: #E6A23C;
}

.control-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>