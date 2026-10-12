# TR Artisan Reserve — Shopify Online Store 2.0 Theme Documentation

## 1. Executive Summary & Stack Details
This theme has been custom built using **Shopify Online Store 2.0 (OS 2.0)** native architecture, designed specifically for **TR Chocolates & Artisanal Botanicals**. It delivers an artisanal visual identity inspired by heritage craftsmanship (earthy hues, subtle offset card borders, warm editorial typography) while remaining completely decoupled from any third-party proprietary assets.

### Technology Stack & Environment Versions
- **Theme Architecture**: Shopify Online Store 2.0 (Liquid Engine, JSON Templates, Sections & Blocks, Storefront Facet Filtering)
- **Runtime & Build Tools**:
  - Node.js: `v20.18.3`
  - npm: `10.8.2`
  - Zero heavy external JavaScript frameworks (No React, Next.js, or headless overhead)
- **Styling**: Native Modular CSS with CSS Custom Properties (Theme tokens for typography scale, palettes, layout width, and vintage offset shadows)
- **Client Scripting**: Pure Vanilla JavaScript (ES6+ modular, asynchronous, accessible ARIA attributes, zero external dependencies)
- **E-Commerce Logic**: 100% Native Shopify Product Forms (`{% form 'product' %}`), native Cart API, and standard Shopify secure hosted checkout.

---

## 2. Navigation Bar & Visual Mega Menu (Reference Breakdown)
As observed in the reference design and browser inspector context, the header and category showcase incorporate a two-tier interactive navigation structure:

```
+----------------------------------------------------------------------------------------------------+
|  [Logo: TR Artisan]    HOME    SHOP [v]    OUR STORY    CONTACT     [Search]  [Account]  [Cart (0)]|
+----------------------------------------------------------------------------------------------------+
                                    | (Hover / Focus Dropdown)
+----------------------------------------------------------------------------------------------------+
|  Artisan Chocolate  |  Pantry Staples  |  Herbal & Traditional  |  Bath & Body  |  Face & Hair  |  Shop All|
+----------------------------------------------------------------------------------------------------+
| [ Card 1 ]    | [ Card 2 ]    | [ Card 3 ]    | [ Card 4 ]    | [ Card 5 ]    | [ Card 6 ]         |
| Chocolate     | Pantry        | Herbal &      | Bath & Body   | Face Care     | Hair Care          |
| (40+ items)   | Tea, Oil, Ghee| Traditional   | Soap, Body    | Rose Water,   | Aloe Vera Gel,     |
|               | Honey, Coffee | Padhamugan... | Wash & Lotion | Face Wash     | Herbal Shampoo     |
+----------------------------------------------------------------------------------------------------+
```

### Key Navigation Bar Features
1. **Top Bar**:
   - Customizable brand logo with dynamic text fallback (`shop.name`).
   - Sticky header option toggle in Theme Editor.
   - Primary links: **Home**, **Shop**, **Our Story**, **Contact**.
   - Utility icons: Search drawer link, customer account portal (when enabled in admin), and cart item counter badge (`data-cart-count`).
2. **Shop Mega Menu Drawer (`snippets/header-mega-menu.liquid`)**:
   - **Top Sub-links Strip**: Direct access to all key branches and "Shop All".
   - **Horizontal 6-Card Category Showcase**: Six distinct visual cards separated by clean vertical dividers. Each card features an image container, custom category title, and hover zoom animation.
3. **Mobile Navigation Drawer (`snippets/mobile-drawer.liquid`)**:
   - Accessible off-canvas sliding drawer with focus-trapping.
   - Live predictive search bar.
   - Accordion expander for the "Shop" menu revealing all six collections.

---

## 3. The Six Client Collections & Product Architecture

All client collections and naming conventions have been preserved verbatim.

