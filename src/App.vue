<template>
  <div id="app">
    <topNav></topNav>
    <leftNav></leftNav>
    <router-view/>
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

// detects mouse movements on all pages of applications
// used for detecting hovering
$(document).on("mousemove", function(event) {
    var x = event.pageX;
    var y = event.pageY;

    var url = window.location.href;
    if(url.indexOf("stream") > -1) {
        var isOnVideoPage = true;
    } else {
        isOnVideoPage = false;
        $(".leftNavWrapper").css("z-index","1")
        $(".leftNavWrapper").css("margin-top","75")
    }

    // if hovering over area where left nav would be
    // then display left nav
    if(x < 250 && isOnVideoPage == true) {
        $(".leftNavWrapper").css("z-index","5")
        $(".leftNavWrapper").css("margin-top","0")
    }
    if(x > 250) {
        $(".leftNavWrapper").css("z-index","")
        $(".leftNavWrapper").css("margin-top","")
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
  background: #111111;
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
