// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArQdogJ3_vwkEZVa-1cQOLeJ4pauXf5w4",
  authDomain: "todo-1a336.firebaseapp.com",
  projectId: "todo-1a336",
  storageBucket: "todo-1a336.appspot.com",
  messagingSenderId: "48053623171",
  appId: "1:48053623171:web:c35ff6bc37534dd5467eb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}