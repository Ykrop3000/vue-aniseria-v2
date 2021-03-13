<template>

    <VueSlickCarousel
  
      class="carousel"
      :arrows="true"
      :dots="false"
      :lazyLoad="'ondemand'"
      :slidesToShow="1"
      :slidesToScroll="1"
      :infinite="true"
      :speed="500"
      :autoplay="true"
      :autoplaySpeed="15000"
       @init="getBanner"
      @lazyLoadError="getBanner"
      @lazyLoad="getBanner"
      >

        <router-link
            class="slide container"
            v-for="(i,id) in animes.filter(e => !e.dis)"
            :key="id"
            :to="{name: 'Anime', params:{slug: getUrl(i)}}"
        >

            <div  class="img" :style="{'background-image': `url(${i.image.preview })`}" alt="slide"></div>
            <div class="details">
                <h1 class="title" v-text="i.russian"></h1>
            </div>

        </router-link>
        
    </VueSlickCarousel>

</template>

<script>
import {mapGetters} from 'vuex';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 
import gql from 'graphql-tag';
import graphqlClient from '@/utils/graphql';

export default {
    name: 'Carousel',
    props: ['animes'],
    components:{
        VueSlickCarousel
    },
    data(){
        return{
            width: window.innerWidth,
         }
    },
    mounted(){
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );
    },
    computed:{
         ...mapGetters(['SHIKIURL']),
    },
    methods:{
        handleWidthChange() {
            this.width =  window.innerWidth;
        },
        getUrl(i){
            return i.url.split('/')[2]
        },
        getBanner(i){
            if (this.animes.length == 0) return
            graphqlClient.query({ 
            query: gql`
                query ($search: String) {
                    Media(search: $search, type: ANIME) {
                        id
                        bannerImage
                    }
                }
            `,
            variables: { search: this.animes[i].name },
            }).then(resp => {
                this.animes[i].image.preview = resp.data.Media.bannerImage
                this.$store.state.carousel = this.animes
            }).catch(err => {
                console.log(err)
                
            })
        },

        
    },

    
    
}
</script>

<style>
.slick-slider{
    margin-bottom: 60px;
}
button.slick-arrow.slick-prev{
    position: absolute;
    z-index: 1000;

    left: 0;
    width: 5vw;
    bottom: 0;
    cursor: pointer;
    opacity: 1;
    transition: all .15s ease-out;
}
button.slick-arrow.slick-next{
    position: absolute;
    z-index: 1000;
    right: 0;
    width: 5vw;
    bottom: 0;
    cursor: pointer;
    opacity: 1;
    transition: all .15s ease-out;
}
.slick-prev:before{
    content: "\276E" ;
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 30px !important;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transform-origin: inherit;
    z-index: 1;
    transition: all .15s ease-out;
}
.slick-next:before{
    content: "\276F" ;
    position: absolute;
    top: 50%;
    color: #fff;
    font-size: 30px !important;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    transform-origin: inherit;
    z-index: 1;
    transition: all .15s ease-out;
}
</style>

<style scoped>
.carousel .slide{
    position: relative;
    height: calc((4 / 19) * 100vw);
    min-height: 25vh;
}
 .carousel .img{
    background-color:rgb(var(--color-background-100));
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .15s ease-out;
 }
 .details {
    transition: all .15s ease-out;
    background-color: transparent;
    align-self: flex-end;
    z-index: 2;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
}
.title{
    font-size: 18px;
    line-height: 18px;
    text-shadow: 3px 3px 4px rgb(0 0 0 / 30%);
    margin-bottom: 0;
    color: #fff;
    max-width: 90%;
}
@media only screen and (min-width: 768px){
    .details {
        width: auto;
        max-width: 50%;
        text-align: left;
        vertical-align: bottom;
    }
   .title {
        font-size: 35px;
        line-height: 35px;
        margin-bottom: 10px;
        max-width: 100%;
    }
}
@media only screen and (min-width: 1200px){

    .title {
        font-size: 60px;
        line-height: 50px;
        margin-bottom: 10px;
        max-width: 100%;
    }
}
</style>