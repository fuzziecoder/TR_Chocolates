/**
 * Star Border — Existing Explore Buttons
 * Applied ONLY to:
 * 1. The primary hero Explore button (caramel background, light theme)
 * 2. One existing showcase Explore button (cream background, dark theme)
 *
 * Exact Configuration:
 * - duration: 4s
 * - direction: clockwise
 * - stars: 1
 * - trailLength: 0.18
 * - thickness: 1px
 * - radius: 999
 * - glow: 0.25
 * - hover: "lap" (completes one lap on hover / keyboard focus)
 * - clickPulse: true
 * - Quiet resting appearance, no flashing or stardust
 */

class StarBorderManager {
  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    // 1. Primary Hero Explore button
    const heroExploreBtn = document.querySelector('.hero-cta-group a[href="#products"]');
    if (heroExploreBtn) {
      this.setupButton(heroExploreBtn, {
        theme: 'light',
        backgroundColor: '#FBE8C9',
        textColor: '#4C2A1C',
        borderColor: '#D0A27D',
        color: '#69391F',
        trailColor: '#D5A15F'
      });
    }

    // 2. Showcase Explore button in navbar (on cream background)
    const navExploreBtn = document.querySelector('.card-nav-actions a[href="#products"]');
    if (navExploreBtn) {
      this.setupButton(navExploreBtn, {
        theme: 'dark',
        backgroundColor: '#4C2A1C',
        textColor: '#FFF3DF',
        borderColor: '#D0A27D',
        color: '#FFF0D5',
        trailColor: '#D5A15F'
      });
    }
  }

  setupButton(btn, config) {
    btn.classList.add('has-star-border');
    btn.classList.add(`star-border--${config.theme}`);
    btn.style.setProperty('--sb-bg', config.backgroundColor);
    btn.style.setProperty('--sb-text', config.textColor);
    btn.style.setProperty('--sb-border', config.borderColor);
    btn.style.setProperty('--sb-star', config.color);
    btn.style.setProperty('--sb-trail', config.trailColor);

    // SVG container for track and orbiting star
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'star-border-svg');
    svg.setAttribute('aria-hidden', 'true');

    // Base resting border track
    const rectTrack = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectTrack.setAttribute('class', 'star-border-track');
    rectTrack.setAttribute('rx', '999');

    // Orbiting star trail (18% trail)
    const rectTrail = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectTrail.setAttribute('class', 'star-border-trail');
    rectTrail.setAttribute('rx', '999');
    rectTrail.setAttribute('pathLength', '100');

    // Orbiting star point (leading star head)
    const rectStar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectStar.setAttribute('class', 'star-border-star');
    rectStar.setAttribute('rx', '999');
    rectStar.setAttribute('pathLength', '100');

    svg.appendChild(rectTrack);
    svg.appendChild(rectTrail);
    svg.appendChild(rectStar);
    btn.prepend(svg);

    // Update SVG geometry
    const updateDimensions = () => {
      const rect = btn.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

      const radius = Math.min(w, h) / 2;
      [rectTrack, rectTrail, rectStar].forEach(r => {
        r.setAttribute('x', '0.5');
        r.setAttribute('y', '0.5');
        r.setAttribute('width', Math.max(0, w - 1));
        r.setAttribute('height', Math.max(0, h - 1));
        r.setAttribute('rx', radius);
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    if (this.isReducedMotion) return; // Keep static themed border for reduced motion

    let isAnimating = false;

    // "hover: lap" — runs exactly one clockwise lap on hover or focus
    const triggerLap = () => {
      if (isAnimating) return;
      isAnimating = true;
      btn.classList.remove('run-lap');
      // Trigger reflow
      void btn.offsetWidth;
      btn.classList.add('run-lap');

      setTimeout(() => {
        isAnimating = false;
        btn.classList.remove('run-lap');
      }, 4000); // 4s duration
    };

    btn.addEventListener('mouseenter', triggerLap);
    btn.addEventListener('focus', triggerLap);

    // clickPulse: true
    btn.addEventListener('click', () => {
      btn.classList.remove('is-pulsing');
      void btn.offsetWidth;
      btn.classList.add('is-pulsing');
      setTimeout(() => btn.classList.remove('is-pulsing'), 600);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.starBorderManager = new StarBorderManager();
});
