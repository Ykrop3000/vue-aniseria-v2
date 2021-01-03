<template>
    <div class="media-card">

        <router-link  :to="{name: 'Anime', params:{slug: Anime.url.split('/')[2]}}" class="cover" :class="{'loading':loading}">
            <img :src="SHIKIURL + Anime.image.preview" alt="poster" class="image" :class="{'loaded':!loading}" @load="loading = false">

            <div class="wrap list-btns-wrap"  v-show="ViewMode == '0' && isLoggedIn" >
                <div label="Open List Editor" class="btn open">
                    <i class="fa fa-plus"></i>
                </div>
                <div class="quick-actions">
                    <div label="Add to Watching" class="btn"><i class="fas fa-play"></i></div>
                    <div label="Add to Planning" class="btn"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
            
            <div class="overlay" v-show="ViewMode == '1'">
                <router-link :to="{name: 'Anime', params:{slug: Anime.url.split('/')[2]}}" class="title"  v-text="Anime.russian"></router-link>
                <div class="studio">
                    <span v-for="(i,id) in Anime.studios" :key="id" v-text="i.name"></span>
                </div>
            </div>

        </router-link>

        <router-link :to="{name: 'Anime', params:{slug: Anime.url.split('/')[2]}}" v-if="ViewMode == '0'" class="title" :class="{'loading':loading}" v-text="Anime.russian"></router-link>

        <div class="hover-data right">
            <div class="header">
                <div class="date" v-text="Anime.aired_on.split('-')[0]"></div>
                <div class="score" v-text="Anime.score"></div>
            </div>
            <div class="studios" v-text="Anime.studios.map(e => e.name).join(', ')"></div>
            <div class="info">
                <span v-text="Anime.kind"></span>
                <span class="separator" > • </span>
                <span v-text="Anime.episodes + ' серий'"></span>
            </div>
            <div class="genres">
                <GenerItem v-for="(j,id) in Anime.genres" :key="id" :j="j" :GENRES="GENRES"/>
            </div>
        </div>

        <div class="data" v-show="ViewMode == '1'"> 
            <div class="body">
                <div class="scroll-wrap">
                    <div class="header">
                        <div>
                            <div class="date" v-text="Anime.aired_on.split('-')[0]"></div>
                            <div class="typings">
                                <span v-text="Anime.kind"></span>
                                <span class="separator" > • </span>
                                <span v-text="Anime.episodes + ' серий'"></span>
                            </div>
                        </div>
                        <div>
                            <div class="score">
                                <i class="far fa-smile icon"></i>
                                <div class="percentage" v-text="Anime.score"></div>
                            </div>
                        </div>
                    </div>
                    <div class="description" v-text="Anime.description"></div>
                </div>
            </div>
            <div class="footer">
                <div class="genres">
                    <GenerItem v-for="(j,id) in Anime.genres" :key="id" :j="j" :GENRES="GENRES"/>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import GenerItem from'@/components/items/GenerItem'
export default {
    components:{
        GenerItem
    },
    props:[
        'Anime',
        'GENRES',
        'ViewMode',
        'isLoggedIn'
    ],
    data(){
        return{
            loading: true
        }
    },
    computed:{
        ...mapGetters(['SHIKIURL'])
    },
    watch:{
        Anime(){
            this.loading = false
        }
    }
}
</script>

