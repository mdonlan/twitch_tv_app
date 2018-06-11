<template>
  <div class="searchContainer">
    <input class="searchInput" placeholder="Search for channels, games, live streams" v-on:input="searchChangeEventHandler" />
    <div class="searchResultsContainer">
      <div class="searchResult" v-for="result in searchResults">
        <!-- have a different container div for each type of search result -->
        <div class="searchResultItemContainer" v-if="result.type == 'stream'">
          <div class="searchResultItem">{{result.type}}</div>
          <div class="searchResultItem">{{result.data.channel.name}}</div>
          <div class="searchResultItem">{{result.data.viewers}}</div>
        </div>
        <div class="searchResultItemContainer" v-if="result.type == 'channel'">
          <div class="searchResultItem">{{result.type}}</div>
          <div class="searchResultItem">{{result.data.name}}</div>
        </div>
        <div class="searchResultItemContainer" v-if="result.type == 'game'">
          <div class="searchResultItem">{{result.type}}</div>
          <div class="searchResultItem">{{result.data.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import shortid from 'shortid';

export default {
  name: 'search',
  data: function () {
    return {
      searchResults: [],
      searchResultsChannels: [],
      searchResultsStreams: [],
      searchResultsGames: [],
      channelsResultsComplete: false,
      gamesResultsComplete: false,
      streamsResultsComplete: false,
      requestStartTime: null,
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    searchChangeEventHandler(event) {
      let self = this;
      let searchQuery = event.target.value;
      // every x letters typed run a search and put results below search input
      // reset search complete properties
      self.channelsResultsComplete = false;
      self.gamesResultsComplete = false;
      self.streamsResultsComplete = false;
      // reset search results each time
      self.searchResults = [];
      self.searchResultsChannels = [];
      self.searchResultsStreams = [];
      self.searchResultsGames = [];
      if(searchQuery.length > 3) {
        self.doSearch(searchQuery);
      }
    },
    doSearch(searchQuery) {
      let self = this;
      // there are 3 different seach categories and as far as i can tell
      // we have to search them each

      // set start time for search
      // we will use this to only display the most recent request time data
      let requestStartTime = Date.now();
      self.requestStartTime = requestStartTime;
      
      // searches all channels
      self.searchChannels(searchQuery, requestStartTime); 
      // searches all games
      self.searchGames(searchQuery, requestStartTime); 
      // searches all live streams
      self.searchStreams(searchQuery, requestStartTime); 
    },
    searchChannels(searchQuery, requestStartTime) {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/search/channels?query=' + searchQuery,
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': '034f31qw57vu405ondtxpqwp104q5o',
          'Authorization' : key
          }
        })
      .then(function(response) {
        // on promise return check to see if the start time we sent w/ this request
        // is the same as the most recent on set in data
        if(requestStartTime === self.requestStartTime) {
          let channels = response.data.channels;
          channels.forEach(channel => {
            let newSearchItem = {
              data: channel,
              type: 'channel',
              startTime: requestStartTime,
            }
            self.searchResultsChannels.push(newSearchItem);
          });
          self.channelsResultsComplete = true;

          // attempt to sort, but only run if all complete
          if(self.channelsResultsComplete &&
            self.gamesResultsComplete &&
            self.streamsResultsComplete) {
              self.sortSearchResults(searchQuery);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    searchGames(searchQuery, requestStartTime) {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/search/games?query=' + searchQuery,
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': '034f31qw57vu405ondtxpqwp104q5o',
          'Authorization' : key
          }
        })
      .then(function(response) {
        if(requestStartTime === self.requestStartTime) {
          let games = response.data.games;
          games.forEach(game => {
            let newSearchItem = {
              data: game,
              type: 'game',
            }
            self.searchResultsGames.push(newSearchItem);
          })
          self.gamesResultsComplete = true;

          // attempt to sort, but only run if all complete
          if(self.channelsResultsComplete &&
            self.gamesResultsComplete &&
            self.streamsResultsComplete) {
              self.sortSearchResults(searchQuery);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    searchStreams(searchQuery, requestStartTime) {
      let self = this;
      let accessToken = localStorage.getItem("access_token");
      let key = "OAuth " + accessToken;
      axios({
        method:'get',
        url:'https://api.twitch.tv/kraken/search/streams?query=' + searchQuery,
        headers: {
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': '034f31qw57vu405ondtxpqwp104q5o',
          'Authorization' : key
          }
        })
      .then(function(response) {
        if(requestStartTime === self.requestStartTime) {
          let streams = response.data.streams;
          streams.forEach(stream => {
            let newSearchItem = {
              data: stream,
              type: 'stream',
            }
            self.searchResultsStreams.push(newSearchItem);
          })
          self.streamsResultsComplete = true;

          // attempt to sort, but only run if all complete
          if(self.channelsResultsComplete &&
            self.gamesResultsComplete &&
            self.streamsResultsComplete) {
              self.sortSearchResults(searchQuery);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    sortSearchResults(searchQuery) {
      console.log('sorting search results')
      let self = this;

      // sorting //
      // currently we only return results that completely match the search query
      // ex a query of 'shroudd' would return shroud, but a query of 'shroutd' would not return shroud
      
      // put all streams first in results

      self.searchResultsStreams.forEach((result) => {
        let name = result.data.channel.name;
        let nameContainsSearchQuery = name.includes(searchQuery);
        if(nameContainsSearchQuery) {
          self.searchResults.push(result);
        }
      });

      // w/ in streams sort by closest to query and then by viewers

      // put all channels in second and sort by something

      self.searchResultsChannels.forEach((result) => {
        let name = result.data.name;
        let nameContainsSearchQuery = name.includes(searchQuery);
        if(nameContainsSearchQuery) {
          self.searchResults.push(result);
        }
      });

      // put all games last

      self.searchResultsGames.forEach((result) => {
          let name = result.data.name;
          let nameContainsSearchQuery = name.includes(searchQuery);
          if(nameContainsSearchQuery) {
            self.searchResults.push(result);
          }
      });
    },
  }
}

</script>

<style scoped>

input {
  /* for search input element */
  background: transparent;
  font-weight: 200;
  color: white;
  padding: 0px;
  border: 2px solid #dddddd;
  outline: none;
}

.searchContainer {
  position: relative;
}

.searchInput {
  width: 300px;
  text-align: center;
  height: 35px;
  margin-right: 10px;
  margin-left: 10px;
  line-height: 35px;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.75);
  border-radius: 3px;
}

.searchResultsContainer {
  position: absolute;
  top: 40px;
  left: 12px;
  width: 300px;
  background: green;
  overflow: auto;
  max-height: 300px;
}

.searchResult {
  color: #dddddd;
}

.searchResultItemContainer {
  display: flex;
  padding-left: 3px;
  justify-content: flex-start;
}

.searchResultItem {
  padding-left: 3px;
  padding-right: 3px;
}

</style>
