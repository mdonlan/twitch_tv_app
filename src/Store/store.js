import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onVideoPage: false,
    onChannel: null
  },
  mutations: {
    setOnVideoPage(state, payload) {
      state.onVideoPage = payload;
    },
    setOnChannel(state, payload) {
      state.onChannel = payload;
    }
  },
});

//console.log(store)