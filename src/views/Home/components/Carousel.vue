<template>

    <carousel
     :center="true"
     :dots="true"
     :autoplay="false"
     :loop="true"
     :margin="10"
     :items="items"
     :nav="false"
     class="carousel"
     >
        <router-link 
            v-for="(i, id) in animes"
            :key="id"
            :to="{name: 'Anime', params:{slug: i.url.split('/')[2]}}"
            class="cover image" :style="{'background-image':`url(${SHIKIURL + i.image.original}`}" :class="{'loaded': !i.load}"  @load="i.load = false">
            <div class="image-text">
                <div v-text="i.russian"></div>
            </div>
        </router-link>
    </carousel>

</template>

<script>
import {mapGetters} from 'vuex';
import carousel from 'vue-owl-carousel'

export default {
    name: 'Carousel',
    props: ['animes'],
    components:{
        carousel
    },
    computed:{
        ...mapGetters(['SHIKIURL']),
        
    },
    data(){
        return{
            width: window.innerWidth,
            items: 4
        }
    },
    beforeMount(){
        this.setItems()
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
        setItems(){
            if (this.width <= 760){
                this.items = 2
            }
            else if (this.width <= 1400){
                this.items = 3
            }
        }
    },
    watch:{
    }
    
    
}
</script>

<style>
.owl-carousel .owl-stage-outer{
    overflow: inherit !important;
}
@media (max-width: 1040px){

}
</style>

<style scoped>
.cover {
    background: rgba(var(--color-background-300),.8);
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    cursor: pointer;
    display: inline-block;
    height: 265px;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 5;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.carousel{
    margin-bottom: 60px;
    padding-top: 20px;
}
.carousel a{
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 0 0 3px 3px;  
}

.image-text{
    display: none;
}
.center .image-text div{
    text-align: center;
}
.center .image-text{
    background: rgba(var(--color-overlay),.7);
    border-radius: 0 0 3px 3px;
    bottom: 0;
    color: rgba(var(--color-text-bright),.91);
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 400;
    left: 0;
    letter-spacing: .2px;
    margin-bottom: 0;
    padding-bottom: 10px;
    padding-top: 10px;
    position: absolute;
    transition: .3s ease;
    width: 100%;
}
</style>