<template>
  <div class="topNavWrapper">
    <img class="twitchLogo" src="../assets/Twitch_White_RGB.png">
    <div class="topNavBtnContainer">
            <router-link class="topNavBtn" v-bind:to="{path: '/'}">Popular</router-link>
            <router-link class="topNavBtn" v-bind:to="{path: 'games'}">Games</router-link>
            <router-link class="topNavBtn" v-bind:to="{path: 'followed'}">Followed</router-link>
            <router-link class="topNavBtn" v-bind:to="{path: 'subscribed'}">Subscribed</router-link>
            <router-link class="topNavBtn aboutButton" v-bind:to="{path: 'about'}">About</router-link>
    </div>
    <div v-if="needToLogin" class="twitchConnectBtn">
        <a href="https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=yb1fpw6w2ldfn50b0ynr50trdcxn99&redirect_uri=https://mdonlan.github.io/twitch_tv_app&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671">Connect Twitch</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'topNav',
  data: function () {
    return {
      needToLogin: true
    }
  },
  created () {
    this.checkLoggedIn();
    this.redirectFromTwitch();
  },
  methods: {
    connectTwitch() {
        
    },
    checkLoggedIn() {
        var self = this;
        var url = window.location.href;
        if(url.indexOf("access_token") > -1) {
            console.log('user has access token in url');
            this.needToLogin = false;
            this.saveUserToken();
        }
        if(localStorage.getItem("id_token")) {
            console.log('user has twitch access token')
            this.needToLogin = false;
        } else {
            console.log('user not logged in to twitch');
        }
    },
    saveUserToken() {
        var url = window.location.href;
        if(url.indexOf("access_token") > -1) {
            var urlString = url;
            var urlAccessToken = urlString.match("access_token=(.*)&id_token");
            var urlIdToken = urlString.match("id_token=(.*)&scope");
            //console.log("accessToken: " + urlAccessToken[1]);
            //console.log("idToken: " + urlIdToken[1]);
            localStorage.setItem("access_token", urlAccessToken[1]);
            localStorage.setItem("id_token", urlIdToken[1]);
        }
    },
    redirectFromTwitch() {
        var url = window.location.href;
        if(url.indexOf("access_token") > -1) {
            // after getting access token and id saved
            // redirect to home page so vue knows what to display
            window.location.href = 'https://mdonlan.github.io/twitch_tv_app';
        }
    },
    getFollowedStreams() {
        var idToken = localStorage.getItem("id");
        var key = "OAuth " + idToken;
        // clear old streams
        clearAllStreams();
        axios({
            metohd: 'GET',
            url: 'https://api.twitch.tv/kraken/streams/followed?limit=25',
            headers: {
            'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99',
            'Authorization' : key
            },
            success: function(data) {
                var data = data.streams;
                var type = "channel";
                if(isLeftNav == true) {
                    console.log('is left nav == true')
                    displayLeftNavData(data);
                } else {
                    console.log('is left nav == false')
                    createDivForEach(data, type);
                }
                isLeftNav = false;
            },
            error: function(jq,status,message) {
                console.log('An error has occured with the http request. Status: ' + status + ' - Message: ' + message);
            }
        });
        /*
axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/streams/?limit=25&offset=0',
        headers: {'Client-ID': 'yb1fpw6w2ldfn50b0ynr50trdcxn99'}
      })
        .then(function(response) {
          var streamData = response.data.streams;
          self.streams = streamData;
      });
        */
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topNavWrapper {
    position: fixed;
    z-index: 1;
    margin-top: 0px;
    background: #061539;
    height: 75px;
    width: 100%;
    top:0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #dddddd;
    z-index: 2;
}

.topNavBtnContainer {
    display: flex;
}

.topNavBtn {
    height: 35px;
    width: 100px;
    border: solid 1px #dddddd;
    margin-right: 10px;
    margin-left: 10px;
    line-height: 35px;
    color: #dddddd;
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;          /* Likely future */ 
    text-decoration: none;
}

.topNavBtn:hover {
    background: #dddddd;
    color: #111111;
}

.twitchConnectBtn {
    height: 35px;
    width: 150px;
    border: solid 1px #dddddd;
    margin-right: 10px;
    margin-left: 10px;
    line-height: 35px;
    color: #dddddd;
    background: #573367;
}

.twitchLogo {
    position: absolute;
    top: 25px;
    left: 80px;
    height: 25px;
    width: 75px;
}

.aboutButton {
    position: absolute;
    top: 20px;
    right: 100px;
}

a {
    text-decoration: none;
}

</style>
