import { auth } from './auth.js'; // نستورد خاصية الـ auth التي جهزناها سابقاً
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupBtn = document.getElementById('signupBtn');

signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("تم إنشاء الحساب بنجاح!");
            console.log("المستخدم:", userCredential.user);
        })
        .catch((error) => {
            alert("خطأ: " + error.message);
        });
});
