<template>
  <div id="app">
    <topNav></topNav>
    <leftNav></leftNav>
    <notifications></notifications>
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
    // if user refreshes a page check if on video page or normal page
    //this.checkPage();
    this.startInterval();
    this.setInitialCustomScroll();
  },
  created() {
  },
  methods: {
    handleScrollLeftNav(event) {
      // handles custom scrollbar events / movement
      let target = event.target;
      let targetPos = target.getBoundingClientRect();
      //console.log(target.getBoundingClientRect())
      let targetLeft = targetPos.width - 40;
      let scrollBar = document.querySelector(".scrollBar");
      
      scrollBar.style.top = target.scrollTop + 55 + 'px';
      //scrollBar.style.left = '237px';
      //let diff = target.scrollHeight - target.clientHeight
  
      //scrollBar.style.height =  target.clientHeight - diff - 2 + 'px';
    },
    setInitialCustomScroll() {
      // sets up the custom scrollbar on app load

      // scrollContainerLeftNav is the element we are scrolling in
      let scrollContainerLeftNav = document.querySelector(".leftNavContentContainer");
      scrollContainerLeftNav.addEventListener('scroll', this.handleScrollLeftNav);

      // set inital scrollbar properties
      let scrollBar = document.querySelector(".scrollBar");

      // these values are approx.
      scrollBar.style.top = '55px';
      scrollBar.style.left = '240px';

      // if the height of the element is not equal to the scroll height of the element
      // it means the element is overflowing and the scroll is needed
      // if they are equal the element is completly in view and 
      // scrolling is not needed, so set its height to zero
      
      if(scrollContainerLeftNav.clientHeight != scrollContainerLeftNav.scrollHeight) {
        scrollBar.style.height = scrollContainerLeftNav.clientHeight - 4 + 'px';
      } else {
        scrollBar.style.height = '0px';
      }

    },
    updateScroll() {
      let scrollContainerLeftNav = document.querySelector(".leftNavContentContainer");
      let scrollBar = document.querySelector(".scrollBar");
      // diff is the difference between the element current height and its total height
      // this lets us know how large to make the scroll bar
      let diff = scrollContainerLeftNav.scrollHeight - scrollContainerLeftNav.clientHeight

      if(scrollContainerLeftNav.clientHeight != scrollContainerLeftNav.scrollHeight) {
        scrollBar.style.height = scrollContainerLeftNav.clientHeight - diff - 4 + 'px';
      } else {
        scrollBar.style.height = '0px';
      }
      //console.log(scrollContainerLeftNav.clientHeight)
      //console.log(scrollContainerLeftNav.offsetHeight)
      //console.log(scrollContainerLeftNav.scrollHeight)
    },
    startInterval() {
      let self = this;
      setInterval(function() {
        // update interval
        // checks which page user is on and if user is hovering over left nav
        let leftNavWrapper = document.querySelector(".leftNavWrapper");
        let url = window.location.href;

        let onVideoPage;
        if(url.indexOf("stream") > - 1) {
          // is on video page
          onVideoPage = true;
        } else {
          // not on video page
          onVideoPage = false;
        }

        if(onVideoPage) {
          // if on video page check if user is hovering over leftNav
          setVideoView();
          let hovering = checkHover();

          if(hovering) {
            leftNavWrapper.style.width = '250px';
            leftNavWrapper.style.marginLeft = '0px';
          } else {
            leftNavWrapper.style.width = '0px';
            leftNavWrapper.style.marginLeft = '-2px';
          }
        } else {
          // if not on video page
          setNormalView();
        }

        // update custom scrollbar
        self.updateScroll();
      }, 100);
    },
    /*
    checkPage() {
      let self = this;
      let url = window.location.href;
      if(url.indexOf("stream") > - 1) {
        self.setVideoView();
      } else {
        self.setNormalView();
      }
    },
    setNormalView() {
      console.log('setting normal view');
      // set the left nav to its normal view
      // this view is shown on all pages except the video page

      let leftNav = document.querySelector(".leftNavWrapper");
      let content = document.querySelector(".leftNavContentContainer");
      let title = document.querySelector(".leftNavTitle");

      leftNav.style.width = '250px';
      leftNav.style.marginTop = '75px';
      leftNav.style.height = 'calc(100% - 75px)';
      leftNav.style.opacity = '1';
      leftNav.style.borderRight = '2px solid #dddddd';
      content.style.height = 'auto';
    },
    setVideoView() {
      let self = this;
      console.log('setting video view');
      // set the left nav to its normal view
      // this view is shown on all pages except the video page
      let leftNav = document.querySelector(".leftNavWrapper");
      let content = document.querySelector(".leftNavContentContainer");
      let title = document.querySelector(".leftNavTitle");

      leftNav.style.width = '0px';
      leftNav.style.marginTop = '0px';
      leftNav.style.marginLeft = '-2px';
      leftNav.style.height = '100%';
      leftNav.style.opacity = '1';
      leftNav.style.borderRight = '2px solid #dddddd';
      content.style.opacity = '1';
      content.style.height = 'calc(100% - 340px)';
      title.style.opacity = '1';

      //self.
    },
    checkForHover() {
      $(document).on("mousemove", function(event) {
        let leftNav = document.querySelector(".leftNavWrapper");
        leftNav.style.width = '250px';
        leftNav.style.marginLeft = '0px';
      })
    },
    */
  },
  watch:{
    /*
    '$route': function (route) {
      // this method watches for all router changes (including reloading same route / different params)
      // user to change leftNav from video page style to normal style

      // route contains the new routes data
      let onPage = route.path;

      if(onPage == '/stream') {
        this.setVideoView();
      } else {
        this.setNormalView();
      }
      
    }
    */
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
  
  content.style.opacity = '1';
  content.style.height = 'calc(100% - 340px)';
  content.style.paddingBottom = '0px';

  title.style.opacity = '1';

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
  
  content.style.opacity = '1';
  content.style.height = 'calc(100% - 75px)';
  content.style.paddingBottom = '22px';

  title.style.opacity = '1';

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


//
// detects mouse movements on all pages of the application
// used for detecting hovering over left and top nav
//

let lastMouseMove = null;
let oneTimeAction = true;
let isOnVideoStyle = false;

/*
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
  
});

// this interval runs on app load and checks if user is on video page and if so adjust the left nav view
setInterval(function() {
  let isOnVideoPage;
  let url = window.location.href;
  
  if(url.indexOf("stream") > - 1) {
    isOnVideoPage = true;
  } else {
    isOnVideoPage = false;
    leftNavNormalStyle();
    isOnVideoStyle == false
  }

  if(isOnVideoPage) {
    leftNavStreamStyle();
  } else {
    leftNavNormalStyle();
    }
  

  // every x seconds check if user is still hovering over left nav
  // if so, do nothing, if not hide left nav
  let leftNavIsHovered = $('.leftNavWrapper').is(":hover");
  
  let time = Date.now();

  if(lastMouseMove) {
    // if mouse has moved aleast once
    let timePassed = time - lastMouseMove;
    if(timePassed > 500 && leftNavIsHovered == false) {
      if(isOnVideoPage) {
        console.log('hiding')
        //hideLeftNav();
      } else {
        console.log('showing')
        showLeftNav();
      }
    }
  } else if(leftNavIsHovered) {
    showLeftNav();
  } else {
    // if mouse not yet moved and on video page
    if(isOnVideoPage) {
      setTimeout(function() {
        console.log('hiding')
        hideLeftNav();
      }, 1000)
    }
  }
  
}, 100);

function leftNavStreamStyle() {
  //leftnav display for video view
  let leftNavWrapper = document.querySelector(".leftNavWrapper");
  let content = document.querySelector(".leftNavContentContainer");
  let title = document.querySelector(".leftNavTitle");
  
  //leftNavWrapper.style.width = '250px';
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

  //leftNavWrapper.style.width = '250px';
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

  
  // delays hiding the border until the element is already done shrinking
  $(leftNavWrapper).delay(300).queue(function(next) {
    //$(leftNavWrapper).css('border', 'none'); 
    next(); 
  });
  
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