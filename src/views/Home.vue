<template>
  <div class="home">
    <h1>Element UI 示例</h1>
    
    <!-- 表单示例 -->
    <el-form :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      
      <el-form-item label="城市">
        <el-select v-model="form.city" placeholder="请选择城市">
          <el-option label="北京" value="beijing"></el-option>
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="广州" value="guangzhou"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    
    <!-- 表格示例 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      form: {
        username: '',
        password: '',
        city: ''
      },
      tableData: [
        {
          date: '2024-01-01',
          name: '张三',
          address: '北京市朝阳区'
        },
        {
          date: '2024-01-02',
          name: '李四',
          address: '上海市浦东新区'
        }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$message({
        message: '表单提交成功！',
        type: 'success'
      })
      console.log('表单数据：', this.form)
    },
    resetForm() {
      this.form = {
        username: '',
        password: '',
        city: ''
      }
    },
    handleEdit(row) {
      this.$message(`编辑用户：${row.name}`)
    },
    handleDelete(row) {
      this.$confirm('确认删除该用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    }
  }
}
</script>