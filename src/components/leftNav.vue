<template>
  <div>
    <div class="leftNavWrapper" id="leftNavWrapper">
      <div class="leftNavTitle">LIVE FOLLOWING</div>
      <scrollbar :attachedElem="scrollbarAttachedElem" :offsetTop="scrollbarOffsetTop" />
      <div class="leftNavContentContainer">
        <div class="followItemContainer" :ref="follow._id" v-bind:key="follow._id" v-for="follow in following">
          <div class="clickZone" @click="clickedVideoLink(follow)" :data-channel="follow.channel.name" ></div>
          <div class="leftNavImageContainer">
            <img class="followingLogo leftNavItem" v-bind:src="follow.channel.logo">
          </div>
          <div class="leftNavTextContainer">
            <div class="followingName leftNavItem">{{follow.channel.name}}</div>
            <div class="followingGame leftNavItem">{{follow.channel.game}}</div>
            <div class="followingStatus leftNavItem">{{follow.channel.status}}</div>
            <div class="followingViewers leftNavItem">{{follow.viewers | addComma}}</div>
          </div>
        </div>
      </div>
      
      <div class="navButtonsContainer" :class="[{navButtonsHide: hideButtons}]">
        <div class="navButton" @click="clickedButton('/')">Popular</div>
        <div class="navButton" @click="clickedButton('games')">Games</div>
        <div class="navButton" @click="clickedButton('following')">Followed</div>
        <!-- <router-link class="navButton" v-bind:to="{path: 'subscribed'}">Subscribed</router-link> -->
        <div class="navButton aboutButton" v-bind:to="{path: 'about'}" @click="clickedButton('about')">About</div>
      </div>
    </div>
    <img class="hoverPreview" v-if="hoveringChannelPreviewSrc" :src="hoveringChannelPreviewSrc" :style="{top: hoverPreviewTop + 'px'}" />
    <!-- v-if="follow.channel.name == hoveringOverChannel" :src="follow.preview.medium" -->
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';;

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
      hideButtons: false,
      scrollbarAttachedElem: "leftNavContentContainer",
      scrollbarOffsetTop: 75, // size of left nav title container
      hoveringChannelPreviewSrc: null,
      hoverPreviewTop: null
    }
  },
  created () {
    //this.checkRoute();
    this.getFollowing();

    document.addEventListener("mousemove", this.mouseMoveHandler);
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
    clickedButton(to) {
      this.$router.push(to);
    },

    mouseMoveHandler(event) {
      // watches the mouse movement and checks whether we are over an IFRAME or not
      // if we are over an Iframe it means we are over the video player / chat
      // and that we should hide the leftNav
      // otherwise show the leftNav
    
      let toElem = event.toElement;
      let tag = toElem.tagName;

      let hide = tag.includes("IFRAME"); 

      // only do this if we are video page
      if(this.$store.state.onVideoPage) {
        this.setLeftNavPos(hide);
      }

      this.checkHoveringOverStream(toElem);
    },

    checkHoveringOverStream(toElem) {
      // check if we are hovering over a left nav stream
      // if so then show a preview image of the stream
      if(toElem.getAttribute("data-channel")) {
        let hoverElemChannel = toElem.getAttribute("data-channel");
        console.log(hoverElemChannel);
        let hoverSrc = null;
        this.following.forEach((stream) => {
          if(stream.channel.name == hoverElemChannel) {
            hoverSrc = stream.preview.medium;
          }
        });
    
        let elemPos = toElem.getBoundingClientRect();
        this.hoverPreviewTop = elemPos.top - (toElem.clientHeight / 2);
        this.hoveringChannelPreviewSrc = hoverSrc;
        
      } else {
        // if not hovering over a stream
        this.hoveringChannelPreviewSrc = null;
      }
    },

    setLeftNavPos(hide) {
      // show or hide the left nav

      let leftNavElem = document.querySelector(".leftNavWrapper")
      
      if(hide) {
        leftNavElem.classList.add("leftNavWrapperHide");
      } else {
        leftNavElem.classList.remove("leftNavWrapperHide");
      }
    },    

    clickedVideoLink(stream) {
      // clicked a link to a stream on the leftNav
      
      let to = {path: 'stream', query: {name: stream.channel.name}};
      this.$router.push(to);
      this.$store.commit("setOnVideoPage", true);
      this.$store.commit("setOnChannel", to.query.name);
      
      // if($("#twitch-embed").children().length > 0) {
          
      // }
      // $("#twitch-embed").empty();
      // this.checkForStream();
      // this.loadPlayer();
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
<style lang="scss" scoped>
@import "../global_styles.scss";

.leftNavWrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  height: calc(100%);
  width: 250px;
  background: $mainBackgroundColor;
  color: #dddddd;
  overflow-y: hidden;
  overflow-x: hidden;
  z-index: 5;

  -webkit-transition: width 0.3s linear;
  -moz-transition: width 0.3s linear;
  -o-transition: width 0.3s linear;
  transition: width 0.3s linear;
  
}

.leftNavWrapperHide {
  width: 0px;
}

.leftNavContentContainer {
  position: absolute;
  height: calc(100% - (225px + 75px)); // 225px for buttons container, 75px for offset top 
  overflow-x: hidden;
  overflow-y: scroll;
  /* make width + padding overflow to hide native scrollbar */
  width: 100%;
  padding-right: 18px;
}

.followItemContainer {
  width: 250px;
  height: 65px;
  display: flex;
  align-items: center;
  transition: background 0.5s linear;
  font-size: 12px;
  user-select: none;
  position: relative;
}

.followItemContainer:hover {
  background: $lighterBackgroundColor;
}

.clickZone {
  position: absolute;
  height: 100%;
  width: 100%;
  cursor: pointer;
  top: 0px;
}

.leftNavImageContainer {
  height: 50px;
  width: 75px;
  display: flex;
  align-items: center;
  margin-left: 5px;
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
  margin-left: 5px;
}

.leftNavTitle {
  height: 75px;
  width: 250px;
  line-height: 75px;
  border-bottom: 0.5px solid $mainBorderColor;
  border-top: 0.5px solid $mainBorderColor;
  background: $darkerBackgroundColor;
}

.followingGame, .followingName, .followingStatus {
  width: 190px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.followingLogo { /* the image in each left nav stream */
  height: 50px;
  width: 50px;
  border-radius: 5px;
}

.followingName {
  font-size: 12.5px;
}

.followingGame, .followingStatus, .followingViewers {
  color: #ddddddaf;
}

.navButtonsContainer {
  background: $darkerBackgroundColor;
  border-top: 0.5px solid $mainBorderColor;
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

.navButtonsHide {
  display: none;
}

.navButton {
  background: #2c2a2a;
  height: 20px;
  width: 150px;
  padding: 5px;
  margin: 5px;
  color: #dddddd;
  transition: 0.5s;
  font-variant: small-caps;
  cursor: pointer;
}

.navButton:hover {
  background: #dddddd;
  color: #051f5c;
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
}

.hoverPreview {
  position: absolute;
  height: 180px;
  width: 320px;
  left: 250px;
  background: rebeccapurple;
  z-index: 15;
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

</style>
