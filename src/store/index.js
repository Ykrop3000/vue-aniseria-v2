import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

/*
 li  --> Logged In
 nli --> Not Logged In
 nd  --> No Difference
*/


export default new Vuex.Store({
  state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user : {},
      someuser: {},

      animesType: null,
      animes: [],

      anime:{},
      related:[],
      roles:[],

      genres: [],
      studios: [],
      animes_status: 'loading',

      nav:[
        {
          to: 'Home',
          text: 'home',
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
      APIurl: 'http://127.0.0.1:8000',

  },
  getters: {
    NAV: state =>{
      return state.nav
    },
    ANIMES: state =>{
        return state.animes;
    },
    ANIME: state =>{
      return state.anime;
    },
    RELATED: state =>{
      return state.related
    },
    ROLES: state =>{
      return state.roles
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
    authStatus: state => state.status,

    REG_ERROR: state => state.reg_error,
    LOGIN_ERROR: state => state.login_error,
    ANIMESSTATUS: state => state.animes_status,
    ERRORS: state => state.errors,
    SUCSESS: state => state.sucsess
  },
  mutations: {
      SET_ANIMES: (state, payload) =>{
        state.animes = payload;
      },
      
      ADD_ANIMES: (state, payload) =>{
        state.animes = state.animes.concat(payload);
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
      SET_ANIME_ROLES:(state, payload) =>{
        state.roles = payload;
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
        state.animes_status = 'loading'
      },
      ANIME_SUCCESS(state){
        state.animes_status = 'success'
      },
      ANIME_ERROR(state){
        state.animes_status = 'error'
        state.errors.push('anime')
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

  },
  actions: {
      DEL_ERROR({commit},i){
        commit('del_error',i);
      },
      DEL_SUCSESS({commit},i){
        commit('del_sucsess',i);
      },
      GET_ANIMES({commit}, payload){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')

          let params = {
            ordering:payload.ordering,
            search:payload.search,
            page:payload.page,
            year_start:payload.year_start,
            year_end:payload.year_end,
            gf: payload.gf
          }
          if (payload.genres){
            params.genres = payload.genres.map(g => g.id).join(',')
          }


          axios({url: `${this.state.APIurl}/api/v2/${payload.type}`, params:params, method: 'GET' })
          .then(resp => {
          
            
            if(payload.page > 1){
              commit('ADD_ANIMES', resp.data.results);
            }
            else{
              commit('SET_ANIMES', {});
              commit('SET_ANIMES', resp.data.results);
            }

            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR');
            reject(err)
          })
        })
      },
      GET_RELATED({commit}, id){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/animes/${id}/related`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME_RELATED',resp.data)
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
            commit('SET_ANIMES', {});
            commit('SET_ANIMES', resp.data.results);
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR');
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
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR');
            reject(err)
          })
        })
       },
      CLEAR_ANIMES({commit}){
        commit('SET_ANIMES', {});
      },
      CLEAR_ANIME({commit}){
        commit('SET_ANIME', {});
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
      GET_ANIME({commit},payload){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.APIurl}/api/v2/anime/${payload}`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME',resp.data.anime);
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