<template>
    <div class="overview">

        <div class="description-wrap" v-if="anime.description">
            <h2>Описание</h2>
            <div class="description content-wrap" v-text="anime.description"></div>
        </div>
        <Related v-if="related"  :width="width"  :related="related" :class="{'small':width>=1040}"/>
        <Roles v-if="ROLES" :roles="roles" :title="'Главные герои'"/>
        <Stats :statuses="anime.rates_statuses_stats" />
        <Screenshots v-if="anime.screenshots" :images="anime.screenshots"/>
        <Trailer v-if="trailer" :src="trailerl_url"/>
        <Similar v-if="similar"  :similar="similar"/>

    </div>
</template>


<script>

const Trailer = () => import('@/views/FullPage/components/Trailer')
const Screenshots = () => import('@/views/FullPage/components/Screenshots')
const Related = () => import('@/views/FullPage/components/Related')
const Roles = () => import('@/views/FullPage/components/Roles')
const Similar = () => import('@/views/FullPage/components/Similar')
const Stats = () => import('@/components/modules/Stats')


import {mapGetters} from 'vuex'

export default {
    name:'Overview',
    props:[
        'anime',
        'kodik'
    ],
    data(){
        return{
            width: window.innerWidth,
        }
    },
    computed:{
        ...mapGetters([
            'RELATED',
            'ROLES',
            'SIMILAR'
        ]),
        trailerl_url:{
            get(){
                if (this.trailer.player_url){
                    return `https:${this.trailer.player_url.split(':')[1]}`
                }
                return ''
            }
        },
        roles:{
            get(){
                if (this.ROLES){
                    return this.ROLES.filter(r => r.roles[0] === 'Main')
                }else{
                    return []
                }
            }
        },
        trailer:{
            get(){
                if (this.anime.videos){
                    return (this.anime.videos.filter(v => v.hosting === 'youtube').length == 0 )? false: this.anime.videos.filter(v => v.hosting === 'youtube')[0]
                }else{
                    return false
                }
            }
        },
        related:{
            get(){
                if (this.RELATED){
                    return (this.RELATED.length == 0 )? false: this.RELATED
                }else{
                    return false
                }
            }
        },
        similar:{
            get(){
                if (this.SIMILAR){
                    return (this.SIMILAR.length == 0 )? false: this.SIMILAR
                }else{
                    return false
                }
            }
        }
    },
    mounted(){
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
        Roles,
        Similar,
        Stats
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