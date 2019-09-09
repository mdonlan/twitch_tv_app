import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        onVideoPage: false,
        onChannel: null,
        username: null,
        following: null,
        user: {
            name: null,
            accessToken: null
        },
        clientID: null,
        breakpoint: null,
        multi: [null, null, null, null], // channels for the multi component,
        games: [],
        streamsByGame: [], // the top streams for a specific game
        numMultiStreams: 0,
        settings: {
            showNotifications: true,
            notificationSounds: true
        },
        showAddNewMultiBtn: true,
        popularStreams: [],
        showLeftNav: true
    },

    mutations: {
        setOnVideoPage(state, payload) {
            state.onVideoPage = payload;
        },

        setOnChannel(state, payload) {
            state.onChannel = payload;
        },

        setUserName(state, payload) {
            state.username = payload;
        },

        setFollowing(state, payload) {
            state.following = payload;
        },

        setBreakpoint(state, payload) {
            state.breakpoint = payload;
        },

        setMulti(state, payload) {
            state.multi.splice(payload.num, 1, payload.channel);
        },

        setAccessToken(state, payload) {
            state.user.accessToken = payload;
        },

        setGames(state, payload) {
            state.games = payload;
        },

        setStreamsByGame(state, payload) {
            state.streamsByGame = payload;
        },

        setNumMultiStreams(state, payload) {
            state.numMultiStreams = payload;
        },

        updateSettings(state, payload) {
            state.settings[payload.type] = payload.value;
        },

        setShowAddNewMultiBtn(state, payload) {
            state.showAddNewMultiBtn = payload;
        },

        setPopular(state, payload) {
            state.popularStreams = payload;
        },

        setShowLeftNav(state, payload) {
            state.showLeftNav = payload;
        }
    }
});