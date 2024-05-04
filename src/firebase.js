
import { initializeApp } from "firebase/app";
import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC8tORmhj7i2QRpu2D15n_JDNKULpDejXM",
    authDomain: "authproject-fde77.firebaseapp.com",
    projectId: "authproject-fde77",
    storageBucket: "authproject-fde77.appspot.com",
    messagingSenderId: "668111826788",
    appId: "1:668111826788:web:dc35f496050b7972145471",
    measurementId: "G-TDBK0WFL23"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
const emailAuth = new EmailAuthProvider()
const faceProvider = new FacebookAuthProvider()

export { app, auth, provider, faceProvider, emailAuth };