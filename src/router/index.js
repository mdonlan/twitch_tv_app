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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/stream/',
      name: 'videoPlayer',
      component: videoPlayer
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
  ]
})