| Collection Handle | Collection Name | Expected Merchant Products / Inclusions | Notes |
| :--- | :--- | :--- | :--- |
| `chocolate` | **Chocolate** | Single-origin bars, mini bars, infused chocolate, seasonal batches (40+ products planned). | Flagship collection; optimized for high catalog depth with pagination and multi-facet filtering. |
| `pantry` | **Pantry** | Tea, coffee, oil, honey, and ghee. | Food-grade pantry staples. |
| `herbal-traditional-care` | **Herbal & Traditional Care** | Padhamugan/Pathimugam, rose merry water and leaf, kasthuri manjal, sandal powder, multani mitti. | Client spellings preserved strictly without altering botanical names. |
| `bath-body` | **Bath & Body** | Soap, body lotion, and body wash. | Artisan handcrafted body essentials. |
| `face-care` | **Face Care** | Rose water and face wash. | Pure botanical facial cleansers and toners. |
| `hair-care` | **Hair Care** | Aloe vera gel and shampoo. | Natural scalp and hair care formulations. |

---

## 4. Complete Inventory of Files Created

```
d:\Desktop\TR_CHOCOLATES/
├── assets/
│   ├── theme.css                  # Core CSS design system, typography, components, and responsive grid
│   └── theme.js                   # Vanilla JS: Mega-menu, mobile drawer, accordions, gallery & variant logic
├── config/
│   ├── settings_schema.json       # Shopify Theme Editor configuration schema (Colors, Typography, Layout, Logo)
│   └── settings_data.json         # Default theme token values
├── layout/
│   └── theme.liquid               # Master HTML5 layout with accessibility links and SEO meta tags
├── locales/
│   └── en.default.json            # English locale internationalization strings
├── sections/
│   ├── announcement-bar.liquid    # Reorderable top announcement banner
│   ├── header.liquid              # Header with logo, nav, cart counter, and mega-menu trigger
│   ├── hero.liquid                # Above-the-fold hero with eager-loaded imagery & vintage offset CTA
│   ├── collection-list.liquid     # "Shop by Category" section rendering the 6 client categories
│   ├── featured-collection.liquid # Merchant-curated collection showcase
│   ├── brand-story.liquid         # Artisan editorial brand narrative section
│   ├── craft-process.liquid       # 3-step traditional craft & heritage methodology
│   ├── seasonal-feature.liquid    # Seasonal & gift highlight (auto-hides when unconfigured)
│   ├── testimonials.liquid        # Press quotes and community feedback section
│   ├── newsletter.liquid          # Native customer newsletter signup form
│   ├── footer.liquid              # Multi-column footer with policies, social links, and copyright
│   ├── main-collection.liquid     # OS 2.0 collection template with Storefront facet filters & sorting
│   ├── main-product.liquid        # PDP with gallery, variant picker, quantity steppers, and accordions
│   ├── main-cart.liquid           # Native shopping cart table with line item updates and note input
│   ├── main-page.liquid           # Standard rich-text page template (Our Story, Contact)
│   ├── main-search.liquid         # Search results page with product filters and no-results suggestions
│   └── main-404.liquid            # Accessible 404 page with navigation redirects
├── snippets/
│   ├── breadcrumbs.liquid         # Semantic breadcrumb trail
│   ├── collection-tile.liquid     # Category card with image and arrow indicator
│   ├── header-mega-menu.liquid    # 6-Card visual mega menu dropdown
│   ├── icon.liquid                # Inline SVGs for search, cart, account, menu, chevrons, stars
│   ├── mobile-drawer.liquid       # Accessible mobile sliding drawer
│   ├── pagination.liquid          # Accessible numeric pagination controls
│   ├── price.liquid               # Price formatter with sale and unit price badges
│   ├── product-card.liquid        # Product card with image hover, badges, and quick-add
│   └── responsive-image.liquid    # Shopify image tag generator with srcset, sizes, and lazy/eager loading
├── templates/
│   ├── 404.json                   # 404 template configuration
│   ├── cart.json                  # Cart template configuration
│   ├── collection.json            # Collection template configuration
│   ├── index.json                 # Homepage template with the complete 10-section sequence
│   ├── page.json                  # Generic page template configuration
│   ├── product.json               # Product detail page configuration
│   └── search.json                # Search template configuration
└── THEME_DOCUMENTATION.md         # Comprehensive project documentation (this file)
```

