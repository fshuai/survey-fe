import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false

// 配置请求根路径
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

let loadingInstance = null

// 配置请求拦截器
axios.interceptors.request.use(config => {
  config.headers['x-platform'] = 'admin'
  config.headers.authorization = localStorage.getItem('token')
  loadingInstance = ElementUI.Loading.service({ fullscreen: true })
  return config
})

axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
}, error => {
  loadingInstance.close()
  return Promise.reject(error)
})

Vue.use(ElementUI)

// 通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
