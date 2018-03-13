<template>
  <div class="twitchWrapper" v-on:scroll="handleScroll">
    <div class="streamContainer" v-for="stream in streams">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="stream.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName">{{stream.channel.name | truncate(20)}}</div>
        <div class="streamGame">{{stream.channel.game | truncate(20)}}</div>
        <div class="streamStatus">{{stream.channel.status | truncate(25)}}</div>
        <div class="streamStatus">{{stream.viewers | addComma}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

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
        url:'https://api.twitch.tv/kraken/streams/?limit=100&offset=0',
        headers: {'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99'}
      })
        .then(function(response) {
          var streamData = response.data.streams;
          self.streams = streamData;
      });
    },
    handleScroll(event) {
      var last = $(".streamContainer").last();
      var elementTop = last.offset().top;
      var elementBottom = elementTop + last.outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if(elementBottom > viewportTop && elementTop < viewportBottom) {
        //console.log('last element is visible');
      } else {
        //console.log('last element is NOT visible');
      }

      return elementBottom > viewportTop && elementTop < viewportBottom;

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
  margin-top: 100px;
  margin-left: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #111111;
  height: calc(100% - 75px);
}

.streamContainer {
  height: 250px;
  width: 250px;
  background: #051f5c;
  color: #dddddd;
  margin: 15px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border: 3px solid #dddddd;
}

.streamContainer:hover {
  opacity: 0.5;
  font-size: 15px;
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
  border-bottom: 1px solid #dddddd;
}

.clickZone {
    position: absolute;
    height: 250px;
    width: 250px;
}

</style>
