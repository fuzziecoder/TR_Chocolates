/**
 * TR Homemade Chocolates — Artisan Product Showcase Server
 * Pure Node.js & Express Showcase Server
 * Zero Shopify dependencies, zero Liquid files, zero cart/checkout logic.
 */

const express = require('express');
const path = require('path');
const {
  TR_BRAND_INFO,
  TR_DISPLAY_CATEGORIES,
  TR_PRODUCTS,
  TR_PUBLISHED_PRODUCTS,
  TR_ALBUM_RAIL_CHOCOLATES,
  TR_ACCORDION_KODAI_SPECIALS,
  TR_GALLERY_PHOTOS
} = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets & data
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'public')));

// Root route sends index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// JSON API endpoint for external consumers or client scripts
app.get('/api/catalog', (req, res) => {
  res.json({
    brand: TR_BRAND_INFO,
    categories: TR_DISPLAY_CATEGORIES,
    products: TR_PRODUCTS,
    publishedProducts: TR_PUBLISHED_PRODUCTS,
    albumRail: TR_ALBUM_RAIL_CHOCOLATES,
    accordion: TR_ACCORDION_KODAI_SPECIALS,
    gallery: TR_GALLERY_PHOTOS
  });
});

// Direct category link fallback
app.get('/collections/:category', (req, res) => {
  res.redirect(`/#products`);
});

// Fallback route (Express 5 compatible)
app.use((req, res) => {
  res.redirect('/');
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n===============================================================`);
  console.log(`🍫 TR HOMEMADE CHOCOLATES — PRODUCT SHOWCASE & CATALOG`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`✨ Caramel Brown + Cocoa Brown + Vanilla Cream Showcase`);
  console.log(`🎡 Album Rail & Accordion Gallery Active`);
  console.log(`🚫 Zero Cart, Checkout, or Shopify Overhead`);
  console.log(`===============================================================\n`);
});
