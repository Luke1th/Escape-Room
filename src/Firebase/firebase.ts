// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9ew6muODO375Ck80FPVu5Gf8W0hkTYw0",
  authDomain: "escaperoom-6efe7.firebaseapp.com",
  projectId: "escaperoom-6efe7",
  storageBucket: "escaperoom-6efe7.appspot.com",
  messagingSenderId: "96729534361"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
