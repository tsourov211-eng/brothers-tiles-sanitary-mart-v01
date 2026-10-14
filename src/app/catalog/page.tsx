"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  PRODUCTS,
  COLOR_SWATCHES,
  RAK_SIZE_INDEX,
  BUSINESS_INFO,
} from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import {
  IconSearch,
  IconHeart,
  IconHeartFilled,
  IconRotate,
  IconBrandWhatsapp,
  IconAdjustmentsHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import CustomDropdown, { DropdownOption } from "@/components/CustomDropdown";

const CATALOG_BOOK_PAGES = [1, 2, 3, 4, 5, 7, 13, 23, 58, 60, 61, 66, 78, 85, 91, 96, 115, 116];

const COLOR_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Color: All" },
  { value: "white", label: "White & Gold", colorSwatch: "#F3F4F6", subLabel: "সাদা ও সোনালি মার্বেল" },
  { value: "grey", label: "Grey & Silver", colorSwatch: "#9CA3AF", subLabel: "ধূসর স্ল্যাব" },
  { value: "black", label: "Black & Charcoal", colorSwatch: "#1F2937", subLabel: "কালো গ্রাফাইট" },
  { value: "wood", label: "Wood & Oak", colorSwatch: "#B45309", subLabel: "কাঠের টেক্সচার" },
  { value: "beige", label: "Beige & Cream", colorSwatch: "#F5EBE0", subLabel: "আইভরি ও ক্রিম" },
  { value: "blue", label: "Blue & Oceanic", colorSwatch: "#2563EB", subLabel: "নীল গ্লেজড" },
];

const CATEGORY_OPTIONS: DropdownOption[] = [
  { value: "All", label: "All Categories" },
  { value: "Floor Tiles", label: "Floor Tiles", subLabel: "ফ্লোর টাইলস" },
  { value: "Wall Tiles", label: "Wall Tiles", subLabel: "ওয়াল টাইলস" },
  { value: "Tiles", label: "All Tiles", subLabel: "সকল টাইলস" },
  { value: "Basin", label: "Basin", subLabel: "বেসিন ও ভ্যানিটি" },
  { value: "Commode", label: "Commode", subLabel: "কমোড ও প্যান" },
  { value: "Sanitary", label: "Sanitary Ware", subLabel: "স্যানিটারি" },
  { value: "Bathroom Accessories", label: "Accessories", subLabel: "বাথরুম ফিটিংস" },
  { value: "Stair & Parking", label: "Stair & Parking", subLabel: "সিঁড়ি ও পার্কিং" },
];

