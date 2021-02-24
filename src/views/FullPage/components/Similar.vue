<template>
    <div>
        <h2 v-text="title || 'Похожие'"></h2>

        <Spinner v-if="similar.length == 0" />

        <div class="wrap" >
            
            <div class="recommendation-card" v-for="i in similar" :key="i.id">
                <div class="cover"  v-lazy:background-image="SHIKIURL + i.image.preview" >

                </div>
                <router-link :to="{name: 'Anime', params:{slug: i.url.split('/')[2]}}">
                    <div class="title" v-text="i.russian"></div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '@/components/items/SpinnerItem'

export default {
    name: 'Similar',
    props:['similar','title'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    },
    components:{
        Spinner
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
.recommendation-card:hover .cover{
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.3),0 4px 4px rgba(var(--color-shadow-blue),.05);
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
