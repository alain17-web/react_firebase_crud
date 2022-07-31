import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "react-crud-5156d.firebaseapp.com",
    projectId: "react-crud-5156d",
    storageBucket: "react-crud-5156d.appspot.com",
    messagingSenderId: "160186132712",
    appId: "1:160186132712:web:e219e5f78694dcbd8fc15d"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app)