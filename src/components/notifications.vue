<template>

<div class="notificationsContainer" v-if='queue[0]'>
    <img class="logoImg" v-bind:src="queue[0].stream.channel.logo" />
    <div class="textContainer">
        <div class="name">{{queue[0].stream.channel.name}}</div>
        <div class="textDetails">just started streaming</div>
        <div class="game">{{queue[0].stream.channel.game}}</div>
        <div class="closeButton" v-on:click="clickedClose($event)">x</div>
    </div>
    <div class="previewContainer">
        <img class="previewImg" v-bind:src="queue[0].stream.preview.medium" />
        <router-link class="clickZone" @click.native="clickedClose($event)" v-bind:to="{path: 'stream', query: { name: queue[0].stream.channel.name}}"></router-link>
    </div>
</div>

</template>

<script>

export default {
    name: 'notifications',

    data: function () {
        return {
            following: null,   
            queue: [],     
            transitionTime: 1000,
            showTime: 8000,
            sound: null,
        }
    },

    created() {
        // wait for data to be returned from requests, then check for new data
        setTimeout(() => {
            setInterval(() => {
                // this.checkForNewLive();
            }, 1000);

            setInterval(() => {
                // this.queueUpdate()
            }, 500)
        }, 3000);
    },

    mounted() {
        // load sound file
        // do this at start b/c chrome doesn't allow you to load sounds
        // in active tabs, aka we couldn't hear notifications unless this was the active browser tab
        this.sound = new Audio("/src/assets/positive.wav");
        this.sound.volume = 0.5;
    },

    methods: {
        checkForNewLive() {
            // check if anybody the user is following has go live 
            // this is for displaying a notification to let the user know someone they follow has gone live

            // set the data but don't show notifications
            const followingNew = this.$store.state.following;
            if (!this.following) {
                // set initial following data
                if (followingNew) this.following = followingNew;
                else this.following = [];
            } else {
                // data has already been set, see how it compares to the new data
                let newLive = [];

                // loop over each item in the followingNew array
                // check to see if there is a matching one in the old data
                // if no match then it is a recent login
                if (followingNew && followingNew.length > 0) {
                    followingNew.forEach((newItem) => {
                        let match = false
                        this.following.forEach((oldItem) => {
                            if (newItem.channel.name == oldItem.channel.name) match = true;
                        });
                        if (!match) {
                            newLive.push(newItem)
                            // add any new items to the queue to be displayed
                            const newQueueItem = {
                                data: {
                                    startTime: null, 
                                    finished: false 
                                },
                                stream: newItem,
                            };
                            this.queue.push(newQueueItem)
                            console.log('new item added to queue', newQueueItem)
                        }
                    });
                }
                // replace old data w/ new
                this.following = followingNew;
            }
        },

        queueUpdate() {
            let container = document.querySelector(".notificationsContainer");

            if (this.queue.length > 0) {
                // check what component we are on
                // const url = window.location.href;
                // if(url.includes('stream')) container.style.left = "calc(40% - 150px)";
                // else container.style.left = "calc(50% - 150px)";

                if(!this.queue[0].data.startTime) {
                    // if first in queue has no start time it means it has not been started
                    // yet and startTime needs to be set and the element needs to fade in
                    this.queue[0].data.startTime = Date.now();
                    // transition element into view
                    container.style.top = '75px';
                    // play audio to signal a broadcaster started steaming
                    setTimeout(() => {
                        this.sound.play();
                    }, 750);
                } else {
                    // if the first queue object has already had its startTime set
                    // check if it has finished is display animation
                    // check to make sure container is in its starting position and that
                    // the animation is marked finished

                    if (this.queue[0].data.startTime + this.showTime + this.transitionTime < Date.now()) {
                        // display time has been 6s this means the animation (dur: 1s)
                        // has finished going back to position and queue item can be marked finished
                        this.queue[0].data.finished = true;
                        // remove from queue
                        this.queue.splice(0, 1);
                    } else if (this.queue[0].data.startTime + this.showTime < Date.now()) {
                        // display time has been 5s, now return it to starting position offscreen
                        container.style.top = '-500px';
                    }
                }
            }
        },

        clickedClose(event) {
            // clicked either close notification or go to notification
            // either way move the notification off the page
            const container = document.querySelector(".notificationsContainer");
            container.style.top = '-500px';
        },
    }
}

</script>

<style scoped>

.notificationsContainer {
    position: absolute;
    z-index: 10;
    top: -500px;
    left: calc(50% - 150px);
    transition: top 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.textContainer {
    display: flex;
    background: #111111;
    color: #dddddd;
    height: 40px;
    line-height: 40px;
    color: #dddddd;
    text-align: center;
    font-size: 14px;
    box-shadow: 0px 0px 20px 2px rgba(0,0,0,0.75);
    border-radius: 3px;
    padding-left: 10px;
    padding-right: 10px;
}

.logoImg {
    height: 75px;
    width: 75px;
    margin-bottom: 5px;
    border-radius: 5px;
}

.name, .textDetails {
    padding-right: 5px;
    line-height: 40px;
}

.name {
    color: rgb(64, 209, 161);
    font-size: 16px;
    line-height: 40px;
}

.game {
    color: rgb(226, 86, 43);
    font-size: 16px;
    line-height: 40px;
}

.previewImg {
    border-radius: 5px;
}

.closeButton {
    padding-left: 20px;
    font-size: 12px;
    line-height: 37px;
    cursor: pointer;
}

.previewContainer {
    position: relative;
    margin-top: 5px;
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    border-radius: 5px;
}

</style>
