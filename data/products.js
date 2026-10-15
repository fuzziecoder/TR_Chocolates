/**
 * TR Homemade Chocolates — Central Product & Category Catalog Data
 * Brand: TR Homemade Chocolates, Hosur
 * Primary tagline: "Homemade with Love"
 * Secondary tagline: "Real Ingredients. Pure Love."
 * Speciality: Kodaikanal-style homemade chocolates and other Kodai special products.
 * Showcase only: No Shopify, no cart, checkout, payments, or ordering forms.
 */

const TR_BRAND_INFO = {
  brandName: "TR Homemade Chocolates",
  location: "Hosur",
  primaryTagline: "Homemade with Love",
  secondaryTagline: "Real Ingredients. Pure Love.",
  speciality: "Kodaikanal-style homemade chocolates and other Kodai special products.",
  instagramUsername: "tr_homemade_chocolates_hosur",
  instagramUrl: "https://www.instagram.com/tr_homemade_chocolates_hosur/",
  phone: "9363151629",
  phoneTel: "tel:+919363151629",
  // Verification required before publishing address / map:
  addressLine1: "Hosur",
  state: "Tamil Nadu",
  showAddress: false, // hidden until verified
  showMap: false      // hidden until verified
};

// 8 Display Categories for the Filterable Catalog
const TR_DISPLAY_CATEGORIES = [
  { id: "all", name: "All", slug: "all" },
  { id: "chocolates", name: "Chocolates", slug: "chocolates" },
  { id: "tea-powder", name: "Tea Powder", slug: "tea-powder" },
  { id: "coffee-powder", name: "Coffee Powder", slug: "coffee-powder" },
  { id: "honey", name: "Honey", slug: "honey" },
  { id: "ghee", name: "Ghee", slug: "ghee" },
  { id: "face-wash", name: "Face Wash", slug: "face-wash" },
  { id: "shampoo", name: "Aloe Vera & Neem Shampoo", slug: "shampoo" }
];

/**
 * Central Products Dataset
 * Contains:
 * 1. Verified Supplied Chocolates (active)
 * 2. Kodai Specialities (active)
 * 3. Requested Draft Chocolate Placeholders (isDraft: true - excluded from public catalog counts)
 */
