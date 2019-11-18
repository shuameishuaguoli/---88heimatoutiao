<template>
  <div>
    <!-- 评论列表的卡片start -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>品论管理</span>
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
            prop="address"
            label="评论状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
    </el-table>
      <!-- 表格table end -->

    </el-card>
    <!-- 评论列表的卡片end -->
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
      commentlist: []
    }
  },
  // 方法区
  methods: {
    // 定义一个方法是获取所有的评论类表的数据
    getCommentList () {
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
          // 后面的值传一个字符串类型
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.commentlist = res.data.data.results
        console.log(this.commentlist)
      }).catch(erro => {
        console.log('评论获取是被', erro)
      })
    }
  },
  // 生命周期的钩子函数  组件还没有渲染完成阶段
  created () {
    // 在created钩子函数中调用一下获取所有评论列表的方法
    this.getCommentList()
  }
}
</script>

<style>
</style>
