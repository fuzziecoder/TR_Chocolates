/**
 * Border Glow — Our Principles Cards
 * Exact Configuration:
 * - edgeSensitivity: 30
 * - glowColor: "34 58 60"
 * - backgroundColor: "#F7E5C8" (vanilla card surface)
 * - borderRadius: 24 (or 16px matching cards)
 * - glowRadius: 22
 * - glowIntensity: 0.5
 * - coneSpread: 25
 * - animated: false
 * - colors: ["#D5A15F", "#FFF0D5", "#B47756"] (gold, cream, caramel)
 * - Pointer-direction tracking, stronger near edges, smooth fade on leave
 * - Quiet static border on touch & reduced motion
 */

class BorderGlowManager {
  constructor(options = {}) {
    this.options = Object.assign({
      edgeSensitivity: 30,
      glowColor: "34 58 60",
      backgroundColor: "#F7E5C8",
      borderRadius: 24,
      glowRadius: 22,
      glowIntensity: 0.5,
      coneSpread: 25,
      animated: false,
      colors: ["#D5A15F", "#FFF0D5", "#B47756"]
    }, options);

    this.isTouch = window.matchMedia('(pointer: coarse)').matches;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    // Apply exclusively to the Our Principles cards
    const cards = document.querySelectorAll('.why-us-card');
    cards.forEach(card => this.setupCard(card));
  }

  setupCard(card) {
    card.classList.add('has-border-glow');

    // Create glow canvas / overlay layer
    const glowLayer = document.createElement('div');
    glowLayer.className = 'border-glow-layer';
    glowLayer.setAttribute('aria-hidden', 'true');
    card.prepend(glowLayer);

    if (this.isTouch || this.isReducedMotion) {
      return; // Quiet static border on touch / reduced motion
    }

    const onPointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Distance to nearest edge
      const distLeft = x;
      const distRight = rect.width - x;
      const distTop = y;
      const distBottom = rect.height - y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      // Intensity increases near edges
      let intensity = this.options.glowIntensity;
      if (minDist < this.options.edgeSensitivity) {
        intensity = Math.min(0.95, intensity + (1 - minDist / this.options.edgeSensitivity) * 0.45);
      }

      card.style.setProperty('--bg-x', `${x}px`);
      card.style.setProperty('--bg-y', `${y}px`);
      card.style.setProperty('--bg-opacity', intensity.toFixed(2));
      card.classList.add('is-glowing');
    };

    const onPointerLeave = () => {
      card.style.setProperty('--bg-opacity', '0');
      card.classList.remove('is-glowing');
    };

    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerleave', onPointerLeave);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.borderGlowManager = new BorderGlowManager();
});
