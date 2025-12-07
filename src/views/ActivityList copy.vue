<!-- src/views/ActivityList.vue -->
<template>
  <div class="activity-list-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-left">
        <h1><i class="el-icon-s-order"></i> 活动列表</h1>
        <el-button 
          type="text" 
          icon="el-icon-back" 
          @click="$router.push('/')"
          class="back-home-btn"
        >
          返回首页
        </el-button>
      </div>
      <div class="page-actions">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate" style="display:none;">
          创建活动
        </el-button>
        <el-button icon="el-icon-refresh" @click="refreshList">
          刷新
        </el-button>
      </div>
    </div>

    <!-- 筛选条件 -->
    <el-card class="filter-card" shadow="never">
      <el-form :model="filterForm" inline label-width="80px">
        <!-- 关键词搜索 -->
        <el-form-item label="关键词">
          <el-input
            v-model="filterForm.keyword"
            placeholder="请输入活动标题或描述"
            clearable
            @keyup.enter="handleSearch"
            @clear="handleSearch"
            style="width: 220px;"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
          </el-input>
        </el-form-item>

        <!-- 活动状态筛选 -->
        <el-form-item label="活动状态">
          <el-select
            v-model="filterForm.status"
            placeholder="请选择状态"
            clearable
            @change="handleSearch"
            style="width: 150px;"
          >
            <el-option label="全部" value="" />
            <el-option label="进行中" value="active" />
            <el-option label="即将开始" value="upcoming" />
            <el-option label="已结束" value="ended" />
            <el-option label="已下架" value="offline" />
          </el-select>
        </el-form-item>

        <!-- 活动类型筛选 -->
        <el-form-item label="活动类型">
          <el-select
            v-model="filterForm.type"
            placeholder="请选择类型"
            clearable
            @change="handleSearch"
            style="width: 150px;"
          >
            <el-option label="全部" value="" />
            <el-option label="热门活动" value="hot" />
            <el-option label="限时抢购" value="limited" />
            <el-option label="新人专享" value="new_user" />
            <el-option label="积分兑换" value="points" />
            <el-option label="会员特权" value="vip" />
            <el-option label="节日活动" value="festival" />
          </el-select>
        </el-form-item>

        <!-- 时间范围筛选 -->
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleSearch"
            style="width: 280px;"
          />
        </el-form-item>

        <!-- 创建人筛选 -->
        <el-form-item label="创建人">
          <el-select
            v-model="filterForm.creator"
            placeholder="请选择创建人"
            clearable
            filterable
            @change="handleSearch"
            style="width: 150px;"
          >
            <el-option label="全部" value="" />
            <el-option label="管理员" value="管理员" />
            <el-option label="运营A" value="运营A" />
            <el-option label="运营B" value="运营B" />
            <el-option label="运营C" value="运营C" />
            <el-option label="运营D" value="运营D" />
          </el-select>
        </el-form-item>

        <!-- 重置和搜索按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch" :loading="loading">
            <i class="el-icon-search"></i> 搜索
          </el-button>
          <el-button @click="handleReset">
            <i class="el-icon-refresh"></i> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 统计信息 -->
    <div class="stats-row" v-if="stats && !loading">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="stat-item total">
            <div class="stat-icon">
              <i class="el-icon-s-order"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.total }}</div>
              <div class="stat-label">总活动数</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item active">
            <div class="stat-icon">
              <i class="el-icon-success"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.active }}</div>
              <div class="stat-label">进行中</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item upcoming">
            <div class="stat-icon">
              <i class="el-icon-time"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.upcoming }}</div>
              <div class="stat-label">即将开始</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-item ended">
            <div class="stat-icon">
              <i class="el-icon-finished"></i>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.ended }}</div>
              <div class="stat-label">已结束</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 列表内容区域 -->
    <el-card class="list-card" shadow="never">
      <!-- 列表工具栏 -->
      <div class="list-toolbar">
        <div class="total-count">
          搜索到 <span class="count-number">{{ total }}</span> 个活动
          <span v-if="filterForm.keyword" class="keyword-hint">（关键词：{{ filterForm.keyword }}）</span>
        </div>
        <div class="toolbar-actions">
          <el-select v-model="pageSize" size="small" style="width: 120px;" @change="handlePageSizeChange">
            <el-option label="每页10条" :value="10" />
            <el-option label="每页20条" :value="20" />
            <el-option label="每页50条" :value="50" />
          </el-select>
        </div>
      </div>

      <!-- 骨架屏 -->
      <div v-if="loading && listData.length === 0" class="skeleton-container">
        <div v-for="i in 10" :key="i" class="skeleton-item">
          <el-skeleton animated :loading="true">
            <template slot="template">
              <div class="skeleton-content">
                <el-skeleton-item variant="image" style="width: 120px; height: 80px;" />
                <div style="flex: 1; margin-left: 15px;">
                  <el-skeleton-item variant="h3" style="width: 30%;" />
                  <el-skeleton-item variant="text" style="width: 60%; margin-top: 10px;" />
                  <div style="display: flex; margin-top: 15px;">
                    <el-skeleton-item variant="text" style="width: 80px; margin-right: 20px;" />
                    <el-skeleton-item variant="text" style="width: 100px;" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>

      <!-- 活动列表 -->
      <div v-if="listData.length > 0" class="list-container">
        <div 
          v-for="item in listData" 
          :key="item.id" 
          class="list-item" 
          @click="handleItemClick(item)"
        >
          <div class="item-image">
            <el-image
              :src="item.coverImage"
              fit="cover"
              style="width: 100%; height: 100%;"
            >
              <div slot="error" class="image-error">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="item-content">
            <div class="item-header">
              <h4 class="item-title">{{ item.title }}</h4>
              <div class="item-meta">
                <el-tag :type="getStatusType(item.status)" size="mini">
                  {{ getStatusText(item.status) }}
                </el-tag>
                <span class="item-type">{{ getTypeName(item.type) }}</span>
              </div>
            </div>
            <p class="item-description">{{ item.description }}</p>
            <div class="item-footer">
              <div class="item-info">
                <span class="info-item">
                  <i class="el-icon-user"></i>
                  {{ item.creator }}
                </span>
                <span class="info-item">
                  <i class="el-icon-time"></i>
                  {{ formatDate(item.createdAt) }}
                </span>
                <span class="info-item">
                  <i class="el-icon-user-solid"></i>
                  {{ formatParticipants(item.participants) }} 人参与
                </span>
              </div>
              <div class="item-actions">
                <el-button type="text" size="small" @click.stop="handleViewDetail(item)">
                  查看详情
                </el-button>
                <el-button
                  v-if="item.status !== 'ended'"
                  type="text"
                  size="small"
                  @click.stop="handleEdit(item)"
                >
                  编辑
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && listData.length === 0" class="empty-state">
        <el-empty description="暂无活动数据">
          <el-button type="primary" @click="handleReset">重置筛选</el-button>
        </el-empty>
      </div>

      <!-- 分页 -->
      <div v-if="total > 0" class="pagination-container">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handlePageSizeChange"
          @current-change="handlePageChange"
          background
        />
      </div>
    </el-card>

    <!-- 活动详情对话框 -->
    <el-dialog
      title="活动详情"
      :visible.sync="detailDialogVisible"
      width="70%"
      top="5vh"
    >
      <ActivityDetail
        v-if="detailDialogVisible && selectedItem"
        :activity="selectedItem"
        :editable="false"
        @close="detailDialogVisible = false"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleJoinActivity(selectedItem)">
          立即参与
        </el-button>
      </span>
    </el-dialog>

    <!-- 编辑活动对话框 -->
    <el-dialog
  title="编辑活动"
  :visible.sync="editDialogVisible"
  width="60%"
  top="5vh"
  @close="handleEditDialogClose"
