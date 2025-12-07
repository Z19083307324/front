<!-- src/components/Guide/GuideOverlay.vue -->
<template>
  <transition name="guide-fade">
    <div v-if="visible" class="guide-overlay">
      <!-- 遮罩层 -->
      <div class="guide-mask"></div>
      
      <!-- 引导提示框 -->
      <div 
        v-if="currentStep" 
        class="guide-tooltip" 
        :style="tooltipStyle"
      >
        <!-- 步骤指示器 -->
        <div class="step-indicator">
          步骤 {{ currentIndex + 1 }} / {{ steps.length }}
        </div>
        
        <!-- 标题和内容 -->
        <div class="tooltip-content">
          <h3 v-if="currentStep.title" class="tooltip-title">
            {{ currentStep.title }}
          </h3>
          <div v-if="currentStep.content" class="tooltip-body">
            {{ currentStep.content }}
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="tooltip-actions">
          <el-button 
            v-if="currentIndex > 0" 
            size="small" 
            @click="prevStep"
          >
            上一步
          </el-button>
          
          <div class="action-right">
            <el-button 
              v-if="currentIndex < steps.length - 1" 
              type="primary" 
              size="small" 
              @click="nextStep"
            >
              下一步
            </el-button>
            <el-button 
              v-else 
              type="success" 
              size="small" 
              @click="completeGuide"
            >
              完成引导
            </el-button>
            
            <el-button 
              type="text" 
              size="small" 
              @click="skipGuide"
              class="skip-btn"
            >
              跳过
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'GuideOverlay',
  props: {
    steps: {
      type: Array,
      required: true,
      default: () => []
    },
    guideKey: {
      type: String,
      required: true
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      currentIndex: 0,
      tooltipStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }
    }
  },
  computed: {
    currentStep() {
      return this.steps[this.currentIndex]
    }
  },
  mounted() {
    if (this.autoStart) {
      setTimeout(() => {
        this.startGuide()
      }, 500)
    }
  },
  methods: {
    startGuide() {
      this.visible = true
      this.currentIndex = 0
    },
    
    nextStep() {
      if (this.currentIndex < this.steps.length - 1) {
        this.currentIndex++
      }
    },
    
    prevStep() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    
    skipGuide() {
      this.visible = false
      this.$emit('skip', this.guideKey)
    },
    
    completeGuide() {
      this.visible = false
      this.$emit('complete', this.guideKey)
    },
    
    restart() {
      this.currentIndex = 0
      this.visible = true
    }
  }
}
</script>

<style scoped>
.guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

/* 遮罩层 */
.guide-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

/* 引导提示框 */
.guide-tooltip {
  position: absolute;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  z-index: 2;
  width: 320px;
}

.step-indicator {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #409EFF;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.tooltip-content {
  margin-bottom: 15px;
}

.tooltip-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
}

.tooltip-body {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.tooltip-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.skip-btn {
  color: #909399 !important;
}

/* 过渡动画 */
.guide-fade-enter-active,
.guide-fade-leave-active {
  transition: opacity 0.3s;
}

.guide-fade-enter,
.guide-fade-leave-to {
  opacity: 0;
}
</style>