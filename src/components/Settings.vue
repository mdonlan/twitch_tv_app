<template>

<div class="settings">
    <div class="viewToggleButton" @click="clickedViewToggle">Settings</div>
    <div class="settings_panel" v-bind:class="{settings_panel_active: showing}">
        <div :key="value" v-for="(value, name) in $store.state.settings">
            <div>{{name}}</div>
            <toggle-button :value="$store.state.settings[name]" @change="toggleChangeHandler(name, $event)"/>
        </div>
    </div>
</div>

</template>

<script>

import { ToggleButton } from 'vue-js-toggle-button'

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
        },

        toggleChangeHandler (name, e) {
            this.$store.commit('updateSettings', { type: name, value: e.value });
        }
    }
}

</script>

<style lang="scss" scoped>

@import "../global_styles.scss";

.viewToggleButton {
    width: 100px;
    text-align: center;
}

.settings {
    position: relative;
}

.settings_panel {
    position: absolute;
    background: $lighterBackgroundColor;
    transition: 1s;
    left: -100px; /* viewToggleBtn widht - width/2 */
    height: 0px;
    width: 300px;
    overflow: hidden;
}

.settings_panel_active {
    height: 400px;    
}

</style>