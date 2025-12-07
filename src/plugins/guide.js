// src/plugins/guide.js
import Vue from 'vue'
import GuideOverlay from '@/components/Guide/GuideOverlay.vue'

// 创建引导管理对象
const GuideManager = {
  install(Vue) {
    // 全局注册引导组件
    Vue.component('GuideOverlay', GuideOverlay)
    
    // 添加全局方法
    Vue.prototype.$guide = {
      // 开始页面引导
      startPageGuide(pageName, config) {
        return new Promise((resolve) => {
          const guideConfig = config || this.getPageGuideConfig(pageName)
          if (!guideConfig) {
            resolve(false)
            return
          }
          
          // 创建引导容器
          let container = document.getElementById('guide-container')
          if (!container) {
            container = document.createElement('div')
            container.id = 'guide-container'
            document.body.appendChild(container)
          }
          
          // 创建Vue实例
          const GuideClass = Vue.extend({
            components: { GuideOverlay },
            data() {
              return {
                visible: true,
                guideConfig
              }
            },
            methods: {
              handleComplete(key) {
                this.visible = false
                this.$destroy()
                document.body.removeChild(this.$el)
                this.$guide.markGuideAsSeen(key)
                resolve(true)
              },
              handleSkip(key) {
                this.visible = false
                this.$destroy()
                document.body.removeChild(this.$el)
                this.$guide.markGuideAsSeen(key)
                resolve(false)
              }
            },
            template: `
              <GuideOverlay
                v-if="visible"
                :steps="guideConfig.steps"
                :guide-key="guideConfig.key"
                @complete="handleComplete"
                @skip="handleSkip"
              />
            `
          })
          
          new GuideClass().$mount(container)
        })
      },
      
      // 获取页面引导配置
      getPageGuideConfig(pageName) {
        // 这里可以从全局配置中获取
        const pageGuides = {
          'ActivityManage': {
            key: 'activity-home-guide',
            steps: [
              {
                element: '.page-header h1',
                title: '欢迎来到活动管理平台',
                content: '这里是活动管理首页，您可以在这里查看平台的重点活动和统计数据。',
                placement: 'bottom'
              },
              {
                element: '.stats-row',
                title: '数据统计',
                content: '这里展示了平台活动的整体数据，包括总活动数、进行中活动等关键指标。',
                placement: 'top'
              }
            ]
          },
          'ActivityList': {
            key: 'activity-list-guide',
            steps: [
              {
                element: '.filter-card',
                title: '筛选功能',
                content: '您可以使用多种条件筛选活动，筛选参数会自动保存在URL中。',
                placement: 'bottom'
              },
              {
                element: '.list-toolbar',
                title: '列表工具栏',
                content: '这里可以切换视图模式、调整每页显示数量。',
                placement: 'bottom'
              }
            ]
          }
        }
        
        return pageGuides[pageName]
      },
      
      // 标记引导为已读
      markGuideAsSeen(guideKey) {
        localStorage.setItem(`guide_seen_${guideKey}`, 'true')
      },
      
      // 检查是否显示过引导
      hasSeenGuide(guideKey) {
        return localStorage.getItem(`guide_seen_${guideKey}`) === 'true'
      },
      
      // 重置引导状态
      resetGuide(guideKey) {
        localStorage.removeItem(`guide_seen_${guideKey}`)
      },
      
      // 显示引导帮助按钮
      showHelpButton(pageName) {
        const guideConfig = this.getPageGuideConfig(pageName)
        if (!guideConfig || this.hasSeenGuide(guideConfig.key)) {
          return null
        }
        
        // 创建帮助按钮
        const button = document.createElement('button')
        button.className = 'guide-help-button'
        button.innerHTML = '<i class="el-icon-question"></i> 新手引导'
        button.style.cssText = `
          position: fixed;
          bottom: 80px;
          right: 20px;
          z-index: 1000;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        `
        
        button.onmouseenter = () => {
          button.style.transform = 'translateY(-2px)'
          button.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)'
        }
        
        button.onmouseleave = () => {
          button.style.transform = 'translateY(0)'
          button.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)'
        }
        
        button.onclick = () => {
          this.startPageGuide(pageName)
          button.remove()
        }
        
        document.body.appendChild(button)
        return button
      }
    }
  }
}

// 使用插件
Vue.use(GuideManager)

export default GuideManager