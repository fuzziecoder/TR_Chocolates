/**
 * PrismCarousel — Reusable Horizontal Coverflow Carousel with Spectrum Dispersion
 * 
 * Public API & Defaults:
 * - items: Array<{ src: string, alt: string, title?: string, subtitle?: string, href?: string }>
 * - startIndex: 0
 * - aspect: 1.5
 * - size: 0.62
 * - neighborScale: 0.66
 * - gap: 14
 * - radius: 18
 * - saturation: 0
 * - dim: 0.2
 * - sweep: 1
 * - sweepDuration: 1.1
 * - dispersion: 1
 * - autoplay: true
 * - interval: 4.5
 * - loop: true
 * - captions: true
 * - controls: true
 * - draggable: true
 * - wheel: true
 * - pauseOnHover: true
 * - backgroundColor: "transparent"
 * - paused: false
 * - dpr: 2
 * - ariaLabel: "Artisan product image coverflow showcase with interactive prism navigation"
 * - onIndexChange?: (index: number) => void
 * - onSelect?: (item: object, index: number) => void
 * - className?: string
 * - style?: object
 * 
 * Imperative Methods:
 * - next()
 * - previous()
 * - goTo(index)
 * - play()
 * - pause()
 * - togglePlay()
 * - destroy()
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PrismCarousel = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  const DEFAULTS = {
    items: [],
    startIndex: 0,
    aspect: 1.5,
    size: 0.62,
    neighborScale: 0.66,
    gap: 14,
    radius: 18,
    saturation: 0,
    dim: 0.2,
    sweep: 1,
    sweepDuration: 1.1,
    dispersion: 1,
    autoplay: true,
    interval: 4.5,
    loop: true,
    captions: true,
    controls: true,
    draggable: true,
    wheel: true,
    pauseOnHover: true,
    backgroundColor: "transparent",
    paused: false,
    dpr: 2,
    ariaLabel: "Artisan product image coverflow showcase with interactive prism navigation",
    onIndexChange: null,
    onSelect: null,
    className: "",
    style: {}
  };

  class PrismCarousel {
    constructor(container, options = {}) {
      if (!container) {
        throw new Error("PrismCarousel requires a valid DOM element as the container.");
      }
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) {
        throw new Error(`PrismCarousel container not found: ${container}`);
      }

      this.options = Object.assign({}, DEFAULTS, options);

      // Clamp startIndex
      const itemCount = (this.options.items || []).length;
      this.currentIndex = itemCount > 0 
        ? Math.max(0, Math.min(this.options.startIndex, itemCount - 1)) 
        : 0;

      this.isPlaying = this.options.autoplay && !this.options.paused;
      this.timer = null;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragDeltaX = 0;
      this.hasDragged = false;
      this.wheelDebounceTimer = null;
      this.wheelAccumulatorX = 0;
      this.wheelAccumulatorY = 0;
      this.isFocused = false;
      this.boundEvents = [];

      // Check prefers-reduced-motion
      this.prefersReducedMotion = false;
      if (typeof window !== 'undefined' && window.matchMedia) {
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.prefersReducedMotion) {
          this.isPlaying = false; // Disable autoplay by default for reduced motion
        }
      }

      this.init();
    }

    init() {
      this.render();
      this.setupEventListeners();
      this.updateState(false);

      if (this.isPlaying && !this.prefersReducedMotion) {
        this.startAutoplay();
      }
    }

    render() {
      const { items, ariaLabel, className, style, backgroundColor, captions, controls } = this.options;

      this.container.innerHTML = '';
      this.root = document.createElement('div');
      this.root.className = `prism-carousel-root ${className || ''}`.trim();
      this.root.setAttribute('role', 'region');
      this.root.setAttribute('aria-roledescription', 'carousel');
      this.root.setAttribute('aria-label', ariaLabel);
      this.root.setAttribute('tabindex', '0');

      if (backgroundColor && backgroundColor !== 'transparent') {
        this.root.style.backgroundColor = backgroundColor;
      }
      if (style && typeof style === 'object') {
        Object.assign(this.root.style, style);
      }

      // CSS custom properties based on configuration
      this.root.style.setProperty('--prism-aspect', this.options.aspect);
      this.root.style.setProperty('--prism-size', this.options.size);
      this.root.style.setProperty('--prism-neighbor-scale', this.options.neighborScale);
      this.root.style.setProperty('--prism-gap', `${this.options.gap}px`);
      this.root.style.setProperty('--prism-radius', `${this.options.radius}px`);
      this.root.style.setProperty('--prism-saturation', this.options.saturation);
      this.root.style.setProperty('--prism-dim', this.options.dim);
      this.root.style.setProperty('--prism-sweep-dur', `${this.options.sweepDuration}s`);

      // Stage Container
      this.stage = document.createElement('div');
      this.stage.className = 'prism-stage';

      // Slides
      this.slideElements = [];
      if (items && items.length > 0) {
        items.forEach((item, idx) => {
          const slide = document.createElement('div');
          slide.className = 'prism-slide';
          slide.dataset.index = idx;
          slide.setAttribute('role', 'group');
          slide.setAttribute('aria-roledescription', 'slide');
          slide.setAttribute('aria-label', `Slide ${idx + 1} of ${items.length}: ${item.title || item.alt || 'Product'}`);

          // Inner wrapper for clipping & radius
          const inner = document.createElement('div');
          inner.className = 'prism-slide-inner';

          // Image
          const img = document.createElement('img');
          img.src = item.src || item.image || '';
          img.alt = item.alt || item.title || 'Product Image';
          img.className = 'prism-slide-image';
          img.loading = idx === 0 ? 'eager' : 'lazy';
          img.onerror = () => {
            img.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'prism-image-fallback';
            fallback.textContent = item.title || 'Image unavailable';
            inner.appendChild(fallback);
          };

          // Spectrum sweep overlay
          const sweepSheen = document.createElement('div');
          sweepSheen.className = 'prism-sweep-sheen';
          sweepSheen.setAttribute('aria-hidden', 'true');

          // Dispersion glow element
          const dispersionGlow = document.createElement('div');
          dispersionGlow.className = 'prism-dispersion-glow';
          dispersionGlow.setAttribute('aria-hidden', 'true');

          inner.appendChild(img);
          inner.appendChild(dispersionGlow);
          inner.appendChild(sweepSheen);
          slide.appendChild(inner);

          this.stage.appendChild(slide);
          this.slideElements.push({ element: slide, inner, img, item });
        });
      } else {
        const emptyNotice = document.createElement('div');
        emptyNotice.className = 'prism-empty-notice';
        emptyNotice.textContent = 'No showcase images configured.';
        this.stage.appendChild(emptyNotice);
      }

      this.root.appendChild(this.stage);

      // Captions Box
      if (captions) {
        this.captionBox = document.createElement('div');
        this.captionBox.className = 'prism-caption-box';
        this.captionTitle = document.createElement('h3');
        this.captionTitle.className = 'prism-caption-title';
        this.captionSubtitle = document.createElement('p');
        this.captionSubtitle.className = 'prism-caption-subtitle';
        this.captionBox.appendChild(this.captionTitle);
        this.captionBox.appendChild(this.captionSubtitle);
        this.root.appendChild(this.captionBox);
      }

      // Controls Bar
      if (controls && items.length > 1) {
        this.controlsBar = document.createElement('div');
        this.controlsBar.className = 'prism-controls-bar';

        // Prev Button
        this.prevBtn = document.createElement('button');
        this.prevBtn.type = 'button';
        this.prevBtn.className = 'prism-ctrl-btn prism-prev-btn';
        this.prevBtn.setAttribute('aria-label', 'Previous slide');
        this.prevBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;

        // Counter
        this.counter = document.createElement('span');
        this.counter.className = 'prism-counter';
        this.counter.setAttribute('aria-live', 'polite');

        // Play / Pause Toggle Button
        if (this.options.autoplay) {
          this.playToggleBtn = document.createElement('button');
          this.playToggleBtn.type = 'button';
          this.playToggleBtn.className = 'prism-ctrl-btn prism-play-btn';
          this.playToggleBtn.setAttribute('aria-label', this.isPlaying ? 'Pause slideshow' : 'Play slideshow');
          this.updatePlayButtonIcon();
        }

        // Next Button
        this.nextBtn = document.createElement('button');
        this.nextBtn.type = 'button';
        this.nextBtn.className = 'prism-ctrl-btn prism-next-btn';
        this.nextBtn.setAttribute('aria-label', 'Next slide');
        this.nextBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        this.controlsBar.appendChild(this.prevBtn);
        if (this.playToggleBtn) this.controlsBar.appendChild(this.playToggleBtn);
        this.controlsBar.appendChild(this.counter);
        this.controlsBar.appendChild(this.nextBtn);

        this.root.appendChild(this.controlsBar);
      }

      this.container.appendChild(this.root);
    }

    addEvent(target, type, handler, options = false) {
      target.addEventListener(type, handler, options);
      this.boundEvents.push({ target, type, handler, options });
    }

    setupEventListeners() {
      // Prev / Next button clicks
      if (this.prevBtn) {
        this.addEvent(this.prevBtn, 'click', (e) => {
          e.preventDefault();
          this.previous();
        });
      }
      if (this.nextBtn) {
        this.addEvent(this.nextBtn, 'click', (e) => {
          e.preventDefault();
          this.next();
        });
      }
      if (this.playToggleBtn) {
        this.addEvent(this.playToggleBtn, 'click', (e) => {
          e.preventDefault();
          this.togglePlay();
        });
      }

      // Slide clicks & selection
      this.slideElements.forEach(({ element, item }, idx) => {
        this.addEvent(element, 'click', (e) => {
          if (this.hasDragged) return; // prevent click on drag release

          if (idx !== this.currentIndex) {
            e.preventDefault();
            this.goTo(idx);
          } else {
            // Clicked active image
            if (typeof this.options.onSelect === 'function') {
              this.options.onSelect(item, idx);
            }
            if (item.href && item.href !== '#' && !item.href.startsWith('javascript:')) {
              window.location.href = item.href;
            }
          }
        });
      });

      // Keyboard navigation
      this.addEvent(this.root, 'keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.previous();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.next();
        } else if (e.key === ' ' || e.key === 'Enter') {
          if (e.target === this.root || e.target.classList.contains('prism-slide')) {
            e.preventDefault();
            const activeItem = this.options.items[this.currentIndex];
            if (activeItem) {
              if (typeof this.options.onSelect === 'function') {
                this.options.onSelect(activeItem, this.currentIndex);
              }
              if (activeItem.href && activeItem.href !== '#') {
                window.location.href = activeItem.href;
              }
            }
          }
        }
      });

      // Focus tracking for wheel & keyboard
      this.addEvent(this.root, 'focusin', () => {
        this.isFocused = true;
        if (this.options.autoplay && this.isPlaying) {
          this.pauseAutoplay();
        }
      });
      this.addEvent(this.root, 'focusout', (e) => {
        if (!this.root.contains(e.relatedTarget)) {
          this.isFocused = false;
          if (this.options.autoplay && !this.options.paused && !this.prefersReducedMotion) {
            this.startAutoplay();
          }
        }
      });

      // Pause on hover
      if (this.options.pauseOnHover) {
        this.addEvent(this.root, 'mouseenter', () => {
          if (this.options.autoplay && this.isPlaying) {
            this.pauseAutoplay();
          }
        });
        this.addEvent(this.root, 'mouseleave', () => {
          if (this.options.autoplay && !this.options.paused && !this.prefersReducedMotion && !this.isFocused) {
            this.startAutoplay();
          }
        });
      }

      // Dragging (Mouse & Touch)
      if (this.options.draggable) {
        this.setupDragEvents();
      }

      // Wheel Navigation
      if (this.options.wheel) {
        this.setupWheelEvents();
      }

      // Visibility change (pause when tab hidden)
      if (typeof document !== 'undefined') {
        const handleVisibility = () => {
          if (document.hidden) {
            this.pauseAutoplay();
          } else if (this.options.autoplay && !this.options.paused && !this.prefersReducedMotion) {
            this.startAutoplay();
          }
        };
        this.addEvent(document, 'visibilitychange', handleVisibility);
      }

      // Resize event to recalculate coverflow positions
      const handleResize = () => {
        this.updatePositions();
      };
      this.addEvent(window, 'resize', handleResize);
    }

    setupDragEvents() {
      const onStart = (clientX) => {
        this.isDragging = true;
        this.hasDragged = false;
        this.dragStartX = clientX;
        this.dragDeltaX = 0;
        this.pauseAutoplay();
        this.root.classList.add('is-dragging');
      };

      const onMove = (clientX) => {
        if (!this.isDragging) return;
        this.dragDeltaX = clientX - this.dragStartX;
        if (Math.abs(this.dragDeltaX) > 6) {
          this.hasDragged = true;
        }
        this.applyDragShift(this.dragDeltaX);
      };

      const onEnd = () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.root.classList.remove('is-dragging');
        this.resetDragShift();

        const threshold = 55; // px to trigger slide change
        if (this.dragDeltaX < -threshold) {
          this.next();
        } else if (this.dragDeltaX > threshold) {
          this.previous();
        }

        if (this.options.autoplay && !this.options.paused && !this.prefersReducedMotion && !this.isFocused) {
          this.startAutoplay();
        }
      };

      // Mouse
      this.addEvent(this.stage, 'mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        onStart(e.clientX);
      });
      this.addEvent(window, 'mousemove', (e) => {
        if (this.isDragging) {
          e.preventDefault();
          onMove(e.clientX);
        }
      });
      this.addEvent(window, 'mouseup', () => {
        if (this.isDragging) onEnd();
      });

      // Touch
      this.addEvent(this.stage, 'touchstart', (e) => {
        if (e.touches.length === 1) {
          onStart(e.touches[0].clientX);
        }
      }, { passive: true });
      this.addEvent(window, 'touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          onMove(e.touches[0].clientX);
        }
      }, { passive: true });
      this.addEvent(window, 'touchend', () => {
        if (this.isDragging) onEnd();
      });
      this.addEvent(window, 'touchcancel', () => {
        if (this.isDragging) onEnd();
      });
    }

    setupWheelEvents() {
      this.addEvent(this.stage, 'wheel', (e) => {
        // Only intercept vertical wheel if the carousel is explicitly focused or active
        const hasFocus = this.isFocused || document.activeElement === this.root || this.root.contains(document.activeElement);
        const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

        if (!isHorizontal && !hasFocus) {
          // Allow normal vertical page scrolling
          return;
        }

        // Horizontal trackpad gesture or focused vertical wheel
        if (isHorizontal || hasFocus) {
          // If non-looping and at bounds, allow leaving section
          if (!this.options.loop) {
            if ((this.currentIndex === 0 && (e.deltaX < 0 || e.deltaY < 0)) ||
                (this.currentIndex === this.options.items.length - 1 && (e.deltaX > 0 || e.deltaY > 0))) {
              return;
            }
          }

          e.preventDefault();
          const delta = isHorizontal ? e.deltaX : e.deltaY;
          this.wheelAccumulatorX += delta;

          if (this.wheelDebounceTimer) clearTimeout(this.wheelDebounceTimer);
          this.wheelDebounceTimer = setTimeout(() => {
            if (this.wheelAccumulatorX > 35) {
              this.next();
            } else if (this.wheelAccumulatorX < -35) {
              this.previous();
            }
            this.wheelAccumulatorX = 0;
          }, 45);
        }
      }, { passive: false });
    }

    applyDragShift(deltaX) {
      // Dynamic shift during drag with spectral dispersion
      const stageWidth = this.stage.clientWidth || 800;
      const normalizedShift = Math.max(-1, Math.min(1, deltaX / (stageWidth * 0.4)));

      this.slideElements.forEach(({ element }, idx) => {
        const offset = idx - this.currentIndex + normalizedShift;
        this.positionSlide(element, offset, true);
      });

      if (this.options.dispersion > 0 && Math.abs(deltaX) > 8) {
        this.root.classList.add('is-dispersing');
      }
    }

    resetDragShift() {
      this.root.classList.remove('is-dispersing');
      this.updatePositions();
    }

    positionSlide(element, offset, isLive = false) {
      const { aspect, size, neighborScale, gap, radius, saturation, dim, dispersion } = this.options;
      const stageHeight = Math.max(380, this.stage.clientHeight || 440);

      // Active slide dimensions
      const activeHeight = stageHeight * size;
      const activeWidth = activeHeight * aspect;

      // Distance from active center
      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      if (absOffset < 0.05) {
        // Center Active Slide
        element.style.transform = `translate3d(calc(-50% + ${offset * (activeWidth + gap)}px), -50%, 0) scale(1)`;
        element.style.width = `${activeWidth}px`;
        element.style.height = `${activeHeight}px`;
        element.style.zIndex = '5';
        element.style.opacity = '1';
        element.style.filter = 'none';
        element.style.borderRadius = `${radius}px`;
      } else {
        // Neighboring Slide
        const scale = Math.max(0.5, neighborScale - (absOffset - 1) * 0.12);
        const currentHeight = activeHeight * scale;
        const currentWidth = currentHeight * aspect;
        const currentRadius = radius * scale;

        // Coverflow horizontal stacking formula
        const centerDistance = (activeWidth / 2) + gap + (currentWidth / 2) + (absOffset - 1) * (currentWidth * 0.35 + gap);
        const translateX = sign * centerDistance;

        // Subtle 3D perspective rotation
        const rotateY = sign * -14;

        element.style.transform = `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale}) rotateY(${rotateY}deg)`;
        element.style.width = `${activeWidth}px`;
        element.style.height = `${activeHeight}px`;
        element.style.zIndex = `${Math.max(1, 4 - Math.round(absOffset))}`;
        element.style.opacity = absOffset > 3 ? '0' : `${Math.max(0.3, 0.85 - (absOffset - 1) * 0.35)}`;
        element.style.borderRadius = `${currentRadius}px`;

        // Monochrome and dim for inactive slides
        element.style.filter = `grayscale(calc(1 - ${saturation})) brightness(calc(1 - ${dim}))`;
      }

      if (isLive) {
        element.style.transition = 'none';
      } else {
        element.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease, filter 0.5s ease';
      }
    }

    updatePositions() {
      this.slideElements.forEach(({ element }, idx) => {
        const offset = idx - this.currentIndex;
        this.positionSlide(element, offset, false);
      });
    }

    updateState(triggerSweep = true) {
      const items = this.options.items || [];
      const total = items.length;
      if (total === 0) return;

      this.updatePositions();

      // Update slide active classes and trigger spectrum reveal sweep
      this.slideElements.forEach(({ element, item }, idx) => {
        const isActive = idx === this.currentIndex;
        element.classList.toggle('is-active', isActive);
        element.setAttribute('aria-hidden', isActive ? 'false' : 'true');

        if (isActive) {
          element.removeAttribute('tabindex');
          if (triggerSweep && !this.prefersReducedMotion && this.options.sweep > 0) {
            element.classList.add('is-sweeping');
            setTimeout(() => {
              element.classList.remove('is-sweeping');
            }, this.options.sweepDuration * 1000);
          }
        } else {
          element.setAttribute('tabindex', '-1');
          element.classList.remove('is-sweeping');
        }
      });

      // Update Captions
      if (this.options.captions && this.captionBox) {
        const activeItem = items[this.currentIndex];
        if (activeItem && (activeItem.title || activeItem.subtitle)) {
          this.captionBox.style.display = 'block';
          if (this.captionTitle) {
            this.captionTitle.textContent = activeItem.title || '';
            this.captionTitle.style.display = activeItem.title ? 'block' : 'none';
          }
          if (this.captionSubtitle) {
            this.captionSubtitle.textContent = activeItem.subtitle || '';
            this.captionSubtitle.style.display = activeItem.subtitle ? 'block' : 'none';
          }
        } else {
          this.captionBox.style.display = 'none';
        }
      }

      // Update Counter
      if (this.counter) {
        const cur = String(this.currentIndex + 1).padStart(2, '0');
        const tot = String(total).padStart(2, '0');
        this.counter.textContent = `${cur} / ${tot}`;
      }

      // Update Button disabled states if loop is false
      if (this.prevBtn) {
        this.prevBtn.disabled = !this.options.loop && this.currentIndex === 0;
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = !this.options.loop && this.currentIndex === total - 1;
      }
    }

    startAutoplay() {
      if (this.timer) clearInterval(this.timer);
      if (!this.options.autoplay || this.options.paused || this.prefersReducedMotion) return;

      this.isPlaying = true;
      this.timer = setInterval(() => {
        this.next(true);
      }, this.options.interval * 1000);
      this.updatePlayButtonIcon();
    }

    pauseAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.isPlaying = false;
      this.updatePlayButtonIcon();
    }

    updatePlayButtonIcon() {
      if (!this.playToggleBtn) return;
      if (this.isPlaying) {
        this.playToggleBtn.setAttribute('aria-label', 'Pause slideshow');
        this.playToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"></rect><rect x="14" y="4" width="4" height="16" rx="1"></rect></svg>`;
      } else {
        this.playToggleBtn.setAttribute('aria-label', 'Play slideshow');
        this.playToggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
      }
    }

    // Imperative Public Methods
    next(fromAutoplay = false) {
      const total = (this.options.items || []).length;
      if (total <= 1) return;

      let nextIndex = this.currentIndex + 1;
      if (nextIndex >= total) {
        if (this.options.loop) {
          nextIndex = 0;
        } else {
          if (fromAutoplay) this.pauseAutoplay();
          return;
        }
      }

      this.goTo(nextIndex);
      if (!fromAutoplay && this.options.autoplay && !this.options.paused && !this.isFocused) {
        this.startAutoplay();
      }
    }

    previous() {
      const total = (this.options.items || []).length;
      if (total <= 1) return;

      let prevIndex = this.currentIndex - 1;
      if (prevIndex < 0) {
        if (this.options.loop) {
          prevIndex = total - 1;
        } else {
          return;
        }
      }

      this.goTo(prevIndex);
      if (this.options.autoplay && !this.options.paused && !this.isFocused) {
        this.startAutoplay();
      }
    }

    goTo(index) {
      const total = (this.options.items || []).length;
      if (total === 0) return;

      const target = Math.max(0, Math.min(index, total - 1));
      if (target === this.currentIndex) return;

      this.currentIndex = target;
      this.updateState(true);

      if (typeof this.options.onIndexChange === 'function') {
        this.options.onIndexChange(this.currentIndex);
      }
    }

    play() {
      this.options.paused = false;
      this.startAutoplay();
    }

    pause() {
      this.options.paused = true;
      this.pauseAutoplay();
    }

    togglePlay() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    destroy() {
      this.pauseAutoplay();
      if (this.wheelDebounceTimer) clearTimeout(this.wheelDebounceTimer);

      this.boundEvents.forEach(({ target, type, handler, options }) => {
        target.removeEventListener(type, handler, options);
      });
      this.boundEvents = [];

      if (this.root && this.root.parentNode) {
        this.root.parentNode.removeChild(this.root);
      }
    }
  }

  return PrismCarousel;
}));
