/**
 * FOLTZ FANWEAR - Shopify Theme JavaScript
 * Version: 1.0.0
 * Date: 2025-10-25
 */

(function() {
  'use strict';

  // ============================================
  // MOBILE MENU
  // ============================================
  const initMobileMenu = () => {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');

    if (!menuToggle || !mobileMenu || !menuBackdrop) return;

    const openMenu = () => {
      mobileMenu.classList.add('active');
      menuBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      menuBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);

    // Mobile submenu toggles
    const dropdownToggles = mobileMenu.querySelectorAll('.mobile-menu-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        const isActive = submenu.classList.contains('active');

        // Close all other submenus
        mobileMenu.querySelectorAll('.mobile-menu-submenu.active').forEach(menu => {
          if (menu !== submenu) {
            menu.classList.remove('active');
            menu.previousElementSibling.classList.remove('active');
          }
        });

        // Toggle current submenu
        submenu.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    });

    // Close menu on link click
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  };

  // ============================================
  // CART FUNCTIONALITY
  // ============================================
  const initCart = () => {
    // Add to cart function
    window.addToCart = async (variantId, quantity = 1) => {
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity
          })
        });

        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }

        const data = await response.json();
        updateCartCount();
        showCartNotification('Product added to cart!');
        return data;
      } catch (error) {
        console.error('Add to cart error:', error);
        showCartNotification('Error adding product to cart', 'error');
      }
    };

    // Update cart count in header
    window.updateCartCount = async () => {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();

        const cartBadges = document.querySelectorAll('.header-icon-badge');
        cartBadges.forEach(badge => {
          if (badge.parentElement.href && badge.parentElement.href.includes('/cart')) {
            if (cart.item_count > 0) {
              badge.textContent = cart.item_count;
              badge.style.display = 'flex';
            } else {
              badge.style.display = 'none';
            }
          }
        });
      } catch (error) {
        console.error('Update cart count error:', error);
      }
    };

    // Remove from cart
    window.removeFromCart = async (lineItemKey) => {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            line: lineItemKey,
            quantity: 0
          })
        });

        if (!response.ok) {
          throw new Error('Failed to remove from cart');
        }

        updateCartCount();
        window.location.reload();
      } catch (error) {
        console.error('Remove from cart error:', error);
      }
    };

    // Update cart item quantity
    window.updateCartQuantity = async (lineItemKey, quantity) => {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            line: lineItemKey,
            quantity: quantity
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }

        updateCartCount();
        window.location.reload();
      } catch (error) {
        console.error('Update quantity error:', error);
      }
    };

    // Show cart notification
    const showCartNotification = (message, type = 'success') => {
      const notification = document.createElement('div');
      notification.className = `cart-notification ${type}`;
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#DAF10D' : '#EF4444'};
        color: #000000;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 700;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
      `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    };
  };

  // ============================================
  // WISHLIST (localStorage)
  // ============================================
  const initWishlist = () => {
    const WISHLIST_KEY = 'foltz_wishlist';

    // Get wishlist from localStorage
    window.getWishlist = () => {
      const wishlist = localStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    };

    // Add to wishlist
    window.addToWishlist = (productId) => {
      const wishlist = getWishlist();
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        updateWishlistUI();
        showCartNotification('Added to wishlist!');
      }
    };

    // Remove from wishlist
    window.removeFromWishlist = (productId) => {
      const wishlist = getWishlist();
      const index = wishlist.indexOf(productId);
      if (index > -1) {
        wishlist.splice(index, 1);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        updateWishlistUI();
        showCartNotification('Removed from wishlist');
      }
    };

    // Check if product is in wishlist
    window.isInWishlist = (productId) => {
      return getWishlist().includes(productId);
    };

    // Update wishlist UI
    const updateWishlistUI = () => {
      const wishlist = getWishlist();

      // Update heart icons
      document.querySelectorAll('[data-product-id]').forEach(element => {
        const productId = parseInt(element.dataset.productId);
        const heartIcon = element.querySelector('.product-card-wishlist svg, .header-icon svg');

        if (heartIcon && isInWishlist(productId)) {
          heartIcon.style.fill = '#DAF10D';
          heartIcon.style.stroke = '#DAF10D';
        }
      });

      // Update wishlist count
      const wishlistBadges = document.querySelectorAll('.header-icon-badge');
      wishlistBadges.forEach(badge => {
        if (badge.previousElementSibling && badge.previousElementSibling.querySelector('svg path[d*="heart"]')) {
          if (wishlist.length > 0) {
            badge.textContent = wishlist.length;
            badge.style.display = 'flex';
          } else {
            badge.style.display = 'none';
          }
        }
      });
    };

    // Initialize wishlist UI on page load
    updateWishlistUI();

    // Add event listeners to wishlist buttons
    document.addEventListener('click', (e) => {
      const wishlistBtn = e.target.closest('.product-card-wishlist');
      if (wishlistBtn) {
        e.preventDefault();
        const productCard = wishlistBtn.closest('[data-product-id]');
        if (productCard) {
          const productId = parseInt(productCard.dataset.productId);
          if (isInWishlist(productId)) {
            removeFromWishlist(productId);
          } else {
            addToWishlist(productId);
          }
        }
      }
    });
  };

  // ============================================
  // PRODUCT VARIANT SELECTOR
  // ============================================
  const initVariantSelector = () => {
    const variantSelectors = document.querySelectorAll('.variant-selector');

    variantSelectors.forEach(selector => {
      selector.addEventListener('change', (e) => {
        const variantId = e.target.value;
        const form = e.target.closest('form');

        if (form) {
          const priceElement = form.querySelector('.product-price');
          const addToCartBtn = form.querySelector('.btn-add-to-cart');

          // Update price if needed (this would require variant data)
          // For now, just update the variant ID
          if (addToCartBtn) {
            addToCartBtn.dataset.variantId = variantId;
          }
        }
      });
    });

    // Add to cart button handlers
    document.addEventListener('click', (e) => {
      const addToCartBtn = e.target.closest('.btn-add-to-cart');
      if (addToCartBtn && !addToCartBtn.disabled) {
        e.preventDefault();
        const variantId = addToCartBtn.dataset.variantId;
        const quantity = addToCartBtn.dataset.quantity || 1;

        if (variantId) {
          addToCartBtn.disabled = true;
          addToCartBtn.textContent = 'Adding...';

          addToCart(variantId, parseInt(quantity)).then(() => {
            addToCartBtn.disabled = false;
            addToCartBtn.textContent = 'Add to Cart';
          });
        }
      }
    });
  };

  // ============================================
  // SEARCH FUNCTIONALITY
  // ============================================
  const initSearch = () => {
    const searchInputs = document.querySelectorAll('#header-search-input, [name="q"]');

    searchInputs.forEach(input => {
      let searchTimeout;

      input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length > 2) {
          searchTimeout = setTimeout(() => {
            // Predictive search would go here
            // For now, we'll just rely on the form submission
          }, 300);
        }
      });
    });
  };

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  };

  // ============================================
  // ANIMATIONS ON SCROLL
  // ============================================
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
      observer.observe(element);
    });
  };

  // ============================================
  // INITIALIZE ALL
  // ============================================
  const init = () => {
    initMobileMenu();
    initCart();
    initWishlist();
    initVariantSelector();
    initSearch();
    initSmoothScroll();
    initScrollAnimations();

    console.log('Foltz Fanwear Theme loaded successfully');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add CSS animations
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

})();
