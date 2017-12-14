<template>
    <div class="videoPlayerWrapper">
        <div class="mouseEventWatchLayerTop"></div>
		<div class="mouseEventWatchLayerLeft"></div>
        <div id="twitch-embed"></div>
    </div>
</template>

<script>
import axios from 'axios'
import twitchEmbedScript from '@/assets/twitchEmbedScript.js'
import $ from 'jquery'

export default {
  name: 'topNav',
  created () {
      this.checkForStream();
  },
  mounted () {
    this.loadPlayer();
  },
  methods: {
    loadPlayer() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var channelName = localStorage.getItem("streamName");
        var embed = new Twitch.Embed("twitch-embed", {
            width: w,
            height: h,
            channel: channelName,
            layout: "",
            theme: "dark",
            autoplay: false
		});
		
        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
            var player = embed.getPlayer();
            player.play();
		});
		
		// give the embeded video iframe an id
		$("iframe").each(function() { 
        	$(this).attr('id', 'twitchEmbed');  
		});
    },
    checkForStream() {
      var url = window.location.href;
      if(url.indexOf("stream") > -1) {
          console.log('user is trying to load a stream');
          var nameString = url.match(/name=(.*)/)[1]
          localStorage.setItem("streamName", nameString);
      }
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
    z-index: 2;
}

.mouseEventWatchLayerTop {
    position: absolute;
    height: 50%;
    width: 60%;
    left: 20%;
    top: 0px;
    overflow: hidden;
    z-index: 3;
}

.mouseEventWatchLayerLeft {
    position: absolute;
    height: 60%;
    width: 80%;
    left: 0px;
    top: 20%;
    overflow: hidden;
    z-index: 3;
}

#twitchEmbed {
	pointer-events: none;
}

</style>
