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
            <div class="followingName leftNavItem">{{follow.channel.name}}</div>
            <div class="followingGame leftNavItem">{{follow.channel.game}}</div>
            <div class="followingViewers leftNavItem">{{follow.viewers | addComma}}</div>
        </div>
        </div>
    </div>
    <div class="bottom"></div>
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
          //console.log('user is trying to load a stream');
          var nameString = url.match(/name=(.*)/)[1]
          localStorage.setItem("streamName", nameString);
      }
    },
    getFollowing() {
        //console.log('updating leftNav data');
        var self = this;
        var accessToken = localStorage.getItem("access_token");
        var key = "OAuth " + accessToken;
        //console.log('key', key)
        axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/followed?limit=25',
        headers: {
            'Client-ID': '034f31qw57vu405ondtxpqwp104q5o',
            'Authorization' : key
            // client ids
            // dev -- 034f31qw57vu405ondtxpqwp104q5o
            //prod -- yb1fpw6w2ldfn50b0ynr50trdcxn99
            }
        })
        .then(function(response) {
            var leftNavData = response.data.streams;
            self.following = leftNavData;
            //console.log(response);
        })
        .catch(function (error) {
            //console.log(error);
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
  height: calc(100% - 75px);
  width: 250px;
  background: #051f5c;
  color: #dddddd;
  margin-top: 75px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 5;
  border-right: 2px solid #dddddd;
  -webkit-transition: width 0.3s linear;
  -moz-transition: width 0.3s linear;
  -o-transition: width 0.3s linear;
  transition: width 0.3s linear;
  
}

.leftNavContentContainer {
  
}

.followItemContainer {
  width: 250px;
  height: 60px;
  margin-bottom: 2px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  -webkit-transition: background 0.3s linear;
  -moz-transition: background 0.3s linear;
  -o-transition: background 0.3s linear;
  transition: background 0.3s linear;
  font-size: 14px;
}

.followItemContainer:hover {
  background: #0f327c;
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
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 5px;
}

.clickZone {
  position: absolute;
  height: 60px;
  width: 100%;
}

.leftNavTitle {
  height: 50px;
  width: 250px;
  line-height: 50px;
  border-bottom: 2px solid #dddddd;
  border-top: 2px solid #dddddd;
}

.followingGame, .followingName {
  width: 190px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media only screen and (max-width: 1000px) {
  .leftNavWrapper {
    width: 115px;
    font-size: 10px;
  }

  img {
    height: 25px;
    width: 25px;
  }

  .followingGame, .followingViewers {
    display: none;
  }

  .followItemContainer {
    font-size: 10px;
    height: 35px;
    width: 100%;
    margin-bottom: 1px;
    margin-top: 1px;
    display: flex;
    align-items: center;
    -webkit-transition: background 0.5s linear;
    -moz-transition: background 0.5s linear;
    -o-transition: background 0.5s linear;
    transition: background 0.5s linear;
  }

  .clickZone {
    position: absolute;
    height: 35px;
    width: 100%;
  }

  .leftNavTextContainer {
    height: 35px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 3px;
  }

  .leftNavImageContainer {
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    margin-left: 2px;
  }
}

.bottom {
  /* this element helps prevent following items from being too close to bottom of screen */
  height: 25px;
  width: 100%;
}

</style>
