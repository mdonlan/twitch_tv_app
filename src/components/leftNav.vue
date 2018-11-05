<template>
  <div class="leftNavWrapper" id="leftNavWrapper">
    <div class="leftNavTitle">LIVE FOLLOWING</div>
    <div class="leftNavContentContainer">
      <div class="followItemContainer" :ref="follow._id" v-bind:key="follow._id" v-for="follow in following">
        <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: follow.channel.name}}" @click.native="checkForPlayer"></router-link>
        <div class="leftNavImageContainer">
        <img class="followingLogo leftNavItem" v-bind:src="follow.channel.logo"></img>
      </div>
      <div class="leftNavTextContainer">
        <div class="followingName leftNavItem">{{follow.channel.name}}</div>
        <div class="followingGame leftNavItem">{{follow.channel.game}}</div>
        <div class="followingStatus leftNavItem">{{follow.channel.status}}</div>
        <div class="followingViewers leftNavItem">{{follow.viewers | addComma}}</div>
      </div>
    </div>
  </div>

    <div class="scrollbarLeftNav"></div>

    <div class="navButtons">
      <div class="navButtonsContainer">
        <router-link class="navButton" v-bind:to="{path: '/'}">Popular</router-link>
        <router-link class="navButton" v-bind:to="{path: 'games'}">Games</router-link>
        <router-link class="navButton" v-bind:to="{path: 'followed'}">Followed</router-link>
        <router-link class="navButton" v-bind:to="{path: 'subscribed'}">Subscribed</router-link>
        <router-link class="navButton aboutButton" v-bind:to="{path: 'about'}">About</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import Vue from 'vue';

export default {
  name: 'leftNav',
  data: function () {
    return {
      following: [],
      showingLeftNav: false,
      showNavButtons: false,
      loadingLeftNav: false,
      listOrderNew: [],
      listOrderOld: [],
    }
  },
  created () {
    this.checkRoute();
    this.getFollowing();
  },
  mounted () {
    let self = this;
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
      var channelName = localStorage.getItem("streamName");
      var embed = new Twitch.Embed("twitch-embed", {
          width: '100%',
          height: '100%',
          channel: channelName,
          layout: "",
          theme: "dark",
          autoplay: false
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
          //var player = embed.getPlayer();
          //player.play();
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
        url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
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
            localStorage.setItem("following", JSON.stringify(self.following));
        })
        .catch(function (error) {
            //console.log(error);
        });
    },
    updateLive() {
        // run this function every x seconds
        // will update the left nav bar live followed
        setInterval(this.getFollowing, 10000); // runs every 10 seconds to check for changes
    },
    checkRoute() {
      let self = this;
      setInterval(function() {
        if(window.location.href.indexOf("stream") > -1) {
          // if on video page then show nav buttons on left nav
          self.showNavButtons = true;
        } else {
          self.showNavButtons = false;
        }
      }, 1000)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navButtonsContainer {
  margin-top: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-top: 0.5px solid #2c65ce;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 225px;
  position: absolute;
  bottom: 0px;
}

.navButton {
  height: 20px;
  width: 150px;
  border: 0.5px solid #2c65ce;
  padding: 5px;
  margin: 5px;
  color: #dddddd;
  border-radius: 7px;
  transition: 0.5s;
  font-variant: small-caps;
}

.navButton:hover {
  background: #dddddd;
  color: #051f5c;
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
}

.leftNavWrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  height: calc(100% - 75px);
  width: 250px;
  background: #051f5cf8;
  color: #dddddd;
  margin-top: 75px;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 5;

  -webkit-transition: width 0.3s linear;
  -moz-transition: width 0.3s linear;
  -o-transition: width 0.3s linear;
  transition: width 0.3s linear;
  
}

.leftNavContentContainer {
  position: absolute;
  height: calc(100% - 340px);
  overflow-x: hidden;
  overflow-y: auto;
  /* make width + padding overflow to hide native scrollbar */
  width: 100%;
  padding-right: 150px;
}

.followItemContainer {
  width: 250px;
  height: 65px;
  margin-bottom: 2px;
  margin-top: 2px;
  display: flex;
  align-items: center;
  transition: background 0.5s linear;
  font-size: 12px;
  user-select: none;
}

.followItemContainer:hover {
  background: #0f327c;
}

.leftNavImageContainer {
  height: 50px;
  width: 75px;
  display: flex;
  align-items: center;
  margin-left: 5px;
}

img {
  height: 50px;
  width: 50px;
  border-radius: 5px;
}

a {
  text-decoration: none;
  outline: none;
}

.leftNavTextContainer {
  height: 75px;
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
  border-bottom: 0.5px solid #2c65ce;
  border-top: 0.5px solid #2c65ce;
}

.followingGame, .followingName, .followingStatus {
  width: 190px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.followingName {
  font-size: 12.5px;
}

.followingGame, .followingStatus, .followingViewers {
  color: #ddddddaf;
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

  .followingGame, .followingViewers, .followingStatus {
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

/* custom scroll bar */
.scrollbarLeftNav {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 20px;
  width: 8px;
  background: #dddddd;
  z-index: 3;
  opacity: 0.4;
  border-radius: 4px;
}

</style>
