import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onVideoPage: false,
    onChannel: null,
    username: null,
    following: null,
    user: {
      name: null,
      accessToken: null,
    },
    clientID: null,
    mousePos: null
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
    },

    setFollowing(state, payload) {
      state.following = payload;
    },

    setMousePos(state, payload) {
      state.mousePos = payload;
    }
  },
});

//console.log(store)