<template>

<div :id="['multi_player_' + num]" class="multi_player" :class="{ multi_player_active: $store.state.multi[num - 1]}" >
    <div :id="['embed_player_' + num]" class="embed_player" v-if="$store.state.multi[num - 1]"></div>
</div>

</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'multiPlayer',

    props: ['num'],

    computed: mapState(['numMultiStreams']),

    watch: { 
      	numMultiStreams: function(newVal, oldVal) {
              console.log('testing123')
        },
    },

    mounted () {
        this.setPlayerPos(this.$store.state.numMultiStreams);

        // watch if the channel for this player has been updated
        // if so load the player with that channel
        this.$store.watch((state) => {
            return state.multi[this.num - 1];
        }, (channel) => {
            this.loadPlayer(channel)
        });

        this.$store.watch((state) => {
            return state.numMultiStreams;
        }, (num) => {
            this.setPlayerPos(num);
        });

    },

    methods: {

        loadPlayer(channel) {
            let embedOptions = {
                width: "100%",
                height: "100%",
                channel: channel,
                layout: "video",
                theme: "dark",
                autoplay: "default",
                muted: false
            };

            new window.Twitch.Embed("embed_player_" + this.num, embedOptions);
        },

        clickedChannel (name) {
            this.$store.commit("setMulti", {channel: name, num: this.num});
        },

        setPlayerPos(numMulti) {
            console.log(numMulti)
            const playerElem = document.querySelector("#multi_player_" + this.num);
            if(numMulti == 1) {
                playerElem.style.top = '0px';
                playerElem.style.left = '0px';
                playerElem.style.width = '100%';
                playerElem.style.height = '100%';
            }

            if(numMulti == 2) {
                if (this.num == 1) {
                    playerElem.style.top = '0px';
                    playerElem.style.left = '0px';
                    playerElem.style.width = '100%';
                    playerElem.style.height = '50%';
                }

                if (this.num == 2) {
                    playerElem.style.top = '50%';
                    playerElem.style.left = '0px';
                    playerElem.style.width = '100%';
                    playerElem.style.height = '50%';
                }

                if (this.num == 3) {
                    playerElem.style.display = 'none';
                }

                if (this.num == 4) {
                    playerElem.style.display = 'none';
                }
            }

            if(numMulti == 3 || numMulti == 4) {
                if (this.num == 1) {
                    playerElem.style.top = '0px';
                    playerElem.style.left = '0px';
                    playerElem.style.width = '50%';
                    playerElem.style.height = '50%';
                }

                if (this.num == 2) {
                    playerElem.style.top = '0%';
                    playerElem.style.left = '50%';
                    playerElem.style.width = '50%';
                    playerElem.style.height = '50%';
                }

                if (this.num == 3) {
                    playerElem.style.top = '50%';
                    playerElem.style.left = '0px';
                    playerElem.style.width = '50%';
                    playerElem.style.height = '50%';
                    playerElem.style.display = 'block';
                }

                if (this.num == 4) {
                    playerElem.style.top = '50%';
                    playerElem.style.left = '50%';
                    playerElem.style.width = '50%';
                    playerElem.style.height = '50%';
                    playerElem.style.display = 'block';
                }
            }
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.multi_player {
    position: absolute;
    box-shadow: 0px 0px 1px 0px #111111;
    display: none;
}

.multi_player_active {
    display: block;
}

.embed_player {
    height: 100%;
};

.following {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: calc(100% - 50px);
    width: 100%;
}

.following_channels {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: auto;
    width: 100%;
}

.channel_container {
    height: 100px;
    width: 33.3%;
    background: $mainBackgroundColor;
    color: #dddddd;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
}

.channel_container:hover {
    background: $lighterBackgroundColor;
}

.channel_item {
    width: 100%;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.title {
    color: #dddddd;
    font-size: 18px;
}

.closeBtn {
    height: 20px;
    width: 20px;
    background: red;
    position: absolute;
    top: 0px;
    left: calc(100% - 20px);
}

.mouseWatcher {
    height: calc(100% - 100px);
    top: 50px;
    width: 200px;
    left: calc(50% - 100px);
    position: absolute;
    /* background: rgba(0, 0, 255, 0.192); */
    z-index: 0;
}

.mouseWatcher:before {
    content: "";
    width: 150px;
    height: 100%;
    /* background: red; */
    /* display: block; */
    position: absolute;
    left: -200px;
}

.mouseWatcher:after {
    content: "";
    width: 150px;
    height: 100%;
    /* background: red; */
    /* display: block; */
    position: absolute;
    left: 250px;
}

</style>