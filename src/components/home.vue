<template>
  <div class="twitchWrapper" v-on:scroll="handleScroll">
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
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'Home',
  data: function () {
    return {
      streams: [],
      pageSize: null
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
        headers: {'Client-ID': '034f31qw57vu405ondtxpqwp104q5o'}
        // client ids
        // dev -- 034f31qw57vu405ondtxpqwp104q5o
        //prod -- yb1fpw6w2ldfn50b0ynr50trdcxn99
        
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
    }
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
  padding-top: 30px;
  margin-left: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  
  height: calc(100% - 75px);
}

.streamContainer {
  height: 225px;
  width: 250px;
  background: #051f5c;
  color: #dddddd;
  margin: 10px;
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 0px 1.5px #141414;
  -moz-box-shadow: 0px 0px 0px 1.5px #141414;
  box-shadow: 0px 0px 0px 0.5px #e4e3e323;
  border-radius: 10px;
}

.streamContainer:hover {
  -webkit-box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.75);
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
  
  
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  
}

.clickZone {
  position: absolute;
  height: 225px;
  width: 250px;
  background: #222222;
  opacity: 0;
  border-radius: 10px;
  transition: 0.5s;
}

.clickZone:hover {
  opacity: 0.3;
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
