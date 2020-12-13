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

        <Filters :GENRES="GENRES"/>

        <!------------------------------------->
        <div class="secondary-filters">
            <div class="active-filters"></div>
            <div class="selects-wrap">
                <div class="sort-wrap sort-select">
                    <i class="fas fa-sort icon"></i>
                    <span class="label">Trending</span>
                </div>
                <div class="wrap">
                    <div class="icon-wrap cover" :class="{ active: ViewMode==0}" @click="ViewMode=0"><i class="fas fa-th icon"></i></div>
                    <div class="icon-wrap chart" :class="{ active: ViewMode==1}" @click="ViewMode=1"><i class="fas fa-th-large icon"></i></div>
                    <div class="icon-wrap" :class="{ active: ViewMode==2}" @click="ViewMode=2"><i class="fas fa-th-list icon" ></i></div>

                </div>
            </div>
        </div>
        <!------------------------------------->

        <div class="results" :class="{ cover:ViewMode==0, chart:ViewMode==1, table:ViewMode==2}">
            <MediaCard v-for="i in ANIMES" :key="i.id" :Anime="i" :ViewMode="ViewMode" :GENRES="GENRES" :isLoggedIn="isLoggedIn"/>
        </div>

    </div>

</template>

<script>
import {mapGetters} from 'vuex';

import MediaCard from '@/components/MediaCard'
import Filters from "@/components/modules/Filters"

export default {
    components:{
        MediaCard,
        Filters
    },
    props:[
        'GENRES',
        'isLoggedIn'
    ],
    data(){
        return{
            ViewMode: 0,
            ordering: '-year',
            pretype: this.$attrs.type,
            page: 1,
            pagination: true,
            width: window.innerWidth,
            filterActive: false,
            filter: {},
            stateFilter:true
        }
    },
    methods: {
        get_time(){
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        },
        get_animes(t = true){
            if (this.ANIMES.length == 0 || this.$attrs.type != this.pretype || t) {

                let page = Math.ceil(this.ANIMES.length/24)+1 || 1;
                let params = {
                    type: this.$attrs.type || 'animes',
                    ordering: this.ordering,
                    page: page,
                }

                if (this.filterActive){
                    params.year_start = this.filter.year[0];
                    params.year_end = this.filter.year[1];
                    params.genres =  this.filter.genres;
                    params.gf =  this.filter.gf;
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
        handleScroll: function() {
            if (this.pagination && (this.get_time() - this.lastRequest  >= 3) && this.ANIMESSTATUS == 'success' ){
                this.get_animes()
            }
        },
        filter_send: function(d){
            this.filterActive = true;
            this.filter = d;
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes()
        }
    },
    mounted() {
        this.get_animes();
        this.get_genres();
    },
    computed: {
        ...mapGetters(['ANIMES']),
        ...mapGetters(['ANIMESSTATUS']),

        lastRequest: () =>{
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        }
    },
    watch: {
        ordering() {
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes(true)
        }
    }

}
</script>

<style scoped>
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