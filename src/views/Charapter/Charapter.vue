<template>
<div class="">
    <div class="character-wrap">
        <div class="character">
            <div class="header">
                <div class="container">
                    <img :src="image" alt="" class="image">
                    <div class="mobile-background"></div>
                    <div class="names">
                        <h1 class="name" v-text="CHARAPTER.russian"></h1>
                        <div class="name-alt" v-text="CHARAPTER.altname"></div>
                    </div>
                    <div class="actions"></div>
                </div>
            </div>
            <div class="body container">
                <div ></div>
                <div class="description-wrap">
                    <div class="markdown description" :class="{'expandable':expandable}" v-text="CHARAPTER.description"></div>
                    <div class="description-length-toggle" @click="expandable = !expandable">Читать Больше </div>
                </div>
            </div>
        </div>
       
    </div>
    <div class="container">
     <Similar v-if="CHARAPTER.animes" :title="' '" :similar="CHARAPTER.animes" />
    </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
import Similar from '@/views/FullPage/components/Similar'

export default {
    name: 'Charapter',
    data(){
        return {
            id: this.$route.params.id,
            expandable: true
        }
    },
    components:{
        Similar
    },
    mounted(){
        this.$store.dispatch('GET_CHARAPTER', this.id)
    },
    computed: {
        ...mapGetters(['SHIKIURL','CHARAPTER']),
        image:{
            get(){
                if (this.CHARAPTER.image){
                    return this.SHIKIURL + this.CHARAPTER.image.original
                }else{
                    return ''
                }
            }
        }
    }
}
</script>

<style scoped>
.character-wrap{
    position: relative;
    margin-bottom: 50px;
}
.character {
    min-height: 408px;
}
.actions{
    align-items: baseline;
    display: flex;
    margin-left: auto;
    margin-top: 10px;
}
.header {
    background: rgb(var(--color-gray-100));
    padding-bottom: 30px;
    padding-top: 50px;
}

.character .container{
    display: grid;
    grid-template-columns: 220px auto auto;
    gap: 58px;
    overflow: visible;
    max-width: 1300px;
}
.body.container{
    grid-template-columns: 220px auto;
}
.image{
    border-radius: 5px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
    position: absolute;
    opacity: 1;
    width: auto;
    left: auto;
    top: auto;
    height: auto;
}
.name {
    color: rgb(var(--color-gray-800));
    font-weight: 800;
    font-size: 2.8rem;
    letter-spacing: .03em;
    margin-top: 10px;
}
.description-wrap {
    position: relative;
}
.description.expandable {
    max-height: 300px;
}
.description{
    font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-size: 1.4rem;
    line-height: 2.1rem;
    margin-top: 12px;
    overflow: hidden;
}
.name-alt {
    color: rgb(var(--color-gray-600));
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 8px;
}
.description-length-toggle {

    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 500;
    
    opacity: 0;
    padding-bottom: 5px;
    padding-top: 20px;
    text-align: center;
    transition: .2s;
}
.description-length-toggle:hover {
    opacity: 1;
}
@media (max-width: 700px){
    .description{
        min-height: 0;
    }
    .header {
        background: rgba(var(--color-gray-100),0);
        padding-top: 25px;
        padding-bottom: 10px;
    }
    .character .container {
        align-items: center;
        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
        grid-template-columns: auto;
        justify-items: center;
        text-align: center;
    }
    .body.container {
        align-items: left;
        gap: 0;
        grid-template-columns: auto;
        text-align: left;
    }
    .image, .names {
        position: static;
        z-index: 2;
    }
    .image {
    width: 210px;
    }
    .mobile-background{
        background: rgb(var(--color-gray-100));
        position: absolute;
        width: 100%;
        height: 200px;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .names{
        width: 100%;
    }
    .description-wrap {
        width: 100%;
    }
    .description-length-toggle{
        opacity: 1;
    }
}

</style>