<template>
<div class="homeComponent">
    <div class="twitchWrapper">
        <div class="streamContainer" v-for="stream in streams">
            <router-link class="clickZone" v-bind:to="{path: 'stream', query: { name: stream.channel.name}}"></router-link>
            <div class="streamImageContainer">
                <img class="streamImage" v-bind:src="stream.preview.large">
            </div>
            <div class="streamTextContainer">
                <div class="streamName streamItem">{{stream.channel.name}}</div>
                <div class="streamGame streamItem">{{stream.channel.game}}</div>
                <div class="streamStatus streamItem">{{stream.channel.status}}</div>
                <div class="streamViewers streamItem">{{stream.viewers | addComma}}</div>
            </div>
            <div class="border borderTop"></div>
            <div class="border borderRight"></div>
            <div class="border borderBottom"></div>
            <div class="border borderLeft"></div>
        </div>
    </div>
    <scrollbar :attachedElem="scrollbarAttachedElem" :offsetTop="offsetTop"/>
</div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import { devID, prodID } from '../clientID.js';

export default {
    name: 'Home',
    data: function () {
        return {
            streams: [],
            pageSize: null,
            scrollbarAttachedElem: "twitchWrapper",
            offsetTop: 75 // height of the top nav bar container
        }
    },

    created () {
        this.getPopularStreams();
    },

    filters: {
        truncate: function (string, value) {
            if(string.length > 20) {
                return string.substring(0, value) + '...';
            } else {
            return string
            }
        },

        addComma: function (string) {
            return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    },

    methods: {
        getPopularStreams() {
            // send a request for the most poular live streams
            axios({
                method:'get',
                url:'https://api.twitch.tv/kraken/streams/?limit=100&offset=0',
                headers: {'Client-ID': devID}
            })
            .then(response => {
                let streamData = response.data.streams;
                this.streams = streamData;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../global_styles.scss";
@import "../responsive_mixin.scss";

$streamHeight: 32%;
$streamWidth: 18%;

.homeComponent {
    position: absoulte;
}

.twitchWrapper {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin: 0px;
    margin-top: 75px;
    padding-top: 30px;
    margin-left: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 75px);
    width: calc(100% - (250px - 18px));
    padding-right: 18px;
}

.streamContainer {
    height: $streamHeight;
    width: $streamWidth;
    /* background: $mainBackgroundColor; */
    color: #dddddd;
    margin: 15px;
    display: flex;
    flex-direction: column;
    /* box-shadow: 0px 0px 10px 3px rgb(0, 0, 0); */
    transition: 0.5s;
    position: relative;
}

/* streamcontainer hover effects */

/* .streamContainer:hover {
    box-shadow: 0px 0px 15px 5px $lighterBackgroundColor;
} */

$animTime: 0.15s;

.streamContainer:hover > .borderTop {
    animation: 
        expandRight $animTime forwards, 
        addShadow $animTime forwards;
}

.streamContainer:hover > .borderRight {
    animation: 
        expandDown $animTime $animTime forwards, 
        addShadow $animTime $animTime forwards;
}

.streamContainer:hover > .borderBottom {
    animation: 
        expandLeft $animTime $animTime * 2 forwards, 
        addShadow $animTime $animTime * 2 forwards;
}

.streamContainer:hover > .borderLeft {
    animation: 
        expandUp $animTime $animTime * 3 forwards, 
        addShadow $animTime $animTime * 3 forwards;
}

.border {
    position: absolute;
}

.borderRight {
    left: 100%;
}

.borderBottom {
    top: 100%;
}

/* animations */

@keyframes addShadow {
    from {
        box-shadow: 0px 0px 10px 5px $lighterBackgroundColor;
    }

    to {
        box-shadow: 0px 0px 10px 5px $lighterBackgroundColor;
    }
}

@keyframes expandRight {
    from {
        width: 0%;
    }
  
    to {
        width: 100%;
    }
}

@keyframes expandDown {
    from {
        height: 0%;
    }
  
    to {
        height: 100%;
    }
}

@keyframes expandLeft {
    from {
        width: 0%;
        left: 100%;
    }
  
    to {
        width: 100%;
        left: 0%;
    }
}

@keyframes expandUp {
    from {
        height: 0%;
        top: 100%;
    }
  
    to {
        height: 100%;
        top: 0%;
    }
}

/* end hover effects */

.streamImageContainer {
    z-index: 1;
}

.streamTextContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background: $mainBackgroundColor;
    flex: 1;
}

.streamItem {
    width: calc(100% - 6px);
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3px;
    padding-right: 3px;
}

.streamName {
    font-size: 15px;
}

.streamGame, .streamViewers, .streamStatus {
    color: rgba(221, 221, 221, 0.774);
    font-size: 14px;
}

.streamImage {
    height: 100%;
    width: 100%;
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #222222;
    opacity: 0;
    transition: 0.5s;
    z-index: 2;
}

.clickZone:hover {
    opacity: 0.3;
}

//
// media queries
//

@include phone {
    .twitchWrapper {
        width: 100%;
        left: 0px;
        margin-left: 0px;
        padding-right: 0px;
    }

    .streamContainer {
        width: 45%;
        height: 30%;
        margin: 3px;
    }

    .streamViewers, .streamStatus {
        display: none;
    }
}

</style>