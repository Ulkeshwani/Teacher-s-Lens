import firebase from "firebase/compat/app";

import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0Eo24M9ze6_09_a8Gbx2OFC77Ld3jYgs",
  authDomain: "fy-project-db.firebaseapp.com",
  projectId: "fy-project-db",
  storageBucket: "fy-project-db.appspot.com",
  messagingSenderId: "377563527802",
  appId: "1:377563527802:web:7914d4a93771403bb519c3",
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
