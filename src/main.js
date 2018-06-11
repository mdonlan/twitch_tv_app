// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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



Vue.config.productionTip = false

Vue.component('topNav', topNav);
Vue.component('leftNav', leftNav);
Vue.component('videoPlayer', videoPlayer);
Vue.component('notifications', notifications);
Vue.component('search', search);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
