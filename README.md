# Brother’s Tiles & Sanitary Mart (ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট)

**Tagline:** গাজীপুরের বিশ্বস্ত Tiles & Sanitary Showroom  
**Sub-line:** ৫০০০+ ডিজাইন | পাইকারি ও খুচরা  
**Color Theme:** কালো + সোনালি + সাদা (Obsidian Black `#0A0A0A` + Metallic Gold `#D4AF37` + Crisp White `#FFFFFF`)

## Tech Stack
- **Runtime:** Node.js (`>=18.17.0`)
- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Package Manager:** `pnpm`

## Quick Start (কিভাবে প্রজেক্টটি রান করবেন)

```bash
# 1. Install dependencies using pnpm
pnpm install

# 2. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
pnpm build
pnpm start
```

## Key Features & Design Structure
1. **Exact Pixel-Faithful Replica of Reference Design (`tilebarLandingPage.jpg`)**:
   - **Top Announcement Slider Bar** in Black & Gold (`<` announcement `>`).
   - **2-Tier Header** with Brand Emblem, Wide Search Bar, Language Switcher (`বাংলা / EN`), Hotline, Wishlist Counter, and Sample/Quote Bag Drawer.
   - **Full-Width Split-Texture Hero Carousel** with bottom-left typography, `SHOP NOW` CTA, and right-edge floating sticky WhatsApp & Quote Bag action icons.
   - **Shop by Color** (6-column square swatch grid with real extracted RAK tiles).
   - **Explore by Category** (2-column large architectural cards + 5 core product departments: `Tiles`, `Basin`, `Commode`, `Sanitary`, `Bathroom Accessories`).
   - **New Arrivals** (6-card horizontal product showcase).
   - **Full-Width Brand Collaboration Banner** (`RAK CERAMICS × BROTHER'S TILES`).
   - **Bestsellers & Trending** (6-card product row with top-right Wishlist heart `♡` toggle).
   - **Split 50/50 Checkerboard Feature Blocks** (`Wholesale & Retail 5,000+ Designs` + `Free Design & Tile Calculation Services`).
   - **Real-Life Projects** (Asymmetric Bento Grid: 1 large left photo + 2×2 right grid).
   - **4-Column Bottom Value Proposition Bar** (`Expert Curation`, `Premium Quality`, `Fast Home Delivery`, `Personalized Support`).
2. **Real Assets Extracted from Showroom RAK Ceramics 116-Page PDF Catalog**:
   - Located in `public/images/products/`, `public/images/colors/`, `public/images/hero/`, and `public/images/catalog/`.
3. **Contact-Page-Only Phone Number Isolation**:
   - Main Phone / WhatsApp (`+880 1625-073614`) is available site-wide.
   - **Bikash (`+880 1756-998277`)** and **Manager (`+880 1932-836640`)** are strictly displayed **only on the `/contact` page** as instructed.
