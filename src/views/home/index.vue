<template>
  <div>
    <el-container>
      <el-aside  class="home-left" style="width: 219px">
        <div class="left-img" >
          <img src="../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- 下拉菜单 mode="horizontal" 默认是垂直方向，可以通过mode改变成水平方向 -->
        <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        @select="handleSelect"
        background-color="#353b4e"
        text-color="#adafb5"
        style="width:220px;"
        >
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">内容管理</template>
              <el-menu-item index="2-1">发布文章</el-menu-item>
              <el-menu-item index="2-2">内容列表</el-menu-item>
              <el-menu-item index="2-3">评论列表</el-menu-item>
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

      <el-container>
        <el-header>头部</el-header>
        <el-main>中部</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scope>
  .home-left{
    // 背景色
    background-color: #353b4e;
    // 高度  当前屏幕的百分百
    height: 100vh;
    overflow: hidden;
    .left-img{
      display: flex;
      align-items: center;
      justify-content: center;
      background-color:  #2e2f32;
      height: 65px;
      img{
        height: 30px;
      }
    }
  }
</style>
