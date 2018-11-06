<template>
  <div :class="['scrollbar', parentElem + 'Scrollbar']"></div>
</template>

<script>

export default {
  name: 'scrollbar',
  props: {
    parentElem: {
      type: String,
      required: true
    },
    offsetTop: {
      type: Number,
      required: true
    }
  }
  ,
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
      let parentElem = document.querySelector("." + this.parentElem);
      parentElem.addEventListener("scroll", this.scrollHandler);

      if(parentElem.clientHeight >= parentElem.scrollHeight) {
        // we shouldn't need a scrollbar here
        console.log('no scroll needed');
      }
    },

    scrollHandler(event) {
      console.log('scrollbar event!')
      // on a scroll event, set the pos and size of the scrollbar

      let containerElem = document.querySelector("." + this.parentElem);
      let scrollElem = document.querySelector("." + this.parentElem + 'Scrollbar');
      this.setHeight(containerElem, scrollElem);
      this.setPos(containerElem, scrollElem);
    },

    setHeight(containerElem, scrollElem) {
      console.log('setting scrollHeight')
      // set the scrollbar height
      let totalHeight = containerElem.scrollHeight;
      let currentHeight = containerElem.clientHeight;
      let scrollbarHeight = currentHeight * (currentHeight / totalHeight);
      // update elem size in DOM
      scrollElem.style.height = scrollbarHeight + "px";
    },

    setPos(containerElem, scrollElem) {
      // the the position of the scrollbar

      let parentScrollTop = containerElem.scrollTop;
      // let offsetTop = getComputedStyle(containerElem, null).getPropertyValue("margin-top");
      // offsetTop = parseInt(offsetTop.substr(0, offsetTop.length - 2));
      
      let pos = parentScrollTop * (containerElem.clientHeight / containerElem.scrollHeight);
      let posWithOffset = pos + this.offsetTop;

      console.log(typeof this.offsetTop)

      console.log(pos);
      console.log(posWithOffset);

      scrollElem.style.top = posWithOffset + "px";
      //console.log(scrollElem.style.top);
      //console.log(this.offsetTop)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.scrollbar {
  background: #222222;
  width: 30px;
  position: absolute;
  left: calc(100% - 30px);
}

</style>
