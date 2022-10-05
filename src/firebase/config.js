import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDINQ1CpylAdnla_2A_T6SEbfcVKdnyFLs",
    authDomain: "cooking-ninja-142d0.firebaseapp.com",
    projectId: "cooking-ninja-142d0",
    storageBucket: "cooking-ninja-142d0.appspot.com",
    messagingSenderId: "48298590115",
    appId: "1:48298590115:web:41dbe21ff65b2555a0a416"
  };


//   initialise firebase 

firebase.initializeApp(firebaseConfig);

// init services 

const projectFirestore = firebase.firestore();

export { projectFirestore }