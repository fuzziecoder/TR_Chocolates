/**
 * TR Artisan Reserve - Theme JavaScript
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
   Header Mega Menu Hover Controller
   ========================================================================== */
function initMegaMenuHover() {
  const headerWrapper = document.querySelector('.site-header-wrapper');
  const megaNavItems = document.querySelectorAll('.site-nav__item--mega');

  if (!headerWrapper || !megaNavItems.length) return;

  megaNavItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      headerWrapper.classList.add('is-mega-open');
    });

    item.addEventListener('mouseleave', () => {
      headerWrapper.classList.remove('is-mega-open');
    });
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
