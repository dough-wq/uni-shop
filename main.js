// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入$http对象
import {
  $http
} from '@escook/request-miniprogram'
import store from './store/store'

Vue.config.productionTip = false

App.mpType = 'app'

uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'
// $http.baseUrl = 'https://applet-base-api-t.itheima.net'
// 请求开始之前做一些事情（请求拦截器）
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })

  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装的展示消息提示的方法
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}


const app = new Vue({
  ...App,
  // 将store挂载到vue实例上
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
