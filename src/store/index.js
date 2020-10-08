import Vue from 'vue';
import Vuex from 'vuex';
import user from './user'
import comment from './comment'
Vue.use(Vuex);
const store = new Vuex.Store({

    // 将app和user放在store中
    modules: {
        user,
        comment
    }
})
export default store;
