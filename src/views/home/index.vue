<template>
  <div>
    <el-container>
      <!-- overflow:hidden是为了去掉滚动条 -->
      <el-aside  class="home-left" style="width: 218px; overflow: hidden;">
        <div class="left-img" style="width: 218px">
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

      <!-- 头部和中部在一个容器中 -->
      <el-container style="background-color:#f2f3f5">

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
            <img src="../../assets/img/gongfu.jpg" alt="">
            <!-- 显示用户的登录名儿和点击后的下拉菜单 -->
            <el-row class="header-username">
              <el-col>
                <el-dropdown trigger="click">
                  <span>爱动的MC<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <!-- 用户名下的下拉菜单 -->
                  <el-dropdown-menu>
                      <el-dropdown-item>
                        账户信息
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <!-- 填一下GitHub地址 -->
                        <a href="https://github.com/shuameishuaguoli">git地址</a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        账户信息
                      </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <!-- 对头部信息进行布局end -->

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
