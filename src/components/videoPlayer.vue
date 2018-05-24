<template>
    <div class="videoPlayerWrapper">
      <!--<div class="mouseEventWatchLayerTop"></div>-->
      <div class="mouseEventWatchLayerLeft"></div>
      <div class="leftNavButton"></div>
      <div id="twitch-embed"></div>
      <div class="chromeAutoplayButton" v-if="this.showAutoplayButton">Due to Chrome's autoplay policies this video starts muted. To unmute please click anywhere on the video.</div>

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
    }
  },
  created () {
    let self = this;
    this.checkForStream();
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
    this.loadPlayer();
    this.hideLeftNav();    
  },
  methods: {
    loadPlayer() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var channelName = localStorage.getItem("streamName");
      var embed = new Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: channelName,
          layout: "",
          theme: "dark",
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {

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
    position: absolute;
    height: 25%;
    width: 20%;
    left: 0px;
    top: 33%;
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
}

</style>
