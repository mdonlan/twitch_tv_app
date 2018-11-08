<template>
    <div class="videoPlayerWrapper">
      <!--<div class="mouseEventWatchLayerTop"></div>-->
      <div class="mouseEventWatchLayerLeft"></div>
      <div class="leftNavButton"></div>
      <div id="twitch-embed"></div>
      <div class="closeSmallPlayerContainer" v-if="!this.$store.state.onVideoPage && this.$store.state.onChannel">
        <div class="closeSmallPlayerButton" v-on:click="closeSmallPlayer">CLOSE</div>
        <router-link class="restoreFullPlayerButton" v-on:click="restoreFullPlayer" :to="{path: 'stream', query: { name: this.$store.state.onChannel}}">RESTORE</router-link>
      </div>      
    </div>
</template>


<script>
import axios from 'axios'
//import twitchEmbedScript from '@/assets/twitchEmbedScript_1.js'

import $ from 'jquery'

export default {
  name: 'videoPlayer',
  data: function() {
    return {
      currentPlayerChannel: null
    }
  },
  created () {
    this.setupStoreWatcher();
  },
  mounted () {

    // when first mounting the video player we need to import the twitchEmbed script from their site
    // only once the script is loaded can we then try to load a new embed player
    let embedScript = document.createElement('script');
    embedScript.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
    document.head.appendChild(embedScript);
    embedScript.async = true;
    embedScript.onload = () => {
      // once script is loaded  
      // check if we need to load a video
      if(this.$store.state.onVideoPage) {
        this.setPlayerSize(true); // make sure to load correct size for the page we load on      
        this.loadPlayer();
      } else {
        this.setPlayerSize(false);
      }
    }
  },
  methods: {
    setPlayerSize(isLarge) {
      console.log('setting video player size');
      console.log(isLarge)
      if(isLarge) {
        this.setLarge();
      } else {
        this.setSmall();
      }
    },
    setLarge() {
      // set the video player to large(fullscreen size)
      let videoContainer = document.querySelector(".videoPlayerWrapper");
      let twitchEmbed = document.querySelector("#twitch-embed");
      videoContainer.classList.remove("videoPlayerSmall");
      twitchEmbed.classList.remove("embedSmall");
      videoContainer.classList.remove("hideSmallVideoPlayer")

    },
    setSmall() {
      // set the video player to small
      let videoContainer = document.querySelector(".videoPlayerWrapper");
      let twitchEmbed = document.querySelector("#twitch-embed");
      videoContainer.classList.add("videoPlayerSmall");
      twitchEmbed.classList.add("embedSmall");

      if(!this.$store.state.onChannel) {
        videoContainer.classList.add("hideSmallVideoPlayer")
      }
    },
    setupStoreWatcher() {
      // watch for changes in store
      this.$store.watch(
        (state) => {
          return this.$store.state.onVideoPage; // what this value
        },
        (newValue, oldValue) => { // when value changes do this
          //console.log(newValue, oldValue)
          if(newValue == true) {
            this.setPlayerSize(true)
            this.loadPlayer(); // on video page, show player
          } else {
            this.setPlayerSize(false)
          }
        }
      );

      // watch onChannel
      // if this changes update the video player to load a new channel
      this.$store.watch((state) => {return this.$store.state.onChannel}, (onChannel, oldValue) => {
        //console.log('watched: ', onChannel);
        //console.log(onChannel, oldValue)
        this.loadPlayer();
      });
    },
    closeSmallPlayer() {
      // remove the video element
      // let video = document.querySelector("#twitch-embed");
      // video.parentNode.removeChild(video);
      // this.$store.commit("setOnChannel", null);
      // let videoContainer = document.querySelector(".videoPlayerWrapper");
      // videoContainer.classList.add("hideSmallVideoPlayer")
      this.$store.commit("setOnChannel", null);
    },
    restoreFullPlayer() {
      this.$store.commit("setOnVideoPage", true)
    },

    clearOldPlayers() {
      // when loading a new video, we create a new player 
      // that means we have to clear any old players
      let elem = document.querySelector("#twitch-embed");
      elem.innerHTML = ''; // clear elem
    },

    loadPlayer() {
      // load a new channel in a new player

      // check if we are trying to load a channel that is already playing and prevent it
      // only load a new player if not a match
      if(this.$store.state.onChannel == null) {
        this.clearOldPlayers();
        return;
      }

      if(this.$store.state.onChannel != this.currentPlayerChannel) {
        this.clearOldPlayers();
        let embedOptions = {
          width: "100%",
          height: "100%",
          channel: this.$store.state.onChannel,
          layout: "",
          theme: "dark",
          autoplay: "default",
          muted: false
        }
        let newPlayer = new window.Twitch.Embed("twitch-embed", embedOptions);
        this.currentPlayerChannel = newPlayer.options.channel;  

        // setup event listener for when the player is ready
        // when ready, wait a few seconds and then send an unmute command
        // we need to do this b/c for some reason i mutes it self like 1sec 
        // into the video playing
        newPlayer.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {
          //console.log("VIDEO IS PLAYING");
          // let player = newPlayer.getPlayer(); // get the actual player from the larger video that was loaded
          // console.log(player.setMuted);
          // setTimeout(() => {
          //   console.log("TIMEOUT1");
          //   console.log(player._playerState.muted);
          //   player.setMuted(false);
          //   console.log(player._playerState.muted);
          //   player.setMuted(false);
          // }, 5000);
          // setTimeout(() => {
          //   console.log("TIMEOUT2");
          //   player.setMuted(false);
          // }, 10000);
        });
      }
    } 
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.videoPlayerWrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0px;
  overflow: hidden;
  z-index: 3;
  /*transition: height 0.3s, width 0.5s, top 0.5s;*/
}

