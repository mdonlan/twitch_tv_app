<template>

<label class="switch">
    <input type="checkbox" :checked="this.$store.state.settings[name]" @click="clickHandler">
    <span class="slider round"></span>
</label>

</template>

<script>

export default {
    name: 'ToggleButton',
    props: ["name"],
    methods: {
        clickHandler (e) {
            this.$store.commit('updateSettings', { type: this.name, value: e.target.checked });
        }
    }
}

</script>

<style lang="scss" scoped>

.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 20px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
}

.slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;

}

input:checked + .slider {
    background-color: #2196F3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    transform: translateX(23px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

</style>