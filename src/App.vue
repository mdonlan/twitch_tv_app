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

export default {
  name: 'app',
  data: function () {
    return {
      isHovering: false,
    }
  },
  mounted() {

    // when the app is first mounted check for if we are on a video page
    this.checkIsVideo();

    // if user refreshes a page check if on video page or normal page
    //this.startInterval();
    //this.setInitialCustomScroll();

    //document.addEventListener('click', this.clicked);
    //document.addEventListener('mousemove', this.mouseMoved);

    localStorage.setItem("smallPlayer", false);

    // check if the url the page loaded on is a video
    let url = window.location.href;
    if(url.indexOf("stream") > -1) {
      // if link is a video
      localStorage.setItem("isPlaying", true);
    } else {
      localStorage.setItem("isPlaying", false);
    }
  },
  created() {
  },
  methods: {

    checkIsVideo() {
      let isOnVideoPage = this.$route.path.includes("/stream");
      this.$store.commit("setOnVideoPage", isOnVideoPage);
    },

    clicked(event) {
      // check all user clicks
      // this is for detecting if the user clicked and 
      // if so we should move the video to its small position
      // check link url on click to make sure we only change to small pos
      // if the link is not a stream 

      if(event.target.href) {
        // if clicked on a link
        // videos will only be links so we only have to worry if the click is on a link
        let link = event.target.href;
        if(link.indexOf("stream") > -1) {
          // if link is a video
          localStorage.setItem("isPlaying", true);
          localStorage.setItem("smallPlayer", false);
        } else {
          // if not a video then move video to small pos
          this.makeVideoSmall();
        }
      }
      
    },
    makeVideoSmall() {
      console.log('making video small');

      localStorage.setItem("smallPlayer", true);
      localStorage.setItem("isPlaying", true);

      let videoContainer = document.querySelector(".videoPlayerWrapper");
      videoContainer.style.height = '225px';
      videoContainer.style.width = '400px';
      videoContainer.style.zIndex = '9';
      videoContainer.style.top = 'calc(100% - 225px)';

      let twitchEmbed = document.querySelector("#twitch-embed");
      twitchEmbed.style.height = '500px';
      twitchEmbed.style.width = '400px';

      //let twitchEmbed = document.querySelector("#twitch-embed");
      //console.log(twitchEmbed);
    },
    handleScrollLeftNav(event) {
      // handles custom scrollbar events / movement
      let target = event.target;
      let targetPos = target.getBoundingClientRect();
      //console.log(target.getBoundingClientRect())
      let scrollbar = document.querySelector(".scrollbarLeftNav");
      
      scrollbar.style.top = target.scrollTop + 55 + 'px';
      //scrollbar.style.left = '237px';
      //let diff = target.scrollHeight - target.clientHeight
  
      //scrollbar.style.height =  target.clientHeight - diff - 2 + 'px';
    },
    setInitialCustomScroll() {
      // sets up the custom scrollbars on app load

      // left nav scrollbar

      // scrollContainerLeftNav is the element we are scrolling in
      let scrollContainerLeftNav = document.querySelector(".leftNavContentContainer");
      scrollContainerLeftNav.addEventListener('scroll', this.handleScrollLeftNav);

      // set inital scrollbar properties
      let scrollbarLeftNav = document.querySelector(".scrollbarLeftNav");

      // these values are approx.
      scrollbarLeftNav.style.top = '55px';
      scrollbarLeftNav.style.left = '240px';

      // if the height of the element is not equal to the scroll height of the element
      // it means the element is overflowing and the scroll is needed
      // if they are equal the element is completly in view and 
      // scrolling is not needed, so set its height to zero
      
      if(scrollContainerLeftNav.clientHeight != scrollContainerLeftNav.scrollHeight) {
        scrollbarLeftNav.style.height = scrollContainerLeftNav.clientHeight - 4 + 'px';
      } else {
        scrollbarLeftNav.style.height = '0px';
      }

    },
    updateScroll() {
      // left nav scrollbar
      let scrollContainerLeftNav = document.querySelector(".leftNavContentContainer");
      let scrollbarLeftNav = document.querySelector(".scrollbarLeftNav");
      // diff is the difference between the element current height and its total height
      // this lets us know how large to make the scroll bar
      let diff = scrollContainerLeftNav.scrollHeight - scrollContainerLeftNav.clientHeight;

      if(scrollContainerLeftNav.clientHeight != scrollContainerLeftNav.scrollHeight) {
        scrollbarLeftNav.style.height = scrollContainerLeftNav.clientHeight - diff - 4 + 'px';
      } else {
        scrollbarLeftNav.style.height = '0px';
      }

      // search results scrollbar
      let scrollContainerSearchResults = document.querySelector(".searchResultsContainer");
      let scrollbarSearchResults = document.querySelector(".scrollbarSearchResults");
      // diff is the difference between the element current height and its total height
      // this lets us know how large to make the scroll bar
      if(scrollContainerSearchResults && scrollbarSearchResults) {
        let diff = scrollContainerSearchResults.scrollHeight - scrollContainerSearchResults.clientHeight;
        if(scrollContainerSearchResults.clientHeight != scrollContainerSearchResults.scrollHeight) {
          let height = Math.abs(scrollContainerSearchResults.clientHeight - diff) - 150 + 'px';
          scrollbarSearchResults.style.height = height;
        } else {
          scrollbarSearchResults.style.height = '0px';
        }
      }
    },
    startInterval() {
      let self = this;
      setInterval(function() {
        // update interval
        // checks which page user is on and if user is hovering over left nav
        let leftNavWrapper = document.querySelector(".leftNavWrapper");
        let url = window.location.href;

        let isPlaying = localStorage.getItem('isPlaying');
        let isSmall = localStorage.getItem('smallPlayer');

        let onVideoPage;
        if(url.indexOf("stream") > - 1) {
          // is on video page
          onVideoPage = true;
        } else {
          // not on video page
          onVideoPage = false;
        }

        if(onVideoPage || isPlaying == 'true' && isSmall == 'false') {
          // if on video page check if user is hovering over leftNav
          setVideoView();
          let hovering = checkHover();

          if(hovering) {

            // only run if previous interval was not hovering
            // aka only run when the left nav slides out, not every time its being hovered
            let followingLiveNodeList = document.querySelectorAll(".followItemContainer");
              // convert node list to array
            let followingLiveArray = Array.from(followingLiveNodeList);

            if(!self.isHovering) {
              

              // give each item an increasing delay
              //let delay = 0;
              //let delayIncreaseInterval = 0.035;

              

              followingLiveArray.forEach((item) => {
                item.style.transition = 'none';
                item.style.marginLeft = '-250px';
              })
              
              setTimeout(() => {
                followingLiveArray.forEach((item) => {
                  // give each item a random delay
                  let min = 5; // ms
                  let max = 30; // ms
                  let delay = Math.floor(Math.random() * (max - min + 1) + min);
                  
                  let delayMS = delay / 100;
                  console.log(delay)
                  item.style.transition = '0.3s';
                  item.style.transitionDelay = delayMS + 's';
                  //delay += delayIncreaseInterval;
                  item.style.marginLeft = '0px';
                })
              }, 100)
            }

            followingLiveArray.forEach((item) => {
                if(item.style.marginLeft == '0px') {
                  item.style.transition = '0.5s';
                }
              })


            self.isHovering = true;


            leftNavWrapper.style.width = '250px';
            leftNavWrapper.style.marginLeft = '0px';
            
          } else {
            self.isHovering = false;
            leftNavWrapper.style.width = '0px';
            leftNavWrapper.style.marginLeft = '-2px';
          }
        } else {
          // if not on video page
          setNormalView();
        }

        // update custom scrollbars
        self.updateScroll();
      }, 100);
    },
  } 
}



