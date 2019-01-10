<template>
  <div id="app">
    <topNav></topNav>
    <leftNav></leftNav>
    <notifications></notifications>
    <videoPlayer></videoPlayer>

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import { devID, prodID } from './clientID.js';

export default {
  name: 'app',
  data: function () {
    return {}
  },
  mounted() {
    document.addEventListener("mousemove", this.mouseMoveHandler);

    this.checkIfUserIsLoggedIn();
    
    // get and update the users followed streams
    this.getFollowing();
    setInterval(() => {
      this.getFollowing();
    }, 60000); // 60 sec
  },
  methods:  {
    checkIfUserIsLoggedIn() {
      // when first starting the app check if the user has a valid clientID + token
      // console.log("__CHECKING IF USER IS LOGGED IN__");
      // console.log(this.$store.state.username);

      // first check to see if the user has a client id saved in localStorage
      let clientID = localStorage.getItem("id_token");
      let accessToken = localStorage.getItem("access_token");
      
        //
        //
        // WORKING
        //
        // what do we want to do
        // when the user loads the app check if there is
        // a stored clientid / accesstoken in local storage
        //
        // if so then send a request to validate the accessToken and in the 
        // response get the username to set in the store
    },

    getFollowing() {
      let accessToken = "OAuth " + localStorage.getItem("access_token");
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
        headers: {
          'Client-ID': devID,
          'Authorization': accessToken
        }
      })
      .then(response => {
        this.$store.commit("setFollowing", response.data.streams);
      })
      .catch(error => {
          console.log(error);
      });
    },
    mouseMoveHandler(event) {
      // watches the mouse movement and checks whether we are over an IFRAME or not
      // if we are over an Iframe it means we are over the video player / chat
      // and that we should hide the leftNav
      // otherwise show the leftNav
    
      let toElem = event.toElement;
      let tag = toElem.tagName;
      let className = toElem.className;
      //console.log(className);
      //console.log(tag)
        
        if(tag == "IFRAME") {
            if(this.$store.state.onVideoPage) {
                this.setLeftNavPos(true);
            }
        }

        if(className == "mouseEventWatchLayerLeft") {
            if(this.$store.state.onVideoPage) {
                this.setLeftNavPos(false);
            }
        }
      this.checkHoveringOverStream(toElem);

      let mousePos = {x: event.clientX, y: event.clientY};
      this.$store.commit("setMousePos", mousePos);
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

    checkHoveringOverStream(toElem) {
      // check if we are hovering over a left nav stream
      // if so then show a preview image of the stream

      // check if the elem we are over has data-channel
      // left nav streams are the only ones that have this data
      if(toElem.getAttribute("data-channel")) {
        this.isHovering = true;
        let hoverElemChannel = toElem.getAttribute("data-channel");
        let hoverSrc = null;
        
        // find which stream we are hovering over
        this.following.forEach((stream) => {
          if(stream.channel.name == hoverElemChannel) {
            hoverSrc = stream.preview.large;
          }
        });
    
        // set the hover preview elem pos and src
        let elemPos = toElem.getBoundingClientRect();
        let hoverElemContainer = document.querySelector(".hoverPreviewImg");
        let hoverElemImg = document.querySelector(".hoverPreview");
        // :style="{top: hoverPreviewTop + 'px'}"
        let top = hoverElemContainer.style.top = elemPos.top + "px";
        hoverElemImg.src = hoverSrc;
        // this.hoveringChannelPreviewSrc = hoverSrc;

        let hoverTriangle = document.querySelector(".hoverPreviewTriangle");
        hoverTriangle.style.top = elemPos.top + "px";
      } else {
        this.isHovering = false;
        // if not hovering over a stream clear image
        // this.hoveringChannelPreviewSrc = null;
      }
    },
  } 
}
</script>

<style> /* THIS STYLE IS GLOBAL -- NO LOCAL SCOPE */
@import url('https://fonts.googleapis.com/css?family=Roboto');

/* these control size of app */
html, body {
  height: 100%;
  width: 100%;
  margin: 0px;
  overflow: hidden;
  background-color: rgb(9, 2, 12);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  margin-top: 0px;
  height: 100%;
  width: 100%;
}

</style>