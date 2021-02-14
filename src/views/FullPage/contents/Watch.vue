<template>
    <div class="watch">
        <SelectItem :title="'Плеер'" :type="'player'" :options="players"/>                    
        <Player v-if="kodik.link && player == 'kodik'" :src="kodik.link" />
        <div v-if="player == 'onik'" class="player">
            <div id="onik-player"></div>
        </div>
        
    </div>
</template>

<script>
import Player from '@/views/FullPage/components/Player'
import SelectItem from '@/components/items/SelectItem'
export default {
    name:'Watch',
    data(){
        return{
            players:[
                {
                    id: 'kodik',
                    name:'Kodik',
                    russian:'Kodik'
                },
                {
                    id: 'onik',
                    name:'Onik',
                    russian:'Onik'
                },
            ]
        }
    },
    computed:{
        player:{
            get(){
                return this.$route.query.player || 'kodik'
            }
        } 
    },
    props:[
        'anime',
        'kodik'
    ],
    components:{
        Player,
        SelectItem
    },
    watch:{
        kodik(val){
            if (val.length == 0) {return}
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src',
            `https://apikino.club/autoreplace/?id=836&width=100%&height=400&title=${this.kodik.title_orig}&year=${this.kodik.year}&kinopoiskId=${this.kodik.kinopoisk_id}`)
            document.head.appendChild(recaptchaScript)
        },
    }
}
</script>
<style scoped>
iframe {
    border-radius: 4px;
    height: 230px;
    overflow: hidden;
    width: 100%;
}
.player{
    position: relative;
}
.player>iframe{
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
}
.watch>div{
   margin-bottom: 30px;
}
</style>