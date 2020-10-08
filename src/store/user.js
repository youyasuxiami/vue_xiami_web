import {SET_USER_INFO, SET_LOGIN_STATE,SET_COMMENT_LIST} from "./mutation-types";

import imgsrc from "../../public/images/defaultAvatar.png"
const app = {
  // 全局状态
  state: {
    // 用户信息
    userInfo: {},//aliPay、avatar、name、userId、weixinPay
    isLogin: false,
  },
  // getters是对数据的包装，例如对数据进行拼接，或者过滤
  getters: {
    //类似于计算属性
    getUserPhoto(state) {
      if(state.isLogin) {
        console.log("state.userInfo.avatar")
        console.log(state.userInfo.avatar)
        if(state.userInfo.avatar) {
          return state.userInfo.avatar
        } else {
          return "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
        }
      } else {
        return imgsrc
      }
    }
  },
  // 如果我们需要更改store中的状态，一定要通过mutations来进行操作
  mutations: {

    // 传入自定义参数
    [SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo
    },
    [SET_LOGIN_STATE](state, isLogin) {
      state.isLogin = isLogin
    },
    // 传入自定义参数
    [SET_COMMENT_LIST](state, commentList) {
      state.commentList = commentList
    },
  },

  // actions是我们定义的一些操作，正常情况下，我们很少会直接调用mutation方法来改变state
  actions: {

  }
}
export default app
