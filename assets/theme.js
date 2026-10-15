/**
 * TR Homemade Chocolates — Interactive Theme Logic
 * Pure Vanilla JavaScript (ES6+), Accessible & Performance Focused
 * Showcase Website Only: Zero cart, checkout, or ordering logic.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCardNav();
  initHeroParallax();
  initAlbumRail();
  initAccordionGallery();
  initCatalogFiltering();
  initProductDetailModal();
  initGalleryLightbox();
  initSmoothScroll();
});

/* ==========================================================================
   1. CARD NAV CONTROLLER
   ========================================================================== */
function initCardNav() {
  if (typeof CardNav === 'function') {
    window.cardNavInstance = new CardNav({
      defaultOpen: false,
      ariaLabel: "Main navigation"
    });
  }
}

/* ==========================================================================
   2. HERO FLOATING COLLAGE PARALLAX
   - Applied only on devices with fine pointer (mouse)
   - Disabled for reduced-motion users
   ========================================================================== */
function initHeroParallax() {
  const heroWrapper = document.querySelector('.hero-collage-wrapper');
  if (!heroWrapper) return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isFinePointer || isReducedMotion) return;

  const dominant = heroWrapper.querySelector('.hero-collage-dominant');
  const shape = heroWrapper.querySelector('.hero-warm-shape');

  heroWrapper.addEventListener('mousemove', (e) => {
    const rect = heroWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (dominant) {
      dominant.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
    }
    if (shape) {
      shape.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
    }
  });

  heroWrapper.addEventListener('mouseleave', () => {
    if (dominant) dominant.style.transform = '';
    if (shape) shape.style.transform = '';
  });
}

/* ==========================================================================
   3. CHOCOLATE HIGHLIGHT — ALBUM RAIL
   ========================================================================== */
function initAlbumRail() {
  const mountEl = document.getElementById('albumRailMount');
  if (!mountEl) return;

  if (typeof AlbumRail !== 'function') {
    console.warn('AlbumRail class is not defined.');
    return;
  }

  const items = (window.TR_DATA && window.TR_DATA.TR_ALBUM_RAIL_CHOCOLATES)
    ? window.TR_DATA.TR_ALBUM_RAIL_CHOCOLATES
    : [];

  const albumRail = new AlbumRail(mountEl, {
    items: items,
    startIndex: 0,
    aspect: 1,
    size: 0.62,
    spread: 0.58,
    stack: 0.5,
    fan: 6,
    turn: 22,
    depth: 0.5,
    visible: 3,
    radius: 14,
    dim: 0.45,
    shadow: 0.6,
    vinyl: false, // strictly false for chocolates
    accentColor: "#D5A15F",
    autoplay: true,
    interval: 4,
    pauseOnHover: true,
    loop: true,
    draggable: true,
    wheel: false,
    captions: true,
    controls: true,
    backgroundColor: "transparent",
    paused: false,
    dpr: 1.5,
    ariaLabel: "Chocolate photo showcase. Use the previous and next buttons or swipe to explore."
  });

  window.albumRailRef = albumRail;
}

/* ==========================================================================
   4. OTHER KODAI SPECIALITIES — ACCORDION GALLERY
   ========================================================================== */
function initAccordionGallery() {
  const mountEl = document.getElementById('accordionGalleryMount');
  if (!mountEl) return;

  if (typeof AccordionGallery !== 'function') {
    console.warn('AccordionGallery class is not defined.');
    return;
  }

  const items = (window.TR_DATA && window.TR_DATA.TR_ACCORDION_KODAI_SPECIALS)
    ? window.TR_DATA.TR_ACCORDION_KODAI_SPECIALS
    : [];

  const accordion = new AccordionGallery(mountEl, {
    items: items,
    defaultIndex: 0,
    accentColor: "#D5A15F",
    overlayColor: "#43271C",
    textColor: "#FFF3DF",
    grayscale: true,
    showLabels: true,
    duration: 0.6,
    ease: "power3.out",
    parallax: 0.35,
    tilt: 5,
    stagger: 0.06,
    trigger: "hover",
    height: 460,
    gap: 10,
    radius: 16,
    expandRatio: 0.52,
    orientation: "horizontal"
  });

  window.accordionGalleryRef = accordion;
}

/* ==========================================================================
   5. FILTERABLE PRODUCT CATALOG
   ========================================================================== */
