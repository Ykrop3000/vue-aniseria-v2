<template>
    <div class="lists">

        <div class="actions">

        </div>
        <div class="list-wrap">
            <h3 class="section-name"></h3>


            <div class="list-entries" v-for="(anime,id) in list" :key="id">
                <div class="cover">
                    <div class="image" v-lazy:background-image="SHIKIURL + anime.image.preview"></div>
                </div>
                <div class="title">
                    <router-link :to="{name: 'Anime', params:{slug: anime.url.split('/')[2]} }" v-text="anime.russian"></router-link>
                </div>
            </div>


        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'lists',
    props: ['list'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    }
}
</script>

<style  scoped>
.lists {
    position: relative;
}
.actions {
    position: absolute;
    top: -20px;
    right: 0;
}
 .section-name {
    font-weight: 400;
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
@media (max-width: 1540px){
    .medialist.cards .list-section .list-entries {
        grid-gap: 17px;
    }
}
@media (max-width: 760px){
    .lists {
        margin-top: 30px;
    }
    .actions {
        top: -10px;
    }
    .list-section .list-entries {
        grid-gap: 0;
        grid-row-gap: 20px;
        grid-template-columns: repeat(auto-fill,120px);
        grid-template-rows: repeat(auto-fill,160px);
        justify-content: space-evenly;
    }
    .medialist.cards .entry-card {
        font-size: 1.2rem;
        height: 160px;
    }
}
</style>

