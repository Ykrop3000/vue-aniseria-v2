<template>
    <div class="container" >

        <Carousel :animes="carousel" :key="key"/>
        <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Лучшее'" :order="'ranked'" :ANIMES="raiting.slice(0,6)"/>
        <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Новое'" :order="'popularity'" :season="'winter_2021'" :ANIMES="popularity.slice(0,6)"/>
        <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Анонс'" :order="'popularity'" :status="'anons'" :ANIMES="anons.slice(0,6)"/>

    </div>

</template>

<script>

import Carousel from './components/Carousel'
import MiniList from '@/views/List/components/MiniList'

import {mapGetters} from 'vuex'

export default {
    name:'Home',
    props: [
        'isLoggedIn'
    ],
    computed:{
        ...mapGetters(['ANIMES']),
        raiting:{
            get(){
                return this.ANIMES.raiting || []
            }
        },
        popularity:{
            get(){
                return this.ANIMES.popularity || []
            }
        },
        anons:{
            get(){
                return this.ANIMES.anons || []
            }
        },
        carousel:{
            get(){
                return this.ANIMES.carousel || []
            }
        }
    },
    components:{
        Carousel,
        MiniList
    },
    data(){
        return{
            key: 0,
        }
    },
    methods:{
        get_animes(key, ordering, limit=24,season='',status=''){
            let anime = this.ANIMES[key] || []
       
            if ( anime.length == 0) {
                let page = 1;
                let params = {
                    type: this.$attrs.type || 'animes',
                    order: ordering || 'id',
                    page: page,
                    limit: limit,
                    key: key,
                    season: season,
                    status: status
                }

                this.$store.dispatch('GET_ANIMES', params);                
            }
        },
    },
    mounted(){
        this.get_animes('carousel', 'popularity',10,2021)
        this.get_animes('raiting','ranked')
        this.get_animes('popularity','popularity',24,2021)
        this.get_animes('anons', 'popularity',24,'','anons')
        document.title = 'Смотреть Аниме онлайн бесплатно в хорошем качестве - AniSeria'
        
    },
    watch:{
        ANIMES(){
            this.key += 1
        },
    }
    
}
</script>
<style>    
.search-landing:nth-child(2n+1)::after{
    content: '';
    background-color: rgb(var(--color-background-100));
    position: absolute;
    top: 0;
    right: -10vw;
    width: 110vw;
    height: 100%;
}
.search-landing:nth-child(2n+1) .landing-section {
    padding: 15px 0;
}

.search-landing:nth-child(2n+1){
    margin-bottom: 30px;
}
@media (max-width: 1040px){
    .search-landing:nth-child(2n+1)::after{
        right: 0;
    }
}
</style>
<style scoped>
@media (max-width: 1040px){
    .container{
        padding: 0 !important;
    }
}
</style>