import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入模块化的vuex仓库
import home from './home.js'
import search from './search.js'
import user from './user.js'
import detail from './detail.js'

const store = new Vuex.Store({
  modules: {
    home,
    search,
    user,
    detail
  }
})

export default store