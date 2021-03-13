import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/List/List' 
import FullPage from '../views/FullPage/FullPage' 
import Overview from '../views/FullPage/contents/Overview'
import Watch from '../views/FullPage/contents/Watch'
import Home from '../views/Home/Home'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

const routes =
  [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/charapter/:id',
      name: 'Charapter',
      component:function () {
        return import('../views/Charapter/Charapter.vue')
      }
    },
    {
      path: '/animes',
      name: 'Animes',
      component: List,
      props:{
        type: 'animes',
        full: 'Anime',
        title: 'Список аниме'
      },
    },
    {
      path: '/mangas',
      name: 'Mangas',
      component: List,
      props:{
        type: 'mangas',
        full: 'Manga',
        title: 'Список манги'
      },
    },

    {
      name: 'Calendar',
      path: '/calendar',
      component:function () {
        return import('../views/Calendar/Calendar.vue')
      }
    },

    {
      path: '/anime/:slug/',
      component: FullPage,
      meta: { reuse: false },
      props:{
        type: 'animes',
        link: 'Anime'
      },
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
      path: '/manga/:slug/',
      component: FullPage,
      meta: { reuse: false },
      props:{
        type: 'mangas',
        link: 'Manga'
      },
      children: [
      {
        name: 'Manga',
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
      path: '/login',
      name: 'Login',
      component:function () {
        return import('../views/Auth/OAuth2.vue')
      }
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
      component: function () {
        return import('../views//Profile/Profile.vue')
      },
      children: [
        {
          name: 'User',
          path: '',
          component: function () {
            return import('../views//Profile/contents/Overview')
          },
        },
        {
          name: 'Favorite',
          path: 'favorite',
          component: function () {
            return import('../views/Profile/contents/Favorite')
          },
        },
      ]
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
  duplicateNavigationPolicy: 'ignore',
  base: process.env.BASE_URL,
  routes
})

export default router