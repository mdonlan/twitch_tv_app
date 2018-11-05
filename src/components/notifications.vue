<template>
  <div class="notificationsContainer" v-if='queue[0]'>
    <img class="logoImg" v-bind:src="queue[0].stream.channel.logo" />
    <div class="textContainer">
      <div class="name">{{queue[0].stream.channel.name}}</div>
      <div class="textDetails">just started streaming</div>
      <div class="game">{{queue[0].stream.channel.game}}</div>
      <div class="closeButton" v-on:click="clickedClose($event)">x</div>
    </div>
    <div class="previewContainer">
      <img class="previewImg" v-bind:src="queue[0].stream.preview.medium" />
      <router-link class="clickZone" @click.native="clickedClose($event)" v-bind:to="{path: 'stream', query: { name: queue[0].stream.channel.name}}"></router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'notifications',
  data: function () {
    return {
      following: null,   
      queue: [ /*
        TEST QUEUE DATA
        {
          data: { startTime: null, finished: false },
          stream: {channel: {name: 'test1'}},
        },
        {
          data: { startTime: null, finished: false  },
          stream: {channel: {name: 'test2'}},
        },
        {
          data: { startTime:null, finished: false  },
          stream: {channel: {name: 'test3'}},
        },
        */
      ],     
      transitionTime: 1000,
      showTime: 8000,
      sound: null,
    }
  },
  created() {
    let self = this;


    setInterval(function() {
      self.checkForNewLive();
    }, 1000);
    setInterval(function() {
      self.queueUpdate()
    }, 500)
  },
  mounted() {
    let self = this;
    // load sound file
    // do this at start b/c chrome doesn't allow you to load sounds
    // in active tabs, aka we couldn't hear notifications unless this was the active browser tab
    let sound = new Audio("./src/assets/positive.wav");
    sound.volume = 0.5;
    self.sound = sound;
  },
  methods: {
    checkForNewLive() {
      let self = this;
      // check if anybody the user is following has go live 
      // this is for displaying a notification to let the user know someone they 
      // follow has gone live

      let followingNewJSON = localStorage.getItem("following");
      let followingNew = JSON.parse(followingNewJSON);
      // if self.following is null the page has just loaded and no data has been set
      // set the data but don't show notifications

      if(self.following == null) {
        // set initial following data

        if(followingNew) {
          // if localStorage has returned followers
          self.following = followingNew;
        } else {
          // otherwise set and empty array
          self.following = [];
        }
      } else {
        // data has already been set
        // see how it compares to the new data
        
        let newLive = [];

        // loop over each item in the followingNew array
        // check to see if there is a matching one in the old data
        // if no match then it is a recent login
        followingNew.forEach((newItem) => {
          let match = false
          self.following.forEach((oldItem) => {
            
            if(newItem.channel.name == oldItem.channel.name) {
              match = true
            }
          });
          if(!match) {
            newLive.push(newItem)
            // add any new items to the queue to be displayed
            let newQueueItem = {
              data: {
                startTime: null, 
                finished: false 
              },
              stream: newItem,
            }
            self.queue.push(newQueueItem)
            console.log('new item added to queue', newQueueItem)
            //this.displayNotifications();
          }
        });

        //console.log(newLive)

        // replace old data w/ new
        self.following = followingNew;

      }
    },
    displayNotifications() {
      let self = this;
      console.log(self.queue[0])
    },
    queueUpdate() {
      let self = this;
      let queue = self.queue;
      
      // setup queue elem refs

      let container = document.querySelector(".notificationsContainer");
      let first = queue[0];

      // check what component we are on
      let url = window.location.href;
      if(container) {
        if(url.indexOf('stream') > -1) {
          // on video component
          container.style.left = "calc(40% - 150px)";
        } else {
          container.style.left = "calc(50% - 150px)";
        }
      }
      
      if(first) {
        if(!first.data.startTime) {
          // if first in queue has no start time it means it has not been started
          // yet and startTime needs to be set and the element needs to fade in
          first.data.startTime = Date.now();

          // transition element into view
          container.style.top = '75px';

          // play audio to signal a broadcaster started steaming
          setTimeout(() => {
            self.sound.play();
          }, 750)

        } else {
          // if the first queue object has already had its startTime set

          // check if it has finished is display animation


          // check to make sure container is in its starting position and that
          // the animation is marked finished

          if(container.style.top == '-500px' && first.data.finished == true) {
            // remove from queue
            queue.splice(0, 1);
          } 


          if(first.data.startTime + self.showTime < Date.now()) {
            // display time has been 5s, now return it to starting position offscreen
            container.style.top = '-500px';
          }

          if(first.data.startTime + self.showTime + self.transitionTime < Date.now()) {
            // display time has been 6s this means the animation (dur: 1s)
            // has finished going back to position and queue item can be marked finished
            first.data.finished = true;
          }
        }

        // to push a test item to queue
        // go to vue dev tools in chrome
        // click on the component you want to select
        // then in console write
        /*
        // uses following[0] as test data
          $vm.queue.push({
            stream: $vm.following[0],
            data: {startTime: null, finished: false}
          })
        */

        
        // how do queues work
        // always be checking queue[0]
        // if queue[0] has no startTime set is as now
        // then set element to drop in from top w/ transition time
        
        // if queue[0] has a start time check against current time
        // if diff is greater than 5s then push element back off top of view
        // and remove from queue
        // and go on to next one

        // need to time animations so that it has time to fade out
        // maybe I could check if the anim is running? or if its 
        // css has been reset
      }

      
    },
    clickedClose(event) {
      // clicked either close notification or go to notification
      // either way move the notification off the page
      let container = document.querySelector(".notificationsContainer");
      container.style.top = '-500px';
    },
  }
}

</script>

<style scoped>

.notificationsContainer {
  position: absolute;
  z-index: 10;
  top: -500px;
  left: calc(40% - 150px);
  transition: top 1s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.textContainer {
  display: flex;
  background: #111111;
  color: #dddddd;
  height: 40px;

  line-height: 40px;
  color: #dddddd;
  text-align: center;
  font-size: 14px;
  -webkit-box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
  border-radius: 3px;
  padding-left: 10px;
  padding-right: 10px;
}

.logoImg {
  height: 75px;
  width: 75px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.name, .textDetails {
  padding-right: 5px;
  line-height: 40px;
}

.name {
  color: rgb(64, 209, 161);
  font-size: 16px;
  line-height: 40px;
}

.game {
  color: rgb(226, 86, 43);
  font-size: 16px;
  line-height: 40px;
}

.previewImg {
  border-radius: 5px;
}

.closeButton {
  padding-left: 20px;
  font-size: 12px;
  line-height: 37px;
  cursor: pointer;
}

.previewContainer {
  position: relative;
  margin-top: 5px;
}

.clickZone {
  position: absolute;
  height: 100%;
  width: 100%;

  top: 0px;
  left: 0px;
  border-radius: 5px;
}

</style>
