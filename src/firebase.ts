import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDmvq6HUwliLhF4cEGYIjph77Kduu2NjM",
  authDomain: "next-shop-81723.firebaseapp.com",
  projectId: "next-shop-81723",
  storageBucket: "next-shop-81723.firebasestorage.app",
  messagingSenderId: "597235149527",
  appId: "1:597235149527:web:8e22d7940c8b444c0d1e92",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
