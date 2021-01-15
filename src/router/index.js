import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/List/List' 
import FullPage from '../views/FullPage/FullPage' 
import Overview from '../views/FullPage/contents/Overview'
import Watch from '../views/FullPage/contents/Watch'
import Auth from '../views/Auth/Auth'
import Home from '../views/Home/Home'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes:
  [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/animes',
      name: 'Animes',
      component: List,
      props:{
        type: 'animes'
      },
      children:[
        {
          name: 'Animes_Section',
          path: ':section',
          component: List
        }
      ]
    },


    {
      path: '/anime/:slug/',
      component: FullPage,
      meta: { reuse: false },
      children: [
      {
        name: 'Watch',
        path: 'watch',
        component: Watch
      },
      {
        name: 'Anime',
        path: '',
        component: Overview
      },
      {
        name: 'Characters',
        path: 'characters',
        component:function () {
          return import('../views/FullPage/contents/Characters.vue')
        }
      },
    ]
    },

    
    {
      path: '/genre/:slug',
      name: 'Genre',
      component: List,
      props:{
        type: 'genre'
      }
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
    },
    

  ]
})

/*
component: function () {
  return import('../views/About.vue')
}
*/

