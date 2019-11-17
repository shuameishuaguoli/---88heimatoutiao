<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>发布文章</span>
    </div>
    <el-form ref="form" label-width="80px">
      <!-- 标题start -->
        <el-form-item label="标题">
          <el-input size="small" v-model="article.title"></el-input>
        </el-form-item>
      <!-- 标题end -->
      <!-- 富文本编辑器star -->
        <!-- 使用富文本编辑器的特有的标签，写了这个标签之后就是引用了这个组件
          v-model实现双向绑定
        -->
        <el-form-item label="内容">
          <quill-editor
          v-model="article.content"
          ref="myQuillEditor"
          >

          </quill-editor>
        </el-form-item>
      <!-- 富文本编辑器end -->
      <!-- 下拉框start -->
      <el-form-item label="频道">
        <!-- select 需要得到的是一个id值  循环生成谁就将v-for添加到谁的上边
        :value 是获取的id值
        :label 是展示的内容
        -->
        <el-select placeholder="请选择频道" v-model="article.channel_id">
          <el-option
          v-for="(item, index) in channellist"
          :label="item.name"
          :value="item.id"
          :key="index"></el-option>
        </el-select>
      </el-form-item>
      <!-- 下拉框end -->
      <!-- 按钮start -->
      <el-form-item>
        <el-button type="primary" @click="onPublish(false)" size="small">发表</el-button>
        <el-button size="small" @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
      <!-- 按钮end -->
    </el-form>
  </el-card>
</template>

<script>
// 在组件内部引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishArticles',
  components: {
    // 注册局部组件
    quillEditor
  },
  // 模型区
  data () {
    return {
      // 定义一个对象给表单绑定数据
      article: {
        // 绑定表头内容
        title: '',
        // 绑定文章内容
        content: '',
        // 绑定频道ID
        channel_id: '',
        // 这个图片的对象我们先给写死，因为我们还没有开始做上传图片的功能
        cover: {
          // 0表示的是无图
          type: 0,
          // 无图就是一个空数组
          images: []
        }
      },
      // 定义一个数组，用来接收从服务器响应回来的频道信息
      channellist: []
    }
  },
  // 方法区
  methods: {
    // 定义一个获取所有频道的方法
    getChannel () {
      // 发送请求
      this.$axios({
        // 请求地址
        url: '/channels',
        // 请求方式
        method: 'GET'
      }).then(res => {
        // 打印一下服务器响应回来的内容
        console.log(res)
        // 将获取到的频道类表赋给在模型中定义好的数组
        this.channellist = res.data.data.channels
        // 打印一下看看是否是真的赋给channellist了
        console.log(this.channellist)
      }).catch(erro => {
        console.log('频道获取失败', erro)
      })
    },
    // 发表文章的方法
    onPublish (draft) {
      // 获取token值
      const token = window.localStorage.getItem('token')
      console.log(token)
      // 发送请求
      this.$axios({
        // 请求地址
        url: '/articles',
        // 请求方式
        method: 'POST',
        // 发送请求头
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Query请求参数，因为判断上上传的是否是草稿的参数是query形式，所有我们要将参数写到params中
        params: {
          draft
        },
        // body请求参数，我们要放到data中
        data: this.article
      }).then(res => {
        // 打印一下响应回来的内容
        console.log(res)
        // 添加成功之后需要跳转到内容列表页面
        this.$router.push('/content')
        // 跳转成功之后，就自动的将发布文章内容的页面中的用户数输入的内容进行了清空
      }).catch(erro => {
        console.log('发表失败', erro)
      })
    }
  },
  // 组件加载时执行的选项
  created () {
    // 调用一下获取所有频道的方法
    this.getChannel()
  }
}
</script>

<style>
</style>
