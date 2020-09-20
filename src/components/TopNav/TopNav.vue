<template>
<div class="top_nav">
    <div class="left"></div>
    <div class="center">
        <router-link class="button" :class="{activeButton: activeButton == 'Popular'}" @click.native="clickedButton" :to="{path: '/'}">Popular</router-link>
        <router-link class="button" :class="{activeButton: activeButton == 'Games'}" @click.native="clickedButton" :to="{path: 'games'}">Games</router-link>
        <router-link class="button" :class="{activeButton: activeButton == 'Followed'}" @click.native="clickedButton" :to="{path: 'followed'}">Followed</router-link>
        <search></search>

    </div>
    <div class="right">
        <router-link class="button" :class="{activeButton: activeButton == 'About'}" @click.native="clickedButton" :to="{path: 'about'}">About</router-link>
        <Settings />
    </div>
</div>
</template>

<script>
import Settings from '../Settings'
import { get_user_data } from '../../TwitchAPI'

export default {

    name: 'TopNav',

    components: {
        Settings
    },

    data: function () {
        return {
            activeButton: null,
        }
    },

    created() {
        this.checkRedirectFromTwitch();
    },

    mounted() {
        this.setActiveButton();
    },

    methods: {

        setActiveButton() {
            // set active button based on url on page load
            const url = window.location.href;
            if (url.includes("games")) this.activeButton = 'Games';
            else if (url.includes("followed")) this.activeButton = 'Followed';
            else if (url.includes("about")) this.activeButton = 'About';
            else this.activeButton = 'Popular'
        },

        clickedButton(e) {
            this.activeButton = e.target.innerHTML;
        },

        checkRedirectFromTwitch() {
            // after getting access token and id saved
            // redirect to home page so vue knows what to display
            // this simply removes the extra data on the address when twitch does their redirect
            const url = window.location.href;
            if (url.includes("access_token")) {
                this.saveUserToken(url);
                if (url.includes("localhost")) window.location.href = 'http://localhost:8080/#/';
                else window.location.href = 'https://mdonlan.github.io/twitch_tv_app';
            }
        },

        saveUserToken(url) {
            const user_token = url.match("access_token=(.*)&scope");
            // console.log(access_token)
            this.$store.commit('set_user_token', user_token[1]);
            // get_user_data();
            // const id_token = url.match("id_token=(.*)&scope");
            localStorage.setItem("user_token", user_token[1]);
            // localStorage.setItem("id_token", id_token[1]);
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../global_styles.scss";
@import "../../responsive_mixin.scss";

.top_nav {
    position: fixed;
    background: $darkerBackgroundColor;
    height: 75px;
    margin-left: 100px;
    width: calc(100% - 100px);
    display: flex;
    z-index: 3;
    top: 0px;
}

.left,
.center,
.right {
    display: flex;
    align-items: center;
}

.left {
    width: 25%;
}

.right {
    width: 25%;
    justify-content: center;
}

.center {
    width: 50%;
}

.button {
    height: 35px;
    width: 100px;
    margin-right: 10px;
    margin-left: 10px;
    line-height: 35px;
    color: #dddddd;
    user-select: none;
    text-decoration: none;
    font-variant: small-caps;
    position: relative;
    text-align: center;
}

.button::before {
    content: '';
    width: 0px;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.3s;
    left: 50%;
}

.button:hover::before {
    content: '';
    width: 50%;
    left: 0%;
}

.button::after {
    content: '';
    left: 50%;
    width: 0%;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.3s;
}

.button:hover::after {
    width: 50%;
}

.activeButton {
    background: #d5d9df;
    color: #111111;
    border: none !important;
}

.twitchLogo {
    position: absolute;
    top: 25px;
    left: 80px;
    height: 25px;
    width: 75px;
}

.aboutButton {
    position: absolute;
    top: 20px;
    right: 100px;
}

a {
    text-decoration: none;
}

// media queries

@include phone {

    .top_nav {
        margin-left: 0px;
        width: 100%;
        height: 125px;
    }

    .buttonContainer {
        flex-wrap: wrap;
    }

    .button {
        width: 40%;
    }

    .aboutButton {
        position: relative;
        top: 0px;
        right: 0px;
    }
}
</style>
