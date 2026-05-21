// ====== إعداد Firebase ======
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, deleteDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====== الكود القديم حقك + التعديلات ======
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

  // جيب المنتجات من Firebase واعرضها
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
    }
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      grid.innerHTML += `
        <div class="product-card" data-category="${data.category}" data-id="${docSnap.id}"
             style="background-image: linear-gradient(to bottom, rgba(19, 26, 33, 0.85), rgba(11, 12, 16, 0.95)), url('${data.image || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600'}');">
          ${data.badge ? `<div class="badge">${data.badge}</div>` : ""}
          <h3>${data.name}</h3>
          <p class="price">${data.price} $</p>
          <p class="desc">${data.desc}</p>
          <button class="add-to-cart-btn" onclick="buyAndDelete('${docSnap.id}', '${data.name}', ${data.price})">
            <i class="fa-solid fa-cart-plus"></i> شراء
          </button>
        </div>
      `;
    });
  });
}

// ====== الشراء والحذف الأوتوماتيكي ======
window.buyAndDelete = async function(docId, name, price) {
  try {
    const ref = doc(db, "accounts", docId);
    const snap = await getDoc(ref);
    
    if (!snap.exists()) {
      alert("عذراً، الحساب ده اتباع قبل كده");
      return;
    }

    await deleteDoc(ref);
    alert(`تم البيع! حساب ${name} اتحذف من الموقع أوتوماتيك`);
    
    const phone = "9665XXXXXXX"; // غير رقمك هنا
    const message = `السلام عليكم، أريد شراء ${name} بسعر ${price}$`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');

  } catch (error) {
    console.error("خطأ:", error);
    alert("حصل خطأ، الحساب ما اتحذف");
  }
}

// ====== نظام السلة القديم حقك ======
let cart = [];

window.addToCart = function(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-msg">السلة فارغة حالياً</p>';
    cartTotal.textContent = "0";
    return;
  }
  
  let html = "";
  let total = 0;
  cart.forEach((item, index) => {
    html += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>${item.price} $</span>
        <button onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    total += item.price;