<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>素材管理</span>
    <el-button size="small" type="primary">点击上传</el-button>
  </div>
  <div>
    <el-radio-group v-model="type" size="medium">
        <el-radio-button label="全部" >全部</el-radio-button>
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
export default {
  // 组件名
  name: 'material',
  //   模型区
  data () {
    return {
      // 绑定全部or收藏的v-model，默认选中全部
      type: '全部',
      //   定义一个空数组，用来接收一下从后台获取的所有图片素材
      allimages: []
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
        item.is_collected = !item.is_collected
      }).catch(erro => {
        console.log(erro, '删除失败')
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
