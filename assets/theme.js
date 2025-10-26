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
        showCartNotification('¡Agregado al Carrito!', 'success');
        return data;
      } catch (error) {
        console.error('Add to cart error:', error);
        showCartNotification('Error al agregar al carrito', 'error');
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

    // Show enhanced toast notification (Next.js style)
    const showCartNotification = (message, type = 'success', productData = null) => {
      // Remove existing notifications
      document.querySelectorAll('.foltz-toast').forEach(toast => toast.remove());

      const isWishlist = type === 'wishlist';
      const headerBg = isWishlist ? 'linear-gradient(to right, #DC2626, #EF4444)' : 'linear-gradient(to right, #059669, #10B981)';
      const borderColor = isWishlist ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)';
      const shadowColor = isWishlist ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)';
      const iconColor = isWishlist ? '#DC2626' : '#059669';
      const iconPath = isWishlist
        ? '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="' + iconColor + '"></path>'
        : '<polyline points="20 6 9 17 4 12" stroke="' + iconColor + '" stroke-width="3" fill="none"></polyline>';

      const toast = document.createElement('div');
      toast.className = 'foltz-toast';
      toast.innerHTML = `
        <div class="foltz-toast__content">
          <!-- Header -->
          <div class="foltz-toast__header" style="background: ${headerBg}">
            <div class="foltz-toast__header-content">
              <div class="foltz-toast__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="none">
                  ${iconPath}
                </svg>
              </div>
              <h3 class="foltz-toast__title">${message}</h3>
            </div>
            <button class="foltz-toast__close" onclick="this.closest('.foltz-toast').remove()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <!-- Body -->
          <div class="foltz-toast__body">
            <p class="foltz-toast__message">${message}</p>
          </div>
          <!-- Progress Bar -->
          <div class="foltz-toast__progress"></div>
        </div>
      `;

      toast.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 16px;
        pointer-events: none;
        display: flex;
        justify-content: center;
      `;

      // Add responsive positioning
      if (window.innerWidth >= 768) {
        toast.style.cssText += `
          top: 16px;
          right: 16px;
          bottom: auto;
          left: auto;
          justify-content: flex-end;
        `;
      }

      document.body.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.style.animation = 'foltzToastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        toast.style.animation = 'foltzToastSlideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
      }, 5000);
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
        showCartNotification('¡Agregado a Favoritos!', 'wishlist');
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
        showCartNotification('Removido de Favoritos', 'wishlist');
      }
    };

    // Check if product is in wishlist
    window.isInWishlist = (productId) => {
      return getWishlist().includes(productId);
    };

    // Update wishlist UI
    const updateWishlistUI = () => {
      const wishlist = getWishlist();

      // Update heart icons on product cards
      document.querySelectorAll('[data-product-id]').forEach(element => {
        const productId = parseInt(element.dataset.productId);
        const heartIcon = element.querySelector('.product-card-wishlist svg, .wishlist-button svg, .header-icon svg');

        if (heartIcon && isInWishlist(productId)) {
          heartIcon.style.fill = '#DAF10D';
          heartIcon.style.stroke = '#DAF10D';
        } else if (heartIcon && !isInWishlist(productId)) {
          heartIcon.style.fill = 'none';
          heartIcon.style.stroke = 'currentColor';
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
      const wishlistBtn = e.target.closest('.product-card-wishlist, .wishlist-button');
      if (wishlistBtn) {
        e.preventDefault();
        const productCard = wishlistBtn.closest('[data-product-id]') || wishlistBtn;
        if (productCard && productCard.dataset.productId) {
          const productId = parseInt(productCard.dataset.productId);
          const heartIcon = wishlistBtn.querySelector('svg');

          if (isInWishlist(productId)) {
            removeFromWishlist(productId);
            if (heartIcon) {
              heartIcon.style.fill = 'none';
              heartIcon.style.stroke = 'currentColor';
            }
          } else {
            addToWishlist(productId);
            if (heartIcon) {
              heartIcon.style.fill = '#DAF10D';
              heartIcon.style.stroke = '#DAF10D';
            }
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

  // Add CSS animations and toast styles
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

    @keyframes foltzToastSlideIn {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media (min-width: 768px) {
      @keyframes foltzToastSlideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes foltzToastSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    }

    @keyframes foltzToastSlideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }

    .foltz-toast__content {
      width: 100%;
      max-width: 640px;
      background: #000000;
      border: 2px solid;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }

    .foltz-toast__header {
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .foltz-toast__header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .foltz-toast__icon {
      width: 32px;
      height: 32px;
      background: #FFFFFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .foltz-toast__icon svg {
      width: 20px;
      height: 20px;
    }

    .foltz-toast__title {
      color: #FFFFFF;
      font-weight: 700;
      font-size: 1rem;
      margin: 0;
    }

    @media (min-width: 768px) {
      .foltz-toast__title {
        font-size: 1.125rem;
      }
    }

    .foltz-toast__close {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 8px;
      color: #FFFFFF;
      cursor: pointer;
      transition: background 0.2s;
    }

    .foltz-toast__close:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .foltz-toast__close svg {
      width: 16px;
      height: 16px;
    }

    .foltz-toast__body {
      background: #18181B;
      padding: 20px;
    }

    .foltz-toast__message {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-size: 0.875rem;
    }

    .foltz-toast__progress {
      height: 4px;
      background: rgba(16, 185, 129, 0.8);
      animation: foltzProgressBar 5s linear;
      transform-origin: left;
    }

    @keyframes foltzProgressBar {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
  `;
  document.head.appendChild(style);

})();
