<template>
    <div class="multi_wrapper">
        <div :class="{ players_full_width: !$store.state.multi[0] }" class="players" >
            <multiPlayer :num="1" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="2" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="3" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
            <multiPlayer :num="4" :numStreams=numStreams :divideDir=divideDir></multiPlayer>
        </div>
        <chatsContainer></chatsContainer>
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

    mounted: function () {
        if (this.$store.state.onChannel) {
            this.$store.commit("setMulti", {channel: this.$store.state.onChannel, num: 1});
            this.$store.commit("setOnChannel", null);
        }
    },
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
