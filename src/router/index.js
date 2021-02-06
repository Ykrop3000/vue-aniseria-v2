import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/List/List' 
import FullPage from '../views/FullPage/FullPage' 
import Overview from '../views/FullPage/contents/Overview'
import Watch from '../views/FullPage/contents/Watch'
import Auth from '../views/Auth/Auth'
import Home from '../views/Home/Home'
import OAuth2 from '../views/Auth/OAuth2'

Vue.use(Router)

const routes =
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
      meta:{
        order: '-aired_on',
        name: 'year'
      },
      children:[
        {
          name: 'Animes_rating',
          path: 'rating',
          component: List,
          meta:{
            order: '-user_rate',
            name: 'raiting'
          }
        },
        {
          name: 'Animes_id',
          path: 'new',
          component: List,
          meta:{
            order: '-id',
            name: 'id'
          }
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
      {
        name: 'Frames',
        path: 'frames',
        component:function () {
          return import('../views/FullPage/contents/Frames.vue')
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
      component: OAuth2
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
        return import('../views//Profile/Profile.vue')
      }
    },

    {
      path: '/404',
      name: '404',
      component: function () {
        return import('../views//NotFound/NotFound.vue')
      }
    },
    {
      path: '*',
      redirect: '/404',
    }

  ]


/*
component: function () {
  return import('../views/About.vue')
}
*/

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router