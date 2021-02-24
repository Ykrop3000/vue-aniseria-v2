<template>
    <div class="links" :class="{'LoggedIn':isLoggedIn}">
        <router-link  v-for="i in NAV" :key="i.text" :to="{name:i.to}"  class="link" v-text="i.text" :class="i.class"></router-link>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters(['NAV'])
    },
    props:[
        'isLoggedIn'
    ]
}
</script>
<style scoped>
.links{
    align-items: center;
    display: inline-flex;
    font-size: 1.4rem;
    font-weight: 600;
    justify-content: center;
    text-transform: capitalize;
    width: 100%;
    height: 100%;
}
.LoggedIn .login, .LoggedIn .signup{
    display: none;
}
.link{
    letter-spacing: .01em;
    padding: 18px 16px;
}
.link:hover {
    color: #d3d5f3;
}
.login {
    margin-left: 70px;
    padding-right: 24px;
}
.signup{
    background: #3577ff;
    border-radius: 6px;
    box-shadow: 0 0 0 rgba(8,150,230,.6);
    color: rgb(var(--color-white));
    font-size: 1.4rem;
    font-weight: 800;
    margin-right: -70px;
    padding: 10px 15px;
    transition: box-shadow .6s ease,transform .2s ease-in-out;
}
</style>