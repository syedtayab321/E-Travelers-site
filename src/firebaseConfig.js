import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCtbH7Krx9QMCzdx-fk4Uy3xsoHVOyuT60",
    authDomain: "etravelers-4303a.firebaseapp.com",
    projectId: "etravelers-4303a",
    storageBucket: "etravelers-4303a.firebasestorage.app",
    messagingSenderId: "1002486189975",
    appId: "1:1002486189975:web:0f1e982185b23996d23ed2",
    measurementId: "G-D3MH9FM5YG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };