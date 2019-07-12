<template>

    <div class="game">
        <div class="stream" :key="stream._id" v-for="stream in this.$store.state.streamsByGame">
            <router-link class="clickZone" :to="{path: 'stream', query: { name: stream.channel.name}}"/>
            <div class="imageContainer">
                <img class="streamImage" :src="stream.preview.large">
            </div>
            <div class="textContainer">
                <div class="name streamItem">{{stream.channel.name}}</div>
                <div class="game streamItem">{{stream.channel.game}}</div>
                <div class="status streamItem">{{stream.channel.status}}</div>
                <div class="viewers streamItem">{{stream.viewers.toLocaleString()}}</div>
            </div>
        </div>
    </div>

</template>

<script>

import { getStreamsByGame } from '../../TwitchAPI'

export default {
    name: 'Game',

    data: function () {
        return {
            gameName: null
        }
    },

    created () {
        this.getGameName();
        getStreamsByGame(this.gameName);
    },

    methods: {
        getGameName() {
            const url = window.location.href;
            if (url.includes("game")) {
                this.gameName = url.match(/name=(.*)/)[1]
            }
        }
    }
}

</script>

<style lang="scss"scoped>

@import "../../global_styles.scss";

.game {
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

.stream {
    height: 32%;
    width: 18%;
    background: $mainBackgroundColor;
    color: #dddddd;
    margin: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.textContainer {
    height: 50%;
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
    height: 100%;
    width: 100%;
    opacity: 0;
    background: #222222;
    transition: 0.5s;
}

.clickZone:hover {
    opacity: 0.7;
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

.game, .viewers, .status {
    color: rgba(221, 221, 221, 0.774);
    font-size: 14px;
}

</style>