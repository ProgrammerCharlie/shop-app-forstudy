// 请求的后端api统一管理
import requests from "./request";
import mockRequests from './mockRequest'

// 三级联动组件的数据接口：
// api/product/getBaseCategoryList  GET  无参数
export const reqCategoryList = () => {
  // axios发请求: 前提解决跨域proxy配置项
  return requests({
    // 此种写法(未加协议名域名端口号)默认向本地服务器发请求：
    // localhost: 8080
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
}

// 请求banner轮播图组件的数据(mock)
export const reqBannerList = () => {
  // axios发请求
  return mockRequests({
    url: '/banner',
    method: 'GET'
  })
}

// 请求floor轮播图组件的数据(mock)
export const reqFloorList = () => {
  return mockRequests({
    url: '/floor',
    method: 'GET'
  })
}

// Search组件的数据接口
// /api/list  POST  有参数{...}
export const reqSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'POST',
    data: params
  })
}

// Detail组件的数据接口
// /api/item/{ skuId }  GET 
export const reqGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}

// 登录注册组件的数据接口
// 返回验证码
// /api/user/passport/sendCode/{phone}  GET
export const reqCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
}
// 用户注册
// /api/user/passport/register   POST   {phone code password}
export const reqUserRegister = (data) => {
  return requests({
    url: '/user/passport/register ',
    method: 'POST',
    data
  })
}
// 用户登录
// /api/user/passport/login   POST   {phone password}
export const reqUserLogin = (data) => {
  return requests({
    url: '/user/passport/login',
    method: 'POST',
    data
  })
}
// 获取用户信息
// /api/user/passport/auth/getUserInfo  GET  请求头token
export const reqUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method:'GET'
  })
}
// 用户推出登录
// /api/user/passport/logout   GET
export const reqLogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'GET'
  })
}
