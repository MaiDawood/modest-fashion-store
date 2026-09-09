// Navigation & UI Interactions

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navbarContainer = document.querySelector('.navbar-container');
    this.navbarMenu = document.querySelector('.navbar-menu');
    this.navbarToggle = document.querySelector('.navbar-toggle');
    this.navbarItems = document.querySelectorAll('.navbar-item');
    this.currentPage = this.getCurrentPage();
    
    this.init();
  }

  init() {
    // Set active nav item
    this.setActiveNavItem();

    // Mobile menu toggle
    if (this.navbarToggle) {
      this.navbarToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close menu when clicking nav items
    this.navbarItems.forEach(item => {
      const link = item.querySelector('.navbar-link');
      if (link) {
        link.addEventListener('click', () => {
          this.navbarMenu.classList.remove('active');
          this.navbarToggle.classList.remove('active');
        });
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbarContainer.contains(e.target) && this.navbarMenu.classList.contains('active')) {
        this.navbarMenu.classList.remove('active');
        this.navbarToggle.classList.remove('active');
      }
    });

    // Update cart count
    this.updateCartCount();
    cart.subscribe(() => this.updateCartCount());
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename;
  }

  setActiveNavItem() {
    this.navbarItems.forEach(item => {
      item.classList.remove('active');
      const link = item.querySelector('.navbar-link');
      if (link) {
        const href = link.getAttribute('href');
        if (href === this.currentPage || 
            (this.currentPage === '' && href === 'index.html') ||
            (href && window.location.pathname.includes(href.replace('.html', '')))) {
          item.classList.add('active');
        }
      }
    });
  }

  toggleMobileMenu() {
    this.navbarMenu.classList.toggle('active');
    this.navbarToggle.classList.toggle('active');
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const count = cart.getItemCount();
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }
}

// Modal Management
class Modal {
  constructor(selector) {
    this.modal = document.querySelector(selector);
    this.init();
  }

  init() {
    const closeBtn = this.modal?.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  toggle() {
    if (this.modal?.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Toast Notification
class Toast {
  static show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${type === 'success' ? '#59425A' : '#dc3545'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 2000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
  });
} else {
  new Navigation();
}
