<template>
    <div v-infinite-scroll="handleScroll"  class="container" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
        
        <h1 class="alias-title" v-if="width>=1040">
            test
        </h1>
        <div class="wrap" v-else>
            <div class="mobile-header">
                test
            </div>
        </div>

        <Filters :GENRES="GENRES" :STUDIOS="STUDIOS" @fs="filter_send" />

        <!------------------------------------->
        <div class="secondary-filters">
            <div class="active-filters">
                <i class="fas fa-tags tags-icon" v-if="filterActive || searchActive"></i>
                <div class="filter" v-if="searchActive">
                    <span class="lable" v-text="'Поиск: '+ search"></span>
                </div>
            </div>
            <div class="selects-wrap">
                <div class="sort-wrap sort-select" v-click-outside="tr">
                    <i class="fas fa-sort icon"></i>
                    <span @click="sortTr = !sortTr" class="label" v-text="sortText"></span>
                    <div v-if="sortTr"  class="dropdown">
                        <div class="option"  @click="sortVal = '-year'; sortText = 'Дате выхода'; sortTr = false" v-text="'Дате выхода'"></div>
                        <div class="option"  @click="sortVal = '-user_rate'; sortText = 'Рейтингу'; sortTr = false " v-text="'Рейтингу'"></div>
                        <div class="option"  @click="sortVal = '-id'; sortText = 'Дате добавления'; sortTr = false" v-text="'Дате добавления'"></div>
                    </div>
                </div>
                <div class="wrap">
                    <div class="icon-wrap cover" :class="{ active: ViewMode==0}" @click="ViewMode=0"><i class="fas fa-th icon"></i></div>
                    <div class="icon-wrap chart" :class="{ active: ViewMode==1}" @click="ViewMode=1"><i class="fas fa-th-large icon"></i></div>
                    <div class="icon-wrap" :class="{ active: ViewMode==2}" @click="ViewMode=2"><i class="fas fa-th-list icon" ></i></div>
                </div>
            </div>
        </div>
        <!------------------------------------->
        <FullList :ViewMode="ViewMode" :ANIMES="animes" :isLoggedIn="isLoggedIn"/>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Filters from "@/components/modules/Filters"
import ClickOutside from 'vue-click-outside'
import FullList from './components/FullList'


export default {
    components:{
        Filters,
        FullList
    },
    directives:{
        ClickOutside
    },
    props:[
        'GENRES',
        'STUDIOS',
        'isLoggedIn'
    ],
    data(){
        return{
            animes: [],
            ViewMode: 0,
            pretype: this.$attrs.type,
            page: 1,
            pagination: true,
            width: window.innerWidth,

            filterActive: false,
            filter: {},
            stateFilter:true,

            searchActive: false,
            search: this.$route.query.search  || '',

            sortTr: false,
            sortVal: '-year',
            sortText: 'Дате выхода'
        }
    },
    methods: {
        tr(){
            this.sortTr = false
        },  
        get_time(){
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        },
        get_animes(t = true){
            if (this.animes.length == 0 || this.$attrs.type != this.pretype || t) {
                let page = Math.ceil(this.animes.length/24)+1 || 1;
                let params = {
                    type: this.$attrs.type || 'animes',
                    ordering: this.sortVal,
                    page: page,
                    search: this.search,
                }
                if (this.filterActive){
                    params.genres =  this.filter.genres;
                }
                    
                this.$store.dispatch('GET_ANIMES', params);                
                this.pretype = this.$attrs.type;
            }
        },
        get_genres(){
            if (this.GENRES.length == 0) {
                this.$store.dispatch('GET_GENRES');
            }
        },
        get_studios(){
            if (this.GENRES.length == 0) {
                this.$store.dispatch('GET_STUDIOS');
            }
        },
        handleScroll: function() {
            if (this.pagination && (this.get_time() - this.lastRequest  >= 3) && this.STATUS == 'success' ){
                this.get_animes()
            }
        },
        filter_send: function(d){
            this.filterActive = true;
            this.filter = d;
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes()
        },
    },
    mounted() {
        this.get_animes();
        this.get_genres();
        this.get_studios();
    },
    computed: {
        ...mapGetters([
            'ANIMES',
            'STATUS'
        ]),
        lastRequest: () =>{
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        }
    },
    watch: {
        'ANIMES.main'(){
            this.animes = this.ANIMES.main
        },
        sortVal() {
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes(true)
        },
        '$route.query'(){
            if (this.$route.query.search){
                this.search = this.$route.query.search;
                if (this.search){
                    this.searchActive = true
                }else{
                    this.searchActive = false
                }
                this.$store.dispatch('CLEAR_ANIMES');
                this.get_animes()
            }
        }
    }
}
</script>


