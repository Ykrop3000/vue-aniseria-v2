<template>
    <div class="user user-page-unscoped red">
        <div class="header-wrap">
            <div class="banner">
                <div class="shadow"></div>
                <div class="container">
                    <div class="banner-content">
                        <img :src="avatar" alt="avatar" class="avatar">
                        <h1 class="name" v-text="SOMEUSER.nickname"></h1>
                    </div>
                </div>
            </div>
            <div class="nav-wrap">
                <div class="nav container">
                    <router-link :to="{name:'User', params:{username:SOMEUSER.nickname}}" class="link">Обзор</router-link>
                    <router-link :to="{name:'Favorite', params:{username:SOMEUSER.nickname}}" class="link">Избранное</router-link>
                </div>
            </div>
        </div>

        <div v-if="SOMEUSER.nickname" class="content container">
            <router-view :user="SOMEUSER"></router-view>
        </div>

    </div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters([
            'USER',
            'APIURL',
            'LISTS',
            'SOMEUSER',
            'ANIMES'
            ]),
        avatar:{
            get(){
                if(this.SOMEUSER.image){
                    return this.SOMEUSER.image.x160
                }else{
                    return ''
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch('SET_TRANSPARENT',true)
        //this.$store.dispatch('GET_LISTS')
        this.$store.dispatch('GET_SOME_USER', this.$route.params.username)
    },
    watch:{
        '$route.params.username'(){
            if(this.$route.params.username){
                this.$store.dispatch('GET_SOME_USER', this.$route.params.username)
            }
        }
    }
}
</script>


<style scoped>
.header-wrap{
    font-weight: 600;
}
.banner {
    background-color: #242538;
    background-position: 50% 35%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 330px;
    position: relative;
}
.banner .shadow{
    background: linear-gradient(180deg,rgba(var(--color-shadow-dark),0) 40%,rgba(var(--color-shadow-dark),.6));
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}
.banner .container{
    align-items: flex-end;
    display: flex;
    height: 100%;
    position: relative;
}
.banner-content {
    align-items: flex-end;
    display: flex;
    width: 100%;
}
.avatar{
    border-radius: 4px 4px 0 0;
    display: inline-block;
    max-height: 230px;
    max-width: 160px;
    width: 100%;
}
.name{
    color: rgb(var(--color-text-bright));
    display: inline-block;
    font-weight: 800;
    padding: 22px 25px;
}
.nav-wrap{
    background: rgb(var(--color-foreground));
    width: 100%;
}
.nav{
    font-size: 1.4rem;
    max-width: 1220px;
    text-align: center;
}
.nav .link{
    color: rgb(var(--color-text-light));
    display: inline-block;
    margin: 0 10px;
    padding: 15px;
}
.nav .router-link-exact-active {
    color: rgb(var(--color-blue));
}
@media (max-width: 1040px){
    .content.container {
        padding: 20px !important;
    }
}
@media (max-width: 760px){
    .banner{
        height: 220px;
        margin-top: 0;
    }
    .avatar{
        max-height: 160px;
        max-width: 120px;
    }
    .name{
        font-size: 1.7rem;
        padding: 16px 13px;
    }
    .nav{
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        white-space: nowrap;
    }
}

</style>