// Product Database - Mock Data
const products = [
  {
    id: 1,
    name: 'حجاب سوري فاخر',
    price: 45,
    originalPrice: 65,
    category: 'hijabs',
    image: 'https://images.unsplash.com/photo-1608270861620-7191acc422f1?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608270861620-7191acc422f1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-6e623b92b011?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=500&fit=crop'
    ],
    colors: ['أسود', 'بيج', 'رمادي'],
    materials: ['حرير', 'قطن'],
    description: 'حجاب سوري أصلي من أجود أنواع الخامات، مريح وسهل التنسيق',
    rating: 4.8,
    reviews: 120,
    inStock: true
  },
  {
    id: 2,
    name: 'عباية سوداء كلاسيكية',
    price: 120,
    originalPrice: 180,
    category: 'abayas',
    image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606402412562-e1505073ecc6?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515707827202-f1e0b61a6c1b?w=400&h=500&fit=crop'
    ],
    colors: ['أسود', 'بني'],
    materials: ['حرير', 'إيطالي'],
    description: 'عباية سوداء فاخرة بتفاصيل دقيقة وراقية',
    rating: 4.9,
    reviews: 250,
    inStock: true
  },
  {
    id: 3,
    name: 'نقاب أنيق',
    price: 35,
    originalPrice: 50,
    category: 'niqabs',
    image: 'https://images.unsplash.com/photo-1616987695869-4b56bc96d5d1?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616987695869-4b56bc96d5d1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1618995590236-8d4f9fae88b8?w=400&h=500&fit=crop'
    ],
    colors: ['أسود', 'أزرق غامق'],
    materials: ['قطن', 'حرير'],
    description: 'نقاب أنيق وسهل الاستخدام مع أفضل الخامات',
    rating: 4.6,
    reviews: 85,
    inStock: true
  },
  {
    id: 4,
    name: 'حجاب منقوش',
    price: 55,
    originalPrice: 75,
    category: 'hijabs',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1585399622059-0b86dd9c11e0?w=400&h=500&fit=crop'
    ],
    colors: ['ملون', 'أسود'],
    materials: ['قطن', 'بوليستر'],
    description: 'حجاب بتصاميم منقوشة جميلة وألوان زاهية',
    rating: 4.7,
    reviews: 150,
    inStock: true
  },
  {
    id: 5,
    name: 'عباية تركية فاخرة',
    price: 150,
    originalPrice: 220,
    category: 'abayas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1604689007636-cb0f77549b57?w=400&h=500&fit=crop'
    ],
    colors: ['بيج', 'بني', 'أسود'],
    materials: ['حرير تركي', 'قطن'],
    description: 'عباية تركية فاخرة بتصميم حديث وراقي',
    rating: 4.9,
    reviews: 200,
    inStock: true
  },
  {
    id: 6,
    name: 'إكسسوار حجاب ذهبي',
    price: 25,
    originalPrice: 40,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop'
    ],
    colors: ['ذهبي', 'فضي'],
    materials: ['معادن'],
    description: 'إكسسوار حجاب فاخر بتصاميم متعددة',
    rating: 4.5,
    reviews: 90,
    inStock: true
  },
  {
    id: 7,
    name: 'عباية بيضاء رقيقة',
    price: 90,
    originalPrice: 140,
    category: 'abayas',
    image: 'https://images.unsplash.com/photo-1611871437281-460bfbe1220a?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611871437281-460bfbe1220a?w=400&h=500&fit=crop'
    ],
    colors: ['أبيض', 'كريم'],
    materials: ['شيفون', 'حرير'],
    description: 'عباية بيضاء رقيقة وخفيفة مناسبة للصيف',
    rating: 4.7,
    reviews: 110,
    inStock: true
  },
  {
    id: 8,
    name: 'حجاب قطني ناعم',
    price: 30,
    originalPrice: 45,
    category: 'hijabs',
    image: 'https://images.unsplash.com/photo-1585142746853-a591e9e5e7ba?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585142746853-a591e9e5e7ba?w=400&h=500&fit=crop'
    ],
    colors: ['أسود', 'رمادي', 'بني'],
    materials: ['قطن 100%'],
    description: 'حجاب قطني ناعم مشهور وسهل العناية',
    rating: 4.8,
    reviews: 180,
    inStock: true
  },
  {
    id: 9,
    name: 'نقاب بالستك مريح',
    price: 20,
    originalPrice: 30,
    category: 'niqabs',
    image: 'https://images.unsplash.com/photo-1609861362621-7a5d6c60c95d?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1609861362621-7a5d6c60c95d?w=400&h=500&fit=crop'
    ],
    colors: ['أسود'],
    materials: ['بالستيك مرن'],
    description: 'نقاب بالستيكي مريح وسهل التنظيف',
    rating: 4.4,
    reviews: 65,
    inStock: true
  },
  {
    id: 10,
    name: 'شنطة يد أنيقة',
    price: 80,
    originalPrice: 120,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop'
    ],
    colors: ['أسود', 'بني'],
    materials: ['جلد'],
    description: 'شنطة يد جلدية أنيقة وفسيحة',
    rating: 4.7,
    reviews: 130,
    inStock: true
  },
  {
    id: 11,
    name: 'حجاب حرير فاخر',
    price: 70,
    originalPrice: 100,
    category: 'hijabs',
    image: 'https://images.unsplash.com/photo-1611689956112-73dc99e5b00f?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611689956112-73dc99e5b00f?w=400&h=500&fit=crop'
    ],
    colors: ['بيج', 'وردي فاتح'],
    materials: ['حرير خالص'],
    description: 'حجاب حرير فاخر بجودة عالية جداً',
    rating: 4.9,
    reviews: 210,
    inStock: true
  },
  {
    id: 12,
    name: 'عباية بتطريزات ذهبية',
    price: 180,
    originalPrice: 280,
    category: 'abayas',
    image: 'https://images.unsplash.com/photo-1584455895917-e921e4df7f9b?w=400&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584455895917-e921e4df7f9b?w=400&h=500&fit=crop'
    ],
    colors: ['أسود'],
    materials: ['حرير بتطريزات'],
    description: 'عباية فاخرة بتطريزات ذهبية دقيقة',
    rating: 5,
    reviews: 95,
    inStock: false
  }
];

// Utility Functions
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

function filterProducts(filters) {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.color) {
    filtered = filtered.filter(p => p.colors.includes(filters.color));
  }

  if (filters.material) {
    filtered = filtered.filter(p => p.materials.includes(filters.material));
  }

  return filtered;
}

function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch(sortBy) {
    case 'newest':
      return sorted;
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, getProductById, getProductsByCategory, filterProducts, sortProducts };
}
