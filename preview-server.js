/**
 * TR Artisan Reserve - Standalone Offline Preview Server
 * Run completely offline with ZERO Shopify login or store connection required!
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from ./assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Mock Store Data
const mockData = {
  shop: {
    name: "TR Artisan Reserve"
  },
  collections: [
    {
      title: "Chocolate",
      handle: "chocolate",
      description: "Handcrafted single-origin, stone-ground chocolate bars, infused confections, and limited batch reserves.",
      products_count: 42,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 101,
          title: "72% Single-Origin Dark Cacao Bar",
          vendor: "TR Reserve",
          price: 9.50,
          compare_at_price: 12.00,
          available: true,
          image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80",
          url: "/products/dark-cacao-bar"
        },
        {
          id: 102,
          title: "Stone-Ground Vanilla Bean Chocolate",
          vendor: "TR Reserve",
          price: 10.00,
          compare_at_price: 10.00,
          available: true,
          image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80",
          url: "/products/vanilla-bean-bar"
        },
        {
          id: 103,
          title: "Roasted Cacao Nibs & Sea Salt Bar",
          vendor: "TR Reserve",
          price: 9.50,
          compare_at_price: 11.50,
          available: true,
          image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&auto=format&fit=crop&q=80",
          url: "/products/cacao-nibs-bar"
        },
        {
          id: 104,
          title: "Cardamom & Raw Honey Dark Chocolate",
          vendor: "TR Reserve",
          price: 11.00,
          compare_at_price: 11.00,
          available: false,
          image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&auto=format&fit=crop&q=80",
          url: "/products/cardamom-honey-bar"
        }
      ]
    },
    {
      title: "Pantry",
      handle: "pantry",
      description: "Wholesome culinary staples: pure tea, specialty coffee, cold-pressed oil, raw honey, and traditional ghee.",
      products_count: 14,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 201,
          title: "Wild Forest Raw Unfiltered Honey",
          vendor: "TR Pantry",
          price: 14.00,
          compare_at_price: 16.00,
          available: true,
          image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
          url: "/products/wild-forest-honey"
        },
        {
          id: 202,
          title: "A2 Cultured Golden Cow Ghee",
          vendor: "TR Pantry",
          price: 22.00,
          compare_at_price: 22.00,
          available: true,
          image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&auto=format&fit=crop&q=80",
          url: "/products/cultured-ghee"
        }
      ]
    },
    {
      title: "Herbal & Traditional Care",
      handle: "herbal-traditional-care",
      description: "Padhamugan/Pathimugam, rose merry water and leaf, kasthuri manjal, sandal powder, and multani mitti.",
      products_count: 18,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 301,
          title: "Pure Pathimugam / Padhamugan Bark",
          vendor: "Traditional Care",
          price: 8.50,
          compare_at_price: 8.50,
          available: true,
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80",
          url: "/products/pathimugam-bark"
        },
        {
          id: 302,
          title: "Wild Kasthuri Manjal (Aromatic Turmeric)",
          vendor: "Traditional Care",
          price: 9.00,
          compare_at_price: 11.00,
          available: true,
          image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
          url: "/products/kasthuri-manjal"
        },
        {
          id: 303,
          title: "Pure Mysore Sandal Powder",
          vendor: "Traditional Care",
          price: 16.00,
          compare_at_price: 16.00,
          available: true,
          image: "https://images.unsplash.com/photo-1608248597359-322046200632?w=600&auto=format&fit=crop&q=80",
          url: "/products/sandal-powder"
        },
        {
          id: 304,
          title: "Organic Multani Mitti (Fuller's Earth)",
          vendor: "Traditional Care",
          price: 7.00,
          compare_at_price: 7.00,
          available: true,
          image: "https://images.unsplash.com/photo-1512290900672-1f41bf372a95?w=600&auto=format&fit=crop&q=80",
          url: "/products/multani-mitti"
        }
      ]
    },
    {
      title: "Bath & Body",
      handle: "bath-body",
      description: "Artisan soap, botanical body lotion, and nourishing botanical body wash.",
      products_count: 12,
      image: "https://images.unsplash.com/photo-1607006314144-846313efef84?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 401,
          title: "Cold-Processed Olive & Honey Artisan Soap",
          vendor: "Bath & Body",
          price: 7.50,
          compare_at_price: 7.50,
          available: true,
          image: "https://images.unsplash.com/photo-1607006314144-846313efef84?w=600&auto=format&fit=crop&q=80",
          url: "/products/artisan-soap"
        }
      ]
    },
    {
      title: "Face Care",
      handle: "face-care",
      description: "Hydro-distilled pure rose water and gentle cleansing botanical face wash.",
      products_count: 8,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 501,
          title: "Hydro-Distilled Pure Rose Water",
          vendor: "Face Care",
          price: 12.00,
          compare_at_price: 14.00,
          available: true,
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
          url: "/products/rose-water"
        }
      ]
    },
    {
      title: "Hair Care",
      handle: "hair-care",
      description: "Pure soothing aloe vera gel and traditional botanical clarifying shampoo.",
      products_count: 9,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      products: [
        {
          id: 601,
          title: "Fresh Pure Aloe Vera Soothing Gel",
          vendor: "Hair Care",
          price: 11.00,
          compare_at_price: 11.00,
          available: true,
          image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
          url: "/products/aloe-vera-gel"
        }
      ]
    }
  ]
};

// Render base layout wrapper
function renderLayout(title, content) {
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} — TR Artisan Reserve</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/theme.css">
  <script src="/assets/theme.js" defer></script>
</head>
<body>
  <!-- Site Header -->
  <header class="site-header-wrapper is-sticky">
    <div class="page-width site-header">
      <button type="button" class="mobile-menu-trigger" data-action="open-mobile-menu" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      <div class="site-header__logo-container">
        <a href="/" class="site-header__logo-link">
          <span class="site-header__logo-text">TR Artisan Reserve</span>
        </a>
      </div>

      <nav class="site-nav" role="navigation">
        <li class="site-nav__item site-nav__item--mega has-dropdown">
          <a href="/collections" class="site-nav__link">
            Shop
          </a>

          <!-- Visual Mega Menu Drawer matching reference -->
          <div class="mega-menu-drawer" id="ShopMegaMenu">
            <div class="page-width mega-menu-inner">
              <div class="mega-menu-sublinks">
                <a href="/collections/chocolate" class="mega-menu-sublink">Fall Collection</a>
                <a href="/collections/chocolate" class="mega-menu-sublink">Best Sellers</a>
                <a href="/collections/chocolate" class="mega-menu-sublink">New Arrivals</a>
                <a href="/collections/pantry" class="mega-menu-sublink">Limited Batch</a>
                <a href="/collections/pantry" class="mega-menu-sublink">Subscribe</a>
                <a href="/collections" class="mega-menu-sublink">Shop All</a>
              </div>

              <div class="mega-menu-grid">
                <a href="/collections/chocolate" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&auto=format&fit=crop&q=80" alt="Chocolate Bars">
                  </div>
                  <span class="mega-menu-card__title">Chocolate Bars</span>
                </a>

                <a href="/collections/pantry" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&auto=format&fit=crop&q=80" alt="Pantry Staples">
                  </div>
                  <span class="mega-menu-card__title">Pantry Staples</span>
                </a>

                <a href="/collections/herbal-traditional-care" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=80" alt="Herbal & Traditional Care">
                  </div>
                  <span class="mega-menu-card__title">Herbal & Traditional</span>
                </a>

                <a href="/collections/bath-body" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1607006314144-846313efef84?w=400&auto=format&fit=crop&q=80" alt="Bath & Body">
                  </div>
                  <span class="mega-menu-card__title">Bath & Body</span>
                </a>

                <a href="/collections/face-care" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80" alt="Face Care">
                  </div>
                  <span class="mega-menu-card__title">Face Care</span>
                </a>

                <a href="/collections/hair-care" class="mega-menu-card">
                  <div class="mega-menu-card__image-box">
                    <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80" alt="Hair Care">
                  </div>
                  <span class="mega-menu-card__title">Hair Care</span>
                </a>
              </div>
            </div>
          </div>
        </li>
        <li class="site-nav__item site-nav__item--mega has-dropdown">
          <a href="/pages/discover" class="site-nav__link discover-trigger" aria-expanded="false" aria-haspopup="true">
            Discover
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>

          <!-- Discover Mega Menu Drawer -->
          <div class="discover-menu-drawer" id="DiscoverMegaMenu">
            <div class="page-width discover-menu-inner">

              <!-- LEFT PANEL -->
              <div class="discover-menu-left">
                <div class="discover-menu-links">
                  <div class="discover-menu-links__col">
                    <a href="/pages/our-story" class="discover-menu-link">Our Story</a>
                    <a href="/pages/artisan-craft" class="discover-menu-link">Artisan Craft</a>
                    <a href="/pages/sourcing" class="discover-menu-link">Ethical Sourcing</a>
                  </div>
                  <div class="discover-menu-links__col">
                    <a href="/pages/faq" class="discover-menu-link">Support</a>
                    <a href="/pages/loyalty" class="discover-menu-link">Loyalty Rewards</a>
                    <a href="/pages/gift-guide" class="discover-menu-link">Gift Guide</a>
                  </div>
                </div>
                <div class="discover-menu-cta">
                  <p class="discover-menu-cta__label">Shop Wholesale</p>
                  <a href="/pages/wholesale" class="discover-menu-cta__btn">Learn More</a>
                </div>
              </div>

              <!-- RIGHT PANEL — 2 feature cards -->
              <div class="discover-menu-cards">
                <a href="/pages/gifting" class="discover-feature-card">
                  <div class="discover-feature-card__img">
                    <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=480&auto=format&fit=crop&q=80" alt="Corporate Gifting" loading="lazy">
                  </div>
                  <div class="discover-feature-card__body">
                    <strong class="discover-feature-card__title">Corporate Gifting</strong>
                    <p class="discover-feature-card__desc">Customizable gifts for holidays, events, partners and celebrations.</p>
                  </div>
                </a>
                <a href="/pages/wholesale" class="discover-feature-card">
                  <div class="discover-feature-card__img">
                    <img src="https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=480&auto=format&fit=crop&q=80" alt="Wholesale" loading="lazy">
                  </div>
                  <div class="discover-feature-card__body">
                    <strong class="discover-feature-card__title">Wholesale</strong>
                    <p class="discover-feature-card__desc">Carry TR Artisan products at your store or café.</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </li>
        <li class="site-nav__item">
          <a href="/pages/contact" class="site-nav__link">Visit</a>
        </li>

      </nav>

      <div class="site-header__utils">
        <a href="/search" class="header-icon-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </a>
        <a href="/cart" class="header-icon-btn" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span class="header-cart-badge">2</span>
        </a>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div class="mobile-nav-overlay" data-action="close-mobile-menu"></div>
  <div class="mobile-nav-drawer" role="dialog" aria-modal="true">
    <div class="mobile-nav-header">
      <span class="site-header__logo-text" style="font-size: 1.4rem;">TR Artisan</span>
      <button type="button" class="header-icon-btn" data-action="close-mobile-menu">✕</button>
    </div>
    <ul class="mobile-nav-list">
      <li><a href="/" class="mobile-nav-link">Home</a></li>
      <li class="mobile-nav-item">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <a href="/collections" class="mobile-nav-link" style="flex-grow: 1;">Shop Collections</a>
          <button type="button" class="mobile-submenu-toggle">▼</button>
        </div>
        <ul class="mobile-nav-submenu">
          ${mockData.collections.map(c => `<li><a href="/collections/${c.handle}" class="mobile-nav-sublink">${c.title}</a></li>`).join('')}
        </ul>
      </li>
      <li><a href="/pages/our-story" class="mobile-nav-link">Our Story</a></li>
      <li><a href="/pages/contact" class="mobile-nav-link">Contact</a></li>
    </ul>
  </div>

  <main role="main">
    ${content}
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="page-width">
      <div class="footer-grid">
        <div>
          <h3 class="footer-col__title">TR Artisan Reserve</h3>
          <p style="color: #CFC5BE; font-size: 0.95rem; line-height: 1.6;">
            Dedicated to artisanal single-origin chocolate, wholesome pantry staples, and authentic traditional herbal wellness formulations.
          </p>
        </div>
        <div>
          <h4 class="footer-col__title">Collections</h4>
          <ul class="footer-links">
            ${mockData.collections.map(c => `<li><a href="/collections/${c.handle}">${c.title}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="footer-col__title">Information</h4>
          <ul class="footer-links">
            <li><a href="/pages/our-story">Our Story</a></li>
            <li><a href="/pages/contact">Contact Us</a></li>
            <li><a href="/pages/faq">Artisan Sourcing FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 class="footer-col__title">Client Care</h4>
          <ul class="footer-links">
            <li><a href="#">Shipping & Handcrafted Care</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 TR Artisan Reserve. Handcrafted with Devotion.</div>
        <div>Online Store 2.0 Native Liquid Architecture</div>
      </div>
    </div>
  </footer>
</body>
</html>
  `;
}

// Route: Homepage
app.get('/', (req, res) => {
  const chocoCol = mockData.collections[0];
  const homeHtml = `
    <!-- Hero Section -->
    <section class="hero-section section-spacing">
      <div class="page-width">
        <div class="hero-grid">
          <div class="hero-content">
            <span class="hero-tagline">Small-Batch Handcrafted</span>
            <h1 class="hero-heading">Pure Artisan Chocolate & Heritage Botanical Care</h1>
            <p class="hero-subtext">
              Handcrafted single-origin chocolate bars, wholesome pantry essentials, and time-honored traditional herbal formulations crafted for mindful living.
            </p>
            <div class="hero-cta-group">
              <a href="/collections/chocolate" class="btn btn--primary">Explore Chocolate</a>
              <a href="/collections/herbal-traditional-care" class="btn btn--secondary">Herbal & Care</a>
            </div>
          </div>
          <div class="hero-media-wrapper">
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1000&auto=format&fit=crop&q=80" alt="Artisan Chocolate">
            </div>
            <div class="hero-badge-starburst">
              <span>Pure<br>Batch</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collection List: 6 Client Collections -->
    <section class="section-spacing">
      <div class="page-width">
        <div class="section-header-row">
          <div>
            <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-accent); display: block; margin-bottom: 0.5rem;">
              Handcrafted Artisanal Reserves
            </span>
            <h2 class="section-title">Shop by Category</h2>
          </div>
          <a href="/collections" class="btn btn--secondary" style="padding: 0.65rem 1.4rem;">Shop All</a>
        </div>

        <div class="collection-tiles-grid">
          ${mockData.collections.map(c => `
            <a href="/collections/${c.handle}" class="collection-tile">
              <div class="collection-tile__media-container">
                <img src="${c.image}" alt="${c.title}">
              </div>
              <div class="collection-tile__info">
                <span class="collection-tile__title">${c.title}</span>
                <span class="collection-tile__arrow">→</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Collection (Chocolate) -->
    <section class="section-spacing" style="background: #F4EFE6;">
      <div class="page-width">
        <div class="section-header-row">
          <div>
            <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-accent); display: block; margin-bottom: 0.5rem;">
              Hand-Poured & Slow-Tempered
            </span>
            <h2 class="section-title">Small-Batch Chocolates</h2>
          </div>
          <a href="/collections/chocolate" class="btn btn--secondary" style="padding: 0.65rem 1.4rem;">View All (40+)</a>
        </div>

        <div class="products-grid">
          ${chocoCol.products.map(p => `
            <div class="product-card">
              <div class="product-card__media">
                ${!p.available ? '<span class="product-badge product-badge--soldout">Sold Out</span>' : (p.compare_at_price > p.price ? '<span class="product-badge product-badge--sale">Sale</span>' : '')}
                <a href="${p.url}">
                  <img src="${p.image}" alt="${p.title}">
                </a>
              </div>
              <div class="product-card__details">
                <div class="product-card__vendor">${p.vendor}</div>
                <h3 class="product-card__title"><a href="${p.url}">${p.title}</a></h3>
                <div class="price-wrapper">
                  <span class="price ${p.compare_at_price > p.price ? 'price--sale' : 'price--regular'}">$${p.price.toFixed(2)}</span>
                  ${p.compare_at_price > p.price ? `<span class="price price--compare">$${p.compare_at_price.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-card__footer">
                  <a href="${p.url}" class="btn btn--secondary btn--full" style="padding: 0.5rem; font-size: 0.85rem;">
                    ${p.available ? 'View & Select' : 'Sold Out'}
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="brand-story section-spacing">
      <div class="page-width">
        <div class="brand-story-grid">
          <div>
            <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); display: block; margin-bottom: 0.75rem;">
              Our Philosophy & Lineage
            </span>
            <h2>Honoring the Earth through Mindful Craft</h2>
            <p>Every bar of single-origin chocolate begins with pure, ethically tended beans, stone-ground with patience. Alongside our confectionery, our traditional care formulations draw upon centuries of botanical heritage—harnessing pure botanicals, cold-pressed oils, and unadulterated roots.</p>
            <div style="margin-top: 2rem;">
              <a href="/pages/our-story" class="btn btn--primary">Read Our Full Story</a>
            </div>
          </div>
          <div class="brand-story__media">
            <img src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=900&auto=format&fit=crop&q=80" alt="Brand Crafting">
          </div>
        </div>
      </div>
    </section>

    <!-- Craft Process -->
    <section class="section-spacing">
      <div class="page-width">
        <div style="text-align: center; max-width: 640px; margin: 0 auto 3rem;">
          <span style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); display: block; margin-bottom: 0.5rem;">
            From Seed to Small Batch
          </span>
          <h2 class="section-title">Our Handcrafted Method</h2>
        </div>

        <div class="craft-process-grid">
          <div class="craft-step-card">
            <div class="craft-step-num">01</div>
            <h3 class="craft-step-title">Ethical Sourcing</h3>
            <p class="craft-step-desc">Selecting raw cacao and native botanical herbs harvested in harmony with regional ecosystems.</p>
          </div>
          <div class="craft-step-card">
            <div class="craft-step-num">02</div>
            <h3 class="craft-step-title">Stone-Ground Patience</h3>
            <p class="craft-step-desc">Refining cacao and medicinal herbs using traditional low-temperature stone mills to preserve volatile notes.</p>
          </div>
          <div class="craft-step-card">
            <div class="craft-step-num">03</div>
            <h3 class="craft-step-title">Artisanal Purity</h3>
            <p class="craft-step-desc">Poured, tempered, and packaged by hand with zero synthetic stabilizers, artificial colors, or fillers.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section section-spacing">
      <div class="page-width">
        <div class="newsletter-box">
          <h2 style="font-size: 2.25rem; margin-bottom: 0.75rem;">Join Our Artisan Circle</h2>
          <p style="color: var(--color-text-secondary); font-size: 1.05rem;">
            Receive quiet notes on small-batch harvests, seasonal releases, and traditional remedies.
          </p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed in offline preview mode!');">
            <input type="email" class="newsletter-input" placeholder="Enter your email address" required>
            <button type="submit" class="btn btn--primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  `;
  res.send(renderLayout('Home', homeHtml));
});

// Route: All Collections or Specific Collection
app.get(['/collections', '/collections/:handle'], (req, res) => {
  const handle = req.params.handle || 'chocolate';
  const collection = mockData.collections.find(c => c.handle === handle) || mockData.collections[0];

  const colHtml = `
    <div class="page-width section-spacing">
      <nav class="breadcrumbs">
        <a href="/">Home</a> <span>›</span> <span>${collection.title}</span>
      </nav>

      <div class="collection-banner">
        <h1 class="collection-banner__title">${collection.title}</h1>
        <p class="collection-banner__desc">${collection.description}</p>
      </div>

      <div class="collection-layout">
        <aside class="filters-sidebar">
          <div style="font-weight: 800; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-subtle-border); padding-bottom: 0.5rem;">
            Filter by
          </div>
          <div class="filter-group">
            <div class="filter-group__title">Availability</div>
            <ul class="filter-list">
              <li><label class="filter-checkbox-label"><input type="checkbox" checked> In Stock</label></li>
              <li><label class="filter-checkbox-label"><input type="checkbox"> Out of Stock</label></li>
            </ul>
          </div>
          <div class="filter-group">
            <div class="filter-group__title">Price Range</div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem;">
              <input type="number" value="5" style="width: 100%; padding: 0.4rem; border: 1.5px solid var(--color-borders); border-radius: 4px;">
              <span>-</span>
              <input type="number" value="30" style="width: 100%; padding: 0.4rem; border: 1.5px solid var(--color-borders); border-radius: 4px;">
            </div>
          </div>
        </aside>

        <div>
          <div class="collection-toolbar">
            <div><strong>${collection.products_count}</strong> products available</div>
            <div>
              <label style="font-weight: 700; text-transform: uppercase; font-size: 0.85rem; margin-right: 0.5rem;">Sort:</label>
              <select class="sort-select">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div class="products-grid">
            ${collection.products.map(p => `
              <div class="product-card">
                <div class="product-card__media">
                  ${!p.available ? '<span class="product-badge product-badge--soldout">Sold Out</span>' : (p.compare_at_price > p.price ? '<span class="product-badge product-badge--sale">Sale</span>' : '')}
                  <a href="${p.url}"><img src="${p.image}" alt="${p.title}"></a>
                </div>
                <div class="product-card__details">
                  <div class="product-card__vendor">${p.vendor}</div>
                  <h3 class="product-card__title"><a href="${p.url}">${p.title}</a></h3>
                  <div class="price-wrapper">
                    <span class="price ${p.compare_at_price > p.price ? 'price--sale' : 'price--regular'}">$${p.price.toFixed(2)}</span>
                    ${p.compare_at_price > p.price ? `<span class="price price--compare">$${p.compare_at_price.toFixed(2)}</span>` : ''}
                  </div>
                  <div class="product-card__footer">
                    <a href="${p.url}" class="btn btn--secondary btn--full" style="padding: 0.5rem; font-size: 0.85rem;">
                      ${p.available ? 'View Details' : 'Sold Out'}
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout(collection.title, colHtml));
});

// Route: Product Detail Page
app.get('/products/:handle', (req, res) => {
  const pHtml = `
    <div class="page-width section-spacing">
      <nav class="breadcrumbs">
        <a href="/">Home</a> <span>›</span> <a href="/collections/chocolate">Chocolate</a> <span>›</span> <span>72% Single-Origin Dark Cacao Bar</span>
      </nav>

      <div class="product-detail-grid">
        <div class="product-gallery" data-product-gallery>
          <div class="product-gallery__main">
            <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1000&auto=format&fit=crop&q=80" alt="Product" data-gallery-main-img>
          </div>
          <div class="product-gallery__thumbs">
            <button type="button" class="product-gallery__thumb-btn is-active" data-gallery-thumb data-image-src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1000&auto=format&fit=crop&q=80">
              <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=160&auto=format&fit=crop&q=80">
            </button>
            <button type="button" class="product-gallery__thumb-btn" data-gallery-thumb data-image-src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=1000&auto=format&fit=crop&q=80">
              <img src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=160&auto=format&fit=crop&q=80">
            </button>
          </div>
        </div>

        <div class="product-info-panel">
          <span class="product-vendor-tag">TR Reserve</span>
          <h1 class="product-title">72% Single-Origin Dark Cacao Bar</h1>
          <div class="product-price-box">
            <span class="price price--sale">$9.50</span>
            <span class="price price--compare">$12.00</span>
          </div>

          <div class="variant-picker-section">
            <div class="variant-option-name">Size:</div>
            <div class="variant-swatches">
              <button class="variant-radio-btn is-selected">Single Bar (70g)</button>
              <button class="variant-radio-btn">Artisan 3-Pack Box</button>
            </div>
          </div>

          <div>
            <label style="display: block; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Quantity:</label>
            <div class="quantity-stepper">
              <button type="button" class="quantity-btn" data-quantity-minus>−</button>
              <input type="number" value="1" min="1" class="quantity-input">
              <button type="button" class="quantity-btn" data-quantity-plus>+</button>
            </div>
          </div>

          <div style="margin: 1.5rem 0 2rem;">
            <a href="/cart" class="btn btn--primary btn--full" style="padding: 1.1rem;">Add to Cart — $9.50</a>
          </div>

          <div class="product-accordions" style="border-top: 2px solid var(--color-borders);">
            <div class="accordion-item">
              <button type="button" class="accordion-trigger" aria-expanded="true" aria-controls="acc-1">
                <span>Overview</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div id="acc-1" class="accordion-content is-open">
                Slow-tempered single-origin cacao stone-ground with unrefined cane sugar over 72 uninterrupted hours. Rich notes of dark cherry, roasted almond, and warm spice.
              </div>
            </div>
            <div class="accordion-item">
              <button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="acc-2">
                <span>Ingredients & Origins</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div id="acc-2" class="accordion-content">
                Organic Raw Cacao Beans, Organic Cold-Pressed Cocoa Butter, Organic Jaggery / Cane Sugar. Hand-poured in micro-batches.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderLayout('Product Details', pHtml));
});

// Route: Cart
app.get('/cart', (req, res) => {
  const cartHtml = `
    <div class="page-width section-spacing">
      <h1 style="font-size: 2.75rem; margin-bottom: 2rem;">Your Artisan Cart</h1>

      <div class="cart-table-wrapper">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="cart-item-flex">
                  <div class="cart-item-thumb">
                    <img src="https://images.unsplash.com/photo-1548907040-4baa42d10919?w=160&auto=format&fit=crop&q=80">
                  </div>
                  <div>
                    <strong>72% Single-Origin Dark Cacao Bar</strong>
                    <div style="font-size: 0.85rem; color: var(--color-text-secondary);">Single Bar (70g)</div>
                    <a href="#" style="font-size: 0.8rem; color: #B25342; text-decoration: underline;">Remove</a>
                  </div>
                </div>
              </td>
              <td>$9.50</td>
              <td style="text-align: center;">
                <div class="quantity-stepper" style="margin-bottom: 0;">
                  <button class="quantity-btn">−</button>
                  <input type="number" value="2" class="quantity-input">
                  <button class="quantity-btn">+</button>
                </div>
              </td>
              <td style="text-align: right; font-weight: 700;">$19.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="cart-summary-box">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <span class="cart-subtotal">$19.00 USD</span>
        </div>
        <p style="color: var(--color-text-secondary); font-size: 0.85rem; margin-bottom: 1.5rem;">
          Taxes and shipping calculated at checkout.
        </p>
        <button type="button" class="btn btn--primary btn--full" style="padding: 1.1rem;" onclick="alert('Proceeding to native Shopify checkout in live store!')">
          Proceed to Checkout
        </button>
      </div>
    </div>
  `;
  res.send(renderLayout('Cart', cartHtml));
});

// Route: Story
app.get('/pages/our-story', (req, res) => {
  const storyHtml = `
    <div class="page-width section-spacing">
      <div style="max-width: 820px; margin: 0 auto;">
        <h1 style="font-size: 3rem; margin-bottom: 1.5rem; text-align: center;">Our Story & Heritage</h1>
        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--color-text-secondary); margin-bottom: 1.5rem;">
          TR Artisan Reserve was born from an unhurried reverence for the botanical kingdom. We marry single-origin artisanal chocolate making with centuries-old Indian herbal care rituals.
        </p>
        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--color-text-secondary);">
          From smallholder cacao growers to heritage botanical harvesters supplying pure Padhamugan/Pathimugam, Kasthuri Manjal, and wild floral waters, every batch is crafted without compromise.
        </p>
      </div>
    </div>
  `;
  res.send(renderLayout('Our Story', storyHtml));
});

// Route: Contact
app.get('/pages/contact', (req, res) => {
  const contactHtml = `
    <div class="page-width section-spacing">
      <div style="max-width: 640px; margin: 0 auto;">
        <h1 style="font-size: 2.75rem; margin-bottom: 1.5rem; text-align: center;">Contact Our Studio</h1>
        <form style="display: flex; flex-direction: column; gap: 1rem;" onsubmit="event.preventDefault(); alert('Message sent in preview mode!');">
          <input type="text" placeholder="Your Name" style="padding: 0.85rem; border: 2px solid var(--color-borders); border-radius: 6px;" required>
          <input type="email" placeholder="Your Email" style="padding: 0.85rem; border: 2px solid var(--color-borders); border-radius: 6px;" required>
          <textarea rows="5" placeholder="Your Message or Custom Order Inquiry" style="padding: 0.85rem; border: 2px solid var(--color-borders); border-radius: 6px;" required></textarea>
          <button type="submit" class="btn btn--primary">Send Message</button>
        </form>
      </div>
    </div>
  `;
  res.send(renderLayout('Contact', contactHtml));
});

// Route: Search
app.get('/search', (req, res) => {
  res.redirect('/collections');
});

// Start listening
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🌿 TR ARTISAN RESERVE - OFFLINE PREVIEW SERVER`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`👉 Zero login or Shopify store connection required!`);
  console.log(`==================================================\n`);
});
