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

Vue.config.productionTip = false

Vue.component('topNav', topNav);
Vue.component('leftNav', leftNav);
Vue.component('videoPlayer', videoPlayer);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
