<template>
  <div class="homeComponent">
    <div class="twitchWrapper">
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
    <scrollbar :parentElem="scrollbarParent" :offsetTop="offsetTop"/>

  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'Home',
  data: function () {
    return {
      streams: [],
      pageSize: null,
      scrollbarParent: "twitchWrapper",
      offsetTop: 75 // height of the top nav bar container
    }
  },
  created () {
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
      // send a request for the most poular live streams

      var self = this;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/?limit=100&offset=0',
        headers: {'Client-ID': '034f31qw57vu405ondtxpqwp104q5o'}
        // client ids
        // dev -- 034f31qw57vu405ondtxpqwp104q5o
        // prod -- yb1fpw6w2ldfn50b0ynr50trdcxn99
        
      })
      .then(function(response) {
        let streamData = response.data.streams;
        self.streams = streamData;
      });
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";

$streamHeight: 32%;
$streamWidth: 18%;

.homeComponent {
  position: absoulte;
}

.twitchWrapper {
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
  overflow-y: scroll;
  height: calc(100% - 75px);
  width: calc(100% - (250px - 18px));
  padding-right: 18px;
}

.streamContainer {
  height: $streamHeight;
  width: $streamWidth;
  background: $mainBackgroundColor;
  color: #dddddd;
  margin: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 3px rgb(0, 0, 0);
  transition: 0.5s;
  position: relative;
}

.streamContainer:hover {
  box-shadow: 0px 0px 20px 3px rgb(0, 0, 0);
}

.streamTextContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.streamName {
 font-size: 15px;
}

.streamGame, .streamViewers, .streamStatus {
  color: rgba(221, 221, 221, 0.774);
  font-size: 14px;
}

.streamImage {
  height: 100%;
  width: 100%;
}

.clickZone {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #222222;
  opacity: 0;
  transition: 0.5s;
}

.clickZone:hover {
  opacity: 0.5;
}

@media only screen and (max-width: 1000px) {

  .twitchWrapper {
    margin-left: 125px;
  }
  .streamContainer {
    height: 100px;
    width: 100px;
    margin: 5px;
    font-size: 12px;
    border: 1px solid #dddddd;
  }

  .streamContainer:hover {
    opacity: 0.5;
    
  }

  .streamGame, .streamStatus, .streamViewers {
    display: none;
  }

}

</style>
