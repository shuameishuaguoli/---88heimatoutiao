<template>
  <div>
    <!-- 评论列表的卡片start -->
    <el-card
    class="box-card"
    v-loading="loading"
    >
        <div slot="header" class="clearfix">
          <span>评论管理-共找到{{totleChange}}条数据</span>
        </div>
      <!-- 表格table start -->
        <el-table
          :data="commentlist"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="total_comment_count"
            label="总评论数"
            width="180">
          </el-table-column>
          <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数据">
          </el-table-column>
          <el-table-column
            label="评论状态">
            <!-- 使用template的前提是：我们需要知道在elementUI这个工具中若是使用表格组件儿的话，表格组件儿默认渲染的内容只能是文本内容（也就是文字），若是想在表格中渲染其他格式的内容，比如说图片（img），按钮（button）等等，我们就要使用template标签，template标签有一个属性是slot-scope="scope"，这个顺序性相当于我们使用的v-for，template标签中的子标签使用的scope.row相当于v-for中遍历出来的内个每一项item，我们如果想要获取到每一项下的属性的时候，我们就直接scope.row . (点)就行啦-->
            <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.comment_status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="onChange(scope.row)"
                  >
                </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template>
                <el-button
                size="small"
                type="primary"
                >
                修改
                </el-button>
            </template>
          </el-table-column>
    </el-table>
      <!-- 表格table end -->
    </el-card>
    <!-- 评论列表的卡片end -->
    <!-- 页码卡片start :disabled="loading"这个属性是页码禁用-->
    <el-card class="pagecard">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totleChange"
          @current-change="currentChange"
          :disabled="loading"
          >
        </el-pagination>
    </el-card>
    <!-- 页码卡片end -->
  </div>
</template>

<script>
export default {
  // 给组件取一个名字
  name: 'commentList',
  // 模型区，模型区中放的是数据 数据驱动视图
  data () {
    return {
      // 在模型中定义一个数组，用来接收一下从服务器响应回来是所有评论的数据列表，这里要知道问什么定义一个数组类型，其实主要是根据服务器响应回来的数据的类型来定义的，因为服务器响应回来的评论列表的数据类型是一个数组类型，为了方便赋值，所以我们要定义一个空数组来接收一下
      commentlist: [],
      // 初始化一个page用来接收当前页
      page: 1,
      // 初始化一个totleChange用来接收总页码
      totleChange: 0,
      // 初始化一个loading为true，这是等待效果
      loading: true
    }
  },
  // 方法区
  methods: {
    // 定义一个方法是获取所有的评论类表的数据
    getCommentList (page) {
      // 调用方法的时候开启loading
      this.loading = true
      // 获取一下存放到本地的token值
      const token = window.localStorage.getItem('token')
      // 发送请求
      this.$axios({
        url: '/articles',
        method: 'GET',
        // 发送请求头
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          page,
          // 后面的值传一个字符串类型
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        // 把后台响应回来的数据赋值给到定义好的数组中
        this.commentlist = res.data.data.results
        console.log(this.commentlist)
        // 把总页数赋值给到总页数变量
        this.totleChange = res.data.data.total_count
      }).catch(erro => {
        console.log('评论获取失败', erro)
      }).finally(() => {
        // 在finnaly中关闭掉loading
        this.loading = false
      })
    },
    // 定义一个方法是改变评论状态的方法，改变请求状态是要发送请求的
    onChange (scopRow) {
      // 获取token值
      const token = window.localStorage.getItem('token')
      // 发送请求
      this.$axios({
        // 请求地址
        url: '/comments/status',
        // 请求方式
        method: 'PUT',
        // 在请求头中携带token
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 将id放到params中
        params: {
          // 这里要注意，这个id一定要转成字符串形式
          article_id: scopRow.id.toString()
        },
        data: {
          allow_comment: scopRow.comment_status
        }
      }).then(res => {
        // console.log(res)
        // 打印一下当前的开关状态
        console.log(scopRow.comment_status)
        // scopRow.comment_status?true:false
        if (scopRow.comment_status) {
          this.$message({
            message: '评论状态已开启',
            type: 'success',
            showClose: true // 弹窗可关闭
          })
        } else {
          this.$message({
            message: '评论状态已关闭',
            type: 'error',
            showClose: true // 弹窗可关闭
          })
        }
      }).catch(erro => {
        console.log(erro, '状态修改失败')
      })
    },
    // 点击页码的时候调用这个方法
    currentChange (page) {
      // 获取一下当前页面
      console.log(page)
      // 调用一下获取评论列表的方法
      this.getCommentList(page)
    }
  },
  // 生命周期的钩子函数  组件还没有渲染完成阶段
  created () {
    // 在created钩子函数中调用一下获取所有评论列表的方法
    this.getCommentList()
  }
}
</script>

<style lang="less">
// 页码样式
.pagecard{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
