<template>
    <div class="media media-page-unscoped media-anime" 
    v-infinite-scroll="handleScroll" 
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10">

        <SetRates
            :poster="poster"
            :bigPoster="`url(${BANNER})`" 
            :triger="listDilog"
            :ANIME="ANIME"
            :isLoggedIn="isLoggedIn"
            :user="user"
            v-if="listDilog"
            @set_triger="listDilog_triger" 
        />


        <div class="header-wrap" :class="{'loading': !ANIME.id}">
            <div class="banner" :style="{'background-image':`url(${BANNER })`}" >
                <div class="shadow"></div>
            </div>
            <div class="header">

                <div class="container" >
                    <div class="cover-wrap overlap-banner">
                        <div class="cover-wrap-inner" >
                            <img  :src="poster || require('@/assets/img/noimage.jpg')" alt="poter" class="cover">
                            <div class="actions">
                                <div class="list">
                                    <div class="add" @click="listDilog = true">
                                        Добавить в список
                                    </div>
                                </div>
                                <div class="favourite" @click="setfavorite" :class="{'isFavourite': ANIME.favoured}">
                                    <i class="fas fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <h1 v-text="ANIME.russian"></h1>
                        <p class="description" :class="{'full': des}"  v-html="$bbcode.parse(ANIME.description)" v-if="ANIME.description"></p>

                        <div class="nav">
                            <router-link :to="{ name: $attrs.link}" replace class="link">Обзор</router-link>
                            <router-link v-if="!ANIME.anons && $attrs.type != 'mangas'" :to="{ name: 'Watch'}" replace class="link">Просмотр</router-link>
                            <router-link v-if="!ANIME.anons && $attrs.type != 'mangas'" :to="{ name: 'Characters'}" replace class="link">Персонажи</router-link>
                            <router-link v-if="!ANIME.anons && $attrs.type != 'mangas'"  :to="{ name: 'Frames'}" replace class="link">Кадры</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="content container">
                    
            <Sidebar :ANIME="ANIME"/>
            <keep-alive>
                <router-view :anime="ANIME" :kodik="KODIK" :type="$attrs.link"></router-view>
            </keep-alive>
        </div>
        <Comments v-if="comments_render && ANIME.topic_id" :render="comments_render" :isLoggedIn="isLoggedIn" :id="ANIME.topic_id"/>
    </div>
</template>


<script>
import {mapGetters} from 'vuex';
import { mapActions } from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import Sidebar from './components/Sidebar' 

const Comments = () => import('./components/Comments.vue')
const SetRates = () => import('@/components/SetRates.vue')

