<template>
<div class="leftNavComponent">
    <!-- <div class="mouseEventWatchLayerLeft"></div> -->
    <div class="showLeftNavButton" v-if="!showingMobile && this.$store.state.breakpoint == 'phone'" @click="toggleLeftNavMobile('show')"><i class="fas fa-circle"></i></div>
    <div class="hideLeftNavButton" v-if="showingMobile && this.$store.state.breakpoint == 'phone'" @click="toggleLeftNavMobile('hide')"><i class="fas fa-times-circle"></i></div>
    <div class="leftNavWrapper" id="leftNavWrapper">
        <div class="leftNavTitle">LIVE FOLLOWING</div>
        <!-- <scrollbar :attachedElem="scrollbarAttachedElem" :offsetTop="scrollbarOffsetTop" /> -->
        <div class="leftNavContentContainer">
            <div class="followItemContainer" :ref="follow._id" v-bind:key="follow._id" v-for="follow in this.$store.state.following">
                <div class="clickZone" @click="clickedVideoLink(follow)" :data-channel="follow.channel.name" ></div>
                <div class="leftNavImageContainer">
                    <img class="followingLogo leftNavItem" v-bind:src="follow.channel.logo">
                </div>
                <div class="leftNavTextContainer">
                    <div class="followingName leftNavItem">{{follow.channel.name}}</div>
                    <div class="followingGame leftNavItem">{{follow.channel.game}}</div>
                    <div class="followingStatus leftNavItem">{{follow.channel.status}}</div>
                    <div class="followingViewers leftNavItem">{{follow.viewers | addComma}}</div>
                </div>
            </div>
        </div>

        <div class="navButtonsContainer" :class="[{navButtonsHide: hideButtons}]">
            <div class="navButton" @click="clickedButton('/')">Popular</div>
            <div class="navButton" @click="clickedButton('games')">Games</div>
            <div class="navButton" @click="clickedButton('following')">Followed</div>
            <div class="navButton aboutButton" v-bind:to="{path: 'about'}" @click="clickedButton('about')">About</div>
            <div class="navButton" @click="clickedButton('multi')">Multi</div>
        </div>
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
import axios from 'axios';

