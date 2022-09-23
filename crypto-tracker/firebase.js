// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCO55B7YVR21GKGpQBTI1GtICCIn6bkFwA",
  authDomain: "react-native-auth-e0561.firebaseapp.com",
  projectId: "react-native-auth-e0561",
  storageBucket: "react-native-auth-e0561.appspot.com",
  messagingSenderId: "436649574193",
  appId: "1:436649574193:web:79b82acd01f76442397a10",
  measurementId: "G-C7C4L98PTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authorization = getAuth(app)
