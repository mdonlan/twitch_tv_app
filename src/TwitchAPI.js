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
    console.log(store.state.user.accessToken)
    axios({
        url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
        headers: {
            'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
            'Authorization': store.state.user.accessToken
        }
    })
    .then(response => {
        this.$store.commit("setFollowing", response.data.streams);
    })
    .catch(error => {
        console.log(error);
    });
}