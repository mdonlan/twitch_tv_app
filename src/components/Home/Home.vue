<template>

<div class="homeComponent">
    <div class="twitchWrapper">
        <HomeChannel v-bind:key="stream._id" :stream="stream" v-for="stream in streams"/>
    </div>
    <scrollbar :attachedElem="scrollbarAttachedElem" :offsetTop="offsetTop"/>
</div>

</template>

<script>

import axios from 'axios'
import $ from 'jquery'
import { devID, prodID } from '../../clientID.js'
import HomeChannel from './HomeChannel'

export default {
    name: 'Home',
    components: {
        HomeChannel
    },
    data: function () {
        return {
            streams: [],
            scrollbarAttachedElem: "twitchWrapper",
            offsetTop: 75 // height of the top nav bar container
        }
    },

    created () {
        this.getPopularStreams();
    },

    methods: {
        getPopularStreams() {
            // send a request for the most poular live streams
            axios({
                method:'get',
                url:'https://api.twitch.tv/kraken/streams/?limit=100&offset=0',
                headers: {'Client-ID': devID}
            })
            .then(response => {
                let streamData = response.data.streams;
                this.streams = streamData;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

</script>

<style lang="scss" scoped>
@import "../../responsive_mixin.scss";

.homeComponent {
    position: absoulte;
}

.twitchWrapper {
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
    overflow-y: scroll;
    height: calc(100% - 75px);
    width: calc(100% - (250px - 18px));
    padding-right: 18px;
}

// media queries

@include phone {
    .twitchWrapper {
        width: 100%;
        left: 0px;
        margin-left: 0px;
        padding-right: 0px;
    }
}

</style>