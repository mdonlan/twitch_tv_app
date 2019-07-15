<template>

<div class="leftNavComponent">
    <!-- <div class="showLeftNavButton" v-if="!showingMobile && this.$store.state.breakpoint == 'phone'" @click="toggleLeftNavMobile('show')"><i class="fas fa-circle"></i></div>
    <div class="hideLeftNavButton" v-if="showingMobile && this.$store.state.breakpoint == 'phone'" @click="toggleLeftNavMobile('hide')"><i class="fas fa-times-circle"></i></div> -->

    <div class="leftNavWrapper" id="leftNavWrapper">
        <div class="title">LIVE FOLLOWING</div>
        <scrollbar attachedElem="leftNavContentContainer" :offsetTop="75" />
        <div class="leftNavContentContainer">
            <LeftNavChannel :ref="follow._id" v-bind:key="follow._id" v-for="follow in this.$store.state.following" :stream="follow"/>
        </div>
        <LeftNavButtons />
    </div>

    <div class="hoverPreviewImg" v-if="isHovering">
        <img class="hoverPreview"/>
    </div>

    <div class="hoverPreviewTriangle" v-if="isHovering">  
        <div class="triangle"></div>      
    </div>
</div>

</template>

<script>

import LeftNavChannel from './LeftNavChannel';
import LeftNavButtons from './LeftNavButtons';

