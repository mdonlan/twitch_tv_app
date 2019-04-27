<template>
  <div class="topNavWrapper">
    <div class="topNavBtnContainer">
      <router-link class="topNavBtn" v-bind:class="{ activeButton: activeButton == 'Popular' }" @click.native="clickedButton" v-bind:to="{path: '/'}">Popular</router-link>
      <router-link class="topNavBtn" v-bind:class="{ activeButton: activeButton == 'Games' }" @click.native="clickedButton" v-bind:to="{path: 'games'}">Games</router-link>
      <router-link class="topNavBtn" v-bind:class="{ activeButton: activeButton == 'Followed' }" @click.native="clickedButton" v-bind:to="{path: 'followed'}">Followed</router-link>
      <!-- <router-link class="topNavBtn" v-bind:class="{ activeButton: activeButton == 'Subscribed' }" @click.native="clickedButton" v-bind:to="{path: 'subscribed'}">Subscribed</router-link> -->
      <router-link class="topNavBtn aboutButton" v-bind:to="{path: 'about'}">About</router-link>
      <a v-if="needToLogin" class="twitchConnectBtn" :href="twitchURL"> Connect Twitch Account </a>
        <search></search>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { devID, prodID } from '../clientID.js'

export default {
  name: 'topNav',
  data: function () {
    return {
      needToLogin: true,
      activeButton: null,
      twitchURL: null
    }
  },
  created () {
    this.checkLoggedIn();
    this.redirectFromTwitch();

    // set the url based on whether we are testing on dev build or not
    if (window.location.href.includes("localhost")) {
        this.twitchURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=' + devID +'&redirect_uri=http://localhost:8080&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671';
    } else {
        this.twitchURL = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=' + prodID + '&redirect_uri=https://mdonlan.github.io/twitch_tv_app&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671';
    }
  },
  mounted() {
    setInterval(() => {
      this.setActiveButton();
    }, 250);
  },
  methods: {
    setActiveButton() {
      let self = this;
      let url = window.location.href;
      if(url.indexOf("games") > -1 || url.indexOf("game") > -1) {
        self.activeButton = 'Games'
      } else if(url.indexOf("followed") > -1) {
        self.activeButton = 'Followed'
      } else if(url.indexOf("subscribed") > -1) {
        self.activeButton = 'Subscribed'
      } else {
        self.activeButton = 'Popular'
      }
    },
    clickedButton(event) {
      let self = this;
      self.activeButton = event.target.innerHTML;
    },
    checkLoggedIn() {
        var self = this;
        var url = window.location.href;
        if(url.indexOf("access_token") > -1) {
            //console.log('user has access token in url');
            this.needToLogin = false;
            this.saveUserToken();
        }
        if(localStorage.getItem("id_token")) {
            //console.log('user has twitch access token')
            this.needToLogin = false;
        } else {
            //console.log('user not logged in to twitch');
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
            // this simply removes the extra data on the address when twitch does their redirect

            if (window.location.href.includes("localhost")) {
                window.location.href = 'http://localhost:8080/#/';
            } else {
                 window.location.href = 'https://mdonlan.github.io/twitch_tv_app';
            }

            // window.location.href = window.location.href.includes("localhost") ? devID : prodID,
            
            // prod redirect
            //window.location.href = 'http://localhost:8080';
            // local redirect
            //window.location.href = 'http://localhost:8080/#/';
            // prod redirect
            // window.location.href = 'https://mdonlan.github.io/twitch_tv_app';

            /*
              when connecting twitch account we need to give twitch a redirect link
              --prod link address = https://mdonlan.github.io/twitch_tv_app
              --dev link address = http://localhost:8080

              we also change which twitch dev account when switching between dev and prod
              ??why??

              034f31qw57vu405ondtxpqwp104q5o - localhost twitch api account id
              yb1fpw6w2ldfn50b0ynr50trdcxn99 - live/prod twitch api account id
            */
        }
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";
@import "../responsive_mixin.scss";

.topNavWrapper {
    position: fixed;
    margin-top: 0px;
    background: $mainBackgroundColor;
    height: 75px;
    margin-left: 100px;
    width: calc(100% - 100px);
    top:0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
}

.topNavBtnContainer {
    display: flex;
}

.topNavBtn {
  height: 35px;
  width: 100px;
  margin-right: 10px;
  margin-left: 10px;
  line-height: 35px;
  color: #dddddd;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */ 
  text-decoration: none;
  // -webkit-transition: 0.3s linear;
  // -moz-transition: 0.3s linear;
  // -o-transition: 0.3s linear;
  // transition: 0.3s linear;
  // box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  font-variant: small-caps;
  position: relative;
  // background: #222222;
}

.topNavBtn::before {
  content: '';
  width: 0px;
  background: #dddddd;
  height: 1px;
  position: absolute;
  top: calc(100% - 3px);
  transition: 0.5s;
  left: 50%;
}

.topNavBtn:hover::before {
  content: '';
  width: 50%;
  left: 0%;
}

.topNavBtn::after {
  content: '';
  left: 50%;
  width: 0%;
  background: #dddddd;
  height: 1px;
  position: absolute;
  top: calc(100% - 3px);
  transition: 0.5s;
}

.topNavBtn:hover::after {
  width: 50%;
}

// .topNavBtn:hover {
//   // background: #333333;
//   border-bottom: 1px solid #dddddd;
// }

.activeButton {
  background: #d5d9df;
  color: #111111;
  border: none !important;
}

.twitchConnectBtn {
  height: 35px;
  width: 175px;
  border: solid 0.5px #2c65ce;
  margin-right: 10px;
  margin-left: 10px;
  line-height: 35px;
  color: #dddddd;
  background: #5a087e;
  font-size: 14px;
  -webkit-transition: 0.3s linear;
  -moz-transition: 0.3s linear;
  -o-transition: 0.3s linear;
  transition: 0.3s linear;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */ 
  text-decoration: none;
  border-radius: 3px;
}

.twitchConnectBtn:hover {
  background: #900fc7;
}

a {
  text-decoration: none;
  color: #dddddd;
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

//
// media queries
//

@include phone {

    .topNavWrapper {
        margin-left: 0px;
        width: 100%;
        height: 125px;
    }

    .topNavBtnContainer {
        flex-wrap: wrap;
    }

    .topNavBtn {
        width: 40%;
    }

    .aboutButton {
        position: relative;
        top: 0px;
        right: 0px;
    }
}

</style>
