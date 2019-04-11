<template>
    <div class="multi_chat">
        <iframe 
            frameborder="0"
            scrolling="no"
            id="chat_embed"
            src="https://www.twitch.tv/embed/ziggy/chat?darkpopout"
            height="100%"
            width="100%"
        />
    </div>
</template>

<script>

export default {
    name: 'multiChat',
    data: function () {
        return {}
    },

    mounted() {
    },

    methods: {
    }
}

</script>

<style scoped>

.multi_chat {
    height: 100%;
    width: 100%;
}

</style>
