import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3cfG_5olpUfp3EZZZWfLF5n0W8mQZF7Y",
  authDomain: "talktome-b941a.firebaseapp.com",
  projectId: "talktome-b941a",
  storageBucket: "talktome-b941a.firebasestorage.app",
  messagingSenderId: "970006114861",
  appId: "1:970006114861:web:888d0057c990ddb5077ea4",
  measurementId: "G-P7VFSX0SS8"
};

const app = initializeApp(firebaseConfig);

// getAuth() creates the authentication service for your app
// This is what lets users sign up, log in, and log out
export const auth = getAuth(app);
export default app;