function initCatalogFiltering() {
  const searchInput = document.getElementById('catalogSearch');
  const clearBtn = document.getElementById('catalogClearSearch');
  const filterTabs = document.querySelectorAll('.category-tab-btn');
  const productCards = document.querySelectorAll('[data-catalog-product]');
  const countDisplay = document.getElementById('catalogCountDisplay');
  const emptyState = document.getElementById('catalogEmptyState');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;
    const q = searchQuery.toLowerCase().trim();

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardDesc = (card.getAttribute('data-desc') || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = !q || cardName.includes(q) || cardDesc.includes(q) || cardCategory.includes(q);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      if (visibleCount === 1) {
        countDisplay.textContent = 'Showing 1 product';
      } else {
        countDisplay.textContent = `Showing ${visibleCount} products`;
      }
    }

    if (emptyState) {
      emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    if (clearBtn) {
      clearBtn.style.display = (q || activeCategory !== 'all') ? 'inline-block' : 'none';
    }
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeCategory = tab.getAttribute('data-category-id') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeCategory = 'all';
      filterTabs.forEach(t => {
        t.classList.toggle('is-active', t.getAttribute('data-category-id') === 'all');
      });
      applyFilters();
    });
  }

  window.filterCatalogByCategory = function (catId) {
    activeCategory = catId;
    filterTabs.forEach(t => {
      t.classList.toggle('is-active', t.getAttribute('data-category-id') === catId);
    });
    if (searchInput) searchInput.value = '';
    searchQuery = '';
    applyFilters();

    const catalogEl = document.getElementById('products');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

/* ==========================================================================
   6. ACCESSIBLE PRODUCT DETAILS MODAL
   ========================================================================== */
function initProductDetailModal() {
  const modalBackdrop = document.getElementById('productDetailModal');
  if (!modalBackdrop) return;

  const closeButtons = modalBackdrop.querySelectorAll('[data-action="close-modal"]');
  const modalMainImg = document.getElementById('modalMainImage');
  const modalThumbs = document.getElementById('modalThumbs');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalIngredients = document.getElementById('modalIngredients');
  const modalSize = document.getElementById('modalSize');
  const modalStorage = document.getElementById('modalStorage');
  const modalUsage = document.getElementById('modalUsage');

  let lastActiveElement = null;

  function openModal(product) {
    if (!product) return;
    lastActiveElement = document.activeElement;

    if (modalCategory) modalCategory.textContent = product.categoryName || product.categoryId || 'Speciality';
    if (modalTitle) modalTitle.textContent = product.name || product.title || '';
    if (modalDesc) modalDesc.textContent = product.description || product.shortDescription || '';

    if (modalMainImg) {
      modalMainImg.src = product.image || product.src || '';
      modalMainImg.alt = product.imageAlt || product.alt || product.name || '';
    }

    if (modalThumbs) {
      modalThumbs.innerHTML = '';
      const galleryList = (product.gallery && product.gallery.length) ? product.gallery : [product.image || product.src];
      if (galleryList.length > 1) {
        galleryList.forEach((src, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `product-modal-thumb-btn ${idx === 0 ? 'is-active' : ''}`;
          btn.setAttribute('aria-label', `Thumbnail view ${idx + 1}`);
          btn.innerHTML = `<img src="${src}" alt="${product.name} view ${idx + 1}">`;
          btn.addEventListener('click', () => {
            modalThumbs.querySelectorAll('.product-modal-thumb-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            if (modalMainImg) modalMainImg.src = src;
          });
          modalThumbs.appendChild(btn);
        });
      }
    }

    function toggleSpec(container, value) {
      if (!container) return;
      const parent = container.closest('.spec-item');
      if (value) {
        container.textContent = value;
        if (parent) parent.style.display = '';
      } else {
        if (parent) parent.style.display = 'none';
      }
    }

    toggleSpec(modalIngredients, product.ingredients);
    toggleSpec(modalSize, product.size);
    toggleSpec(modalStorage, product.storage);
    toggleSpec(modalUsage, product.usage);

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modalBackdrop.querySelector('.product-modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  document.querySelectorAll('[data-view-product]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productJson = btn.getAttribute('data-product-data');
      if (productJson) {
        try {
          const product = JSON.parse(productJson);
          openModal(product);
        } catch (err) {
          console.error('Failed to parse product data', err);
        }
      }
    });
  });

  window.openProductModal = openModal;
}

/* ==========================================================================
   7. PHOTO GALLERY MASONRY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const photos = (window.TR_DATA && window.TR_DATA.TR_GALLERY_PHOTOS)
    ? window.TR_DATA.TR_GALLERY_PHOTOS
    : [];

  if (typeof MasonryLightbox === 'function' && photos.length) {
    const lightbox = new MasonryLightbox({
      items: photos
    });

    document.querySelectorAll('.gallery-masonry-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        lightbox.open(index, item);
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightbox.open(index, item);
        }
      });
    });

    window.galleryLightboxInstance = lightbox;
  }
}

/* ==========================================================================
   8. SMOOTH ANCHOR SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
