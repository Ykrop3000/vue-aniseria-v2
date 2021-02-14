<template>
    <div class="media media-page-unscoped media-anime" 
    v-infinite-scroll="handleScroll" 
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10">

        <el-dialog
        :visible.sync="listDilog"
        class="list-editor-wrap dilog"
        >
        <div class="list-editor">

            <div class="header" :style="{'background-image':bigPoster}">
                <div class="content">
                    <div class="cover" >
                        <img  :src="poster || require('@/assets/img/noimage.jpg')" alt="poster" style="opacity: 1">
                    </div>
                    <div class="title" v-text="ANIME.russian"></div>
                    <div class="save-btn" @click="setrates">Сохранить</div>
                </div>
            </div>
            <div class="body">
                <div class="input-wrap anime">
                    <div class="form status">
                        <div class="input-title">Статус</div>
                        <el-select v-model="list.status" placeholder="Статус">
                            <el-option
                            v-for="(val,key) in $store.state.stats"
                            :key="key"
                            :label="val"
                            :value="key">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form score">
                        <div class="input-title">Рейтинг</div>
                        <el-input-number v-model="list.score" controls-position="right" :min="1" :max="10"></el-input-number>
                    </div>
                    <div class="form progress">
                        <div class="input-title">Эпизод</div>
                        <el-input-number v-model="list.episodes" controls-position="right" :min="1" :max="ANIME.episodes"></el-input-number>
                    </div>

                </div>
            </div>
                        
        </div>
        </el-dialog>



        <div class="header-wrap" :class="{'loading': !ANIME.id}">
            <div class="banner" :style="{'background-image':bigPoster}" >
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
                        <p class="description" v-if="ANIME.description" v-text="ANIME.description"></p>
                        <div class="description-length-toggle">
                            Читать Больше
                        </div>
                        <div class="nav">
                            <router-link :to="{ name: 'Anime'}" replace class="link">Обзор</router-link>
                            <router-link :to="{ name: 'Watch'}" replace class="link">Просмотр</router-link>
                            <router-link :to="{ name: 'Characters'}" replace class="link">Персонажи</router-link>
                            <router-link :to="{ name: 'Frames'}" replace class="link">Кадры</router-link>
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

                    <div class="data-set" v-if="ANIME.aired_on">
                        <div class="type">Дата выхода</div>
                        <div class="value">
                            <span v-text="aired_on"></span>
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

                    <div class="data-set" v-if="ANIME.english">
                        <div class="type">Английский</div>
                        <div class="value">
                            <span v-text="ANIME.english.join(', ')"></span>
                        </div>
                    </div>

                    <div class="data-set" v-if="ANIME.japanese">
                        <div class="type">Японский</div>
                        <div class="value">
                            <span v-text="ANIME.japanese.join(', ')"></span>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <router-view :anime="ANIME" :kodik="KODIK"></router-view>
        </div>
        <Comments :render="comments_render" :isLoggedIn="isLoggedIn" :id="ANIME.topic_id"/>
    </div>
</template>


<script>
import {mapGetters} from 'vuex';
import { mapActions } from 'vuex'
import Preloader from '@/components/Preloader'
import Comments from './components/Comments'
import moment from 'moment'

export default {
    name: 'Single',
    data(){
        return{
            width: window.innerWidth,
            listDilog: false,
            comments_render: false,
            list:{
                status: '',
                score: 0,
                episodes: 0
            }
        }
    },

    props: ['isLoggedIn','user',],
    components:{
        Comments
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
            'SET_ANIME_RATES',
            'SET_FAVORITES'
        ]),
        setfavorite(){
            if(this.isLoggedIn){
                this.SET_FAVORITES({id:this.ANIME.id, type: this.ANIME.favoured});
            }else{
                this.$message.error('Для этого действия тебе необходима регистрация на сайте.');
            }
        },
        setrates(){
            if(this.isLoggedIn){
                this.SET_ANIME_RATES({target_id:this.ANIME.id, status: this.list.status, user_id:this.user.id});
            }else{
                this.$message.error('Для этого действия тебе необходима регистрация на сайте.');
            }
        },
        setTitle(){
            if(this.ANIME){
                document.title = this.ANIME.russian + ' смотреть онлайн бесплатно в хорошем качестве - AniSeria'
            }
        },
        Preload(){
            this.$preloaders.open({
                    "component": Preloader,
                    "overlayStyle": {
                        "backgroundColor": "rgb(255 255 255 / 36%)",
                        "opacity": 1
                    }
                })
        },
        handleScroll(){
            this.comments_render = true
        }
    },
    created(){
        this.Preload()
    },
    mounted() {
        
        this.$store.dispatch('SET_TRANSPARENT',true)
        this.GET_ANIME(this.$route.params.slug);
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
                if(this.KODIK.kinopoisk_id){
                    return `url(https://st.kp.yandex.net/images/film_big/${this.KODIK.kinopoisk_id}.jpg`
                }else{
                    return ''
                }
            }
        },
        aired_on:{
            get(){
                return moment(this.ANIME.aired_on).lang("ru").format('LL')
            }
        }
    },
    watch:{
        ANIME(){
            if (this.ANIME.id){
                this.$preloaders.close()
                this.setTitle()
                this.GET_KODIK(this.ANIME.id)
                this.GET_ROLES(this.ANIME.id);
                this.GET_RELATED(this.ANIME.id);
                this.GET_SIMILAR(this.ANIME.id);
            }
        },
        '$route.params.slug'(){
            this.Preload()
            this.CLEAR_ANIME();
            this.GET_ANIME(this.$route.params.slug);
        },
    }    
}
</script>


