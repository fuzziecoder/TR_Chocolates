/**
 * TR Homemade Chocolates - Theme JavaScript
 * Pure Vanilla JavaScript (ES6+), Zero external libraries, Accessible & Fast
 */

document.addEventListener('DOMContentLoaded', () => {
  initMegaMenuHover();
  initMobileDrawer();
  initAccordions();
  initProductGallery();
  initQuantitySteppers();
  initVariantSelectors();
  initFilterControls();
});

/* ==========================================================================
   Header Mega Menu Hover Controller — Fast switching, zero stickiness
   Instant switch between items, graceful leave timeout, full accessibility
   ========================================================================== */
function initMegaMenuHover() {
  const megaNavItems = document.querySelectorAll('.site-nav__item--mega');
  if (!megaNavItems.length) return;

  const headerWrapper = document.querySelector('.site-header-wrapper');
  const LEAVE_DELAY = 180; // ms grace period when cursor leaves header completely
  let leaveTimer = null;
  let activeItem = null;

  function closeAll() {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = null;
    }
    megaNavItems.forEach(item => {
      item.classList.remove('is-mega-active');
      const drawer = item.querySelector('[class*="-menu-drawer"]');
      if (drawer) drawer.classList.remove('is-open');
      const link = item.querySelector('.site-nav__link');
      if (link) link.setAttribute('aria-expanded', 'false');
    });
    if (headerWrapper) headerWrapper.classList.remove('is-mega-open');
    activeItem = null;
  }

  function openItem(item) {
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      leaveTimer = null;
    }

    if (activeItem === item) return;

    // Instantly close any other open items
    megaNavItems.forEach(other => {
      if (other !== item) {
        other.classList.remove('is-mega-active');
        const otherDrawer = other.querySelector('[class*="-menu-drawer"]');
        if (otherDrawer) otherDrawer.classList.remove('is-open');
        const otherLink = other.querySelector('.site-nav__link');
        if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
      }
    });

    // Open target item
    activeItem = item;
    item.classList.add('is-mega-active');
    const drawer = item.querySelector('[class*="-menu-drawer"]');
    if (drawer) drawer.classList.add('is-open');
    const link = item.querySelector('.site-nav__link');
    if (link) link.setAttribute('aria-expanded', 'true');
    if (headerWrapper) headerWrapper.classList.add('is-mega-open');
  }

  function scheduleLeave() {
    if (leaveTimer) clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
      closeAll();
    }, LEAVE_DELAY);
  }

  megaNavItems.forEach(item => {
    const drawer = item.querySelector('[class*="-menu-drawer"]');

    // Hover enters: switch immediately
    item.addEventListener('mouseenter', () => {
      openItem(item);
    });

    // Hover leaves item
    item.addEventListener('mouseleave', (e) => {
      const nextTarget = e.relatedTarget;
      // If moving into another mega item, don't schedule leave; the other item will open instantly
      if (nextTarget && headerWrapper && headerWrapper.contains(nextTarget)) {
        return;
      }
      scheduleLeave();
    });

    if (drawer) {
      drawer.addEventListener('mouseenter', () => {
        if (leaveTimer) {
          clearTimeout(leaveTimer);
          leaveTimer = null;
        }
      });
      drawer.addEventListener('mouseleave', (e) => {
        const nextTarget = e.relatedTarget;
        if (nextTarget && headerWrapper && headerWrapper.contains(nextTarget)) {
          return;
        }
        scheduleLeave();
      });
    }

    // Keyboard support
    item.addEventListener('focusin', () => openItem(item));
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget)) {
        scheduleLeave();
      }
    });
  });

  // Mouse entering header cancels any scheduled leave
  if (headerWrapper) {
    headerWrapper.addEventListener('mouseenter', () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
    });
    headerWrapper.addEventListener('mouseleave', () => {
      scheduleLeave();
    });
  }

  // Click outside closes any open mega menu immediately
  document.addEventListener('click', (e) => {
    if (!headerWrapper || !headerWrapper.contains(e.target)) {
      closeAll();
    }
  });

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAll();
    }
  });
}

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const openButtons = document.querySelectorAll('[data-action="open-mobile-menu"]');
  const closeButtons = document.querySelectorAll('[data-action="close-mobile-menu"]');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');

  if (!drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openMenu));
  closeButtons.forEach(btn => btn.addEventListener('click', closeMenu));
  overlay.addEventListener('click', closeMenu);

  // Esc key closes drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Mobile submenu accordion toggles
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.mobile-nav-item');
      const submenu = parent ? parent.querySelector('.mobile-nav-submenu') : null;
      if (submenu) {
        submenu.classList.toggle('is-open');
        const expanded = submenu.classList.contains('is-open');
        toggle.setAttribute('aria-expanded', expanded);
      }
    });
  });
}

