// src/config/guideConfig.js
// 引导配置管理器
export const guideConfig = {
    // 所有页面的引导配置
    pages: {
      // 活动首页引导
      'ActivityManage': {
        key: 'activity-home-guide',
        title: '活动首页新手引导',
        steps: [
          {
            element: '.page-header h1', // 选择器
            title: '欢迎来到活动管理平台',
            content: '这里是活动管理首页，您可以在这里查看平台的重点活动和统计数据。',
            placement: 'bottom',
            order: 1
          },
          {
            element: '.stats-row',
            title: '数据统计',
            content: '这里展示了平台活动的整体数据，包括总活动数、进行中活动等关键指标。',
            placement: 'top',
            order: 2
          },
          {
            element: '.filter-card .el-form-item:first-child',
            title: '活动筛选',
            content: '您可以通过关键词、状态、时间范围等多种方式筛选活动。',
            placement: 'top',
            order: 3
          },
          {
            element: '.activity-display',
            title: '活动展示',
            content: '这里以不同的布局展示活动卡片，支持宫格、轮播、列表三种视图。',
            placement: 'top',
            order: 4
          }
        ]
      },
      
      // 活动列表页引导
      'ActivityList': {
        key: 'activity-list-guide',
        title: '活动列表页引导',
        steps: [
          {
            element: '.filter-card',
            title: '筛选功能',
            content: '您可以使用多种条件筛选活动，筛选参数会自动保存在URL中。',
            placement: 'bottom',
            order: 1
          },
          {
            element: '.list-toolbar',
            title: '列表工具栏',
            content: '这里可以切换视图模式、调整每页显示数量。',
            placement: 'bottom',
            order: 2
          },
          {
            element: '.list-item:first-child',
            title: '活动列表项',
            content: '点击列表项可以查看活动详情，点击编辑按钮可以修改活动信息。',
            placement: 'right',
            order: 3
          },
          {
            element: '.pagination-container',
            title: '分页功能',
            content: '支持分页浏览，大数据量下也有良好的性能表现。',
            placement: 'top',
            order: 4
          }
        ]
      }
    },
    
    // 获取页面引导配置
    getPageConfig(pageName) {
      return this.pages[pageName] || null
    },
    
    // 检查是否需要显示引导
    shouldShowGuide(guideKey) {
      // 检查本地存储，如果用户已经看过引导就不再显示
      const hasSeen = localStorage.getItem(`guide_seen_${guideKey}`)
      return !hasSeen
    },
    
    // 标记引导为已读
    markGuideAsSeen(guideKey) {
      localStorage.setItem(`guide_seen_${guideKey}`, 'true')
    }
  }