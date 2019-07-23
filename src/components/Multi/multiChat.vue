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
