<template>

<div class="videoPlayerWrapper">
    <div class="mouseEventWatchLayerLeft"></div>
    <div id="twitch-embed"></div>
    <div class="closeSmallPlayerContainer" v-if="!this.$store.state.onVideoPage && this.$store.state.onChannel">
        <div class="closeSmallPlayerButton" v-on:click="closeSmallPlayer">CLOSE</div>
        <div class="restoreFullPlayerButton" v-on:click="restoreFullPlayer">RESTORE</div>
    </div>      
    <panel></panel>
</div>

</template>

<script>

export default {
    name: 'videoPlayer',

    data: function() {
        return {
            currentPlayerChannel: null,
            videoContainerElem: null,
            twitchEmbedElem: null,
        }
    },

    created () {
        this.setupStoreWatcher();
    },

    mounted () {
        this.videoContainerElem = document.querySelector(".videoPlayerWrapper");
        this.twitchEmbedElem = document.querySelector("#twitch-embed");

        // when first mounting the video player we need to import the twitchEmbed script from their site
        // only once the script is loaded can we then try to load a new embed player
        let embedScript = document.createElement('script');
        embedScript.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
        document.head.appendChild(embedScript);
        embedScript.async = true;
        embedScript.onload = () => {
             // once script is loaded  
            // check if we need to load a video
            if(this.$store.state.onVideoPage) {
                this.setLarge();
                this.loadPlayer();
            } else {
                this.setSmall();
            }
        }
    },

    methods: {

        setLarge() {
            // set the video player to large(fullscreen size)
            this.videoContainerElem.classList.remove("videoPlayerSmall");
            this.videoContainerElem.classList.remove("hideSmallVideoPlayer")
            this.twitchEmbedElem.classList.remove("embedSmall");
        },

        setSmall() {
            // set the video player to small 400x300
            this.videoContainerElem.classList.add("videoPlayerSmall");
            this.twitchEmbedElem.classList.add("embedSmall");

            this.hideSmallPlayer();
        },

        hideSmallPlayer() {
            if(!this.$store.state.onChannel) {
                // if we have no channel stored it means we are not playing anything
                // so hide the small player b/c it is not active
                this.videoContainerElem.classList.add("hideSmallVideoPlayer")
            }
        },
        
        setupStoreWatcher() {
            this.$store.watch((state) => {
                return this.$store.state.onVideoPage; // what this value
            }, (newValue, oldValue) => { // when value changes do this
                if(newValue == true) {
                    this.setLarge();
                    this.loadPlayer(); // on video page, show player
                } else {
                    this.setSmall();
                }
            });

            // watch onChannel
            // if this changes update the video player to load a new channel
            this.$store.watch((state) => {return this.$store.state.onChannel}, (onChannel, oldValue) => {
                this.loadPlayer();
            });
        },

        closeSmallPlayer() {
            this.$store.commit("setOnChannel", null);
            this.hideSmallPlayer();
        },

        restoreFullPlayer() {
            this.$router.push({path: 'stream', query: { name: this.$store.state.onChannel}});
            this.$store.commit("setOnVideoPage", true);
        },

        clearOldPlayers() {
            // when loading a new video, we create a new player 
            // that means we have to clear any old players
            this.twitchEmbedElem.innerHTML = '';
        },

        loadPlayer() {
            // load a new channel in a new player
            // check if we are trying to load a channel that is already playing and prevent it
            // only load a new player if not a match
            if(this.$store.state.onChannel == null) {
                this.clearOldPlayers();
            }

            if(this.$store.state.onChannel != this.currentPlayerChannel) {
                this.clearOldPlayers();

                let embedOptions = {
                    width: "100%",
                    height: "100%",
                    channel: this.$store.state.onChannel,
                    layout: "",
                    theme: "dark",
                    autoplay: "default",
                    muted: false
                };

                const twitchPlayer = new window.Twitch.Embed("twitch-embed", embedOptions);
                this.currentPlayerChannel = twitchPlayer.options.channel;  
            }
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../global_styles.scss";

.videoPlayerWrapper {
    position: absolute;
    height: 100%;
    width: calc(100% + 1px);
    left: 0px;
    top: 0px;
    z-index: 3;
    overflow-y: auto;
    padding-right: 17px; /* hide scrollbar */
}

.videoPlayerSmall {
    height: 225px;
    width: 400px;
    top: calc(100% - 225px);
    z-index: 5;
    overflow: hidden;
    padding-right: 0px;
    box-shadow: 0px 0px 15px 5px $lighterBackgroundColor;
}

.hideSmallVideoPlayer {
    z-index: 0;
    box-shadow: none;
}

#twitch-embed {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    user-select: none;
}

.embedSmall {
    height: 500px !important;
    width: 400px !important;
}

.mouseEventWatchLayerLeft {
    position: absolute;
    height: 40%;
    width: 10%;
    left: 0px;
    top: calc(25%);
    overflow: hidden;
    z-index: 3;
    opacity: 0.5;
}

.closeSmallPlayerContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    display: none;
}

.closeSmallPlayerButton, .restoreFullPlayerButton {
    cursor: pointer;
    color: #dddddd;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
    transition: 0.3s;
    height: 75%;
}

.closeSmallPlayerButton:hover {
    color: rgb(189, 15, 15);
}

.restoreFullPlayerButton:hover {
    color: rgb(15, 189, 93);
}

.videoPlayerWrapper:hover .closeSmallPlayerContainer {
    display: flex;
    width: 100%;
    background: #111111;
    justify-content: center;
    align-items: flex-start;
}

</style>