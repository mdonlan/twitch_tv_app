<template>
    <div class="videoPlayerWrapper">
      <!--<div class="mouseEventWatchLayerTop"></div>-->
      <div class="mouseEventWatchLayerLeft"></div>
      <div class="leftNavButton"></div>
      <div id="twitch-embed"></div>
      <div class="chromeAutoplayButton" v-if="this.showAutoplayButton">Due to Chrome's autoplay policies this video starts muted. To unmute please click anywhere on the video.</div>
      <div class="closeSmallPlayerContainer" v-if="isSmallVideo">
        <div class="closeSmallPlayerButton" v-on:click="closeSmallPlayer">CLOSE</div>
        <div class="restoreFullPlayerButton" v-on:click="restoreFullPlayer">RESTORE</div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import twitchEmbedScript from '@/assets/twitchEmbedScript_1.js'
import $ from 'jquery'
import Vue from 'vue';

export default {
  name: 'videoPlayer',
  data: function() {
    return {
      isChrome: false,
      showAutoplayButton: false,
      showingLeftNav: false,
      playerLoaded: false,
      player: null,
      isSmallVideo: false,
    }
  },
  created () {
    let self = this;
    
    //Check if browser is Chrome and if so then display chrome autoplay button
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    self.isChrome = isChrome;
    if(self.isChrome == true) {
      self.showAutoplayButton = true;
      setTimeout(function() {
        let autoplayButton = document.querySelector(".chromeAutoplayButton");
        let emptyButtonTop = document.querySelector(".emptyButtonTop");
        let emptyButtonBottom = document.querySelector(".emptyButtonBottom");
        autoplayButton.style.transform = "translateY(200px)";

      }, 10000)
    }
  },
  mounted () {
    
    //this.hideLeftNav();    

    // check if video player should be playing / visible
    setInterval(() => {
      this.checkPlayingStatus();
    
    }, 1000);
  },
  methods: {
    checkPlayingStatus() {
      let self = this;
      let isPlaying = localStorage.getItem("isPlaying");
      
      if(isPlaying == 'true') {
        self.checkForStream();
        if(!self.playerLoaded) {
          self.loadPlayer();
          self.playerLoaded = true;
        }
      }

      if(localStorage.getItem("smallPlayer") == 'true') {
        //self.embed.options.layout = 'video';
        self.isSmallVideo = true;
      } else {
        // if not small video check to make sure the player has returned to large size

        self.isSmallVideo = false;
        
        let video = document.querySelector(".videoPlayerWrapper");
        video.style.width = window.innerWidth + 'px';
        video.style.height = window.innerHeight + 'px';
        video.style.top = '0px';
        video.style.zIndex = '2';
      }
    },
    closeSmallPlayer() {
      console.log('clicked close small player');
      let video = document.querySelector("#twitch-embed");
      video.parentNode.removeChild(video);
    },
    restoreFullPlayer() {
      let self = this;
      console.log('clicked restore full player')
      let video = document.querySelector(".videoPlayerWrapper"); 
      console.log(window.innerHeight)
      video.style.height = window.innerHeight + 'px';
      video.style.width = window.innerWidth + 'px';
      video.style.top = '0px';
      localStorage.setItem("smallPlayer", false);
      self.isSmallVideo = false;
      video.style.zIndex = '2';
      let channelName = localStorage.getItem("streamName");
      router.push({path: 'stream', query: { name: channelName}});
    },
    loadPlayer() {
      let self = this;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var channelName = localStorage.getItem("streamName");
      console.log(channelName)
      let embed = new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: channelName,
          layout: "",
          theme: "dark",
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        let self = this;
        self.player = embed.getPlayer();

        // on the twitch player being ready
        // check if it is muted and if so
        // try to unmute, this can only happen though
        // if the user has already intereacted w/ the iframe

        //
        // UPDATE: twitch has updated their embeded player to have an unmute button 
        // when the player starts muted, this is a good enough solution for now
        //

        /*
        let checkForClick = setInterval(function() {
          let player = embed.getPlayer();
          let isMuted = player.getMuted();
          
          if(isMuted == true) {
            player.setMuted();
            player = embed.getPlayer();
            isMuted = player.getMuted();
          }
        }, 1000)
        */

		  });
    },
    checkForStream() {
      var url = window.location.href;
      if(url.indexOf("stream") > -1) {
        //console.log('user is trying to load a stream');
        var nameString = url.match(/name=(.*)/)[1]
        localStorage.setItem("streamName", nameString);
      }
    },
    hideLeftNav() {
      // set leftNav to not show
      let leftNav = document.querySelector(".leftNavWrapper");
      let content = document.querySelector(".leftNavContentContainer");
      let title = document.querySelector(".leftNavTitle");

      leftNav.style.marginTop = '0px';
      //leftNav.style.display = 'none';
      leftNav.style.opacity = '0';
      leftNav.style.width = '0px';

      content.style.opacity = '0';

      //title.style.display = 'none';
      title.style.opacity = '0';

      /*
      $(".leftNavWrapper").css("margin-top","0px")
      $(".leftNavWrapper").css("border-right","2px solid #dddddd")
      $(".leftNavWrapper").css("display","none")
      $(".leftNavContentContainer").css("opacity","0")
      $(".leftNavTitle").css("opacity","0")
      $(".leftNavTitle").css("display","none")
      $(".leftNavWrapper").css("width","0")
      */
    },
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
  z-index: 2;
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

#twitch-embed {
  height: 100%;
  width: 100%;
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
}

.videoPlayerWrapper:hover .closeSmallPlayerContainer {
  display: flex;
  height: 100%;
  width: 100%;
  background: #22222248;
  
  justify-content: center;
  align-items: flex-start;
}

</style>
