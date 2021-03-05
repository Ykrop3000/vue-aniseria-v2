<template>
    <div class="search-landing">
        <div class="landing-section">

            <router-link :to="{name: 'Animes', query:{ order:order,season:season,status:status}}" class="title link">
                <h3 v-text="sectionName"></h3>
                <div class="expand">Посмотреть все</div>
            </router-link>

            <div class="results cover">
                <MediaCard :type="type" v-for="i in anime" :key="i.id" :Anime="i" :ViewMode="0" :isLoggedIn="isLoggedIn"/>
            </div>
            
        </div>
    </div>
</template>
<script>

import MediaCard from '@/components/MediaCard'
import ClickOutside from 'vue-click-outside'


export default {
    components:{
        MediaCard,
    },
    directives:{
        ClickOutside
    },
    computed:{
        anime:{
            get(){
                if(this.ANIMES && this.ANIMES.length != 0){
                    return this.ANIMES
                }else{
                    let a = []
                    for (let i=0;i<6;i++){
                        a = a.concat(new Object)
                    }
                    return a
                }
            }
        }
    },
    props:[
        'order',
        'season',
        'status',
        'sectionName',
        'ANIMES',
        'isLoggedIn',
        'type'
    ],
}
</script>
<style scoped>
.search-landing {
    margin-top: -30px;
}
.landing-section{
    margin-bottom: 50px;
}
.landing .title {
    z-index: 5;
    position: relative;
}
.link{
    align-items: flex-end;
    display: flex;
}
.title{
    color: rgb(var(--color-gray-800));
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: .03em;
    text-transform: uppercase;
    margin-bottom: 20px;
}
.title h3{
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
}
.link .expand{
    color: rgb(var(--color-gray-600));
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: auto;
    text-transform: none;
    transition: color .2s ease;
}
@media (max-width: 1040px){
    .title{
        padding: 0 20px;
    }
}
@media (max-width: 890px) and (min-width: 520px){
    .results .media-card:nth-child(n+6){
        display: none;
    }
}
@media (max-width: 644px) and (min-width: 520px){
    .results .media-card:nth-child(n+5){
        display: none;
    }
}
</style>