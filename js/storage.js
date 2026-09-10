/* ============================================
   SHOPPING CART - LocalStorage Management
   ============================================ */

const STORAGE_KEY = 'modest_fashion_cart';

const cart = {
    // Initialize cart from localStorage
    init() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Get all cart items
    getItems() {
        return this.init();
    },

    // Add or update item in cart
    addItem(product, quantity = 1) {
        const items = this.init();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
                quantity: quantity
            });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return items;
    },

    // Update quantity
    updateQuantity(productId, quantity) {
        const items = this.init();
        const item = items.find(item => item.id === productId);

        if (item) {
            if (quantity <= 0) {
                return this.removeItem(productId);
            }
            item.quantity = quantity;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }

        return items;
    },

    // Remove item from cart
    removeItem(productId) {
        let items = this.init();
        items = items.filter(item => item.id !== productId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return items;
    },

    // Clear entire cart
    clear() {
        localStorage.removeItem(STORAGE_KEY);
        return [];
    },

    // Get total number of items
    getItemCount() {
        const items = this.init();
        return items.reduce((sum, item) => sum + item.quantity, 0);
    },

    // Get cart total price
    getTotal() {
        const items = this.init();
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Check if product is in cart
    hasItem(productId) {
        const items = this.init();
        return items.some(item => item.id === productId);
    },

    // Get quantity of specific product
    getItemQuantity(productId) {
        const items = this.init();
        const item = items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }
};

// Update cart counter in navbar
function updateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = cart.getItemCount();

    if (cartCount) {
        if (itemCount > 0) {
            cartCount.textContent = itemCount;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Update cart counter on page load and when cart changes
document.addEventListener('DOMContentLoaded', updateCartCounter);
