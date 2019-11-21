<template>
  <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>评论详情列表</span>
        </div>
        <!-- 内容区域 1196354762019176448
          使用table插件，默认只能显示文本内容，如果想要显示其他的内容比如图片按钮等等，我们需要使用template标签，自定义标签一下
        -->
         <el-table
          :data="commentList"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="头像"
            width="180">
            <!-- 使用自定义标签 -->
            <template slot-scope="scope">
              <img width="50" height="50" :src="scope.row.aut_photo">
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
            label="评论内容"
            width="180">
          </el-table-column>
          <el-table-column
            prop="is_liking"
            label="点赞">
            <!-- 使用三元表达式，判断scope.row.is_liking的值是否等于1，如果等于1显示已点赞，如果不等于1则显示未点赞 -->
            <template slot-scope="scope">
            <el-tag :type="state[scope.row.is_liking].type">{{state[scope.row.is_liking].lable}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="like_count"
            label="点赞数量">
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="评论日期">
          </el-table-column>
          <el-table-column
            label="是否推荐">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_top"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change='onchangestatus(scope.row)'
                >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="like_count"
            label="回复数量">
          </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
export default {
  // 给组件一个名字
  name: 'editComment',
  // 获取从上一个页面带过来的id值除了使用this.$route.params的方式获取，我们还可以使用props解耦的方式，也就是直接将路由参数直接映射给props中，然后就可以像访问data中的数据一样访问props中的数据
  props: {
    editcommentID: {
      // 配置一下id的数据类型
      type: String,
      // 配置一下是否是必须有的true为必须有的，false为不是必须有的
      required: true
    }
  },
  // 模型区
  data () {
    return {
      // 定义一个空数组，用来接收所有的文章评论参数
      commentList: [],
      state: [{
        type: 'danger',
        lable: '待点赞'
      }, {
        type: 'success',
        lable: '已点赞'
      }]
    }
  },
  // 方法区
  methods: {
    // 定义一个方法获取所有编辑评论的方法
    gitEditorial () {
      // 获取token值
      const token = window.localStorage.getItem('token')
      this.$axios({
        // 请求地址
        url: '/comments',
        // 请求方式
        method: 'GET',
        // 在请求头中携带token地址
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送一下query中的参数
        params: {
          // type是文档接口给定好的参数，a表示文章评论，c表示评论回复
          type: 'a',
          // source表示的是文章ID值
          source: this.editcommentID
        }
      }).then(res => {
        console.log(res)
        // 将获取到的文章评论内容赋值给到我们定义好的空数组
        this.commentList = res.data.data.results
        // 打印一下commentList看看能不能赋值成功
        console.log(this.commentList)
      }).catch(erro => {
        console.log(erro, '文章评论获取失败')
      })
    },
    // 点击推荐按钮的时候触发的方法
    onchangestatus (scope) {
      // 获取请求头
      const token = window.localStorage.getItem('token')
      // 打印一下，当前是否是推荐的
      console.log(scope.is_top, scope.aut_id)
      // 发送请求
      this.$axios({
        // 请求地址   1196354762019176448
        url: `/comments/${scope.com_id}/sticky`,
        // 请求方式
        method: 'PUT',
        // 在请求头中携带token值
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送body需要接收的参数
        data: {
          sticky: scope.is_top
        }
      }).then(res => {
        console.log(res)
        if (scope.is_top) {
          this.$message({
            message: '开启推荐',
            type: 'success'
          })
        } else {
          this.$message({
            message: '关闭推荐',
            type: 'warning'
          })
        }
      }).catch(erro => {
        console.log(erro, '推荐失败')
      })
    }
  },
  // 钩子函数
  created () {
    // 在钩子函数中调用一下获取文章评论的所以评论信息
    this.gitEditorial()
    console.log(this.editcommentID)
  }
}
</script>

<style>
</style>
