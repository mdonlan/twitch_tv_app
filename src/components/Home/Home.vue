<template>

<div class="homeComponent">
    <div class="twitchWrapper">
        <HomeChannel v-bind:key="stream._id" :stream="stream" v-for="stream in this.$store.state.popularStreams"/>
    </div>
    <scrollbar attachedElem="twitchWrapper" :offsetTop="75" />
</div>

</template>

<script>

import HomeChannel from './HomeChannel'
import { getPopularStreams } from '../../TwitchAPI'

export default {
    name: 'Home',
    components: {
        HomeChannel
    },

    created () {
        getPopularStreams();
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