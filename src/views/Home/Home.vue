<template>
    <div class="">
        <Carousel v-if="carousel.length != 0" :animes="carousel" :key="key"/>
        <div class="container" >

            
            <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Лучшее'" :order="'ranked'" :ANIMES="raiting.slice(0,6)"/>
            <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Новое'" :order="'popularity'" :season="'winter_2021'" :ANIMES="popularity.slice(0,6)"/>
            <MiniList :type="'Anime'" :isLoggedIn="isLoggedIn" :sectionName="'Анонс'" :order="'popularity'" :status="'anons'" :ANIMES="anons.slice(0,6)"/>

        </div>
    </div>
</template>

<script>
// "https://st.kp.yandex.net/images/film_big/{kinopoisk_id}.jpg
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
                return this.$store.state.carousel || []
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
        this.$store.dispatch('SET_TRANSPARENT',true)
        if (this.$store.state.carousel.length == 0){
            this.$store.dispatch('GET_CAROUSEL')
        }
        this.get_animes('carousel', 'popularity', 10,'','ongoing')
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
.search-landing:nth-child(2n)::after{
    content: '';
    background-color: rgb(var(--color-background-100));
    position: absolute;
    top: 0;
    right: -10vw;
    width: 110vw;
    height: 100%;
}
.search-landing:nth-child(2n) .landing-section {
    padding: 15px 0;
}

.search-landing:nth-child(2n){
    margin-bottom: 30px;
}
@media (max-width: 1040px){
    .search-landing:nth-child(2n)::after{
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