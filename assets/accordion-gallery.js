/**
 * AccordionGallery Component — More Kodai Specialities Section
 * Horizontal on desktop, responsive vertical stack on mobile.
 * Features:
 * - defaultIndex: 0
 * - expandRatio: 0.52
 * - Hover, focus, and tap expansion
 * - Separate "View Details" button to open modal safely
 * - Captions over rich dark cocoa overlay (#43271C)
 * - Parallax and tilt on fine pointers; disabled for reduced motion
 */

class AccordionGallery {
  constructor(container, options = {}) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }

    if (!this.container) {
      console.warn('AccordionGallery: Container element not found.');
      return;
    }

    this.options = Object.assign({
      items: [],
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
    }, options);

    this.items = Array.isArray(this.options.items) ? this.options.items : [];
    this.total = this.items.length;
    this.activeIndex = Math.max(0, Math.min(this.options.defaultIndex, this.total - 1));
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initDOM();
    this.bindEvents();
    this.updatePanels();
  }

  initDOM() {
    this.container.innerHTML = '';
    this.container.classList.add('accordion-gallery-root');
    this.container.style.setProperty('--acc-gap', `${this.options.gap}px`);
    this.container.style.setProperty('--acc-radius', `${this.options.radius}px`);
    this.container.style.setProperty('--acc-height', `${this.options.height}px`);

    this.panelElements = this.items.map((item, idx) => {
      const panel = document.createElement('div');
      panel.className = 'acc-panel';
      panel.setAttribute('data-index', idx);
      panel.setAttribute('tabindex', '0');
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-label', `${item.title}: ${item.subtitle || ''}`);

      // Background Image Container
      const imgWrap = document.createElement('div');
      imgWrap.className = 'acc-panel-img-wrap';

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.alt || item.title;
      img.loading = 'lazy';
      img.className = 'acc-panel-img';
      imgWrap.appendChild(img);

      // Dark Cocoa Translucent Overlay
      const overlay = document.createElement('div');
      overlay.className = 'acc-panel-overlay';
      imgWrap.appendChild(overlay);

      // Content Box
      const content = document.createElement('div');
      content.className = 'acc-panel-content';

      // Collapsed Vertical Label
      const verticalLabel = document.createElement('span');
      verticalLabel.className = 'acc-vertical-label';
      verticalLabel.textContent = item.title;
      content.appendChild(verticalLabel);

      // Expanded Info
      const expandedBox = document.createElement('div');
      expandedBox.className = 'acc-expanded-box';

      if (item.tagline) {
        const tag = document.createElement('span');
        tag.className = 'acc-tagline';
        tag.textContent = item.tagline;
        expandedBox.appendChild(tag);
      }

      const title = document.createElement('h3');
      title.className = 'acc-title';
      title.textContent = item.title;
      expandedBox.appendChild(title);

      if (item.subtitle) {
        const sub = document.createElement('p');
        sub.className = 'acc-subtitle';
        sub.textContent = item.subtitle;
        expandedBox.appendChild(sub);
      }

      if (item.details) {
        const desc = document.createElement('p');
        desc.className = 'acc-details';
        desc.textContent = item.details;
        expandedBox.appendChild(desc);
      }

      // Details Action Button (Separate from expansion action)
      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.className = 'acc-action-btn';
      actionBtn.textContent = 'View Product Info →';
      actionBtn.setAttribute('aria-label', `View full information for ${item.title}`);
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openProductModal(item);
      });
      expandedBox.appendChild(actionBtn);

      content.appendChild(expandedBox);
      panel.appendChild(imgWrap);
      panel.appendChild(content);

      this.container.appendChild(panel);
      return { panel, item, index: idx, imgWrap };
    });
  }

  updatePanels() {
    this.panelElements.forEach(({ panel, index }) => {
      const isExpanded = index === this.activeIndex;
      panel.classList.toggle('is-expanded', isExpanded);
      panel.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  setActive(index) {
    if (index === this.activeIndex || index < 0 || index >= this.total) return;
    this.activeIndex = index;
    this.updatePanels();
  }

  bindEvents() {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    this.panelElements.forEach(({ panel, index, imgWrap }) => {
      if (this.options.trigger === 'hover' && isFinePointer) {
        panel.addEventListener('mouseenter', () => {
          this.setActive(index);
        });
      }

      // Tap / Click
      panel.addEventListener('click', () => {
        this.setActive(index);
      });

      // Keyboard Focus
      panel.addEventListener('focus', () => {
        this.setActive(index);
      });

      // Subtle Pointer Parallax (if fine pointer and reduced motion false)
      if (isFinePointer && !this.reducedMotion) {
        panel.addEventListener('mousemove', (e) => {
          if (panel.classList.contains('is-expanded')) {
            const rect = panel.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;
            const moveX = relX * 12;
            const moveY = relY * 8;
            imgWrap.style.transform = `scale(1.04) translate(${moveX}px, ${moveY}px)`;
          }
        });

        panel.addEventListener('mouseleave', () => {
          imgWrap.style.transform = '';
        });
      }
    });
  }

  openProductModal(item) {
    if (typeof window.openProductModal === 'function') {
      let product = item;
      if (window.TR_DATA && window.TR_DATA.TR_PRODUCTS) {
        const found = window.TR_DATA.TR_PRODUCTS.find(p => p.id === item.productId || p.id === item.id || p.name === item.title);
        if (found) product = found;
      }
      window.openProductModal(product);
    }
  }
}

// Universal export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccordionGallery;
}
if (typeof window !== 'undefined') {
  window.AccordionGallery = AccordionGallery;
}
