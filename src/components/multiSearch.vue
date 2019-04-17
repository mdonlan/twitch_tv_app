<template>
    <div class="multi_search_wrapper">
        <input class="input" v-model="query" @input="searchChangeHandler($event)">
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
import { devID, prodID } from '../clientID.js';

export default {
    name: 'multiSearch',
    props: ['num'],
    data: function () {
        return {
            query: "",
            results: []
        }
    },

    mounted() {
    },

    methods: {
 
        setChannel(result) {
            this.$store.commit("setMulti", {channel: result.channel.name, num: this.num});
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

<style scoped>

.multi_search_wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    background: darkblue;
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #dddddd;
}

.input {
    width: 50%;
    height: 25px;
    border: none;
    outline: none;
}

.results {
    display: flex;
    flex-direction: column;
    width: 50%;
    overflow-y: auto;
}

.result {
    background: #222222;
    margin-top: 5px;
    cursor: pointer;
}

.result:hover {
    background: #333333;
}

</style>
