<!-- src/views/ActivityManage.vue -->
<template>
  <div class="activity-manage">
    <!-- 页面标题和操作栏 -->
    <div class="page-header">
      <h1>运营活动管理</h1>
      <div class="page-actions">
        <!-- <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
          创建活动
        </el-button> -->
        <el-button icon="el-icon-refresh" @click="handleRefreshData">
          刷新
        </el-button>
        <!-- 手动触发引导按钮 -->
        <el-button 
          v-if="showHelpButton" 
          type="warning" 
          icon="el-icon-guide" 
          @click="startGuide"
        >
          新手引导
        </el-button>
      </div>
    </div>
    
    <!-- 数据统计 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-icon" style="background: #e6f7ff;">
              <i class="el-icon-star-on" style="color: #1890ff;"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.totalActivities }}</div>
              <div class="stat-label">总活动数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-icon" style="background: #f6ffed;">
              <i class="el-icon-time" style="color: #52c41a;"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.activeActivities }}</div>
              <div class="stat-label">进行中</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-icon" style="background: #fff7e6;">
              <i class="el-icon-warning-outline" style="color: #fa8c16;"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.upcomingActivities }}</div>
              <div class="stat-label">即将开始</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-icon" style="background: #f9f0ff;">
              <i class="el-icon-user-solid" style="color: #722ed1;"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ formatParticipants(stats.totalParticipants) }}</div>
              <div class="stat-label">总参与人数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- Banner区域 -->
    <ActivityBanner 
      v-if="pageData.banner" 
      :banner="pageData.banner"
      @banner-click="handleBannerClick"
    />
    
    <el-row :gutter="20">
      <!-- 左侧：分类和公告 -->
      <el-col :span="6">
        <!-- 分类入口 -->
        <el-card shadow="hover" class="category-section">
          <template #header>
            <div class="section-header">
              <i class="el-icon-s-operation" style="margin-right: 8px;"></i>
              <span>活动分类</span>
            </div>
          </template>
          <CategoryEntry
            v-for="category in pageData.categories"
            :key="category.id"
            :category="category"
            @category-click="handleCategoryClick"
          />
        </el-card>
        
        <!-- 公告区域 -->
        <Announcement
          :announcements="pageData.announcements"
          @announcement-click="handleAnnouncementClick"
        />
      </el-col>
      
      <!-- 右侧：活动列表 -->
      <el-col :span="18">
        <!-- 布局切换和筛选 -->
        <SwitchLayout
          :layout-type="layoutType"
          @layout-change="handleLayoutChange"
          @columns-change="handleColumnsChange"
          @sort-change="handleSortChange"
        />
        
        <!-- 活动展示区域 -->
        <div class="activity-display">
          <!-- 宫格布局 -->
          <ActivityGrid
            v-if="layoutType === 'grid'"
            :activities="sortedActivities"
            :columns="columns"
            @card-click="handleActivityClick"
          />
          
          <!-- 轮播布局 -->
          <ActivityCarousel
            v-else-if="layoutType === 'carousel'"
            :activities="sortedActivities"
            @card-click="handleActivityClick"
          />
          
          <!-- 列表布局 -->
          <el-table
            v-else-if="layoutType === 'list'"
            :data="sortedActivities"
            style="width: 100%"
          >
            <el-table-column prop="title" label="活动名称" width="200">
              <template slot-scope="{ row }">
                <div class="activity-title">
                  <el-image
                    :src="row.image"
                    style="width: 40px; height: 40px; border-radius: 4px; margin-right: 10px;"
                  ></el-image>
                  <span>{{ row.title }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="活动类型" width="120">
              <template slot-scope="{ row }">
                <el-tag :type="getTypeTag(row.type)">
                  {{ getTypeName(row.type) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template slot-scope="{ row }">
                <el-tag :type="getStatusType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="participants" label="参与人数" width="120">
              <template slot-scope="{ row }">
                {{ formatParticipants(row.participants) }}
              </template>
            </el-table-column>
            <el-table-column prop="progress" label="进度" width="150">
              <template slot-scope="{ row }">
                <el-progress 
                  :percentage="row.progress" 
                  :status="getProgressStatus(row.progress)"
                />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="{ row }">
                <el-button type="text" @click="handleViewDetail(row)">详情</el-button>
                <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    
    <!-- "查看全部"链接卡片 -->
    <el-card class="view-all-card" shadow="hover">
      <div class="view-all-content">
        <div class="view-all-info">
          <h3><i class="el-icon-s-order"></i> 查看更多活动</h3>
          <p>查看所有活动详情、参与数据和管理功能</p>
        </div>
        <div class="view-all-actions">
          <el-button type="primary" @click="goToList">
            <i class="el-icon-right"></i> 前往活动列表
          </el-button>
        </div>
      </div>
    </el-card>
    
    <!-- 活动详情对话框 -->
    <el-dialog
      :title="selectedActivity ? selectedActivity.title : ''"
      :visible.sync="detailDialogVisible"
      width="60%"
    >
      <ActivityDetail :activity="selectedActivity" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleJoinActivity(selectedActivity)">立即参与</el-button>
      </span>
    </el-dialog>
    
    <!-- 引导组件 -->
    <GuideOverlay
      v-if="showGuide"
      :steps="guideSteps"
      guide-key="activity-home-guide"
      @complete="handleGuideComplete"
      @skip="handleGuideSkip"
    />
  </div>
</template>

<script>
import ActivityAPI from '@/api/activity'
import ActivityBanner from '@/components/Activity/ActivityBanner.vue'
import CategoryEntry from '@/components/Activity/CategoryEntry.vue'
import Announcement from '@/components/Activity/Announcement.vue'
import ActivityGrid from '@/components/Activity/ActivityGrid.vue'
import ActivityCarousel from '@/components/Activity/ActivityCarousel.vue'
import SwitchLayout from '@/components/Layout/SwitchLayout.vue'
import ActivityDetail from '@/components/Activity/ActivityDetail.vue'
import GuideOverlay from '@/components/Guide/GuideOverlay.vue'

export default {
  name: 'ActivityManage',
  components: {
    ActivityBanner,
    CategoryEntry,
    Announcement,
    ActivityGrid,
    ActivityCarousel,
    SwitchLayout,
    ActivityDetail,
    GuideOverlay
  },
  data() {
    return {
      pageData: {
        banner: null,
        categories: [],
        announcements: [],
        activities: []
      },
      layoutType: 'grid',
      columns: 3,
      sortBy: 'time',
      selectedActivity: null,
      detailDialogVisible: false,
      stats: {
        totalActivities: 0,
        activeActivities: 0,
        upcomingActivities: 0,
        totalParticipants: 0
      },
      // 引导相关数据
      showGuide: false,
      showHelpButton: true, // 默认显示帮助按钮
      guideSteps: [
        {
          title: '欢迎来到活动管理平台',
          content: '这里是活动管理首页，您可以在这里查看平台的重点活动和统计数据。',
          order: 1
        },
        {
          title: '数据统计区域',
          content: '这里展示了平台活动的整体数据，包括总活动数、进行中活动、即将开始活动等关键指标。',
          order: 2
        },
        {
          title: 'Banner展示区',
          content: '这里是平台的重点活动推广区域，点击Banner可以查看活动详情。',
          order: 3
        },
        {
          title: '活动分类和公告',
          content: '左侧是活动分类入口和平台公告，方便您快速找到感兴趣的活动类型。',
          order: 4
        },
        {
          title: '活动展示区域',
          content: '这里以不同的布局展示活动卡片，支持宫格、轮播、列表三种视图模式。',
          order: 5
        },
        {
          title: '查看更多功能',
          content: '点击"前往活动列表"可以查看所有活动，支持筛选、搜索和分页功能。',
          order: 6
        }
      ]
    }
  },
  computed: {
    sortedActivities() {
      const activities = [...this.pageData.activities]
      switch (this.sortBy) {
        case 'time':
          return activities.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
        case 'participants':
          return activities.sort((a, b) => b.participants - a.participants)
        case 'progress':
          return activities.sort((a, b) => b.progress - a.progress)
        default:
          return activities
      }
    }
  },
  created() {
    this.fetchData()
    // 页面加载后自动显示引导
    setTimeout(() => {
      this.checkGuide()
    }, 1000)
  },
  methods: {
    // 加载数据
    async fetchData() {
      try {
        const res = await ActivityAPI.getActivityList()
        if (res.code === 200) {
          this.pageData = res.data
          this.calculateStats()
        }
      } catch (error) {
        this.$message.error('数据加载失败')
      }
    },
    
    // 计算统计信息
    calculateStats() {
      const activities = this.pageData.activities
      this.stats.totalActivities = activities.length
      this.stats.activeActivities = activities.filter(a => a.status === '进行中' || a.status === 'active').length
      this.stats.upcomingActivities = activities.filter(a => a.status === '即将开始' || a.status === 'upcoming').length
      this.stats.totalParticipants = activities.reduce((sum, a) => sum + a.participants, 0)
    },
    
    // 刷新数据
    handleRefreshData() {
      this.fetchData()
      this.$message.success('数据已刷新')
    },
    
    // 格式化参与人数
    formatParticipants(num) {
      if (!num && num !== 0) return '0'
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
      return num.toString()
    },
    
    // 布局切换
    handleLayoutChange(type) {
      this.layoutType = type
    },
    
    // 列数变化
    handleColumnsChange(columns) {
      this.columns = columns
    },
    
    // 排序变化
    handleSortChange(sortBy) {
      this.sortBy = sortBy
    },
    
    // Banner点击
    handleBannerClick(banner) {
      this.$message.info(`点击了Banner: ${banner.title}`)
    },
    
    // 分类点击
    handleCategoryClick(category) {
      this.$message.info(`选择了分类: ${category.name}`)
    },
    
    // 公告点击
    handleAnnouncementClick(announcement) {
      this.$message.info(`查看公告: ${announcement.title}`)
    },
    
    // 活动点击
    handleActivityClick(activity) {
      this.selectedActivity = activity
      this.detailDialogVisible = true
    },
    
    // 查看详情
    handleViewDetail(activity) {
      this.selectedActivity = activity
      this.detailDialogVisible = true
    },
    
    // 编辑活动
    handleEdit(activity) {
      this.$message.info(`编辑活动: ${activity.title}`)
    },
    
    // 参与活动
    handleJoinActivity(activity) {
      if (activity) {
        this.$message.success(`已成功参与活动：${activity.title}`)
        this.detailDialogVisible = false
      }
    },
    
    // 创建活动
    handleCreate() {
      this.$message.info('创建新活动')
    },
    
    // 跳转到列表页
    goToList() {
      this.$router.push('/list')
    },
    
    // 获取类型标签样式
    getTypeTag(type) {
      const map = {
        'hot': 'danger',
        'limited': 'warning',
        'new_user': 'success',
        'points': 'info',
        'vip': '',
        'festival': 'primary'
      }
      return map[type] || 'info'
    },
    
    // 获取类型名称
    getTypeName(type) {
      const map = {
        'hot': '热门活动',
        'limited': '限时抢购',
        'new_user': '新人专享',
        'points': '积分兑换',
        'vip': '会员特权',
        'festival': '节日活动'
      }
      return map[type] || '其他活动'
    },
    
    // 获取状态标签样式
    getStatusType(status) {
      const map = {
        '进行中': 'success',
        'active': 'success',
        '即将开始': 'warning',
        'upcoming': 'warning',
        '已结束': 'info',
        'ended': 'info',
        '已下架': 'danger',
        'offline': 'danger'
      }
      return map[status] || 'info'
    },
    
    // 获取进度条状态
    getProgressStatus(progress) {
      if (progress >= 80) return 'success'
      if (progress >= 50) return ''
      if (progress >= 30) return 'warning'
      return 'exception'
    },
    
    // 引导相关方法
    
    // 检查引导
    checkGuide() {
      // 检查本地存储，如果用户已经看过引导就不再显示
      const hasSeen = localStorage.getItem('guide_seen_activity-home-guide')
      if (!hasSeen) {
        // 延迟显示，让页面先加载完成
        setTimeout(() => {
          this.showGuide = true
        }, 1500)
      }
    },
    
    // 开始引导
    startGuide() {
      this.showGuide = true
    },
    
    // 引导完成
    handleGuideComplete(key) {
      this.showGuide = false
      localStorage.setItem(`guide_seen_${key}`, 'true')
      this.showHelpButton = false
      this.$message.success('新手引导已完成！')
    },
    
    // 跳过引导
    handleGuideSkip(key) {
      this.showGuide = false
      localStorage.setItem(`guide_seen_${key}`, 'true')
      this.showHelpButton = false
      this.$message.info('已跳过新手引导')
    }
  }
}
</script>

<style scoped>
.activity-manage {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  margin: 0;
  color: #303133;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.category-section {
  margin-bottom: 20px;
}

.section-header {
  font-size: 16px;
  font-weight: bold;
}

.activity-title {
  display: flex;
  align-items: center;
}

.activity-display {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

/* 查看全部卡片样式 */
.view-all-card {
  margin-top: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.view-all-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.view-all-info h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
}

.view-all-info p {
  margin: 0;
  opacity: 0.9;
}

.view-all-actions .el-button {
  background: white;
  color: #667eea;
  border: none;
}

.view-all-actions .el-button:hover {
  background: rgba(255, 255, 255, 0.9);
}
</style>