<template>
    <div class="multi_chat" :class="{active: activeChatNum == num}" v-if="$store.state.multi[num - 1]">
        <iframe 
            ref="chatElem"
            frameborder="0"
            scrolling="no"
            id="chat_embed"
            :src="'https://www.twitch.tv/embed/' + $store.state.multi[num - 1] + '/chat?darkpopout'"
            height="100%"
            width="100%"
        />
    </div>
</template>

<script>

export default {
    name: 'multiChat',
    props: ['num', 'numStreams', 'activeChatNum'],
    data: function () {
        return {
            active: false
        }
    },

    // watch: {
    //     activeChatNum: {
    //         // the callback will be called immediately after the start of the observation
    //         immediate: true, 
    //         handler (val, oldVal) {
    //             // do your stuff
    //             if(val == this.num) {
    //                 this.active = true;
    //             }
    //             else {
    //                 this.active = false;
    //             }
    //         }
    //     }
    // },

    mounted() {
        // watch if the channel for this player has been updated
        // if so load the player with that channel
        // this.$store.watch((state) => {
        //     return state.multi[this.num - 1];
        // }, (channel) => {
        //     if(this.activeChatNum == this.num) {
        //         this.active = true;
        //     } else {
        //         this.active = false;
        //     }
        // });
    },

    methods: {
    }
}

</script>

<style scoped>

.multi_chat {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    display: none;
}

.active {
    display: block;
}

</style>
