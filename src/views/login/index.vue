<template>
<!-- 我是登录页 -->
  <div class="login-div">
    <!-- 这里放一个卡片 -->
      <el-card class="login-card">
        <div class="login-img">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!--
          :model是绑定form表单中的所有数据
          :rules是约定的规则
          在页面中使用porp是绑定规则
          ref是为了获取DOM节点
        -->
        <el-form
        style="margin-top:33px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        >
            <!-- 手机号输入框 -->
            <el-form-item prop="phone">
              <!-- 在input框中使用v-model将input框中的数据进行双向绑定 -->
              <el-input v-model="ruleForm.phone" placeholder="请输入您的手机号"></el-input>
            </el-form-item>
            <!-- 手机号输入框 -->

            <!-- 验证码输入框 -->
            <el-row type="flex" justify="space-between">
              <el-form-item class="verification" prop="code" style="width:280px">
              <!-- 在input框中使用v-model将input框中的数据进行双向绑定 -->
                <el-input v-model="ruleForm.code" placeholder="请输入您的验证码"></el-input>
              </el-form-item>
              <el-button  style="height:40px">发送验证码</el-button>
            </el-row>
            <!-- 验证码输入框 -->

            <!-- 复选框 -->
            <el-form-item style="margin-top:2px" prop="checked">
              <el-checkbox v-model="ruleForm.checked">
                我已阅读并同意用户协议及条款
              </el-checkbox>
            </el-form-item>
            <!-- 复选框 -->

            <!-- 登录按钮 -->
            <el-form-item style="margin-top:25px">
               <el-button @click="onLogin" style="width:100%;" type="primary">登录</el-button>
            </el-form-item >
            <!-- 登录按钮 -->
        </el-form>
      </el-card>
  </div>
  <!--
    结论: 用到的**正则表达式**
    手机号: **/^1[3456789]\d{9}$/**
    6位数字:**/^\d{6}$/**
   -->
</template>

<script>
export default {

  data () {
    return {
      ruleForm: {
        // 获取手机号的数据
        phone: '',
        // 获取验证码的数据
        code: '',
        // 判断用户是否进行了勾选 因为是一个复选框，所以要将默认值设置成一个布尔值
        checked: false
      },
      rules: {
        // 手机号的验证规则  第一条规则是判断非空  trigger是什么时候进行判断，失去光标焦点的时候进行判断  pattern是写正则规则的
        phone: [{ required: true, message: '请输入您的手机号', trigger: 'blur' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trggle: 'blur' }],
        code: [{ required: true, message: '请输入您的验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        checked: [{ required: true, message: '请勾选用户条款及协议', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 点击的时候需要检测一下是否是都进行了勾选
    onLogin () {
      // alert('点击登录')
      // 验证整个表单是否符合规则 this.$refs.ruleForm是获取form表单中的内容，手动点击登录进行验证  this.$refs是获取DOM节点的方法。。
      this.$refs.ruleForm.validate(res => {
        if (res) {
          console.log('登录成功')
        }
      })
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
