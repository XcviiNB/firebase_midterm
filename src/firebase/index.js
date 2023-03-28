// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB1-FwcXvhRyvblCFnraObvURoSTukPn0",
  authDomain: "users-b91ef.firebaseapp.com",
  projectId: "users-b91ef",
  storageBucket: "users-b91ef.appspot.com",
  messagingSenderId: "60349658555",
  appId: "1:60349658555:web:ad05af18c517ff14a1809e",
  measurementId: "G-J9NSNFLN9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
export { auth };
