
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
        });
    }
    if(cartBtn) cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    if(closeCart) closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

    renderCustomProducts();
    setupFilters();

    const adminForm = document.getElementById('add-product-form');
    if(adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('prod-name').value;
            const price = parseFloat(document.getElementById('prod-price').value);
            const desc = document.getElementById('prod-desc').value;
            const category = document.getElementById('prod-category').value;
            let img = document.getElementById('prod-image').value || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600';

            let customProducts = JSON.parse(localStorage.getItem('custom_products')) || [];
            customProducts.push({ name, price, desc, category, img });
            localStorage.setItem('custom_products', JSON.stringify(customProducts));
            
            adminForm.reset();
            renderCustomProducts();
            setupFilters();
            alert('تم نشر الحساب بنجاح!');
        });
    }
});

function checkAdminAccess() {
    let password = prompt("أدخل الرمز السري للأدمن:");
    if (password === "1234") {
        document.getElementById('admin-panel').style.display = 'block';
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else if (password !== null) {
        alert("الرمز السري خاطئ!");
    }
}

function logoutAdmin() {
    document.getElementById('admin-panel').style.display = 'none';
}

function renderCustomProducts() {
    document.querySelectorAll('.custom-card').forEach(item => item.remove());
    const grid = document.getElementById('products-grid');
    if(!grid) return;

    let customProducts = JSON.parse(localStorage.getItem('custom_products')) || [];
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
            <button class="delete-admin-btn" onclick="deleteProduct(${index})" style="background:#ff4757;color:#fff;border:none;padding:5px;width:100%;border-radius:4px;margin-top:5px;"><i class="fa-solid fa-trash"></i> حذف الحساب</button>
        `;
        grid.appendChild(card);
    });
}

function deleteProduct(index) {
    if(confirm('حذف الحساب؟')) {
        let customProducts = JSON.parse(localStorage.getItem('custom_products')) || [];
        customProducts.splice(index, 1);
        localStorage.setItem('custom_products', JSON.stringify(customProducts));
        renderCustomProducts();
        setupFilters();
    }
}

let cart = [];
function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.justify = 'space-between';
        div.style.marginBottom = '10px';
        div.innerHTML = `<span>${item.name}</span><span>${item.price} $</span>`;
        container.appendChild(div);
    });
    document.getElementById('cart-total').innerText = total;
}

function checkoutToWhatsApp() {
    if (cart.length === 0) return alert('السلة فارغة!');
    let msg = "طلب شراء حسابات:\n";
    let total = 0;
    cart.forEach((item, i) => { msg += `${i+1}. ${item.name} - ${item.price} $\n`; total += item.price; });
    msg += `\nالإجمالي: ${total} $`;
    window.open(`https://wa.me/249900863926?text=${encodeURIComponent(msg)}`, '_blank');
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            const val = btn.getAttribute('data-filter');
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = (val === 'all' || card.getAttribute('data-category') === val) ? 'block' : 'none';
            });
        });
    });
}