>
  <ActivityDetail
    v-if="editDialogVisible && selectedItem"
    :activity="selectedItem"
    :editable="true"
    @save="handleSaveActivity"
    @close="editDialogVisible = false"
  />
</el-dialog>
  </div>
</template>

<script>
import ActivityAPI from '@/api/activity'
import ActivityDetail from '@/components/Activity/ActivityDetail.vue'

export default {
  name: 'ActivityList',
  components: {
    ActivityDetail
  },
  data() {
    return {
      // 筛选表单
      filterForm: {
        keyword: '',
        status: '',
        type: '',
        dateRange: [],
        creator: ''
      },
      // 列表数据
      listData: [],
      // 分页信息
      currentPage: 1,
      pageSize: 20,
      total: 0,
      // 加载状态
      loading: false,
      // 统计信息
      stats: null,
      // 对话框状态
      detailDialogVisible: false,
      editDialogVisible: false,
      selectedItem: null,
      // URL参数缓存
      urlParams: {}
    }
  },
  watch: {
    // 监听路由变化，更新筛选参数
    '$route.query': {
      immediate: true,
      handler(newQuery) {
        this.updateFilterFromUrl(newQuery)
      }
    }
  },
  created() {
    this.initFromUrl()
    this.loadData()
  },
  methods: {
    // 初始化URL参数
    initFromUrl() {
      const query = this.$route.query
      this.filterForm = {
        keyword: query.keyword || '',
        status: query.status || '',
        type: query.type || '',
        dateRange: query.startDate && query.endDate ? [query.startDate, query.endDate] : [],
        creator: query.creator || ''
      }
      this.currentPage = parseInt(query.page) || 1
      this.pageSize = parseInt(query.pageSize) || 20
    },

    // 更新URL参数
    updateUrl() {
      const params = {
        keyword: this.filterForm.keyword || undefined,
        status: this.filterForm.status || undefined,
        type: this.filterForm.type || undefined,
        creator: this.filterForm.creator || undefined,
        page: this.currentPage > 1 ? this.currentPage : undefined,
        pageSize: this.pageSize !== 20 ? this.pageSize : undefined
      }

      // 处理日期范围
      if (this.filterForm.dateRange && this.filterForm.dateRange.length === 2) {
        params.startDate = this.filterForm.dateRange[0]
        params.endDate = this.filterForm.dateRange[1]
      }

      // 移除undefined值
      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key]
        }
      })

      // 更新URL，不添加历史记录
      this.$router.replace({
        query: params
      }).catch(() => {})
    },

    // 从URL更新筛选参数
    updateFilterFromUrl(query) {
      // 避免重复触发
      if (JSON.stringify(this.urlParams) === JSON.stringify(query)) {
        return
      }
      
      this.urlParams = { ...query }
      
      this.filterForm = {
        keyword: query.keyword || '',
        status: query.status || '',
        type: query.type || '',
        dateRange: query.startDate && query.endDate ? [query.startDate, query.endDate] : [],
        creator: query.creator || ''
      }
      
      this.currentPage = parseInt(query.page) || 1
      this.pageSize = parseInt(query.pageSize) || 20
      
      // 重新加载数据
      this.loadData()
    },

    // 加载数据
    async loadData() {
      this.loading = true
      
      try {
        // 构建请求参数
        const params = {
          page: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.filterForm.keyword,
          status: this.filterForm.status,
          type: this.filterForm.type,
          creator: this.filterForm.creator
        }

        // 添加日期范围
        if (this.filterForm.dateRange && this.filterForm.dateRange.length === 2) {
          params.startDate = this.filterForm.dateRange[0]
          params.endDate = this.filterForm.dateRange[1]
        }

        const res = await ActivityAPI.getActivityListWithPagination(params)
        
        if (res.code === 200) {
          const data = res.data
          this.listData = data.list || []
          this.total = data.total || 0
          this.stats = data.stats || null
          
          // 更新URL参数
          this.updateUrl()
        } else {
          this.$message.error(res.message || '加载失败')
        }
      } catch (error) {
        console.error('加载数据失败:', error)
        this.$message.error('加载失败，请稍后重试')
      } finally {
        this.loading = false
      }
    },

    // 搜索
    handleSearch() {
      this.currentPage = 1
      this.loadData()
    },

    // 重置
    handleReset() {
      this.filterForm = {
        keyword: '',
        status: '',
        type: '',
        dateRange: [],
        creator: ''
      }
      this.currentPage = 1
      this.loadData()
    },

    // 分页变化
    handlePageChange(page) {
      this.currentPage = page
      this.loadData()
    },

    // 每页数量变化
    handlePageSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.loadData()
    },

    // 点击列表项
    handleItemClick(item) {
      this.selectedItem = item
      this.detailDialogVisible = true
    },

    // 查看详情
    handleViewDetail(item) {
      this.selectedItem = item
      this.detailDialogVisible = true
    },

    // 编辑活动
    handleEdit(item) {
      this.selectedItem = item
      this.editDialogVisible = true
    },

    // 保存活动
    async handleSaveActivity(updatedData) {
    try {
      // 显示加载中
      this.$message.loading('正在保存...', 0)
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 在实际项目中，这里会调用真实的API
      // const res = await ActivityAPI.updateActivity(this.selectedItem.id, updatedData)
      
      // 模拟成功响应
      const mockResponse = {
        code: 200,
        data: updatedData,
        message: "活动更新成功"
      }
      
      if (mockResponse.code === 200) {
        // 更新本地数据
        Object.assign(this.selectedItem, updatedData)
        
        // 更新列表数据
        const index = this.listData.findIndex(item => item.id === this.selectedItem.id)
        if (index !== -1) {
          this.$set(this.listData, index, { ...this.listData[index], ...updatedData })
        }
        
        // 显示成功消息
        this.$message.closeAll()
        this.$message.success(mockResponse.message)
        
        // 关闭对话框
        this.editDialogVisible = false
        
        // 重置选中项
        this.selectedItem = null
      } else {
        this.$message.closeAll()
        this.$message.error(mockResponse.message || '保存失败')
      }
    } catch (error) {
      this.$message.closeAll()
      console.error('保存失败:', error)
      this.$message.error('保存失败，请稍后重试')
    }
  },
  handleEditDialogClose() {
    this.selectedItem = null
  },

    // 参与活动
    handleJoinActivity(item) {
      this.$message.success(`已成功参与活动：${item.title}`)
      this.detailDialogVisible = false
      // 重新加载数据以更新参与人数
      this.loadData()
    },

    // 刷新列表
    refreshList() {
      this.loadData()
    },

    // 创建活动
    handleCreate() {
      this.$message.info('创建活动功能待实现')
    },

    // 工具方法
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

    getStatusText(status) {
      const map = {
        'active': '进行中',
        'upcoming': '即将开始',
        'ended': '已结束',
        'offline': '已下架'
      }
      return map[status] || '未知'
    },

    getStatusType(status) {
      const map = {
        'active': 'success',
        'upcoming': 'warning',
        'ended': 'info',
        'offline': 'danger'
      }
      return map[status] || 'info'
    },

    formatDate(date) {
      if (!date) return '-'
      return date.split(' ')[0]
    },

    formatParticipants(num) {
      if (!num) return '0'
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
      return num.toString()
    }
  }
}
</script>

