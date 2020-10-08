import {SET_COMMENT_LIST} from "./mutation-types";

const app = {
  // 全局状态
  state: {
    // 评论列表
    commentList: [],
  },
  getters: {
    //类似于计算属性
    // 增加的方法
  },
  // 如果我们需要更改store中的状态，一定要通过mutations来进行操作
  mutations: {
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
