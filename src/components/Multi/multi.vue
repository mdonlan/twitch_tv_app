<template>
    <div class="multi_wrapper">
        <div :class="{ players_full_width: !$store.state.multi[0] }" class="players" >
            <multiPlayer :num="1" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="2" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="3" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="4" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
        </div>
        <div :class="{ showChat: $store.state.multi[0] }" class="chat">
            <div class="manage_multi">
                <div>num players</div>     
                <div @click="setNumStreams(2)">2</div>     
                <div @click="setNumStreams(4)">4</div>     
            </div>
            <div class="change_chat_room">
                <div class="chatRoomTitle" @click="updateActiveChat(1)">{{this.$store.state.multi[0]}}</div>
                <div class="chatRoomTitle" @click="updateActiveChat(2)">{{this.$store.state.multi[1]}}</div>
                <div class="chatRoomTitle" @click="updateActiveChat(3)">{{this.$store.state.multi[2]}}</div>
                <div class="chatRoomTitle" @click="updateActiveChat(4)">{{this.$store.state.multi[3]}}</div>
            </div>
            <div class="chats">
                <multiChat :num="1" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
                <multiChat :num="2" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
                <multiChat :num="3" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
                <multiChat :num="4" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'multi',
    data: function () {
        return {
            numStreams: 2,
            activeChatNum: 1,
            divideDir: "horz"
        }
    },

    mounted() {
        console.log('mounted multi')
        // this.$store.commit("setOnVideoPage", true);
    },

    unmounted() {
        console.log('unmounted multi')
        // this.$store.commit("setOnVideoPage", false);
    },

    methods: {
        updateActiveChat(num) {
            this.activeChatNum = num;
            
        },

        setNumStreams(num) {
            this.numStreams = num;
        }
    }
}

</script>

<style scoped>

.multi_wrapper {
    height: 100%;
    width: 100%;
    z-index: 4;
    position: fixed;
    background: #222222;
    display: flex;
}

.players {
    width: 80%;
    height: 100%;
    position: relative;
}

.players_full_width {
    width: 100%;
}

.chats {
    position: relative;
    height: 100%;
    width: 100%;
}

.chat {
    width: 0%;
    height: 100%;
    position: relative;
}

.showChat {
    width: 20%;
}

/* #multi_player {
    height: 100%;
    width: 100%;
} */

</style>
