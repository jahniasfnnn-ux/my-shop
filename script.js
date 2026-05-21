// ====== إعداد Firebase ======
const firebaseConfig = {
  apiKey: "AIzaSyDfeU5SsvyE0h9FsJj3SZ22h5jOl5K5g4w",
  authDomain: "myonlineshop-a662d.firebaseapp.com",
  projectId: "myonlineshop-a662d",
  storageBucket: "myonlineshop-a662d.firebasestorage.app",
  messagingSenderId: "831003623773",
  appId: "1:831003623773:web:902eeee6dc0f9a10b228b4"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, deleteDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====== الكود حقك القديم + التعديلات ======
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById('theme-toggle');
  const cartBtn = document.getElementById('cart-btn');
  const closeCart = document.getElementById('close-cart');
  const cartSidebar = document.getElementById('cart-sidebar');
  const grid = document.getElementById("products-grid");

  // الثيم
  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeToggle.innerHTML = document.body.classList.contains('dark-theme') 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // السلة
  if(cartBtn) cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
  if(closeCart) closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

  // جيب المنتجات من Firebase
  if(grid) {
    grid.innerHTML = "<p style='text-align:center;color:#aaa;'>جاري تحميل الحسابات...</p>";
    listenToProducts();
  }
});

// ====== استماع مباشر لـ Firebase ======
function listenToProducts() {
  const grid = document.getElementById("products-grid");
  
  onSnapshot(collection(db, "accounts"), (snapshot) => {
    grid.innerHTML = "";
    
    if (snapshot.empty) {
      grid.innerHTML = "<p style='text-align:center;color:#aaa;'>لا توجد حسابات متاحة حالياً</p>";
      return;