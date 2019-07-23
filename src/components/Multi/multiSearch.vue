<template>

<div v-if="!$store.state.multi[this.num - 1]" class="multi_search_wrapper">
    <div class="input_wrapper">
        <input class="input" v-model="query" @input="searchChangeHandler($event)" placeholder="Search for channels...">
        <div class="clear_input" @click="clearInput">X</div>
    </div>
    <div class="results">
        <div class="result" :key="result._id" v-for="result in results" v-on:click="setChannel(result)">
            <div>{{ result.channel.name }}</div>
            <div>{{ result.game }}</div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';
import { devID, prodID } from '../../clientID.js';

export default {
    name: 'multiSearch',
    props: ["num"],
    data: function () {
        return {
            query: "",
            results: []
        }
    },

    methods: {

        clearInput() {
            this.query = "";
            this.results = [];
        },
 
        setChannel(result) {
            this.$store.commit("setMulti", {channel: result.channel.name, num: this.$store.state.numMultiStreams});
            this.$store.commit("setNumMultiStreams", this.$store.state.numMultiStreams + 1);
            this.$store.commit("setShowAddNewMultiBtn", false);
        },

        searchChangeHandler(e) {
            this.search(e.target.value);
        },

        search(searchQuery) {
            axios({
                method:'get',
                url:'https://api.twitch.tv/kraken/search/streams?query=' + searchQuery + '&limit=100',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': devID,
                }
            })
            .then((response) => {
                let results = [];
                response.data.streams.forEach((stream) => {
                    let matches = stream.channel.name.includes(searchQuery);
                    if(matches) {
                        results.push(stream);
                    }
                })
                results = results.slice(0, 10);
                this.results = results;
            })
            .catch((error) => {
                console.log(error);
            });
        },
    }
}

</script>

<style lang="scss" scoped>
@import "../../global_styles.scss";

.multi_search_wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #dddddd;
    max-height: calc(100% - 30px);
}

.input_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 30px;
}

.input {
    width: 50%;
    border: none;
    outline: none;
    padding: 5px;
    max-width: 300px;
    text-align: center;
    height: calc(100% - 10px);
}

.clear_input {
    height: 100%;
    width: 25px;
    padding-left: 5px;
    padding-right: 5px;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: rgb(94, 40, 40);
}

.clear_input:hover {
    background: rgb(185, 85, 85);
}

.results {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80%;
    background: #111111;
    width: 400px;
}

.result {
    background: $lighterBackgroundColor;
    margin-top: 5px;
    cursor: pointer;
}

.result:hover {
    background: #333333;
}

</style>
