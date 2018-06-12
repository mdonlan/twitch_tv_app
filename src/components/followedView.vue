<template>
  <div class="followedViewWrapper">
    <div class="streamContainer" v-for="follow in following">
      <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: follow.channel.name}}"></router-link>
      <div class="streamImageContainer">
        <img class="streamImage" v-bind:src="follow.channel.logo">
      </div>
      <div class="streamTextContainer">
        <div>{{follow.channel.name}}</div>
        <div>Followers: {{follow.channel.followers | addComma}}</div>
        <div>Total Views: {{follow.channel.views | addComma}}</div>
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
      following: [],
    }
  },
  created () {
    this.getUsername();
  },
  filters: {
    addComma: function (string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    getUsername() {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;

      // make a generic call to twitch api
      // this returns an object that has the username in it
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/',
        headers: {
          'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
          'Authorization' : key
          }
      })
      .then(function(response) {
        // set username in localstorage
        // not sure if we need to save this
        // does anything else need username?
        let username = response.data.token.user_name;
        localStorage.setItem("username", username);
        self.getUserID(username)
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    getUserID(username) {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/users/' + username,
        headers: {
          'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
          'Authorization' : key
          }
      })
      .then(function(response) {
        let userID = response.data._id;
                console.log(userID)
        self.getAllFollowing(userID);
      })
    },
    getAllFollowing(userID) {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/users/' + userID +'/follows/channels?limit=100',
        headers: {
          // add accept header b/c sometimes the api tries to access a 
          // different api version and causes errors
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
          'Authorization' : key
          }
      })
      .then(function(response) {
        self.following = response.data.follows;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.followedViewWrapper {
  position: absolute;
  height: calc(100% - 75px);
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
  width: 175px;
  background: #061539;
  color: #dddddd;
  margin: 15px;
  display: flex;
  flex-direction: column;
  border: 2px #dddddd solid;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.75);
}

.streamContainer:hover {
  opacity: 0.7;
  -webkit-box-shadow: 0px 0px 25px 2px rgba(77, 76, 76, 0.75);
  -moz-box-shadow: 0px 0px 25px 2px rgba(77, 76, 76, 0.75);
  box-shadow: 0px 0px 25px 2px rgba(77, 76, 76, 0.75);
}

.streamTextContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.streamImageContainer {
  height: 50%;
  width: 100%;
  border-bottom: 2px solid #dddddd;
}

.streamImage {
  height: 100%;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.clickZone {
  position: absolute;
  height: 250px;
  width: 175px;
}


</style>
