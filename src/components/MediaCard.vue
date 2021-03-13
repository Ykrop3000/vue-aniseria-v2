<template >
    <div class="media-card">

        <router-link :disabled="!slug"  :to="{name: type, params:{slug: slug}}" class="cover" :class="{'loading':loading}">
            <img ref="poster" v-lazy="poster" alt="poster" class="image" :class="{'loaded':!loading}" @load="(poster == '')?loading = true:loading = false">

            <div class="wrap list-btns-wrap"  v-show="ViewMode == '0' && isLoggedIn" >
                <div label="Open List Editor" class="btn open">
                    <i class="fa fa-plus"></i>
                </div> 
                <div class="quick-actions">
                    <div label="Add to Watching" class="btn"><i class="fas fa-play"></i></div>
                    <div label="Add to Planning" class="btn"><i class="fas fa-calendar"></i></div>
                </div>
            </div>
            
            <!-- <div class="overlay" v-show="ViewMode == '1' && !loading">
                <router-link :to="{name: type, params:{slug: slug}}" class="title"  v-text="Anime.russian"></router-link>
                <div class="studio">
                    <span v-for="(i,id) in Anime.studios" :key="id" v-text="i.name"></span>
                </div>
            </div> -->
        </router-link>

        <div class="rate" :class="rateColor" v-if="Anime.score != '0.0' && !loading" v-text="Anime.score"></div>

        <router-link :disabled="!slug"  :to="{name: type, params:{slug: slug}}" v-if="ViewMode == '0'" class="title" :class="{'loading':loading}" v-text="Anime.russian"></router-link>
        
        <div class="misc">
            <span v-text="ariedOn"></span>
            <span v-text="kind"></span>
        </div>

        <!-- <div class="hover-data right" :class="{'loading':loading}">
            <div class="header">
                <div class="date" v-text="ariedOn"></div>
                <div class="score" v-text="Anime.score"></div>
            </div>
            <div class="studios" v-text="studios"></div>
            <div class="info">
                <span v-text="Anime.kind"></span>
                <span class="separator" > • </span>
                <span v-text="Anime.episodes +  (Anime.episodes === 1) ?'серия':'серий'"></span>
            </div>
            <div class="genres">
                 <router-link
                        :key="id"
                        v-for="(j,id) in Anime.genres"
                        class="genre"
                        :to="{name:'Genre',params:{slug:j.name}}">
                            {{j.russian}} 
                </router-link>
            </div>
        </div> -->

        <!-- <div class="data" v-show="ViewMode == '1'" :class="{'loading':loading}"> 
            <div class="body" v-if="!loading">
                <div class="scroll-wrap">
                    <div class="header">
                        <div>
                            <div class="date" v-text="ariedOn"></div>
                            <div class="typings">
                                <span v-text="Anime.kind"></span>
                                <span class="separator" > • </span>
                                <span v-text="Anime.episodes + ' серий'"></span>
                            </div>
                        </div>
                        <div>
                            <div class="score">
                                <i class="far fa-smile icon"></i>
                                <div class="percentage" v-text="Anime.score"></div>
                            </div>
                        </div>
                    </div>
                    <div class="description"  v-text="Anime.description || '(~_~;)'"></div>
                </div>
            </div>

            <div class="footer" v-if="!loading">
                <div class="genres">
                    <router-link
                        :key="id"
                        v-for="(j,id) in Anime.genres"
                        class="genre"
                        :to="{name:'Genre',params:{slug:j.name}}">
                            {{j.russian}} 
                    </router-link>
                </div>
                <div class="wrap list-btns-wrap">
                    <div class="btn open">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>

            <div v-show="loading && ViewMode=='1'"></div>
            <div v-show="loading && ViewMode=='1'"></div>
            <div v-show="loading && ViewMode=='1'"></div>

        </div> -->


    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import FastAverageColor from 'fast-average-color'
export default {
    components:{
        
    },
    props:[
        'Anime',
        'type',
        'ViewMode',
        'isLoggedIn'
    ],
    data(){
        return{
            loading: true,
        }
    },
    methods:{
        getColor(){
            let fac = new FastAverageColor()

            fac.getColorAsync(this.$refs.poster, { algorithm: 'dominant' })
            .then(color => {
                console.log('Average color', color);
            })
            .catch(e => {
                console.log(e);
            });
            fac.destroy();

        } 
    },
    mounted(){
        
    },
    computed:{
        ...mapGetters(['SHIKIURL']),
        kind:{
            get(){
                if(this.Anime.kind){
                    return this.$store.state.kind[this.Anime.kind]
                }else{
                    return ''
                }
            }
        },
        poster:{
            get(){
                if(this.Anime.image){
                    return this.SHIKIURL + this.Anime.image.original
                }else{
                    return ''
                }
            }
        },
        ariedOn:{
            get(){
                if (this.Anime.aired_on){
                    return this.Anime.aired_on.split('-')[0]
                }else{
                    return ''
                }
            }
        },
        studios:{
            get(){
                if(this.Anime.studios){
                    return this.Anime.studios.map(e => e.name).join(', ')
                }else{
                    return ''
                }
            }
        },
        slug:{
            get(){
                if (this.Anime.url){
                    return this.Anime.url.split('/')[2]
                }else{
                    return ''
                }
            }
        },
        rateColor:{
            get(){
                if (this.Anime.score){
                    let score = parseFloat(this.Anime.score)
                    if (score >= 7.0) return 'green'
                    if (score < 7.0 &&  score >= 5.0) return 'yellow'
                    return 'red'
                    
                }else{
                    return ''
                }
            }
        }

    },
    watch:{
        loading(v){
            if(!v){
                this.getColor();
            }
        }
    }
}
</script>

