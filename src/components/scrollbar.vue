<template>
  <div :class="['scrollbar', attachedElem + 'Scrollbar']"></div>
</template>

<script>

export default {
  name: 'scrollbar',
  props: {
    attachedElem: {
      type: String,
      required: true
    },
    offsetTop: {
      type: Number,
      required: true
    },
  },
  data: function() {
    return {
      
    }
  },
  created () {

  },
  mounted () {
    this.setIntialPosAndSize();
    this.setParentScrollListener();
    this.setMutationObserver();
  },
  methods: {
    setParentScrollListener() {
      // set the scroll listener on the parent element for this scrollbar
      let attachedElem = document.querySelector("." + this.attachedElem);
      attachedElem.addEventListener("scroll", this.scrollHandler);

      if(attachedElem.clientHeight >= attachedElem.scrollHeight) {
        // we shouldn't need a scrollbar here
        console.log('no scroll needed');
      }
    },

    setMutationObserver(event) {
      // mutation observer
      // watches for any changes in the container child list
      // this lets us know that some async calls have come back 
      // and have been added to the elem
      // this means we need to update the scrollbar size
      let mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // console.log("ELEM MUTATION DETECTED");
          // console.log(mutation);
          let containerElem = document.querySelector("." + this.attachedElem);
          let scrollElem = document.querySelector("." + this.attachedElem + 'Scrollbar');
          this.setHeight(containerElem, scrollElem);
          this.setPos(containerElem, scrollElem);
        });
      });

      // set container elem to be observed
      let containerElem = document.querySelector("." + this.attachedElem);
      mutationObserver.observe(containerElem, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false
      });
    },

    scrollHandler(event) {
      // on a scroll event, set the pos and size of the scrollbar
      // also check what leftNav stream we are hovering over
      
      let mousePos = this.$store.state.mousePos;
      let leftNav = document.querySelector(".leftNavContentContainer");
      let leftNavItems = Array.from(leftNav.children);

      // find which stream we are over
      leftNavItems.forEach((item) => {
        let rect = item.getBoundingClientRect();
        if(rect.left < mousePos.x &&
          rect.right > mousePos.x &&
          rect.top < mousePos.y &&
          rect.bottom > mousePos.y
        )
          this.checkHoveringOverStream(item);
      })
      

      let containerElem = document.querySelector("." + this.attachedElem);
      let scrollElem = document.querySelector("." + this.attachedElem + 'Scrollbar');
      this.setHeight(containerElem, scrollElem);
      this.setPos(containerElem, scrollElem);
    },

    checkHoveringOverStream(item) {
      // now that we now which elem we are over load that streams preview
      // and set the hover preview to the stream we are over

      let hoverElemChannelName = item.children[0].dataset.channel; // get hovering channel name
      let hoverSrc = null; // clear old image
      
      // find which stream we are hovering over based on name 
      // and get the correct preview
      this.$store.state.following.forEach((stream) => {
        if(stream.channel.name == hoverElemChannelName) {
          hoverSrc = stream.preview.large;
        }
      });
  
      let elemPos = item.getBoundingClientRect(); // get pos of the new stream for the preview top pos

      let previewElemContainer = document.querySelector(".hoverPreviewImg");
      let previewElem = document.querySelector(".hoverPreview")
      previewElemContainer.style.top = elemPos.top - 20 + "px";
      previewElem.src = hoverSrc;
      let hoverTriangle = document.querySelector(".hoverPreviewTriangle");
      hoverTriangle.style.top = elemPos.top + "px";
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

      let parentScrollTop = containerElem.scrollTop;      
      let pos = parentScrollTop * (containerElem.clientHeight / containerElem.scrollHeight);
      let posWithOffset = pos + this.offsetTop;

      scrollElem.style.top = posWithOffset + "px";
    },

    setIntialPosAndSize() {
      // set the scrollbars inital position and size
      let containerElem = document.querySelector("." + this.attachedElem);
      let scrollElem = document.querySelector("." + this.attachedElem + 'Scrollbar');
      this.setHeight(containerElem, scrollElem);
      this.setPos(containerElem, scrollElem);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.scrollbar {
  background: #beb9b994;
  width: 10px;
  position: absolute;
  left: calc(100% - 10px);
  z-index: 10;
}

</style>
