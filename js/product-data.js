/* ============================================
   PRODUCT DATA - Sample Products
   ============================================ */

const productsData = [
    // عبايات (Abayas) - Category 1
    {
        id: 1,
        name: 'عباية سوداء فاخرة',
        price: 149.99,
        category: 'عبايات',
        image: '👗',
        rating: 4.8,
        reviews: 125
    },
    {
        id: 2,
        name: 'عباية بيج كلاسيكية',
        price: 129.99,
        category: 'عبايات',
        image: '👗',
        rating: 4.6,
        reviews: 98
    },
    {
        id: 3,
        name: 'عباية رمادية حديثة',
        price: 139.99,
        category: 'عبايات',
        image: '👗',
        rating: 4.7,
        reviews: 112
    },
    {
        id: 4,
        name: 'عباية بنية فاخرة',
        price: 159.99,
        category: 'عبايات',
        image: '👗',
        rating: 4.9,
        reviews: 156
    },

    // اطقم (Sets) - Category 2
    {
        id: 5,
        name: 'طقم حجاب وعباية أسود',
        price: 189.99,
        category: 'اطقم',
        image: '👚',
        rating: 4.7,
        reviews: 145
    },
    {
        id: 6,
        name: 'طقم حجاب وعباية بيج',
        price: 179.99,
        category: 'اطقم',
        image: '👚',
        rating: 4.8,
        reviews: 167
    },
    {
        id: 7,
        name: 'طقم فستان وحجاب رمادي',
        price: 169.99,
        category: 'اطقم',
        image: '👚',
        rating: 4.6,
        reviews: 134
    },
    {
        id: 8,
        name: 'طقم ثلاثي بني وسكري',
        price: 199.99,
        category: 'اطقم',
        image: '👚',
        rating: 4.9,
        reviews: 189
    },

    // اسدالات (Scarves/Drapes) - Category 3
    {
        id: 9,
        name: 'إسدال أسود حرير',
        price: 49.99,
        category: 'اسدالات',
        image: '🧣',
        rating: 4.5,
        reviews: 78
    },
    {
        id: 10,
        name: 'إسدال بيج ناعم',
        price: 45.99,
        category: 'اسدالات',
        image: '🧣',
        rating: 4.4,
        reviews: 65
    },
    {
        id: 11,
        name: 'إسدال رمادي فاخر',
        price: 54.99,
        category: 'اسدالات',
        image: '🧣',
        rating: 4.7,
        reviews: 92
    },
    {
        id: 12,
        name: 'إسدال بني مزخرف',
        price: 59.99,
        category: 'اسدالات',
        image: '🧣',
        rating: 4.6,
        reviews: 105
    },

    // شالات (Shawls) - Category 4
    {
        id: 13,
        name: 'شالة سوداء فخمة',
        price: 69.99,
        category: 'شالات',
        image: '🧠',
        rating: 4.8,
        reviews: 142
    },
    {
        id: 14,
        name: 'شالة بيج ناعمة',
        price: 64.99,
        category: 'شالات',
        image: '🧠',
        rating: 4.5,
        reviews: 88
    },
    {
        id: 15,
        name: 'شالة رمادية مزخرفة',
        price: 74.99,
        category: 'شالات',
        image: '🧠',
        rating: 4.7,
        reviews: 118
    },
    {
        id: 16,
        name: 'شالة بنية مخملية',
        price: 79.99,
        category: 'شالات',
        image: '🧠',
        rating: 4.9,
        reviews: 167
    },

    // مكملات حجاب (Hijab Accessories) - Category 5
    {
        id: 17,
        name: 'دبابيس حجاب ذهبية',
        price: 9.99,
        category: 'مكملات حجاب',
        image: '✨',
        rating: 4.4,
        reviews: 234
    },
    {
        id: 18,
        name: 'حزام حجاب أسود',
        price: 19.99,
        category: 'مكملات حجاب',
        image: '✨',
        rating: 4.6,
        reviews: 156
    },
    {
        id: 19,
        name: 'مشابك حجاب فضية',
        price: 14.99,
        category: 'مكملات حجاب',
        image: '✨',
        rating: 4.7,
        reviews: 201
    },
    {
        id: 20,
        name: 'ربطة حجاب مزخرفة',
        price: 24.99,
        category: 'مكملات حجاب',
        image: '✨',
        rating: 4.8,
        reviews: 189
    }
];

// Get all unique categories
function getCategories() {
    return [...new Set(productsData.map(product => product.category))];
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return productsData;
    }
    return productsData.filter(product => product.category === category);
}

// Get product by ID
function getProductById(id) {
    return productsData.find(product => product.id === parseInt(id));
}

// Search products by name
function searchProducts(query) {
    if (!query || query.trim() === '') {
        return productsData;
    }
    const searchTerm = query.toLowerCase().trim();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
}

// Get featured products (top rated)
function getFeaturedProducts() {
    return productsData
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8);
}

// Get related products (same category, different product)
function getRelatedProducts(productId, limit = 4) {
    const currentProduct = getProductById(productId);
    if (!currentProduct) return [];
    
    return productsData
        .filter(product => 
            product.category === currentProduct.category && 
            product.id !== productId
        )
        .slice(0, limit);
}
