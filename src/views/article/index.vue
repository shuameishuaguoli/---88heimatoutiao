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
      <div class="drop-down">
        <!-- 下拉框start -->
        <el-form-item  label="频道">
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
        <!-- 上传封面图片start -->
        <el-form-item label="封面">
          <!-- group中绑定的数据是图片的个数 -->
           <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 组件肯定是遍历出来的，因为有单图和三图和无图
            遍历的个数要和article.cover.type中的数字要进行绑定
            因为数字为-1的时候，控制台就会报错儿，因为v-for不能遍历数字为-1的个数
            所以我们要在遍历项外边儿添加包一层template标签，用来判断一下article.cover.type的值，只有!=-1的时候，才能进行循环，==-1就不循环，这样就避免了报错儿
           -->
           <template v-if="article.cover.type !== -1">
             <el-row :gutter="20">
               <!-- :gutter="20" 每个格子之间的间隔是20px -->
               <el-col :span="4" v-for="item in article.cover.type" :key="item">
                <actioveUploadimg ></actioveUploadimg>
               </el-col>
             </el-row>
           </template>
        </el-form-item>
        <!-- 上传封面图片end -->
        <!-- 按钮start -->
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)" size="small">发表</el-button>
          <el-button size="small" @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 按钮end -->
      </div>
    </el-form>
  </el-card>
</template>

<script>
// 在组件内部引入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 加载上传图片的组件
import actioveUploadimg from './components/uploadimg.vue'
// 加载富文本编辑器的核心组件
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'PublishArticles',
  components: {
    // 注册局部组件
    quillEditor,
    // 注册上传图片组件
    actioveUploadimg
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
          // 0表示的是无图 1表示1张图 3表示3张图 -1是自动
          type: 1,
          // 无图就是一个空数组，这个数组需要存储的是选中的图片的路径提交给后台
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
      // 点击发布和存入草稿之后需要判断有没有id
      // 获取一下文章ID
      let articleID = this.$route.params.articleID
      console.log('我的ID是', articleID)
      if (articleID) {
        if (draft) {
          // 调用一下编辑文章的方法
          this.editArticle(articleID, draft)
          this.$message({
            message: '编辑草稿成功哦~~',
            type: 'success'
          })
        } else {
          this.$message({
            message: '编辑文章成功哦~~',
            type: 'success'
          })
          // 调用一下编辑文章的方法
          this.editArticle(articleID, draft)
        }
      } else {
        if (draft) {
          this.$message({
            message: '存为草稿成功哦~~',
            type: 'success'
          })
          // 调用一下发布文章的方法
          this.publishArticle(draft)
        } else {
          this.$message({
            message: '发布文章成功哦~~',
            type: 'success'
          })
          // 调用一下发布文章的方法
          this.publishArticle(draft)
        }
      }
    },
    // 封装一个发布文章的方法
    publishArticle (draft) {
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
    },
    // 封装一个获取指定文章的内容
    getIDArticle () {
      //  获取一下token
      const token = window.localStorage.getItem('token')
      // 获取一下这个从前面带过来的ID
      let articleID = this.$route.params.articleID
      console.log(articleID)
      // 然后我们拿着这个id获取响应的文章的内容
      this.$axios({
        // 请求地址
        url: `/articles/${articleID}`,
        // 请求方式
        method: 'GET',
        // 请求中携带token
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // 打印一下根据ID获取到的数据
        console.log(res)
        // 将获取到的文章数据赋值给到定义好的对象中
        this.article = res.data.data
        console.log(this.article)
      })
    },
    // 封装一个根据ID修改文章的方法
    editArticle (articleid, draft) {
      // 获取一下本地的token
      const token = window.localStorage.getItem('token')
      // 发送请求
      this.$axios({
        // 请求路径
        url: `/articles/${articleid}`,
        // 请求方式
        method: 'PUT',
        // 在请求头中携带token值
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送query数据
        params: {
          draft
        },
        // 发送body数据
        data: this.article
      }).then(res => {
        console.log(res)
        // 编辑修改成功之后需要跳转一下文章列表页面
        this.$router.push('/content')
      }).catch(erro => {
        console.log(erro, '编辑失败')
      })
    }
  },
  // 组件加载时执行的选项
  created () {
    // 调用一下获取所有频道的方法
    this.getChannel()
    // 调用一下根据ID获取相应文章的方法
    this.getIDArticle()
  }
}
</script>

<style lang="less">
// 给富文本一个高度
.quill-editor{
  height: 300px;
}
// 按钮距离富文本的距离
.drop-down{
  margin-top: 120px;
}
</style>
