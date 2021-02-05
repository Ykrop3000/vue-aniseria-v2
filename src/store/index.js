import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';


Vue.use(Vuex);

/*
 li  --> Logged In
 nli --> Not Logged In
 nd  --> No Difference

raiting --> -user_rate
id --> -id
year --> -year



*/
const kodik_key = 'b7cc4293ed475c4ad1fd599d114f4435'
const kodik_url = 'https://kodikapi.com/search'

export default new Vuex.Store({
  state: {
      status: 'success',
      token: localStorage.getItem('token') || '',
      user : {},
      someuser: {},

      animes: {},
      nextPage: true,

      anime:{},
      related:[],
      similar:[],
      roles:[],

      genres: [],
      studios: [],

      lists: [],

      kodik: {},

      nav:[
        {
          to: 'Home',
          text: 'Домой',
          svg: 'fas fa-home',
          auth: 'nd'
        },
        {
          to: 'Animes',
          text: 'аниме',
          svg: 'fas fa-play',
          auth: 'nd'
        },
        {
          to: 'Login',
          text: 'войти',
          svg: 'fas fa-sign-in-alt',
          class: 'login',
          auth: 'nli'
        },
        {
          to: 'Signup',
          text: 'регистрация',
          svg: 'fas fa-user-plus',
          class: 'signup',
          auth: 'nli'
        },


      ],

      reg_error:{},
      login_error: {},
      errors: [],
      sucsess: [],

      shikiUrl: 'https://shikimori.one',
      APIurl: 'https://anivideo24.herokuapp.com',

      message: null,
      transparent: false
      
  },
  getters: {
    NAV: state =>{
      return state.nav
    },
    ANIMES: state  => {
        return state.animes;
    },
    ANIME: state =>{
      return state.anime;
    },
    RELATED: state =>{
      return state.related
    },
    SIMILAR: state =>{
      return state.similar
    },
    ROLES: state =>{
      return state.roles
    },
    KODIK: state =>{
      return state.kodik
    },

    LISTS: state =>{
      return state.lists
    },


    MESSAGE: state => {
      let mes = state.message
      return mes
    },



    SHIKIURL: state =>{
        return state.shikiUrl;
    },
    APIURL: state =>{
      return state.APIurl;
    },
    GENRES: state =>{
        return state.genres;
    },
    STUDIOS: state =>{
      return state.studios;
  },
    GENRE_BY_ID: (state) => (id) =>{
        return state.genres.find(genres => genres.id === id)
    },
    USER: state =>{
      return state.user;
    },
    SOMEUSER: state =>{
      return state.someuser;
    },
    token: state => state.token,
    isLoggedIn: state => !!state.token,

    REG_ERROR: state => state.reg_error,
    LOGIN_ERROR: state => state.login_error,
    STATUS: state => state.status,
    ERRORS: state => state.errors,
    SUCSESS: state => state.sucsess,

    TRANSPARENT: state => state.transparent
  },
  mutations: {
      SET_ANIMES: (state, payload) =>{
        
        let animes = {[payload.key]:payload.val}

        if(state.animes[payload.key]){
          state.animes[payload.key] = payload.val;
        }else{
          state.animes = Object.assign(animes, state.animes)
        }
              
      },

      ADD_ANIMES: (state, payload) =>{
        state.animes[payload.key] = state.animes[payload.key].concat(payload.val)
      },
      SET_GENRES: (state, payload) =>{
        state.genres = payload;
      },
      SET_STUDIOS: (state, payload) =>{
        state.studios = payload;
      },

      SET_ANIME: (state, payload) =>{
        state.anime = payload;
      },
      SET_ANIME_RELATED:(state, payload) =>{
        state.related = payload;
      },
      SET_ANIME_SIMILAR:(state, payload) =>{
        state.similar = payload;
      },
      SET_ANIME_ROLES:(state, payload) =>{
        state.roles = payload;
      },
      SET_KODIK:(state, payload) =>{
        state.kodik = payload;
      },


      SET_LISTS:(state,payload) =>{
        state.lists = payload
      },



      SET_SOMEUSER: (state, payload) =>{
        state.someuser = payload;
      },
      SET_USER: (state, payload) =>{
        state.user = payload;
      },
      SET_USER_PROFILE: (state, payload) =>{
        state.user = state.user.concat(payload);
      },

      ANIME_REQUEST(state){
        state.status = 'loading'
      },
      ANIME_SUCCESS(state){
        state.status = 'success'
      },
      ANIME_ERROR(state, err){
        state.status = 'error'
        console.log(err.request)
        state.errors.push(err.message )
      },

      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token){
        state.status = 'success'
        state.token = token
      },
      reg_error(state, err){
        state.status = 'error'
        for (var key in err) {
          state.errors.push(`${err[key]}`)
        }
      },
      login_error(state, err){
        state.status = 'error'
        state.errors.push('Неверный логин или пароль')
        state.login_error = err 
      },
      del_error(state,index){
        state.errors.splice(index, 1);
      },
      del_sucsess(state,index){
        state.sucsess.splice(index, 1);
      },
      logout(state){
        state.status = ''
        state.token = ''
      },

      SET_TRANSPARENT(state,val){
        state.transparent = val
      },
      MESSAGE(state, mes){
        state.message = mes
      }
  },
  actions: {
      DEL_ERROR({commit},i){
        commit('del_error',i);
      },
      DEL_SUCSESS({commit},i){
        commit('del_sucsess',i);
      },
      DEL_MESSAGE(){
        this.state.message = null
      },
      SET_TRANSPARENT({commit},val){
        commit('SET_TRANSPARENT',val);
      },



      GET_ANIMES({commit}, payload){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          let params = payload


          if (payload.genres){
            params.genres = payload.genres.map(g => g.id).join(',')
          }
          if (payload.ids){
            params.ids = payload.ids.join(',')
          }
          if(!payload.key){
            params.key = 'year'
          }
          if(!payload.limit){
            params.limit = 24
          }

          graphqlClient.query({
            query: gql`
              query getAnimes($offset:Int, $first:Int, $ids:String, $orderBy:String, $search:String, $genres:String) {
                animes(orderBy:$orderBy , offset:$offset, first:$first, ids:$ids, search:$search, genres:$genres){
                  edges{
                    node{
                      id
                      name
                      russian
                      image
                      url
                      ${params.field}
                    }
                  }
                }
              }            
              `,variables: {
                  orderBy: params.ordering,
                  offset: (params.page-1)*params.limit || 0,
                  first: params.limit || 24,
                  ids: params.ids,
                  search: params.search,
                  genres: params.genres
              }
          })
          .then(resp =>{
            let data = resp.data.animes.edges.map(e => e.node)
            
            if(payload.dispatchTo){
              commit(payload.dispatchTo, data);
            }else{
              if(payload.page > 1){
                commit('ADD_ANIMES', {key: params.key, val: data});
              }
              else{
                commit('SET_ANIMES', {key: params.key, val: []});
                commit('SET_ANIMES', {key: params.key, val: data});
              }
            }

            commit('ANIME_SUCCESS');
            resolve(resp)

          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
          
          
        })
      },
      GET_RELATED({commit}, id){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/animes/${id}/related`, method: 'GET' })
          .then(resp => {

            commit('SET_ANIME_RELATED',[])
            let ids =  resp.data.filter(d => d.anime).map(d => d.anime.id)
            if (ids != ''){
              this.dispatch('GET_ANIMES',{
                ids:  ids,
                field: 'kind status',
                dispatchTo: 'SET_ANIME_RELATED'
              })
            }
            
            
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_SIMILAR({commit}, id){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/animes/${id}/similar`, method: 'GET' })
          .then(resp => {

            commit('SET_ANIME_SIMILAR',[])

            let ids = resp.data.map(d => d.id)
            if (ids){
              this.dispatch('GET_ANIMES',{
                ids: ids,
                limit: 7,
                field: '',
                dispatchTo: 'SET_ANIME_SIMILAR'
              })
            }

            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_ROLES({commit},id){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/animes/${id}/roles`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME_ROLES', resp.data.filter(d => d.character != null));
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },


      GET_FAVORITES({commit}){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          axios({url: `${this.state.APIurl}/api/v2/favorite`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIMES', {key:'favorite',val:[]});
            commit('SET_ANIMES', {key:'favorite',val:resp.data.results});
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
       },
       SET_FAVORITES({commit},id){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          axios({url: `${this.state.APIurl}/api/v2/favorite`,data:{'id': id}, method: 'POST' })
          .then(resp => {
            commit('ANIME_SUCCESS');
            
            let message = ''

            if (resp.data.results === "add"){
               message = 'Добавлено в избранное'
            }else{
               message = 'Удалено из избранного'
            }

            commit('MESSAGE',message);
  
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
       },

      
       GET_LISTS({commit}){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          axios({url: `${this.state.APIurl}/api/v2/lists`, method: 'GET' })
          .then(resp => {
            commit('SET_LISTS', []);
            commit('SET_LISTS', resp.data.results);
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
       },





      CLEAR_ANIMES({commit}, payload){
        commit('SET_ANIMES', {
          key: payload,
          val: []
        });
      },

      CLEAR_ANIME({commit}){
        commit('SET_ANIME', {});
        commit('SET_ANIME_ROLES', []);
        commit('SET_ANIME_SIMILAR',[])
        commit('SET_ANIME_RELATED',[])
        commit('SET_KODIK', {});

      },
      
      GET_GENRES({commit}){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/genres`, method: 'GET' })
          .then(resp => {
            commit('SET_GENRES', resp.data.filter(g => g.kind === 'anime'));
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_STUDIOS({commit}){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/studios`, method: 'GET' })
          .then(resp => {
            commit('SET_STUDIOS', resp.data);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_KODIK({commit},payload){
        return new Promise((resolve, reject) => {

            axios({url: kodik_url, params:{'token':kodik_key, 'shikimori_id':payload}, method: 'GET' })
            .then(resp => {
              commit('SET_KODIK',resp.data.results[0]);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          
        })
      },
      GET_ANIME({commit},payload){
        return new Promise((resolve, reject) => {
            this.dispatch('CLEAR_ANIME')

            axios({url: `${this.state.shikiUrl}/api/animes/${payload}`, method: 'GET' })
            .then(resp => {
              commit('SET_ANIME',resp.data);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          
        })
      },
      GET_SOME_USER ({commit},slug){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.APIurl}/api/user/${slug}`, method: 'GET' })
          .then(resp => {
              commit('SET_SOMEUSER',  Object.assign(resp.data.user,resp.data.profile))
              resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },      

      GET_USER_BY_TOKEN({commit}){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.APIurl}/api/myuser`, method: 'GET' })
          .then(resp => {
              commit('SET_USER', Object.assign(resp.data.user,resp.data.profile))
              resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
       },      
      LOGIN({commit}, user){
        
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: `${this.state.APIurl}/api/login`, data: user, method: 'POST' })
          .then(resp => {
            const token = `Token ${resp.data.token}`
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token, user)
            this.dispatch('GET_USER_BY_TOKEN')
            resolve(resp)
          })
          .catch(err => {
            commit('login_error',err.response.data)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      LOGOUT({commit}){
        return new Promise((resolve) => {
          axios({url: `${this.state.APIurl}/api/auth/logout/`, method: 'POST' })
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
       },
       REGISTER({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: `${this.state.APIurl}/api/register`, data: user, method: 'POST' })
          .then(resp => {
            const token = `Token ${resp.data.token}`
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token, user)
            this.dispatch('GET_USER_BY_TOKEN')

            resolve(resp)
          })
          .catch(err => {
            commit('reg_error', err.response.data)
            localStorage.removeItem('token')
            reject(err)
          })
        })
       },
  },
});