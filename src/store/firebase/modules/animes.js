const animes = {
    firestorePath: 'animes',
    firestoreRefType: 'collection', // or 'doc'
    moduleName: 'animes',
    statePropName: 'data',
    namespaced: true, // automatically added
  
    // this object is your store module (will be added as '/myModule')
    // you can also add state/getters/mutations/actions
    state: {
        loading: false
    },
    getters: {
        isLoading(state) {
          return state.loading === true;
        }
    },
    mutations: {},
    actions: {},
  }
  
  export default animes