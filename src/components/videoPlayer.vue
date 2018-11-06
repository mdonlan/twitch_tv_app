<template>
    <div class="videoPlayerWrapper">
      <!--<div class="mouseEventWatchLayerTop"></div>-->
      <div class="mouseEventWatchLayerLeft"></div>
      <div class="leftNavButton"></div>
      <div id="twitch-embed"></div>
      <div class="closeSmallPlayerContainer" v-if="!this.$store.state.onVideoPage">
        <div class="closeSmallPlayerButton" v-on:click="closeSmallPlayer">CLOSE</div>
        <router-link class="restoreFullPlayerButton" v-on:click="restoreFullPlayer" :to="{path: 'stream', query: { name: this.$store.state.onChannel}}">RESTORE</router-link>
      </div>      
    </div>
</template>

<script>
import axios from 'axios'
import twitchEmbedScript from '@/assets/twitchEmbedScript_1.js'
import $ from 'jquery'

export default {
  name: 'videoPlayer',
  data: function() {
    return {
      
    }
  },
  created () {
    this.setupStoreWatcher();
  },
  mounted () {
    // at first load check if we need to load a video
    if(this.$store.state.onVideoPage) {
      this.loadPlayer();
    }

    // document.addEventListener("mouseup", this.mouseUp);
    // document.addEventListener("mousedown", this.setClickData);
    // document.addEventListener("mousemove", this.mouseMoved);
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
    },
    setSmall() {
      // set the video player to small
      let videoContainer = document.querySelector(".videoPlayerWrapper");
      let twitchEmbed = document.querySelector("#twitch-embed");
      videoContainer.classList.add("videoPlayerSmall");
      twitchEmbed.classList.add("embedSmall");
    },
    setupStoreWatcher() {
      // watch for changes in store
      this.$store.watch(
        (state) => {
          return this.$store.state.onVideoPage; // what this value
        },
        (newValue, oldValue) => { // when value changes do this
          if(newValue == true) {
            this.setPlayerSize(true)
            this.loadPlayer(); // on video page, show player
          } else {
            this.setPlayerSize(false)
          }
        }
      )
    },
    setClickData(event) {
      console.log('clicked')
      let self = this;
      let target = event.target;
      
      if(target.className == 'closeSmallPlayerContainer') {
        let clickPos = {x: event.clientX, y: event.clientY};
        let elem = document.querySelector(".closeSmallPlayerContainer");
        let elemPos = elem.getBoundingClientRect();
        //console.log(elemPos)
        let offset = {x: clickPos.x - elemPos.x, y: clickPos.y - elemPos.y};
        self.offset = offset;
        self.canDrag = true;
        //console.log(offset)
      } else {
        self.canDrag = false;
      }
    },
    mouseMoved(event) {
      let self = this;
      let video = document.querySelector(".videoPlayerWrapper");
      
      //console.log(self.offset)
      if(event.buttons == 1 && self.canDrag) {
        //video.style.transition = '0';
        video.style.top = (event.clientY - self.offset.y) + 'px';
        video.style.left = (event.clientX - self.offset.x) + 'px';
      }
      //console.log(video.style.top)
    },
    closeSmallPlayer() {
      console.log('clicked close small player');
      let video = document.querySelector("#twitch-embed");
      video.parentNode.removeChild(video);
    },
    restoreFullPlayer() {
      this.$store.commit("setOnVideoPage", true)
      // let self = this;
      // console.log('clicked restore full player')
      // let video = document.querySelector(".videoPlayerWrapper"); 
      // //console.log(window.innerHeight)
      // video.style.height = window.innerHeight + 'px';
      // video.style.width = window.innerWidth + 'px';
      // video.style.top = '0px';
      // localStorage.setItem("smallPlayer", false);
      // video.style.zIndex = '3';

      // let embed = document.querySelector("#twitch-embed"); 
      // //console.log(window.innerHeight)
      // embed.style.height = window.innerHeight + 'px';
      // embed.style.width = window.innerWidth + 'px';
      // embed.style.top = '0px';
      // //let channelName = localStorage.getItem("streamName");
      // //router.push({path: 'stream', query: { name: channelName}});
    },
    clearOldPlayers() {
      // when loading a new video, we create a new player 
      // that means we have to clear the old player
      let elem = document.querySelector("#twitch-embed");
      while(elem.children.length > 0) {
        elem.removeChild();
      }
    },
    loadPlayer() {
      // load a new channel in a new player

      this.clearOldPlayers();
      let newPlayer = new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: this.$store.state.onChannel,
          layout: "",
          theme: "dark",
      });
    } 
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
