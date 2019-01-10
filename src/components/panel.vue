<template>
  <div class="panelWrapper">
      <div class="panelData" v-if="panelData">
            <div class="panelItem" v-bind:key="index" v-for="panelItem, index in panelData">
                <a v-bind:href="panelItem.data.link">
                    <img class="panelImg" v-bind:src="panelItem.data.image" />
                </a>
                <div class="panelDesc">{{panelItem.data.description}}</div>
            </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { devID, prodID } from '../clientID.js';

export default {
  name: 'panel',
  data: function () {
    return {
        panelData: null
    }
  },
  created() {
      if(this.$store.state.onVideoPage) {
        this.loadPanel();
      }

      // set store change watcher
      this.$store.watch((state) => {return this.$store.state.onChannel}, (onChannel, oldValue) => {
        //console.log('watched: ', onChannel);
        //console.log(onChannel, oldValue)
        this.loadPanel();
      });
  },

  methods: {
    loadPanel() {
        let clientID = localStorage.getItem("id_token");
        let accessToken = localStorage.getItem("access_token");
      
        axios({
        method:'get',
        url:'https://api.twitch.tv/api/channels/' + this.$store.state.onChannel + '/panels',
        headers: {
          'Client-ID': devID,
          'Authorization': accessToken
        }
      })
      .then(response => {
          console.log("\n TEST")
        console.log(response)
        this.panelData = response.data;
      })
      .catch(error => {
          console.log(error);
      });
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../global_styles.scss";

.panelWrapper {
    width: 100%;
    top: 100%;
    position: absolute;
    z-index: 6;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #dddddd;
    background: $mainBackgroundColor;
}

.panelData {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 75%;
}

.panelItem {
    width: 33%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.panelDesc {
    width: 75%;
}

</style>