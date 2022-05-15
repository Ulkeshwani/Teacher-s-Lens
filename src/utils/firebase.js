import firebase from "firebase/compat/app";
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

import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0Eo24M9ze6_09_a8Gbx2OFC77Ld3jYgs",
  authDomain: "fy-project-db.firebaseapp.com",
  projectId: "fy-project-db",
  storageBucket: "fy-project-db.appspot.com",
  messagingSenderId: "377563527802",
  appId: "1:377563527802:web:7914d4a93771403bb519c3",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
const realtimeDb = firebase.database();

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((res) => {
      return res;
    });
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPassword = async (name, email, password, role) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(firestoreDB, "users"), {
      uid: user.uid,
      active: true,
      role,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email).then((res) => {
      return res;
    });
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  firestoreDB,
  realtimeDb,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