<style scoped>
.activity-list-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-left h1 {
  margin: 0;
  color: #303133;
  display: flex;
  align-items: center;
}

.header-left i {
  margin-right: 10px;
  font-size: 24px;
}

.back-home-btn {
  color: #409EFF;
}

.back-home-btn:hover {
  color: #66b1ff;
}

.filter-card {
  margin-bottom: 20px;
  border-radius: 8px;
}

/* 统计信息 */
.stats-row {
  margin-bottom: 20px;
}

.stat-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 24px;
  color: white;
}

.stat-item.total .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-item.active .stat-icon {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.stat-item.upcoming .stat-icon {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
}

.stat-item.ended .stat-icon {
  background: linear-gradient(135deg, #9e9e9e 0%, #616161 100%);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

/* 列表区域 */
.list-card {
  border-radius: 8px;
}

.list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}

.total-count {
  font-size: 16px;
  color: #303133;
}

.count-number {
  font-weight: bold;
  color: #409EFF;
  font-size: 20px;
  margin: 0 4px;
}

.keyword-hint {
  font-size: 14px;
  color: #909399;
  margin-left: 8px;
}

/* 骨架屏 */
.skeleton-container {
  padding: 10px 0;
}

.skeleton-item {
  margin-bottom: 15px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}

.skeleton-content {
  display: flex;
}

/* 列表项 */
.list-container {
  min-height: 400px;
}

.list-item {
  display: flex;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.list-item:hover {
  border-color: #409EFF;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
}

.item-image {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 15px;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.item-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.item-type {
  font-size: 12px;
  color: #909399;
  padding: 2px 6px;
  background: #f4f4f5;
  border-radius: 2px;
}

.item-description {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  gap: 20px;
  font-size: 12px;
  color: #909399;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item i {
  margin-right: 4px;
}

.item-actions {
  display: flex;
  gap: 10px;
}

/* 空状态 */
.empty-state {
  padding: 80px 0;
  text-align: center;
}

/* 分页 */
.pagination-container {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
  text-align: center;
}

/* 响应式 */
@media (max-width: 992px) {
  .filter-card .el-form-item {
    margin-bottom: 15px;
  }
  
  .stats-row .el-col {
    margin-bottom: 15px;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .list-item {
    flex-direction: column;
  }
  
  .item-image {
    width: 100%;
    height: 150px;
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .item-footer {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .item-info {
    flex-direction: column;
    gap: 8px;
  }
  
  .item-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>