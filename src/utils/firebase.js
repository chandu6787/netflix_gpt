// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmZmQCGCIm_k02yuyC6R6zg0csWVAibbs",
  authDomain: "netflix-gpt-37347.firebaseapp.com",
  projectId: "netflix-gpt-37347",
  storageBucket: "netflix-gpt-37347.firebasestorage.app",
  messagingSenderId: "513912367651",
  appId: "1:513912367651:web:287d59f0ea3e5ce42f5f96",
  measurementId: "G-WWR677E1GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();