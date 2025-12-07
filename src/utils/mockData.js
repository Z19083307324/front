// src/utils/mockData.js

const generateActivities = () => {
  const activities = []
  const types = ['hot', 'limited', 'new_user', 'points', 'vip', 'festival']
  const statuses = ['active', 'upcoming', 'ended', 'offline']
  const creators = ['管理员', '运营A', '运营B', '运营C', '运营D']
  
  // 生成200条活动数据
  for (let i = 1; i <= 200; i++) {
    const type = types[i % types.length]
    const status = statuses[i % statuses.length]
    const creator = creators[i % creators.length]
    
    // 创建时间（模拟过去几个月的数据）
    const createdDaysAgo = Math.floor(Math.random() * 180) // 0-180天前
    const createdDate = new Date()
    createdDate.setDate(createdDate.getDate() - createdDaysAgo)
    
    // 开始时间（创建时间后1-30天）
    const startDaysLater = Math.floor(Math.random() * 30) + 1
    const startDate = new Date(createdDate)
    startDate.setDate(startDate.getDate() + startDaysLater)
    
    // 结束时间（开始时间后7-30天）
    const durationDays = Math.floor(Math.random() * 24) + 7
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + durationDays)
    
    // 生成活动标题
    const typeNames = {
      'hot': '热门活动',
      'limited': '限时抢购',
      'new_user': '新人专享',
      'points': '积分兑换',
      'vip': '会员特权',
      'festival': '节日活动'
    }
    
    activities.push({
      id: i,
      title: `${typeNames[type]}第${i}期：${getRandomTitle()}`,
      description: `这是第${i}期${typeNames[type]}的描述内容，活动规则请仔细阅读。参与活动有机会赢取丰厚奖品！`,
      type: type,
      status: status,
      creator: creator,
      createdAt: createdDate.toISOString().split('T')[0] + ' 10:00:00',
      startTime: startDate.toISOString().split('T')[0] + ' 00:00:00',
      endTime: endDate.toISOString().split('T')[0] + ' 23:59:59',
      participants: Math.floor(Math.random() * 10000) + 100,
      views: Math.floor(Math.random() * 5000) + 50,
      progress: Math.floor(Math.random() * 100),
      coverImage: getCoverImage(type, i),
      image:getCoverImage(type, i),
      isFeatured: i % 10 === 0, // 每10个活动有一个是精选的
      tags: getTagsByType(type),
      priority: Math.floor(Math.random() * 10) + 1,
    })
  }
  
  return activities
}

// 生成随机标题
function getRandomTitle() {
  const prefixes = ['年度盛典', '狂欢促销', '专享福利', '惊喜特惠', '会员专享', '节日庆典']
  const suffixes = ['大放送', '专场', '活动', '特价', '福利', '优惠']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  return prefix + suffix
}

// 根据类型生成封面图
// function getCoverImage(type, id) {
//   const colorMap = {
//     'hot': 'FF6B6B',
//     'limited': '4ECDC4',
//     'new_user': 'FFD166',
//     'points': '06D6A0',
//     'vip': '118AB2',
//     'festival': 'EF476F'
//   }
//   const color = colorMap[type] || '667eea'
//   const typeNames = {
//     'hot': '热门',
//     'limited': '限时',
//     'new_user': '新人',
//     'points': '积分',
//     'vip': '会员',
//     'festival': '节日'
//   }
//   return `https://via.placeholder.com/300x200/${color}/FFFFFF?text=${encodeURIComponent(typeNames[type] || '活动')}${id}`
// }
// const localImages = [
//   "images/banner2.jpg",
//   "images/a1.jpg", 
//   "images/a2.jpg",
//   "images/a3.jpeg",
//   "images/a4.jpg",
//   "images/a5.jpeg"
// ]

