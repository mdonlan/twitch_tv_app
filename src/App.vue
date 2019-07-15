<template>

<div id="app">
    <TopNav />
    <LeftNav />
    <notifications />
    <videoPlayer />
    <router-view :key="$route.fullPath"/>
</div>

</template>

<script>

import { initTwitchAPI } from './TwitchAPI'

export default {
    name: 'app',

    mounted() {
        window.addEventListener("resize", this.resizedWindow);
        initTwitchAPI();
        this.getBreakpoint();
    },

    methods:  {
        resizedWindow() {
            this.getBreakpoint();
        },

        getBreakpoint() {
            let width = window.innerWidth;
            let breakpoint;
            // match these breakpoints w/ the ones in responsive_mixin.scss
            if(width > 1024) breakpoint = 'desktop';
            else if(width < 1024 && width > 768) breakpoint = 'tablet';
            else if(width < 768) breakpoint = 'phone';
            this.$store.commit("setBreakpoint", breakpoint);
        }
    } 
}

</script>

<style lang="scss"> /* THIS STYLE IS GLOBAL -- NOT LOCAL SCOPE */

@import url('https://fonts.googleapis.com/css?family=Roboto');
@import "./global_styles.scss";

html, body {
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