export default {
    name: 'LeftNav',
    components: {
        LeftNavChannel,
        LeftNavButtons
    },
    data: function () {
        return {
            isHovering: false,
            showingMobile: false,
            leftNavElem: null,
            contentContainerElem: null
        }
    },

    mounted () {
        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseover", this.mouseOverHandler);
        
        this.leftNavElem = document.querySelector(".leftNavWrapper");

        this.contentContainerElem = document.querySelector(".leftNavContentContainer");
        this.contentContainerElem.addEventListener("scroll", this.scrollHandler);

        this.updateLive();

        // watch for changes in onVideoPage state var
        this.$store.watch((state) => {return this.$store.state.onVideoPage}, (onVideoPage, oldValue) => {
            if(onVideoPage == false) this.setLeftNavPos(false);
            else this.setLeftNavPos(true);
        });
    },

    methods: {
        scrollHandler () {
            // also check what leftNav stream we are hovering over
            let mousePos = this.$store.state.mousePos;
            let leftNav = document.querySelector(".leftNavContentContainer");
            let leftNavItems = Array.from(leftNav.children);

            // find which stream we are over
            // we have to do this here, because 
            leftNavItems.forEach((item) => {
                let rect = item.getBoundingClientRect();
                if (rect.left < mousePos.x && rect.right > mousePos.x &&
                    rect.top < mousePos.y && rect.bottom > mousePos.y)
                    this.checkHoveringOverStream(item.children[0]);
            });
        },

        setLeftNavPos(hide) {
            if(hide) this.leftNavElem.classList.add("leftNavWrapperHide");
            else this.leftNavElem.classList.remove("leftNavWrapperHide");
        },    

        clickedVideoLink(stream) {
            // clicked a link to a stream on the leftNav
            let to = {path: 'stream', query: {name: stream.channel.name}};
            this.$router.push(to);
            
            // if we are on mobile auto hide the leftNav
            if(this.$store.state.breakpoint == 'phone') {
                this.showingMobile = false;
                this.leftNavElem.classList.remove('show_mobile')
            }
        },

        updateLive() {
            // run this function every x seconds
            // will update the left nav bar live followed
            setInterval(this.getFollowing, 60000); // runs every 60 seconds to check for changes
        },

        mouseOverHandler (event) {
            // this is for firefox since it doesn't get the iframe element as target we also need
            // to user mouseover since relatedTarget is only on that event and not on mousemove
            let relatedTarget = event.relatedTarget;
            if(relatedTarget == null && this.$store.state.onVideoPage) this.setLeftNavPos(true);
        },

        mouseMoveHandler(event) {
            // watches the mouse movement and checks whether we are over an IFRAME or not
            // if we are over an Iframe it means we are over the video player / chat
            // and that we should hide the leftNav
            // otherwise show the leftNav
            let toElem = event.target;
            let tag = toElem.tagName;
            let className = toElem.className;
            let id = toElem.id;

            // chrome and firefox event.target is different
            // firefox doesn't detect the iframe unless we check currentTarget.activeElement
            // and then we need to check for body or iframe depending on whether we last clicked 
            // on the iframe or the rest of the app

            if(tag == "IFRAME" && this.$store.state.onVideoPage) this.setLeftNavPos(true);
            else if(className == "mouseEventWatchLayerLeft" && this.$store.state.onVideoPage) this.setLeftNavPos(false);

            this.checkHoveringOverStream(toElem);

            let mousePos = {x: event.clientX, y: event.clientY};
            this.$store.commit("setMousePos", mousePos);
        },

        setLeftNavPos(hide) {
            // show or hide the left nav
            if(hide) this.leftNavElem.classList.add("leftNavWrapperHide");
            else this.leftNavElem.classList.remove("leftNavWrapperHide");
        },

        checkHoveringOverStream(toElem) {
            // check if we are hovering over a left nav stream
            // if so then show a preview image of the stream

            // check if the elem we are over has data-channel
            // left nav streams are the only ones that have this data
            if(toElem.getAttribute("data-channel")) {
                this.isHovering = true;
                let hoverElemChannel = toElem.getAttribute("data-channel");
                let hoverSrc = null;

                // find which stream we are hovering over
                this.$store.state.following.forEach((stream) => {
                    if(stream.channel.name == hoverElemChannel) hoverSrc = stream.preview.large;
                });

                // set the hover preview elem pos and src
                let elemPos = toElem.getBoundingClientRect();
                let hoverElemContainer = document.querySelector(".hoverPreviewImg");
                let hoverElemImg = document.querySelector(".hoverPreview");

                if(hoverElemContainer) {
                    let top = hoverElemContainer.style.top = elemPos.top - 20 + "px";
                    hoverElemImg.src = hoverSrc;
                }

                let hoverTriangle = document.querySelector(".hoverPreviewTriangle");
                if(hoverTriangle) hoverTriangle.style.top = elemPos.top + "px";
            } else {
                this.isHovering = false;
            }
        },

        toggleLeftNavMobile(toggle) {
            if(toggle == 'show') {
                this.showingMobile = true;
                this.leftNavElem.classList.add("show_mobile");
            }

            if(toggle == 'hide') {
                this.showingMobile = false;
                this.leftNavElem.classList.remove("show_mobile");
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../global_styles.scss";
@import "../../responsive_mixin.scss";

.leftNavWrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    height: calc(100%);
    width: 250px;
    background: $mainBackgroundColor;
    color: #dddddd;
    overflow-y: hidden;
    overflow-x: hidden;
    z-index: 5;
    transition: width 0.3s linear;
}

.leftNavWrapperHide {
    width: 0px;
}

.leftNavContentContainer {
    position: absolute;
    height: calc(100% - (225px + 75px)); // 225px for buttons container, 75px for offset top 
    overflow-x: hidden;
    overflow-y: scroll;
    /* make width + padding overflow to hide native scrollbar */
    width: 100%;
    padding-right: 18px;
}

a {
    text-decoration: none;
    outline: none;
}

.title {
    height: 75px;
    width: 250px;
    line-height: 75px;
    background: $darkerBackgroundColor;
    text-align: center;
}

.hoverPreviewImg {
    position: absolute;
    height: 360px;
    width: 640px;
    left: 215px;
    z-index: 4;
    box-shadow: 0px 0px 15px 5px $lighterBackgroundColor;
    transition: 0.5s;
    transform: perspective(500px) rotateY(-10deg);
}

.hoverPreview {
    z-index: 0;
}

.hoverPreviewTriangle {
    position: absolute;
    height: 360px;
    width: 640px;
    left: 250px;
    z-index: 5;
    // transition: 0.5s;
}

.triangle {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 32.5px 0 32.5px 40px;
    border-color: transparent transparent transparent $lighterBackgroundColor;
    z-index: 100;
}

/* for mobile to toggle whether to show leftnav */
.showLeftNavButton {
    position: fixed;
    top: 50%;
    left: 0px;
    z-index: 6;
    color: #dddddd;
    background: black;
    padding: 3px;

    i {
        color: red;
    }
}
.hideLeftNavButton {
    position: fixed;
    top: 50%;
    left: 0px;
    z-index: 6;
    color: #dddddd;
    background: black;
    padding: 3px;

    i {
        color: white;
    }
}

.show_mobile {
    width: 100% !important;
}

//
// media queries
//

@include phone {
    .leftNavWrapper {
        width: 0;
    }

    .title {
        width: 100%;
    }
}

</style>
