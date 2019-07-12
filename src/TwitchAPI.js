import axios from 'axios'
import { devID, prodID } from './clientID.js'
import store from './Store/store'

export function initTwitchAPI () {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) store.commit("setAccessToken", accessToken);

    // get user live followed streams
    // also check for changes every 60s
    getFollowing();
    setInterval(() => {
        getFollowing();
    }, 60000);
}

export function getFollowing () {
    axios({
        url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
        // add accept header b/c sometimes the api tries to access a 
        // different api version and causes errors
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
            'Authorization': `OAuth ${store.state.user.accessToken}`
        }
    })
    .then(response => store.commit("setFollowing", response.data.streams))
    .catch(error => console.log(error));
}

export function getGames () {
    axios({
        url:'https://api.twitch.tv/kraken/games/top/?limit=100',
        headers: {'Client-ID': window.location.href.includes("localhost") ? devID : prodID,}
    })
    .then(res => store.commit("setGames", res.data.top))
    .catch(e => console.log(e));
}

export function getStreamsByGame (gameName) {
    // get the top streams for a specific game
    axios({
        url:'https://api.twitch.tv/kraken/streams/?limit=100&game=' + gameName,
        headers: {'Client-ID': window.location.href.includes("localhost") ? devID : prodID,}
    })
    .then(res => store.commit("setStreamsByGame", res.data.streams))
    .catch(e => console.log(e));
}