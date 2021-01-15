<template>
    <div class="relations" >
        <h2>Связанные</h2>

        <Spinner v-if="related.length == 0" />

        <div :class="{'grid-wrap':width<760}" >
            <div class="media-preview-card" v-for="i in related.filter(r => r.anime != null)" :class="{'small':width>=760}" :key="i.id">
                <router-link :to="{name: 'Anime', params:{slug: i.anime.url.split('/')[2]}}" class="cover" v-lazy:background-image="SHIKIURL + i.anime.image.preview">
                    <div class="image-text">
                        <div v-text="i.relation_russian"></div>
                    </div>
                </router-link>
                <div class="content">

                    <div class="info-header">
                        <div v-text="i.relation_russian"></div>
                    </div>
                    <router-link :to="{name: 'Anime', params:{slug: i.anime.url.split('/')[2]}}" class="title" v-text="i.anime.russian">
                    </router-link>
                    <div class="info">
                        {{i.anime.kind + ' · ' + i.anime.status}}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '@/components/items/SpinnerItem'

export default {
    name: 'Related',
    props:['related', 'width'],
    computed:{
        ...mapGetters(['SHIKIURL'])
    },
    components:{
        Spinner
    }
}
</script>

<style scoped>
 .grid-wrap {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 15px;
    grid-template-columns: repeat(3,1fr);
}
.media-preview-card{
    background: rgb(var(--color-foreground));
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: 85px auto;
    height: 115px;
    max-height: 115px;
}
.media-preview-card.small{
    margin-bottom: 15px;
    margin-right: 20px;
    position: relative;
    width: 85px;
}
.cover {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px 0 0 3px;
}
.content{
    background: rgb(var(--color-foreground));
    border-radius: 0 3px 3px 0;
    padding: 12px;
    position: relative;
}
.info-header{
    color: rgb(var(--color-blue));
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
}
.title{
    display: -webkit-box;
    font-size: 1.4rem;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.info {
    bottom: 12px;
    color: rgb(var(--color-text-lighter));
    font-size: 1.2rem;
    left: 12px;
    position: absolute;
}
.cover .image-overlay, .cover .image-text{
    display: none;
}
.small .cover{
    border-radius: 3px;
    text-align: center;
}
.small .cover .image-text{
    background: rgba(var(--color-overlay),.7);
    border-radius: 0 0 3px 3px;
    bottom: 0;
    color: rgba(var(--color-text-bright),.91);
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 400;
    left: 0;
    letter-spacing: .2px;
    margin-bottom: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    position: absolute;
    transition: .3s;
    width: 100%;
}
.small .cover+.content {
    height: 100%;
    left: 100%;
    position: absolute;
    top: 0;
}
.small .content {
    opacity: 0;
    transition: opacity .3s;
    width: 240px;
    z-index: -1;
}
.small .cover:hover+.content{
    display: block;
    opacity: 1;
    z-index: 9;
}
.small .cover:hover .image-text {
    opacity: 0;
}
@media (max-width: 1540px){
     .grid-wrap {
        grid-template-columns: repeat(2,1fr);
    }
}
@media (max-width: 1040px){
    .grid-wrap {
        grid-template-columns: repeat(1,1fr);
    }
}
@media (max-width: 760px){
    .relations .grid-wrap{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
        display: block;
    }
    .relations .grid-wrap .media-preview-card {
        margin-right: 25px;
        max-width: 400px;
        min-width: 250px;
        white-space: normal;
    }
}

</style>
