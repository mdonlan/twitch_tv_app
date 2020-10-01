import axios from 'axios'
import { devID, prodID } from './clientID.js'
import store from './Store/store'


// api state
const api = {
    popular: {
        url: "https://api.twitch.tv/helix/streams?first=50&offset=",
        offset: 0,
        loading: false
    }
};



// this function gets the auth token from our server, which is connecting to twitches servers
// we need this auth token to do any twitch api calls
async function get_app_token() {
    return axios({
        url: 'http://157.230.58.188:3000/token',
        // url: 'http://localhost:3000/token',
        method: 'get',
    })
    .then(res => { store.commit("set_app_token", res.data); })
    .catch(err => { console.log(err); })
}

async function get_user_data() {
    return axios({
        url: 'https://api.twitch.tv/helix/users',
        method: 'get',
        headers: {
            'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
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
        // console.log(page)
        const following_ids = page.map(a => a.to_id);
        let id_string = "";
        for (let i = 0; i < following_ids.length; i++) {
            if (i == 0) id_string += `?user_id=${following_ids[i]}`
            else  id_string += `&user_id=${following_ids[i]}`
        }
        // console.log(id_string)

        // get stream data
        axios({
            url: `https://api.twitch.tv/helix/streams?${id_string}`,
            method: 'get',
            headers: {
                'Client-ID': window.location.href.includes("localhost") ? devID : prodID,
                'Authorization': `Bearer ${store.state.user_token}`
            }
        })
        .then(async res => {
            following.data = following.data.concat(res.data.data);
            following.data.sort((a, b) => b.viewer_count - a.viewer_count);
            console.log('before')
            await get_profile_images(following_ids);
            console.log('after')
            // store.commit("setFollowing", following.data);
        })
        .catch(err => {
            console.log(err);
        })
    })
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
            const res = await axios({ url: `https://api.twitch.tv/helix/users?id=${id_string}`, method: 'get', headers: { 'Client-ID': window.location.href.includes("localhost") ? devID : prodID, 'Authorization': `Bearer ${store.state.user_token}`}});
            res.data.data.forEach(user => {
                following.data.forEach(following_user => {
                    if (following_user.user_id == user.id) {
                        console.log('test');
                        following_user.profile_image = user.profile_image_url;
                    }
                })
            })
            // for (let i = 0; i < res.data.data.length; i++) {
            //     for (let j = 0; j < following.data.length; j++) {
            //         if (following.data[j].user_id == res.data.data[i].id) {
            //             console.log(res.data.data[i].profile_image_url)
            //             following.data[j].profile_image = res.data.data[i].profile_image_url;
            //         }
            //     }
            // }
        } catch(e) { console.log(e); }
    }
}

// loops through all pages and gets all following streams
async function get_all_following_streams() {

    // set the url depending if we are on first page or not
    let url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100`; 
    if (following.next_page_cursor != null) url = `https://api.twitch.tv/helix/users/follows?from_id=${store.state.user_data.id}&first=100&after=${following.next_page_cursor}`

    try {
        const res = await axios({ url: url, method: 'get', headers: { 'Client-ID': window.location.href.includes("localhost") ? devID : prodID, 'Authorization': `Bearer ${store.state.user_token}` }});
        console.log('data');
        console.log(res)
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
            const res = await axios({ url: `https://api.twitch.tv/helix/streams?${id_string}`, method: 'get', headers: { 'Client-ID': window.location.href.includes("localhost") ? devID : prodID, 'Authorization': `Bearer ${store.state.user_token}` }});
            following.data = following.data.concat(res.data.data);
            following.data.sort((a, b) => b.viewer_count - a.viewer_count);
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
    console.log('start')
    await get_profile_images();
    console.log('end')
    console.log(following)

    store.commit("setFollowing", following.data);

}



// BELOW
// old, need to update
//
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