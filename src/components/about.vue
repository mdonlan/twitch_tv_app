<template>
  <div class="aboutWrapper">
    <div class="title">About</div>
    <div class="aboutText">This website was made using the <a href="https://dev.twitch.tv/docs/v5">Twitch API</a> and with <a href="https://vuejs.org/">Vue.js</a> as the frontend framework.</div>
  </div>
</template>

<script>

export default {
  name: 'about',
  data: function () {
    return {

    }
  },
  created () {

  },
  filters: {
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.aboutWrapper {
  height: 100%;
  width: 100%;

  margin-top: 100px;

  display: flex;
  flex-direction: column;
  color: #dddddd;
}

.title {
  font-size: 32px;
}

.aboutText {
  font-size: 18px;
}

</style>
