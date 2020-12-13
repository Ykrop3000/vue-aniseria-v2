<template>
    <div class="overview">


        <div class="description-wrap">
            <h2>Описание</h2>
            <div class="description content-wrap" v-text="anime.description"></div>
        </div>

        <Trailer :src="'https://www.youtube.com/embed/VpO6APNqY1c'"/>
        
    </div>
</template>


<script>
import Trailer from './Trailer'
export default {
    props:[
        'anime'
    ],
    components:{
        Trailer
    }
}
</script>


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