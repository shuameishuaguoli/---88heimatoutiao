// 导入vue
import Vue from 'vue'
// 直接导出一个空vue实例，该模块导出一个空的vue实例
export default new Vue()
/*
    如何使用eventbus呢
    vue实例有两个用于通信的方法
    1.订阅
    在通信的的a端（组件）使用event-bus订阅一个自定义事件
    eventBus.$on('事件名称'，()=>{
        自定义逻辑代码
    })
    2.在通信的b端（组件），根据你的业务发布调用自定义事件
    eventBus.$emit('事件名称',如果有参数的话，就可以往这里写参数)
*/
