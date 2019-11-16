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
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item label="频道列表">
            <el-select   placeholder="请选择活动区域" v-model="formdata.city">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间选择 v-model=""-->
          <el-form-item label="时间选择">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 查询按钮 -->
          <el-form-item>
              <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
      <div>
      </div>
    </el-card>
    <!-- 表单卡片end -->

    <!-- 渲染数据卡片start -->
    <el-card class="box-card data-card">
      <div slot="header" class="clearfix">
        <span>共找到{{pageCount}}条符合条件的内容</span>
      </div>
      <div>
        <template>
          <!--
            v-loading是等待加载表格数据的等待状态
                v-loading的值是一个布尔值，如果为true，则是加载状态，值为false，则是关闭状态
            -->
          <el-table
            v-loading="loading"
            :data="listdata"
            style="width: 100%"
            >
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
              <!-- 两个按钮也是使用template标签  自定义标签-->
              <template>
                <el-button type="danger" @click.native="onDelete">删除</el-button>
                <el-button type="primary" @click.native="onEdit">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
    <!-- 渲染数据卡片end -->

    <!-- 分页start -->
    <el-card id="paging">
      <!--
        layout中的数据表示的意思是
          prev：表示的是上一页
          pager：是显示所有页数
          next：表示的是下一页
          background是背景色
          :total 表示的是总页数  这里的总页数的表现是：我们只需要将总记录的条数传递给       :tatle，elementUI中的分页插件会自动帮我们计算出总页数，其实这个插件的每页的条数默认是10条，总数据/10就是总页数，这个计算过程是分页插件帮我们做了，不需要我们自己来算
          @current-change="onPageChange"是注册事件
          disabled属性是设置页码是否禁用，这里需要传入一个布尔值，我们在这里将loading的值进行了传入，因为loading的是就是一个布尔值，达到的页面效果就是：当页面进行加载的时候需要，就需要让页码禁用，当加载完毕后，就将页码禁用功能进行关闭
       -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onPageChange"
        :total="pageCount"
        :disabled="loading"
        >
      </el-pagination>
    </el-card>
    <!-- 分页end -->
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
      // 定义一个数组，用来接收从服务器返回来的结果
      listdata: [],
      // 定义一个变量，用来接收总页数
      pageCount: 0,
      // 定义一个变量，用来初始化loading的数据  等待加载页面 初始化的值是false
      loading: false
    }
  },
  // 方法区
  methods: {
    // 定义一个发送请求的方法，这个请求中获取了所有的文章数据
    // 这里写了一个page=1的意思是，如果是第一次加载页面的时候，我们是默认显示的是第一条的数据，所以这里要给page一个默认值1；
    getcontent (page = 1) {
      // 这里将loading的值设置为true一下，因为只有设置成true了，等待加载的效果就激活成功了
      this.loading = true
      // 获取一下token值
      const token = window.localStorage.getItem('token')
      // 发送axios请求
      this.$axios({
        // url地址
        url: '/articles',
        // 请求方式
        method: 'GET',
        // 根据接口文档，查询(query)数据，发送的时候是写到params中的，params是和url，method这些参数是同级的，params的参数类型是一个对象类型
        params: {
          page
        },
        // 这里需要给将token放到请求头中，带到后台服务器
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        // 将res的返回值中的数据赋值给到data中定义的数组
        this.listdata = res.data.data.results
        this.pageCount = res.data.data.total_count
        // 打印一下这个数组
        console.log(this.listdata)
      }).finally(() => {
        // 当数据响应成功之后需要将loading的值设置为false
        this.loading = false
      })
    },
    // // 点击页面的时候调用的方法，这个形参page是这个事件的默认参数，形参名字随便写
    onPageChange (page) {
      console.log(page)
      // 现在这个当前页面的页码获取到了，需要将这个页面 发送请求
      this.getcontent(page)
    },
    // 点击查询按钮发送请求
    onQuery () {
      // 发送axios发送请求
      this.$axios({
        // 请求地址
        url: '/articles',
        // 请求方式
        method: 'GET',
        // 因为接口文档中的查询参数是query，所以我们要写到params中
        params: {

        }
      })
    },
    // 点击删除按钮
    onDelete () {
      // alert('我是删除按钮')
      // this.$confirm是elementUI组件库中提供的一种特殊的组件调用方式
      this.$confirm('确定要删除吗')
    },
    // 点击编辑按钮
    onEdit () {
      alert('我是编辑按钮')
    }
  },
  // 创建实例阶段
  created () {
  // 在还没有创建实例之前调用一下获取所有内容的方法
    this.getcontent()
  }
}
</script>

<style lang="less">
// 两个卡片中间有个20px的距离
.data-card{
    margin-top: 20px;
}
#paging{
  margin-top: 10px;
  // 采用flex布局
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
