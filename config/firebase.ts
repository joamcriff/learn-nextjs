// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsrwSyK8PSiv-LtOrlN1r00mCSgQQvb0",
  authDomain: "whatsapp-clone-2-be1e9.firebaseapp.com",
  projectId: "whatsapp-clone-2-be1e9",
  storageBucket: "whatsapp-clone-2-be1e9.appspot.com",
  messagingSenderId: "531602760288",
  appId: "1:531602760288:web:818d88b641a95d83a45905"
};
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { db, auth, provider }