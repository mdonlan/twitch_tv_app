<template>
  <div class="twitchWrapper">
    <div class="streamContainer" v-for="stream in streams">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="stream.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName">{{stream.channel.name | truncate(20)}}</div>
        <div class="streamGame">{{stream.channel.game | truncate(20)}}</div>
        <div class="streamStatus">{{stream.channel.status | truncate(20)}}</div>
        <div class="streamStatus">{{stream.viewers | addComma}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      streams: []
    }
  },
  created () {
    // this runs after data has been created but before anything is rendered
    this.getPopularStreams();
  },
  filters: {
    truncate: function (string, value) {
      if(string.length > 20) {
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
    getPopularStreams() {
      var self = this;
      // on home page load pull data from twitch
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/?limit=25&offset=0',
        headers: {'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99'}
      })
        .then(function(response) {
          var streamData = response.data.streams;
          self.streams = streamData;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.twitchWrapper {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0px;
  margin-top: 75px;
  margin-left: 250px;
  overflow-x: hidden;
  overflow-y: auto;

  height: calc(100% - 75px);
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
