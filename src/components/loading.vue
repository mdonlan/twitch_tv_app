<template>
  <div class="loadingContainer">
    <div class="boxOuter">
      <div class="boxInner"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loading',
  data: function () {
    return {
        
    }
  },
  created () {

  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loadingContainer {
  position: absolute;
  top: calc(50% - 25px);
  /* do weird left calc b/c leftNavContentContainer padding */
  left: calc(50% - 25px - 75px);
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.boxOuter {
  height: 50px;
  width: 50px;
  animation: rotate 1.5s linear infinite;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 20px 1px rgb(59, 59, 59); 
}

.boxInner {
  height: 0px;
  width: 100%;
  background: #dddddd;
  animation: fill 3s linear infinite;
}

@keyframes rotate {
  0% {transform: rotate(180deg);}
  25% {transform: rotate(0deg);}
  50% {}
  100% {}
}

@keyframes fill {
  0% {}
  25% {height: 0%;}
  50% {height: 100%;}
  75% {height: 100%;}
  100% {}
}

</style>
