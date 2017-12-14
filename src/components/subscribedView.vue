<template>
  <div class="followedViewWrapper">
    <div class="streamContainer" v-for="sub in subscribed">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: sub.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="sub.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName">{{sub.channel.name | truncate(20)}}</div>
        <div class="streamGame">{{sub.channel.game | truncate(20)}}</div>
        <div class="streamStatus">{{sub.channel.status | truncate(20)}}</div>
        <div class="streamStatus">{{sub.viewers | addComma}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'subscribedView',
  data: function () {
    return {
        subscribed: []
    }
  },
  created () {
      this.getSubscribed();
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
    getSubscribed() {
        // twitch api doesn't let you get list of subscribed
        // so best we can do is check each individual channel
        // and see if a user is subscribed
        // we can narrow this down by only checking users followed channels
        // and seeing if they are also subbed to each one
        
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.followedViewWrapper {
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0px;
    margin-top: 75px;
    margin-left: 250px;
    overflow-x: hidden;
    overflow-y: auto;
}

.streamContainer {
    height: 250px;
    width: 250px;
    background: #061539;
    color: #dddddd;
    margin: 15px;
    display: flex;
    flex-direction: column;
    border: 2px #dddddd solid;
}

.streamContainer:hover {
  opacity: 0.7;
}

.streamTextContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.streamImage {
  height: 100%;
  width: 100%;

}

.clickZone {
    position: absolute;
    height: 250px;
    width: 250px;
}


</style>
