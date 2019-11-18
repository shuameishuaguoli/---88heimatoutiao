<template>
  <div>
    <el-container>
      <!-- overflow:hidden是为了去掉滚动条 -->
      <el-aside  class="home-left" style="width: 218px; overflow: hidden;">
        <div class="left-img" style="width: 218px">
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- 下拉菜单 mode="horizontal" 默认是垂直方向，可以通过mode改变成水平方向
          router属性是我们要点击二级菜单的时候需要进行跳转，router的默认是false，router的值是一个默认值:default-active="activeIndex    @select="handleSelect""
        -->
        <el-menu
        class="el-menu-demo"
        background-color="#353b4e"
        text-color="#adafb5"
        style="width:220px;"
        router
        >
            <el-menu-item index="/layout">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">内容管理</template>
              <el-menu-item index="/article">发布文章</el-menu-item>
              <el-menu-item index="/content">内容列表</el-menu-item>
              <el-menu-item index="/comment">评论列表</el-menu-item>
              <el-menu-item index="2-4">素材管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">粉丝管理</template>
              <el-menu-item index="3-1">图文数据</el-menu-item>
              <el-menu-item index="3-2">粉丝概况</el-menu-item>
              <el-menu-item index="3-3">粉丝画像</el-menu-item>
              <el-menu-item index="3-4">粉丝列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">账户信息</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 头部和中部在一个容器中 -->
      <el-container style="background-color:#f2f3f5">
        <!-- 头部组件 -->
        <el-header>
          <out-header></out-header>
        </el-header>
        <!-- 中间内容区域 -->
        <el-main>
          <!-- 二级路由容器，子路由会渲染到这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入outheader.vue头部组件  在vue中header是一个关键字不能用header做标签名和文件名
import Outheader from '../../components/outheader.vue'
export default {
  // 这是给组件一个名字
  name: 'home',
  components: {
    'out-header': Outheader
  },
  // 方法区
  methods: {
    // 封装一个方法，当页面加载的时候调用这个方法
    warning () {
      this.$notify({
        title: '警告',
        message: '煞笔以为学习好，在社会就能站得住，到了工作岗位发现自己只会尼玛算术！',
        type: 'warning'
      })
    }
  },
  // 页面加载的时候执行，但是实例还没有创建好
  created () {
    // 调用一下警告的方法
    this.warning()
  }
}
</script>

<style lang="less" scope>
      // 给子菜单添加一下鼠标悬停的样式  但是，这里的el-menu-item是一个标签名，为什么需要加上.点呢？加点 . 不是给类选择器吗？搞不懂了，老师讲，在elementui中的标签名不能当做标签来使，如果要给elementui添加自定义样式，就要给标签名加  .   因为在浏览器中渲染出来的结果是普通标签，但是elementui的标签名就已经渲染成了普通标签的类名了，所以给elementui的标签添加自定义样式的时候，是用.标签名的样式来自定义样式
    .el-submenu .el-menu-item:hover{
        // 提高一下权重
        background-color: #409eff !important;
        color: #fff !important;
    }
  .home-left{
    // 背景色
    background-color: #353b4e;
    // 高度  当前屏幕的百分百
    height: 100vh;
    .left-img{
      display: flex;
      // 垂直居中
      align-items: center;
      // 水平居中
      justify-content: center;
      background-color:  #2e2f32;
      height: 65px;
      img{
        height: 30px;
      }
    }
  }
</style>
