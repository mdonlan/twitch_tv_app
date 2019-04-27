import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import videoPlayer from '@/components/videoPlayer.vue'
import gamesView from '@/components/gamesView'
import followedView from '@/components/followedView'
import subscribedView from '@/components/subscribedView'
import gameView from '@/components/gameView'
import about from '@/components/about'
import loading from '@/components/loading'
import notifications from '@/components/notifications'
import multi from '@/components/Multi/multi'

import store from "../Store/store"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stream/',
      name: 'videoPlayer',
      component: null
    },
    {
      path: '/games/',
      name: 'gamesView',
      component: gamesView
    },
    {
      path: '/followed/',
      name: 'followedView',
      component: followedView
    },
    {
      path: '/subscribed/',
      name: 'subscribedView',
      component: subscribedView
    },
    {
      path: '/game/',
      name: 'gameView',
      component: gameView
    },
    {
      path: '/about/',
      name: 'about',
      component: about
    },
    {
      path: '/loading/',
      name: 'loading',
      component: loading
    },
    {
      path: '/multi/',
      name: 'multi',
      component: multi
    },
  ]
})

router.beforeEach((to, from, next) => {
    // whenever we change routes set some data
    
    if(to.path == '/stream') {
        document.title = to.query.name;
        store.commit("setOnVideoPage", true);
        store.commit("setOnChannel", to.query.name);
    } 
    else if(to.path == '/multi'){
        document.title = "Multi";
        store.commit("setOnVideoPage", true);
        // store.commit("setOnChannel", null);
    }
    else {
        store.commit("setOnVideoPage", false);    
    }
    next();
})

export default router