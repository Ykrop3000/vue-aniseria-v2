import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import rateLimit from 'axios-rate-limit';

import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';
import { loadProgressBar } from 'axios-progress-bar'
loadProgressBar()

// const axios = rateLimit(axioss.create(), { maxRequests: 5,maxRPS: 5 })


const sleepRequest = (milliseconds, originalRequest) => {
  return new Promise((resolve) => {
      setTimeout(() => resolve(axios(originalRequest)), milliseconds);
  });
};

axios.interceptors.response.use(response => {
  return response;
}, error => {
  const { config, response: { status }} = error;
  const originalRequest = config;

  if (status === 429) {
      return sleepRequest(1000, originalRequest);
  } else {
      return Promise.reject(error);
  }
});

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
const vcdn_key = 'NNJNGDFMuZZPAvckNgrfvs2JDwwGHTrp'
const kodik_url = 'https://kodikapi.com/search'
const vcdn_url = 'https://videocdn.tv/api/short'


export default new Vuex.Store({
  state: {
      status: 'success',
      token: localStorage.getItem('token') || '',
      user : JSON.parse(localStorage.getItem('user')) || {},
      someuser: {},
      lists: [],

      animes: {},

      anime:{},
      banner: '-',
      related: [],
      similar: [],
      roles: [],
      kodik: {},
      vcdn: {},
      screenshots: [],
      comments: [],
      
      character: {},

      genres: JSON.parse(localStorage.getItem('genres')) || [],
      studios: [],

      calendar: [],

      carousel: [],

      client_id: 'vWH694NVtAjBy5zW6K119ViSypMjuZ3lstEBfGlSSwA',
      client_secret: '75yh1Jdj6AKwWVHQNaPEQZkdpIWvZlYxqCuo0YI_BPI',
      redirect_uri: 'https://vue-aniseria-v2.firebaseapp.com/login',

      stats: {
        planned: 'Запланировано',
        watching: 'Смотрю',
        rewatching: 'Пересматриваю',
        completed: 'Просмотрено',
        on_hold: 'Отложено',
        dropped: 'Брошено'
      },
      kind : {
        'tv': 'TV Сериал',
        'movie': 'Фильм',
        'ova': 'OVA',
        'ona': 'ONA',
        'special': 'Спешл',
        'music': 'Клип',
        "manga": 'Манга',
        "manhwa": 'Манхва',
        "manhua": 'Маньхуа',
        "one_shot": 'Ваншот',
        "doujin": 'Додзинси'
      },
      statusAnime:{
        'anons': 'Анонсировано',
        'ongoing': 'Сейчас выходит',
        'released': 'Вышедшее'
      },
      theme: localStorage.getItem('theme') || 'light',

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
          to: 'Mangas',
          text: 'манга',
          svg: 'fas fa-book',
          auth: 'nd'
        },
        {
          to: 'Calendar',
          text: 'Календарь',
          svg: 'far fa-calendar-alt',
          auth: 'nd'
        },
        {
          to: 'Login',
          text: 'войти',
          svg: 'fas fa-sign-in-alt',
          class: 'signup login',
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
    VCDN: state =>{
      return state.vcdn
    },
    SCREENSHOTS: state =>{
      return state.screenshots
    },
    COMMENTS: state =>{
      return state.comments
    },

    LISTS: state =>{
      return state.lists
    },
    CALENDAR: state =>{
      return state.calendar
    },
    MESSAGE: state => {
      let mes = state.message
      return mes
    },
    BANNER: state => {
      return  state.banner
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

    TRANSPARENT: state => state.transparent,
    CHARAPTER: state => state.character
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
      SET_VCDN: (state, payload) =>{
        state.vcdn = payload;
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
      SET_SCREENSHOTS:(state, payload) =>{
        state.screenshots = payload;
      },
      SET_COMMENTS:(state, payload) =>{
        state.comments = payload;
      },
      ADD_COMMENTS: (state, payload) =>{
        state.comments = state.comments.concat(payload)
      },

      SET_LISTS:(state, payload) =>{
        state.lists = payload
      },
      SET_CALENDAR: (state, payload) =>{
        state.calendar = payload
      },

      SET_SOMEUSER: (state, payload) =>{
        state.someuser = payload;
      },
      SET_USER: (state, payload) =>{
        localStorage.user = JSON.stringify(payload)
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
      },
      SET_CHARAPTER(state, data){
        state.character = data
      },
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
      CHANGE_THEME(){
        let theme = this.state.theme
        if (theme == 'light'){
          this.state.theme = 'dark'
          localStorage.theme = 'dark'
        }else{
          this.state.theme = 'light'
          localStorage.theme = 'light'
        }
      },


      GET_ANIMES({commit}, payload){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          let params = payload


          if (payload.genres){
            params.genre = payload.genres
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

          axios({url: `${this.state.shikiUrl}/api/${payload.type ||'animes'}`,params:params, method: 'GET' })
          .then(resp =>{

            let data = []
            if (resp.data.length==0){
              data = [404]
            }else{
              data = resp.data
            }
                        
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
            if(err.response.data.error == "invalid_token"){
              this.state.token = ''
              localStorage.removeItem('token')
            }
            commit('ANIME_ERROR',err);
            reject(err)
          })
          
          
        })
      },
      GET_RELATED({commit}, params){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/${params.type}/${params.id}/related`, method: 'GET' })
          .then(resp => {

            commit('SET_ANIME_RELATED', resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_CALENDAR({commit}){
        commit('ANIME_REQUEST')
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/calendar`, method: 'GET' })
          .then(resp => {
            commit('SET_CALENDAR', resp.data.filter(d => d.anime))
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
      },
      GET_SIMILAR({commit}, params){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/${params.type}/${params.id}/similar`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME_SIMILAR',resp.data)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_ROLES({commit},params){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/${params.type}/${params.id}/roles`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME_ROLES', resp.data.filter(d => d.character != null));
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },
       GET_CHARAPTER({commit},id){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/characters/${id}`, method: 'GET' })
          .then(resp => {
            commit('SET_CHARAPTER', resp.data);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },
       async GET_BANNER({commit}, search) {
        const response = await graphqlClient.query({
          query: gql`
            query ($search: String) {
              Media(search: $search, type: ANIME) {
                id
                bannerImage
              }
            }
          `,
          variables: { search: search },
        });
        this.state.banner =  response.data.Media? response.data.Media.bannerImage: NaN
        commit
      },
      async GET_CAROUSEL({commit}) {
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.shikiUrl}/api/animes`,params:{'status':'ongoing','order':'popularity','limit':10}, method: 'GET' })
          .then(resp => {
            this.state.carousel =  resp.data
            commit
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },
      GET_ANIME_RATES({commit}, id){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
     
          axios({url: `${this.state.shikiUrl}/api/v2/user_rates`,params:{user_id:id}, method: 'GET' })
          .then(resp => {
            this.state.lists = resp.data
            let params ={
              key: 'rates',
              ids: resp.data.map(a => a.target_id)
            }
            this.dispatch('GET_ANIMES', params)
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
      },
      SET_ANIME_RATES({commit}, params){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')

          let data = {
            target_type: 'Anime',
            user_id: params.user_id,
            target_id: params.target_id,
            status: params.status,
            score: params.score,
            episodes: params.episodes
          }

          axios({url: `${this.state.shikiUrl}/api/v2/user_rates`,data: data, method: 'POST' })
          .then(resp => {

            let message = 'Добавлено в список'
            commit('MESSAGE',message);

            commit('SET_ANIMES', {key:'rates',val:[]});
            commit('SET_ANIMES', {key:'rates',val:resp.data});
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
      },
      
      GET_FAVORITES({commit}, id){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
     
          axios({url: `${this.state.shikiUrl}/api/users/${id}/favourites`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIMES', {key:'favorite',val:[]});
            commit('SET_ANIMES', {key:'favorite',val:resp.data});
            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR',err);
            reject(err)
          })
        })
       },
       SET_FAVORITES({commit},params){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')
          axios({url: `${this.state.shikiUrl}/api/favorites/Anime/${params.id}`, method: (!params.type)? 'POST': 'delete' })
          .then(resp => {
            commit('ANIME_SUCCESS');
            let message = resp.data.notice
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
        this.state.banner = ''
        commit('SET_ANIME', {});
        commit('SET_ANIME_ROLES', []);
        commit('SET_ANIME_SIMILAR',[])
        commit('SET_ANIME_RELATED',[])
        commit('SET_KODIK', {});
        commit('SET_VCDN', {});
        commit('SET_SCREENSHOTS', [])
        commit('SET_COMMENTS', []);
      },
      
      GET_GENRES({commit}){
        return new Promise((resolve, reject) => {
          if (localStorage.genres){
            commit('SET_GENRES',JSON.parse(localStorage.genres))
          }else{
            axios({url: `${this.state.shikiUrl}/api/genres`, method: 'GET' })
            .then(resp => {
              let data = resp.data.filter(g => g.kind === 'anime')
              localStorage.genres = JSON.stringify(data)
              commit('SET_GENRES', data);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          }
        })
      },
      GET_COMMENTS({commit},props){
        return new Promise((resolve, reject) => {
          let params ={
            commentable_id: props.id,
            commentable_type: 'Topic',
            limit: 10,
            page: props.page,
            desc: 1
          }
          axios({url: `${this.state.shikiUrl}/api/comments`,params: params, method: 'GET' })
          .then(resp => {
            if (props.page == 0){
              commit('SET_COMMENTS', resp.data);
            }else{
              commit('ADD_COMMENTS', resp.data);
            }
            
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      SET_COMMENTS({commit},props){
        return new Promise((resolve, reject) => {
          let params ={
            comment:{
              commentable_id: props.id,
              commentable_type: 'Topic',
              body: props.text
            }
          }
          axios({url: `${this.state.shikiUrl}/api/comments`,data: params, method: 'POST' })
          .then(resp => {
            commit('ADD_COMMENTS', resp.data);
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

            axios({url: kodik_url, params:{'token':kodik_key, 'shikimori_id':payload}, method: 'GET', headers:{} })
            .then(resp => {
              
              commit('SET_KODIK',resp.data.results[0]);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      GET_VCDN({commit},payload){
        return new Promise((resolve, reject) => {
            axios({url: vcdn_url, params:{'api_token':vcdn_key, 'kinopoisk_id':payload}, method: 'GET', headers:{} })
            .then(resp => {
              commit('SET_VCDN',resp.data.data[0]);
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

            axios({url: `${this.state.shikiUrl}/api/${payload.type}/${payload.slug}`, method: 'GET' })
            .then(resp => {
              commit('SET_ANIME',resp.data);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          
        })
      },
      GET_SCREENSHOTS({commit},payload){
        return new Promise((resolve, reject) => {
            axios({url: `${this.state.shikiUrl}/api/animes/${payload}/screenshots`, method: 'GET' })
            .then(resp => {
              commit('SET_SCREENSHOTS',resp.data);
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
          
        })
      },

      GET_SOME_USER ({commit},slug){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.shikiUrl}/api/users/${slug}`, method: 'GET' })
          .then(resp => {
              commit('SET_SOMEUSER', resp.data)
              resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },      

      GET_USER_BY_TOKEN({commit}){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.shikiUrl}/api/users/whoami`, method: 'GET' })
          .then(resp => {
              commit('SET_USER', resp.data)
              resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
       },      
      LOGIN({commit}, code){
        let params ={
          grant_type: "authorization_code",
          client_id: this.state.client_id,
          client_secret: this.state.client_secret,
          code: code,
          redirect_uri: this.state.redirect_uri
        }
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: `${this.state.shikiUrl}/oauth/token`, data: params, method: 'POST' })
          .then(resp => {
            const token = `${resp.data.token_type} ${resp.data.access_token}`

            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token)
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
          axios({url: `${this.state.shikiUrl}/api/users/sign_out`, method: 'GET' })
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

            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token)
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