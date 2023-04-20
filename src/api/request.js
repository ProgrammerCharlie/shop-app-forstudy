import store from '@/store'
import axios from 'axios'
// 引入进度条包: nprogress{...start,done...}
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

const requests = axios.create({
  // 使请求的后端接口都带有的基础url地址：防止资源冲突
  baseURL: '/api',
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {
  nprogress.start()
  // 如果vuex内存在用户token，就在请求前携带token给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  // 配置对象：config{...Header...}，包含请求头
  return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return err.message
})

export default requests