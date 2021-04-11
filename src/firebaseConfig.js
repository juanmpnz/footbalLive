import firebase from "firebase"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB2tbRlXuN3yaaNGojfODmc3lQN-yye8os",
  authDomain: "soccerlive-2e16d.firebaseapp.com",
  projectId: "soccerlive-2e16d",
  storageBucket: "soccerlive-2e16d.appspot.com",
  messagingSenderId: "244515876490",
  appId: "1:244515876490:web:b9d80326d7036481344773",
  measurementId: "G-JRCP9SSB7W"
};
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = fire.auth()

  export {auth}