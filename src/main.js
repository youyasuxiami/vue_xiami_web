import Vue from 'vue'

// 导入路由库
import VueRouter from 'vue-router'

// 导入路由文件夹
import router from './router'

// 导入 ElementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

// 引入公共css
import '../static/css/ckeditor.css'
import '../static/css/index.css'
// 安装路由
Vue.use(VueRouter);

// 安装 ElementUI
Vue.use(ElementUI);

new Vue({
  el: '#app',
  // 启用路由
  router,
  // 启用 ElementUI
  render: h => h(App)
});