<style>
.results {
    display: grid;
    grid-gap: 28px 30px;
    grid-template-columns: repeat(auto-fill,185px);
    justify-content: space-between;
    z-index: 5;
    position: relative;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}
.results.chart {
    grid-template-columns: repeat(3,minmax(390px,460px));
    grid-template-rows: repeat(auto-fill,265px);
}
.alias-title{
    font-size: 2.8rem;
    color: rgb(var(--color-gray-800));
    font-weight: 800;
    margin-bottom: -45px;
    margin-top: 35px;
    padding-bottom: 30px;
    text-transform: capitalize;
}
@media (max-width: 1540px){
    .results.cover  {
        grid-gap: 25px 20px;
    }
    .results.chart {
        grid-gap: 28px 30px;
        grid-template-columns: repeat(2,minmax(390px,760px));
    }
}
@media (max-width: 1065px){
    .results.cover {
        grid-gap: 25px 14px;
    }
    .results.chart {
        grid-gap: 25px 10px;
    }
}
@media (max-width: 1040px){
    .results.cover {
        padding: 0 20px;
        grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
        grid-gap: 25px 20px;
        justify-content: center;
    }
    .results {
        padding: 0 20px;
        padding-top: 0px;
        padding-right: 20px;
        padding-bottom: 0px;
        padding-left: 20px;
        grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
        grid-gap: 25px 20px;
        justify-content: center;
    }
}
@media (max-width: 800px){
    .results.chart {
        grid-template-columns: minmax(390px,760px);
        grid-gap: 25px 20px;
    }
}
@media (max-width: 760px){
    .results.cover {
        grid-template-columns: repeat(auto-fill,minmax(105px,1fr));
        grid-gap: 25px 20px;
    }
}
@media (max-width: 400px){
    .results.cover {
        grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
        grid-gap: 20px 12px;
        padding: 0 10px;
    }
   .results.chart {
        grid-template-columns: 1fr;
        grid-gap: 20px 0;
        padding: 0;
    }
}
/* ---------Ordering Filter---------*/
.filter{
    transition: 0.2s linear;
    background: rgb(var(--color-blue-600));
    border-radius: 6px;
    color: rgb(var(--color-white));
    cursor: pointer;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 13px;
    margin-right: 12px;
    padding: 5px 8px;
    text-transform: capitalize;
}
.secondary-filters{
    align-items: center;
    display: grid;
    grid-template-columns: auto -webkit-min-content;
    grid-template-columns: auto min-content;
    margin-bottom: 30px;
    min-height: 23px;
    position: relative;
}
.active-filters, .landing .title {
    z-index: 5;
    position: relative;
}
.active-filters{
    align-items: center;
    display: flex;
    flex-wrap: wrap;
}
.secondary-filters .selects-wrap{
    display: flex;
    align-items: center;
}
.sort-select{
    border-right: solid 1px rgb(var(--color-gray-400));
    padding-right: 10px;
    margin-right: 12px;
}
.sort-wrap{
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.label {
    color: rgb(var(--color-gray-600));
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 8px;
    white-space: nowrap;
}
.secondary-filters .wrap {
    align-items: center;
    cursor: pointer;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
}
.icon{
    font-size: 1.8rem;
}
.icon-wrap.active .icon{
    color: rgb(var(--color-gray-600));
}
.icon-wrap .icon{
    cursor: pointer;
    color: rgb(var(--color-gray-500));
    transition: color .3s ease;
    font-size: 1.8rem;
}
.mobile-header{
    cursor: pointer;
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 900;
    letter-spacing: .01em;
    padding: 25px 20px;
    padding-bottom: 0;
}
.dropdown{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    cursor: auto;
    left: -20px;
    padding: 10px 16px;
    position: absolute;
    top: calc(100% + 10px);
    width: 150px;
    z-index: 50;
}
.dropdown:before {
    width: 0;
    height: 0;
    content: "";
    z-index: 2;
    transform: scale(1.01);
    border-bottom: .6rem solid currentColor;
    border-left: .4rem solid transparent;
    border-right: .4rem solid transparent;
    bottom: 100%;
    color: rgb(var(--color-gray-100));
    left: calc(50% - 6px);
    position: absolute;
}
.option{
    color: rgb(var(--color-gray-700));
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 8px 0;
    transition: color .2s ease;
}
.option:hover {
    color: rgb(var(--color-blue-600));
}
.tags-icon {
    color: rgb(var(--color-gray-500));
    font-size: 1.5rem;
    margin-right: 16px;
}
@media (max-width: 400px){
    .secondary-filters {
        padding: 0 10px  !important;
    }
}
@media (max-width: 1040px){
    .secondary-filters {
        padding: 0 20px !important;
    }
    .container{
        padding: 0 !important;
    }
}
/*----------------------------------*/
</style>