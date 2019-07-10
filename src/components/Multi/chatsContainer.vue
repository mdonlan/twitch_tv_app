
<template>
    <div class="chat" :class="{ showChat: $store.state.multi[0] || $store.state.multi[1] || $store.state.multi[2] || $store.state.multi[3] }">
        <div class="sectionTitle">Num Streams</div>     
        <div class="manage_multi">
            <div class="num_streams" @click="setNumStreams(2)">2</div>     
            <div class="num_streams" @click="setNumStreams(4)">4</div>     
        </div>
        <div class="sectionTitle">Rooms</div>
        <div class="change_chat_room">
            <div class="room" v-if="this.$store.state.multi[0]" >
                <div class="chatRoomTitle" :class="{activeTitle: activeChatNum == 1}" @click="updateActiveChat(1)">{{this.$store.state.multi[0]}}</div>
                <div class="closeRoomBtn" @click="closePlayer(1)">X</div>
            </div>
            <div class="room" v-if="this.$store.state.multi[1]" >
                <div class="chatRoomTitle" :class="{activeTitle: activeChatNum == 2}" @click="updateActiveChat(2)">{{this.$store.state.multi[1]}}</div>
                <div class="closeRoomBtn" @click="closePlayer(2)">X</div>
            </div>
            <div class="room" v-if="this.$store.state.multi[2]" >
                <div class="chatRoomTitle" :class="{activeTitle: activeChatNum == 3}" @click="updateActiveChat(3)">{{this.$store.state.multi[2]}}</div>
                <div class="closeRoomBtn" @click="closePlayer(3)">X</div>
            </div>
            <div class="room" v-if="this.$store.state.multi[3]" >
                <div class="chatRoomTitle" :class="{activeTitle: activeChatNum == 4}" @click="updateActiveChat(4)">{{this.$store.state.multi[3]}}</div>
                <div class="closeRoomBtn" @click="closePlayer(4)">X</div>
            </div>
        </div>
        <div class="chats">
            <multiChat :num="1" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
            <multiChat :num="2" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
            <multiChat :num="3" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
            <multiChat :num="4" :numStreams=numStreams :activeChatNum=activeChatNum></multiChat>
        </div>
    </div>
</template>

<script>

export default {
    name: 'chatsContainer',
    data: function () {
        return {
            numStreams: 2,
            activeChatNum: 1,
            divideDir: "horz"
        }
    },

    methods: {

        updateActiveChat(num) {
            this.activeChatNum = num;
            
        },

        setNumStreams(num) {
            this.numStreams = num;
        },

        closePlayer(num) {
            this.$store.commit("setMulti", {channel: null, num: num});
            let embed = document.querySelector("#embed_player_" + num);
            embed.innerHTML = "";
        },
    }
}

</script>

<style lang="scss" scoped>
@import "../../global_styles.scss";

.multi_wrapper {
    height: 100%;
    width: 100%;
    z-index: 4;
    position: fixed;
    background: #111111;
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
    color: #dddddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.showChat {
    width: 20%;
}

.manage_multi {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    margin-bottom: 5px;
}

.num_streams {
    text-align: center;
    cursor: pointer;
    transition: 0.3s;
    padding: 8px;
    margin-left: 3px;
    margin-right: 3px;
    background: $mainBackgroundColor;
    font-size: 14px;
}

.num_streams:hover {
    background: $lighterBackgroundColor;
}

.change_chat_room {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
}

.room {
    width: 50%;
    display: flex;
    background: $mainBackgroundColor;
}

.chatRoomTitle {
    /* text-align: center; */
    cursor: pointer;
    width: calc(75% - 10px);
    padding: 5px;
    font-size: 14px;
    /* transition: 0.3s; */
}

.chatRoomTitle:hover {
    background: $lighterBackgroundColor;
}

.activeTitle {
    background: $lighterBackgroundColor;
}

.closeRoomBtn {
    width: calc(25% - 10px);
    padding: 5px;
    background: rgb(95, 21, 21);
    cursor: pointer;
    font-size: 14px;
}

.closeRoomBtn:hover {
    background: rgb(150, 25, 25);
}

.sectionTitle {
    border-bottom: 1px solid rgb(145, 145, 145);
    width: 50%;
    font-size: 14px;
    margin-bottom: 3px;
}

</style>
