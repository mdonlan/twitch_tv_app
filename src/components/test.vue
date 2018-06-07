<template>
  <div class="loadingContainer">
    <div class="loading">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test',
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
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  height: 500px;
  width: 500px;
  background: rgba(86, 86, 94, 0.795);
}

.loading {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar {
  height: 100px;
  width: 10px;
  background: #dddddd;
  margin-left: 5px;
  margin-right: 5px;
  animation: increaseHeight;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  border-radius: 5px;
}

/* setup delay for each child so that animations don't run at the same time */

.bar:nth-child(1) { animation-delay: 0s }
.bar:nth-child(2) { animation-delay: .1s }
.bar:nth-child(3) { animation-delay: .2s }
.bar:nth-child(4) { animation-delay: .3s }
.bar:nth-child(5) { animation-delay: .4s }
.bar:nth-child(6) { animation-delay: .5s }


@keyframes increaseHeight {
  0%   {height: 100px;}
  50%  {height: 200px; box-shadow: 0px 0px 10px 5px rgba(20, 20, 20, 0.75);}
  100% {height: 100px;}
}



</style>
