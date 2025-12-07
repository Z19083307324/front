<!-- src/components/Activity/ActivityDetail.vue -->
<template>
  <div class="activity-detail" v-if="activity">
    <div class="detail-toolbar" v-if="showDetailGuide">
      <el-button 
        type="warning" 
        size="small" 
        icon="el-icon-guide" 
        @click="startDetailGuide"
        class="detail-guide-btn"
      >
        详情页引导
      </el-button>
    </div>
    <!-- 编辑模式 -->
    <template v-if="editable && isEditing">
      <el-form ref="editForm" :model="editForm" :rules="formRules" label-width="100px">
        <!-- 基本信息 -->
        <el-card class="form-section">
          <template #header>
            <div class="section-header">
              <i class="el-icon-edit"></i>
              <span>编辑活动信息</span>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="活动标题" prop="title">
                <el-input v-model="editForm.title" placeholder="请输入活动标题" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动状态" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择状态" style="width: 100%;">
                  <el-option label="进行中" value="active" />
                  <el-option label="即将开始" value="upcoming" />
                  <el-option label="已结束" value="ended" />
                  <el-option label="已下架" value="offline" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="活动类型" prop="type">
                <el-select v-model="editForm.type" placeholder="请选择类型" style="width: 100%;">
                  <el-option label="热门活动" value="hot" />
                  <el-option label="限时抢购" value="limited" />
                  <el-option label="新人专享" value="new_user" />
                  <el-option label="积分兑换" value="points" />
                  <el-option label="会员特权" value="vip" />
                  <el-option label="节日活动" value="festival" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人" prop="creator">
                <el-input v-model="editForm.creator" placeholder="请输入创建人" />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="活动描述" prop="description">
            <el-input
              v-model="editForm.description"
              type="textarea"
              :rows="3"
              placeholder="请输入活动描述"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
        </el-card>
        
        <!-- 时间设置 -->
        <el-card class="form-section">
          <template #header>
            <div class="section-header">
              <i class="el-icon-time"></i>
              <span>时间设置</span>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                  v-model="editForm.startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                  v-model="editForm.endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  style="width: 100%;"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
        
        <!-- 参与数据 -->
        <el-card class="form-section">
          <template #header>
            <div class="section-header">
              <i class="el-icon-s-data"></i>
              <span>参与数据</span>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="参与人数">
                <el-input-number
                  v-model="editForm.participants"
                  :min="0"
                  :step="100"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活动进度">
                <el-input-number
                  v-model="editForm.progress"
                  :min="0"
                  :max="100"
                  :step="1"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-form-item label="活动规则" prop="rules">
            <el-input
              v-model="editForm.rules"
              type="textarea"
              :rows="4"
              placeholder="请输入活动规则"
            />
          </el-form-item>
        </el-card>
      </el-form>
      
      <!-- 编辑按钮 -->
      <div class="action-buttons">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="submitEdit" :loading="submitting">保存</el-button>
      </div>
    </template>
    
    <!-- 查看模式 -->
    <template v-else>
      <!-- 操作工具栏 -->
      <div class="action-toolbar" v-if="editable">
        <el-button type="primary" icon="el-icon-edit" @click="startEdit">
          编辑活动
        </el-button>
      </div>
      
      <!-- 基本信息卡片 -->
      <el-card class="info-card">
        <div class="info-header">
          <div class="info-title">
            <h2>{{ activity.title }}</h2>
            <div class="info-tags">
              <el-tag :type="getTagType(activity.type)" size="medium">
                {{ getTypeName(activity.type) }}
              </el-tag>
              <el-tag :type="getStatusType(activity.status)" size="medium">
                {{ getStatusText(activity.status) }}
              </el-tag>
            </div>
          </div>
          <div class="info-meta">
            <span class="meta-item"><i class="el-icon-user"></i> {{ activity.creator }}</span>
            <span class="meta-item"><i class="el-icon-time"></i> {{ formatDate(activity.createdAt) }}</span>
          </div>
        </div>
        
        <el-divider></el-divider>
        
        <!-- 基本信息表格 -->
        <el-descriptions :column="2" border>
          <el-descriptions-item label="活动ID">{{ activity.id }}</el-descriptions-item>
          <el-descriptions-item label="参与人数">{{ formatParticipants(activity.participants) }}</el-descriptions-item>
          <el-descriptions-item label="浏览次数">{{ activity.views }}</el-descriptions-item>
          <el-descriptions-item label="活动进度">
            <el-progress :percentage="activity.progress" :status="getProgressStatus(activity.progress)" />
          </el-descriptions-item>
          <el-descriptions-item label="开始时间">{{ formatFullDate(activity.startTime) }}</el-descriptions-item>
          <el-descriptions-item label="结束时间">{{ formatFullDate(activity.endTime) }}</el-descriptions-item>
        </el-descriptions>
        
        <!-- 活动描述 -->
        <div class="description-section">
          <h4><i class="el-icon-info"></i> 活动描述</h4>
          <p>{{ activity.description }}</p>
        </div>
      </el-card>
      
      <!-- 活动规则卡片 -->
      <el-card class="rules-card">
        <template #header>
          <div class="card-header">
            <i class="el-icon-document"></i>
            <span>活动规则</span>
          </div>
        </template>
        <div class="rules-content">
          <pre>{{ activity.rules }}</pre>
        </div>
      </el-card>
      
      <!-- 参与数据卡片 -->
      <el-card class="data-card" v-if="activity.participantsData">
        <template #header>
          <div class="card-header">
            <i class="el-icon-s-data"></i>
            <span>参与数据</span>
          </div>
        </template>
        
        <div class="data-content">
          <!-- 总参与人数 -->
          <div class="data-item">
            <div class="data-label">总参与人数</div>
            <div class="data-value">{{ formatParticipants(activity.participantsData.total) }}</div>
          </div>
          
          <!-- 每日参与趋势 -->
          <div class="data-item">
            <h4>每日参与趋势</h4>
            <div class="daily-trend">
              <div 
                v-for="day in activity.participantsData.daily" 
                :key="day.date"
                class="trend-item"
              >
                <div class="trend-date">{{ day.date }}</div>
                <div class="trend-bar">
                  <div 
                    class="bar-fill" 
                    :style="{ height: Math.min(day.count / 50, 100) + '%' }"
                  ></div>
                </div>
                <div class="trend-count">{{ day.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </template>
      <GuideOverlay
      v-if="showDetailGuideDialog"
      :steps="detailGuideSteps"
      guide-key="activity-detail-guide"
      @complete="handleDetailGuideComplete"
      @skip="handleDetailGuideSkip"
    />
  </div>
</template>

<script>
import GuideOverlay from '@/components/Guide/GuideOverlay.vue'
export default {
  name: 'ActivityDetail',
  components: {
    GuideOverlay
  },
  props: {
    activity: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    showDetailGuide: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        showDetailGuideDialog: false,
      detailGuideSteps: this.getDetailGuideSteps(),
      isEditing: false,
      editForm: {},
      submitting: false,
      formRules: {
        title: [
          { required: true, message: '请输入活动标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择活动状态', trigger: 'change' }
        ],
        creator: [
          { required: true, message: '请输入创建人', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入活动描述', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    activity: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.editForm = this.getEditFormData(newVal)
        }
      }
    }
  },
  methods: {
      getDetailGuideSteps() {
      const steps = [
        {
          title: '活动详情页介绍',
          content: '这里是活动详情页面，展示活动的完整信息和参与数据。',
          order: 1
        }
      ]
      
      if (this.editable) {
        steps.push(
          {
            title: '编辑模式',
            content: '点击"编辑活动"按钮可以进入编辑模式，修改活动信息。',
            order: 2
          },
          {
            title: '表单验证',
            content: '编辑表单有完整的验证规则，确保数据准确性。',
            order: 3
          },
          {
            title: '保存功能',
            content: '编辑完成后点击"保存"按钮，数据会更新并反馈结果。',
            order: 4
          }
        )
      } else {
        steps.push(
          {
            title: '基本信息区域',
            content: '这里展示了活动的标题、状态、创建人、时间等基本信息。',
            order: 2
          },
          {
            title: '数据统计',
            content: '查看活动的参与人数、浏览次数、活动进度等数据。',
            order: 3
          },
          {
            title: '活动描述',
            content: '这里详细描述了活动的内容和目标。',
            order: 4
          },
          {
            title: '活动规则',
            content: '查看活动的详细规则和注意事项。',
            order: 5
          },
          {
            title: '参与数据',
            content: '这里展示了活动的参与趋势和数据分布。',
            order: 6
          },
          {
            title: '操作按钮',
            content: '可以关闭详情页或立即参与活动。',
            order: 7
          }
        )
      }
      
      return steps
    },
    
    startDetailGuide() {
      this.showDetailGuideDialog = true
    },
    
    handleDetailGuideComplete(key) {
      this.showDetailGuideDialog = false
      localStorage.setItem(`guide_seen_${key}`, 'true')
      this.$message.success('详情页引导已完成！')
    },
    
    handleDetailGuideSkip(key) {
      this.showDetailGuideDialog = false
      localStorage.setItem(`guide_seen_${key}`, 'true')
      this.$message.info('已跳过来详情页引导')
    },
    // 开始编辑
    startEdit() {
      this.isEditing = true
      this.editForm = this.getEditFormData(this.activity)
    },
    
    // 取消编辑
    cancelEdit() {
      this.isEditing = false
      this.editForm = this.getEditFormData(this.activity)
    },
    
    // 提交编辑
    submitEdit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.submitting = true
          
          // 模拟API调用延迟
          setTimeout(() => {
            // 触发保存事件，将编辑后的数据传递给父组件
            this.$emit('save', this.editForm)
            
            // 显示成功消息
            this.$message.success('活动信息更新成功！')
            
            // 退出编辑模式
            this.isEditing = false
            this.submitting = false
            
            // 更新本地数据（实际项目中应由父组件更新）
            Object.assign(this.activity, this.editForm)
          }, 800)
        } else {
          this.$message.warning('请填写完整的表单信息')
        }
      })
    },
    
    // 准备编辑表单数据
    getEditFormData(activity) {
        setTimeout(() => {
        this.detailGuideSteps = this.getDetailGuideSteps()
      }, 100)
      return {
        id: activity.id,
        title: activity.title,
        type: activity.type,
        status: activity.status,
        creator: activity.creator,
        description: activity.description,
        startTime: activity.startTime,
        endTime: activity.endTime,
        participants: activity.participants,
        progress: activity.progress,
        rules: activity.rules || '1. 活动时间：\n2. 参与条件：\n3. 活动规则：\n4. 奖品设置：\n5. 注意事项：'
      }
    },
    
    // 工具方法
    getTagType(type) {
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
    
    getProgressStatus(progress) {
      if (progress >= 80) return 'success'
      if (progress >= 50) return ''
      if (progress >= 30) return 'warning'
      return 'exception'
    },
    
    formatDate(date) {
      if (!date) return '-'
      return date.split(' ')[0]
    },
    
    formatFullDate(date) {
      if (!date) return '-'
      const d = new Date(date)
      return d.toLocaleString()
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
/* 编辑模式样式 */
.form-section {
  margin-bottom: 20px;
}

.section-header {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.section-header i {
  margin-right: 8px;
  color: #409EFF;
}

.action-buttons {
  text-align: right;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.action-buttons .el-button {
  margin-left: 10px;
}

/* 查看模式样式 */
.action-toolbar {
  margin-bottom: 20px;
  text-align: right;
}

.info-card {
  margin-bottom: 20px;
}

.info-header {
  margin-bottom: 20px;
}

.info-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.info-title h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
  flex: 1;
}

.info-tags {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.info-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-item i {
  margin-right: 5px;
}

.description-section {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.description-section h4 {
  margin: 0 0 10px 0;
  color: #409EFF;
  display: flex;
  align-items: center;
}

.description-section i {
  margin-right: 8px;
}

.description-section p {
  margin: 0;
  line-height: 1.6;
  color: #606266;
}

.rules-card,
.data-card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.card-header i {
  margin-right: 8px;
  color: #409EFF;
}

.rules-content pre {
  margin: 0;
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  color: #606266;
  font-size: 14px;
}

/* 数据展示样式 */
.data-content {
  padding: 10px;
}

.data-item {
  margin-bottom: 30px;
}

.data-item:last-child {
  margin-bottom: 0;
}

.data-item h4 {
  margin: 0 0 15px 0;
  color: #303133;
}

.data-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 5px;
}

.data-value {
  font-size: 32px;
  font-weight: bold;
  color: #409EFF;
}

/* 每日趋势 */
.daily-trend {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  height: 150px;
  padding: 20px 0;
}

.trend-item {
  flex: 1;
  text-align: center;
}

.trend-date {
  font-size: 12px;
  color: #909399;
  margin-bottom: 8px;
}

.trend-bar {
  height: 100px;
  background: #f5f7fa;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, #409EFF, #66b1ff);
  border-radius: 4px;
  transition: height 0.3s;
}

.trend-count {
  font-size: 12px;
  color: #303133;
  margin-top: 8px;
}
.detail-toolbar {
  text-align: right;
  margin-bottom: 20px;
}

.detail-guide-btn {
  background: linear-gradient(45deg, #9C27B0, #673AB7) !important;
  border-color: #9C27B0 !important;
  color: white !important;
}

.detail-guide-btn:hover {
  background: linear-gradient(45deg, #673AB7, #512DA8) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 58, 183, 0.4);
}
</style>