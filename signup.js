import { auth } from "./auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("تم إنشاء الحساب بنجاح!");
    })
    .catch((error) => {
      alert("خطأ: " + error.message);
    });
});
