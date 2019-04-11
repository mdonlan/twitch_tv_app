<template>
    <div class="multi_search_wrapper">
        <input v-model="query" @input="searchChangeHandler($event)">
        <div class="results">
            <div v-for="result in results">
                {{ result.name }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { devID, prodID } from '../clientID.js';

export default {
    name: 'multiSearch',
    data: function () {
        return {
            query: "",
            results: []
        }
    },

    mounted() {
    },

    methods: {

        searchChangeHandler(e) {
            this.search(e.target.value);
        },

        search(searchQuery) {
            axios({
                method:'get',
                url:'https://api.twitch.tv/kraken/search/streams?query=' + searchQuery,
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': devID,
                }
            })
            .then((response) => {
                console.log(response);
                console.log(this);
                this.$set(this.results, response.data.streams);
            })
            .catch(function (error) {
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
    justify-content: center;
    align-items: center;
    color: #dddddd;
}

</style>