<style>

.list-editor-wrap .el-dialog__header {
    padding: 0;
    position: relative;
    z-index: 20;
}
.el-dialog__body, .el-dialog__header, .el-dialog__title {
    color: rgb(var(--color-text));
}
.el-dialog__header {
    background: rgb(var(--color-foreground));
    border-radius: 3px 3px 0 0;
}

.list-editor-wrap .el-dialog__body {
    background: 0 0;
    color: rgb(var(--color-text));
    font-size: 1.3rem;
    line-height: normal;
    padding: 0;
}
.el-dialog__body {
    background: rgb(var(--color-background));
    border-radius: 3px;
}
.list-editor-wrap .header .cover img {
    width: 100%;
}
.list-editor-wrap .el-dialog {
    animation: in .25s ease-in-out;
    background: 0 0;
    overflow: hidden;
    border-radius: 4px;
    box-shadow: 0 2px 33px rgb(0 0 0 / 48%);
    width: 100%;
    max-width: 1000px;
}
.list-editor-wrap .list-editor .body {
    background: rgb(var(--color-foreground));
    display: grid;
    grid-gap: 50px;
    grid-template-columns: auto 160px;
    padding: 50px;
    padding-top: 70px;
}
.list-editor-wrap .list-editor .body .input-wrap {
    display: grid;
    grid-gap: 40px;
    grid-template-areas:
        "status score progress"
        "start finish repeat"
        "notes notes notes"
        "advanced advanced advanced";
    justify-content: space-around;
}
.list-editor-wrap .list-editor .body .input-title {
    color: rgba(var(--color-text-light),.9);
    font-size: 1.3rem;
    padding-bottom: 8px;
    padding-left: 1px;
}
.list-editor-wrap .list-editor .body .status {
    grid-area: status;
}
.list-editor-wrap .list-editor .body .progress {
    grid-area: progress;
}
.list-editor-wrap .list-editor .body .score {
    grid-area: score;
}
.list-editor-wrap .el-select {
    box-shadow: none;
}
.el-select>.el-input {
    display: block;
}
.list-editor-wrap .el-input, .list-editor-wrap .el-input-number, .list-editor-wrap .el-select, .list-editor-wrap .el-textarea {
    width: 100%;
}
.el-input, .el-textarea {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    color: rgb(var(--color-text));
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
@media (max-width: 1040px){
    .list-editor-wrap .list-editor .body .input-wrap {
        display: block;
    }
    .list-editor-wrap .list-editor .body .input-wrap .form {
    margin-bottom: 25px;
}
}
@media (max-width: 760px){
    .list-editor-wrap .list-editor .body {
        display: block;
        padding: 30px;
        padding-top: 70px;
    }
}

</style>

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
.list-editor-wrap .header {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: inset 0 0 250px #2f3133;
    height: 180px;
    position: relative;
}

.list-editor-wrap .header .content {
    align-items: flex-end;
    display: flex;
    height: 100%;
    padding: 50px;
    padding-bottom: 0;
    position: relative;
    z-index: 10;
    grid-column-gap: initial;
    margin-top: auto;
}
.list-editor-wrap .header:after {
    background: rgba(31,40,53,.65);
    bottom: 0;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 5;
}
.list-editor-wrap .header .cover {
    border-radius: 2px;
    margin-bottom: -30px;
    max-width: 100px;
    overflow: hidden;
}
.list-editor-wrap .header .title {
    color: rgba(var(--color-white),.9);
    font-size: 1.6rem;
    padding: 20px;
}
.list-editor-wrap .header .favourite {
    margin-left: auto;
    margin-bottom: 13px;
    margin-right: 10px;
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
.list-editor-wrap .header .save-btn {
    background: rgb(var(--color-blue));
    border-radius: 3px;
    color: rgb(var(--color-white));
    cursor: pointer;
    font-size: 1.3rem;
    margin-bottom: 15px;
    padding: 8px 14px;
}
@media (max-width: 760px){
    .list-editor-wrap .header .content {
        padding: 30px;
        padding-bottom: 0;
    }
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
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
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