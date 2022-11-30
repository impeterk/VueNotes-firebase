import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB933ILFr-JZ4sUoKTeKl6D2qbVHBGgNh4",
  authDomain: "vuenotesfire-8832e.firebaseapp.com",
  projectId: "vuenotesfire-8832e",
  storageBucket: "vuenotesfire-8832e.appspot.com",
  messagingSenderId: "213613840883",
  appId: "1:213613840883:web:aaf8bd148f4b2713236a86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
