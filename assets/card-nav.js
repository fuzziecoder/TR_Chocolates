/**
 * Card Nav Header Navigation Component
 * - Cream navigation bar with dark cocoa typography
 * - Expands into a row of 3 menu cards on desktop, stacked vertically on mobile
 * - Menu Cards:
 *   1. Discover (Home, Our Story, Why Choose Us)
 *   2. Explore (All Products, Chocolates, Kodai Specials)
 *   3. Connect (Gallery, Contact, Instagram)
 * - Right CTA: "Explore Collection" -> #products
 * - Accessible toggle, Escape key support, outside click, aria-expanded
 */

class CardNav {
  constructor(options = {}) {
    this.options = Object.assign({
      theme: 'light',
      surface: 'solid',
      openOn: 'click',
      cardEffect: 'rise',
      stagger: 0.08,
      bounce: 0.15,
      speed: 1,
      cardHeight: 176,
      maxWidth: 1100,
      accentColor: '#FBE8C9',
      menuLabel: true,
      intro: true,
      defaultOpen: false,
      ariaLabel: 'Main navigation'
    }, options);

    this.isOpen = false;
    this.init();
  }

  init() {
    this.trigger = document.querySelector('[data-cardnav-trigger]');
    this.panel = document.querySelector('[data-cardnav-panel]');
    this.backdrop = document.querySelector('[data-cardnav-backdrop]');

    if (!this.trigger || !this.panel) return;

    this.bindEvents();
    if (this.options.defaultOpen) {
      this.open();
    }
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Close when clicking any menu card link
    this.panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        if (this.trigger) this.trigger.focus();
      }
    });

    // Outside click dismissal
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.panel.contains(e.target) && 
          !this.trigger.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.panel.classList.add('is-open');
    this.panel.setAttribute('aria-hidden', 'false');
    this.trigger.setAttribute('aria-expanded', 'true');
    this.trigger.classList.add('is-active');
    if (this.backdrop) this.backdrop.classList.add('is-open');
  }

  close() {
    this.isOpen = false;
    this.panel.classList.remove('is-open');
    this.panel.setAttribute('aria-hidden', 'true');
    this.trigger.setAttribute('aria-expanded', 'false');
    this.trigger.classList.remove('is-active');
    if (this.backdrop) this.backdrop.classList.remove('is-open');
  }
}

// Universal export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardNav;
}
if (typeof window !== 'undefined') {
  window.CardNav = CardNav;
}
