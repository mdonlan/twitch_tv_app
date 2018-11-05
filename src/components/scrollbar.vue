<template>
  <div class="scrollbar leftNavScrollbar"></div>
</template>

<script>

export default {
  name: 'scrollbar',
  data: function() {
    return {

    }
  },
  created () {
    
  },
  mounted () {
    this.setParentScrollListener();
  },
  methods: {
    setParentScrollListener() {
      // set the scroll listener on the parent element for this scrollbar
      let parentElem = document.querySelector(".leftNavContentContainer");
      parentElem.addEventListener("scroll", this.scrollHandler);
    },

    scrollHandler(event) {
      // on a scroll event, set the pos and size of the scrollbar

      let containerElem = document.querySelector(".leftNavContentContainer");
      let scrollElem = document.querySelector(".leftNavScrollbar");
      this.setHeight(containerElem, scrollElem);
      this.setPos(containerElem, scrollElem);
    },

    setHeight(containerElem, scrollElem) {
      // set the scrollbar height
      let totalHeight = containerElem.scrollHeight;
      let currentHeight = containerElem.clientHeight;
      let scrollbarHeight = currentHeight * (currentHeight / totalHeight);

      // update elem size in DOM
      scrollElem.style.height = scrollbarHeight + "px";
    },

    setPos(containerElem, scrollElem) {
      // the the position of the scrollbar
      let scrollTop = containerElem.scrollTop;

      console.log(scrollTop + scrollElem.clientHeight);
      console.log(containerElem.clientHeight);

      if((scrollTop + scrollElem.clientHeight) < containerElem.clientHeight) {
        scrollElem.style.top = scrollTop + 50 + "px"; // 50 is from the top offset
      } else {
        scrollElem.style.top = containerElem.clientHeight - scrollElem.clientHeight + 50 + "px";
      }
       
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.scrollbar {
  background: red;
  width: 30px;
  position: absolute;
}

</style>
