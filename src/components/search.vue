<template>
  <div class="searchContainer">
    <input class="searchInput" placeholder="Search for channels, games, live streams" v-on:input="searchChangeEventHandler" />
    <div class="searchResultsOverflowContainer" v-if="searchResultsStreams.length > 0 || searchResultsGames.length > 0 || searchResultsChannels.length > 0">
      <div class="searchResultsContainer">
        <div class="streamResultsContainer resultsContainer" v-if="searchResultsStreams.length > 0">
          <div class="sectionTitle">Live Streams</div>
          <!-- use slice in the for loop to only show part of the list
               we do this in order to show a few from each category to the user
               the user can then expand each category if desired
          -->
          <div class="searchResult stream" v-for="result in searchResultsStreams.slice(0,streamsContainerNumToShow)">
            <img class="streamImage" v-bind:src="result.data.channel.logo">
            <div class="searchResultItem name">{{result.data.channel.name}}</div>
            <div class="searchResultItem">{{result.data.viewers}}</div>
            <div class="liveCircleIcon"></div>
            <div class="searchResultItem live">Live!</div>
          </div>
        </div>
        <div class="viewMoreStreams viewMoreButton" v-if="searchResultsStreams.length > 0 && streamsContainerNumToShow == 3 && searchResultsStreams.length > streamsContainerNumToShow" v-on:click="clickedViewMore">View More Streams</div>

        <div class="channelResultsContainer resultsContainer" v-if="searchResultsChannels.length > 0">
          <div class="sectionTitle">Channels</div>
          <div class="searchResult channel" v-for="result in searchResultsChannels.slice(0,channelsContainerNumToShow)">
            <img class="streamImage" v-bind:src="result.data.logo">
            <div class="searchResultItem name">{{result.data.name}}</div>
            <div class="searchResultItem">Recent Game: {{result.data.game}}</div>
            <div class="searchResultItem">Recent Status: {{result.data.status}}</div>
            <div class="searchResultItem">Updated: {{result.data.updated_at | formatTime}}</div>
            <div class="searchResultItem">Followers: {{result.data.followers | addComma}}</div>
            <div class="searchResultItem">Views: {{result.data.views | addComma}}</div>
          </div>
        </div>
        <div class="viewMoreChannels viewMoreButton" v-if="searchResultsChannels.length > 0 && channelsContainerNumToShow == 3 && searchResultsChannels.length > channelsContainerNumToShow" v-on:click="clickedViewMore">View More Channels</div>
        
        <div class="gameResultsContainer resultsContainer" v-if="searchResultsGames.length > 0">
          <div class="sectionTitle">Games</div>
          <div class="searchResult game" v-for="result in searchResultsGames.slice(0,gamesContainerNumToShow)">
            <img class="gameBoxImage" v-bind:src="result.data.box.small">
            <div class="searchResultItem name">{{result.data.name}}</div>
          </div>
        </div>
        <div class="viewMoreGames viewMoreButton" v-if="searchResultsGames.length > 0 && gamesContainerNumToShow == 3 && searchResultsGames.length > gamesContainerNumToShow" v-on:click="clickedViewMore">View More Games</div>
        
      </div>

      <div class="scrollbarSearchResults"></div>

    </div>
  </div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';

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
      streamsContainerNumToShow: 3,
      gamesContainerNumToShow: 3,
      channelsContainerNumToShow: 3,
    }
  },
  created() {
    // create event handler to detect all click events
    // we will use this to detect clicks outside of search component
    // and if so close search results
    document.addEventListener('click', this.documentClick)
  },
  mounted() {

  },
  destroyed() {
    // important to clean up!!
    document.removeEventListener('click', this.documentClick)
  },
  filters: {
    formatTime: function(value) {
      
      let date = new Date(value);
      let fromNow = moment(date).fromNow();
      return fromNow
    },
    addComma: function (string) {
      return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    documentClick(e){
      // this event fires for event click on a page that the search component is loaded on
      // check the click to detect if it is outside of the search container component 
      // and if so then clear search input and the search results elements

      let self = this;
      let searchContainerElem = document.querySelector(".searchContainer");
      let searchInputElem = document.querySelector(".searchInput");
      let target = e.target

      if(searchContainerElem !== target && !searchContainerElem.contains(target)) {
        //console.log('click does not match')
        searchInputElem.value = '';
        self.searchResultsStreams = [];
        self.searchResultsGames = [];
        self.searchResultsChannels = [];
        self.streamsContainerNumToShow = 3;
        self.gamesContainerNumToShow = 3;
        self.channelsContainerNumToShow = 3;
      }
    },
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

      // only search if query is longer than three characters
      // this reduces api calls and your not likely to find a search
      // match w/ only 3 or less characters
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
          if(response.data.channels) {
            let channels = response.data.channels;
            channels.forEach(channel => {
              let newSearchItem = {
                data: channel,
                type: 'channel',
                startTime: requestStartTime,
              }
              self.searchResultsChannels.push(newSearchItem);
            });
          }
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
          if(response.data.games) {
            //console.log(response.data.games)
            let games = response.data.games;
            games.forEach(game => {
              let newSearchItem = {
                data: game,
                type: 'game',
              }
              self.searchResultsGames.push(newSearchItem);
            })
          }
          
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
          if(response.data.streams) {
            let streams = response.data.streams;
            streams.forEach(stream => {
              let newSearchItem = {
                data: stream,
                type: 'stream',
              }
              self.searchResultsStreams.push(newSearchItem);
            })
          }
          
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
      // put each category into its own section of html and data
      
      let streams = [];
      self.searchResultsStreams.forEach((result) => {
        let name = result.data.channel.name.toLowerCase();
        let nameContainsSearchQuery = name.includes(searchQuery);
        if(nameContainsSearchQuery) {
          streams.push(result);
        }
      });
      // set data w/ only direct matches
      self.searchResultsStreams = streams;

      let channels = [];
      self.searchResultsChannels.forEach((result) => {
        let name = result.data.name.toLowerCase();
        let nameContainsSearchQuery = name.includes(searchQuery);
        if(nameContainsSearchQuery) {
          channels.push(result);
        }
      });

      let channelsSorted = self.sortChannels(channels);

      self.searchResultsChannels = channelsSorted;

      let games = [];
      self.searchResultsGames.forEach((result) => {
        let name = result.data.name.toLowerCase();
        let nameContainsSearchQuery = name.includes(searchQuery);
        if(nameContainsSearchQuery) {
          games.push(result);
        }
      });
      self.searchResultsGames = games;

      // setup search results scroll
      self.setupScrollbar();
    },
    sortChannels(channels) {
      // sort channels by number of followers they have
      channels.sort(function(a, b) {
        return a.data.followers < b.data.followers
      })
      
      return channels
    },
    clickedViewMore(event) {
      let self = this;
      let targetName = event.target.classList[0];
      if(targetName.includes("Stream")) {
        //console.log('clicked view more streams')
        self.streamsContainerNumToShow = 10;
      } else if(targetName.includes("Channels")) {
        //console.log('clicked view more channels')
        self.channelsContainerNumToShow = 10;
      } else if(targetName.includes("Games")) {
        //console.log('clicked view more games')
        self.gamesContainerNumToShow = 10;
      }
    },
    setupScrollbar() {
      // setup custom search results scrollbar
      let scrollContainerSearchResults = document.querySelector(".searchResultsContainer");
      scrollContainerSearchResults.addEventListener('scroll', this.handleScrollSearchResults);

      // set inital scrollbar properties
      let scrollbarSearchResults = document.querySelector(".scrollbarSearchResults");
      
      // get position to set scrollbar left
      let pos = scrollContainerSearchResults.getBoundingClientRect();
      // these values are approx.
      scrollbarSearchResults.style.top = '30px';
      scrollbarSearchResults.style.left = '385px';

      // if the height of the element is not equal to the scroll height of the element
      // it means the element is overflowing and the scroll is needed
      // if they are equal the element is completly in view and 
      // scrolling is not needed, so set its height to zero
      
      if(scrollContainerSearchResults.clientHeight != scrollContainerSearchResults.scrollHeight) {
        scrollbarSearchResults.style.height = scrollContainerSearchResults.clientHeight - 4 + 'px';
      } else {
        scrollbarSearchResults.style.height = '0px';
      }

    },
    handleScrollSearchResults(event) {
      console.log('running scroll handler')
      // handles custom scrollbar events / movement
      let target = event.target;
      console.dir(target)
      let targetPos = target.getBoundingClientRect();
      let scrollbar = document.querySelector(".scrollbarSearchResults");
      scrollbar.style.top = (target.scrollTop / 2) + 30 + 'px';
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
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */ 
  text-decoration: none;
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

.searchResultsOverflowContainer {
  position: absolute;
  top: 45px;
  left: -38px;
  width: 400px;
  background: #333333;
  overflow: hidden;
  height: 500px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
} 

.searchResultsContainer {
  height: 100%;
  /* for width offset padding-right */
  width: calc(100% + 20px);
  overflow-y: scroll;
  position: absolute;
  top: 0px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resultsContainer {
  width: 100%;
}

.searchResult {
  display: flex;
  padding-left: 3px;
  padding-right: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 50px;
  color: #dddddd83;
  position: relative;
  transition: 0.5s;
  width: 100%;
}

.searchResult:hover {
  background: #444444;
  cursor: pointer;
}

.searchResult:hover div {
  color: #dddddd;
}

.searchResult::after {
  content: '';
  display: block;
  position: absolute;
  left: calc(50% - 150px);
  bottom: 0px;
  width: 300px;
  height: 0px;
  border-bottom: 1px solid #dddddd2a;
}

.name {
  color: #dddddd;
}

.searchResultItem {
  padding-left: 3px;
  padding-right: 3px;
}

.streamImage {
  height: 30px;
  width: 30px;
}

.gameBoxImage {

}

.liveCircleIcon {
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background: red;
  margin-left: 3px;
}

.live {
  font-variant: small-caps;
}

.channel, .game {
  flex-direction: column;
  height: auto;
  flex-wrap: nowrap;
}

.sectionTitle {
  color: #222222;
  padding-top: 3px;
  padding-bottom: 3px;
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
  background: #dddddd;
}

/* custom scroll bar */
.scrollbarSearchResults {
  /* making this fixed positioned solves some issues */
  position: absolute;
  top: 0px;
  left: 0px;
  height: 20px;
  width: 8px;
  background: #721313;
  z-index: 3;
  opacity: 0.4;
  border-radius: 4px;
}

.viewMoreButton {
  height: 20px;
  line-height: 20px;
  color: #ddddddc4;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  transition: 0.5s;
}

.viewMoreButton:hover {
  background: #444444;
  cursor: pointer;
}

</style>
