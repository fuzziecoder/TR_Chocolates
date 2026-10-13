# TR Homemade Chocolates — Shopify OS 2.0 Theme

A responsive, high-performance **Shopify Online Store 2.0 (OS 2.0)** Liquid theme crafted for an artisan shop featuring handcrafted single-origin chocolates, pantry staples, and authentic traditional herbal wellness formulations.

---

## 🚀 Quick Start: How to Run the Theme Locally (No Login Required)

You can run and test this storefront completely offline on your computer without needing any Shopify account or store login:

### 1. Run the Preview Server
Open your terminal (PowerShell or Command Prompt) in this folder (`d:\Desktop\TR_CHOCOLATES`) and run:

```powershell
npm run preview
```
*(or run `node preview-server.js`)*

### 2. Open in Your Browser
Visit:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ How to Work On and Edit the Theme

| What you want to edit | Which file to open | What it does |
| :--- | :--- | :--- |
| **Colors, Fonts, Layout Styles** | [`assets/theme.css`](assets/theme.css) | Edit CSS variables (`--color-bg-main`, `--color-accent`, `--font-heading`, buttons, shadows, cards). |
| **Interactivity & Scripts** | [`assets/theme.js`](assets/theme.js) | Handles mega-menu, mobile drawer, accordions, gallery thumbnails, and variant selection. |
| **Header & Visual Mega Menu** | [`sections/header.liquid`](sections/header.liquid) & [`snippets/header-mega-menu.liquid`](snippets/header-mega-menu.liquid) | The top navigation bar, logo, and the 6-category visual dropdown cards. |
| **Homepage Hero Banner** | [`sections/hero.liquid`](sections/hero.liquid) | Above-the-fold hero image, headlines, starburst badge, and CTA buttons. |
| **Shop by Category Grid** | [`sections/collection-list.liquid`](sections/collection-list.liquid) | The 6 category tiles on the homepage. |
| **Collection & Filter Pages** | [`sections/main-collection.liquid`](sections/main-collection.liquid) | Facet filtering sidebar (price, availability, tags), sorting dropdown, and product grid. |
| **Product Detail Page (PDP)** | [`sections/main-product.liquid`](sections/main-product.liquid) | Product gallery, variant swatches, quantity stepper, and collapsible ingredient accordions. |
| **Cart Page** | [`sections/main-cart.liquid`](sections/main-cart.liquid) | Shopping cart table, item counters, artisan gift notes, and checkout summary. |
| **Theme Editor Controls** | [`config/settings_schema.json`](config/settings_schema.json) | Add/modify theme settings shown in Shopify's visual customizer. |
| **Local Preview Content** | [`preview-server.js`](preview-server.js) | Update mock data, sample products, or offline routes. |

---

## 📦 How to Deploy to a Real Shopify Store

When you are ready to upload this theme to a client’s live Shopify store:

### Method A: Direct ZIP Upload (Recommended — 1 Minute)
1. Use the pre-built ZIP file in this folder:
   ```
   TR_CHOCOLATES_theme.zip
   ```
2. In Shopify Admin, go to **Online Store** &rarr; **Themes**.
3. Under **Theme library**, click **Add theme** &rarr; **Upload zip file**.
4. Select `TR_CHOCOLATES_theme.zip`.
5. Click **Customize** to add the client's logo, images, and copy, or **Publish** to go live!

*(If you make changes to Liquid or CSS files, re-zip using PowerShell: `Compress-Archive -Path assets, config, layout, locales, sections, snippets, templates -DestinationPath TR_CHOCOLATES_theme.zip -Force`)*

---

### Method B: Live Development via Shopify CLI
If you want to sync changes live with a connected development store:

```powershell
shopify theme dev --store YOUR-ACTUAL-STORE.myshopify.com
```
*(Replace `YOUR-ACTUAL-STORE` with the actual store name from your Shopify admin URL)*.

---

## 🌿 The Six Client Collections

This theme is pre-configured for the client's six core collections:

1. **Chocolate** (`/collections/chocolate`) — Flagship collection structured for 40+ products.
2. **Pantry** (`/collections/pantry`) — Tea, coffee, oil, honey, and ghee.
3. **Herbal & Traditional Care** (`/collections/herbal-traditional-care`) — Padhamugan/Pathimugam, rose merry water and leaf, kasthuri manjal, sandal powder, multani mitti.
4. **Bath & Body** (`/collections/bath-body`) — Soap, body lotion, and body wash.
5. **Face Care** (`/collections/face-care`) — Rose water and face wash.
6. **Hair Care** (`/collections/hair-care`) — Aloe vera gel and shampoo.

---

## 📁 Project Folder Structure

```
TR_CHOCOLATES/
├── assets/                  # CSS styles and JavaScript logic
│   ├── theme.css
│   └── theme.js
├── config/                  # Shopify Theme Editor settings
│   ├── settings_schema.json
│   └── settings_data.json
├── layout/                  # Master theme wrapper
│   └── theme.liquid
├── locales/                 # Internationalization strings
│   └── en.default.json
├── sections/                # Reorderable page components
├── snippets/                # Reusable Liquid cards, icons, & navigation
├── templates/               # OS 2.0 JSON templates
├── preview-server.js        # Offline local development server
├── TR_CHOCOLATES_theme.zip  # Ready-to-upload Shopify theme archive
├── THEME_DOCUMENTATION.md   # Comprehensive technical reference
└── README.md                # Quick start and developer guide
```
