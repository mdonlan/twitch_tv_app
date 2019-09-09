import Vue from 'vue'
import App from './App'
import router from './router'
import TopNav from '@/components/TopNav/TopNav'
import LeftNav from '@/components/LeftNav/LeftNav'
import videoPlayer from '@/components/videoPlayer'
import notifications from '@/components/notifications'
import search from '@/components/search'
import loading from '@/components/loading'
import scrollbar from '@/components/scrollbar'
import panel from '@/components/panel'
import store from "./Store/store"
import multiPlayer from "./components/Multi/multiPlayer.vue"
import multiChat from "./components/Multi/multiChat.vue"
import multiSearch from "./components/Multi/multiSearch.vue"
import chatsContainer from "./components/Multi/chatsContainer.vue"
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload);

// Vue.config.productionTip = false

// global vue components
Vue.component('TopNav', TopNav);
Vue.component('LeftNav', LeftNav);
Vue.component('videoPlayer', videoPlayer);
Vue.component('notifications', notifications);

// TODO: import these locally
Vue.component('search', search);
Vue.component('loading', loading);
Vue.component('scrollbar', scrollbar);
Vue.component('panel', panel);
Vue.component('multiPlayer', multiPlayer);
Vue.component('multiChat', multiChat);
Vue.component('multiSearch', multiSearch);
Vue.component('chatsContainer', chatsContainer);

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    store
});