/* ==========================================================================
   Collapsible Accordions (PDP & FAQ)
   ========================================================================== */
function initAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : trigger.nextElementSibling;

      if (!panel) return;

      trigger.setAttribute('aria-expanded', !isExpanded);
      panel.classList.toggle('is-open', !isExpanded);
    });
  });
}

/* ==========================================================================
   PDP Media Gallery Thumbnail Switcher
   ========================================================================== */
function initProductGallery() {
  const gallery = document.querySelector('[data-product-gallery]');
  if (!gallery) return;

  const mainImage = gallery.querySelector('[data-gallery-main-img]');
  const thumbButtons = gallery.querySelectorAll('[data-gallery-thumb]');

  thumbButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSrc = button.getAttribute('data-image-src');
      const targetAlt = button.getAttribute('data-image-alt') || '';

      if (mainImage && targetSrc) {
        mainImage.src = targetSrc;
        mainImage.alt = targetAlt;
      }

      thumbButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
}

/* ==========================================================================
   Quantity Steppers (+ / - buttons)
   ========================================================================== */
function initQuantitySteppers() {
  const steppers = document.querySelectorAll('.quantity-stepper');
  steppers.forEach(stepper => {
    const input = stepper.querySelector('input[type="number"]');
    const minusBtn = stepper.querySelector('[data-quantity-minus]');
    const plusBtn = stepper.querySelector('[data-quantity-plus]');

    if (!input) return;

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const currentVal = parseInt(input.value, 10) || 1;
        const minVal = parseInt(input.min, 10) || 1;
        if (currentVal > minVal) {
          input.value = currentVal - 1;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const currentVal = parseInt(input.value, 10) || 1;
        const maxVal = parseInt(input.max, 10) || 9999;
        if (currentVal < maxVal) {
          input.value = currentVal + 1;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
  });
}

/* ==========================================================================
   PDP Variant Selection Handler
   ========================================================================== */
function initVariantSelectors() {
  const productForms = document.querySelectorAll('[data-product-form]');

  productForms.forEach(form => {
    const variantDataTag = form.querySelector('[data-product-json]');
    if (!variantDataTag) return;

    let productData;
    try {
      productData = JSON.parse(variantDataTag.textContent);
    } catch (e) {
      return;
    }

    const masterSelect = form.querySelector('[data-master-variant-select]');
    const optionRadios = form.querySelectorAll('.variant-radio-btn');
    const priceContainer = form.querySelector('[data-product-price]');
    const submitBtn = form.querySelector('[type="submit"]');

    optionRadios.forEach(radio => {
      radio.addEventListener('click', () => {
        const optionIndex = parseInt(radio.getAttribute('data-option-index'), 10);
        const optionValue = radio.getAttribute('data-option-value');

        // Toggle active visual state in current option group
        const group = radio.closest('.variant-swatches');
        if (group) {
          group.querySelectorAll('.variant-radio-btn').forEach(btn => btn.classList.remove('is-selected'));
        }
        radio.classList.add('is-selected');

        // Determine currently selected options
        const selectedOptions = [];
        const allGroups = form.querySelectorAll('.variant-picker-section');
        allGroups.forEach(grp => {
          const activeRadio = grp.querySelector('.variant-radio-btn.is-selected');
          if (activeRadio) {
            selectedOptions.push(activeRadio.getAttribute('data-option-value'));
          }
        });

        // Match against variants
        const matchedVariant = productData.variants.find(variant => {
          return selectedOptions.every((opt, idx) => variant.options[idx] === opt);
        });

        if (matchedVariant) {
          if (masterSelect) {
            masterSelect.value = matchedVariant.id;
            masterSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }

          // Update Price
          if (priceContainer && matchedVariant.price) {
            const formattedPrice = (matchedVariant.price / 100).toFixed(2);
            priceContainer.textContent = `$${formattedPrice}`;
          }

          // Update availability
          if (submitBtn) {
            if (matchedVariant.available) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Add to Cart';
            } else {
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sold Out';
            }
          }
        }
      });
    });
  });
}

/* ==========================================================================
   Storefront Facet Filters & Sorting
   ========================================================================== */
function initFilterControls() {
  const sortSelect = document.querySelector('[data-collection-sort]');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('sort_by', sortSelect.value);
      window.location.href = url.toString();
    });
  }

  const filterForm = document.querySelector('[data-filter-form]');
  if (filterForm) {
    const filterInputs = filterForm.querySelectorAll('input[type="checkbox"]');
    filterInputs.forEach(input => {
      input.addEventListener('change', () => {
        filterForm.submit();
      });
    });
  }
}
