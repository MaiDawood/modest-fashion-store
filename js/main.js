// Main Application Initialization

class App {
  constructor() {
    this.init();
  }

  init() {
    this.attachGlobalEventListeners();
    this.initializePages();
  }

  attachGlobalEventListeners() {
    // Cart icon click
    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-icon')) {
        window.location.href = 'cart.html';
      }
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]');
        if (email.value) {
          Toast.show('شكراً على الاشتراك!');
          email.value = '';
        }
      });
    }

    // Contact form
    const contactForm = document.querySelector('[data-contact-form]');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('تم إرسال رسالتك بنجاح');
        contactForm.reset();
      });
    }
  }

  initializePages() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch(currentPage) {
      case 'index.html':
      case '':
        this.initHomePage();
        break;
      case 'shop.html':
        this.initShopPage();
        break;
      case 'product-detail.html':
        this.initProductDetailPage();
        break;
      case 'cart.html':
        this.initCartPage();
        break;
      case 'checkout.html':
        this.initCheckoutPage();
        break;
    }
  }

  initHomePage() {
    // Initialize carousel if exists
    const carousel = new Carousel('[data-carousel]');
  }

  initShopPage() {
    // Filters are initialized in filters.js
  }

  initProductDetailPage() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId) {
      new ProductDetail(productId);
    }
  }

  initCartPage() {
    new CartPage();
  }

  initCheckoutPage() {
    new CheckoutPage();
  }
}