---

## 5. Shopify Admin Setup Guide for the Merchant

### Step 1: Create the Six Collections
1. In Shopify Admin, navigate to **Products > Collections > Create collection**.
2. Create the collections using the titles and handles below:
   - **Chocolate** (Handle: `chocolate`)
   - **Pantry** (Handle: `pantry`)
   - **Herbal & Traditional Care** (Handle: `herbal-traditional-care`)
   - **Bath & Body** (Handle: `bath-body`)
   - **Face Care** (Handle: `face-care`)
   - **Hair Care** (Handle: `hair-care`)
3. Choose either **Automated** (filtering by Product tag or Product category) or **Manual**.

### Step 2: Adding Real Products
1. Navigate to **Products > Add product**.
2. Enter the exact title (e.g., `Padhamugan Herbal Infusion`, `Kasthuri Manjal Powder`, `Single-Origin Dark Chocolate 72%`).
3. Under **Product organization**, assign the product to one or more of the created collections.
4. Upload authentic photography (recommended size: `1200 x 1200px` square JPG or WebP).
5. Specify prices, SKUs, and inventory. Sold-out badges will trigger automatically when inventory reaches 0.

### Step 3: Navigation Menu Setup
1. Navigate to **Online Store > Navigation > Main menu**.
2. Add links:
   - **Home** (`/`)
   - **Shop** (`/collections`)
     - Submenu item: **Chocolate** (`/collections/chocolate`)
     - Submenu item: **Pantry** (`/collections/pantry`)
     - Submenu item: **Herbal & Traditional Care** (`/collections/herbal-traditional-care`)
     - Submenu item: **Bath & Body** (`/collections/bath-body`)
     - Submenu item: **Face Care** (`/collections/face-care`)
     - Submenu item: **Hair Care** (`/collections/hair-care`)
   - **Our Story** (`/pages/our-story`)
   - **Contact** (`/pages/contact`)

---

## 6. Client Content & Assets Still Needed
- **Brand Imagery**:
  - High-resolution hero image (`1200 x 900px` or `1600 x 1200px`).
  - Six collection thumbnail images for the mega-menu and category list.
  - Real product photography for the 40+ chocolate items and botanical care products.
- **Copywriting**:
  - Client-approved brand history for `pages/our-story`.
  - Specific ingredient origins and batch notes for product accordions.
  - Client contact email and physical location for `pages/contact`.
- **Policies**:
  - Official Shipping, Refund, and Privacy policies configured in **Shopify Admin > Settings > Policies**.

---

## 7. Verification & Testing Log
- **JSON Syntax & Structure**: All 10 JSON files (`settings_data.json`, `settings_schema.json`, `en.default.json`, `index.json`, `product.json`, `collection.json`, `cart.json`, `page.json`, `search.json`, `404.json`) were parsed and validated with zero syntax errors.
- **Section Schema Validation**: All 17 `.liquid` files containing `{% schema %}` blocks were verified for schema syntax and attribute validity using an automated AST parser.
- **Shopify CLI Status**: Shopify CLI is not installed globally in the current system environment (`shopify : The term 'shopify' is not recognized`). Development store synchronization (`shopify theme dev`) and `shopify theme check` require installing `@shopify/cli` or uploading the theme zip directory directly to Shopify Admin (**Online Store > Themes > Add Theme > Upload zip file**).
- **Responsive & Accessibility Checks**:
  - Fully semantic heading hierarchy (`h1` through `h4`).
  - Eager loading on hero media to optimize Largest Contentful Paint (LCP); lazy loading for below-the-fold media.
  - Keyboard accessible skip links, drawer focus controls, and `prefers-reduced-motion` media query compliance.