<style scoped>
.cover.loading, .data.loading div, .title.loading{
    background: rgba(var(--color-background-300),.8);
    box-shadow: none;
    opacity: 1;
    overflow: hidden;
}
.title.loading{
    border-radius: 4px;
    height: 17px;
    margin-top: 12px;
    width: 80%;
}
.cover.loading:before, .title.loading:before , .data.loading div:before {
    animation: loading-pulse 2s linear infinite;
    background: linear-gradient(90deg,rgba(var(--color-gray-300),0) 0,rgba(var(--color-blue-700),.06) 40%,rgba(var(--color-blue-700),.06) 60%,rgba(var(--color-gray-300),0));
    content: "";
    display: block;
    height: 100%;
    transform: translateX(0);
    width: 200%;
}
.rate{
    text-align: center;
    z-index: 99;
    position: absolute;
    top: 5px;
    left: -5px;
    font-size: 1.3rem;
    border-radius: 2px;
    font-weight: 700;
    padding: 1px 3px;
    color: white;
    background-color: rgba(var(--color-shadow),.9);
  
}
.rate.green{
    background-color: rgba(var(--color-green),.8);
}
.rate.yellow{
    background-color: rgba(var(--color-yellow),.8);
}
.rate.red{
    background-color: rgba(var(--color-red),.8);
}
@keyframes loading-pulse {
    0% {
        transform: translateX(-100%)
    }
    to {
        transform: translateX(50%)
    }
}
.cover .media-card {
    transition: 0.3s linear;
    display: grid;
    grid-template-rows: -webkit-min-content auto;
    grid-template-rows: min-content auto;
    position: relative;
    width: 185px;
}
.cover {
    background: rgba(var(--color-background-300),.8);
    border-radius: 4px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    cursor: pointer;
    display: inline-block;
    height: 265px;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 5;
}
.cover .title{
    color: rgb(var(--color-gray-700));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 21px;
    margin-top: 10px;
    overflow: hidden;
    transition: color .2s ease;
    /* display: -webkit-box; */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.media-card:hover .title{
    color: var(--media-text);
}
.wrap{
    position: relative;
}
.cover .list-btns-wrap{
    position: absolute;
    right: 14px;
    bottom: 14px;
}
.media-card:hover .btn.open {
    box-shadow: 0 0 6px 2px rgba(0,0,0,.15);
    transform: scale(1);
    opacity: 1;
}
.btn{
    align-items: center;
    background: rgba(var(--color-overlay),.9);
    border-radius: 50%;
    box-shadow: 0 0 5px 2px rgba(45,45,45,.35);
    color: rgb(var(--color-white));
    cursor: pointer;
    display: grid;
    height: 28px;
    justify-content: center;
    opacity: 0;
    text-align: center;
    transform: scale(.2);
    transition: transform .2s ease-in-out,opacity .2s ease-in-out,background .2s ease-in-out;
    width: 28px;
}
.btn .icon{
    transition: opacity .2s ease-in-out;
    opacity: .9;
    font-size: 2rem;
    transform: scale(.7);
}
.list-btns-wrap .btn.open:not([status]) {
    background: rgb(var(--color-gray-300));
    color: rgb(var(--color-gray-700));
}
.list-btns-wrap .btn.open {
    box-shadow: none;
    color: rgb(var(--color-background-200));
    opacity: 1;
    transform: none;
    transform: scale(.9);
}
.quick-actions{
    pointer-events: none;
    position: absolute;
    right: 0;
    bottom: 28px;
    margin-bottom: -10px;
    transition: margin-bottom .2s ease-in-out;
}
.quick-actions .btn{
    margin-bottom: 7px;
}
.quick-actions .btn:before {
    background: rgba(var(--color-overlay),.9);
    border-radius: 4px;
    box-shadow: 0 7px 15px rgba(var(--color-shadow-blue),.2),0 2px 2px rgba(var(--color-shadow-blue),.1);
    color: rgb(var(--color-white));
    content: attr(label);
    display: block;
    font-size: 1rem;
    font-weight: 700;
    opacity: 0;
    padding: 6px 10px;
    pointer-events: none;
    position: absolute;
    right: 33px;
    top: 2px;
    transition: opacity .2s ease;
    width: 105px;
}
.btn:hover {
    transform: scale(1.1)!important;
    color: #fff;
}
.btn.open:hover+.quick-actions, .quick-actions:hover {
    pointer-events: auto;
    margin-bottom: 0;
}
.btn.open:hover+.quick-actions .btn, .quick-actions:hover .btn{
    box-shadow: 0 0 6px 2px rgba(0,0,0,.15);
    opacity: 1;
    transform: scale(1);
}
.score .icon{
    color: #7bd555;
    margin-right: 8px;
}
.cover .list-btns-wrap{
    display: none;
}
.misc span:first-child{
    float: right;
}
.misc{
    color: rgb(var(--color-gray-600));
}
@media (max-width: 1040px){
    .media-card {
        width: 100% !important;;
    }
    .cover:before {
        content: "";
        display: block;
        height: 0;
        width: 0;
        padding-bottom: 142.85714%;
    }
    .cover{
        height: auto;
        border-radius: 5px;
    }
}
@media (max-width: 760px){
    .cover .title{
        font-size: 1.2rem;
        line-height: 17px;
    }
}
</style>