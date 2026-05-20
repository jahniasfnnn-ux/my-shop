// 1. تشغيل السلة والوضع الداكن
const themeToggle = document.getElementById('theme-toggle');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.classList.contains('dark-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

// 2. نظام الأدمن السري (الرمز الافتراضي هو: 1234)
function checkAdminAccess() {
    let password = prompt("أدخل الرمز السري للأدمن لفتح لوحة التحكم:");
    if (password === "1234") { // تقدر تغير الرقم 1234 لأي رمز تبيه
        document.getElementById('admin-panel').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    } else if (password !== null) {
        alert("الرمز السري خاطئ!");
    }
}

function logoutAdmin() {
    document.getElementById('admin-panel').style.display = 'none';
}

// 3. إدارة المنتجات وحفظها في localStorage
let cart = [];
let customProducts = JSON.parse(localStorage.getItem('custom_products')) || [];

document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('prod-name').value;
    const price = parseFloat(document.getElementById('prod-price').value);
    const desc = document.getElementById('prod-desc').value;
    const category = document.getElementById('prod-category').value;
    let img = document.getElementById('prod-image').value || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600';

    const newProduct = { name, price, desc, category, img };
    customProducts.push(newProduct);
    localStorage.setItem('custom_products', JSON.stringify(customProducts));
    
    document.getElementById('add-product-form').reset();
    renderCustomProducts();
    setupFilters(); // إعادة تنشيط الفلتر للمنتجات الجديدة
    alert('تم نشر الحساب بنجاح في المتجر!');
});

function renderCustomProducts() {
    // إزالة أي حسابات مضافة سابقاً لمنع التكرار عند التحديث
    const dynamicItems = document.querySelectorAll('.custom-card');
    dynamicItems.forEach(item => item.remove());

    const grid = document.getElementById('products-grid');
    customProducts.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'product-card custom-card';
        card.setAttribute('data-category', prod.category);
        card.style.backgroundImage = `linear-gradient(to bottom, rgba(19, 26, 33, 0.85), rgba(11, 12, 16, 0.95)), url('${prod.img}')`;
        
        card.innerHTML = `
            <h3>${prod.name}</h3>
            <p class="price">${prod.price} $</p>
            <p class="desc">${prod.desc}</p>
            <button class="add-to-cart-btn" onclick="addToCart('${prod.name}', ${prod.price})"><i class="fa-solid fa-cart-plus"></i> إضافة للسلة</button>
            <button class="delete-admin-btn" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i> حذف من المتجر</button>
        `;
        grid.appendChild(card);
    });
}

function deleteProduct(index) {
    if(confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
        customProducts.splice(index, 1);
        localStorage.setItem('custom_products', JSON.stringify(customProducts));
        renderCustomProducts();
    }
}

// 4. السلة والواتساب
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">السلة فارغة حالياً</p>';
        document.getElementById('cart-total').innerText = '0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const itemEl = document.createElement('div');
        itemEl.style.display = 'flex';
        itemEl.style.justify = 'space-between';
        itemEl.style.marginBottom = '10px';
        itemEl.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} $ <i class="fa-solid fa-trash" style="color:#ff4757; cursor:pointer;" onclick="removeFromCart(${index})"></i></span>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    document.getElementById('cart-total').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    let phoneNumber = "249900863926"; 
    let message = "مرحباً متجر الحسابات، أريد شراء:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.price} $\n`;
        total += item.price;
    });
    message += `\n**الإجمالي:** ${total} $\nأرجو تزويدي بتفاصيل الدفع.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// 5. نظام تصفية الألعاب (الفلتر)
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            
            document.querySelectorAll('.product-card').forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// تشغيل عند تحميل الصفحة
renderCustomProducts();
setupFilters();
