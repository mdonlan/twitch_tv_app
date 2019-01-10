<template>
  <div id="app">
    <topNav></topNav>
    <leftNav></leftNav>
    <notifications></notifications>
    <videoPlayer></videoPlayer>

    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import axios from 'axios'
import { devID, prodID } from './clientID.js';

export default {
  name: 'app',
  data: function () {
    return {}
  },
  mounted() {
    this.checkIfUserIsLoggedIn();
    
    // get and update the users followed streams
    this.getFollowing();
    setInterval(() => {
      this.getFollowing();
    }, 60000); // 60 sec
  },
  methods:  {
    checkIfUserIsLoggedIn() {
      // when first starting the app check if the user has a valid clientID + token
      // console.log("__CHECKING IF USER IS LOGGED IN__");
      // console.log(this.$store.state.username);

      // first check to see if the user has a client id saved in localStorage
      let clientID = localStorage.getItem("id_token");
      let accessToken = localStorage.getItem("access_token");
      
        //
        //
        // WORKING
        //
        // what do we want to do
        // when the user loads the app check if there is
        // a stored clientid / accesstoken in local storage
        //
        // if so then send a request to validate the accessToken and in the 
        // response get the username to set in the store
    },

    getFollowing() {
      let accessToken = "OAuth " + localStorage.getItem("access_token");
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
        headers: {
          'Client-ID': devID,
          'Authorization': accessToken
        }
      })
      .then(response => {
        this.$store.commit("setFollowing", response.data.streams);
      })
      .catch(error => {
          console.log(error);
      });
    },
  } 
}
</script>

<style> /* THIS STYLE IS GLOBAL -- NO LOCAL SCOPE */
@import url('https://fonts.googleapis.com/css?family=Roboto');

/* these control size of app */
html, body {
  height: 100%;
  width: 100%;
  margin: 0px;
  overflow: hidden;
  background-color: rgb(9, 2, 12);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111111;
  margin-top: 0px;
  height: 100%;
  width: 100%;
}

</style>