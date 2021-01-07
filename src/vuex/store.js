import Vue from 'vue'
import Vuex from 'vuex'
const state = {
    name: '张三'
}
Vue.use(Vuex)
export default new Vuex.Store({
    state
})