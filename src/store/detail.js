import { reqGoodsInfo } from '../api/index'

const state = {
  goodsInfo: {}
}

const actions = {
  async getGoodsInfo(context, skuId) {
    const res = await reqGoodsInfo(skuId)
    if (res.code == 200) {
      context.commit('GETGOODSINFO', res.data)
    }
  }
}

const mutations = {
  GETGOODSINFO(state, val) {
    state.goodsInfo = val
  }
}

const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}