// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ew6muODO375Ck80FPVu5Gf8W0hkTYw0",
  authDomain: "escaperoom-6efe7.firebaseapp.com",
  projectId: "escaperoom-6efe7",
  storageBucket: "escaperoom-6efe7.firebasestorage.app",
  messagingSenderId: "96729534361",
  appId: "1:96729534361:web:e5bb6311ef1ccbe1184d08"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// You can now export 'db' to use it in other parts of your app
// export { db };
