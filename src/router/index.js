import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Games from '@/components/Games/Games'
import Game from '@/components/Games/Game'
import followedView from '@/components/followedView'
import About from '@/components/About'
import loading from '@/components/loading'
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
      name: 'Games',
      component: Games
    },
    {
      path: '/followed/',
      name: 'followedView',
      component: followedView
    },
    {
      path: '/game/',
      name: 'Game',
      component: Game
    },
    {
      path: '/about/',
      name: 'About',
      component: About
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
    // runs whenever route changes

    // when leaving multi, clear old multi channels
    if (from.name == 'multi') {
        for (let i = 0; i < 4; i++) {
            store.commit("setMulti", {channel: null, num: i + 1});
        }
    }

    if(to.path == '/stream') {
        document.title = to.query.name;
        store.commit("setOnVideoPage", true);
        store.commit("setOnChannel", to.query.name);
    } 
    else if(to.path == '/multi'){
        document.title = "Multi";
        // store.commit("setOnVideoPage", true);
        store.commit("setShowLeftNav", false);
    }
    else {
        store.commit("setOnVideoPage", false);
        store.commit("setShowLeftNav", true);
        document.title = 'Twitch Vue App';    
    }

    next();
})

export default router;