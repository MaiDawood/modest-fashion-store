// Product Filtering & Display

class ProductFilter {
  constructor() {
    this.currentFilters = {
      category: 'all',
      minPrice: 0,
      maxPrice: 500,
      search: '',
      color: '',
      material: ''
    };
    this.currentSort = 'newest';
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.applyFilters();
  }

  attachEventListeners() {
    // Category filter
    const categorySelect = document.querySelector('[data-filter="category"]');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.currentFilters.category = e.target.value;
        this.applyFilters();
      });
    }

    // Price range filter
    const minPriceInput = document.querySelector('[data-filter="min-price"]');
    const maxPriceInput = document.querySelector('[data-filter="max-price"]');
    const priceRangeSlider = document.querySelector('[data-filter="price-range"]');

    if (minPriceInput) {
      minPriceInput.addEventListener('change', (e) => {
        this.currentFilters.minPrice = parseInt(e.target.value) || 0;
        this.applyFilters();
      });
    }

    if (maxPriceInput) {
      maxPriceInput.addEventListener('change', (e) => {
        this.currentFilters.maxPrice = parseInt(e.target.value) || 500;
        this.applyFilters();
      });
    }

    if (priceRangeSlider) {
      priceRangeSlider.addEventListener('input', (e) => {
        this.currentFilters.maxPrice = parseInt(e.target.value);
        const displayValue = document.querySelector('[data-price-display]');
        if (displayValue) {
          displayValue.textContent = `$${this.currentFilters.maxPrice}`;
        }
        this.applyFilters();
      });
    }

    // Search
    const searchInput = document.querySelector('[data-filter="search"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.currentFilters.search = e.target.value;
        this.applyFilters();
      });
    }

    // Color filter
    const colorButtons = document.querySelectorAll('[data-filter-color]');
    colorButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        colorButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilters.color = e.target.dataset.filterColor;
        this.applyFilters();
      });
    });

    // Material filter
    const materialButtons = document.querySelectorAll('[data-filter-material]');
    materialButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        materialButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilters.material = e.target.dataset.filterMaterial;
        this.applyFilters();
      });
    });

    // Sorting
    const sortSelect = document.querySelector('[data-sort]');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    let filtered = filterProducts(this.currentFilters);
    filtered = sortProducts(filtered, this.currentSort);
    this.displayProducts(filtered);
  }

  displayProducts(productsToDisplay) {
    const container = document.querySelector('[data-products-container]');
    if (!container) return;

    if (productsToDisplay.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon">🔍</div>
          <h2>لم نجد منتجات</h2>
          <p>جرب تغيير معايير البحث أو الفلترة</p>
        </div>
      `;
      return;
    }

    container.innerHTML = productsToDisplay.map(product => `
      <div class="card product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">
            $${product.price}
            ${product.originalPrice ? `<span style="font-size: 0.8em; color: #999; text-decoration: line-through; margin-right: 8px;">$${product.originalPrice}</span>` : ''}
          </div>
          <div class="product-rating">
            <span class="stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span>(${product.reviews})</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary btn-add-cart" data-add-to-cart="${product.id}">
              أضف للسلة
            </button>
            <button class="btn btn-wishlist ${wishlist.has(product.id) ? 'active' : ''}" data-toggle-wishlist="${product.id}">
              ♡
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach event listeners
    this.attachProductEventListeners();
  }

  attachProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(btn.dataset.addToCart);
        const product = getProductById(productId);
        if (product) {
          cart.addItem(product);
          Toast.show(`تم إضافة ${product.name} للسلة`);
          btn.textContent = 'تمت الإضافة ✓';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = 'أضف للسلة';
            btn.disabled = false;
          }, 1500);
        }
      });
    });

    // Wishlist buttons
    document.querySelectorAll('[data-toggle-wishlist]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(btn.dataset.toggleWishlist);
        const product = getProductById(productId);
        if (product) {
          wishlist.toggle(product);
          btn.classList.toggle('active');
          if (wishlist.has(productId)) {
            Toast.show('تمت الإضافة للمفضلة');
          }
        }
      });
    });

    // Product card clicks
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('[data-add-to-cart]') && !e.target.closest('[data-toggle-wishlist]')) {
          const productId = card.dataset.productId;
          window.location.href = `product-detail.html?id=${productId}`;
        }
      });
    });
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('[data-products-container]') || document.querySelector('[data-filter]')) {
      new ProductFilter();
    }
  });
} else {
  if (document.querySelector('[data-products-container]') || document.querySelector('[data-filter]')) {
    new ProductFilter();
  }
}
