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
        window.addEventListener("resize", this.resizedWindow);
        this.checkIfUserIsLoggedIn();
        // get and update the users followed streams
        this.getFollowing();
        setInterval(() => {
            this.getFollowing();
        }, 60000); // 60 sec

        this.getBreakpoint();
    },

    methods:  {
        resizedWindow() {
            console.log('the window has been resized!');
            this.getBreakpoint();
        },

        getBreakpoint() {
            let width = window.innerWidth;
            let breakpoint;

            // match these breakpoints w/ the ones in responsive_mixin.scss

            if(width > 1024) {
                breakpoint = 'desktop';
            } else if(width < 1024 && width > 768) {
                breakpoint = 'tablet'
            } else if(width < 768) {
                breakpoint = 'phone'
            }

            this.$store.commit("setBreakpoint", breakpoint);
        },
        
        checkIfUserIsLoggedIn() {
            // when first starting the app check if the user has a valid clientID + token
            let clientID = localStorage.getItem("id_token");
            let accessToken = localStorage.getItem("access_token");
        },

        getFollowing() {
            let accessToken = "OAuth " + localStorage.getItem("access_token");
            axios({
                method:'get',
                url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
                headers: {
                    'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
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