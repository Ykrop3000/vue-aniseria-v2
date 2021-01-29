import Firebase from 'firebase/app'
import 'firebase/firestore'

function initFirebase () {
    Firebase.initializeApp({
        apiKey: "AIzaSyDqClUCpeKb_V0xejJmzUvE6mf1RWuiwFY",
        authDomain: "vue-aniseria-v2.firebaseapp.com",
        databaseURL: "https://vue-aniseria-v2-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "vue-aniseria-v2",
        storageBucket: "vue-aniseria-v2.appspot.com",
        messagingSenderId: "1019276444962",
        appId: "1:1019276444962:web:f5d067ddf4940a45efd17b",
        measurementId: "G-6BYZM9NQD7"
    })
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }