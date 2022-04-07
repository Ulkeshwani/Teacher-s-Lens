import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACOenOHzqPZyofmUTWr7hUaORyd-S9Eqg",
  authDomain: "webrtc-demo-3515b.firebaseapp.com",
  projectId: "webrtc-demo-3515b",
  storageBucket: "webrtc-demo-3515b.appspot.com",
  messagingSenderId: "898583329560",
  appId: "1:898583329560:web:799cb0841945ecd30bfc6d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, sendPasswordReset, logout };
