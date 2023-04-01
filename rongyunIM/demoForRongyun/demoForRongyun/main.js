

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import axios from './components/request.js'
const RongIMLib = require('@rongcloud/imlib-v4')
// 应用初始化以获取 RongIMLib 实例对象，请务必保证此过程只被执行一次
const im = RongIMLib.init({ appkey: 'p5tvi9dspv574' });
Vue.config.productionTip = false
Vue.prototype.$im = im
Vue.prototype.$axios = axios
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif