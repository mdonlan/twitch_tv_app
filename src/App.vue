<template>
<div id="app">
    <TopNav />
    <LeftNav />
    <notifications />
    <videoPlayer />
    <router-view :key="$route.fullPath" />
</div>
</template>

<script>
import { initTwitchAPI } from './TwitchAPI'
import { client_id } from './clientID.js'

export default {
    name: 'app',

    mounted() {
        window.addEventListener("resize", this.getBreakpoint);
        if (window.location.href.includes("localhost")) this.$store.commit("setClientID", client_id);
        else this.$store.commit("setClientID", prodID);

        if (window.location.href.includes("localhost")) this.$store.commit("setTwitchAuthUrl", `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=http://localhost:8080&response_type=token&scope=viewing_activity_read`);
        else this.$store.commit("setTwitchAuthUrl", `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=http://localhost:8080&response_type=token&scope=viewing_activity_read`);

        initTwitchAPI();
        this.getBreakpoint();
    },

    created() {
        // set the url based on whether we are testing on dev build or not
        // if (window.location.href.includes("localhost")) this.$store.commit("setTwitchAuthUrl", 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=' + devID + '&redirect_uri=http://localhost:8080&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671');
        // else this.$store.commit("setTwitchAuthUrl", 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=' + prodID + '&redirect_uri=https://mdonlan.github.io/twitch_tv_app&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671');

        

        // https://id.twitch.tv/oauth2/authorize?client_id=${devID}&redirect_uri=http://localhost:8080&response_type=token&scope=viewing_activity_read
    },

    methods: {
        getBreakpoint() {
            let width = window.innerWidth;
            let breakpoint;
            // match these breakpoints w/ the ones in responsive_mixin.scss
            if (width > 1024) breakpoint = 'desktop';
            else if (width < 1024 && width > 768) breakpoint = 'tablet';
            else if (width < 768) breakpoint = 'phone';
            this.$store.commit("setBreakpoint", breakpoint);
        }
    }
}
</script>

<style lang="scss">
/* THIS STYLE IS GLOBAL -- NOT LOCAL SCOPE */

@import url('https://fonts.googleapis.com/css?family=Roboto');
@import "./global_styles.scss";

html,
body {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    background-color: #0e0e0e;
    color: $fontColor;
}

#app {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    width: 100%;
}
</style>
