import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

// 二次封装push
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // 程序员传入成功和错误函数的情况
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  // 一级路由
  routes,
  // 路由跳转后的滚动行为:自动跳转到最顶部
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

// 全局后置路由守卫实现title切换
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title //修改网页的title
  } else {
    document.title = '瑞品汇'
  }
})

export default router