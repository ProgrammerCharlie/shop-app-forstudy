// 引入路由组件
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'

export default [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    component: Home,
    meta: { isFooterShow: true, title: '瑞品汇首页', isNavShow: true }
  },
  {
    path: '/login',
    component: Login,
    meta: { isFooterShow: false, title: '瑞品汇登录页', isNavShow: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { isFooterShow: false, title: '瑞品汇注册页', isNavShow: true }
  },
  {
    name: "search",
    path: '/search/:keyword?',
    component: Search,
    meta: { isFooterShow: true, title: '瑞品汇搜索页', isNavShow: false },
    // 函数写法
    // props($route) {
    //   return {
    //     // keyword:$route.params.k
    //     keyword: $route.query.keyword
    //   }
    // }
  },
  {
    name: "detail",
    path: "/detail/:skuId",
    component: Detail,
    meta: { isFooterShow: true }
  }
]