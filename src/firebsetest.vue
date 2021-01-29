


<template>
  <div id="app">
        
      
  </div>
</template>

<script>

import firebase from "firebase";
export default {
    name: 'App',
    
    mounted(){
      this.registration()
      console.log(this.$store.getters.user)
    },
    created() {
      this.$store.dispatch("animes/fetchAndAdd", { clauses: { limit: 24 ,orderBy: ['aired_on'] } });
    },
    methods:{
      registration() {
        firebase
          .auth()
          .createUserWithEmailAndPassword('ykrop.master@gmail.com', '123123')
          .then(data => {
            data.user
              .updateProfile({
                displayName: 'test',
                photoURL: '123'
              })
              .then(() => {});
          })
          .catch(err => {
            this.error = err.message;
          });
      },

      signIn() {
        firebase
          .auth()
          .signInWithEmailAndPassword('ykrop.master@gmail.com', '123123')
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            this.error = err.message;
          });
      },

      signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            
          });
      }

    },
    computed:{
      animes() {
        return this.$store.state.animes.data
      },

    },

}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Overpass&display=swap');

</style>