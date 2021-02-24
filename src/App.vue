


<template>
  <div id="app" :class="{'transparent':TRANSPARENT}">
    <Header v-if="width>=1040" :isLoggedIn="isLoggedIn" :TRANSPARENT="TRANSPARENT"/>
    <MobileNav v-if="width<1040" :isLoggedIn="isLoggedIn" :dark="dark"/>
    <div class="page-content">
      
      <router-view :isLoggedIn="isLoggedIn" :user="USER"/>
      
    </div>
  </div>
</template>

<script>
const Header = () => import('@/components/base/Header/Header.vue')
const MobileNav = () => import('@/components/base/MobileNav.vue')

import {mapGetters} from 'vuex';

export default {
    name: 'App',
    components:{
      Header,
      MobileNav,
      
    },
    metaInfo: {
      title: 'AniSeria',
    },
    data(){
        return{
            width: window.innerWidth,
        }
    },
    mounted(){
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );

        if(this.isLoggedIn && !this.USER){
            this.$store.dispatch('GET_USER_BY_TOKEN')
        }
        if(this.dark){
          this.toggleBodyClass('addClass', 'site-theme-dark');
        }else{
          this.toggleBodyClass('removeClass', 'site-theme-dark');
        }

    },
    methods:{
        handleWidthChange() {
            this.width =  window.innerWidth;
        },
        error(e){
          this.$message.error(e);
        },
        sucsess(e){
          this.$message({
            message: e,
            type: 'success'
          })
        },
        toggleBodyClass(addRemoveClass, className) {
          const el = document.body;

          if (addRemoveClass === 'addClass') {
            el.classList.add(className);
          } else {
            el.classList.remove(className);
          }
        },
    },
    computed:{
      ...mapGetters([
        'isLoggedIn',
        'STATUS',
        'USER',
        'ERRORS',
        'SUCSESS',
        'MESSAGE',
        'REG_ERROR',
        'LOGIN_ERROR',
        'TRANSPARENT'
      ]),
      dark:{
        get(){
          if (this.$store.state.theme == 'dark'){
            return true
          }else{
            return false
          }
        }
      }
    },
    watch:{
      dark(v){
        if(v){
          this.toggleBodyClass('addClass', 'site-theme-dark');
        }else{
          this.toggleBodyClass('removeClass', 'site-theme-dark');
        }
      },
      ERRORS(){
        if (this.ERRORS.length === 0) return
        this.ERRORS.forEach((item,i) => {
          
          this.error(`${item}`)
          this.$store.dispatch('DEL_ERROR',i)
        });
      },
      SUCSESS(){
        if (this.SUCSESS.length === 0) return
        this.SUCSESS.forEach((item,i) => {
          
          this.sucsess(`${item}`)
          this.$store.dispatch('DEL_SUCSESS',i)
        });
      },
      MESSAGE(){
        if (this.MESSAGE === null) return
         this.sucsess(`${this.MESSAGE}`)
         this.$store.dispatch('DEL_MESSAGE')
      },
      '$route.name'(){
        this.$store.dispatch('SET_TRANSPARENT',false)
      }

    }
}
</script>

