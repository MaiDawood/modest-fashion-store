/* ============================================
   MAIN APPLICATION - Initialization & Events
   ============================================ */

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
    // Navbar hamburger menu
    initializeNavbar();

    // Home page featured products
    initializeHomePage();

    // Shop page
    initializeShopPage();

    // Product detail page
    initializeDetailPage();

    // Cart page
    initializeCartPage();

    // Checkout page
    initializeCheckoutPage();

    // Update cart counter
    updateCartCounter();
});

/* ============================================
   NAVBAR INITIALIZATION
   ============================================ */
function initializeNavbar() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Cart icon navigation
    const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
    if (cartIconWrapper) {
        cartIconWrapper.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }
}

/* ============================================
   HOME PAGE INITIALIZATION
   ============================================ */
function initializeHomePage() {
    const featuredContainer = document.querySelector('[data-products-container]');
    
    if (featuredContainer && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
        const featured = getFeaturedProducts();
        renderProducts(featured, '[data-products-container]');
    }
}

/* ============================================
   SHOP PAGE INITIALIZATION
   ============================================ */
function initializeShopPage() {
    if (window.location.pathname.includes('shop.html')) {
        // Get category from URL if exists
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');

        if (categoryParam) {
            const select = document.querySelector('[data-filter="category"]');
            if (select) {
                select.value = categoryParam;
                currentFilters.category = categoryParam;
            }
        }

        // Render initial products
        const filtered = applyFilters();
        renderProducts(filtered);
    }
}

/* ============================================
   PRODUCT DETAIL PAGE INITIALIZATION
   ============================================ */
function initializeDetailPage() {
    if (window.location.pathname.includes('product-detail.html')) {
        renderProductDetail();
    }
}

/* ============================================
   CART PAGE INITIALIZATION
   ============================================ */
function initializeCartPage() {
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
        renderCartSummary();
    }
}

/* ============================================
   CHECKOUT PAGE INITIALIZATION
   ============================================ */
function initializeCheckoutPage() {
    if (window.location.pathname.includes('checkout.html')) {
        // Display order items
        const orderItemsDiv = document.getElementById('order-items');
        const orderTotalSpan = document.getElementById('order-total');
        const finalTotalSpan = document.getElementById('final-total');

        if (orderItemsDiv) {
            const items = cart.getItems();
            const total = cart.getTotal();

            if (items.length === 0) {
                orderItemsDiv.innerHTML = `
                    <p style="text-align: center; color: var(--text-light);">سلتك فارغة</p>
                `;
            } else {
                orderItemsDiv.innerHTML = items.map(item => `
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 1rem;
                        padding-bottom: 1rem;
                        border-bottom: 1px solid var(--border-color);
                    ">
                        <span style="color: var(--text-dark);">
                            ${item.name}
                            <span style="color: var(--text-light); font-size: 0.9rem;">x${item.quantity}</span>
                        </span>
                        <span style="font-weight: 600; color: var(--primary-color);">
                            $${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                `).join('');
            }

            if (orderTotalSpan) {
                orderTotalSpan.textContent = `$${total.toFixed(2)}`;
            }
            if (finalTotalSpan) {
                finalTotalSpan.textContent = `$${total.toFixed(2)}`;
            }
        }

        // Handle checkout form submission
        const checkoutForm = document.querySelector('[data-checkout-form]');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', handleCheckoutSubmit);
        }
    }
}

/* ============================================
   CHECKOUT FORM SUBMISSION
   ============================================ */
function handleCheckoutSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const orderData = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        zip: formData.get('zip'),
        notes: formData.get('notes'),
        payment: formData.get('payment'),
        items: cart.getItems(),
        total: cart.getTotal(),
        date: new Date().toISOString()
    };

    // Validate required fields
    if (!orderData.fullname || !orderData.email || !orderData.phone || !orderData.address || !orderData.city) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
        showNotification('الرجاء إدخال بريد إلكتروني صحيح');
        return;
    }

    // Validate phone (basic validation)
    if (orderData.phone.length < 7) {
        showNotification('الرجاء إدخال رقم جوال صحيح');
        return;
    }

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('modest_fashion_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('modest_fashion_orders', JSON.stringify(orders));

    // Clear cart
    cart.clear();
    updateCartCounter();

    // Show success message and redirect
    showNotification('تم تأكيد الطلب بنجاح! ✓');

    setTimeout(() => {
        // Create and show thank you page
        showThankYouPage(orderData);
    }, 2000);
}

/* ============================================
   THANK YOU PAGE
   ============================================ */
function showThankYouPage(orderData) {
    const content = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>شكراً - الأمل للزي الشرعي</title>
            <link rel="stylesheet" href="css/styles.css">
        </head>
        <body>
            <div class="container" style="padding: 4rem 0;">
                <div style="
                    text-align: center;
                    padding: 3rem;
                    background-color: var(--light-accent);
                    border-radius: 12px;
                    max-width: 600px;
                    margin: 0 auto;
                ">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                    <h1 style="color: var(--text-dark); margin-bottom: 1rem;">شكراً لطلبك!</h1>
                    <p style="
                        font-size: 1.1rem;
                        color: var(--text-light);
                        margin-bottom: 2rem;
                    ">
                        تم استقبال طلبك برقم: <strong style="color: var(--primary-color);">#${Date.now()}</strong>
                    </p>

                    <div style="
                        background-color: var(--white);
                        padding: 2rem;
                        border-radius: 8px;
                        margin-bottom: 2rem;
                        border: 1px solid var(--border-color);
                    ">
                        <p style="color: var(--text-light); margin-bottom: 0.5rem;">سيتم التواصل معك على</p>
                        <p style="
                            font-weight: 600;
                            color: var(--text-dark);
                            margin-bottom: 1.5rem;
                            font-size: 1.1rem;
                        ">${orderData.email}</p>

                        <p style="
                            font-size: 0.95rem;
                            color: var(--text-light);
                            line-height: 1.8;
                        ">
                            سيتم معالجة طلبك في أقرب وقت، وسننقل لك تفاصيل الشحن قريباً.
                            <br><br>
                            شكراً لتفضلك بالتسوق من متجر الأمل للزي الشرعي! 💚
                        </p>
                    </div>

                    <div style="
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1rem;
                    ">
                        <a href="index.html" class="btn btn-primary btn-lg" style="display: block; text-decoration: none;">
                            الرئيسية
                        </a>
                        <a href="shop.html" class="btn btn-outline btn-lg" style="display: block; text-decoration: none;">
                            متابعة التسوق
                        </a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    document.open();
    document.write(content);
    document.close();
}

/* ============================================
   ADDITIONAL ANIMATIONS & EFFECTS
   ============================================ */

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(10px);
        }
    }
`;
document.head.appendChild(style);

// Mobile responsive adjustments
if (window.innerWidth < 768) {
    // Optimize for mobile
    document.documentElement.style.fontSize = '14px';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        // Close mobile menu on desktop
        const navbarMenu = document.querySelector('.navbar-menu');
        if (navbarMenu) {
            navbarMenu.classList.remove('active');
        }
    }
});
