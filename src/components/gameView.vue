<template>
  <div class="gameViewWrapper">
    <div class="streamContainer" v-for="stream in streams">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="stream.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName">{{stream.channel.name}}</div>
        <div class="streamStatus">{{stream.channel.status | truncate(40)}}</div>
        <div class="streamViewers">{{stream.viewers}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'gameView',
  data: function () {
    return {
        streams: []
    }
  },
  created () {
      this.getGameName();
      this.getTopGameStreams();
  },
  filters: {
   truncate: function (string, value) {
      if(string.length > 40) {
        return string.substring(0, value) + '...';
      } else {
        return string
      }
    }
  },
  methods: {
    getGameName() {
        var url = window.location.href;
        if(url.indexOf("game") > -1) {
            var gameName = url.match(/name=(.*)/)[1]
            localStorage.setItem("gameName", gameName);
        }
    },
    getTopGameStreams() {
        var self = this;
        var gameName = localStorage.getItem("gameName")
      // on home page load pull data from twitch
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/?game=' + gameName,
        headers: {'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99'}
      })
        .then(function(response) {
          var streamData = response.data.streams;
          //console.log('streamData', streamData)
          self.streams = streamData;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.gameViewWrapper {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
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
