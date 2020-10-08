import Vue from 'vue'
import $ from 'jquery'
// 导入路由库
import VueRouter from 'vue-router'

// 导入路由文件夹
import router from './router'

//导入store
import store from './store'

// 导入 ElementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

// 引入公共css
import "@/assets/iconfont/iconfont.css"
import '../public/css/ckeditor.css'
import '../public/css/index.css'
// 安装路由
Vue.use(VueRouter);

// 安装 ElementUI
Vue.use(ElementUI);

// 自定义指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  // let blocks = el.querySelectorAll('pre code');
  // let blocks = el.querySelectorAll('code');
  // let blocks = el.querySelectorAll(':not(pre) > code[class*="language-"],pre[class*="language-"] ');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

// 定义xss
import xss from 'xss'
// 定义全局XSS解决方法
Object.defineProperty(Vue.prototype, '$xss', {
  value: xss
})

new Vue({
  el: '#app',
  // 启用路由
  router,
  store,
  // 启用 ElementUI
  render: h => h(App)
});
