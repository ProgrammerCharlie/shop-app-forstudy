import { reqBannerList, reqCategoryList, reqFloorList } from '../api'

const state = {
  // 服务器返回的数据以数组形式存储
  categoryList: [],
  bannerList: [],
  floorList: []
}

// 进行异步操作、与后端进行联系等操作
const actions = {
  // 三级联动ajax
  async getCategoryList(context) {
    // await修饰直接返回promise对象请求成功的数据结果
    let res = await reqCategoryList()
    // http状态码200
    if (res.code === 200) {
      context.commit("GETCATEGORYLIST", res.data)
    }
  },
  // 轮播图
  async getBannerList(context) {
    let res = await reqBannerList()
    if (res.code === 200) {
      context.commit('GETBANNERLIST', res.data)
    }
  },
  // floor
  async getFloorList(context) {
    let res = await reqFloorList()
    if (res.code === 200) {
      context.commit('GETFLOORLIST', res.data)
    }
  }
}

// 直接操作state中数据
const mutations = {
  GETCATEGORYLIST(state, value) {
    state.categoryList = value.slice(0, 16)
  },
  GETBANNERLIST(state, value) {
    // console.log(value)
    state.bannerList = value
  },
  GETFLOORLIST(state, value) {
    // console.log(value)
    state.floorList = value
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}