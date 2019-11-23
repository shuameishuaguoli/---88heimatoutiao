<template>
        <!-- form表单中绑定的是整个信息对象 -->
    <el-form style="width:500px" :model="userinfo" label-width="80px">
        <!-- 用户头像start
            从接口文档中我们得知，用户头像的请求方式是patch，而我们使用的elementUI中的el-upload默认的上传方式是post，所以我们要自定义上传方式，我们要使用http-request这个属性，这个属性的意思是覆盖默认的上传行为，可以自定义上传的实现
        -->
        <el-form-item label="用户头像">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :http-request="onloadimg"
                 >
                 <!-- 这里的v-if和v-else是一个判断的条件：意思是如果有图片，那么我就要显示图片，如果没有图片，好，那么我就显示加号 -->
                <img width="100" v-if="userinfo.photo" :src="userinfo.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <!-- 用户头像end -->
        <el-form-item label="用户昵称" >
            <el-input v-model="userinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
            <el-input v-model="userinfo.intro" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" >
            <el-input v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
            <!-- disabled是 -->
            <el-input disabled="disabled" v-model="userinfo.mobile"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
            <el-button type="primary" @click="onSave">保存修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// 引入eventbus
import eventbus from '@/utilsbus/eventbus.js'
export default {
  // 给组件取一个名字
  name: 'account',
  //   模型区
  data () {
    return {
      // 定义一个对象，用来接收从后台获取到的用户信息
      userinfo: {
        //   用户昵称
        name: '',
        // 用户头像
        photo: '',
        // 个人介绍
        intro: '',
        // 用户邮箱
        email: '',
        // 用户手机
        mobile: ''
      }
    }
  },
  //   方法区
  methods: {
    //   获取一下用户的登录信息
    // 封装一个获取用户登录信息的方法
    getUserinfo () {
      // 获取本地token
      const token = window.localStorage.getItem('token')
      //   发送请求
      this.$axios({
        // 请求地址
        url: '/user/profile',
        // 请求方式
        method: 'GET',
        // 在请求头中携带token值
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        //   打印一下从后台获取到的数据
        console.log(res)
        // 将获取到的用户数据赋值给到我们定义好的对象上
        this.userinfo = res.data.data
        console.log(this.userinfo)
      }).catch(erro => {
        console.log(erro, '获取用户信息失败')
      })
    },
    // 封装一个修改用户资料的方法
    onSave () {
      // 获取请求头
      const token = window.localStorage.getItem('token')
      //   发送请求
      this.$axios({
        // 请求地址
        url: '/user/profile',
        // 请求方式
        method: 'PATCH',
        // 在请求头中携带token
        headers: {
          Authorization: `Bearer ${token}`
        },
        // 发送body需要接受的参数，这里我们把用户信息封装到了userinfo中，所以我们只需要将userinfo传给body即可
        data: this.userinfo
      }).then(res => {
        console.log(res)
        // 用户信息更新成功之后，需要发布一下，通知头部组件，用户信息更改了，头部组件也要更改一下，后面可以传参数
        eventbus.$emit('upload-user', this.userinfo)
        this.$message({
          message: '用户信息修改成功',
          type: 'success'
        })
      }).catch(erro => {
        console.log(erro, '用户信息修改失败')
        this.$message.error('用户信息修改失败')
      })
    },
    // 封装一个用户头像上传的方法
    onloadimg (config) {
      // 获取请求头
      const token = window.localStorage.getItem('token')
      // new 一个formdata对象
      const fd = new FormData()
      console.log(config)
      // 在fd中添加字段，字段名要根据接口文档来
      fd.append('photo', config.file)
      //   发送请求
      this.$axios({
        // 请求地址
        url: '/user/photo',
        // 请求方式
        method: 'PATCH',
        // 发送data数据
        data: fd,
        // 在请求头中携带token
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        console.log(res)
        this.$message({
          message: '用户头像上传成功',
          type: 'success'
        })
        // 为了达到本地预览的功能，我们要将res中的photo的地址赋值给到data中photo
        this.userinfo.photo = res.data.data.photo
        // 用户信息更新成功之后，需要发布一下，通知头部组件，用户信息更改了，头部组件也要更改一下
        eventbus.$emit('upload-user', this.userinfo)
        console.log(this.photo)
      }).catch(erro => {
        console.log(erro, '用户头像上传失败')
      })
    }
  },
  //   钩子函数
  created () {
    //   调用一下获取用户信息的方法
    this.getUserinfo()
  }
}
</script>

<style>
</style>
