<template>
    <div class="videoPlayerWrapper">
      <div class="mouseEventWatchLayerTop"></div>
      <div class="mouseEventWatchLayerLeft"></div>
      <div id="twitch-embed"></div>
      <div class="chromeAutoplayButton" v-if="this.showAutoplayButton">Due to Chrome's autoplay policies this video starts muted, to unmute please click anywhere on the video.</div>

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
        autoplayButton.style.display = 'none';

      }, 10000)
    }
  },
  mounted () {
    this.loadPlayer();

    // set leftNav to not show
    $(".leftNavWrapper").css("margin-top","0px")
    $(".leftNavWrapper").css("border-right","2px solid #dddddd")
    $(".leftNavWrapper").css("display","nonw")
    $(".leftNavContentContainer").css("opacity","0")
    $(".leftNavTitle").css("opacity","0")
    $(".leftNavTitle").css("display","none")
    $(".leftNavWrapper").css("width","0")
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
        
        let checkForClick = setInterval(function() {
          let player = embed.getPlayer();
          let isMuted = player.getMuted();
          
          if(isMuted == true) {
            player.setMuted();
            player = embed.getPlayer();
            isMuted = player.getMuted();
          }
        }, 1000)
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
    height: 40%;
    width: 60%;
    left: 20%;
    top: 0px;
    overflow: hidden;
    z-index: 3;
}

.mouseEventWatchLayerLeft {
    position: absolute;
    height: 40%;
    width: 40%;
    left: 0px;
    top: 20%;
    overflow: hidden;
    z-index: 3;
}

#twitch-embed {
    height: 100%;
    width: 100%;
}

.chromeAutoplayButton {
  width: 350px;
  background: #222222;
  position: absolute;
  bottom: 75px;
  left: calc(50% - 175px);
  border: 2px solid #dddddd;
  color: #dddddd;
  text-align: center;
  font-size: 14px;
}

</style>
