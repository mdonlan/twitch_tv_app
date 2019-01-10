<template>
  <div class="aboutWrapper">
    <div class="title">About</div>
    <div class="aboutText">      
      <div class="text">This website was made using <a href="https://vuejs.org/">Vue.js</a>.</div>
      <div class="text">All data on the site is from <a href="https://dev.twitch.tv/docs/v5">Twitch's API</a>.</div>
      <div class="text">Made by <a href="http://michaeldonlan.com">Michael Donlan</a></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'about'
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";

a {
  color: #dddddd;
  margin-left: 1px;
}

a:hover {
  color: $lighterBackgroundColor;
}

.aboutWrapper {
  height: calc(100% - 75px);
  width: calc(100% - 225px);

  margin-top: 100px;
  margin-left: 225px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #dddddd;
}

.title {
  font-size: 32px;
}

.aboutText {
  height: 100%;
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
}

.text {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
