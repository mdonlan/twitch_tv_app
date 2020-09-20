import axios from 'axios'
import { devID, prodID } from './clientID.js'
import store from './Store/store'

// this function gets the auth token from our server, which is connecting to twitches servers
// we need this auth token to do any twitch api calls
function get_app_token() {
    return axios({
        // url: 'http://157.230.58.188:3000/token',
        url: 'http://localhost:3000/token',
        method: 'get',
    })
    .then(res => {
        store.commit("set_app_token", res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export function get_user_data() {
    return axios({
        url: 'https://api.twitch.tv/helix/users',
        method: 'get',
        headers: {
            'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
            'Authorization': `Bearer ${store.state.user_token}`
        }
    })
    .then(res => {
        // console.log(res)
        store.commit("set_user_data", res.data.data[0]);
    })
    .catch(err => {
        console.log(err);
    })
}

export async function initTwitchAPI () {
    await get_app_token();

    const user_token = localStorage.getItem("user_token");
    if (user_token) store.commit("set_user_token", user_token);
    // console.log('user_token: ' + user_token);

    await get_user_data();
    getFollowing();

    let twitch_auth_url;
    if (window.location.href.includes("localhost")) twitch_auth_url = `https://id.twitch.tv/oauth2/authorize?client_id=${devID}&redirect_uri=http://localhost:8080&response_type=token&scope=viewing_activity_read`;
    else twitch_auth_url =  `https://id.twitch.tv/oauth2/authorize?client_id=${prodID}&redirect_uri=https://mdonlan.github.io/twitch_tv_app&response_type=token&scope=viewing_activity_read`;

    store.commit('setTwitchAuthUrl', twitch_auth_url)

    // let client_id = window.location.href.includes("localhost") ? devID : prodID;

    // axios({
    //     url: twitch_auth_url,
    //     method: 'get',
    //     headers: {
    //         'Client-ID': client_id
    //     }
    // })
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    // get user live followed streams
    // also check for changes every 60s
    // getFollowing();
    // setInterval(() => {
    //     getFollowing();
    // }, 60000);

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

// function get_stream_data(id) {
//     axios({
//         url: `https://api.twitch.tv/helix/streams?user_id=${id}`,
//         method: 'get',
//         headers: {
//             'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
//             'Authorization': `Bearer ${store.state.user_token}`
//         }
//     })
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

function get_following_stream_data(pages) {
    pages.forEach(page => {
        console.log(page)
        const following_ids = page.map(a => a.to_id);
        let id_string = "";
        for (let i = 0; i < following_ids.length; i++) {
            if (i == 0) id_string += `?user_id=${following_ids[i]}`
            else  id_string += `&user_id=${following_ids[i]}`
        }
        console.log(id_string)
        axios({
            url: `https://api.twitch.tv/helix/streams?${id_string}`,
            method: 'get',
            headers: {
                'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
                'Authorization': `Bearer ${store.state.user_token}`
            }
        })
        .then(res => {
            following.data = following.data.concat(res.data.data);
            // console.log(res)
            store.commit("setFollowing", following.data);
            console.log(following)
        })
        .catch(err => {
            console.log(err);
        })
    })
}

const following = {
    total: null,
    num_pages: null,
    pages: [],
    data: []
};
export function getFollowing (page_cursor) {
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100`; 
    if (page_cursor != undefined) url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100&after=${page_cursor}`
    axios({
        url: url,
        method: 'get',
        headers: {
            'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
            'Authorization': `Bearer ${store.state.user_token}`
        }
    })
    .then(res => {
        // console.log(res.data)
        following.total = res.data.total;
        following.num_pages = Math.ceil(following.total / 100);
        console.log(following.num_pages)
        // following.data = following.data.concat(res.data.data);
        // console.log(following.data.length)
        following.pages.push(res.data.data)
        if (following.pages.length < following.num_pages) {
            getFollowing(res.data.pagination.cursor)
        }
        else {
            get_following_stream_data(following.pages);
        }
        // store.commit("setFollowing", res.data.data);
    })
    .catch(err => {
        console.log(err);
    })
    // axios({
    //     url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
    //     // add accept header b/c sometimes the api tries to access a 
    //     // different api version and causes errors
    //     headers: {
    //         'Accept': 'application/vnd.twitchtv.v5+json',
    //         'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
    //         'Authorization': `OAuth ${store.state.user.accessToken}`
    //     }
    // })
    // .then(response => store.commit("setFollowing", response.data.streams))
    // .catch(error => console.log(error));
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

export async function getPopularStreams () {
    console.log(store.state.token)
    if (store.state.app_token) {
        console.log('token is there')
    } else {
        console.log('toke is NOT there')
        await get_app_token()
    }

    // get the most poular live streams
    if (api.popular.loading == false) {
        api.popular.loading = true;
        axios({
            url: api.popular.url + api.popular.offset,
            headers: {
                'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
                'Authorization': `Bearer ${store.state.app_token.access_token}`
            }
        })
        .then(res => {
            if (store.state.popularStreams.length > 0) {
                let popularStreams = JSON.parse(JSON.stringify(store.state.popularStreams));
                popularStreams = popularStreams.concat(res.data.data);
                store.commit("setPopular", popularStreams);
            } else {
                store.commit("setPopular", res.data.data);
            }
            
            api.popular.loading = false;
            api.popular.offset += 50;
        })
        .catch(err => console.log(err));
    }
}

// api state
const api = {
    popular: {
        url: "https://api.twitch.tv/helix/streams?first=50&offset=",
        offset: 0,
        loading: false
    }
}