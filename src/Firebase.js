import firebase  from 'firebase/compat/app'
import "firebase/compat/auth"
import 'firebase/compat/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {
  
  apiKey: "AIzaSyCmTR2HpCBfMm2txYg1wayVP-qggcyhsdc",

  authDomain: "chat-application-prod-11956.firebaseapp.com",

  projectId: "chat-application-prod-11956",

  storageBucket: "chat-application-prod-11956.appspot.com",

  messagingSenderId: "450408470629",

  appId: "1:450408470629:web:e2900dfb3dc3d112e50e8c"

  
  };

  // Initialize Firebase
  
  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth()
  export const firestore = app.firestore()

  export default app

