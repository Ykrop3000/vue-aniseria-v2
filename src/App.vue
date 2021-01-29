


<template>
  <div id="app" :class="{'transparent':TRANSPARENT}">
    <Progress :status="STATUS"/>
    <Header v-if="width>=1040" :isLoggedIn="isLoggedIn" :TRANSPARENT="TRANSPARENT"/>
    <MobileNav v-if="width<1040" :isLoggedIn="isLoggedIn"/>
    <div class="page-content">
      
      <router-view :isLoggedIn="isLoggedIn"/>
      
    </div>
  </div>
</template>

<script>
import Header from "@/components/base/Header/Header"
import MobileNav from"@/components/base/MobileNav"
import Progress from '@/components/items/ProgressItem'

import {mapGetters} from 'vuex';

export default {
    name: 'App',
    components:{
      Header,
      MobileNav,
      Progress
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

        if(this.isLoggedIn && Object.keys(this.USER).length === 0){
            this.$store.dispatch('GET_USER_BY_TOKEN')
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
        }
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

    },
    watch:{
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

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');

</style>


