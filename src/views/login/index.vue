<template>
<!-- 我是登录页 -->
  <div class="login-div">
      我是登录页
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
}
</style>
