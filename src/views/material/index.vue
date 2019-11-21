<template>
  <el-card class="box-card">
    <el-button
    style="float: right;"
    size="small"
    type="success"
    @click="onhandload"
    >手动上传图片</el-button>
    <!-- 定义一个文件域标签 因为不是特别好看，所以我们要将这个标签暂时隐藏 属性hidden就可以直接隐藏 -->
    <input type="file" ref="fileself" hidden @change="fileChange">
  <div slot="header" class="clearfix">
    <span>素材管理</span>
    <!-- 点击上传start
        on-success：是上传成功后的参数回调
        headers:是设置上传的请求头
        name：是上传的数据的字段名  从接口文档中获取
        文件上传是从标签中发送请求
    -->
        <el-upload
            class="upload-demo"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            multiple
            :on-success="onloadSuccess"
            :headers="sendHeader"
            name="image"
            :show-file-list="false"
            >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    <!-- 点击上传end -->

  </div>
  <div>
    <el-radio-group v-model="type" size="medium" @change="onFind">
        <el-radio-button label="全部">全部</el-radio-button>
        <el-radio-button label="收藏">收藏</el-radio-button>
    </el-radio-group>
  </div>
  <!-- 图片展示区域start -->
  <div style="margin-top:20px">
    <el-row :gutter="20">
        <el-col :span="6" style="margin-bottom:20px" v-for="(item, index) in allimages" :key="index">
            <el-card style="height:250px; width:200px; display: flex; justify-content:space-between">
                <img width="150" height="150" :src="item.url">
                <div
                style="
                padding: 14px;
                border:1px solid red;
                display: flex;
                justify-content:space-between;
                font-size:25px;
                ">
                    <i
                        :class="{
                            'el-icon-star-on':item.is_collected,
                            'el-icon-star-off':!item.is_collected
                            }"
                        @click="onOnOff(item)"
                        style="cursor: pointer;"
                    >
                    </i>
                    <!-- 点击垃圾箱图标的时候需要把id传给后台 -->
                    <i @click="onclear(item.id)" class="el-icon-delete-solid" style="cursor: pointer;"></i>
                </div>
            </el-card>
        </el-col>
    </el-row>
  </div>
  <!-- 图片展示区域end -->
</el-card>
</template>

<script>
//   获取token值
const token = window.localStorage.getItem('token')
export default {
  // 组件名
  name: 'material',
  //   模型区
  data () {
    return {
      // 绑定全部or收藏的v-model，默认选中全部
      type: '全部',
      //   定义一个空数组，用来接收一下从后台获取的所有图片素材
      allimages: [],
      //   给上传组件用的请求头
      sendHeader: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  //   方法区
  methods: {
    //   封装一个获取所有素材图片的一个方法
    // 暂定给isCollect一个初始值为false  false--->全部图片   true--->收藏图片
    getImages (isCollect = false) {
      // 获取请求头
      const token = window.localStorage.getItem('token')
      this.$axios({
        // 请求地址
        url: '/user/images',
        // 请求方式
        method: 'GET',
        // 在请求头中携带token
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送query所需要的参数
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        console.log(res.data.data.results)
        // 将获取到的所有图片素材赋值给到我们定义的空数组中
        this.allimages = res.data.data.results
        console.log(this.allimages)
      }).catch(erro => {
        console.log(erro, '获取图片素材失败')
      })
    },
    // 定义一个方法是删除图片素材的方法
    onclear (imgID) {
      this.$confirm('确定要将图片删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 获取token值
        const token = window.localStorage.getItem('token')
        console.log(imgID)
        //   发送请求
        this.$axios({
          //   请求地址
          url: `/user/images/${imgID}`,
          // 请求方式
          method: 'DELETE',
          // 在请求头中携带token
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          console.log(res)
          //   删除成功之后需要重新加载一下所有图片素材
          this.getImages()
        }).catch(erro => {
          console.log('图片删除失败', erro)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 定义一个方法，判断点击的是否是收藏，如果是收藏则发送请求
    onOnOff (item) {
      const token = window.localStorage.getItem('token')
      // 发送请求
      this.$axios({
        // 请求地址
        url: `/user/images/${item.id}`,
        // 请求方法
        method: 'PUT',
        // 在请求头中携带token
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送body数据
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        console.log(res)
        if (item.is_collected) {
          this.$message({
            message: '取消收藏',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '收藏成功',
            type: 'success'
          })
        }
        // 更新视图展示
        item.is_collected = !item.is_collected
      }).catch(erro => {
        console.log(erro, '删除失败')
      })
    },
    // 点击收藏的时候需要调用一下获取全部
    onFind (value) {
      console.log(value)
      //   判断一下value的值是不是‘全部’儿子
      this.getImages(value !== '全部')
    },
    // 图片上传成功之后调用的方法
    onloadSuccess () {
      // 图片上传成功之后需要重新加载一下素材图片
      this.getImages(this.type !== '全部')
      //   上传成功之后需要提示一下用户
      this.$message({
        message: '图片上传成功',
        type: 'success'
      })
      // 调用一下获取所有素材图片的方法
    },
    // 点击自定义方法上传的时候调用的方法
    onhandload () {
      // 看看能不能获取file文件域
      //   console.log(this.$refs.fileself)
      // 我们要实现点击按钮的时候触发file文件域
      this.$refs.fileself.click()
    },
    // 监听到input file中的内容发生改变的时候，就会触发这个方法
    fileChange () {
      // 获取token值
      const token = window.localStorage.getItem('token')
      // 首先我们先获取到上传的这个文件对象
      const fileObj = this.$refs.fileself.files[0]
      //   创建一个formdata对象
      const fdata = new FormData()
      //   手动往表单中添加一个文件  参数1表示的字段名，参数二表示的是存放的文件对象
      fdata.append('image', fileObj)
      //   发送请求
      this.$axios({
        //   请求地址
        url: '/user/images',
        // 请求方式
        method: 'POST',
        // 在请求头中携带token值
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送请求参数，这里传的是fdata对象
        data: fdata
      }).then(res => {
        // console.log(res)
        // 图片上传成功之后需要重新加载一下素材图片
        this.getImages(this.type !== '全部')
        // 上传成功之后需要给用户一个提示
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      }).catch(erro => {
        console.log(erro, '上传文件失败')
      })
    }

  },
  //   在声明周期created中
  created () {
    //   调用一下获取全部素材的方法
    this.getImages()
  }
}
</script>

<style lang="less">
.clearfix{
    display: flex;
    justify-content: space-between;
}
// 每个图片卡片的高度和宽度
.sty{
    height: 200px;
    width: 200px;
    display: flex;
}
</style>
