<template>
  <div class="panelWrapper">
      <div class="panelData" ref="panelData" v-if="panelData">
            <div class="panelItem" v-bind:key="index" v-for="panelItem, index in filterEmptyPanels(panelData)">
                <div v-if="panelItem.data.image">
                    <a v-bind:href="panelItem.data.link">
                        <img class="panelImg" v-bind:src="panelItem.data.image" />
                    </a>
                </div>
                <div class="panelDesc" v-if="panelItem.data.description" v-html="checkForLinks(panelItem.data.description)"></div>
            </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { client_id } from '../clientID.js';

export default {
  name: 'panel',
  data: function () {
    return {
        panelData: null,
        linkRegex: /\[(.*?)\]\((.*?)\)/gm
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
          'Client-ID': client_id,
          'Authorization': accessToken
        }
      })
      .then(response => {
        this.panelData = response.data;
      })
      .catch(error => {
          console.log(error);
      });
    },

    filterEmptyPanels: function(items) {
        return items.filter(function(item) {
            return Object.keys(item.data).length > 0;
        })
    },

    checkForLinks(text) {
        let match;
        while ((match = this.linkRegex.exec(text)) !== null) {
            let link = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
            text = text.replace(match[0], link)
        }
        return text;
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
    // display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // justify-content: center;
    // width: 75%;

    column-count: 3;
    column-gap: 2em;
    width: 75%;
    margin-top: 10px;
}

.panelItem {
    // width: 33%;
    // margin-top: 10px;
    // margin-bottom: 10px;
    // padding-top: 10px;
    // padding-bottom: 10px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // font-size: 14px;

    display: inline-block;
    margin: 0 0 1em 0em;
    width: 100%;
    padding: 10px;
}

.panelDesc {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    /* use deep selector to style v-html b/c its not in scope */
    /deep/ .panelTextLink {
        color: #dddddd;
        margin: 5px;
        width: 100%;
    }

    /deep/ .linkContainer {
        display: flex;
        flex-direction: column;
    }
}
</style>