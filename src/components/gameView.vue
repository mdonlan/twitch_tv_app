<template>
  <div class="gameViewWrapper">
    <div class="streamContainer" v-for="stream in streams">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="stream.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName streamItem">{{stream.channel.name}}</div>
        <div class="streamGame streamItem">{{stream.channel.game}}</div>
        <div class="streamStatus streamItem">{{stream.channel.status}}</div>
        <div class="streamViewers streamItem">{{stream.viewers | addComma}}</div>
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
    },
    addComma: function (string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
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
        url:'https://api.twitch.tv/kraken/streams/?limit=100&game=' + gameName,
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
<style lang="scss"scoped>
@import "../global_styles.scss";

$streamHeight: 32%;
$streamWidth: 18%;

.gameViewWrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0px;
  margin-top: 75px;
  padding-top: 30px;
  margin-left: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  
  height: calc(100% - 75px);
}

.streamContainer {
  height: $streamHeight;
  width: $streamWidth;
  background: $mainBackgroundColor;
  color: #dddddd;
  margin: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
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
  height: 100%;
  width: 100%;
  opacity: 0;
  background: #222222;
  transition: 0.5s;
}

.clickZone:hover {
  opacity: 0.7;
}

.streamItem {
  width: calc(100% - 6px);
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 3px;
  padding-right: 3px;
}

.streamGame, .streamViewers, .streamStatus {
  color: rgba(221, 221, 221, 0.774);
  font-size: 14px;
}

</style>
