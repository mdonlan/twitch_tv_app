<template>

<div class="stream">
    <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
    <div class="imgContainer">
        <img class="image" v-bind:src="stream.preview.medium">
    </div>
    <div class="textContainer">
        <div class="name streamItem">{{stream.channel.name}}</div>
        <div class="game streamItem">{{stream.channel.game}}</div>
        <div class="status streamItem">{{stream.channel.status}}</div>
        <div class="viewers streamItem">{{stream.viewers.toLocaleString()}}</div>
    </div>
</div>

</template>

<script>

export default {
    name: 'HomeChannel',
    props: ["stream"],
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";
@import "../../responsive_mixin.scss";

.stream {
    height: 280px;
    width: 320px;
    margin: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: 0.3s;
    background: $mainBackgroundColor;
}

.stream:hover {
    background: $lighterBackgroundColor;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
}

.stream:hover > .imgContainer {
    opacity: 1;
}

.imgContainer {
    height: 180px;
    width: 320px;
    opacity: 0.9;
    transition: 0.3s;
}

.textContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    transition: 0.3s; 
}

.streamItem {
    width: calc(100% - 6px);
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3px;
    padding-right: 3px;
    text-align: center;
}

.name {
    font-size: 15px;
    color: #ffffff;
}

.game, .viewers, .status {
    font-size: 13px;
    color: #ddddddaf;
}

.image {
    height: 100%;
    width: 100%;
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #222222;
    opacity: 0;
    transition: 0.5s;
    z-index: 2;
}

// media queries

@include phone {
    .stream {
        width: 45%;
        height: 30%;
        margin: 3px;
    }

    .viewers, .status {
        display: none;
    }
}

</style>