import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onVideoPage: false,
    onChannel: null,
    username: null
  },
  mutations: {
    setOnVideoPage(state, payload) {
      state.onVideoPage = payload;
    },
    setOnChannel(state, payload) {
      state.onChannel = payload;
    },
    setUserName(state, payload) {
      state.username = payload;
    }
  },
});

//console.log(store)