import axios from 'axios'
import { client_id } from './clientID.js'
import store from './Store/store'

// this function gets the auth token from our server, which is connecting to twitches servers
// we need this auth token to do any twitch api calls
async function get_app_token() {
    return axios({ url: 'https://157.230.58.188/token', method: 'get', })
    .then(res => { store.commit("set_app_token", res.data); })
    .catch(err => { console.log(err); })
}

async function get_user_data() {
    return axios({
        url: 'https://api.twitch.tv/helix/users',
        method: 'get',
        headers: {
            'Client-ID': client_id,
            'Authorization': `Bearer ${store.state.user_token}`
        }
    })
    .then(res => { store.commit("set_user_data", res.data.data[0]); })
    .catch(err => { console.log(err); })
}

export async function initTwitchAPI () {
    // first we must get the app token, we can't make any requests to twitch without it
    await get_app_token();

    // then we need to check if we have a user token store in localStorage
    // if we do if means that a user has logged into their twitch account and was
    // redirected back here or they did that previously and we still have the token saved
    const user_token = localStorage.getItem("user_token");
    if (user_token) {
        store.commit("set_user_token", user_token);
        await get_user_data();
        getFollowing();
    }


    // this is nessesary to provide a redirect url to give to twitch when the user clicks the 
    // connect account button, it changes depending if we are in dev mode or not
    // we can get rid of this in prod
    let twitch_auth_url;
    if (window.location.href.includes("localhost")) twitch_auth_url = `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=http://localhost:8080&response_type=token&scope=viewing_activity_read`;
    else twitch_auth_url =  `https://id.twitch.tv/oauth2/authorize?client_id=${client_id}&redirect_uri=https://mdonlan.github.io/twitch_tv_app&response_type=token&scope=viewing_activity_read`;
    store.commit('setTwitchAuthUrl', twitch_auth_url)
}

async function get_profile_images() {
    for (let i = 0; i < following.pages.length; i++) {
        const following_ids = following.pages[i].map(a => a.to_id);
        let id_string = "";
        for (let j = 0; j < following_ids.length; j++) {
            if (j == 0) id_string += `${following_ids[j]}`
            else  id_string += `&id=${following_ids[j]}`
        }

        try {
            const res = await axios({ url: `https://api.twitch.tv/helix/users?id=${id_string}`, method: 'get', headers: { 'Client-ID': client_id, 'Authorization': `Bearer ${store.state.user_token}`}});
            res.data.data.forEach(user => {
                following.data.forEach(following_user => {
                    if (following_user.user_id == user.id) {
                        following_user.profile_image = user.profile_image_url;
                    }
                })
            })
        } catch(e) { console.log(e); }
    }
}

// loops through all pages and gets all following streams
async function get_all_following_streams() {

    // set the url depending if we are on first page or not
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100`; 
    if (following.next_page_cursor != null) url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100&after=${following.next_page_cursor}`

    try {
        const res = await axios({ url: url, method: 'get', headers: { 'Client-ID': client_id, 'Authorization': `Bearer ${store.state.user_token}` }});
        following.total = res.data.total;
        following.num_pages = Math.ceil(following.total / 100);
        following.pages.push(res.data.data)
        if (following.pages.length < following.num_pages) {
            following.next_page_cursor = res.data.pagination.cursor;
            await get_all_following_streams();
        }
    } catch(e) {
        console.log(e);
    }
}

// checks all the user's following channels and see's which are live
async function check_for_live_following() {
    for (let i = 0; i < following.pages.length; i++) {
        const following_ids = following.pages[i].map(a => a.to_id);
        let id_string = "";
        for (let j = 0; j < following_ids.length; j++) {
            if (j == 0) id_string += `?user_id=${following_ids[j]}`
            else  id_string += `&user_id=${following_ids[j]}`
        }

        try {
            const res = await axios({ url: `https://api.twitch.tv/helix/streams?${id_string}`, method: 'get', headers: { 'Client-ID': client_id, 'Authorization': `Bearer ${store.state.user_token}` }});
            following.data = following.data.concat(res.data.data);
            following.data.sort((a, b) => b.viewer_count - a.viewer_count);
        } catch(e) { console.log(e); }
    }
}

async function get_game_ids() {
    const num_requests = Math.ceil(following.data.length / 100); // can only get 100 at a time
    let index = 0;

    for (let i = 0; i < num_requests; i++) {
        const current_requests = following.data.slice(index, index + 100);
        index += 100;

        let id_string = "";
        for (let j = 0; j < current_requests.length; j++) {
            if (j == 0) id_string += `${current_requests[j].game_id}`
            else  id_string += `&id=${current_requests[j].game_id}`
        }

        try {
            const res = await axios({ url: `https://api.twitch.tv/helix/games?id=${id_string}`, method: 'get', headers: { 'Client-ID': client_id, 'Authorization': `Bearer ${store.state.user_token}`}});
            following.data.forEach(following_user => {
                res.data.data.forEach(game => {
                    if (following_user.game_id == game.id) {
                        following_user.game_name = game.name;
                    }
                })
            })
        } catch(e) { console.log(e); }
    }
}

const following = {
    total: null,
    num_pages: null,
    pages: [],
    data: [],
    next_page_cursor: null
};

export async function getFollowing () {
    // in order to get all live following streams we need to make several calls to the twitch api
    // idk why they made this so difficult, the old api only needed a single call
    
    // ok, first we need to get the list of all the streams the user is following
    await get_all_following_streams();
    await check_for_live_following();
    await get_profile_images();
    await get_game_ids();

    store.commit("setFollowing", following.data);

}



// BELOW
// old, need to update
//
export function getGames () {
    axios({
        url:'https://api.twitch.tv/helix/games/top?first=100',
        headers: {
            'Client-ID': client_id,
            'Authorization': `Bearer ${store.state.app_token.access_token}`
        }
    })
    .then(res => {
        res.data.data.forEach(game => {
            // set the size we want on the pics here
            game.box_art_url = game.box_art_url.replace('{width}', 175).replace('{height}', 200);
        })
        store.commit("setGames", res.data.data)
    })
    .catch(e => console.log(e));
}

async function get_game_id(name) {
    const res = await axios({ url: `https://api.twitch.tv/helix/games?name=${name}`, headers: { 'Client-ID': client_id, 'Authorization': `Bearer ${store.state.app_token.access_token}` }});
    return res.data.data[0].id;
}

export async function getStreamsByGame (gameName) {
    if (store.state.app_token == null) {
        await get_app_token();
    }
    // get the top streams for a specific game
    const game_id = await get_game_id(gameName)
    axios({
        url:'https://api.twitch.tv/helix/streams/?first=100&game_id=' + game_id,
        headers: {
            'Client-ID': client_id,
            'Authorization': `Bearer ${store.state.app_token.access_token}`
        }
    })
    .then(res => {
        res.data.data.forEach(stream => {
            // set the size we want on the pics here
            stream.thumbnail_url = stream.thumbnail_url.replace('{width}', 175).replace('{height}', 200);
        })
        store.commit("setStreamsByGame", res.data.data);
    })
    .catch(e => console.log(e));
}

export async function getPopularStreams () {
    if (!store.state.app_token) { await get_app_token() }

    // get the most poular live streams
    if (api.popular.loading == false) {
        api.popular.loading = true;
        axios({
            url: api.popular.url + api.popular.offset,
            headers: {
                'Client-ID': client_id,
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