<template>

<div class="add_new_stream" v-if="this.$store.state.showAddNewMultiBtn">
    <div class="title">add stream</div>
    <div class="view_options">
        <div class="set_following_button" :class="{active_button: this.showFollowing}" @click="toggleView('following')">following</div>
        <div class="set_search_button" :class="{active_button: this.showSearch}" @click="toggleView('search')">search</div>
    </div>
    <div>
        <multiSearch v-if="this.showSearch"/>
        <div v-if="this.showFollowing">
            <div :key="stream._id" v-for="stream in this.$store.state.following">
                <div>{{stream.channel.name}}</div>
                <div>{{stream.channel.status}}</div>
                <div>{{stream.game}}</div>
                <div>{{stream.viewers}}</div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'AddNewStream',

    data: function () {
        return {
            showFollowing: true,
            showSearch: false
        }
    },

    methods: {
        toggleView (elemToShow) {
            if (elemToShow == 'search') {
                this.showFollowing = false;
                this.showSearch = true;
            } else {
                this.showFollowing = true;
                this.showSearch = false;
            }
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.add_new_stream {
    position: absolute;
    width: 300px;
    height: 500px;
    top: calc(50% - 250px);
    left: calc(50% - 150px);
    color: $fontColor;
    background: darkblue;
    z-index: 1;
    overflow-y: scroll;
}

.title {
    text-align: center;
}

.view_options {
    display: flex;
    justify-content: center;
}

.set_search_button {
    transition: 0.3s;
}

.set_following_button {
    transition: 0.3s;
}

.active_button {
    background: #dddddd;
    color: $lighterBackgroundColor;
}

</style>