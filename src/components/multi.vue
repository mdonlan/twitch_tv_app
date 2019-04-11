<template>
    <div class="multi_wrapper">
        <div class="players">
            <multiPlayer num="1" channel="" :numStreams=numStreams></multiPlayer>
            <multiPlayer num="2" channel="" :numStreams=numStreams></multiPlayer>
            <multiPlayer num="3" channel="" :numStreams=numStreams></multiPlayer>
            <multiPlayer num="4" channel="" :numStreams=numStreams></multiPlayer>
        </div>
        <div class="chat">
            <div class="change_chat_room">

            </div>
            <multiChat></multiChat>
        </div>
    </div>
</template>

<script>

export default {
    name: 'multi',
    data: function () {
        return {
            numStreams: 4
        }
    },

    mounted() {
        this.$store.commit("setOnVideoPage", true);
    },

    methods: {
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

.chat {
    width: 20%;
    height: 100%;
}

#multi_player {
    height: 100%;
    width: 100%;
}

</style>
