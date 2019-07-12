<template>

    <div class="games">
        <div class="game" :key="game._id" v-for="game in this.$store.state.games">
            <router-link class="clickZone" :to="{path: 'game', query: { name: game.game.name}}" />
            <div class="imageContainer">
                <img class="gameImage" v-bind:src="game.game.box.large" />
            </div>
            <div class="gamesItemTextContainer">
                <div class="gameName">{{game.game.name}}</div>
                <div class="gameNumViewers">{{game.viewers.toLocaleString()}}</div>
            </div>
        </div>
    </div>

</template>

<script>

import axios from 'axios'
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
    background: $mainBackgroundColor;
    color: #dddddd;
    margin: 12px;
    display: flex;
    flex-direction: column;
}

.gameImage {
    height: 200px;
    width: 175px;  
}

.gamesItemTextContainer {
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

.clickZone:hover {
    opacity: 0.7;
}

.gameName {
    width: calc(100% - 6px);
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3px;
    padding-right: 3px;
}

</style>