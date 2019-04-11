<template>
        <div :id="['multi_player_' + num]" class="multi_player">
            <multiSearch />
        </div>
</template>

<script>

export default {
    name: 'multiPlayer',
    props: ['channel', 'numStreams', 'num'],
    data: function() {
        return {}
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

        this.setPlayerPos();
    },

    methods: {

        loadPlayer() {
            let embedOptions = {
                width: "100%",
                height: "100%",
                channel: this.channel,
                layout: "video",
                theme: "dark",
                autoplay: "default",
                muted: false
            }

            new window.Twitch.Embed("multi_player_" + this.num, embedOptions);
        },

        setPlayerPos() {
            const playerElem = document.querySelector("#multi_player_" + this.num);

            if(this.numStreams == 2) {
                if (this.num == 1) {
                    playerElem.style.top = '0px';
                    playerElem.style.width = '100%';
                    playerElem.style.height = '50%';
                }

                if (this.num == 2) {
                    playerElem.style.top = '50%';
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

            if(this.numStreams == 3 || this.numStreams == 4) {
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
@import "../global_styles.scss";

.multi_player {
    position: absolute;
}

</style>