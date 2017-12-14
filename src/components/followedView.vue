<template>
  <div class="followedViewWrapper">
    <div class="streamContainer" v-for="follow in following">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: follow.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="follow.preview.large">
      </div>
      <div class="streamTextContainer">
        <div class="streamName">{{follow.channel.name | truncate(20)}}</div>
        <div class="streamGame">{{follow.channel.game | truncate(20)}}</div>
        <div class="streamStatus">{{follow.channel.status | truncate(20)}}</div>
        <div class="streamStatus">{{follow.viewers | addComma}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'followedView',
  data: function () {
    return {
        following: []
    }
  },
  created () {
      this.getFollowing();
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
    getFollowing() {
    var self = this;
    var accessToken = localStorage.getItem("access_token");
    var key = "OAuth " + accessToken;

    axios({
    method:'get',
    url:'https://api.twitch.tv/kraken/streams/followed?limit=25',
    headers: {
        'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
        'Authorization' : key
        }
    })
    .then(function(response) {
        var followingData = response.data.streams;
        self.following = followingData;
    });
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
