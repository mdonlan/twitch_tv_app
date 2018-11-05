import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onVideoPage: false
  },
  mutations: {
    setOnVideoPage(state, payload) {
      state.onVideoPage = payload;
    }
  }
});

//console.log(store)