import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'


Vue.use(Vuex)

// import from step 1
import { Firebase, initFirebase } from '@/config/firebase.js'
// import from step 3 (below)
import animes from './modules/animes.js'


// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [animes],
  {logging: true, FirebaseDependency: Firebase}
)

// include as PLUGIN in your vuex store
// please note that "myModule" should ONLY be passed via the plugin
const storeData = {
  plugins: [easyFirestore],

  state: {
    idToken: null,
    userId: null,
    user: null
  },

  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      state.user = null
    }
  },

  actions: {
    
    
  }

}

// initialise Vuex
const store = new Vuex.Store(storeData)

// initFirebase
initFirebase()
  .catch(error => {
    console.error(error)
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })

export default store