import { reqCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '../api'

// 登录注册模块
const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo:{}
}

const actions = {
  // 获取验证码
  async getCode(context,val) {
    let res = await reqCode(val)  
    // console.log(res)  // {data:code}
    if (res.code == 200) {
      context.commit('GETCODE', res.data)
      return res.message
    } else {
      return '失败！'
    }
  },

  // 用户注册
  async userRegister(context,val) {
    let res = await reqUserRegister(val)
    // console.log(res)  // {data:null}
    if (res.code == 200) {
      return res.message
    } else {
      return '失败！'
    }
  },

  // 用户登录
  async userLogin(context,val) {
    let res = await reqUserLogin(val)
    console.log(res)  // {data:{token,...}}
    if (res.code == 200) {
      context.commit('USERLOGIN', res.data.token)
      // 本地存储：持久化存储token
      localStorage.setItem('TOKEN',res.data.token)
      return res.message
    } else {
      return '失败！'
    }
  },

  async getUserInfo(context) {
    let res = await reqUserInfo()
    console.log(res)  // {...}
    if (res.code == 200) {
      context.commit('GETUSERINFO', res.data)
      return res.message
    } else {
      return '失败!'
    }
  },

  async userLogout(context) {
    let res = await reqLogout()
    if (res.code == 200) {
      context.commit('USERLOGOUT')
    } else {
      return '失败！'
    }
  }
}

const mutations = {
  GETCODE(state,val) {
    state.code = val
  },
  
  USERLOGIN(state,val) {
    state.token = val
  },

  GETUSERINFO(state,val) {
    state.userInfo = val
  },
  
  USERLOGOUT(state) {
    // 该操作把token置为null
    localStorage.removeItem('TOKEN')
    // 该操作又把token置为空字符串
    state.token = ''
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}