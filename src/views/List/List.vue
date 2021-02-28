<template>
    <div v-infinite-scroll="handleScroll"  class="container" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
        
        <h1 class="alias-title" v-if="width>=1040">
            Список аниме
        </h1>
        <div class="wrap" v-else>
            <div class="mobile-header">
                Список аниме
            </div>
        </div>

        <Filters />

        <SecondaryFilters/>
        <div class="not-found" v-show="animes[0] == 404">Ничего не найдено</div>
        <div class="results" v-show="animes[0] != 404" :class="{ cover:ViewMode==0, chart:ViewMode==1, table:ViewMode==2}">
            <MediaCard v-for="i in animes" :key="i.id" :Anime="i" :ViewMode="ViewMode" :isLoggedIn="isLoggedIn"/>
        </div>
    
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Filters from "@/components/modules/Filters"
import SecondaryFilters from '@/components/modules/SecondaryFilters'
import infiniteScroll from 'vue-infinite-scroll'

import ClickOutside from 'vue-click-outside'
import MediaCard from '@/components/MediaCard'

export default {
    components:{
        Filters,
        MediaCard,
        SecondaryFilters
    },
    directives:{
        ClickOutside,
        infiniteScroll
    },
    props:[
        'isLoggedIn',
    ],
    data(){
        return{
            page: 1,
            pagination: true,
            width: window.innerWidth,

            ViewMode: localStorage.getItem('vm') || 0

        }
    },
    methods: {

        get_time(){
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        },

        get_animes(update = false){
            let t = false

            if (!this.ANIMES[this.sortVal]){
                t = true
            }else if (this.ANIMES[this.sortVal].length == 0){
                t = true
            }

            let page = 0
            if (this.ANIMES[this.sortVal]){
                page = Math.ceil(this.ANIMES[this.sortVal].length/24)+1;
            }else{
                page = 1
            }

            let key = ''
            if (this.$route.query.search == '' || !this.$route.query.search){
                key = this.sortVal
            }else{
                key = 'search'
            }

            var self = this
            if (t  || update) {
                                
                let params = {
                    key: key,
                    page: page,
                    type: self.$attrs.type || 'animes',
                    order: self.$route.query.order || "popularity",
                    search: self.search,
                    genres: self.$route.query.genre,
                    kind: self.$route.query.kind,
                    season: self.$route.query.season
                }

                self.$store.dispatch('GET_ANIMES', params);
                self.lastRequest = self.get_time()               
            }

        },

        handleScroll: function() {
            if (this.pagination && (this.get_time() - this.lastRequest  >= 3) && this.STATUS == 'success' ){
                this.get_animes(true)
            }
        },
    },
    mounted() {
        this.get_animes();
        this.animes = this.ANIMES[this.sortVal] || []
        document.title = 'Смотреть Аниме онлайн бесплатно в хорошем качестве - AniSeria'
    },
    computed: {
        ...mapGetters([
            'ANIMES',
            'STATUS'
        ]),
        lastRequest: {
            get(){
                let d =  new Date();
                return d.getMinutes()*60 + d.getSeconds()
            },
            set(val){
                return val
           }
        },

        animes:{
            get(){
                if(this.ANIMES[this.sortVal]  && this.ANIMES[this.sortVal].length != 0){
                    return this.ANIMES[this.sortVal]
                }else{
                    let a = []
                    for (let i=0;i<24;i++){
                        a = a.concat(new Object)
                    }
                    return a
                } 
            },
            set(val){
                return val
            }
        },
        sortVal:{
            get(){
                let query = this.$route.query
                if(query.search || query.genres  || query.kind  || query.season ){
                    return 'search'
                }else{
                    return this.$route.query.order || "popularity" 
                }
            }
        },
        search:{
            get(){
                return this.$route.query.search  || ''
            }
        }
    },
    watch: {
        '$route.query'(){
            this.$store.dispatch('CLEAR_ANIMES', this.sortVal);
            this.get_animes(true)
        },
    }
}
</script>

<style scoped>
@media (max-width: 1040px){
    .container{
        padding: 0 !important;
    }
}
</style>

<style>
.results {
    display: grid;
    grid-gap: 28px 30px;
    grid-template-columns: repeat(auto-fill,185px);
    justify-content: space-between;
    z-index: 5;
    position: relative;
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
.mobile-header{
    cursor: pointer;
    display: inline-block;
    font-size: 3.2rem;
    font-weight: 900;
    letter-spacing: .01em;
    padding: 25px 20px;
    padding-bottom: 0;
}
.not-found{
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
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
        padding: 0 10px;
    }
}

.label {
    color: rgb(var(--color-gray-600));
    font-size: 1.3rem;
    font-weight: 600;
    padding-left: 8px;
    white-space: nowrap;
}

.icon{
    font-size: 1.8rem;
}

</style>