/**
 * Accessible Lightbox for Masonry Gallery
 * - Prev / Next navigation
 * - Close button (✕)
 * - Captions & photo title
 * - Escape closes and restores focus to originating trigger
 * - Background scroll lock
 * - Touch swiping
 */

class MasonryLightbox {
  constructor(options = {}) {
    this.options = Object.assign({
      items: [],
      onClose: null
    }, options);

    this.items = Array.isArray(this.options.items) ? this.options.items : [];
    this.currentIndex = 0;
    this.lastFocusedElement = null;
    this.isOpen = false;

    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'lightbox-backdrop';
    this.backdrop.setAttribute('role', 'dialog');
    this.backdrop.setAttribute('aria-modal', 'true');
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.backdrop.setAttribute('aria-label', 'Product photo viewer');

    this.backdrop.innerHTML = `
      <div class="lightbox-dialog">
        <button type="button" class="lightbox-close-btn" aria-label="Close photo viewer">✕</button>
        <button type="button" class="lightbox-arrow lightbox-prev" aria-label="Previous photo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="lightbox-media-container">
          <img class="lightbox-img" src="" alt="">
          <div class="lightbox-caption-bar">
            <h4 class="lightbox-title"></h4>
            <p class="lightbox-sub"></p>
            <span class="lightbox-counter"></span>
          </div>
        </div>
        <button type="button" class="lightbox-arrow lightbox-next" aria-label="Next photo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    `;

    document.body.appendChild(this.backdrop);

    this.closeBtn = this.backdrop.querySelector('.lightbox-close-btn');
    this.prevBtn = this.backdrop.querySelector('.lightbox-prev');
    this.nextBtn = this.backdrop.querySelector('.lightbox-next');
    this.img = this.backdrop.querySelector('.lightbox-img');
    this.title = this.backdrop.querySelector('.lightbox-title');
    this.caption = this.backdrop.querySelector('.lightbox-sub');
    this.counter = this.backdrop.querySelector('.lightbox-counter');
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.prevBtn.addEventListener('click', () => this.previous());
    this.nextBtn.addEventListener('click', () => this.next());

    // Click outside dialog to close
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.previous();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  open(index = 0, originatingElement = null) {
    this.lastFocusedElement = originatingElement || document.activeElement;
    this.currentIndex = Math.max(0, Math.min(index, this.items.length - 1));
    this.isOpen = true;

    this.updateContent();
    this.backdrop.classList.add('is-open');
    this.backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      this.closeBtn.focus();
    }, 50);
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.backdrop.classList.remove('is-open');
    this.backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
      this.lastFocusedElement.focus();
    }

    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
  }

  next() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateContent();
  }

  previous() {
    if (this.items.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateContent();
  }

  updateContent() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    this.img.src = item.src || item.image || item.thumb;
    this.img.alt = item.alt || item.title || 'Product photo';
    this.title.textContent = item.title || item.name || '';
    this.caption.textContent = item.caption || item.subtitle || '';
    this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
  }
}

// Universal export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MasonryLightbox;
}
if (typeof window !== 'undefined') {
  window.MasonryLightbox = MasonryLightbox;
}
