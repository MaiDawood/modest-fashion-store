/* ============================================
   UI RENDERING - Product Display and Cart
   ============================================ */

// Render products grid
function renderProducts(products, containerId = '[data-products-container]') {
    const container = document.querySelector(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
                <p style="font-size: 1.2rem; color: var(--text-light);">لا توجد منتجات مطابقة</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="card fade-in" style="cursor: pointer; transition: all 0.3s ease;">
            <div style="
                font-size: 4rem;
                text-align: center;
                margin-bottom: 1rem;
                min-height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--light-accent);
                border-radius: 8px;
            ">
                ${product.image}
            </div>
            <div class="card-body">
                <h3 style="margin-bottom: 0.5rem; color: var(--text-dark);">${product.name}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="
                        font-size: 1.25rem;
                        font-weight: bold;
                        color: var(--primary-color);
                    ">
                        $${product.price.toFixed(2)}
                    </span>
                    <span style="
                        font-size: 0.9rem;
                        color: #FFB800;
                    ">
                        ⭐ ${product.rating} (${product.reviews})
                    </span>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-primary" style="flex: 1; padding: 0.75rem;" onclick="addToCartQuick(${product.id})">
                        أضيفي للسلة
                    </button>
                    <button class="btn btn-outline" style="flex: 1; padding: 0.75rem;" onclick="viewProductDetail(${product.id})">
                        التفاصيل
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Quick add to cart
function addToCartQuick(productId, quantity = 1) {
    const product = getProductById(productId);
    if (product) {
        cart.addItem(product, quantity);
        updateCartCounter();
        showNotification('تم إضافة المنتج للسلة بنجاح! ✓');
    }
}

// View product details
function viewProductDetail(productId) {
    // Store the product ID in URL params
    window.location.href = `product-detail.html?id=${productId}`;
}

// Render product detail page
function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = getProductById(productId);

    if (!product) {
        document.querySelector('[data-product-detail]').innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: var(--text-light);">المنتج غير موجود</p>
            </div>
        `;
        return;
    }

    const container = document.querySelector('[data-product-detail]');
    const quantity = cart.getItemQuantity(productId);

    container.innerHTML = `
        <div style="
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
        ">
            <!-- Product Image -->
            <div style="
                background-color: var(--light-accent);
                border-radius: 12px;
                padding: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 400px;
            ">
                <div style="font-size: 8rem;">
                    ${product.image}
                </div>
            </div>

            <!-- Product Info -->
            <div style="padding: 1rem;">
                <h1 style="margin-bottom: 1rem; color: var(--text-dark);">${product.name}</h1>
                
                <!-- Rating -->
                <div style="margin-bottom: 1.5rem;">
                    <span style="
                        font-size: 1.1rem;
                        color: #FFB800;
                        margin-left: 0.5rem;
                    ">
                        ⭐ ${product.rating}
                    </span>
                    <span style="color: var(--text-light);">
                        (${product.reviews} تقييم)
                    </span>
                </div>

                <!-- Price -->
                <div style="
                    background-color: var(--light-accent);
                    padding: 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                ">
                    <div style="
                        font-size: 1.3rem;
                        font-weight: bold;
                        color: var(--primary-color);
                    ">
                        $${product.price.toFixed(2)}
                    </div>
                </div>

                <!-- Category & Stock -->
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 2rem;
                ">
                    <div>
                        <p style="color: var(--text-light); margin-bottom: 0.25rem;">الفئة</p>
                        <p style="font-weight: 600; color: var(--text-dark);">${product.category}</p>
                    </div>
                    <div>
                        <p style="color: var(--text-light); margin-bottom: 0.25rem;">التوفر</p>
                        <p style="font-weight: 600; color: var(--success-color);">متوفر</p>
                    </div>
                </div>

                <!-- Quantity Selector -->
                <div style="margin-bottom: 2rem;">
                    <label style="
                        display: block;
                        margin-bottom: 0.75rem;
                        font-weight: 600;
                        color: var(--text-dark);
                    ">
                        الكمية
                    </label>
                    <div style="
                        display: flex;
                        align-items: center;
                        border: 2px solid var(--border-color);
                        border-radius: 8px;
                        width: fit-content;
                    ">
                        <button onclick="updateDetailQuantity(-1)" style="
                            width: 40px;
                            height: 40px;
                            border: none;
                            background: none;
                            cursor: pointer;
                            font-size: 1.2rem;
                            color: var(--text-dark);
                        ">−</button>
                        <input type="number" id="detail-quantity" value="1" min="1" style="
                            width: 60px;
                            border: none;
                            text-align: center;
                            font-size: 1rem;
                            font-weight: 600;
                            border-left: 2px solid var(--border-color);
                            border-right: 2px solid var(--border-color);
                        " readonly>
                        <button onclick="updateDetailQuantity(1)" style="
                            width: 40px;
                            height: 40px;
                            border: none;
                            background: none;
                            cursor: pointer;
                            font-size: 1.2rem;
                            color: var(--text-dark);
                        ">+</button>
                    </div>
                </div>

                <!-- Buttons -->
                <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 2rem;
                ">
                    <button class="btn btn-primary btn-lg" onclick="addDetailToCart(${productId})" style="width: 100%;">
                        أضيفي للسلة
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="history.back()" style="width: 100%;">
                        رجوع
                    </button>
                </div>
            </div>
        </div>
    `;

    // Render related products
    renderRelatedProducts(productId);
}

// Update quantity in detail page
function updateDetailQuantity(change) {
    const input = document.getElementById('detail-quantity');
    const newValue = Math.max(1, parseInt(input.value) + change);
    input.value = newValue;
}

// Add to cart from detail page
function addDetailToCart(productId) {
    const quantity = parseInt(document.getElementById('detail-quantity').value) || 1;
    const product = getProductById(productId);
    if (product) {
        cart.addItem(product, quantity);
        updateCartCounter();
        showNotification('تم إضافة المنتج للسلة! ✓');
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1500);
    }
}

// Render related products
function renderRelatedProducts(productId) {
    const relatedProducts = getRelatedProducts(productId);
    const container = document.getElementById('related-products');

    if (!container) return;

    if (relatedProducts.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">لا توجد منتجات ذات صلة</p>';
        return;
    }

    container.innerHTML = relatedProducts.map(product => `
        <div class="card fade-in" style="cursor: pointer;">
            <div style="
                font-size: 3rem;
                text-align: center;
                margin-bottom: 1rem;
                background-color: var(--light-accent);
                padding: 1.5rem;
                border-radius: 8px;
            ">
                ${product.image}
            </div>
            <div class="card-body">
                <h4 style="margin-bottom: 0.5rem;">${product.name}</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: var(--primary-color); font-weight: bold;">$${product.price.toFixed(2)}</span>
                    <span style="color: #FFB800;">⭐ ${product.rating}</span>
                </div>
                <button class="btn btn-primary btn-sm" onclick="addToCartQuick(${product.id})" style="width: 100%;">
                    أضيفي للسلة
                </button>
            </div>
        </div>
    `).join('');
}

// Render cart items
function renderCartItems() {
    const container = document.querySelector('[data-cart-items]');
    const items = cart.getItems();

    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <div style="
                text-align: center;
                padding: 3rem 1rem;
                background-color: var(--light-accent);
                border-radius: 8px;
            ">
                <p style="font-size: 1.5rem; margin-bottom: 1rem;">🛍️</p>
                <p style="font-size: 1.1rem; color: var(--text-dark); margin-bottom: 1rem;">سلتك فارغة</p>
                <a href="shop.html" class="btn btn-primary">تصفحي المتجر</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden;">
            ${items.map(item => `
                <div style="
                    display: grid;
                    grid-template-columns: 100px 1fr auto;
                    gap: 1.5rem;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                " class="fade-in">
                    <!-- Product Image -->
                    <div style="
                        font-size: 3rem;
                        text-align: center;
                        background-color: var(--light-accent);
                        padding: 1rem;
                        border-radius: 8px;
                    ">
                        ${item.image}
                    </div>

                    <!-- Product Info -->
                    <div>
                        <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">${item.name}</h4>
                        <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 1rem;">${item.category}</p>
                        
                        <!-- Quantity Controls (Mobile-friendly) -->
                        <div style="
                            display: flex;
                            align-items: center;
                            border: 1px solid var(--border-color);
                            border-radius: 6px;
                            width: fit-content;
                            background-color: var(--light-accent);
                        ">
                            <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="
                                width: 36px;
                                height: 36px;
                                border: none;
                                background: none;
                                cursor: pointer;
                                font-size: 1rem;
                                color: var(--text-dark);
                            ">−</button>
                            <span style="
                                min-width: 36px;
                                text-align: center;
                                font-weight: 600;
                                border-left: 1px solid var(--border-color);
                                border-right: 1px solid var(--border-color);
                                color: var(--text-dark);
                            ">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="
                                width: 36px;
                                height: 36px;
                                border: none;
                                background: none;
                                cursor: pointer;
                                font-size: 1rem;
                                color: var(--text-dark);
                            ">+</button>
                        </div>
                    </div>

                    <!-- Price & Delete -->
                    <div style="text-align: right;">
                        <p style="
                            font-size: 1.25rem;
                            font-weight: bold;
                            color: var(--primary-color);
                            margin-bottom: 1rem;
                        ">
                            $${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button onclick="removeFromCart(${item.id})" style="
                            background-color: transparent;
                            border: none;
                            color: var(--error-color);
                            cursor: pointer;
                            font-size: 1.2rem;
                            transition: all 0.3s;
                        " title="حذف">🗑️</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render cart summary
function renderCartSummary() {
    const container = document.querySelector('[data-cart-summary]');
    const items = cart.getItems();
    const total = cart.getTotal();

    if (!container) return;

    container.innerHTML = `
        <div class="card" style="height: fit-content; position: sticky; top: 100px;">
            <h3 style="margin-bottom: 1.5rem; color: var(--text-dark);">ملخص السلة</h3>
            
            <div style="margin-bottom: 1.5rem;">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--border-color);
                ">
                    <span style="color: var(--text-light);">عدد المنتجات</span>
                    <span style="font-weight: 600; color: var(--text-dark);">${items.length}</span>
                </div>
                
                <div style="
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--border-color);
                ">
                    <span style="color: var(--text-light);">الإجمالي</span>
                    <span style="font-weight: 600; color: var(--text-dark);">$${total.toFixed(2)}</span>
                </div>

                <div style="
                    display: flex;
                    justify-content: space-between;
                    padding-top: 0.75rem;
                ">
                    <span style="color: var(--text-light);">الشحن</span>
                    <span style="font-weight: 600; color: var(--success-color);">مجاني</span>
                </div>
            </div>

            <div style="
                display: flex;
                justify-content: space-between;
                padding: 1rem;
                background-color: var(--light-accent);
                border-radius: 8px;
                margin-bottom: 1.5rem;
            ">
                <span style="font-weight: 600; color: var(--text-dark);">المجموع النهائي</span>
                <span style="
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary-color);
                ">$${total.toFixed(2)}</span>
            </div>

            <button class="btn btn-primary btn-lg" onclick="proceedToCheckout()" style="width: 100%; margin-bottom: 0.75rem;">
                اذهبي للدفع
            </button>

            <button class="btn btn-outline btn-lg" onclick="clearCartConfirm()" style="width: 100%;">
                فرّغي السلة
            </button>

            <a href="shop.html" class="btn btn-outline btn-lg" style="width: 100%; margin-top: 0.75rem; display: block; text-align: center;">
                متابعة التسوق
            </a>
        </div>
    `;
}

// Update cart quantity
function updateCartQuantity(productId, newQuantity) {
    cart.updateQuantity(productId, newQuantity);
    updateCartCounter();
    renderCartItems();
    renderCartSummary();
}

// Remove from cart
function removeFromCart(productId) {
    cart.removeItem(productId);
    updateCartCounter();
    renderCartItems();
    renderCartSummary();
    showNotification('تم حذف المنتج من السلة');
}

// Clear cart with confirmation
function clearCartConfirm() {
    if (confirm('هل أنتِ متأكدة من رغبتك في تفريغ السلة؟')) {
        cart.clear();
        updateCartCounter();
        renderCartItems();
        renderCartSummary();
        showNotification('تم تفريغ السلة');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.getItems().length === 0) {
        showNotification('السلة فارغة!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
