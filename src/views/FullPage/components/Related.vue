<template>
    <div>
        <h2>Связанные</h2>
        <div class="wrap" >
            
            <div class="recommendation-card" v-for="i in related.filter(r => r.anime != null)" :key="i.id">
                <div class="cover" :style="{'background-image': `url(${SHIKIURL + i.anime.image.preview})`}">

                </div>
                <router-link :to="{name: 'Anime', params:{slug: i.anime.url.split('/')[2]}}">
                    <div class="title" v-text="i.anime.russian"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Related',
    props:['related'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    }
}
</script>

<style scoped>
.wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill,130px);
    grid-gap: 20px;
    justify-content: space-between;
}
.recommendation-card{
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    max-width: 100%;
    vertical-align: top;
    width: 130px;
}
.cover{
    background-size: cover;
    border-radius: 4px;
    box-shadow: 0 4px 4px rgba(var(--color-shadow-blue),.05);
    display: grid;
    grid-template-rows: 1fr auto;
    height: 180px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    transition: box-shadow .2s ease-in-out;
    width: 130px;
}
.title {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 140%;
    white-space: normal;
}
h2{
    margin-bottom: 15px;
    display: flex;
    justify-content: start;
}
a:hover {
    color: rgb(var(--color-blue));
}
a:visited:hover {
    color: rgb(var(--color-blue));
}
@media (max-width: 760px){
    .wrap {
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        grid-auto-flow: column;
    }
}
</style>
