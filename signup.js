import { auth } from "./auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// ننتظر حتى تحمل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
    const signupBtn = document.getElementById("signupBtn");
    
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email && password) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        alert("تم إنشاء الحساب بنجاح!");
                        console.log("تم تسجيل المستخدم:", userCredential.user.email);
                    })
                    .catch((error) => {
                        alert("خطأ: " + error.message);
                    });
            } else {
                alert("يرجى إدخال البريد وكلمة المرور");
            }
        });
    }
});
