<template>
  <div id="app">
    <topNav></topNav>
    <leftNav></leftNav>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>

import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'app',
  created() {

  },
  methods: {
    // global functions
    // use only if need to access from more than one component
  }
}

//
// detects mouse movements on all pages of the application
// used for detecting hovering over left and top nav
//

$(document).on("mousemove", function(event) {
    var x = event.pageX;
    var y = event.pageY; 
    var leftNavWrapper = $(".leftNavWrapper"); 
    var leftNavContentContainer = $(".leftNavContentContainer");
    var leftNavTitle = $(".leftNavTitle");

    // check if the url indicates if the user is on a stream / video page
    // only change the nav settings if on stream / video page
    var url = window.location.href;
    //console.log(url)
    if(url.indexOf("stream") > -1) {
        var isOnVideoPage = true;

        leftNavWrapper.css("margin-top","0")
        leftNavWrapper.css("border-right","2px solid #dddddd")
        leftNavWrapper.css("display","block")
        leftNavContentContainer.css("opacity","0")
        leftNavTitle.css("opacity","0")
        leftNavTitle.css("display","block")
        leftNavWrapper.css("height","100%")
    } else {
        isOnVideoPage = false;

        leftNavWrapper.css("height","calc(100% - 75px")
        leftNavWrapper.css("margin-top","75px")
        leftNavWrapper.css("border-right","2px solid #dddddd")
        leftNavWrapper.css("display","block")
        leftNavContentContainer.css("opacity","1")
        leftNavTitle.css("opacity","1")
        leftNavTitle.css("display","block")
        leftNavWrapper.css("width","250")
    }

    // if hovering over area where left nav would be
    // then display left nav
    var tenthHeight = window.innerHeight / 10;
    // if hovering over left nav and on stream / video page
    if(x < 250 && isOnVideoPage == true) {
      // if leftNav is being hovered over then load following list only after 
      // the leftNav is at full width
      // transition time takes 300ms -- in CSS
      leftNavContentContainer.css("opacity", "1")
      leftNavTitle.css("opacity","1")
      leftNavContentContainer.css("visible", "visible")
      if(leftNavWrapper.width() <= 200) {
        leftNavWrapper.css("overflowY","hidden")
      } else {
        leftNavWrapper.css("overflowY","auto")
      }
      
      // if y is also not at the very top or very bottom of page
      // this only opens the left nav if hovering over middle part of page
      // this allows user to use button on video underneath instead of accidentally opening leftNav
      
      if(y > tenthHeight * 2 && y < window.innerHeight - tenthHeight * 2) {
        leftNavWrapper.css("width","250px")
        leftNavWrapper.css("border-right","2px solid #dddddd")
      }
    }

    // if mouse is NOT over leftNav area
    if(x > 250 && isOnVideoPage == true) {
      leftNavWrapper.css("width","0px")
      leftNavWrapper.css("border","none")
      leftNavContentContainer.css("opacity", "0")
      leftNavContentContainer.css("visible", "none")
      leftNavTitle.css("opacity","0")
      leftNavWrapper.css("width","25px")
      leftNavWrapper.css("border-right","2px solid #dddddd")
      if(leftNavWrapper.width() <= 200) {
          leftNavWrapper.css("overflowY","hidden")
        }
      

      // if not over leftNav and if mouse hasnt moved recently fully hide the left nav
      setTimeout(function () {
        if(leftNavWrapper.css("overflow") != 'hidden') {
          if(leftNavWrapper.width() <= 50) {
            leftNavWrapper.css("overflowY","hidden")
          }
        }
        if(leftNavWrapper.css("width") == '25px') {
          leftNavWrapper.css("width","0px")
          leftNavWrapper.css("border","none")
        }
      }, 1000);
    }

    // if hovering over area where top would be
    // then display top nav
    if(y < 75 && isOnVideoPage == true) {
      $(".topNavWrapper").css("z-index","5")
    }
    if(y > 75) {
      $(".topNavWrapper").css("z-index","")
    }

}); 

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
  /*
  background-color: #373837;
  background-image: url("https://www.transparenttextures.com/patterns/random-grey-variations.png");

  */

  background-color: #333333;
  background-image: url("https://www.transparenttextures.com/patterns/black-linen.png");
  
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
