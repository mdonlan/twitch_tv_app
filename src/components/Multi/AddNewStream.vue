<template>

<div class="add_new_stream">
    <div>add stream</div>
    <multiSearch />
</div>

</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'AddNewStream',

    computed: mapState(['numMultiStreams']),

    data: function () {
        return {}
    },
    
    watch: { 
      	numMultiStreams: function (newVal, oldVal) {
              if (newVal > 0) {
                  const elem = document.querySelector(".add_new_stream");
                  elem.style.zIndex = 0;
              }
        },
    },
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