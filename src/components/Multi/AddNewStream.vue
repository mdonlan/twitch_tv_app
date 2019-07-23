<template>

<div class="add_new_stream" v-if="this.$store.state.showAddNewMultiBtn">
    <div>add stream</div>
    <multiSearch />
</div>

</template>

<script>

export default {
    name: 'AddNewStream',
}

</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";

.add_new_stream {
    position: absolute;
    width: 800px;
    height: 500px;
    top: calc(50% - 250px);
    left: calc(50% - 400px);
    color: $fontColor;
    background: darkblue;
    z-index: 1;
}

</style>