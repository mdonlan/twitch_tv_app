<template>
    <div class="multi_wrapper">
        <div class="players">
            <multiPlayer :num="1" :numStreams=numStreams></multiPlayer>
            <multiPlayer :num="2" :numStreams=numStreams></multiPlayer>
            <multiPlayer :num="3" :numStreams=numStreams></multiPlayer>
            <multiPlayer :num="4" :numStreams=numStreams></multiPlayer>
        </div>
        <div class="chat">
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
            numStreams: 4,
            activeChatNum: 1
        }
    },

    mounted() {
        this.$store.commit("setOnVideoPage", true);
    },

    methods: {
        updateActiveChat(num) {
            this.activeChatNum = num;
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

.chats {
    position: relative;
    height: 100%;
    width: 100%;
}

.chat {
    width: 20%;
    height: 100%;
    position: relative;
}

#multi_player {
    height: 100%;
    width: 100%;
}

</style>