.videoPlayerSmall {
  height: 225px;
  width: 400px;
  top: calc(100% - 225px);
  z-index: 5;
}

.hideSmallVideoPlayer {
  z-index: 0;
}
 
#twitch-embed {
  height: 100%;
  width: 100%;
  /*transition: height 0.3s, width 0.5s, top 0.5s;*/
  position: absolute;
  top: 0px;
  left: 0px;
  user-select: none;
}

.embedSmall {
  height: 500px !important;
  width: 400px !important;
}

.mouseEventWatchLayerTop {
  position: absolute;
  height: 10%;
  width: 40%;
  left: 20%;
  top: 0px;
  overflow: hidden;
  z-index: 3;
  opacity: 0.5;
}

.mouseEventWatchLayerLeft {
  /*background: rgba(17, 17, 17, 0.4);*/
  position: absolute;
  height: 40%;
  width: 10%;
  left: 0px;
  top: calc(25%);
  overflow: hidden;
  z-index: 3;
  opacity: 0.5;
}

.chromeAutoplayButton {
  width: 680px;
  height: 40px;
  line-height: 40px;
  background: #111111;
  position: absolute;
  bottom: 75px;
  left: calc(40% - 340px);
  color: #dddddd;
  text-align: center;
  font-size: 14px;
  -webkit-box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  transition: all 3s;
  border-radius: 3px;

  /* 
    font-smoothing fixes chrome bug where transform-translate causes weird pixel 
    miscalculations in text which causes a blur / change to occur in text
  */
  -webkit-font-smoothing: antialiased;
}

.closeSmallPlayerContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
}

.closeSmallPlayerButton, .restoreFullPlayerButton {
  cursor: pointer;
  color: #dddddd;
  border: 1px solid #dddddd;
  padding: 3px;
  margin: 3px;
  transition: 0.6s;
}

.closeSmallPlayerButton:hover, .restoreFullPlayerButton:hover {
  background: #dddddd;
  color: #222222;
}

.videoPlayerWrapper:hover .closeSmallPlayerContainer {
  display: flex;
  width: 100%;
  background: #222222;
  
  justify-content: center;
  align-items: flex-start;
  cursor: move;
}

#twitch-embed iframe {
  width:100%;
  height:100%;
}

</style>
