<template>
    <div class="mobile-nav"  :class="{'guest':!isLoggedIn}">
        <div class="hamburger" @click="visible = true" :class="{'dpn':visible}">
            <i class="fa-bars fas"></i>
        </div>
        <div class="menu" :class="{'visible':visible,'login':isLoggedIn}">

            <router-link v-for="i in NAV" :key="i.text" :to="{name:i.to}" :class="i.auth"  class="link">
                <i :class="i.svg"></i>
                <span class="label" v-text="i.text" @click="visible = false"></span>
            </router-link>

            <router-link v-if="isLoggedIn" class="link" :to="{name: 'User', params:{username: USER.nickname}}">
                <i class="fa-user fas"></i>
                <span class="label">Профиль</span>
            </router-link>

            <router-link v-if="isLoggedIn" class="secondary-link" :to="{name: 'Logout'}">
                <i class="fa-sign-out-alt fas"></i>
               <span class="label">Выйти</span>
            </router-link>

            <div class="secondary-link" @click="change_theme">
                <i class="fas fa-moon" v-if="!dark"></i>
                <i class="fas fa-sun" v-else></i>
               <span class="label">Тема</span>
            </div>

            <div class="close" @click="visible = false">
                <i class="fa-times fas" ></i>
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            visible: false
        }
    },
    props:[
        'isLoggedIn',
        'dark'
    ],
    computed:{
        ...mapGetters(['NAV']),
        ...mapGetters(['USER'])
    },
    methods:{
        change_theme(){
            this.$store.dispatch('CHANGE_THEME')
        }
    }
}
</script>

<style scoped>
.label{
    text-transform: lowercase;
}
.login .nli{
    display: none;
}
.mobile-nav {
    -webkit-tap-highlight-color: transparent;
    bottom: 25px;
    cursor: pointer;
    position: fixed;
    right: 20px;
    transition: .2s;
    z-index: 99999;
    font-weight: 700;
}
.hamburger {
    align-items: center;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
    position: relative;
}
.hamburger.dpn{
    display: none !important;
}
.menu{
    align-items: center;
    color: rgb(var(--color-gray-600));
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    height: 0;
    justify-items: center;
    opacity: 0;
    padding: 0;
    pointer-events: none;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 0;
}
.menu i{
    max-height: 2.1rem;
    font-size: 2rem;
    height: auto;
}
.menu .close i{
    height: auto;
    width: 1.466rem; 
}
.menu.visible{
    transition: .2s ease;
    pointer-events: auto;
    opacity: 1;
    height: 210px;
    width: 210px;
    padding: 8px;
}
.hamburger, .menu{
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 1px 20px rgba(43,50,88,.3);
}
.hamburger i {
    color: rgb(var(--color-blue));
    width: 50%;
    height: auto;
    font-size: 3rem;
}
.label {
    color: rgb(var(--color-gray-600));
    display: block;
    font-size: 1rem;
    padding-top: 8px;
    padding-left: 0;
}
.guest .menu.visible{
    height: 150px;
}
.guest .menu{
    height: 0;
    grid-template-rows: repeat(2,1fr);
}
</style>