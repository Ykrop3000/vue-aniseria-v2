<template>
    <div class="overview">

        <div class="description-wrap">
            <h2>Описание</h2>
            <div class="description content-wrap" v-text="anime.description"></div>
        </div>
        <Player v-if="anime.video_link" :src="anime.video_link" />
        <Roles v-if="ROLES" :roles="ROLES.filter(r => r.roles[0] === 'Main')" :title="'Главные герои'"/>
        <Screenshots v-if="anime.screenshots" :images="anime.screenshots"/>
        <Trailer v-if="anime.videos.filter(v => v.hosting === 'youtube')[0]" :src="anime.videos.filter(v => v.hosting === 'youtube')[0].player_url "/>
        <Related v-if="RELATED.filter(r => r.anime != null)" :width="width"  :related="RELATED" :key="rkey" :class="{'small':width>=1040}"/>
        <Similar v-if="SIMILAR"  :similar="SIMILAR" :key="rkey + 1" />
    </div>
</template>


<script>
import Trailer from '@/views/FullPage/components/Trailer'
import Screenshots from '@/views/FullPage/components/Screenshots'
import Related from '@/views/FullPage/components/Related'
import Player from '@/views/FullPage/components/Player'
import Roles from '@/views/FullPage/components/Roles'
import Similar from '@/views/FullPage/components/Similar'



import {mapGetters} from 'vuex'

export default {
    name:'Overview',
    props:[
        'anime'
    ],
    data(){
        return{
            rkey: 0,
            width: window.innerWidth,
        }
    },
    computed:{
        ...mapGetters([
            'RELATED',
            'ROLES',
            'SIMILAR'
        ])
    },
    mounted(){
        this.rkey += 1,
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );
    },
    methods:{
        handleWidthChange() {
            this.width =  window.innerWidth;
        },
    },
    components:{
        Trailer,
        Screenshots,
        Related,
        Player,
        Roles,
        Similar
    },
}
</script>

<style>
.relations.small{
    margin-bottom: 10px;
    overflow: hidden;
}
</style>

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