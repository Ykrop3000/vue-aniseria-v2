<template>
    <div class="media media-page-unscoped media-anime">
        <div class="header-wrap">
            <div class="banner" :style="{'background-image': `url(https://st.kp.yandex.net/images/film_big/${ANIME.kp_id}.jpg`}">
                <div class="shadow"></div>
            </div>
            <div class="header">

                <div class="container">
                    <div class="cover-wrap overlap-banner">
                        <div class="cover-wrap-inner">
                            <img :src="SHIKIURL+ ANIME.image.original" alt="" class="cover">
                            <div class="actions">
                                <div class="list">
                                    <div class="add">
                                        Добавить в список
                                    </div>
                                </div>
                                <div class="favourite" @click="setfavorite">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h1 v-text="ANIME.russian"></h1>
                        <p class="description" v-text="ANIME.description"></p>
                        <div class="description-length-toggle">
                            Читать Больше
                        </div>
                        <div class="nav">
                            <router-link :to="{ name: 'Anime'}" replace class="link">Обзор</router-link>
                            <router-link :to="{ name: 'Watch'}" replace class="link">Просмотр</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="content container">
                    
            <div class="sidebar">
                <div class="rankings">

                </div>
                <div class="data">

                    <div class="data-set data-list" v-if="ANIME.genres">
                        <div class="type">Жанры</div>
                        <div class="value">
                            <span v-text="ANIME.genres.map(e => e.russian).join(', ')"></span>
                        </div>
                    </div>

                    <div class="data-set" v-if="ANIME.episodes">
                        <div class="type">Эпизоды</div>
                        <div class="value">
                            <span v-text="ANIME.episodes"></span>
                        </div>
                    </div>

                    <div class="data-set" v-if="ANIME.studios">
                        <div class="type">Студии</div>
                        <div class="value">
                            <span v-text="ANIME.studios.map(e => e.name).join(', ')"></span>
                        </div>
                    </div>

                    
                    <div class="data-set" v-if="ANIME.kind">
                        <div class="type">Формат</div>
                        <div class="value">
                            <span v-text="ANIME.kind"></span>
                        </div>
                    </div>

                    <div class="data-set" v-if="ANIME.status">
                        <div class="type">Статус</div>
                        <div class="value">
                            <span v-text="ANIME.status"></span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <router-view :anime="ANIME">
                <Overview  :anime="ANIME"/>
            </router-view>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import { mapActions } from 'vuex'

import Overview from '@/views/FullPage/Overview'

export default {
    name: 'Single',
    components:{
        Overview
    },
    data(){
        return{
            width: window.innerWidth,
        }
    },
    methods:{
        ...mapActions([
            'CLEAR_ANIME',
            'GET_ANIME',
            'GET_RELATED',
            'GET_ROLES',
            'GET_GENRES'
        ]),
        setfavorite(){
            this.$store.dispatch('SET_FAVORITES',this.ANIME.id);
        }
    },
    beforeMount(){
    },
    mounted() {
        this.GET_ANIME(this.$route.params.slug);
        this.GET_GENRES();
    },
    computed: {
        ...mapGetters([
            'ANIME',
            'SHIKIURL',
            'GENRES',
        ]),
    },
    watch:{
        ANIME(){
            this.GET_RELATED(this.ANIME.id);
            this.GET_ROLES(this.ANIME.id);
        },
        '$route.params.slug'(){
            this.CLEAR_ANIME();
            this.GET_ANIME(this.$route.params.slug);
        }
    }    
}
</script>


