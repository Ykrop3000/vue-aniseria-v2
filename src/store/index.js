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
      APIurl: 'http://127.0.0.1:8000',


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
        state.animes.main = state.animes.concat(payload);
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

  },
  actions: {
      DEL_ERROR({commit},i){
        commit('del_error',i);
      },
      DEL_SUCSESS({commit},i){
        commit('del_sucsess',i);
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
            params.key = 'main'
          }
          

          axios({url: `${this.state.APIurl}/api/v2/animes`, params:params, method: 'GET' })
          .then(resp => {
          
            if(payload.dispatchTo){
              commit(payload.dispatchTo, resp.data.results);
            }else{
              if(payload.page > 1){
                commit('ADD_ANIMES', resp.data.results);
              }
              else{
                commit('SET_ANIMES', {key:params.key,val:[]});
                commit('SET_ANIMES', {key:params.key,val:resp.data.results});
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

            commit('SET_ANIME_RELATED',{})
            this.dispatch('GET_ANIMES',{
              ids: resp.data.filter(d => d.anime).map(d => d.anime.id),
              dispatchTo: 'SET_ANIME_RELATED'
            })
            
            
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

            commit('SET_ANIME_SIMILAR',{})
            this.dispatch('GET_ANIMES',{
              ids: resp.data.map(d => d.id),
              dispatchTo: 'SET_ANIME_SIMILAR'
            })

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
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
       },
      CLEAR_ANIMES({commit}){
        commit('SET_ANIMES', {});
      },
      CLEAR_ANIME({commit}){
        commit('SET_ANIME', {});
        commit('SET_ANIME_ROLES', []);
        commit('SET_ANIME_SIMILAR',[])
        commit('SET_ANIME_RELATED',[])


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
          if(this.state.animes.filter(a => a.url == '/animes/'+ payload).length == 1){
            commit('SET_ANIME',this.state.animes.filter(a => a.url == '/animes/'+ payload)[0]);
          }else{
            axios({url: `${this.state.APIurl}/api/v2/anime/${payload}`, method: 'GET' })
            .then(resp => {
              commit('SET_ANIME',resp.data.anime);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          }
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