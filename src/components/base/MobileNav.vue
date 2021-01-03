<template>
    <div class="mobile-nav"  :class="{'guest':!isLoggedIn}">
        <div class="hamburger" @click="visible = true" :class="{'dpn':visible}">
            <i class="fa-bars fas"></i>
        </div>
        <div class="menu" :class="{'visible':visible}">

            <router-link v-for="i in NAV" :key="i.text" :to="{name:i.to}" class="link">
                <i :class="i.svg"></i>
                <span class="label" v-text="i.text" @click="visible = false"></span>
            </router-link>

            <router-link v-if="isLoggedIn" class="link" :to="{name: 'User', params:{username: USER.username}}">
                <i class="fa-user fas"></i>
                <span class="label">Профиль</span>
            </router-link>

            <router-link v-if="isLoggedIn" class="secondary-link" :to="{name: 'Logout'}">
                <i class="fa-sign-out-alt fas"></i>
               <span class="label">Выйти</span>
            </router-link>


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
        'isLoggedIn'
    ],
    computed:{
        ...mapGetters(['NAV']),
        ...mapGetters(['USER'])
    }
}
</script>

<style scoped>
.label{
    text-transform: lowercase;
}
.mobile-nav {
    -webkit-tap-highlight-color: transparent;
    bottom: 25px;
    cursor: pointer;
    font-family: Overpass,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    position: fixed;
    right: 20px;
    transition: .2s;
    z-index: 999;
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
.menu svg{
    max-height: 2.1rem;
    width: 2.4rem;
    height: auto;
}
.menu .close svg{
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
.hamburger svg {
    color: rgb(var(--color-blue));
    width: 50%;
    height: auto;
}
.label {
    color: rgb(var(--color-gray-600));
    display: block;
    font-size: 1rem;
    padding-top: 8px;
}
.guest .menu.visible{
    height: 150px;
}
.guest .menu{
    height: 0;
    grid-template-rows: repeat(2,1fr);
}
</style>