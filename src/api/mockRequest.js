import axios from 'axios'
// 引入进度条包: nprogress{...start,done...}
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

const mockRequests = axios.create({
  // 使请求的后端接口都带有的基础url地址：防止资源冲突
  baseURL: '/mock',
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
mockRequests.interceptors.request.use((config) => {
  nprogress.start()
  // 配置对象：config{...Header...}，包含请求头
  return config;
})

// 响应拦截器
mockRequests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return err.message
})

export default mockRequests