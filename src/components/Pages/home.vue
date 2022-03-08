<template>
    <div class="container">
        <h1>Home</h1>
        <hr>

        <div class="gridbox">
            <md-card v-for="(article,index) in articles" :key="index">
               <md-card-media md-ratio="16:9">
                    <img class="card-img" :src="require(`../../assets/images/${article.img}`)"/>
                </md-card-media>

               <md-card-header>
                    <div class="md-title">{{ article.title}}</div>
                    <div class="md-subhead">{{ article.content }}</div>
                </md-card-header>

                <md-card-actions md-alignment="left">
                    <md-button>Enter</md-button>
                    <md-button>Like</md-button>
                </md-card-actions>
            </md-card>

        </div>
    </div>
</template>

<script>
    import { posts } from '../Utils/posts.js';

    export default {
        data(){
            return {
                articles: posts
            }
        }
    }

</script>

<style>

.gridbox {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.gridbox > div {
  box-sizing: border-box;
}

.md-card {
    border: 1px solid #dbdbdb;
}

.md-card-media.md-ratio-16-9 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 55% 5%;
}

.md-card-actions {

    border-top: 1px solid gainsboro;
}
@media screen and (max-width:820px) {
    .gridbox {
        grid-template-columns: 1fr 1fr;
    }
}
@media screen and (max-width:700px) {
    .gridbox {
        grid-template-columns: 1fr;
    }
}
</style>
