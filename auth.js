import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPrIbAxrLNUPINKa4nf0MVM1_Jf32vb1A",
  authDomain: "myshop-9cf11.firebaseapp.com",
  projectId: "myshop-9cf11",
  storageBucket: "myshop-9cf11.firebasestorage.app",
  messagingSenderId: "49685789530",
  appId: "1:49685789530:web:ca722208b0e7ccf90d9163"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
