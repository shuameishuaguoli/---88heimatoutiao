<template>
        <!-- form表单中绑定的是整个信息对象 -->
    <el-form style="width:500px" :model="userinfo" label-width="80px">
        <!-- 用户头像start -->
        <el-form-item label="用户头像">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img width="100" v-if="imageUrl" :src="imageUrl" class="avatar">
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
        // 个人介绍
        intro: '',
        // 用户邮箱
        email: '',
        // 用户手机
        mobile: '',
        // 用户头像
        photo: ''
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
        this.$message({
          message: '用户信息修改成功',
          type: 'success'
        })
      }).catch(erro => {
        console.log(erro, '用户信息修改失败')
        this.$message.error('用户信息修改失败')
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
