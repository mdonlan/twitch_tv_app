<template>
        <div :id="['multi_player_' + num]" class="multi_player" v-on:mousemove="mouseMoveHandler" v-on:mouseenter="mouseEnter" v-on:mouseleave="mouseExit">
            <div :id="['embed_player_' + num]" class="embed_player" v-if="$store.state.multi[num - 1]"></div>
            <multiSearch :num="num"/>
            <div class="following" v-if="this.$store.state.following && !$store.state.multi[num - 1]">
                <div class="title">Live Following</div>
                <div class="following_channels">
                    <div class="channel_container" v-for="channel in this.$store.state.following" :key="channel.channel.name">
                        <div class="channel" @click="clickedChannel(channel.channel.name)">{{channel.channel.name}}</div>
                    </div>
                </div>
            </div>
            <div class="mouseWatcher" v-if="$store.state.multi[num - 1]"></div>            
        </div>
</template>

<script>

export default {
    name: 'multiPlayer',
    props: ['numStreams', 'num', 'divideDir'],
    data: function() {
        return {
            showCloseBtn: false,
            lastMouseMove: null,
        }
    },

    watch: { 
      	numStreams: function(newVal, oldVal) {
              this.setPlayerPos(newVal)
        },
    },

    mounted () {

        // when first mounting the video player we need to import the twitchEmbed script from their site
        // only once the script is loaded can we then try to load a new embed player
        let embedScript = document.createElement('script');
        embedScript.setAttribute("src", "https://embed.twitch.tv/embed/v1.js");
        document.head.appendChild(embedScript);
        embedScript.async = true;
        embedScript.onload = () => {
            if(this.channel) {
                this.loadPlayer();
            }
        }

        this.setPlayerPos(this.numStreams);

        // watch if the channel for this player has been updated
        // if so load the player with that channel
        this.$store.watch((state) => {
            return state.multi[this.num - 1];
        }, (channel) => {
            this.loadPlayer(channel)
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
            }

            new window.Twitch.Embed("embed_player_" + this.num, embedOptions);
        },

        clickedChannel (name) {
            this.$store.commit("setMulti", {channel: name, num: this.num});
        },

        setPlayerPos(numStreams) {
            const playerElem = document.querySelector("#multi_player_" + this.num);

            if(numStreams == 2) {
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

            if(numStreams == 3 || numStreams == 4) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../global_styles.scss";

.multi_player {
    position: absolute;
    box-shadow: 0px 0px 1px 0px #111111;
}

.embed_player {
    height: 100%;
};

.following {
    /* background: red; */
    padding: 5px;
    margin-top: 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow-y: scroll; */
    max-height: 75%;
    padding-right: 17px;
    width: 100%;
}

.following_channels {
    /* background: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-height: 100%;
    overflow-y: auto;
}

.channel_container {
    height: 50px;
    width: 200px;
    background: $mainBackgroundColor;
    margin: 3px;
    color: #dddddd;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
}

.channel_container:hover {
    background: $lighterBackgroundColor;
}

.channel {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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