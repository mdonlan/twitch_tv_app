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
import { devID, prodID } from '../clientID.js';

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
          'Client-ID': devID,
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

    format(str) {
        let match = this.linkRegex.exec(str);
        let count = 0;
        if(match) {
            console.log(count);
            count++;
            console.log(match)
            let temp = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
            return temp;
        }
        return str;
    },

    checkForLinks(text) {
        let match;
        while ((match = this.linkRegex.exec(text)) !== null) {
            let textMatch = `[${match[1]}](${match[2]})`;
            console.log(match[0])
            // console.log(textMatch)
            let link = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
            text = text.replace(match[0], link)
        }
        return text;

        // console.log(text.replace(this.linkRegex, this.format(text)));
        // return text;

    //     if(text.includes("just")) {
    //         let linkElem = text;
    //         let match;
    //         let addedToLength = 0;
    //         let count = 0;
    //         let indexOffset = 0;
    //         linkElem.replace(this.linkRegex, "red");
    //         console.log(linkElem)
    //         while ((match = this.linkRegex.exec(text)) !== null) {
    //             // console.log('COUNT: ' + count);

    //             // let temp = linkElem.substr(0, match.index + addedToLength);
    //             // let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             // temp += linkString;
    //             // addedToLength += linkString.length;
    //             // linkElem = temp;

    //             // linkElem.replace(this.linkRegex, "red");
    //             // console.log(linkElem)

    //             // if(count == 0) {
    //             //     console.log('0')
    //             //     let temp = text.substr(0, match.index);
    //             //     console.log(temp);
    //             //     let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     // let temp = linkElem.substr(0, match.index);
    //             //     temp += linkString;
    //             //     // indexOffset = originalLinkLength - linkString;
    //             //     linkElem = temp;
    //             //     // console.log(temp)
    //             // }

    //             // if(count == 1) {
    //             //      console.log('1')
    //             //      let temp = text.substr(0, match.index);
    //             //     console.log(temp);
    //             //     // // console.log(linkElem)
    //             //     // let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     // let temp = linkElem.substr(0, match.index + originalLinkLength);
    //             //     // temp += linkString;
    //             //     // linkElem = temp;
    //             //     // console.log(temp)
    //             // }

    //             // if(count == 2) {
    //             //     // console.log('2')
    //             //     // let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     // let temp = linkElem.substr(0, match.index + originalLinkLength);
    //             //     // temp += linkString;
    //             //     // linkElem = temp;
    //             //     // console.log(temp)
    //             // }

    //             // if(count == 3) {
    //             //     // console.log('3')
    //             //     // let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     // let temp = linkElem.substr(0, match.index + originalLinkLength);
    //             //     // temp += linkString;
    //             //     // linkElem = temp;
    //             //     // console.log(temp)
    //             // }

    //             // if(count == 4) {                    
    //             //     // console.log(text)
    //             //     console.log('4')

    //             //     let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     let temp = text.substr(0, match.index);

    //             //     // console.log(temp.length, linkElem.length)
    //             //     // // let newTemp = 
    //             //     // // temp += linkString;
    //             //     // console.log(temp)

    //             //     //temp += linkString;
    //             //     //linkElem = temp;
    //             // }

    //             // if(count == 5) {
    //             //     // console.log('5')
    //             //     // let linkString = `<a class="panelTextLink" href="${match[2]}">${match[1]}</a>`; 
    //             //     // let originalLinkLength = match[2].length + match[1].length + 4; // + 4 for []()
    //             //     // let temp = linkElem.substr(0, match.index + originalLinkLength);
    //             //     // temp += linkString;
    //             //     // linkElem = temp;
    //             //     // console.log(temp)
    //             // }

    //             // count++;
    //         }
            
    //         if(linkElem.length > 0) {
                
    //             //linkElem = `<div class="linkContainer">` + linkElem + `</div>`;
    //             return linkElem;
    //         }

    //         return text;
    //     }
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

    column-count: 4;
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

    // background-color: #eee;
    display: inline-block;
    margin: 0 0 1em 0em;
    width: 100%;
    padding: 10px;
    // min-height: 100px;
}

.panelDesc {
    width: 100%;

    /* use deep selector to style v-html b/c its not in scope */
    /deep/ .panelTextLink {
        color: #dddddd;
        margin: 5px;
    }

    /deep/ .linkContainer {
        display: flex;
        flex-direction: column;
    }
}
</style>