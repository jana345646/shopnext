import { initializeApp } from "firebase/app"; // it runs the function that runs the firebase
import { getAuth } from "firebase/auth"; // it runs the authentication from firebase

const firebaseConfig = {
  //this is an object that holdsthe project data on firebase
  apiKey: "AIzaSyDDmvq6HUwliLhF4cEGYIjph77Kduu2NjM", //id for project to can talk with firebase
  authDomain: "next-shop-81723.firebaseapp.com",
  projectId: "next-shop-81723", //project name on firebase
  storageBucket: "next-shop-81723.firebasestorage.app",
  messagingSenderId: "597235149527",
  appId: "1:597235149527:web:8e22d7940c8b444c0d1e92",
};

const app = initializeApp(firebaseConfig); //this initialize the firebase with the data in the object

export const auth = getAuth(app); // run  the auth
export default app;
