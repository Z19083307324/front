// src/plugins/element.js - 创建一个插件文件
import Vue from 'vue'
import {
  // 表单组件
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Checkbox,
  Radio,
  Switch,
  
  // 布局组件
  Container,
  Header,
  Aside,
  Main,
  Footer,
  
  // 数据展示
  Table,
  TableColumn,
  Pagination,
  
  // 反馈组件
  Message,
  MessageBox,
  Notification,
  
  // 导航组件
  Menu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  
  // 其他常用
  Dialog,
  Loading,
  Tooltip
} from 'element-ui'

// 按需注册组件
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)

// 全局方法
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$loading = Loading.service