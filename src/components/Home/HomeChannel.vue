<template>

<div class="stream">
    <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
    <div class="imgContainer">
        <img class="image" v-bind:src="stream.preview.large">
    </div>
    <div class="textContainer">
        <div class="name streamItem">{{stream.channel.name}}</div>
        <div class="game streamItem">{{stream.channel.game}}</div>
        <div class="status streamItem">{{stream.channel.status}}</div>
        <div class="viewers streamItem">{{stream.viewers.toLocaleString()}}</div>
    </div>
    <div class="border borderTop"></div>
    <div class="border borderRight"></div>
    <div class="border borderBottom"></div>
    <div class="border borderLeft"></div>
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
    height: 32%;
    width: 18%;
    color: #dddddd;
    margin: 15px;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
    position: relative;
}

.imgContainer {
    z-index: 1;
}

.textContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: $mainBackgroundColor;
    flex: 1;
}

.streamItem {
    width: calc(100% - 6px);
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3px;
    padding-right: 3px;
}

.name {
    font-size: 15px;
}

.game, .viewers, .status {
    color: rgba(221, 221, 221, 0.774);
    font-size: 14px;
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

.clickZone:hover {
    opacity: 0.3;
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