const TR_PRODUCTS = [
  // ==========================================
  // 1. SUPPLIED CHOCOLATE RECORDS (Active)
  // ==========================================
  {
    id: "choc-101",
    slug: "dark-chocolate-cashew-bark",
    name: "Dark Chocolate Cashew Bark",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Rich dark chocolate bark studded with crisp roasted whole cashews",
    shortDescription: "Slow-tempered rich dark chocolate slab generously studded with slow-roasted golden cashews.",
    description: "Handcrafted in small batches using traditional stone-ground techniques. We temper rich dark chocolate and fold in freshly roasted premium cashews for an irresistible balance of cocoa intensity and nutty crunch.",
    gallery: [
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1000&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Slow-roasted cacao beans, cacao butter, unrefined raw cane sugar, whole roasted cashews.",
    size: "100g handcrafted slab",
    storage: "Store in a cool, dry place away from heat and direct sunlight (16°C – 20°C).",
    usage: "Snap off a crisp piece and allow the dark chocolate to melt gently on your tongue.",
    isDraft: false,
    featured: true,
    tag: "Kodai Speciality"
  },
  {
    id: "choc-102",
    slug: "white-chocolate-almond-crunch",
    name: "White Chocolate Almond Crunch",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Creamy white chocolate bar blended with crunchy roasted almonds",
    shortDescription: "Silky, creamy white chocolate blended with fragrant roasted California almond slivers.",
    description: "Crafted with pure cocoa butter and whole milk essence, gently folded with toasted almond flakes for a velvety melt followed by a delicate, buttery crunch.",
    gallery: [
      "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Pure cocoa butter, whole milk solids, unrefined cane sugar, toasted almond flakes, natural vanilla.",
    size: "100g bar",
    storage: "Keep in a cool, odor-free pantry sealed in an airtight container.",
    usage: "A sublime afternoon sweet treat, paired delightfully with green tea.",
    isDraft: false,
    featured: true,
    tag: "Bestseller"
  },
  {
    id: "choc-103",
    slug: "white-chocolate-pistachio-raisin-bark",
    name: "White Chocolate Pistachio & Raisin Bark",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&auto=format&fit=crop&q=80",
    imageAlt: "White chocolate bark topped with green pistachios and plump sun-dried raisins",
    shortDescription: "Creamy vanilla-infused white chocolate topped with emerald pistachios and sun-dried raisins.",
    description: "An homage to celebration treats: velvety sweet white chocolate topped with crisp slivered Iranian pistachios and naturally chewy sun-dried golden raisins for a layered texture.",
    gallery: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Pure cocoa butter, milk solids, roasted pistachios, sun-dried golden raisins, cane sugar.",
    size: "100g slab",
    storage: "Store below 20°C in an airtight container.",
    usage: "Break into rustic pieces to share during family tea time.",
    isDraft: false,
    featured: true,
    tag: "Artisan Creation"
  },
  {
    id: "choc-104",
    slug: "dark-chocolate-almond-crunch-clusters",
    name: "Dark Chocolate Almond Crunch Clusters",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Bite-sized clusters of roasted almonds coated in velvety dark chocolate",
    shortDescription: "Bite-sized clusters of slow-toasted almonds drenched in velvety dark chocolate.",
    description: "Each cluster is individually hand-spooned, marrying slow-toasted crunchy almonds with single-origin dark chocolate. Rich, satisfying, and packed with honest wholesome flavors.",
    gallery: [
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Whole roasted almonds, dark cacao mass, cacao butter, unrefined raw cane sugar.",
    size: "120g pouch",
    storage: "Keep in a cool, moisture-free container.",
    usage: "A nutrient-rich midday snack or post-dinner sweet nibble.",
    isDraft: false,
    featured: true,
    tag: "Handcrafted Clusters"
  },
  {
    id: "choc-105",
    slug: "mango-delight-fudge-squares",
    name: "Mango Delight Fudge Squares",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Golden mango fudge squares handcrafted with real fruit pulp and white chocolate",
    shortDescription: "Luscious melt-in-the-mouth fudge squares infused with real tropical mango pulp.",
    description: "Crafted with sun-ripened Alphonso mango essence blended slowly with creamy white chocolate fudge. A burst of summery joy with an ultra-smooth, creamy texture.",
    gallery: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Real mango pulp, white chocolate base, condensed milk solids, butter, unrefined cane sugar.",
    size: "150g box (approx. 6 squares)",
    storage: "Refrigerate upon opening for firm fudge texture.",
    usage: "Serve chilled as a refreshing fruit-infused dessert square.",
    isDraft: false,
    featured: true,
    tag: "Seasonal Delight"
  },

  // ==========================================
  // 2. OTHER KODAI SPECIALITIES (Active)
  // ==========================================
  {
    id: "kodai-201",
    slug: "tea-powder",
    name: "Kodai Mountain Tea Powder",
    categoryId: "tea-powder",
    categoryName: "Tea Powder",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Aromatic mountain high-elevation tea powder and whole tea leaves",
    shortDescription: "High-altitude Nilgiris & Kodaikanal tea blend with notes of Green Tea and refreshing Lemon Tea.",
    description: "Sourced from misty high-elevation tea gardens. Carefully cured to yield a bright, brisk amber liquor with clean floral aromas. Also available in refreshing Green Tea and citrus-infused Lemon Tea variations upon request.",
    gallery: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "100% Pure single-estate hill-grown tea leaves (Camellia sinensis).",
    size: "250g / 500g pouch",
    storage: "Store in an airtight opaque container away from heat and moisture.",
    usage: "Boil fresh water, steep 1 teaspoon per cup for 3–4 minutes, strain, and savor hot.",
    isDraft: false,
    featured: true,
    tag: "Mountain Harvest"
  },
  {
    id: "kodai-202",
    slug: "coffee-powder",
    name: "Artisan Kodai Roast Coffee Powder",
    categoryId: "coffee-powder",
    categoryName: "Coffee Powder",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Freshly roasted ground hill-grown coffee powder in rustic bowl",
    shortDescription: "Freshly roasted hill-grown Arabica & Robusta blend with rich notes of caramel and cocoa.",
    description: "Grown under shaded canopy on southern hill slopes. Handpicked cherries are medium-dark roasted in small batches and ground for a smooth, full-bodied morning brew with deep chocolatey undertones.",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "80% Shade-grown Arabica coffee, 20% Robusta (pure coffee, zero chicory unless requested).",
    size: "200g / 500g vacuum sealed pack",
    storage: "Store sealed in a dry cupboard away from strong ambient odors.",
    usage: "Brew in a traditional South Indian filter or French press for 10 minutes.",
    isDraft: false,
    featured: true,
    tag: "Shade-Grown Roast"
  },
  {
    id: "kodai-203",
    slug: "pure-wild-honey",
    name: "Pure Wild Forest Honey",
    categoryId: "honey",
    categoryName: "Honey",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Golden pure unfiltered raw wild forest honey in glass jar",
    shortDescription: "Raw, unfiltered honey collected from forest wildflowers and indigenous hill bee canopies.",
    description: "Harvested gently using traditional methods without artificial pasteurization or ultra-filtration. Preserves the natural nectar complexity, delicate pollen, and rich floral terroir of the forest flora.",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "100% Pure raw wild forest honey.",
    size: "250g / 500g glass jar",
    storage: "Store at ambient room temperature. If crystallized naturally, place jar in warm water.",
    usage: "Drizzle over warm porridge, stir into herbal infusions, or enjoy by the spoonful.",
    isDraft: false,
    featured: true,
    tag: "Raw & Unfiltered"
  },
  {
    id: "kodai-204",
    slug: "pure-cow-ghee",
    name: "A2 Traditional Bilona Cow Ghee",
    categoryId: "ghee",
    categoryName: "Ghee",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Aromatic golden bilona cow ghee with traditional granular texture",
    shortDescription: "Hand-churned bilona-style golden cow ghee simmered slowly over a gentle flame.",
    description: "Prepared according to timeless culinary heritage. Curd made from indigenous cow milk is churned both ways into cultured butter, then simmered slowly until aromatic and golden with a rich granular texture.",
    gallery: [
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "100% Cultured cow milk butterfat.",
    size: "300ml / 500ml jar",
    storage: "Store in a clean dry cupboard away from moisture. Always use a dry spoon.",
    usage: "Add a fragrant spoonful over hot rice, rotis, or use in traditional mindful cooking.",
    isDraft: false,
    featured: true,
    tag: "Cultured Bilona"
  },
  {
    id: "kodai-205",
    slug: "gentle-face-wash",
    name: "Clarifying Botanical Face Wash",
    categoryId: "face-wash",
    categoryName: "Face Wash",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Gentle clarifying botanical foaming face cleanser in amber dispenser",
    shortDescription: "Gentle soap-free foaming facial cleanser enriched with natural rose water and botanical extracts.",
    description: "Infused with hydro-distilled country rose water and gentle plant cleansers. Gently washes away daily impurities, dust, and excess oil without stripping the skin's natural moisture barrier.",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Hydro-distilled rose water, mild coconut-derived surfactants, vegetable glycerin, botanical extracts.",
    size: "100ml pump bottle",
    storage: "Store in a cool dry area away from direct sunlight.",
    usage: "Pump a small amount onto damp hands, massage gently over face, and rinse with lukewarm water.",
    isDraft: false,
    featured: true,
    tag: "Gentle Cleanser"
  },
  {
    id: "kodai-206",
    slug: "aloe-vera-neem-shampoo",
    name: "Aloe Vera & Neem Revitalizing Shampoo",
    categoryId: "shampoo",
    categoryName: "Aloe Vera & Neem Shampoo",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    imageAlt: "Natural clarifying herbal hair cleanser infused with fresh aloe vera and neem extracts",
    shortDescription: "Traditional herbal clarifying shampoo prepared with pure aloe vera leaf juice and wild neem leaves.",
    description: "A restorative hair and scalp cleanser formulated with fresh aloe vera inner fillet and wild neem leaves. Soothes a tired scalp, gently clears residue, and leaves hair soft, naturally shiny, and manageable.",
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80"
    ],
    ingredients: "Fresh Aloe barbadensis leaf extract, Azadirachta indica (Neem) leaf extract, mild herbal cleansing base, purified water.",
    size: "200ml bottle",
    storage: "Keep in a cool dry place. Shake gently before use.",
    usage: "Apply to wet hair, gently lather into scalp for 1–2 minutes, and rinse thoroughly.",
    isDraft: false,
    featured: true,
    tag: "Herbal Care"
  },

  // ==========================================
  // 3. DRAFT CHOCOLATE PLACEHOLDERS
  // Explicitly marked isDraft: true.
  // Excluded from published public catalog and counts until client confirms.
  // ==========================================
  {
    id: "draft-choc-01",
    slug: "fruit-and-nut-chocolate",
    name: "Fruit & Nut Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Fruit & Nut Chocolate",
    shortDescription: "Draft recipe: Blended milk and dark chocolate with mixed dry fruits and nuts.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  },
  {
    id: "draft-choc-02",
    slug: "milk-chocolate",
    name: "Milk Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Milk Chocolate",
    shortDescription: "Draft recipe: Classic velvety homemade milk chocolate bar.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  },
  {
    id: "draft-choc-03",
    slug: "hazelnut-chocolate",
    name: "Hazelnut Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Hazelnut Chocolate",
    shortDescription: "Draft recipe: Roasted whole hazelnuts enrobed in smooth chocolate.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  },
  {
    id: "draft-choc-04",
    slug: "coffee-chocolate",
    name: "Coffee Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Coffee Chocolate",
    shortDescription: "Draft recipe: Dark chocolate infused with freshly ground hill coffee.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  },
  {
    id: "draft-choc-05",
    slug: "orange-chocolate",
    name: "Orange Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Orange Chocolate",
    shortDescription: "Draft recipe: Dark chocolate with sun-dried orange peel zest.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  },
  {
    id: "draft-choc-06",
    slug: "plain-dark-chocolate",
    name: "Plain Dark Chocolate",
    categoryId: "chocolates",
    categoryName: "Chocolates",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Draft placeholder: Plain Dark Chocolate",
    shortDescription: "Draft recipe: Pure single-origin plain dark chocolate bar.",
    description: "Draft record pending client recipe confirmation and product photography.",
    isDraft: true,
    featured: false
  }
];

// Helper: Active published products only (filters out drafts)
const TR_PUBLISHED_PRODUCTS = TR_PRODUCTS.filter(p => !p.isDraft);

// 5 Active Chocolate Records specifically for Album Rail Showcase
const TR_ALBUM_RAIL_CHOCOLATES = TR_PUBLISHED_PRODUCTS.filter(p => p.categoryId === "chocolates");

// 6 Active Kodai Specialities for Accordion Gallery
const TR_ACCORDION_KODAI_SPECIALS = [
  {
    id: "kodai-201",
    title: "Tea Powder",
    subtitle: "High-altitude tea blend with Green Tea & Lemon Tea notes",
    tagline: "Nilgiris & Kodaikanal Hill Gardens",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&auto=format&fit=crop&q=80",
    alt: "Aromatic hill-grown tea powder and loose tea leaves",
    details: "Carefully cured high-elevation tea yielding a brisk golden liquor. Also available in refreshing Green Tea and Lemon Tea notes.",
    productId: "kodai-201"
  },
  {
    id: "kodai-202",
    title: "Coffee Powder",
    subtitle: "Artisan hill-grown Arabica & Robusta dark roast",
    tagline: "Shade-Grown Plantation Roast",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80",
    alt: "Freshly ground artisanal hill roast coffee powder",
    details: "Handpicked hill coffee cherries roasted in small batches to produce a full-bodied cup with comforting caramel and cocoa undertones.",
    productId: "kodai-202"
  },
  {
    id: "kodai-203",
    title: "Wild Forest Honey",
    subtitle: "Raw unfiltered honey gathered from forest wildflowers",
    tagline: "100% Raw Wild Harvest",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&auto=format&fit=crop&q=80",
    alt: "Pure raw golden wild honey in glass jar",
    details: "Unpasteurized and unfiltered raw honey harvested gently from southern forest canopies, rich in natural enzymes and floral aromas.",
    productId: "kodai-203"
  },
  {
    id: "kodai-204",
    title: "A2 Cultured Ghee",
    subtitle: "Hand-churned traditional bilona golden cow ghee",
    tagline: "Timeless Bilona Simmer",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=900&auto=format&fit=crop&q=80",
    alt: "Fragrant golden bilona cow ghee in glass container",
    details: "Cultured curd churned both ways into whole butter, then slowly simmered over a gentle flame into aromatic, granular golden ghee.",
    productId: "kodai-204"
  },
  {
    id: "kodai-205",
    title: "Botanical Face Wash",
    subtitle: "Gentle soap-free foaming cleanser with rose water",
    tagline: "Gentle Hydro-Distilled Botanicals",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80",
    alt: "Botanical clarifying foaming face cleanser in amber bottle",
    details: "Formulated with pure steam hydro-distilled rose water. Cleanses away impurities gently while keeping skin supple and hydrated.",
    productId: "kodai-205"
  },
  {
    id: "kodai-206",
    title: "Aloe Vera & Neem Shampoo",
    subtitle: "Herbal clarifying care with fresh aloe vera & neem",
    tagline: "Traditional Herbal Revitalization",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    alt: "Fresh aloe vera and herbal clarifying shampoo",
    details: "Fresh organic aloe vera fillet and wild neem leaves cold-blended into a gentle restorative shampoo that refreshes hair and soothes the scalp.",
    productId: "kodai-206"
  }
];

// Photo Gallery Masonry Items (real approved client photos)
const TR_GALLERY_PHOTOS = [
  {
    id: "gal-1",
    src: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&auto=format&fit=crop&q=80",
    alt: "Dark Chocolate Cashew Bark on artisan dark stone",
    title: "Dark Chocolate Cashew Bark",
    caption: "Tempered dark chocolate studded with slow-roasted cashews."
  },
  {
    id: "gal-2",
    src: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&auto=format&fit=crop&q=80",
    alt: "White Chocolate Almond Crunch",
    title: "White Chocolate Almond Crunch",
    caption: "Silky white chocolate folded with roasted almond slivers."
  },
  {
    id: "gal-3",
    src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80",
    alt: "Wild Forest Raw Unfiltered Honey",
    title: "Wild Forest Honey",
    caption: "Raw unfiltered honey gathered from southern forest canopies."
  },
  {
    id: "gal-4",
    src: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
    alt: "Dark Chocolate Almond Crunch Clusters",
    title: "Almond Crunch Clusters",
    caption: "Bite-sized roasted almond clusters drenched in dark chocolate."
  },
  {
    id: "gal-5",
    src: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600&auto=format&fit=crop&q=80",
    alt: "Mango Delight Fudge Squares",
    title: "Mango Delight Fudge Squares",
    caption: "Melt-in-the-mouth fudge squares infused with real tropical mango."
  },
  {
    id: "gal-6",
    src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    alt: "Kodai Mountain Tea Harvest",
    title: "Kodai Mountain Tea",
    caption: "Pure high-elevation hill tea with Green Tea & Lemon Tea notes."
  },
  {
    id: "gal-7",
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    alt: "Artisan Hill Roast Coffee",
    title: "Artisan Hill Roast Coffee",
    caption: "Shade-grown Arabica & Robusta beans roasted in small batches."
  },
  {
    id: "gal-8",
    src: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&auto=format&fit=crop&q=85",
    thumb: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&auto=format&fit=crop&q=80",
    alt: "Golden Cultured Cow Ghee",
    title: "A2 Traditional Bilona Ghee",
    caption: "Simmered slowly over a gentle flame into golden granular ghee."
  }
];

// Universal export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TR_BRAND_INFO,
    TR_DISPLAY_CATEGORIES,
    TR_PRODUCTS,
    TR_PUBLISHED_PRODUCTS,
    TR_ALBUM_RAIL_CHOCOLATES,
    TR_ACCORDION_KODAI_SPECIALS,
    TR_GALLERY_PHOTOS
  };
}

if (typeof window !== 'undefined') {
  window.TR_DATA = {
    TR_BRAND_INFO,
    TR_DISPLAY_CATEGORIES,
    TR_PRODUCTS,
    TR_PUBLISHED_PRODUCTS,
    TR_ALBUM_RAIL_CHOCOLATES,
    TR_ACCORDION_KODAI_SPECIALS,
    TR_GALLERY_PHOTOS
  };
}
