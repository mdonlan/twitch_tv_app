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
  data: function () {
    return {
      lastMouseMove: null,
    }
  },
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

let lastMouseMove = null;

$(document).on("mousemove", function(event) {

  // check if user is hovering over the left nav
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");

  // only check on stream / video pages
  if(window.location.href.indexOf("stream") > -1) {
    let time = Date.now();
    lastMouseMove = time;
  }
  /*
  // check if the url indicates if the user is on a stream / video page
  // only change the nav settings if on stream / video page
  if(window.location.href.indexOf("stream") > -1) {
    // set leftnav display for video view
    leftNavWrapper.style.width = '250px';
    leftNavWrapper.style.marginTop = '0px';
    leftNavWrapper.style.height = '100%';
    leftNavWrapper.style.opacity = '1';
    leftNavWrapper.style.borderRight = '2px solid #dddddd';
    //leftNavWrapper.style.display = 'block';
    
    content.style.opacity = '1';
    content.style.height = 'calc(100% - 340px)';

    title.style.opacity = '1';

    let time = Date.now();
    lastMouseMove = time;
  } else {
    // set leftnav display for normal view
    leftNavWrapper.style.width = '250px';
    leftNavWrapper.style.marginTop = '75px';
    leftNavWrapper.style.height = 'calc(100% - 75px)';
    leftNavWrapper.style.opacity = '1';
    leftNavWrapper.style.borderRight = '2px solid #dddddd';

    content.style.height = 'auto';
  }
  */
});

// this interval runs on app load and checks if user is on video page and if so adjust the left nav view
setInterval(function() {

  let url = window.location.href;
  if(url.indexOf("stream") > -1) {
    leftNavStreamStyle();
  } else {
    leftNavNormalStyle();
  }
  

  // every x seconds check if user is still hovering over left nav
  // if so, do nothing, if not hide left nav
  let leftNavIsHovered = $('.leftNavWrapper').is(":hover");
  let time = Date.now()
  if(lastMouseMove) {
    let timePassed = time - lastMouseMove;
    if(timePassed > 500 && leftNavIsHovered == false) {
      if(window.location.href.indexOf("stream") > -1) {
        hideLeftNav();
      } else {
        showLeftNav();
      }
    }
  }
  
}, 1000);

function leftNavStreamStyle() {
  //leftnav display for video view
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");
  
  leftNavWrapper.style.width = '250px';
  leftNavWrapper.style.marginTop = '0px';
  leftNavWrapper.style.height = '100%';
  leftNavWrapper.style.opacity = '1';
  //leftNavWrapper.style.borderRight = '2px solid #dddddd';
  //leftNavWrapper.style.display = 'block';
  
  content.style.opacity = '1';
  content.style.height = 'calc(100% - 340px)';

  title.style.opacity = '1';
};

function leftNavNormalStyle() {
  // set leftnav display for normal view
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");

  leftNavWrapper.style.width = '250px';
  leftNavWrapper.style.marginTop = '75px';
  leftNavWrapper.style.height = 'calc(100% - 75px)';
  leftNavWrapper.style.opacity = '1';
  //leftNavWrapper.style.borderRight = '2px solid #dddddd';

  content.style.height = 'auto';
};

function hideLeftNav() {
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  leftNavWrapper.style.width = '0px';
  leftNavWrapper.style.marginLeft = '-2px';

  /*
  // delays hiding the border until the element is already done shrinking
  $(leftNavWrapper).delay(300).queue(function(next) {
    //$(leftNavWrapper).css('border', 'none'); 
    next(); 
  });
  */
};

function showLeftNav() {
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  leftNavWrapper.style.width = '250px';
  leftNavWrapper.style.opacity = '1';
  leftNavWrapper.style.marginLeft = '0px';
  leftNavWrapper.style.marginTop = '75px';
  leftNavWrapper.style.height = 'calc(100%-75px)';
  //leftNavWrapper.style.borderRight = '2px solid #dddddd';
};

/*


$(document).on("mousemove", function(event) {
    var x = event.pageX;
    var y = event.pageY; 
    var leftNavWrapper = $(".leftNavWrapper"); 
    var leftNavContentContainer = $(".leftNavContentContainer");
    var leftNavTitle = $(".leftNavTitle");

    // check if the url indicates if the user is on a stream / video page
    // only change the nav settings if on stream / video page
    var url = window.location.href;

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
    if(x && isOnVideoPage == true) {
      // if leftNav is being hovered over then load following list only after 
      // the leftNav is at full width
      // transition time takes 300ms -- in CSS
      leftNavWrapper.css("opacity", "1")
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

*/

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
