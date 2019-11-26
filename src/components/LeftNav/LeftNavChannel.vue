<template>

    <div class="stream">
        <div class="clickZone" @click="clickedVideoLink(stream)" :data-channel="stream.channel.name" />
        <div class="logoContainer">
            <img class="logo leftNavItem" v-bind:src="stream.channel.logo">
        </div>
        <div class="textContainer">
            <div class="name leftNavItem">{{stream.channel.name}}</div>
            <div class="game leftNavItem">{{stream.channel.game}}</div>
            <div class="status leftNavItem">{{stream.channel.status}}</div>
            <div class="viewers leftNavItem">{{stream.viewers.toLocaleString()}}</div>
        </div>
    </div>

</template>

<script>

import axios from 'axios';

export default {
    name: 'LeftNavChannel',

    props: ["stream"],

    filters: {
        addComma: function (string) {
            return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    methods: {
        clickedVideoLink(stream) {
            // clicked a link to a stream on the leftNav
            let to = {path: 'stream', query: {name: stream.channel.name}};
            this.$router.push(to);
            
            // if we are on mobile auto hide the leftNav
            if(this.$store.state.breakpoint == 'phone') {
                this.showingMobile = false;
                this.leftNavElem.classList.remove('show_mobile')
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../global_styles.scss";
@import "../../responsive_mixin.scss";

.stream {
    width: 250px;
    height: 65px;
    display: flex;
    align-items: center;
    transition: background 0.3s linear;
    font-size: 12px;
    user-select: none;
    position: relative;
}

.stream:hover {
    background: $lighterBackgroundColor;
    color: #ffffff;
    z-index: 10;
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;
    top: 0px;
}

.logoContainer {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    margin-left: 2px;
    margin-right: 2px;
}

a {
    text-decoration: none;
    outline: none;
}

.textContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.game, .name, .status {
    width: 190px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
}

.logo {
    height: 100%;
    border-radius: 5px;
}

.name {
    font-size: 13px;
}

.game, .viewers, .status {
    color: #ddddddaf;
}

</style>