// // 根据类型生成封面图 - 使用本地图片
// function getCoverImage(type, id) {
//   // 确保每个活动ID对应固定的图片
//   const imageIndex = (id - 1) % localImages.length
//   return localImages[imageIndex]
// }
function getCoverImage(type, id) {
  // 将活动类型映射到特定的图片
  const typeImageMap = {
    'hot': 'images/a1.jpg',       // 热门活动
    'limited': 'images/a2.jpg',    // 限时抢购
    'new_user': 'images/a3.jpeg',  // 新人专享
    'points': 'images/a4.jpg',     // 积分兑换
    'vip': 'images/a5.jpeg',       // 会员特权
    'festival': '/images/banner2.jpg' // 节日活动
  }
  
  // 如果类型有对应图片，使用对应图片；否则随机选择
  return typeImageMap[type] || localImages[id % localImages.length]
}

// 根据类型生成标签
function getTagsByType(type) {
  const tagMap = {
    'hot': ['热门', '推荐', '主推'],
    'limited': ['限时', '抢购', '特价'],
    'new_user': ['新人', '专享', '福利'],
    'points': ['积分', '兑换', '礼品'],
    'vip': ['会员', '特权', '专属'],
    'festival': ['节日', '庆典', '活动']
  }
  return tagMap[type] || ['活动']
}
const allActivities = generateActivities()
export const mockActivities = {
    // 获取活动列表
    getActivityList: () => {
      return new Promise(resolve => {
        setTimeout(() => {
          const featuredActivities = allActivities
          .filter(activity => activity.isFeatured)
          .sort((a, b) => b.priority - a.priority)
          .slice(0, 9)

          resolve({
            code: 200,
            data: {
              banner: {
                id: 1,
                title: "双十一狂欢节",
                image:"/images/banner1.jpg",
                link: "/activity/1111",
                status: "active",
                startTime: "2024-11-01 00:00:00",
                endTime: "2024-11-11 23:59:59"
              },
                    // 轮播数据 - 专门用于轮播展示
            // carouselItems: [
            //   {
            //     id: 101,
            //     title: "热门推荐轮播1",
            //     type: "hot",
            //     status: "进行中",
            //     image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
            //     description: "精选热门活动推荐",
            //     link: "/carousel/1",
            //     order: 1
            //   },
            //   {
            //     id: 102,
            //     title: "限时抢购轮播2",
            //     type: "limited",
            //     status: "进行中",
            //     image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
            //     description: "限时特惠商品",
            //     link: "/carousel/2",
            //     order: 2
            //   },
            //   {
            //     id: 103,
            //     title: "新人专享轮播3",
            //     type: "new_user",
            //     status: "进行中",
            //     image: "https://images.unsplash.com/photo-1556742044-3f6bcef5b5d1?w=800&h=400&fit=crop",
            //     description: "新人专享福利",
            //     link: "/carousel/3",
            //     order: 3
            //   },
            //   {
            //     id: 104,
            //     title: "积分兑换轮播4",
            //     type: "points",
            //     status: "进行中",
            //     image: "https://images.unsplash.com/photo-1556742046-3c57f8c44a4c?w=800&h=400&fit=crop",
            //     description: "积分兑换好礼",
            //     link: "/carousel/4",
            //     order: 4
            //   },
            //   {
            //     id: 105,
            //     title: "会员特权轮播5",
            //     type: "vip",
            //     status: "进行中",
            //     image: "https://images.unsplash.com/photo-1556742045-3c57f8c44a4d?w=800&h=400&fit=crop",
            //     description: "会员专属特权",
            //     link: "/carousel/5",
            //     order: 5
            //   }
            // ],
              // categories: [
              //   { id: 1, name: "热门活动", icon: "el-icon-star-on", count: 12 },
              //   { id: 2, name: "限时抢购", icon: "el-icon-time", count: 8 },
              //   { id: 3, name: "新人专享", icon: "el-icon-user", count: 5 },
              //   { id: 4, name: "积分兑换", icon: "el-icon-present", count: 15 },
              //   { id: 5, name: "会员特权", icon: "el-icon-medal", count: 7 },
              //   { id: 6, name: "节日活动", icon: "el-icon-moon-night", count: 10 }
              // ],
              categories: [
                { id: 1, name: "热门活动", icon: "el-icon-star-on", count: allActivities.filter(a => a.type === 'hot').length },
                { id: 2, name: "限时抢购", icon: "el-icon-time", count: allActivities.filter(a => a.type === 'limited').length },
                { id: 3, name: "新人专享", icon: "el-icon-user", count: allActivities.filter(a => a.type === 'new_user').length },
                { id: 4, name: "积分兑换", icon: "el-icon-present", count: allActivities.filter(a => a.type === 'points').length },
                { id: 5, name: "会员特权", icon: "el-icon-medal", count: allActivities.filter(a => a.type === 'vip').length },
                { id: 6, name: "节日活动", icon: "el-icon-moon-night", count: allActivities.filter(a => a.type === 'festival').length }
              ],
              announcements: [
                { id: 1, title: "系统维护通知", content: "将于11月15日进行系统维护", type: "info", time: "2024-11-05" },
                { id: 2, title: "活动规则更新", content: "双十一活动规则已更新，请仔细阅读", type: "warning", time: "2024-11-04" },
                { id: 3, title: "新活动上线", content: "黑五预热活动已上线", type: "success", time: "2024-11-03" }
              ],
              // activities: [
              //   {
              //     id: 1,
              //     title: "双十一主会场",
              //     type: "hot",
              //     status: "进行中",
              //     image:"/images/banner2.jpg",
              //     description: "年度最大促销活动，全场5折起",
              //     startTime: "2024-11-01",
              //     endTime: "2024-11-11",
              //     participants: 12500,
              //     progress: 65,
              //     tags: ["热门", "限时", "主推"]
              //   },
              //   {
              //     id: 2,
              //     title: "黑五预热专场",
              //     type: "limited",
              //     status: "进行中",
              //     image: "images/a1.jpg",
              //     description: "黑色星期五提前购，抢先体验",
              //     startTime: "2024-11-10",
              //     endTime: "2024-11-25",
              //     participants: 8500,
              //     progress: 40,
              //     tags: ["进口", "免税"]
              //   },
              //   {
              //     id: 3,
              //     title: "新人专享礼包",
              //     type: "new_user",
              //     status: "进行中",
              //     image: "images/a2.jpg",
              //     description: "新用户注册即送100元优惠券",
              //     startTime: "2024-11-01",
              //     endTime: "2024-12-01",
              //     participants: 3200,
              //     progress: 80,
              //     tags: ["新人", "专享"]
              //   },
              //   {
              //     id: 4,
              //     title: "积分兑换商城",
              //     type: "points",
              //     status: "进行中",
              //     image: "images/a3.jpeg",
              //     description: "积分兑换精美礼品",
              //     startTime: "2024-10-01",
              //     endTime: "2024-12-31",
              //     participants: 15600,
              //     progress: 90,
              //     tags: ["积分", "兑换"]
              //   },
              //   {
              //     id: 5,
              //     title: "会员日特权",
              //     type: "vip",
              //     status: "进行中",
              //     image: "images/a4.jpg",
              //     description: "会员专属折扣+双倍积分",
              //     startTime: "2024-11-05",
              //     endTime: "2024-11-07",
              //     participants: 7200,
              //     progress: 55,
              //     tags: ["会员", "特权"]
              //   },
              //   {
              //     id: 6,
              //     title: "感恩节特惠",
              //     type: "festival",
              //     status: "即将开始",
              //     image: "images/a5.jpeg",
              //     description: "感恩节特别回馈活动",
              //     startTime: "2024-11-20",
              //     endTime: "2024-11-28",
              //     participants: 0,
              //     progress: 0,
              //     tags: ["节日", "特惠"]
              //   }
              // ]
              activities: featuredActivities
            },
            message: "获取成功"
          })
        }, 500)
      })
    },
    getActivityListWithPagination: (params = {}) => {
      return new Promise(resolve => {
        setTimeout(() => {
          const {
            page = 1,
            pageSize = 20,
            keyword = '',
            status = '',
            type = '',
            creator = '',
            startDate = '',
            endDate = ''
          } = params
          
          // 从所有数据中筛选
          let filteredData = [...allActivities]
          
          // 关键词筛选
          if (keyword) {
            const keywordLower = keyword.toLowerCase()
            filteredData = filteredData.filter(item => 
              item.title.toLowerCase().includes(keywordLower) || 
              item.description.toLowerCase().includes(keywordLower)
            )
          }
          
          // 状态筛选
          if (status) {
            filteredData = filteredData.filter(item => item.status === status)
          }
          
          // 类型筛选
          if (type) {
            filteredData = filteredData.filter(item => item.type === type)
          }
          
          // 创建人筛选
          if (creator) {
            filteredData = filteredData.filter(item => item.creator === creator)
          }
          
          // 创建时间范围筛选
          if (startDate && endDate) {
            filteredData = filteredData.filter(item => {
              const itemDate = new Date(item.createdAt.split(' ')[0])
              const start = new Date(startDate)
              const end = new Date(endDate)
              return itemDate >= start && itemDate <= end
            })
          }
          
          // 分页处理
          const total = filteredData.length
          const start = (page - 1) * pageSize
          const end = start + pageSize
          const list = filteredData.slice(start, end)
          
          // 生成统计信息
          const stats = {
            total: total,
            active: allActivities.filter(a => a.status === 'active').length,
            upcoming: allActivities.filter(a => a.status === 'upcoming').length,
            ended: allActivities.filter(a => a.status === 'ended').length,
            offline: allActivities.filter(a => a.status === 'offline').length
          }
          
          resolve({
            code: 200,
            data: {
              list,
              total,
              page,
              pageSize,
              totalPages: Math.ceil(total / pageSize),
              stats
            },
            message: "获取成功"
          })
        }, 600)
      })
    },
    
    getActivityDetail: (id) => {
      return new Promise(resolve => {
        setTimeout(() => {
          const activity = allActivities.find(a => a.id == id)
          
          if (activity) {
            // 添加详情页需要的额外数据
            const detail = {
              ...activity,
              rules: `1. 活动时间：${activity.startTime.split(' ')[0]} 至 ${activity.endTime.split(' ')[0]}\n2. 参与条件：所有注册用户均可参与\n3. 活动规则：${activity.description}\n4. 奖品设置：一等奖3名，二等奖10名，三等奖50名\n5. 注意事项：活动最终解释权归平台所有`,
              participantsData: {
                total: activity.participants,
                daily: Array.from({ length: 7 }, (_, i) => ({
                  date: `11-${10 + i}`,
                  count: Math.floor(Math.random() * 1000) + 100
                })),
                byRegion: [
                  { region: '华北', count: Math.floor(activity.participants * 0.3) },
                  { region: '华东', count: Math.floor(activity.participants * 0.4) },
                  { region: '华南', count: Math.floor(activity.participants * 0.2) },
                  { region: '其他', count: Math.floor(activity.participants * 0.1) }
                ]
              }
            }
            
            resolve({
              code: 200,
              data: detail,
              message: "获取成功"
            })
          } else {
            resolve({
              code: 404,
              data: null,
              message: "活动不存在"
            })
          }
        }, 300)
      })
    },
    
    updateActivity: (id, data) => {
      return new Promise(resolve => {
        setTimeout(() => {
          // 在实际项目中，这里会更新数据库
          // 这里我们模拟更新成功
          const activityIndex = allActivities.findIndex(a => a.id == id)
          if (activityIndex !== -1) {
            // 合并更新数据
            allActivities[activityIndex] = {
              ...allActivities[activityIndex],
              ...data,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
            }
          }
          
          resolve({
            code: 200,
            data: { id, ...data },
            message: "更新成功"
          })
        }, 500)
      })
    }
  }