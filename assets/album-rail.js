/**
 * AlbumRail Component — Artisan Chocolate Fan-Style Product Showcase
 * Exact Behavior & Public API Implementation:
 * - Fanned sleeves presentation for chocolate photography
 * - vinyl=false for chocolate showcase (no music player, no spinning records)
 * - Drag/swipe with inertia and snapping
 * - Autoplay slideshow with Pause/Play control, pause on hover/drag/tab hidden
 * - Captions, Prev/Next buttons, and tick/ruler controls
 * - Clicking active cover opens product details modal
 * - Clicking neighbor centers that slide
 * - Responsive neighbor limits on mobile
 * - Respects prefers-reduced-motion
 */

class AlbumRail {
  constructor(container, options = {}) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }

    if (!this.container) {
      console.warn('AlbumRail: Container element not found.');
      return;
    }

    this.options = Object.assign({
      items: [],
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
      vinyl: false,
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
      ariaLabel: "Chocolate photo showcase. Use the previous and next buttons or swipe to explore.",
      onIndexChange: null,
      onSelect: null
    }, options);

    this.items = Array.isArray(this.options.items) ? this.options.items : [];
    this.total = this.items.length;
    this.currentIndex = Math.max(0, Math.min(this.options.startIndex, this.total - 1));
    this.isPlaying = this.options.autoplay && !this.options.paused;
    this.timer = null;
    this.isHovered = false;
    this.isDragging = false;
    this.startX = 0;
    this.currentTranslateX = 0;
    this.dragOffset = 0;
    this.hasDragged = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.reducedMotion) {
      this.isPlaying = false;
    }

    this.initDOM();
    this.bindEvents();
    this.updateSlides();
    if (this.isPlaying) {
      this.startAutoplay();
    }
  }

  initDOM() {
    this.container.innerHTML = '';
    this.container.classList.add('album-rail-root');
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', this.options.ariaLabel);
    this.container.setAttribute('tabindex', '0');

    // Viewport / Stage
    this.stage = document.createElement('div');
    this.stage.className = 'album-rail-stage';

    // Track
    this.track = document.createElement('div');
    this.track.className = 'album-rail-track';
    this.stage.appendChild(this.track);

    // Slide Elements
    this.slideElements = this.items.map((item, idx) => {
      const card = document.createElement('div');
      card.className = 'album-rail-card';
      card.setAttribute('data-index', idx);
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${idx + 1} of ${this.total}: ${item.title || item.name || 'Chocolate'}`);

      // Sleeve Frame
      const sleeve = document.createElement('div');
      sleeve.className = 'album-rail-sleeve';
      sleeve.style.borderRadius = `${this.options.radius}px`;

      const img = document.createElement('img');
      img.src = item.src || item.image;
      img.alt = item.alt || item.title || item.name || 'Chocolate product';
      img.loading = idx === 0 ? 'eager' : 'lazy';
      img.className = 'album-rail-img';

      const overlay = document.createElement('div');
      overlay.className = 'album-rail-dim-overlay';

      sleeve.appendChild(img);
      sleeve.appendChild(overlay);
      card.appendChild(sleeve);
      this.track.appendChild(card);

      return { card, sleeve, img, item, index: idx };
    });

    this.container.appendChild(this.stage);

    // Captions Area
    if (this.options.captions) {
      this.captionBox = document.createElement('div');
      this.captionBox.className = 'album-rail-caption-box';
      this.captionTitle = document.createElement('h3');
      this.captionTitle.className = 'album-rail-caption-title';
      this.captionSubtitle = document.createElement('p');
      this.captionSubtitle.className = 'album-rail-caption-sub';
      this.captionAction = document.createElement('button');
      this.captionAction.type = 'button';
      this.captionAction.className = 'album-rail-details-btn';
      this.captionAction.textContent = 'View Product Details →';
      this.captionAction.setAttribute('aria-label', 'Open chocolate product details modal');

      this.captionBox.appendChild(this.captionTitle);
      this.captionBox.appendChild(this.captionSubtitle);
      this.captionBox.appendChild(this.captionAction);
      this.container.appendChild(this.captionBox);
    }

    // Controls Toolbar (Prev, Play/Pause, Ticks, Next)
    if (this.options.controls && this.total > 1) {
      this.controlsBar = document.createElement('div');
      this.controlsBar.className = 'album-rail-controls';

      // Prev Button
      this.prevBtn = document.createElement('button');
      this.prevBtn.type = 'button';
      this.prevBtn.className = 'album-rail-nav-btn album-rail-prev';
      this.prevBtn.setAttribute('aria-label', 'Previous slide');
      this.prevBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>`;

      // Slideshow Play/Pause Button (clearly labeled slideshow control, NOT vinyl music play)
      this.playPauseBtn = document.createElement('button');
      this.playPauseBtn.type = 'button';
      this.playPauseBtn.className = 'album-rail-nav-btn album-rail-playpause';
      this.playPauseBtn.setAttribute('aria-label', this.isPlaying ? 'Pause slideshow' : 'Play slideshow');
      this.updatePlayPauseIcon();

      // Tick / Ruler Marks
      this.ruler = document.createElement('div');
      this.ruler.className = 'album-rail-ruler';
      this.ticks = this.items.map((_, i) => {
        const tick = document.createElement('button');
        tick.type = 'button';
        tick.className = `album-rail-tick ${i === this.currentIndex ? 'is-active' : ''}`;
        tick.setAttribute('aria-label', `Go to slide ${i + 1}`);
        tick.addEventListener('click', () => this.goTo(i));
        this.ruler.appendChild(tick);
        return tick;
      });

      // Next Button
      this.nextBtn = document.createElement('button');
      this.nextBtn.type = 'button';
      this.nextBtn.className = 'album-rail-nav-btn album-rail-next';
      this.nextBtn.setAttribute('aria-label', 'Next slide');
      this.nextBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

      // Active Counter (e.g., 01 / 05)
      this.counter = document.createElement('div');
      this.counter.className = 'album-rail-counter';
      this.updateCounter();

      this.controlsBar.appendChild(this.prevBtn);
      this.controlsBar.appendChild(this.playPauseBtn);
      this.controlsBar.appendChild(this.ruler);
      this.controlsBar.appendChild(this.counter);
      this.controlsBar.appendChild(this.nextBtn);
      this.container.appendChild(this.controlsBar);
    }
  }

  updatePlayPauseIcon() {
    if (!this.playPauseBtn) return;
    if (this.isPlaying) {
      this.playPauseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
      this.playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
      this.playPauseBtn.setAttribute('title', 'Pause slideshow');
    } else {
      this.playPauseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      this.playPauseBtn.setAttribute('aria-label', 'Play slideshow');
      this.playPauseBtn.setAttribute('title', 'Play slideshow');
    }
  }

  updateCounter() {
    if (!this.counter) return;
    const currentStr = String(this.currentIndex + 1).padStart(2, '0');
    const totalStr = String(this.total).padStart(2, '0');
    this.counter.textContent = `${currentStr} / ${totalStr}`;
  }

  updateSlides() {
    if (!this.total) return;

    const isMobile = window.innerWidth < 768;
    const visibleNeighbors = isMobile ? 1 : this.options.visible;

    this.slideElements.forEach((slide, idx) => {
      let offset = idx - this.currentIndex;

      if (this.options.loop && Math.abs(offset) > this.total / 2) {
        if (offset > 0) offset -= this.total;
        else offset += this.total;
      }

      const isActive = offset === 0;
      const isVisible = Math.abs(offset) <= visibleNeighbors;

      slide.card.classList.toggle('is-active', isActive);
      slide.card.classList.toggle('is-visible', isVisible);
      slide.card.setAttribute('aria-hidden', isActive ? 'false' : 'true');

      if (!isVisible) {
        slide.card.style.opacity = '0';
        slide.card.style.pointerEvents = 'none';
        slide.card.style.transform = `translateX(${offset * 120}%) scale(0.4) rotateY(0deg)`;
        slide.card.style.zIndex = '0';
        return;
      }

      slide.card.style.opacity = '1';
      slide.card.style.pointerEvents = 'auto';

      if (isActive) {
        slide.card.style.transform = `translateX(0px) scale(1) rotateY(0deg) translateZ(0px)`;
        slide.card.style.zIndex = '20';
        slide.card.style.filter = 'none';
      } else {
        const sign = Math.sign(offset);
        const absOffset = Math.abs(offset);

        // Calculate 3D fan transformation
        const tx = sign * (120 + (absOffset - 1) * 75) * this.options.spread;
        const rotY = -sign * this.options.turn;
        const rotZ = sign * this.options.fan * Math.min(absOffset, 2);
        const scale = Math.max(0.68, 1 - absOffset * 0.16);
        const tz = -absOffset * 80 * this.options.depth;

        slide.card.style.transform = `translateX(${tx}px) translateZ(${tz}px) scale(${scale}) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        slide.card.style.zIndex = String(20 - absOffset);
        slide.card.style.filter = `brightness(${1 - this.options.dim * 0.7}) saturate(0.6)`;
      }
    });

    // Update active caption
    if (this.options.captions && this.captionBox) {
      const activeItem = this.items[this.currentIndex];
      if (activeItem) {
        this.captionTitle.textContent = activeItem.title || activeItem.name || '';
        this.captionSubtitle.textContent = activeItem.subtitle || activeItem.shortDescription || '';
      }
    }

    // Update Ticks
    if (this.ticks) {
      this.ticks.forEach((tick, i) => {
        tick.classList.toggle('is-active', i === this.currentIndex);
      });
    }

    this.updateCounter();

    // Disable loop boundaries if loop=false
    if (!this.options.loop && this.controlsBar) {
      if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0;
      if (this.nextBtn) this.nextBtn.disabled = this.currentIndex === this.total - 1;
    }

    if (typeof this.options.onIndexChange === 'function') {
      this.options.onIndexChange(this.currentIndex);
    }
  }

  goTo(index) {
    if (this.total <= 1) return;
    let target = index;
    if (this.options.loop) {
      target = (target % this.total + this.total) % this.total;
    } else {
      target = Math.max(0, Math.min(target, this.total - 1));
    }

    if (target !== this.currentIndex) {
      this.currentIndex = target;
      this.updateSlides();
      this.resetAutoplayTimer();
    }
  }

  next() {
    if (!this.options.loop && this.currentIndex >= this.total - 1) return;
    this.goTo(this.currentIndex + 1);
  }

  previous() {
    if (!this.options.loop && this.currentIndex <= 0) return;
    this.goTo(this.currentIndex - 1);
  }

  play() {
    if (this.reducedMotion) return;
    this.isPlaying = true;
    this.updatePlayPauseIcon();
    this.startAutoplay();
  }

  pause() {
    this.isPlaying = false;
    this.updatePlayPauseIcon();
    this.stopAutoplay();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    if (!this.isPlaying || this.total <= 1 || this.reducedMotion) return;
    this.timer = setInterval(() => {
      if (!this.isHovered && !this.isDragging && !document.hidden) {
        this.next();
      }
    }, this.options.interval * 1000);
  }

  stopAutoplay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  resetAutoplayTimer() {
    if (this.isPlaying) {
      this.startAutoplay();
    }
  }

  bindEvents() {
    // Navigation controls
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previous());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.togglePlay());

    // Caption Action button
    if (this.captionAction) {
      this.captionAction.addEventListener('click', () => {
        this.openActiveModal();
      });
    }

    // Hover pause
    if (this.options.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => {
        this.isHovered = true;
      });
      this.container.addEventListener('mouseleave', () => {
        this.isHovered = false;
      });
    }

    // Visibility pause
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else if (this.isPlaying) {
        this.startAutoplay();
      }
    });

    // Keyboard navigation when focused
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.previous();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (e.target === this.container || e.target.classList.contains('album-rail-card')) {
          e.preventDefault();
          this.openActiveModal();
        }
      }
    });

    // Slide clicks (Active opens modal; neighbor centers slide)
    this.slideElements.forEach(({ card, index }) => {
      card.addEventListener('click', (e) => {
        if (this.hasDragged) return; // avoid click on drag release
        if (index === this.currentIndex) {
          this.openActiveModal();
        } else {
          e.preventDefault();
          this.goTo(index);
        }
      });
    });

    // Drag / Touch gestures with inertia
    if (this.options.draggable && this.total > 1) {
      const onStart = (clientX) => {
        this.isDragging = true;
        this.hasDragged = false;
        this.startX = clientX;
        this.dragOffset = 0;
        this.container.classList.add('is-dragging');
        this.stopAutoplay();
      };

      const onMove = (clientX) => {
        if (!this.isDragging) return;
        const diff = clientX - this.startX;
        if (Math.abs(diff) > 5) {
          this.hasDragged = true;
        }
        this.dragOffset = diff;
      };

      const onEnd = () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.container.classList.remove('is-dragging');

        const threshold = 40;
        if (this.dragOffset < -threshold) {
          this.next();
        } else if (this.dragOffset > threshold) {
          this.previous();
        }

        setTimeout(() => {
          this.hasDragged = false;
        }, 80);

        this.resetAutoplayTimer();
      };

      // Mouse events
      this.stage.addEventListener('mousedown', (e) => {
        onStart(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (this.isDragging) onMove(e.clientX);
      });
      window.addEventListener('mouseup', () => {
        if (this.isDragging) onEnd();
      });

      // Touch events (passive touchmove so page can still scroll vertically)
      this.stage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) onStart(e.touches[0].clientX);
      }, { passive: true });

      this.stage.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          onMove(e.touches[0].clientX);
        }
      }, { passive: true });

      this.stage.addEventListener('touchend', () => {
        onEnd();
      });
    }

    // Window resize update
    window.addEventListener('resize', () => {
      this.updateSlides();
    });
  }

  openActiveModal() {
    const activeItem = this.items[this.currentIndex];
    if (!activeItem) return;

    if (typeof this.options.onSelect === 'function') {
      this.options.onSelect(activeItem, this.currentIndex);
    }

    // Try finding full product record from TR_DATA
    if (typeof window.openProductModal === 'function') {
      let product = activeItem;
      if (window.TR_DATA && window.TR_DATA.TR_PRODUCTS) {
        const found = window.TR_DATA.TR_PRODUCTS.find(p => p.id === activeItem.id || p.id === activeItem.productId || p.name === activeItem.name || p.name === activeItem.title);
        if (found) product = found;
      }
      window.openProductModal(product);
    }
  }

  destroy() {
    this.stopAutoplay();
    this.container.innerHTML = '';
  }
}

// Universal export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AlbumRail;
}
if (typeof window !== 'undefined') {
  window.AlbumRail = AlbumRail;
}
