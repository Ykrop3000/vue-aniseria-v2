<template>
    <div class="medialist cards">
        <Filters/>

        <div class="lists" >
            <div class="actions">
            </div>
            <Lists v-for="(val, key) in stats" :key="key" :list="rates.filter(r => LISTS.filter(r => r.status == key).map(l => l.target_id).includes(r.id) )" :title="val"/>
        </div>
    </div>
</template>

<script>
import Lists from '../components/Lists'
import Filters from '../components/Filters'

import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
    name: 'Favorites',
    components:{
        Lists,
        Filters
    },
    props:['user'],
    data(){
        return{
            stats: this.$store.state.stats
        }
    },
    computed:{
        ...mapGetters(['ANIMES','LISTS']),
        favorite:{
            get(){
                if (this.ANIMES.favorite){
                    return this.ANIMES.favorite.animes
                }else{
                    return []
                }
            }
        },
        rates:{
            get(){
                if (this.ANIMES.rates){
                    return this.ANIMES.rates
                }else{
                    return []
                }
            }
        }

    },
    methods:{
        ...mapActions(['GET_FAVORITES','GET_ANIME_RATES'])
    },
    mounted(){
        this.GET_FAVORITES(this.user.nickname)
        this.GET_ANIME_RATES(this.user.id)
    }
}
</script>


<style scoped>
.medialist{
    margin-top: 40px;
    display: grid;
    grid-template-columns: 180px auto;
    grid-column-gap: 40px;
}
.lists {
    position: relative;
}
.actions {
    position: absolute;
    top: -20px;
    right: 0;
}
@media (max-width: 760px)
{   
    .lists {
        margin-top: 30px;
    }
    .medialist {
        display: block;
        margin-top: 20px;
    }
    .actions {
        top: -10px;
    }
}

</style>
