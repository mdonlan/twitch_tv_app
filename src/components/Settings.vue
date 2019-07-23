<template>

<div class="settings">
    <div class="viewToggleButton" @click="clickedViewToggle">Settings</div>
    <div class="settings_panel" v-bind:class="{settings_panel_active: showing}">
        <div class="item" :key="name" v-for="(value, name) in $store.state.settings">
            <div>{{name}}</div>
            <ToggleButton :name="name"/>
        </div>
    </div>
</div>

</template>

<script>

import ToggleButton from './ToggleButton'

export default {

    name: 'Settings',

    components: {
        ToggleButton
    },

    data: function () {
        return {
            showing: false
        }
    },

    methods: {
        clickedViewToggle (e) {
            this.showing = !this.showing;
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../global_styles.scss";

.viewToggleButton {
    width: 100px;
    text-align: center;
    cursor: pointer;
}

.settings {
    position: relative;
}

.settings_panel {
    position: absolute;
    background: $lighterBackgroundColor;
    transition: 0.3s;
    left: -100px; /* viewToggleBtn widht - width/2 */
    height: 0px;
    width: 300px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.settings_panel_active {
    height: 400px;    
}

.item {
    display: flex;
    align-items: center;
    width: 200px;
    margin-top: 10px;
    height: 30px;
}

</style>