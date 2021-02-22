<template>
    <div class="container" >

        <Carousel :animes="carousel" :key="key"/>
        <MiniList :isLoggedIn="isLoggedIn" :sectionName="'Лучшее'" :order="'ranked'" :ANIMES="raiting.slice(0,6)"/>
        <MiniList :isLoggedIn="isLoggedIn" :sectionName="'Новое'" :order="'aired_on'" :ANIMES="aired_on.slice(0,6)"/>
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
        aired_on:{
            get(){
                return this.ANIMES.aired_on || []
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
        get_animes(key, ordering, limit=24,season=''){
            let anime = this.ANIMES[key] || []
       
            if ( anime.length == 0) {
                let page = 1;
                let params = {
                    type: this.$attrs.type || 'animes',
                    order: ordering || 'id',
                    page: page,
                    limit: limit,
                    key: key,
                    season: season
                }

                this.$store.dispatch('GET_ANIMES', params);                
            }
        },
    },
    mounted(){
        this.get_animes('carousel', 'popularity',24,2021)
        this.get_animes('raiting','ranked')
        this.get_animes('aired_on','popularity',24,'winter_2021')
        document.title = 'Смотреть Аниме онлайн бесплатно в хорошем качестве - AniSeria'
        
    },
    watch:{
        ANIMES(){
            this.key += 1
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