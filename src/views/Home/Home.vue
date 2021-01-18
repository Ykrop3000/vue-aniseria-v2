<template>
    <div class="container" >

        <Carousel v-if="ANIMES.carousel != []" :animes="ANIMES.carousel" :key="key"/>
        <MiniList :isLoggedIn="isLoggedIn" :sectionName="'top'" :sectionLink="'Animes_rating'" :ANIMES="ANIMES.raiting.slice(0,6)"/>
        <MiniList :isLoggedIn="isLoggedIn" :sectionName="'new'" :sectionLink="'Animes_id'" :ANIMES="ANIMES.id.slice(0,6)"/>
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
        get_animes(key, ordering,limit=24){
            let anime = this.ANIMES[key] || []
       
            if ( anime.length == 0) {
                let page = 1;
                let params = {
                    type: this.$attrs.type || 'animes',
                    ordering: ordering || '-id',
                    page: page,
                    limit: limit,
                    key: key
                }
                this.$store.dispatch('GET_ANIMES', params);                
            }
        },
    },
    mounted(){
        this.get_animes('carousel', '-id', 6)
        this.get_animes('raiting','-user_rate')
        this.get_animes('id','-id')
        
    },
    watch:{
        ANIMES(){
            this.key += 1
        },
    }
    
}
</script>