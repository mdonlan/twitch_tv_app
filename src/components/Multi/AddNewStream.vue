<template>

<div class="add_new_stream" v-if="this.$store.state.showAddNewMultiBtn">
    <div class="head">
        <div class="title">Multi Add New Stream</div>
        <div class="close_button" @click="this.close" v-if="this.$store.state.numMultiStreams > 0">CLOSE</div>
    </div>
    <div class="view_options">
        <div class="button" :class="{active_button: this.showFollowing}" @click="toggleView('following')">FOLLOWING</div>
        <div class="button" :class="{active_button: this.showSearch}" @click="toggleView('search')">SEARCH</div>
    </div>
    <div>
        <multiSearch v-if="this.showSearch"/>
        <div class="following_list" v-if="this.showFollowing">
            <div class="following_stream" @click="setChannel(stream)" :key="stream._id" v-for="stream in this.$store.state.following">
                <div class="stream_left">
                    <img class="logo" :src="stream.channel.logo">
                </div>
                <div class="stream_right">
                    <div class="stream_text">{{stream.channel.name}}</div>
                    <div class="stream_text">{{stream.channel.status}}</div>
                    <div class="stream_text">{{stream.game}}</div>
                    <div class="stream_text">{{stream.viewers}}</div>
                </div>
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
        },

        setChannel(result) {
            this.$store.commit("setMulti", {channel: result.channel.name, num: this.$store.state.numMultiStreams});
            this.$store.commit("setNumMultiStreams", this.$store.state.numMultiStreams + 1);
            this.$store.commit("setShowAddNewMultiBtn", false);
        },

        close() {
            this.$store.commit("setShowAddNewMultiBtn", false)
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.add_new_stream {
    position: absolute;
    width: 600px;
    height: 500px;
    top: calc(50% - 250px);
    left: calc(50% - 300px);
    color: $fontColor;
    background: $mainBackgroundColor;
    z-index: 1;
    overflow-y: scroll;
}

.head {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.title {
    text-align: center;
    font-size: 18px;
}

.close_button {
    position: absolute;
    left: calc(100% - 60px);
    top: 8px;
    cursor: pointer;
}

.view_options {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 20px;
}

.button {
    transition: 0.3s;
    padding: 8px;
    border: 1px solid #dddddd;
    cursor: pointer;
}

.active_button {
    background: #dddddd;
    color: $lighterBackgroundColor;
}

.following_list {
    display: flex;
    flex-wrap: wrap;
}

.following_stream {
    width: 50%;
    display: flex;
    margin-top: 5px;
    cursor: pointer;
}

.following_stream:hover {
    background: $lighterBackgroundColor;
}

.stream_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.stream_right {
    margin-left: 10px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.stream_text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.logo {
    height: 50px;
    width: 50px;
}

</style>