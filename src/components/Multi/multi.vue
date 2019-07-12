<template>

<div class="multi_wrapper">
    <div :class="{ players_full_width: !$store.state.multi[0] && !$store.state.multi[1] && !$store.state.multi[2] && !$store.state.multi[3] }" class="players" >
        <AddNewStream />

        <multiPlayer :num="1"></multiPlayer>
        <multiPlayer :num="2"></multiPlayer>
        <multiPlayer :num="3"></multiPlayer>
        <multiPlayer :num="4"></multiPlayer>

    </div>
    <chatsContainer></chatsContainer>
</div>

</template>

<script>
import AddNewStream from './AddNewStream'

export default {
    name: 'multi',
    components: {
        AddNewStream
    },
    data: function () {
        return {
            activeChatNum: 1,
        }
    },

    mounted: function () {
        if (this.$store.state.onChannel) {
            this.$store.commit("setMulti", {channel: this.$store.state.onChannel, num: 1});
            this.$store.commit("setOnChannel", null);
        }
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

</style>