<style scoped>
.container {
    padding-left: 20px !important;
    padding-right: 20px !important;
}
.media{
    display: block;
}
.header-wrap{
    position: relative;
    z-index: 997;
}
.content {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 208px auto;
    margin-top: 30px;
    position: relative;
}
.banner{
    background-position: 50% 35%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 400px;
    margin-top: -58px;
    filter: blur(2px);
}
.description-length-toggle{
    background: linear-gradient(0deg,rgb(var(--color-foreground)) 30%,rgba(var(--color-foreground),.4));
    color: rgb(var(--color-text-lighter));
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: -50px;
    max-width: 900px;
    opacity: 0;
    padding-bottom: 5px;
    padding-top: 20px;
    text-align: center;
    transition: .2s;
}
.description-length-toggle:hover {
    opacity: 1;
}
.nav .link {
    padding: 15px;
    color: rgb(var(--color-text-lighter));
}
.nav .link:hover {
    color: rgb(var(--color-blue));
}
.nav .router-link-active {
    color: rgb(var(--color-text));
}
.description{
    color: rgb(var(--color-text-light));
    font-size: 1.4rem;
    line-height: 1.5;
    margin: 0;
    max-width: 900px;
    padding: 15px 0;
    transition: .2s;
}
.banner .shadow{
    background: linear-gradient(180deg,rgba(var(--color-shadow-dark),0) 40%,rgba(var(--color-shadow-dark),.6));
    height: 100%;
    width: 100%;
}
.header{
    background: rgb(var(--color-foreground));
    position: relative;
}
.header .container{
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 215px auto;
}
.cover-wrap.overlap-banner {
    margin-top: -125px;
}
.cover-wrap {
    position: relative;
}
.actions{
    display: grid;
    grid-template-columns: auto 35px;
    margin-bottom: 20px;
    margin-top: 20px;
    grid-gap: 15px;
}
.cover {
    background-color: rgba(212,230,245,.5);
    border-radius: 2px;
    box-shadow: 0 0 29px rgba(49,54,68,.25);
    margin-top: 15px;
    width: 100%;
}
.favourite{
    align-items: center;
    background: rgb(var(--color-red-400));
    border-radius: 5px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: flex;
    font-size: 1.4rem;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-weight: 800;
    height: 35px;
    justify-content: center;
    padding-left: 1px;
    transition: .2s;
    padding: 0 14px;
}
.list {
    align-items: center;
    background: rgb(var(--color-blue));
    border-radius: 3px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: flex;
    font-size: 1.4rem;
    height: 35px;
    justify-content: center;
    line-height: 1.3rem;
}
.list .add {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    width: calc(100% - 34px);
}
.nav{
    align-self: end;
    display: flex;
    font-size: 1.3rem;
    justify-content: space-evenly;
    justify-self: center;
    max-width: 800px;
    padding-top: 10px;
    width: 100%;
}
.data {
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    padding: 18px;
}
.tags{
    margin-top: 20px;
}
.data-set {
    padding-bottom: 14px;
}
.data-list .type{
    padding-bottom: 2px;
}
.type{
    font-size: 1.3rem;
    font-weight: 500;
    padding-bottom: 5px;
}
.value {
    color: rgb(var(--color-text-lighter));
    font-size: 1.2rem;
    line-height: 1.3;
}
.data-list .value{
    line-height: 1.4;
}
.header .content {
    display: block;
    padding-top: 25px;
}
@media (max-width: 760px){
    .content {
        display: block;
    }
    .banner{
        height: 210px;
        margin-top: 0;
    }
    .header .container{
        grid-template-columns: 1fr;
    }
    .cover-wrap.overlap-banner, .cover-wrap {
        margin-top: -110px;
    }
    .cover-wrap-inner{
        display: grid;
        grid-template-columns: 100px auto;
        grid-gap: 20px;
        align-items: flex-end;
    }
    .cover {
        max-width: 100px;
    }
    .description{
        display: none;
    }
    .actions{
        margin-bottom: 0;
    }
    .actions .list .add {
        padding-left: 0;
    }
    .nav {
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        width: auto;
        justify-self: unset;
        justify-content: unset;
    }
     .data {
        display: flex;
        margin-bottom: 25px;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
    }
    .data-set{
        padding-bottom: 0;
        padding-right: 25px;
    }
    .type{
        color: rgb(var(--color-text-lighter));
        font-size: 1.3rem;
        font-weight: 400;
        padding-bottom: 6px;
    }
    .data-list .type{
        padding-bottom: 6px;
    }
    .value{
        color: rgb(var(--color-text));
        font-size: 1.4rem;
    }
}
</style>