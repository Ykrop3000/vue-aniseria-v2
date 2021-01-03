import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/List' 
import FullPage from '../views/FullPage/FullPage' 
import Overview from '../views/FullPage/Overview'
import Watch from '../views/FullPage/Watch'
import Auth from '../views/Auth/Auth'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:
  [
    {
      path: '/animes',
      name: 'Animes',
      component: List
    },


    {
      path: '/anime/:slug/',

      component: FullPage,
      meta: { reuse: false },
      children: [{
        name: 'Watch',
        path: 'watch',
        component: Watch
      },
      {
        name: 'Anime',
        path: '',
        component: Overview
      },]
    },

    
    {
      path: '/genre/:slug',
      name: 'Genre',
      component: List
    },

    {
      path: '/login',
      name: 'Login',
      component: Auth
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Auth
    },
    {
      path: '/logout',
      name: 'Logout',
      component: function () {
        return import('../views/Auth/Logout.vue')
      }
    },
    {
      path: '/user/:username',
      name: 'User',
      component: function () {
        return import('../views/Profile.vue')
      }
    }

  ]
})

/*
component: function () {
  return import('../views/About.vue')
}
*/
