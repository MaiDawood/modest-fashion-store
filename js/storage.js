// Shopping Cart Management

class ShoppingCart {
  constructor() {
    this.items = this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addItem(product, quantity = 1, options = {}) {
    const existingItem = this.items.find(item => 
      item.id === product.id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        options
      });
    }

    this.saveToStorage();
    this.notifyListeners();
  }

  removeItem(id, options = {}) {
    this.items = this.items.filter(item => 
      !(item.id === id && JSON.stringify(item.options) === JSON.stringify(options))
    );
    this.saveToStorage();
    this.notifyListeners();
  }

  updateQuantity(id, quantity, options = {}) {
    const item = this.items.find(item => 
      item.id === id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id, options);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.notifyListeners();
      }
    }
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  getItems() {
    return this.items;
  }

  listeners = [];

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }
}

// Create global cart instance
const cart = new ShoppingCart();

// Wishlist Management
class Wishlist {
  constructor() {
    this.items = this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  }

  saveToStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }

  addItem(product) {
    if (!this.items.find(item => item.id === product.id)) {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: new Date()
      });
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  toggle(product) {
    if (this.has(product.id)) {
      this.removeItem(product.id);
    } else {
      this.addItem(product);
    }
  }

  has(id) {
    return this.items.some(item => item.id === id);
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  listeners = [];

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.items));
  }
}

// Create global wishlist instance
const wishlist = new Wishlist();
