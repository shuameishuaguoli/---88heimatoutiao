<template>
   <!-- 对头部信息进行布局start -->
        <el-header class="home-header">
          <!-- 头部左边 -->
          <div class="header-left">
              <!-- 字体 -->
              <i class="el-icon-s-unfold icon"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
          </div>
          <!-- 头部右边 -->
          <div class="header-right">
            <!-- 搜索的图标prefix-icon="el-icon-search"是在input框的首部添加图标-->
            <!-- 搜索框  使用v-model进行数据的双向绑定-->
            <div>
              <!-- 这个标签el-tooltip是信息提示标签 placement是提示的方向 content是提示的信息内容  effect是具有了提示功能 -->
              <el-tooltip
              placement="bottom"
               content="搜索"
               effect="dark">
                  <el-input
                  size="medium"
                  prefix-icon="el-icon-search"
                  v-model="search"
                  placeholder="请输入搜索的文章内容"
                  autofocus="autofocus"
                  ></el-input>
              </el-tooltip>
            </div>
              <!--  -->
              <el-tooltip
                placement="bottom"
                content="消息"
                effect="dark"
              >
                <span style="font-size:20px">消息</span>
              </el-tooltip>
            <!-- 引入头像  其实真正是从数据库中请求到头像显示在这儿的 -->
            <img :src="userinfo.photo" alt="">
            <!-- 显示用户的登录名儿和点击后的下拉菜单 -->
            <el-row class="header-username">
              <el-col>
                <el-dropdown trigger="click">
                  <span>{{userinfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <!-- 用户名下的下拉菜单 -->
                  <el-dropdown-menu>
                      <el-dropdown-item>
                        账户信息
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <!-- 填一下GitHub地址 -->
                        <a href="https://github.com/shuameishuaguoli">git地址</a>
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="onGoout">
                        <el-button type="text" >退出</el-button>
                      </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <!-- 对头部信息进行布局end -->
        <!--
          // 点击了退出之后需要做两件事儿
      // 第一件事儿是：销毁本地的token值
      window.localStorage.removeItem('token')
      // 第二件事儿是跳转到登录页面
      this.$router.push('/')
         -->
</template>

<script>
// 因为是头部的信息要跟更新后的用户书数据进行更新，所以是头部进行订阅，账户信息页进行发布
// 先引入eventbus
import eventbus from '@/utilsbus/eventbus.js'
export default {
  name: 'objheader',
  data () {
    return {
      userinfo: {
        //   用户昵称
        name: '',
        // 用户头像
        photo: ''
      }
    }
  },
  // 方法区
  methods: {
    // 退出时调用的方法
    onGoout () {
      this.$confirm('确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击了退出之后需要做两件事儿
      // 第一件事儿是：销毁本地的token值
        window.localStorage.removeItem('token')
        // 第二件事儿是跳转到登录页面
        this.$router.push('/')
        this.$message({
          type: 'success',
          message: '您已退出'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
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
    }
  },
  // 钩子函数
  created () {
    // 调用一下获取用户信息的方法
    this.getUserinfo()
    // 在钩子函数中监听自定义事件
    eventbus.$on('upload-user', userinfo => {
      // this.userinfo = userinfo
      this.userinfo.name = userinfo.name
      this.userinfo.photo = userinfo.photo
      // console.log('我被调用了')
    })
  }
}
</script>

<style lang="less">
    // 对头部div进行样式设置
  .home-header{
    height: 55px;
    background-color: #fff;
    display: flex;
    align-items: center;
    // 水平均分
    justify-content: space-between;
    .header-left,.header-right{
      height: 100%;
    }
    .header-left{
      flex: 6;
      display: flex;
      align-items: center;
      // 字体图标也是用font-size来设置大小
      font-weight: normal;
      .icon{
        font-size: 25px;
        // 鼠标放上去是一个小手的形状
        cursor: pointer;
      }
      span{
        margin-left: 10px;
        font-size: 18px;
      }
    }
    // 头部右边的的样式
    .header-right{
      flex: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // 头像样式
      img{
        width: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      // 用户名的样式
      .header-username{
        // 鼠标放到了用户名儿上的时候变成一个小手形状
        cursor: pointer;
      }
    }
  }
</style>
