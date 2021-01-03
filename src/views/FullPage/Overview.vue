<template>
    <div class="overview">


        <div class="description-wrap">
            <h2>Описание</h2>
            <div class="description content-wrap" v-text="anime.description"></div>
        </div>
        <Player v-if="anime.video_link" :src="anime.video_link" />
        <Roles v-if="ROLES" :roles="ROLES.filter(r => r.roles[0] === 'Main')" />
        <Screenshots v-if="anime.screenshots" :images="anime.screenshots"/>
        <Trailer v-if="anime.videos.filter(v => v.hosting === 'youtube')[0]" :src="anime.videos.filter(v => v.hosting === 'youtube')[0].player_url "/>
        <Related v-if="RELATED.filter(r => r.anime != null)"  :related="RELATED" :key="rkey"/>

    </div>
</template>


<script>
import Trailer from './components/Trailer'
import Screenshots from './components/Screenshots'
import Related from './components/Related'
import Player from './components/Player'
import Roles from './components/Roles'



import {mapGetters} from 'vuex'

export default {
    name:'Overview',
    props:[
        'anime'
    ],
    data(){
        return{
            rkey: 0
        }
    },
    computed:{
        ...mapGetters([
            'RELATED',
            'ROLES'
        ])
    },
    mounted(){
        this.rkey += 1
    },
    components:{
        Trailer,
        Screenshots,
        Related,
        Player,
        Roles
    },
}
</script>


<style scoped>
.overview>div {
    margin-bottom: 30px;
}
.description-wrap {
    display: none;
}
.overview .content-wrap {
    background: rgb(var(--color-foreground));
    border-radius: 4px;
    font-size: 1.4rem;
    padding: 20px;
}

.overview>div {
    margin-bottom: 30px;
}

@media (max-width: 760px){
    .description-wrap {
        display: block;
    }
    .button, .external-links, .rankings, .tags {
        display: none;
    }

    .button, .external-links .rankings, .tags {
        display: none;
    }
    
    .description-wrap {
        display: block;
    }
}
</style>