// 1. برمجة زر السلة والوضع الداكن
const themeToggle = document.getElementById('theme-toggle');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
});

cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));

// 2. مصفوفة السلة والعمليات عليها
let cart = [];

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

// 3. إرسال الطلب بالكامل للواتساب
function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert('السلة فارغة، أضف بعض الحسابات أولاً!');
        return;
    }
    
    let phoneNumber = "249900863926"; // رقمك المجهز تلقائياً
    let message = "مرحباً متجر الحسابات، أريد شراء الحسابات التالية:\n\n";
    let total = 0;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - بسعر: ${item.price} $\n`;
        total += item.price;
    });
    
    message += `\n**إجمالي السعر:** ${total} $\nأرجو تزويدي بتفاصيل الدفع والتسليم.`;
    
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// 4. نظام تصفية الألعاب الفوري (Filter)
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
