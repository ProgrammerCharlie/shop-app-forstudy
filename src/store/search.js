import { reqSearchInfo } from '../api'

const state = {
  searchInfo: {}
}

const actions = {
  // 向服务器传递的参数至少是一个空对象
  async getSearchInfo(context, value = {}) {
    let res = await reqSearchInfo(value)
    context.commit('GETSEARCHINFO', res.data)
  }
}

const mutations = {
  GETSEARCHINFO(state, value) {
    state.searchInfo = value
  }
}

const getters = {
  goodsList(state) {
    // 若无网络情况下返回空数组
    return state.searchInfo.goodsList||[]
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList||[]
  },
  attrsList(state) {
    return state.searchInfo.attrsList||[]
  },
  total(state) {
    return state.searchInfo.total
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}