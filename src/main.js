
// import components

import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import topNav from '@/components/topNav'
import leftNav from '@/components/leftNav'
import videoPlayer from '@/components/videoPlayer'
import notifications from '@/components/notifications'
import search from '@/components/search'
import loading from '@/components/loading'
import scrollbar from '@/components/scrollbar'
import panel from '@/components/panel'
import Vuex from "vuex"
import store from "./Store/store"
import multiPlayer from "./components/multiPlayer.vue"
import multiChat from "./components/multiChat.vue"
import multiSearch from "./components/multiSearch.vue"

Vue.config.productionTip = false

// global vue components
Vue.component('topNav', topNav);
Vue.component('leftNav', leftNav);
Vue.component('videoPlayer', videoPlayer);
Vue.component('notifications', notifications);
Vue.component('search', search);
Vue.component('loading', loading);
Vue.component('scrollbar', scrollbar);
Vue.component('panel', panel);
Vue.component('multiPlayer', multiPlayer);
Vue.component('multiChat', multiChat);
Vue.component('multiSearch', multiSearch);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store // load vuex store
});
