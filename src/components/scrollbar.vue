<template>

    <div :class="['scrollbar', attachedElem + 'Scrollbar']"></div>

</template>

<script>

export default {
    name: 'scrollbar',

    props: ['attachedElem', 'offsetTop'],

    data: function() {
        return {
            containerElem: null,
            scrollbarElem: null
        }
    },

    mounted () {
        this.containerElem = document.querySelector("." + this.attachedElem);
        this.scrollbarElem = document.querySelector("." + this.attachedElem + "Scrollbar");

        this.setIntialPosAndSize();
        this.setParentScrollListener();
        this.setMutationObserver();
    },

    methods: {

        setParentScrollListener() {
            // set the scroll listener on the parent element for this scrollbar
            this.containerElem.addEventListener("scroll", this.scrollHandler);
        },

        setMutationObserver(event) {
            // mutation observer
            // watches for any changes in the container child list
            // this lets us know that some async calls have come back 
            // and have been added to the elem
            // this means we need to update the scrollbar size
            let mutationObserver = new MutationObserver(mutations => {
                this.setHeight();
                this.setPos();
            });

            // set container elem to be observed
            mutationObserver.observe(this.containerElem, { childList: true });
        },

        scrollHandler () {
            // on a scroll event, set the pos and size of the scrollbar
            this.setHeight();
            this.setPos();
        },

        setHeight() {
            let totalHeight = this.containerElem.scrollHeight;
            let currentHeight = this.containerElem.clientHeight;
            let scrollbarHeight = currentHeight * (currentHeight / totalHeight);
            this.scrollbarElem.style.height = scrollbarHeight + "px";
        },

        setPos() {
            let parentScrollTop = this.containerElem.scrollTop;      
            let pos = parentScrollTop * (this.containerElem.clientHeight / this.containerElem.scrollHeight);
            let posWithOffset = pos + this.offsetTop;
            this.scrollbarElem.style.top = posWithOffset + "px";
        },

        setIntialPosAndSize() {
            // set the scrollbars inital position and size
            this.setHeight();
            this.setPos();
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
  z-index: 20;
}

</style>
