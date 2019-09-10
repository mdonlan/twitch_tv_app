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

    // axios({
    // url:'https://api.twitch.tv/helix/streams?user_id=vader',
    //     // add accept header b/c sometimes the api tries to access a 
    //     // different api version and causes errors
    //     headers: {
    //         // 'Accept': 'application/vnd.twitchtv.v5+json',
    //         'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
    //         // 'Authorization': `OAuth ${store.state.user.accessToken}`
    //     }
    // })
    // .then(response => console.log(response))
    // .catch(error => console.log(error));
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
        headers: {'Client-ID': window.location.href.includes("localhost") ? devID : prodID}
    })
    .then(res => store.commit("setGames", res.data.top))
    .catch(e => console.log(e));
}

export function getStreamsByGame (gameName) {
    // get the top streams for a specific game
    axios({
        url:'https://api.twitch.tv/kraken/streams/?limit=100&game=' + gameName,
        headers: {'Client-ID': window.location.href.includes("localhost") ? devID : prodID}
    })
    .then(res => store.commit("setStreamsByGame", res.data.streams))
    .catch(e => console.log(e));
}

export function getPopularStreams () {
    // get the most poular live streams
    if (api.popular.loading == false) {
        api.popular.loading = true;
        axios({
            url: api.popular.url + api.popular.offset,
            headers: {'Client-ID': window.location.href.includes("localhost") ? devID : prodID}
        })
        .then(res => {
            if (store.state.popularStreams.length > 0) {
                let popularStreams = JSON.parse(JSON.stringify(store.state.popularStreams));
                popularStreams = popularStreams.concat(res.data.streams);
                store.commit("setPopular", popularStreams);
            } else {
                store.commit("setPopular", res.data.streams);
            }
            
            api.popular.loading = false;
            api.popular.offset += 20;
        })
        .catch(err => console.log(err));
    }
}

// api state
const api = {
    popular: {
        url: "https://api.twitch.tv/kraken/streams/?limit=20&offset=",
        offset: 0,
        loading: false
    }
}