<style>
:root{
  --color-background: 237,241,245;
  --color-foreground: 250,250,250;
  --color-foreground-grey: 245,246,246;
  --color-foreground-grey-dark: 234,236,237;
  --color-foreground-blue: 246,248,251;
  --color-foreground-blue-dark: 241,243,247;
  --color-background-blue-dark: 31,35,45;
  --color-overlay: 31,38,49;
  --color-shadow: 49,54,68;
  --color-shadow-dark: 6,13,34;
  --color-shadow-blue: 103,132,187;
  --color-text: 92,114,138;
  --color-text-light: 122,133,143;
  --color-text-lighter: 146,153,161;
  --color-text-bright: 237,241,245;
  --color-blue: 61,180,242;
  --color-blue-dim: 141,178,219;
  --color-white: 255,255,255;
  --color-black: 0,0,0;
  --color-red: 232,93,117;
  --color-peach: 250,122,122;
  --color-orange: 247,154,99;
  --color-yellow: 247,191,99;
  --color-green: 123,213,85;
  --color-background-100: 251,251,251;
  --color-background-200: 237,241,245;
  --color-background-300: 221,230,238;
  --color-background-400: 201,215,227;
  --color-background-500: 173,192,210;
  --color-background-600: 139,160,178;
  --color-background-700: 116,136,153;
  --color-background-800: 100,115,128;
  --color-background-900: 81,97,112;
  --color-background-1000: 64,78,92;
  --color-background-1100: 38,52,63;
  --color-background-1200: 27,30,31;
  --color-gray-100: 251,251,251;
  --color-gray-200: 237,241,245;
  --color-gray-300: 221,230,238;
  --color-gray-400: 201,215,227;
  --color-gray-500: 173,192,210;
  --color-gray-600: 139,160,178;
  --color-gray-700: 116,136,153;
  --color-gray-800: 100,115,128;
  --color-gray-900: 81,97,112;
  --color-gray-1000: 64,78,92;
  --color-gray-1100: 38,52,63;
  --color-gray-1200: 27,30,31;
  --color-blue-100: 247,250,252;
  --color-blue-200: 236,246,254;
  --color-blue-300: 201,232,255;
  --color-blue-400: 143,215,255;
  --color-blue-500: 111,200,255;
  --color-blue-600: 61,180,242;
  --color-blue-700: 8,143,214;
  --color-blue-800: 12,101,166;
  --color-blue-900: 11,70,113;
  --color-blue-1000: 16,61,85;
  --color-green-100: 245,249,243;
  --color-green-200: 226,246,217;
  --color-green-300: 160,241,126;
  --color-green-400: 119,220,76;
  --color-green-500: 83,175,45;
  --color-green-600: 56,126,26;
  --color-green-700: 46,90,27;
  --color-green-800: 41,66,31;
  --color-red-100: 255,244,246;
  --color-red-200: 254,212,220;
  --color-red-300: 255,140,160;
  --color-red-400: 236,41,75;
  --color-red-500: 213,0,37;
  --color-red-600: 165,1,29;
  --color-red-700: 117,0,20;
  --media-text: hsl(215,81%,56%);
  --media-background: hsl(215,81%,56%);
  --media-background-text: hsl(202,73%,97%);
  --media-overlay-text: hsl(202,80%,70%);

}

.site-theme-dark {
  --color-background: 11,22,34;
  --color-foreground: 21,31,46;
  --color-foreground-grey: 15,22,31;
  --color-foreground-grey-dark: 6,12,19;
  --color-foreground-blue: 15,22,31;
  --color-foreground-blue-dark: 6,12,19;
  --color-text: 159,173,189;
  --color-text-light: 114,138,161;
  --color-text-lighter: 133,150,165;
  --color-shadow-blue: 0,5,15;
  --color-background-1200: 251,251,251;
  --color-background-1100: 240,243,246;
  --color-background-1000: 221,230,238;
  --color-background-900: 201,215,227;
  --color-background-800: 173,192,210;
  --color-background-700: 139,160,178;
  --color-background-600: 116,136,153;
  --color-background-500: 100,115,128;
  --color-background-400: 81,97,112;
  --color-background-300: 30,42,56;
  --color-background-100: 21,31,46;
  --color-background-200: 11,22,34;
  --color-gray-1200: 251,251,251;
  --color-gray-1100: 240,243,246;
  --color-gray-1000: 221,230,238;
  --color-gray-900: 201,215,227;
  --color-gray-800: 173,192,210;
  --color-gray-700: 139,160,178;
  --color-gray-600: 116,136,153;
  --color-gray-500: 100,115,128;
  --color-gray-400: 81,97,112;
  --color-gray-300: 30,42,56;
  --color-gray-100: 21,31,46;
  --color-gray-200: 11,22,34;
}

#app{
  background: rgb(var(--color-background));
}
html,body {
  color: rgb(var(--color-text));
  font-family: Roboto,-apple-system,BlinkMacSystemFont,Segoe UI,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
  font-size: 10px;
  height: 100%;
  margin: 0;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

</style>