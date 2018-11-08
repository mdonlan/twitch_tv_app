<template>
  <div class="gamesViewWrapper">
    <div class="gameContainer" v-for="game in games">
        <router-link class="clickZone" v-bind:to="{path: 'game', query: { name: game.game.name}}"></router-link>
        <div class="gamesItemImageContainer">
            <img class="gameImage" v-bind:src="game.game.box.large"></img>
        </div>
        <div class="gamesItemTextContainer">
            <div class="gameName">{{game.game.name}}</div>
            <div class="gameNumViewers">{{game.viewers | addComma}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'gamesView',
  data: function () {
    return {
        games: []
    }
  },
  created () {
      this.getGames();
  },
  filters: {
    truncate: function (string, value) {
      if(string.length > 15) {
        return string.substring(0, value) + '...';
      } else {
        return string
      }
    },
    addComma: function (string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    getGames() {
      var self = this;
      // on home page load pull data from twitch
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/games/top/?limit=100',
        headers: {'Client-ID': '034f31qw57vu405ondtxpqwp104q5o'}
        // client ids
        // dev -- 034f31qw57vu405ondtxpqwp104q5o
        //prod -- yb1fpw6w2ldfn50b0ynr50trdcxn99
      })
        .then(function(response) {
          var gamesData = response.data.top;
          self.games = gamesData;
          
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";

.gamesViewWrapper {
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

.gameContainer {
  height: 250px;
  width: 175px;
  background: $mainBackgroundColor;
  color: #dddddd;
  margin: 12px;
  display: flex;
  flex-direction: column;
}

.gamesItemTextContainer {
  display: flex;
}

.gameImage {
  height: 200px;
  width: 175px;  
}

.gamesItemTextContainer {
  height: 100%;
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
