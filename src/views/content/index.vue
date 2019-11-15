<template>
  <div>
    <!-- 表单卡片start -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
        <el-form ref="form" :model="form">
          <el-form-item label="活动名称">
            <el-radio-group v-model="formdata.status">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item label="频道列表">
            <el-select   placeholder="请选择活动区域" v-model="formdata.city">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间选择 -->
          <el-form-item label="时间选择">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 查询按钮 -->
          <el-form-item>
              <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      <div>
      </div>
    </el-card>
    <!-- 表单卡片end -->

    <!-- 渲染数据卡片start -->
    <el-card class="box-card data-card">
      <div slot="header" class="clearfix">
      <span>共找到59806条符合条件的内容</span>
    </div>
      <div>
        <template>
          <el-table
            :data="listdata"
            style="width: 100%">
            <el-table-column
              prop="data"
              label="封面"
              width="180">
              <!-- 因为table自定义的标签只能是渲染文本类型 -->
              <!-- 自定义标签 -->
              <template slot-scope="scope">
                <!-- 这里的scope.row相当于item，遍历出来的每一项，遍历出来的每一项下面有一个cover属性 -->
                 <img  width="50" :src="scope.row.cover.images[0]" >
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <!-- 自定义标签 -->
              <template slot-scope="scope">
                <el-tag :type="state[scope.row.status].type">
                  {{state[scope.row.status].lable}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="pubdate"
              label="发布日期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <!-- 两个按钮也是使用template标签 -->
              <template>
                <el-button type="danger">删除</el-button>
                <el-button type="primary">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </div>
  </el-card>
    <!-- 渲染数据卡片end -->
  </div>
</template>

<script>
export default {
  name: 'content',
  // 模型区
  data () {
    return {
      state: [{
        type: '',
        lable: '草稿'
      }, {
        type: 'info',
        lable: '待审核'
      }, {
        type: 'success',
        lable: '审核通过'
      }, {
        type: 'warning',
        lable: '审核失败'
      }, {
        type: 'danger',
        lable: '已删除'
      }],
      // 初始化表单中的数据
      formdata: {
        // 单选框的数据初始化
        status: '',
        // 下拉框的数据初始化
        city: '',
        // 初始时间   开始时间  结束时间
        begin_pubdate: '',
        end_pubdate: ''
      },
      // 表格中的数据
      // tableData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1517 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1519 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1516 弄'
      // }],
      // 设置一个空数组，用来接收请求服务器后响应回来的数据
      listdata: []
    }
  },
  // 方法区
  methods: {
    // 定义一个发送请求的方法
    getcontent () {
      // 获取一下token值
      const token = window.localStorage.getItem('token')
      // 发送axios请求
      this.$axios({
        // url地址
        url: '/articles',
        // 请求方式
        method: 'GET',
        // 这里需要给将token放到请求头中，带到后台服务器
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        // 将res的返回值中的数据赋值给到data中定义的数组
        this.listdata = res.data.data.results
        console.log(this.listdata)
      })
    }
  },
  created () {
    this.getcontent()
  }
}
</script>

<style lang="less">
// 两个卡片中间有个20px的距离
.data-card{
    margin-top: 20px;
}
</style>
