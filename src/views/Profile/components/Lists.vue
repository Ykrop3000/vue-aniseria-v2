<template>

    <div class="list-wrap" v-if="list.length != 0" >
        <h3 class="section-name" v-text="title"></h3>

        <div class="list-section">
            <div class="list-entries">
                <div class="entry-card" v-for="(anime,id) in list" :key="id">
                    <div class="cover">
                        <div class="image" v-lazy:background-image="SHIKIURL + anime.image.preview"></div>
                    </div>
                    <div class="title">
                        <router-link :to="{name: 'Anime', params:{slug: anime.url.split('/')[2]} }" v-text="anime.russian"></router-link>
                    </div>
                    <div class="score" v-text="anime.score"></div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'lists',
    props: ['list','title'],
    computed:{
        ...mapGetters(['SHIKIURL']),

    }
}
</script>

<style  scoped>


 .section-name {
    font-weight: 400;
    font-size: 1.8rem;
}
.list-section {
    display: block;
    margin-bottom: 50px;
    width: 100%;
}

.entry-card {
    
    border-radius: 3px;
    box-shadow: 0 2px 20px rgba(49,54,68,.2);
    color: rgb(var(--color-text-bright));
    display: inline-block;
    font-size: 1.3rem;
    height: 210px;
    position: relative;
    width: 100%;
}
 .list-section .list-entries {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill,150px);
    grid-template-rows: repeat(auto-fill,210px);
    min-width: 0;
    width: 100%;
}
.entry-card .cover {
    border-radius: 3px;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
}
 .entry-card .cover .image {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
    height: 100%;
    width: 100%;
}

.entry-card>div {
    display: inline-block;
}
.entry-card .title {
    background: rgba(var(--color-overlay),.8);
    border-radius: 0 0 3px 3px;
    bottom: 0;
    left: 0;
    padding: 12px;
    padding-bottom: 35px;
    position: absolute;
    width: 100%;
    z-index: 2;
}
a:hover {
    color: rgb(var(--color-blue));
}
.entry-card .score {
    bottom: 0;
    color: rgb(var(--color-blue));
    font-size: 1.2rem;
    left: 0;
    padding: 12px;
    position: absolute;
    text-align: left;
    width: 50%;
    z-index: 2;
}
.entry-card .score {
    text-align: right;
    right: 0;
    left: auto;
}
@media (max-width: 1540px){
    .medialist.cards .list-section .list-entries {
        grid-gap: 17px;
    }
}
@media (max-width: 1040px){
    .list-section .list-entries{
        padding: 0 20px;
        grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
        grid-gap: 25px 20px;
        justify-content: center;
    }
}
@media (max-width: 760px){

    .list-section .list-entries {
        grid-template-columns: repeat(auto-fill,minmax(105px,1fr));
        grid-gap: 25px 20px;
        justify-content: space-evenly;
    }
    .medialist.cards .entry-card {
        font-size: 1.2rem;
    }
    .entry-card .score {
        font-size: 1.1rem;
    }
}
@media (max-width: 400px){
    .list-section .list-entries {
        grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
        grid-gap: 20px 12px;
        padding: 0 10px;
    }
}
</style>

