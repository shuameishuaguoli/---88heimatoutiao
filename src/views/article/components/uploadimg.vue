<template>
<div>
    <!-- 一个等号是赋值，三个等号是比较 -->
        <!-- @click="centerDialogVisible=true" -->
    <div class="uploadimg" @click="onUploadshow">
    <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!--visible:控制对话框的显示和隐藏-->
    <el-dialog
    title="请选择文章封面图片"
    :visible.sync="centerDialogVisible"
    width="50%"
    center>
    <!-- 标签页组件start
        el-tabs中使用v-model的时候绑定的是标签页的name的值，只要标签页变了，activename的值也会跟着变
    -->
    <template>
        <el-tabs v-model="activename">
            <el-tab-pane label="素材库" name="allsucai">
                <el-radio-group v-model="collect">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
            </el-tab-pane>
            <el-tab-pane label="上传图片" name="uploadimg">上传图片</el-tab-pane>
        </el-tabs>
        <!-- gutter是间距的意思 -->
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in images" :key="index">
                <img height="100" width="100" :src="item.url" alt="">
            </el-col>
        </el-row>
    </template>
    <!-- 标签页组件end -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
export default {
  // 给组件起一个名字
  name: 'activeUploadimg',
  //   模型区
  data () {
    return {
      // 弹框的默认显示状态为false，因为是我点击内个上传加号的时候才显示这个弹窗
      centerDialogVisible: false,
      //   定义一个变量用来改变点击的是全部图片还是收藏图片 all就是全部图片，collec就是收藏图片  默认激活的图片类型 默认是all
      collect: false,
      //
      activename: 'allsucai',
      //   初始化一个变量用来接收所有图片素材的，因为获取到的数据是一个数组，所以我们初始化的时候也要是一个数组
      images: []
    }
  },
  //   方法区
  methods: {
    //   封装一个获取所有用户图片的方法
    onUploadshow () {
      //   将弹框是否显示设置成true
      this.centerDialogVisible = true
      // 获取本地token值
      const token = window.localStorage.getItem('token')
      //   发送请求
      this.$axios({
        //   请求路径
        url: '/user/images',
        // 请求方式
        method: 'GET',
        // 在请求头中携带token值
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送query需要接收的数据
        params: {
          collect: this.collect
        }
      }).then(res => {
        console.log(res)
        // 将获取到的内容赋值给到我们定义好的空数组中
        this.images = res.data.data.results
        console.log(this.images)
      }).catch(erro => {
        console.log(erro, '用户素材库获取失败啦')
      })
    }
  },
  //   钩子函数
  created () {

  }
}
</script>

<style>
.uploadimg{
    width:100px;
    height:100px;
    border-radius:50%;
    border:1px solid aqua;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
