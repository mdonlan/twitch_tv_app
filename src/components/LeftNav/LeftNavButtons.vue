<template>

<div class="nav_buttons_container">
    <div class="button" @click="clickedButton('/')">Popular</div>
    <div class="button" @click="clickedButton('games')">Games</div>
    <div class="button" @click="clickedButton('following')">Followed</div>
    <div class="button aboutButton" v-bind:to="{path: 'about'}" @click="clickedButton('about')">About</div>
    <div class="button" @click="clickedButton('multi')">Multi</div>
</div>

</template>

<script>

export default {
    name: 'LeftNavButtons',

    methods: {
        clickedButton(to) {
            this.$router.push(to);
        },
    }
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.nav_buttons_container {
    background: $darkerBackgroundColor;
    border-top: 0.5px solid $mainBorderColor;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 225px;
    position: absolute;
    bottom: 0px;
    user-select: none;
}

.button {
    position: relative;
    height: 20%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dddddd;
    transition: 0.5s;
    font-variant: small-caps;
    cursor: pointer;
}

.button::before {
    content: '';
    width: 0px;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.5s;
    left: 50%;
}

.button:hover::before {
    content: '';
    width: 50%;
    left: 0%;
}

.button::after {
    content: '';
    left: 50%;
    width: 0%;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.5s;
}

.button:hover::after {
    width: 50%;
}

</style>
