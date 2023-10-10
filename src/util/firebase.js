// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhuL3sUuNxJqRzuFf89Xb_p0Aona-bn9o",
  authDomain: "netflixgpt-3126c.firebaseapp.com",
  projectId: "netflixgpt-3126c",
  storageBucket: "netflixgpt-3126c.appspot.com",
  messagingSenderId: "1061044126623",
  appId: "1:1061044126623:web:9814b49527f41f69e9f3aa",
  measurementId: "G-K10229GHMV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