<style scoped>
.cover.loading, .description.loading div, .title.loading{
    background: rgba(var(--color-background-300),.8);
    box-shadow: none;
    opacity: 1;
    overflow: hidden;
}
.title.loading{
    border-radius: 4px;
    height: 17px;
    margin-top: 12px;
    width: 80%;
}
.cover.loading:before, .title.loading:before {
    animation: loading-pulse-data-v-758c163c 2s linear infinite;
    background: linear-gradient(90deg,rgba(var(--color-gray-300),0) 0,rgba(var(--color-blue-700),.06) 40%,rgba(var(--color-blue-700),.06) 60%,rgba(var(--color-gray-300),0));
    content: "";
    display: block;
    height: 100%;
    transform: translateX(0);
    width: 200%;
}
.cover .media-card {
    transition: 0.3s linear;
    display: grid;
    grid-template-rows: -webkit-min-content auto;
    grid-template-rows: min-content auto;
    position: relative;
    width: 185px;
}
.cover {
    background: rgba(var(--color-background-300),.8);
    border-radius: 4px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    cursor: pointer;
    display: inline-block;
    height: 265px;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 5;
}
.background-color, .image{
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity .3s ease-in-out;
    width: 100%;
}
.title{
    color: rgb(var(--color-gray-700));
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 21px;
    margin-top: 10px;
    overflow: hidden;
    transition: color .2s ease;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.media-card:hover .title{
    color: var(--media-text);
}
.image.loaded {
    opacity: 1;
}
.data{
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 44px;
    min-height: 0;
    min-width: 0;
}
.body{
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding-left: 17px;
    position: relative;
    overflow: hidden;
}
.footer{
    align-items: center;
    background: rgb(var(--color-background-200));
    display: grid;
    grid-template-columns: auto 24px;
    padding: 0 17px;
    padding-right: 14px;
}
.scroll-wrap{
    max-height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
}
.header{
    display: grid;
    grid-template-columns: auto 60px;
    margin-bottom: 6px;
    padding-right: 17px;
    padding-top: 17px;
}
.description{
    color: rgb(var(--color-gray-600));
    display: -webkit-box;
    font-size: 1.1rem;
    line-height: 1.6;
    overflow: hidden;
    padding-right: 17px;
    transition: color .2s;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
}
.wrap{
    position: relative;
}
.list-btns-wrap{
    position: absolute;
    right: 14px;
    bottom: 14px;
}
.media-card:hover .btn.open {
    box-shadow: 0 0 6px 2px rgba(0,0,0,.15);
    transform: scale(1);
    opacity: 1;
}
.btn{
    align-items: center;
    background: rgba(var(--color-overlay),.9);
    border-radius: 50%;
    box-shadow: 0 0 5px 2px rgba(45,45,45,.35);
    color: rgb(var(--color-white));
    cursor: pointer;
    display: grid;
    height: 28px;
    justify-content: center;
    opacity: 0;
    text-align: center;
    transform: scale(.2);
    transition: transform .2s ease-in-out,opacity .2s ease-in-out,background .2s ease-in-out;
    width: 28px;
}
.btn .icon{
    transition: opacity .2s ease-in-out;
    opacity: .9;
    font-size: 2rem;
    transform: scale(.7);
}
.quick-actions{
    pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 28px;
    margin-bottom: -10px;
    transition: margin-bottom .2s ease-in-out;
}
.quick-actions .btn{
    margin-bottom: 7px;
}
.quick-actions .btn:before {
    background: rgba(var(--color-overlay),.9);
    border-radius: 4px;
    box-shadow: 0 7px 15px rgba(var(--color-shadow-blue),.2),0 2px 2px rgba(var(--color-shadow-blue),.1);
    color: rgb(var(--color-white));
    content: attr(label);
    display: block;
    font-size: 1rem;
    font-weight: 700;
    opacity: 0;
    padding: 6px 10px;
    pointer-events: none;
    position: absolute;
    right: 33px;
    top: 2px;
    transition: opacity .2s ease;
    width: 105px;
}
.btn:hover {
    transform: scale(1.1)!important;
    color: #fff;
}
.btn.open:hover+.quick-actions, .quick-actions:hover {
    pointer-events: auto;
    margin-bottom: 0;
}
.btn.open:hover+.quick-actions .btn, .quick-actions:hover .btn{
    box-shadow: 0 0 6px 2px rgba(0,0,0,.15);
    opacity: 1;
    transform: scale(1);
}
.overlay{
    background: rgba(var(--color-overlay),.9);
    color: rgb(var(--color-white));
    font-size: 1.4rem;
    padding: 12px;
    position: absolute;
    bottom: 0;
    width: 100%;
    font-weight: 600;
    line-height: 2rem;
}
.overlay:before {
    background: var(--media-background);
    content: "";
    height: 100%;
    left: 0;
    opacity: .1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 3;
}
.chart a.title{
    color: rgb(var(--color-white));
}
.overlay a{
    position: relative;
    z-index: 10;
}
.studio {
    color: var(--media-overlay-text);
    font-size: 1.2rem;
    margin-top: 8px;
}
a.image-link {
    display: block;
    opacity: 1;
}
.background-color, .image-link, .image{
    height: 100%;
    left: 0;
    object-fit: cover;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity .3s ease-in-out;
    width: 100%;
}
.chart .media-card{
    animation: in .3s linear;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: rgb(var(--color-background-100));
    border-radius: 4px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    display: inline-grid;
    grid-template-columns: 185px auto;
    height: 265px;
    min-width: 370px;
    overflow: hidden;
    position: relative;
    text-align: left;
}
.chart .media-card .cover{
    border-radius: 0px;
}
.genres {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    overflow: hidden;
}
.score .percentage{
    color: rgb(var(--color-gray-700));
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 3px;
}
.score .icon{
    color: #7bd555;
}
.date{
    color: rgb(var(--color-gray-800));
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: .02em;
}
.typings{
    display: inline-block;
    font-size: 1.1rem;
    overflow: hidden;
    padding-top: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    color: rgb(var(--color-gray-700));
}
.hover-data.right {
    margin-left: 18px;
    left: 100%;
}
.hover-data.right:before {
    width: 0;
    height: 0;
    content: "";
    z-index: 2;
    transform: scale(1.01);
    border-right: .6rem solid currentColor;
    border-bottom: .4rem solid transparent;
    border-top: .4rem solid transparent;
    right: 100%;
}
.hover-data:before {
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.1),0 4px 4px rgba(var(--color-shadow-blue),.02);
    color: rgb(var(--color-gray-100));
    position: absolute;
    top: 15%;
}
.hover-data{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    min-width: 290px;
    opacity: 0;
    padding: 24px;
    pointer-events: none;
    position: absolute;
    top: 5px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    z-index: 10;
}
.media-card:hover .hover-data {
    animation: in-data-v-758c163c .22s;
    opacity: 1;
}
.hover-data .studios{
    color: var(--media-text);
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: 10px;
}
.hover-data .info{
    color: rgb(var(--color-gray-700));
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 6px;
}
.hover-data  .genres {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    overflow: hidden;
    margin-top: 22px;
}
.hover-data .header{
    display: grid;
    grid-template-columns: auto 60px;
    font-weight: 600;
    color: rgb(var(--color-gray-800));
    font-size: 1.6rem;
    padding: 0;
}
@media (max-width: 1040px){
    .media-card {
        width: 100% !important;;
    }
    .cover:before {
        content: "";
        display: block;
        height: 0;
        width: 0;
        padding-bottom: 142.85714%;
    }
    .cover{
        height: auto;
        border-radius: 5px;
    }
}
@media (max-width: 760px){
    .footer{
        padding: 0 12px;
        padding-right: 8px;
    }
    .description{
        line-height: 1.6rem;
    }
    .title{
        font-size: 1.2rem;
        line-height: 17px;
    }
}
@media (max-width: 400px){
    .header{
        grid-template-columns: auto;
    }
}
@media (max-width: 320px){
    .description{
        margin-top: 0;
    }
}
</style>