<template>
<!-- 我是登录页 -->
  <div class="login-div">
    <!-- 这里放一个卡片 -->
      <el-card class="login-card">
        <div class="login-img">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form style="margin-top:33px">
            <!-- 手机号输入框 -->
            <el-form-item >
              <el-input placeholder="请输入您的手机号"></el-input>
            </el-form-item>
            <!-- 手机号输入框 -->

            <!-- 验证码输入框 -->
            <el-row type="flex" justify="space-between">
              <el-form-item class="verification" style="width:280px">
                <el-input placeholder="请输入您的验证码"></el-input>
              </el-form-item>
              <el-button style="height:40px">发送验证码</el-button>
            </el-row>
            <!-- 验证码输入框 -->

            <!-- 复选框 -->
            <el-form-item style="margin-top:2px">
              <el-checkbox>
                我已阅读并同意用户协议及条款
              </el-checkbox>
            </el-form-item>
            <!-- 复选框 -->

            <!-- 登录按钮 -->
            <el-form-item style="margin-top:25px">
               <el-button style="width:100%;" type="primary">登录</el-button>
            </el-form-item >
            <!-- 登录按钮 -->
        </el-form>
      </el-card>
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
// 注释一下，这里的lang="less"，意思是将在style标签中可以使用less语法，类名中可以进行嵌套方式使用。
// scope的意思是这个style的样式只在当前的组件中有效，如果不添加scope这个属性的话，这个组件中的样式就是在全局作用域都有效
<style lang="less" scope>
.login-div{
  // 给div一个高度，可以让背景色显示出来
  height: 100vh;
  // 引入图片，当做背景图片
  background-image: url('../../assets/img/login_bg.jpg');
  // 铺满屏幕
  background-size: cover;
  // 对div进行flex布局
  display: flex;
  align-items: center;
  justify-content: center;
  .login-card{
    height:360px;
    width:  440px;
  }
  .login-img{
    // div设置成flex布局
    display: flex;
    justify-content: center;
    img{
      height: 45px;
    }
  }
}
</style>