// Carousel Component
class Carousel {
  constructor(selector) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.currentIndex = 0;
    this.items = this.container.querySelectorAll('.carousel-item');
    this.dots = this.container.querySelectorAll('.carousel-dot');
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.showSlide(0);
    this.autoPlay();
  }

  attachEventListeners() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.currentIndex = index;
        this.showSlide(index);
        this.resetAutoPlay();
      });
    });
  }

  showSlide(index) {
    this.items.forEach((item, i) => {
      item.style.display = i === index ? 'block' : 'none';
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.showSlide(this.currentIndex);
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.autoPlay();
  }
}

// Product Detail Page
class ProductDetail {
  constructor(productId) {
    this.product = getProductById(productId);
    if (this.product) {
      this.init();
    }
  }

  init() {
    this.renderProductDetail();
    this.attachEventListeners();
  }

  renderProductDetail() {
    const container = document.querySelector('[data-product-detail]');
    if (!container) return;

    const colorsHTML = this.product.colors.map(color => 
      `<button class="color-option" data-color="${color}" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid #ddd; cursor: pointer; transition: all 0.2s;">${color}</button>`
    ).join('');

    const materialsHTML = this.product.materials.map(material => 
      `<button class="material-option" data-material="${material}" style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; transition: all 0.2s;">${material}</button>`
    ).join('');

    container.innerHTML = `
      <div class="grid grid-2" style="gap: 2rem;">
        <div>
          <div style="position: relative; aspect-ratio: 3/4; overflow: hidden; border-radius: 8px; background-color: #f5f5f5;">
            <img id="main-image" src="${this.product.image}" alt="${this.product.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="display: flex; gap: 10px; margin-top: 1rem;">
            ${this.product.images.map(img => `
              <img src="${img}" alt="thumbnail" style="width: 80px; height: 100px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;" class="thumbnail-image">
            `).join('')}
          </div>
        </div>
        <div>
          <h1>${this.product.name}</h1>
          <div style="display: flex; gap: 1rem; align-items: center; margin: 1rem 0;">
            <span style="font-size: 2rem; font-weight: bold; color: var(--primary-color);">\$${this.product.price}</span>
            ${this.product.originalPrice ? `<span style="text-decoration: line-through; color: #999; font-size: 1.2rem;">\$${this.product.originalPrice}</span>` : ''}
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin: 1rem 0; font-size: 1.1rem;">
            <span class="stars" style="color: #FFB800;">${'★'.repeat(Math.round(this.product.rating))}${'☆'.repeat(5 - Math.round(this.product.rating))}</span>
            <span>(${this.product.reviews} تقييم)</span>
          </div>
          <p style="color: var(--text-light); margin: 1.5rem 0;">${this.product.description}</p>
          
          <div style="margin: 2rem 0;">
            <label style="font-weight: 600; margin-bottom: 0.5rem; display: block;">الألوان المتاحة:</label>
            <div style="display: flex; gap: 10px;">${colorsHTML}</div>
          </div>
          
          <div style="margin: 2rem 0;">
            <label style="font-weight: 600; margin-bottom: 0.5rem; display: block;">نوع الخامة:</label>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">${materialsHTML}</div>
          </div>
          
          <div style="margin: 2rem 0;">
            <label style="font-weight: 600; margin-bottom: 0.5rem; display: block;">الكمية:</label>
            <div style="display: flex; gap: 10px; align-items: center;">
              <button id="decrease-qty" style="width: 40px; height: 40px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 1.2rem;">−</button>
              <input type="number" id="quantity" value="1" min="1" style="width: 60px; text-align: center; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              <button id="increase-qty" style="width: 40px; height: 40px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 1.2rem;">+</button>
            </div>
          </div>
          
          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button class="btn btn-primary btn-lg" id="add-to-cart-btn" style="flex: 1;">أضف للسلة</button>
            <button class="btn btn-outline btn-lg" id="add-to-wishlist-btn" style="flex: 1;">♡ المفضلة</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Image gallery
    document.querySelectorAll('.thumbnail-image').forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        document.getElementById('main-image').src = e.target.src;
      });
    });

    // Quantity
    const quantityInput = document.getElementById('quantity');
    document.getElementById('decrease-qty').addEventListener('click', () => {
      quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
    });
    document.getElementById('increase-qty').addEventListener('click', () => {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

    // Add to cart
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('quantity').value);
      cart.addItem(this.product, quantity);
      Toast.show(`تم إضافة ${this.product.name} للسلة`);
    });

    // Add to wishlist
    const wishlistBtn = document.getElementById('add-to-wishlist-btn');
    wishlistBtn.classList.toggle('btn-primary', wishlist.has(this.product.id));
    wishlistBtn.addEventListener('click', () => {
      wishlist.toggle(this.product);
      wishlistBtn.classList.toggle('btn-primary', wishlist.has(this.product.id));
      Toast.show(wishlist.has(this.product.id) ? 'تمت الإضافة للمفضلة' : 'تمت الإزالة من المفضلة');
    });
  }
}

// Cart Page
class CartPage {
  constructor() {
    this.init();
  }

  init() {
    this.render();
    cart.subscribe(() => this.render());
  }

  render() {
    const container = document.querySelector('[data-cart-items]');
    const items = cart.getItems();

    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🛒</div>
          <h2>السلة فارغة</h2>
          <p>لم تقم بإضافة أي منتجات بعد</p>
          <a href="shop.html" class="btn btn-primary" style="margin-top: 1rem;">تسوق الآن</a>
        </div>
      `;
      document.querySelector('[data-cart-summary]').innerHTML = '';
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
        <div class="flex" style="gap: 1rem;">
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 120px; object-fit: cover; border-radius: 4px;">
          <div style="flex: 1;">
            <h3>${item.name}</h3>
            <p style="color: var(--text-light); margin: 0.5rem 0;">السعر: \$${item.price}</p>
            <div style="display: flex; gap: 10px; align-items: center; margin: 1rem 0;">
              <button class="decrease-cart-qty" data-id="${item.id}" style="width: 32px; height: 32px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">−</button>
              <input type="number" class="cart-qty" data-id="${item.id}" value="${item.quantity}" min="1" style="width: 50px; text-align: center; padding: 4px; border: 1px solid #ddd; border-radius: 4px;">
              <button class="increase-cart-qty" data-id="${item.id}" style="width: 32px; height: 32px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">+</button>
              <span style="margin-left: auto; font-weight: 600;">\$${(item.price * item.quantity).toFixed(2)}</span>
              <button class="remove-cart-item" data-id="${item.id}" style="background: none; border: none; color: #dc3545; cursor: pointer; font-size: 1.2rem;">✕</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Update summary
    const total = cart.getTotal();
    document.querySelector('[data-cart-summary]').innerHTML = `
      <div class="card" style="padding: 1.5rem;">
        <h3 style="margin-bottom: 1rem;">ملخص الطلب</h3>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>عدد المنتجات:</span>
          <span>${items.length}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
          <span>الإجمالي:</span>
          <span style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">\$${total.toFixed(2)}</span>
        </div>
        <a href="checkout.html" class="btn btn-primary" style="width: 100%; text-align: center;">إتمام الطلب</a>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.increase-cart-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const qtyInput = document.querySelector(`.cart-qty[data-id="${id}"]`);
        cart.updateQuantity(parseInt(id), parseInt(qtyInput.value) + 1);
      });
    });

    document.querySelectorAll('.decrease-cart-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const qtyInput = document.querySelector(`.cart-qty[data-id="${id}"]`);
        cart.updateQuantity(parseInt(id), parseInt(qtyInput.value) - 1);
      });
    });

    document.querySelectorAll('.cart-qty').forEach(input => {
      input.addEventListener('change', () => {
        const id = input.dataset.id;
        cart.updateQuantity(parseInt(id), parseInt(input.value));
      });
    });

    // Remove buttons
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        cart.removeItem(id);
        Toast.show('تمت إزالة المنتج من السلة');
      });
    });
  }
}

// Checkout Page
class CheckoutPage {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    const checkoutForm = document.querySelector('[data-checkout-form]');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderId = Math.floor(Math.random() * 1000000);
        localStorage.setItem('lastOrder', JSON.stringify({
          id: orderId,
          date: new Date().toLocaleDateString('ar-SA'),
          total: cart.getTotal(),
          items: cart.getItems()
        }));
        cart.clear();
        window.location.href = 'order-confirmation.html?order=' + orderId;
      });
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}
