<template>
    <div class="watch">
        <div class="select">
             <h2 class="input-title">Плеер</h2>
             <el-select v-model="player" placeholder="Плеер">
                <el-option
                v-for="(val,key) in players"
                :key="key"
                :label="val.russian"
                :value="val.id">
                </el-option>
            </el-select>
        </div>
        

        <Player v-if="kodik.link && player == 'kodik'" :src="kodik.link" />
        <Player v-if="VCDN && player == 'vcdn'" :src="VCDN.iframe_src" />
        
        <div v-if="player == 'onik'" class="player">
            <div id="onik-player"></div>
        </div>
        
    </div>
</template>

<script>
import Player from '@/views/FullPage/components/Player'
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'Watch',
    data(){
        return{

        }
    },
    methods:{
        ...mapActions(['GET_VCDN']),
    },
    computed:{
        ...mapGetters(['VCDN']),
        player:{
            get(){
                return this.$route.query.player || 'kodik'
            },
            set(val){

                let prevparams = this.$route.query

                if (prevparams.player){
                    prevparams.player = val
                }else{
                    prevparams = Object.assign({player:val},prevparams)
                }
                this.$router.replace ({query: {}})
                this.$router.replace ({query: prevparams})

                return val
            }
        },
        players:{
            get(){
                let data = [
                    {
                        id: 'kodik',
                        name:'Kodik',
                        russian:'Kodik'
                    },
                ]
                if (this.VCDN){
                    data.push({
                        id: 'vcdn',
                        name:'VideoCdn',
                        russian:'VideoCdn'
                    })
                }
                return data
                
            }        
        }, 
    },
    props:[
        'anime',
        'kodik'
    ],
    components:{
        Player,
    },
    mounted(){
        if (this.kodik.length != 0) {
            this.GET_VCDN(this.kodik.kinopoisk_id)
        }
            
    },
    watch:{
        kodik(val){
            if (val.length == 0) {return}
            this.GET_VCDN(this.kodik.kinopoisk_id)

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