export default {
    name: 'Single',
    data(){
        return{
            width: window.innerWidth,
            listDilog: false,
            comments_render: false,
            des: false
        }
    },
    directives:{
        infiniteScroll
    },
    props: ['isLoggedIn','user',],
    components:{
        Comments,
        SetRates,
        Sidebar
    },
    methods:{
        ...mapActions([
            'CLEAR_ANIME',
            'GET_ANIME',
            'GET_ROLES',
            'GET_RELATED',
            'GET_SIMILAR',
            'GET_GENRES',
            'GET_KODIK',
            'SET_FAVORITES',
            'GET_BANNER'
        ]),
        setfavorite(){
            if(this.isLoggedIn){
                this.SET_FAVORITES({id:this.ANIME.id, type: this.ANIME.favoured});
            }else{
                this.$message.error('Для этого действия тебе необходима регистрация на сайте.');
            }
        },
        setTitle(){
            if(this.ANIME){
                document.title = this.ANIME.russian + ' смотреть онлайн бесплатно в хорошем качестве - AniSeria'
            }
        },
        handleScroll(){
            this.comments_render = true
        },
        listDilog_triger(v){
            this.listDilog = v
        },
        get_page(){
            let type = this.$attrs.type || 'animes'
    
            this.GET_ANIME({
                slug: this.$route.params.slug,
                type: type
            });

        }
    },
    mounted() {
        this.get_page()
        this.$store.dispatch('SET_TRANSPARENT',true)
        this.GET_GENRES();

        document.title = 'Смотреть Аниме онлайн бесплатно в хорошем качестве - AniSeria'

    },
    computed: {
        ...mapGetters([
            'ANIME',
            'KODIK',
            'SHIKIURL',
            'GENRES',
            'STATUS',
            'BANNER'
        ]),
        poster:{
            get(){
                if(this.ANIME.image){
                    return this.SHIKIURL + this.ANIME.image.original
                }else{
                    return ''
                }
            }
        },
        bigPoster:{
            get(){
                if(this.KODIK){
                    return `https://st.kp.yandex.net/images/film_big/${this.KODIK.kinopoisk_id}.jpg`
                }else{
                    return ''
                }
            }
        },
    },
    watch:{
        ANIME(){
            if (this.ANIME.id){
                let type = this.$attrs.type || 'animes'
                this.setTitle()
                this.GET_BANNER(this.ANIME.english[0] || this.ANIME.japanese[0])
                this.GET_KODIK(this.ANIME.id)
                this.GET_ROLES({id:this.ANIME.id, type:type});
                this.GET_RELATED({id:this.ANIME.id, type:type});
                this.GET_SIMILAR({id:this.ANIME.id, type:type});
            }
        },
        '$route.params.slug'(){
            this.$store.dispatch('SET_TRANSPARENT',true)
            this.CLEAR_ANIME();
            this.get_page()
        },
    }    
}
</script>




<style scoped>
.loading .content .description, .loading .content h1{
    background: rgba(var(--color-background-300),.8);
    box-shadow: none;
    opacity: 1;
    overflow: hidden;
    height: 100%;
    border-radius: 4px;
}
.loading .content .description{
    padding: 0 !important;
    margin-top: 15px;
}
.loading .content .description::before, .loading .content h1::before{
    animation: loading-pulse-data-v-758c163c 2s linear infinite;
    background: linear-gradient(90deg,rgba(var(--color-gray-300),0) 0,rgba(var(--color-blue-700),.06) 40%,rgba(var(--color-blue-700),.06) 60%,rgba(var(--color-gray-300),0));
    content: "";
    display: block;
    height: 100%;
    transform: translateX(0);
    width: 200%;
}
.outline.isFavourite{
    color: rgb(var(--color-red));
}
.favourite.isFavourite{
    color: #ffaebc;
}
.outline{
    background: 0 0;
    color: rgb(var(--color-white));
    font-size: 1.6rem;
    opacity: .9;
}



.media{
    display: block;
}
.header-wrap{
    position: relative;
    z-index: 997;
}
.container.content {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 208px auto;
    margin-top: 30px;
    position: relative;
}
.banner{
    background-position: 50% 35%;
    background-color: rgba(31,40,53,.65);
    background-repeat: no-repeat;
    background-size: cover;
    height: 400px;
    margin-top: -58px;
   
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
    margin-top: 23px;
    width: 100%;
}
.header .cover img{
    opacity: 0;
}
.favourite{
    align-items: center;
    background: rgb(var(--color-red-400));
    border-radius: 5px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: flex;
    font-size: 1.4rem;
    font-weight: 800;
    height: 35px;
    justify-content: center;
    padding-left: 1px;
    transition: .2s;
    padding: 0 14px;
}
.favourite.isFavourite{
    color: #ffaebc;
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
    text-align: center;
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

.header .content {
    display: inline-grid;
    grid-template-rows: -webkit-min-content -webkit-min-content auto;
    grid-template-rows: min-content min-content auto;
    padding-top: 25px;
}
@media (max-width: 760px){
    .container.content {
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
    .description-length-toggle{
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
    .container h1 {
        font-size: 1.8rem;
        font-weight: 500;
    }
}

@media (max-width: 1040px){
    .container {
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
}
</style>