function setVideoView() {
  let leftNav = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");
  let leftNavButtons = document.querySelector(".navButtonsContainer");
  leftNav.style.width = '250px';
  leftNav.style.marginTop = '0px';
  leftNav.style.height = '100%';
  leftNav.style.opacity = '1';

  leftNav.style.boxShadow = '10px 0px 5px 0px rgba(0,0,0,0.75)';
  leftNav.style.borderRight = '0.5px solid #2c65ce';
  
  content.style.opacity = '1';
  content.style.height = 'calc(100% - 340px)';
  content.style.paddingBottom = '0px';

  title.style.opacity = '1';
  title.style.borderTop = 'none';

  leftNavButtons.style.display = "flex";
};

function setNormalView() {
  let leftNav = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");
  let leftNavButtons = document.querySelector(".navButtonsContainer");
  leftNav.style.width = '250px';
  leftNav.style.marginLeft = '0px';
  leftNav.style.marginTop = '75px';
  leftNav.style.height = 'calc(100% - 75px)';
  leftNav.style.opacity = '1';

  leftNav.style.boxShadow = '';
  leftNav.style.borderRight = '0.5px solid #2c65ce';
  
  content.style.opacity = '1';
  content.style.height = 'calc(100% - 75px)';
  content.style.paddingBottom = '22px';

  title.style.opacity = '1';
  title.style.borderTop = '0.5px solid #2c65ce';

  leftNavButtons.style.display = "none";
};

function checkHover() {
  let leftNav = document.querySelector(".leftNavWrapper");
  
  let leftNavMouseWatcherHover = $('.mouseEventWatchLayerLeft').is(":hover");
  let leftNavHover = $('.leftNavWrapper').is(":hover");

  if(leftNavMouseWatcherHover || leftNavHover) {
    //leftNav.style.width = '250px';
    return true
  } else {
    //leftNav.style.width = '0px';
    return false
  }
};

</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Roboto');

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

body {
  margin: 0px;
  overflow: hidden;
  background-color: rgb(9, 2, 12);
  /* background-image: url("https://www.transparenttextures.com/patterns/black-linen.png"); */
}

.topNavContainer {
  height: 75px;
  width: 100%;
  background: #111111;
  position: absolute;
  top: 0px;
}

.isOnVideo {
  z-index: 5;
  margin-top: 0;
}

</style>