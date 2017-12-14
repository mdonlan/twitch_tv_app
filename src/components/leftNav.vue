<template>
  <div class="leftNavWrapper" id="leftNavWrapper">
      <div class="leftNavTitle">LIVE FOLLOWING</div>
      <div class="leftNavContentContainer">
        <div class="followItemContainer" v-for="follow in following">
            <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: follow.channel.name}}" @click.native="checkForPlayer"></router-link>
            <div class="leftNavImageContainer">
            <img class="followingLogo leftNavItem" v-bind:src="follow.channel.logo"></img>
        </div>
        <div class="leftNavTextContainer">
            <div class="followingName leftNavItem">{{follow.channel.name | truncate(15)}}</div>
            <div class="followingGame leftNavItem">{{follow.channel.game | truncate(15)}}</div>
            <div class="followingViewers leftNavItem">{{follow.viewers | addComma}}</div>
        </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'leftNav',
  data: function () {
    return {
      following: []
    }
  },
  created () {
    this.getFollowing();
  },
  mounted () {
      this.updateLive();
  },
  filters: {
    truncate: function (string, value) {
      if(string.length > 15) {
        return string.substring(0, value) + '...';
      } else {
        return string
      }
    },
    addComma: function (string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
      checkForPlayer() {
		// checks to see if there is already a video player loaded
        // if one is found it is removed
        
        if($("#twitch-embed").children().length > 0) {
            $("#twitch-embed").empty();
            this.checkForStream();
            this.loadPlayer();
        }
    },
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
    },
    checkForStream() {
      var url = window.location.href;
      if(url.indexOf("stream") > -1) {
          console.log('user is trying to load a stream');
          var nameString = url.match(/name=(.*)/)[1]
          localStorage.setItem("streamName", nameString);
      }
    },
    getFollowing() {
        console.log('updating leftNav data');
        var self = this;
        var accessToken = localStorage.getItem("access_token");
        var key = "OAuth " + accessToken;
        //console.log('key', key)
        axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/followed?limit=25',
        headers: {
            'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
            'Authorization' : key
            }
        })
        .then(function(response) {
            var leftNavData = response.data.streams;
            self.following = leftNavData;
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    updateLive() {
        // run this function every x seconds
        // will update the left nav bar live followed
        setInterval(this.getFollowing, 60000); // runs every 60 secons to check for changes
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.leftNavWrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100%;
    width: 250px;
    background: #061539;
    color: #dddddd;
    margin-top: 75px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    border-right: 2px solid #dddddd;
}

.followItemContainer {
    height: 75px;
    width: 100%;
    margin-bottom: 1px;
    margin-top: 1px;
    display: flex;
    align-items: center;
}

.followItemContainer:hover {
    background: #162955;
}

.leftNavImageContainer {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    margin-left: 5px;
}

img {
    height: 50px;
    width: 50px;
}

a {
    text-decoration: none;
    outline: none;
}

.leftNavTextContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
}

.clickZone {
    position: absolute;
    height: 75px;
    width: 100%;
}

.leftNavTitle {
    height: 50px;
    width: 100%;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
}

</style>