export default {
    name: 'leftNav',
    // props: ['onVideoPage'],
    data: function () {
        return {
            hideButtons: false,
            scrollbarAttachedElem: "leftNavContentContainer",
            scrollbarOffsetTop: 75, // size of left nav title container
            hoverPreviewTop: null,
            isHovering: false,
            showingMobile: false,
            leftNavElem: null,
            leftNavShowing: false
        }
    },

    created () {
        this.getFollowing();
    },

    mounted () {
        document.addEventListener("mousemove", this.mouseMoveHandler);
        document.addEventListener("mouseover", this.mouseOverHandler);
        this.leftNavElem = document.querySelector(".leftNavWrapper");

        this.updateLive();

        // watch for changes in onVideoPage state var
        this.$store.watch((state) => {return this.$store.state.onVideoPage}, (onVideoPage, oldValue) => {
            if(onVideoPage == false) {
                this.setLeftNavPos(false);
            } else {
                this.setLeftNavPos(true);
            }
        });
    },

    filters: {
        addComma: function (string) {
            return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

    methods: {
        clickedButton(to) {
            this.$router.push(to);
        },

        setLeftNavPos(hide) {
            if(hide) {
                this.leftNavElem.classList.add("leftNavWrapperHide");
            } else {
                this.leftNavElem.classList.remove("leftNavWrapperHide");
            }
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

        getFollowing() {
            let accessToken = localStorage.getItem("access_token");
            let key = "OAuth " + accessToken;
            axios({
                method: 'get',
                url:'https://api.twitch.tv/kraken/streams/followed?limit=100',
                headers: {
                    'Client-ID': '034f31qw57vu405ondtxpqwp104q5o',
                    'Authorization' : key
                    // dev -- 034f31qw57vu405ondtxpqwp104q5o
                    //prod -- yb1fpw6w2ldfn50b0ynr50trdcxn99
                }
            })
            .then((response) => {
                this.$store.commit("setFollowing", response.data.streams);
            })
            .catch((error) => {
                console.log(error);
            });
        },

        updateLive() {
            // run this function every x seconds
            // will update the left nav bar live followed
            setInterval(this.getFollowing, 60000); // runs every 60 seconds to check for changes
        },

        mouseOverHandler (event) {

            // this is for firefox since it doesn't get the iframe element as target
            // we also need to user mouseover since relatedTarget is only on that event
            // and not on mousemove

            let relatedTarget = event.relatedTarget;
            if(relatedTarget == null) {
                if(this.$store.state.onVideoPage) {
                    this.setLeftNavPos(true);
                }
            }
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

            // console.log(event.toElement)
            // console.log(event.toElem)


            
            // chrome and firefox event.target is different
            // firefox doesn't detect the iframe unless we check currentTarget.activeElement
            // and then we need to check for body or iframe depending on whether we last clicked 
            // on the iframe or the rest of the app


            // let mouseWatcherElem = document.querySelector(".mouseEventWatchLayerLeft");
            // let watcherRect = mouseWatcherElem.getBoundingClientRect();
            // // console.log(mouseWatcherElem.getBoundingClientRect());
            // // console.log(event.clientX)


            // // if (event.currentTarget.activeElement.nodeName == "BODY" ||
            // //     event.currentTarget.activeElement.nodeName == "IFRAME") {
            // //     if(this.$store.state.onVideoPage) {
            // //         this.setLeftNavPos(true);
            // //     }
            // // }

            if(tag == "IFRAME" /*|| className.includes("multi_search_wrapper")*/) {
                if(this.$store.state.onVideoPage) {
                    this.setLeftNavPos(true);
                }
            }

            if(className == "mouseEventWatchLayerLeft") {
                if(this.$store.state.onVideoPage) {
                    this.setLeftNavPos(false);
                }
            }

            this.checkHoveringOverStream(toElem);

            let mousePos = {x: event.clientX, y: event.clientY};
            this.$store.commit("setMousePos", mousePos);
        },

        setLeftNavPos(hide) {
            // show or hide the left nav
            if(hide) {
                this.leftNavElem.classList.add("leftNavWrapperHide");
            } else {
                this.leftNavElem.classList.remove("leftNavWrapperHide");
            }
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
                    if(stream.channel.name == hoverElemChannel) {
                        hoverSrc = stream.preview.large;
                    }
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
                if(hoverTriangle) {
                    hoverTriangle.style.top = elemPos.top + "px";
                }
            } 
            else {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";
@import "../responsive_mixin.scss";

.mouseEventWatchLayerLeft {
    position: absolute;
    height: 40%;
    width: 10%;
    left: 0px;
    top: calc(25%);
    overflow: hidden;
    z-index: 5;
    opacity: 0.5;
}

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

.followItemContainer {
    width: 250px;
    height: 65px;
    display: flex;
    align-items: center;
    transition: background 0.3s linear;
    font-size: 12px;
    user-select: none;
    position: relative;
}

.followItemContainer:hover {
    background: $lighterBackgroundColor;
    // height: 70px;
    font-size: 12.5px;
    color: white;
    z-index: 10;
    // padding-top: 3px;
    // padding-bottom: 3px;
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;
    top: 0px;
}

.leftNavImageContainer {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    margin-left: 2px;
    margin-right: 2px;
}

a {
    text-decoration: none;
    outline: none;
}

.leftNavTextContainer {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.leftNavTitle {
    height: 75px;
    width: 250px;
    line-height: 75px;
    border-bottom: 0.5px solid $mainBorderColor;
    border-top: 0.5px solid $mainBorderColor;
    background: $darkerBackgroundColor;
}

.followingGame, .followingName, .followingStatus {
    width: 190px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.followingLogo { /* the image in each left nav stream */
    height: 100%;
    border-radius: 5px;
}

.followingName {
    font-size: 12.5px;
}

.followingGame, .followingStatus, .followingViewers {
    color: #ddddddaf;
}

.navButtonsContainer {
    background: $darkerBackgroundColor;
    border-top: 0.5px solid $mainBorderColor;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 225px;
    position: absolute;
    bottom: 0px;
    user-select: none;
}

.navButtonsHide {
    display: none;
}

.navButton {
    position: relative;
    height: 20%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dddddd;
    transition: 0.5s;
    font-variant: small-caps;
    cursor: pointer;
}

.navButton::before {
    content: '';
    width: 0px;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.5s;
    left: 50%;
}

.navButton:hover::before {
    content: '';
    width: 50%;
    left: 0%;
}

.navButton::after {
    content: '';
    left: 50%;
    width: 0%;
    background: #dddddd;
    height: 1px;
    position: absolute;
    top: calc(100% - 3px);
    transition: 0.5s;
}

.navButton:hover::after {
    width: 50%;
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

    .leftNavTitle {
        width: 100%;
    }

    .followItemContainer {
        margin-left: 25px;
    }
}

</style>
