/* ============================================
   FILTERING & SEARCHING - Product Filters
   ============================================ */

let currentFilters = {
    category: 'all',
    searchQuery: ''
};

// Apply filters
function applyFilters() {
    let filtered = productsData;

    // Category filter
    if (currentFilters.category && currentFilters.category !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilters.category);
    }

    // Search filter
    if (currentFilters.searchQuery) {
        const searchTerm = currentFilters.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

// Update category filter
function updateCategoryFilter(category) {
    currentFilters.category = category;
    applyAndRenderFilters();
}

// Update search filter
function updateSearchFilter(query) {
    currentFilters.searchQuery = query;
    applyAndRenderFilters();
}

// Apply filters and render
function applyAndRenderFilters() {
    const filtered = applyFilters();
    renderProducts(filtered);
}

// Setup filter event listeners
function setupFilterListeners() {
    // Category filter
    const categorySelect = document.querySelector('[data-filter="category"]');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            updateCategoryFilter(e.target.value);
        });
    }

    // Search filter
    const searchInput = document.querySelector('[data-filter="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            updateSearchFilter(e.target.value);
        });
    }

    // Price range filter (visual only, doesn't filter for now)
    const priceRange = document.querySelector('[data-filter="price-range"]');
    const priceDisplay = document.querySelector('[data-price-display]');
    if (priceRange && priceDisplay) {
        priceRange.addEventListener('input', (e) => {
            priceDisplay.textContent = `$${e.target.value}`;
        });
    }

    // Color filter buttons
    const colorButtons = document.querySelectorAll('[data-filter-color]');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(btn => btn.style.border = '2px solid #ddd');
            button.style.border = '2px solid var(--primary-color)';
        });
    });
}

// Initialize filters on shop page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('[data-products-container]') && 
        document.querySelector('[data-filter]')) {
        setupFilterListeners();
        applyAndRenderFilters();
    }
});
