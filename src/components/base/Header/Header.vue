<template>
    <div id="nav" class="nav" style="transition: background 0.8s ease 0s, top 0.5s ease 0s;">
        <div class="wrap">
            <router-link :to="{name:'home'}" ></router-link>
            <Links :isLoggedIn="isLoggedIn"/>
            <Search v-if="isLoggedIn"/>
            <User  v-if="isLoggedIn"/>
        </div>
    </div>
</template>

<script>


import Links from './Links'
import User from './User'
import Search from './Search'


export default {
    components:{
        Links,
        User,
        Search
    },
    props:[
        'isLoggedIn'
    ]

}
</script>


<style scoped>

.wrap {
    align-items: center;
    display: flex;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    max-width: 1050px;
    width: 100%;
}
.nav{
    background: #2b2d42;
    color: #bcbedc;
    display: flex;
    height: 75px;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    transition: background .8s ease,color .2s;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    z-index: 999;
}
@media (max-height: 920px){
    .nav{
        height: 68px;
    }
}
.hide {
    top: -97px;
}
</style>