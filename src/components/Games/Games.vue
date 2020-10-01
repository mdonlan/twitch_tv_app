<template>

    <div class="games">
        <div class="game" :key="game.id" v-for="game in this.$store.state.games">
            <router-link class="clickZone" :to="{path: 'game', query: { name: game.name}}" />
            <div class="imageContainer">
                <img class="gameImage" v-bind:src="game.box_art_url" />
            </div>
            <div class="textContainer">
                <div class="name">{{game.name}}</div>
                <!-- <div class="viewers">{{game.viewers.toLocaleString()}}</div> -->
            </div>
        </div>
    </div>

</template>

<script>

import { getGames } from '../../TwitchAPI'

export default {
    name: 'Games',

    created () {
        getGames();
    },
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.games {
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

.game {
    height: 250px;
    width: 175px;
    color: #dddddd;
    margin: 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
    background: $mainBackgroundColor;
    transition: 0.3s;
}

.game:hover {
    background: $lighterBackgroundColor;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
}

.imageContainer {
    height: 200px;
    width: 100%;
}

.gameImage {
    height: 200px;
    width: 175px;  
}

.textContainer {
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.clickZone {
    position: absolute;
    height: 250px;
    width: 175px;
    padding: 0px;
    background: #222222;
    opacity: 0;
    transition: 0.5s;
}

.name {
    width: calc(100% - 6px);
    height: 20px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3px;
    padding-right: 3px;
    font-size: 15px;
}

.viewers {
    font-size: 13px;
}

</style>