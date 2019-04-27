<template>
        <div :id="['multi_player_' + num]" class="multi_player">
            <multiSearch :num="num"/>
            <div class="following" v-if="this.$store.state.following">
                <div>Live Following</div>
                <div class="following_channels">
                    <div class="channel_container" v-for="channel in this.$store.state.following">
                        <router-link v-bind:to="{path: 'stream', query: { name: channel.channel.name}}">{{channel.channel.name}}</router-link>
                    </div>
                </div>
            </div>
            <!-- <div :class="{ divider_horz: numStreams == 2 && num == 1 }" @mousedown="mousedownHandler" @mouseup="mouseupHandler"></div> -->
        </div>
</template>

<script>

export default {
    name: 'multiPlayer',
    props: ['numStreams', 'num', 'divideDir'],
    data: function() {
        return {
        }
    },

    watch: { 
      	numStreams: function(newVal, oldVal) {
              this.setPlayerPos(newVal)
        }
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
            console.log(this.num);
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

            new window.Twitch.Embed("multi_player_" + this.num, embedOptions);
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
                }

                if (this.num == 4) {
                    playerElem.style.top = '50%';
                    playerElem.style.left = '50%';
                    playerElem.style.width = '50%';
                    playerElem.style.height = '50%';
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

.following {
    /* background: red; */
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    max-height: 50%;
}

.following_channels {
    /* background: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.channel_container {
    height: 50px;
    width: 200px;
    background: $mainBackgroundColor;
    margin: 3px;
}

a {
    text-decoration: none;
    outline: none;
    color: #dddddd;
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>