const SIZE_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Tile Size: All" },
  { value: "60x120", label: "60x120 cm (24x48″ Slab)", badge: "Flagship" },
  { value: "80x80", label: "80x80 cm (32x32″ Royal)", badge: "Popular" },
  { value: "60x60", label: "60x60 cm (24x24″ Grand)", badge: "Standard" },
  { value: "30x60", label: "30x60 cm (12x24″ Wall/Floor)" },
  { value: "30x90", label: "30x90 cm (12x36″ Wall)" },
  { value: "40x40", label: "40x40 cm (16x16″ Parking)" },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: "popular", label: "Most Popular", badge: "Hot" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals", badge: "New" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialColor = searchParams.get("color") || "All";
  const initialSize = searchParams.get("size") || "All";
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "All";
  const initialWishlist = searchParams.get("wishlist") === "true";

  const [category, setCategory] = useState(initialCategory);
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("popular");
  const [onlyWishlist, setOnlyWishlist] = useState(initialWishlist);
  const [activePdfPage, setActivePdfPage] = useState<number>(1);

  const { products, wishlist, toggleWishlist, addToQuoteBag, setSelectedProduct } = useShop();

  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (onlyWishlist && !wishlist.includes(p.id)) return false;
      if (initialFilter === "new" && !p.isNewArrival) return false;
      if (initialFilter === "bestseller" && !p.isBestseller) return false;
      if (category !== "All") {
        if (category === "Bathroom") {
          if (
            p.category !== "Basin" &&
            p.category !== "Commode" &&
            p.category !== "Sanitary" &&
            p.category !== "Bathroom Accessories" &&
            !p.application.some((a) => a.toLowerCase().includes("bath"))
          ) {
            return false;
          }
        } else if (category === "Tiles") {
          if (
            p.category !== "Tiles" &&
            p.category !== "Floor Tiles" &&
            p.category !== "Wall Tiles" &&
            p.category !== "Stair & Parking"
          ) {
            return false;
          }
        } else if (p.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }
      }
      if (color !== "All" && p.colorFamily !== color) return false;
      if (size !== "All" && !p.sizeCm.toLowerCase().includes(size.toLowerCase())) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.nameBn.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.sizeCm.toLowerCase().includes(q) ||
          p.sizeInch.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return sorted;
  }, [category, color, size, query, onlyWishlist, wishlist, initialFilter, sortBy]);

  const resetFilters = () => {
    setCategory("All");
    setColor("All");
    setSize("All");
    setQuery("");
    setSortBy("popular");
    setOnlyWishlist(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <div className="bg-obsidian text-white border-b-2 border-gold py-10 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gold">
              {BUSINESS_INFO.tagline}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Complete Tiles &amp; Sanitary Catalog ({BUSINESS_INFO.subLine})
            </h1>
            <p className="text-xs text-neutral-300 mt-1">
              Tiles • Basin • Commode • Sanitary • Bathroom Accessories — RAK Ceramics, Akij, DBL, Fu-Wang &amp; Abul Khair
            </p>
          </div>
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold hover:bg-gold-light text-obsidian text-xs font-bold uppercase tracking-wider px-5 py-3 transition shrink-0 text-center flex items-center justify-center gap-2"
          >
            <IconBrandWhatsapp size={17} stroke={2} />
            <span>WhatsApp Direct Order: {BUSINESS_INFO.mainPhone}</span>
          </a>
        </div>
      </div>

      {/* Filter Bar (Tilebar exact pill design) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-5 border-b border-neutral-200 bg-white">
        {/* Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div className="relative flex-1 max-w-lg">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
              <IconSearch size={16} stroke={2} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, code or size (e.g. 60x120, Vista, Basin, Commode)..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-full bg-neutral-50 focus:bg-white focus:outline-none focus:border-obsidian transition"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setOnlyWishlist(!onlyWishlist)}
              className={`py-1.5 px-3.5 text-xs font-semibold rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
                onlyWishlist
                  ? "bg-obsidian text-gold border-gold"
                  : "bg-white text-obsidian border-neutral-300 hover:border-obsidian"
              }`}
            >
              {onlyWishlist ? (
                <IconHeartFilled size={13} className="text-gold" />
              ) : (
                <IconHeart size={13} stroke={2} className="text-red-500" />
              )}
              <span>Wishlist ({wishlist.length})</span>
            </button>
            <button
              onClick={resetFilters}
              className="py-1.5 px-3.5 text-xs font-semibold rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition cursor-pointer flex items-center gap-1.5"
            >
              <IconRotate size={13} stroke={2} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Row with Modern Custom Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Color Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={color}
              onChange={setColor}
              options={COLOR_OPTIONS}
              ariaLabel="Filter by color"
            />

            {/* Category Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              ariaLabel="Filter by category"
            />

            {/* Size Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={size}
              onChange={setSize}
              options={SIZE_OPTIONS}
              ariaLabel="Filter by size"
            />

            {/* Static Tilebar Aesthetic Filters */}
            <div className="hidden md:flex items-center gap-2">
              <span className="border border-neutral-300 rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-600 bg-white shadow-2xs">
                Materials
              </span>
              <span className="border border-neutral-300 rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-600 bg-white shadow-2xs">
                Finish
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="border border-neutral-300 rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-600 bg-white flex items-center gap-1 cursor-pointer hover:border-gold transition shadow-2xs"
              >
                <span>All Filters</span>
                <IconAdjustmentsHorizontal size={13} stroke={1.8} />
              </button>
            </div>
          </div>

          {/* Sort By Custom Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <span className="text-neutral-500 hidden sm:inline">Sort By:</span>
            <CustomDropdown
              variant="pill"
              align="right"
              value={sortBy}
              onChange={setSortBy}
              options={SORT_OPTIONS}
              ariaLabel="Sort products"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-neutral-600">
            Showing <strong className="text-obsidian">{filteredProducts.length}</strong> curated products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stonebg-light border border-neutral-200 space-y-3">
            <p className="text-sm font-medium text-obsidian">
              আপনার ফিল্টার অনুযায়ী কোনো পণ্য পাওয়া যায়নি।
            </p>
            <button
              onClick={resetFilters}
              className="bg-obsidian text-gold text-xs font-bold uppercase px-5 py-2.5 cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Interactive RAK Ceramics Digital PDF Book Viewer Section */}
      <section className="bg-obsidian text-white border-t-2 border-gold py-12 px-4 sm:px-8 mt-8">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/30 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                SHOWROOM DIGITAL TILES BOOK (116 PAGES)
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                RAK Ceramics Official Tiles Book Preview
              </h2>
              <p className="text-xs text-neutral-300">
                আমাদের শোরুমের আর-এ-কে সিরামিকস ক্যাটালগের গুরুত্বপূর্ণ পৃষ্ঠাগুলো নিচে সরাসরি দেখুন
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CATALOG_BOOK_PAGES.map((pg) => (
                <button
                  key={pg}
                  onClick={() => setActivePdfPage(pg)}
                  className={`px-2.5 py-1 text-xs font-bold border transition ${
                    activePdfPage === pg
                      ? "bg-gold text-obsidian border-gold"
                      : "bg-obsidian-800 text-neutral-300 border-gold/30 hover:border-gold"
                  }`}
                >
                  Page {pg}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 cols: High-Res Extracted PDF Page */}
            <div className="lg:col-span-2 bg-white p-3 border-2 border-gold shadow-xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={`/images/catalog/page-${activePdfPage}.jpg`}
                  alt={`RAK Ceramics Catalog Page ${activePdfPage}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right 1 col: Complete Size & Series Index from Pages 3–5 */}
            <div className="space-y-4 bg-obsidian-800 border border-gold/40 p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b border-gold/30 pb-2">
                RAK Ceramics Size &amp; Series Index
              </h3>
              {RAK_SIZE_INDEX.map((group) => (
                <div key={group.type} className="space-y-2">
                  <h4 className="text-xs font-bold text-white">{group.type}</h4>
                  <p className="text-[10px] text-gold/80">{group.standard}</p>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {group.sizes.map((s) => (
                      <div
                        key={s.sizeCm}
                        className="bg-obsidian p-2.5 border border-neutral-800 text-xs"
                      >
                        <div className="flex justify-between font-bold text-gold">
                          <span>
                            {s.sizeCm} ({s.sizeInch})
                          </span>
                          <span className="text-[10px] text-neutral-400">PDF pp. {s.pages}</span>
                        </div>
                        <p className="text-[11px] text-neutral-300 mt-1">
                          {s.series.join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading Showroom Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
