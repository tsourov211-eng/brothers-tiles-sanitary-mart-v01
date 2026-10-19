"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
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
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconX,
} from "@tabler/icons-react";
import CustomDropdown, { DropdownOption } from "@/components/CustomDropdown";

const CATALOG_BOOK_PAGES = [1, 2, 3, 4, 5, 7, 13, 23, 58, 60, 61, 66, 78, 85, 91, 96, 115, 116];

function normalizeColorValue(c: string): string {
  const lc = (c || "").toLowerCase().trim();
  if (lc === "all" || !lc) return "All";
  if (lc === "white" || lc === "gold" || lc === "white-gold") return "white-gold";
  if (lc === "black" || lc === "charcoal") return "black";
  if (lc === "grey" || lc === "gray" || lc === "silver") return "grey";
  if (lc === "wood" || lc === "brown") return "wood";
  if (lc === "terracotta" || lc === "brick" || lc === "copper") return "terracotta";
  if (lc === "blue" || lc === "oceanic") return "blue";
  if (lc === "green" || lc === "emerald") return "green";
  return c;
}

function normalizeSizeValue(s: string): string {
  if (!s || s.toLowerCase() === "all") return "All";
  const clean = s
    .toLowerCase()
    .replace(/cm/g, "")
    .replace(/inch/g, "")
    .replace(/["″']/g, "")
    .replace(/\s+/g, "")
    .trim();
  if (clean.includes("60x120")) return "60x120";
  if (clean.includes("80x80")) return "80x80";
  if (clean.includes("60x60")) return "60x60";
  if (clean.includes("30x90")) return "30x90";
  if (clean.includes("30x60")) return "30x60";
  if (clean.includes("30x50.5")) return "30x50.5";
  if (clean.includes("25x70")) return "25x70";
  if (clean.includes("25x40")) return "25x40";
  if (clean.includes("20x30")) return "20x30";
  if (clean.includes("40x40")) return "40x40";
  if (clean.includes("30.5x30.5")) return "30.5x30.5";
  if (clean.includes("30x30")) return "30x30";
  if (clean.includes("20x7.5")) return "20x7.5";
  if (clean.includes("30.5x7.5")) return "30.5x7.5";
  return clean;
}

function normalizeSizeForComparison(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/cm/g, "")
    .replace(/inch/g, "")
    .replace(/["″']/g, "")
    .replace(/\s+/g, "")
    .trim();
}

const COLOR_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Color: All" },
  { value: "white-gold", label: "White & Gold", colorSwatch: "#F3F4F6", subLabel: "সাদা ও সোনালি মার্বেল" },
  { value: "black", label: "Black & Charcoal", colorSwatch: "#1F2937", subLabel: "কালো গ্রাফাইট" },
  { value: "grey", label: "Grey & Silver", colorSwatch: "#9CA3AF", subLabel: "ধূসর স্ল্যাব" },
  { value: "wood", label: "Wood & Brown", colorSwatch: "#B45309", subLabel: "কাঠের টেক্সচার" },
  { value: "terracotta", label: "Terracotta & Brick", colorSwatch: "#9E5B40", subLabel: "টেরাকোটা ও কপার" },
  { value: "blue", label: "Blue & Oceanic", colorSwatch: "#2563EB", subLabel: "নীল গ্লেজড" },
  { value: "green", label: "Green & Emerald", colorSwatch: "#3E5A4C", subLabel: "সবুজ ও এমারেল্ড" },
];

const CATEGORY_OPTIONS: DropdownOption[] = [
  { value: "All", label: "All Categories" },
  { value: "Tiles", label: "All Tiles (টাইলস)", subLabel: "সকল টাইলস (৯৯২টি)" },
  { value: "Floor Tiles", label: "Floor Tiles", subLabel: "ফ্লোর টাইলস ও স্ল্যাব" },
  { value: "Wall Tiles", label: "Wall Tiles", subLabel: "ওয়াল টাইলস" },
  { value: "01 - Ceramic Wall Tiles", label: "Ceramic Wall Tiles (478)", subLabel: "সিরামিক ওয়াল" },
  { value: "02 - Ceramic Cladding Tiles", label: "Ceramic Cladding (7)", subLabel: "ক্লাডিং এক্সটেরিয়র" },
  { value: "03 - Porcelain Wall & Floor Tiles", label: "Porcelain Wall & Floor (122)", subLabel: "পোরসেলিন ৩০x৬০" },
  { value: "04 - Porcelain Floor Tiles", label: "Porcelain Floor & Slabs (312)", subLabel: "গ্র্যান্ড স্ল্যাব" },
  { value: "05 - Porcelain Industrial, Step & Parking Tiles", label: "Industrial, Step & Parking (55)", subLabel: "সিঁড়ি ও পার্কিং" },
  { value: "Basin", label: "Basin (বেসিন)", subLabel: "বেসিন ও ভ্যানিটি" },
  { value: "Commode", label: "Commode (কমোড)", subLabel: "কমোড ও প্যান" },
  { value: "Sanitary", label: "Sanitary Ware", subLabel: "স্যানিটারি পণ্য" },
  { value: "Bathroom Accessories", label: "Bathroom Accessories", subLabel: "বাথরুম ফিটিংস" },
  { value: "Stair & Parking", label: "Stair & Parking", subLabel: "সিঁড়ি ও পার্কিং" },
];

const SIZE_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Tile Size: All" },
  { value: "60x120", label: "60x120 cm (24x48″ Slab)", badge: "Flagship" },
  { value: "80x80", label: "80x80 cm (32x32″ Royal)", badge: "Popular" },
  { value: "60x60", label: "60x60 cm (24x24″ Grand)", badge: "Standard" },
  { value: "30x90", label: "30x90 cm (12x36″ Wall)", badge: "Premija" },
  { value: "30x60", label: "30x60 cm (12x24″ Wall/Floor)" },
  { value: "30x50.5", label: "30x50.5 cm (12x20″ Vivid)" },
  { value: "25x70", label: "25x70 cm (10x28″ Paris)" },
  { value: "25x40", label: "25x40 cm (10x16″ Wall)" },
  { value: "20x30", label: "20x30 cm (8x12″ Wall)" },
  { value: "40x40", label: "40x40 cm (16x16″ Parking)" },
  { value: "30.5x30.5", label: "30.5x30.5 cm (Step/Tread)" },
  { value: "30x30", label: "30x30 cm (Parking/Rustic)" },
  { value: "20x7.5", label: "20x7.5 cm (Cladding)" },
  { value: "30.5x7.5", label: "30.5x7.5 cm (Border)" },
];

const FINISH_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Finish: All" },
  { value: "glossy", label: "Glossy / Mirror Polish", subLabel: "চকচকে মিরর পলিশ" },
  { value: "matte", label: "Matte / Satin / Rustic", subLabel: "ম্যাট ও রাস্টিক ফিনিশ" },
  { value: "sugar", label: "Sugar Glazed / Carving", subLabel: "সুগার গ্লেজড ও কার্ভিং" },
];

const BRAND_OPTIONS: DropdownOption[] = [
  { value: "All", label: "Brand: All" },
  { value: "RAK Ceramics", label: "RAK Ceramics", badge: "Flagship" },
  { value: "Akij Ceramics", label: "Akij Ceramics" },
  { value: "DBL Ceramics", label: "DBL Ceramics" },
  { value: "Fu-Wang Ceramic", label: "Fu-Wang Ceramic" },
  { value: "Fresh Ceramics", label: "Fresh Ceramics" },
  { value: "Mir Ceramic", label: "Mir Ceramic" },
  { value: "Abul Khair Ceramic", label: "Abul Khair Ceramic" },
];

const SORT_OPTIONS: DropdownOption[] = [
  { value: "popular", label: "Most Popular", badge: "Hot" },
  { value: "page-asc", label: "Catalog PDF Page (P007 - P114)" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest Arrivals", badge: "New" },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialColor = searchParams.get("color") || "All";
  const initialSize = searchParams.get("size") || "All";
  const initialBrand = searchParams.get("brand") || "All";
  const initialFinish = searchParams.get("finish") || "All";
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "All";
  const initialWishlist = searchParams.get("wishlist") === "true";

  const [category, setCategory] = useState(initialCategory);
  const [color, setColor] = useState(() => normalizeColorValue(initialColor));
  const [size, setSize] = useState(() => normalizeSizeValue(initialSize));
  const [brand, setBrand] = useState(initialBrand);
  const [finish, setFinish] = useState(initialFinish);
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("popular");
  const [onlyWishlist, setOnlyWishlist] = useState(initialWishlist);
  const [activePdfPage, setActivePdfPage] = useState<number>(1);
  const [isPdfZoomOpen, setIsPdfZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.2);
  const [visibleCount, setVisibleCount] = useState<number>(36);

  // Keyboard navigation for PDF Book Zoom Modal
  useEffect(() => {
    if (!isPdfZoomOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPdfZoomOpen(false);
      } else if (e.key === "ArrowLeft") {
        const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : CATALOG_BOOK_PAGES.length - 1;
        setActivePdfPage(CATALOG_BOOK_PAGES[prevIdx]);
      } else if (e.key === "ArrowRight") {
        const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
        const nextIdx = currentIdx < CATALOG_BOOK_PAGES.length - 1 ? currentIdx + 1 : 0;
        setActivePdfPage(CATALOG_BOOK_PAGES[nextIdx]);
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(3, z + 0.25));
      } else if (e.key === "-") {
        setZoomLevel((z) => Math.max(0.8, z - 0.25));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPdfZoomOpen, activePdfPage]);

  const { products, wishlist, toggleWishlist, addToQuoteBag, setSelectedProduct } = useShop();

  // Sync state when URL search parameters change (e.g. clicking links in Header or MegaMenu)
  useEffect(() => {
    const cat = searchParams.get("category");
    const clr = searchParams.get("color");
    const sz = searchParams.get("size");
    const br = searchParams.get("brand");
    const fin = searchParams.get("finish");
    const q = searchParams.get("q");
    const wl = searchParams.get("wishlist");

    if (cat !== null) setCategory(cat);
    if (clr !== null) setColor(normalizeColorValue(clr));
    if (sz !== null) setSize(normalizeSizeValue(sz));
    if (br !== null) setBrand(br);
    if (fin !== null) setFinish(fin);
    if (q !== null) setQuery(q);
    if (wl !== null) setOnlyWishlist(wl === "true");
    setVisibleCount(36);
  }, [searchParams]);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setVisibleCount(36);
  };

  const handleColorChange = (val: string) => {
    setColor(val);
    setVisibleCount(36);
  };

  const handleSizeChange = (val: string) => {
    setSize(val);
    setVisibleCount(36);
  };

  const handleBrandChange = (val: string) => {
    setBrand(val);
    setVisibleCount(36);
  };

  const handleFinishChange = (val: string) => {
    setFinish(val);
    setVisibleCount(36);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setVisibleCount(36);
  };

  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      // 1. Wishlist filter
      if (onlyWishlist && !wishlist.includes(p.id)) return false;

      // 2. New / Bestseller filters
      if (initialFilter === "new" && !p.isNewArrival) return false;
      if (initialFilter === "bestseller" && !p.isBestseller) return false;

      // 3. Category filter
      if (category !== "All") {
        if (
          category.startsWith("01") ||
          category.startsWith("02") ||
          category.startsWith("03") ||
          category.startsWith("04") ||
          category.startsWith("05")
        ) {
          const matchPdf =
            p.pdfCategory === category ||
            (p.subCategory && p.subCategory.toLowerCase().includes(category.toLowerCase()));
          if (!matchPdf) return false;
        } else if (category === "Tiles") {
          const isTile =
            p.category === "Tiles" ||
            p.category === "Floor Tiles" ||
            p.category === "Wall Tiles" ||
            p.category === "Stair & Parking" ||
            Boolean(p.pdfCategory);
          if (!isTile) return false;
        } else if (category === "Floor Tiles") {
          const isFloor =
            p.category === "Floor Tiles" ||
            p.pdfCategory === "04 - Porcelain Floor Tiles" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("floor")) ||
            (p.application && p.application.some((a) => a.toLowerCase().includes("floor")));
          if (!isFloor) return false;
        } else if (category === "Wall Tiles") {
          const isWall =
            p.category === "Wall Tiles" ||
            p.pdfCategory === "01 - Ceramic Wall Tiles" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("wall")) ||
            (p.application && p.application.some((a) => a.toLowerCase().includes("wall")));
          if (!isWall) return false;
        } else if (category === "Stair & Parking") {
          const isStair =
            p.category === "Stair & Parking" ||
            p.pdfCategory === "05 - Porcelain Industrial, Step & Parking Tiles" ||
            (p.subCategory &&
              (p.subCategory.toLowerCase().includes("step") ||
                p.subCategory.toLowerCase().includes("parking") ||
                p.subCategory.toLowerCase().includes("industrial")));
          if (!isStair) return false;
        } else if (category === "Bathroom") {
          const isBath =
            p.category === "Basin" ||
            p.category === "Commode" ||
            p.category === "Sanitary" ||
            p.category === "Bathroom Accessories" ||
            (p.application && p.application.some((a) => a.toLowerCase().includes("bath")));
          if (!isBath) return false;
        } else if (category === "Basin") {
          const isBasin =
            p.category === "Basin" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("basin"));
          if (!isBasin) return false;
        } else if (category === "Commode") {
          const isCommode =
            p.category === "Commode" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("commode"));
          if (!isCommode) return false;
        } else if (category === "Sanitary") {
          const isSanitary =
            p.category === "Sanitary" ||
            p.category === "Basin" ||
            p.category === "Commode" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("sanitary"));
          if (!isSanitary) return false;
        } else if (category === "Bathroom Accessories") {
          const isAccessory =
            p.category === "Bathroom Accessories" ||
            (p.subCategory && p.subCategory.toLowerCase().includes("accessories"));
          if (!isAccessory) return false;
        } else if (p.category.toLowerCase() !== category.toLowerCase()) {
          return false;
        }
      }

      // 4. Color filter
      if (color !== "All") {
        const c = color.toLowerCase();
        const pc = (p.colorFamily || "").toLowerCase();
        const pName = (p.name || "").toLowerCase();
        const pFinish = (p.finish || "").toLowerCase();

        let matches = false;
        if (c === "white" || c === "white-gold") {
          matches =
            pc === "white-gold" ||
            pc === "white" ||
            pName.includes("white") ||
            pName.includes("gold") ||
            pName.includes("ivory") ||
            pName.includes("sophia") ||
            pName.includes("cream");
        } else if (c === "black") {
          matches =
            pc === "black" ||
            pName.includes("black") ||
            pName.includes("mak") ||
            pName.includes("charcoal");
        } else if (c === "grey" || c === "silver") {
          matches =
            pc === "grey" ||
            pc.includes("grey") ||
            pName.includes("grey") ||
            pName.includes("silver") ||
            pFinish.includes("grey");
        } else if (c === "wood" || c === "brown") {
          matches =
            pc === "wood" ||
            pc === "brown" ||
            pName.includes("wood") ||
            pName.includes("parquet") ||
            pName.includes("lwd");
        } else if (c === "terracotta" || c === "beige") {
          matches =
            pc === "terracotta" ||
            pc === "beige" ||
            pName.includes("terracotta") ||
            pName.includes("amber") ||
            pName.includes("shell") ||
            pName.includes("rose");
        } else if (c === "blue") {
          matches = pc === "blue" || pName.includes("blue") || pName.includes("onyx");
        } else if (c === "green") {
          matches = pc === "green" || pName.includes("green") || pName.includes("emerald");
        } else {
          matches = pc === c || pName.includes(c);
        }

        if (!matches) return false;
      }

      // 5. Size filter (space-insensitive, unit-insensitive and format-insensitive)
      if (size !== "All") {
        const targetSize = normalizeSizeForComparison(size);
        const itemCm = normalizeSizeForComparison(p.sizeCm || "");
        const itemInch = normalizeSizeForComparison(p.sizeInch || "");
        const matchesSize =
          itemCm.includes(targetSize) ||
          targetSize.includes(itemCm) ||
          itemInch.includes(targetSize);
        if (!matchesSize) return false;
      }

      // 6. Finish filter
      if (finish !== "All") {
        const pf = (p.finish || "").toLowerCase();
        if (finish === "glossy" && !pf.includes("gloss") && !pf.includes("polish")) return false;
        if (finish === "matte" && !pf.includes("matt") && !pf.includes("satin") && !pf.includes("rustic")) return false;
        if (finish === "sugar" && !pf.includes("sugar") && !pf.includes("carv") && !pf.includes("rocker")) return false;
      }

      // 7. Brand filter
      if (brand !== "All") {
        const pb = (p.brand || "").toLowerCase();
        if (!pb.includes(brand.toLowerCase())) return false;
      }

      // 8. Search query
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const cleanQ = q.replace(/[^a-zA-Z0-9]/g, "");
        const pCode = (p.code || "").toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        const pName = (p.name || "").toLowerCase();
        const pNameBn = (p.nameBn || "").toLowerCase();
        const pSeries = (p.series || "").toLowerCase();
        const pSize = (p.sizeCm || "").toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        const pCategory = (p.category || "").toLowerCase();
        const pSub = (p.subCategory || "").toLowerCase();
        const pPdfCat = (p.pdfCategory || "").toLowerCase();
        const pPage = p.pdfPage ? String(p.pdfPage) : "";

        const match =
          pName.includes(q) ||
          pNameBn.includes(q) ||
          pCode.includes(cleanQ) ||
          pSeries.includes(q) ||
          pSize.includes(cleanQ) ||
          pCategory.includes(q) ||
          pSub.includes(q) ||
          pPdfCat.includes(q) ||
          (pPage && (`page ${pPage}` === q || `p${pPage}` === q || `p0${pPage}` === q || pPage === q));

        if (!match) return false;
      }

      return true;
    });

    const sorted = [...list];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.price || a.pricePerSqFt || 0) - (b.price || b.pricePerSqFt || 0));
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.price || b.pricePerSqFt || 0) - (a.price || a.pricePerSqFt || 0));
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === "page-asc") {
      sorted.sort((a, b) => (a.pdfPage || 999) - (b.pdfPage || 999));
    }
    return sorted;
  }, [category, color, size, finish, brand, query, onlyWishlist, wishlist, initialFilter, sortBy, products]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const resetFilters = () => {
    setCategory("All");
    setColor("All");
    setSize("All");
    setFinish("All");
    setBrand("All");
    setQuery("");
    setSortBy("popular");
    setOnlyWishlist(false);
    setVisibleCount(36);
  };

  const activeFiltersCount =
    (category !== "All" ? 1 : 0) +
    (color !== "All" ? 1 : 0) +
    (size !== "All" ? 1 : 0) +
    (finish !== "All" ? 1 : 0) +
    (brand !== "All" ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    (onlyWishlist ? 1 : 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <div className="bg-obsidian text-white border-b-2 border-gold py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-gold">
              {BUSINESS_INFO.tagline}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 leading-snug">
              <span>Complete Tiles &amp; Sanitary Catalog</span>
              <span className="block text-lg sm:text-xl font-normal text-gold-light mt-1">
                ({BUSINESS_INFO.subLine})
              </span>
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

      {/* Sticky Filter Bar (Static on mobile for maximum browsing viewport, snaps directly beneath navbar on desktop) */}
      <div className="static md:sticky md:top-[var(--header-height,172px)] z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs py-3 sm:py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Filter Dropdowns + Search Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Color Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={color}
              onChange={handleColorChange}
              options={COLOR_OPTIONS}
              ariaLabel="Filter by color"
            />

            {/* Category Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={category}
              onChange={handleCategoryChange}
              options={CATEGORY_OPTIONS}
              ariaLabel="Filter by category"
            />

            {/* Size Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={size}
              onChange={handleSizeChange}
              options={SIZE_OPTIONS}
              ariaLabel="Filter by size"
            />

            {/* Finish Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={finish}
              onChange={handleFinishChange}
              options={FINISH_OPTIONS}
              ariaLabel="Filter by finish"
            />

            {/* Brand Custom Dropdown */}
            <CustomDropdown
              variant="pill"
              value={brand}
              onChange={handleBrandChange}
              options={BRAND_OPTIONS}
              ariaLabel="Filter by brand"
            />

            {/* Search Bar matching header design */}
            <div className="relative flex items-center w-full sm:w-56 lg:w-64 h-[36px] bg-white border border-neutral-300 hover:border-neutral-400 focus-within:border-[#BE8226] focus-within:ring-2 focus-within:ring-[#BE8226]/20 rounded-full pl-3 pr-0 overflow-hidden shadow-2xs transition shrink-0">
              <IconSearch size={14} stroke={1.8} className="text-neutral-500 mr-2 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(36);
                }}
                placeholder="Search tiles, sanitary..."
                className="w-full h-full text-xs text-obsidian placeholder:text-neutral-400 bg-transparent focus:outline-none"
              />
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setVisibleCount(36);
                  }}
                  className="text-neutral-400 hover:text-obsidian p-1 mr-1 shrink-0 cursor-pointer"
                  title="Clear search"
                >
                  <IconX size={13} stroke={2.5} />
                </button>
              )}
              <div className="h-full w-9 bg-[#BE8226] flex items-center justify-center shrink-0 rounded-r-full pointer-events-none">
                <IconSearch size={15} stroke={2.2} className="text-white" />
              </div>
            </div>
          </div>

          {/* Right: Wishlist, Reset & Sort By */}
          <div className="flex items-center justify-between lg:justify-end gap-2 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => {
                setOnlyWishlist(!onlyWishlist);
                setVisibleCount(36);
              }}
              className={`py-1.5 sm:py-2 px-3 sm:px-3.5 text-xs font-semibold rounded-full border transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
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
              <span className="hidden sm:inline">Wishlist</span>
              <span>({wishlist.length})</span>
            </button>

            <button
              onClick={resetFilters}
              className={`py-1.5 sm:py-2 px-3 sm:px-3.5 text-xs font-semibold rounded-full border transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                activeFiltersCount > 0
                  ? "border-gold bg-gold/10 text-obsidian font-bold hover:bg-gold/20"
                  : "border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700"
              }`}
              title="Reset all filters"
            >
              <IconRotate size={13} stroke={2} />
              <span className="hidden sm:inline">Reset</span>
              {activeFiltersCount > 0 && <span>({activeFiltersCount})</span>}
            </button>

            <div className="flex items-center gap-1 text-xs text-neutral-600">
              <span className="text-neutral-500 hidden xl:inline">Sort:</span>
              <CustomDropdown
                variant="pill"
                align="right"
                value={sortBy}
                onChange={handleSortChange}
                options={SORT_OPTIONS}
                ariaLabel="Sort products"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-xs text-neutral-600">
            Showing <strong className="text-obsidian">{displayedProducts.length}</strong> of{" "}
            <strong className="text-obsidian">{filteredProducts.length}</strong> matching products
          </p>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mr-1">
                Active:
              </span>
              {category !== "All" && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>Category: {category.replace(/^0\d\s*-\s*/, "")}</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              {color !== "All" && (
                <button
                  type="button"
                  onClick={() => handleColorChange("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>Color: {COLOR_OPTIONS.find((c) => c.value === color)?.label || color}</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              {size !== "All" && (
                <button
                  type="button"
                  onClick={() => handleSizeChange("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>Size: {size} cm</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              {finish !== "All" && (
                <button
                  type="button"
                  onClick={() => handleFinishChange("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>Finish: {FINISH_OPTIONS.find((f) => f.value === finish)?.label || finish}</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              {brand !== "All" && (
                <button
                  type="button"
                  onClick={() => handleBrandChange("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>Brand: {brand}</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian rounded-full text-[11px] font-medium transition cursor-pointer"
                >
                  <span>"{query}"</span>
                  <IconX size={12} stroke={2.5} />
                </button>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-[11px] font-bold text-gold-dark hover:underline ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
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
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="text-center pt-10">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 36)}
                  className="px-8 py-3.5 bg-obsidian text-gold border-2 border-gold hover:bg-gold hover:text-obsidian font-extrabold text-xs uppercase tracking-widest transition cursor-pointer shadow-md active:scale-98"
                >
                  Load More Designs ({filteredProducts.length - visibleCount} Remaining)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Interactive RAK Ceramics Digital PDF Book Viewer Section - Optimized for Single-Screen Browsing */}
      {(() => {
        const currentPdfIndex = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
        const handlePrevPdfPage = () => {
          const nextIdx = currentPdfIndex > 0 ? currentPdfIndex - 1 : CATALOG_BOOK_PAGES.length - 1;
          setActivePdfPage(CATALOG_BOOK_PAGES[nextIdx]);
        };
        const handleNextPdfPage = () => {
          const nextIdx = currentPdfIndex < CATALOG_BOOK_PAGES.length - 1 ? currentPdfIndex + 1 : 0;
          setActivePdfPage(CATALOG_BOOK_PAGES[nextIdx]);
        };

        return (
          <section className="bg-obsidian text-white border-t-2 border-gold py-4 sm:py-5 px-3 sm:px-6 lg:px-8 mt-6">
            <div className="max-w-[1400px] mx-auto space-y-3 sm:space-y-4">
              {/* Compact Header with Integrated Page Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-gold/30 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 border border-gold/30 rounded-xs">
                      DIGITAL TILES BOOK
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Page {activePdfPage} of 116 ({currentPdfIndex + 1}/{CATALOG_BOOK_PAGES.length})
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5 leading-tight">
                    RAK Ceramics Official Tiles Book Preview
                  </h2>
                </div>

                {/* Single-Row Page Nav Strip with Prev/Next buttons */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                  <button
                    onClick={handlePrevPdfPage}
                    className="px-2 py-1 text-xs font-bold border border-gold/40 bg-obsidian-800 text-gold hover:bg-gold hover:text-obsidian rounded-xs transition shrink-0 flex items-center gap-0.5 cursor-pointer shadow-2xs"
                    title="Previous Page (পূর্ববর্তী পৃষ্ঠা)"
                  >
                    <IconChevronLeft size={14} stroke={2.5} />
                    <span>Prev</span>
                  </button>
                  {CATALOG_BOOK_PAGES.map((pg) => (
                    <button
                      key={pg}
                      onClick={() => setActivePdfPage(pg)}
                      className={`px-1.5 sm:px-2 py-1 text-[11px] font-bold border rounded-xs transition shrink-0 cursor-pointer ${
                        activePdfPage === pg
                          ? "bg-gold text-obsidian border-gold shadow-xs font-black scale-105"
                          : "bg-obsidian-800 text-neutral-300 border-gold/30 hover:border-gold hover:text-white"
                      }`}
                      title={`Go to Page ${pg}`}
                    >
                      P.{pg}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPdfPage}
                    className="px-2 py-1 text-xs font-bold border border-gold/40 bg-obsidian-800 text-gold hover:bg-gold hover:text-obsidian rounded-xs transition shrink-0 flex items-center gap-0.5 cursor-pointer shadow-2xs"
                    title="Next Page (পরবর্তী পৃষ্ঠা)"
                  >
                    <span>Next</span>
                    <IconChevronRight size={14} stroke={2.5} />
                  </button>
                </div>
              </div>

              {/* Viewport-Optimized Dual Columns (Image Preview + Size Index) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch h-auto lg:h-[480px] xl:h-[510px]">
                {/* Left: High-Res Extracted PDF Page with Click-to-Zoom */}
                <div className="lg:col-span-5 flex flex-col w-full h-[420px] sm:h-[460px] lg:h-full">
                  <div
                    onClick={() => {
                      setIsPdfZoomOpen(true);
                      setZoomLevel(1.25);
                    }}
                    className="w-full h-full bg-white p-2 sm:p-2.5 border-2 border-gold shadow-xl flex items-center justify-center relative group select-none cursor-zoom-in"
                    title="Click image to Zoom In (বড় করে দেখতে ক্লিক করুন)"
                  >
                    {/* Previous Page Floating Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevPdfPage();
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-full bg-obsidian/85 hover:bg-gold text-white hover:text-obsidian flex items-center justify-center transition shadow-lg border border-gold/40 cursor-pointer z-10 opacity-90 group-hover:opacity-100 active:scale-95"
                      aria-label="Previous Page"
                      title="Previous Page (পূর্ববর্তী পৃষ্ঠা)"
                    >
                      <IconChevronLeft size={20} stroke={2.5} />
                    </button>

                    {/* Next Page Floating Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextPdfPage();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-full bg-obsidian/85 hover:bg-gold text-white hover:text-obsidian flex items-center justify-center transition shadow-lg border border-gold/40 cursor-pointer z-10 opacity-90 group-hover:opacity-100 active:scale-95"
                      aria-label="Next Page"
                      title="Next Page (পরবর্তী পৃষ্ঠা)"
                    >
                      <IconChevronRight size={20} stroke={2.5} />
                    </button>

                    {/* Top Right Zoom Hint Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-obsidian/85 text-white group-hover:text-gold px-2.5 py-1 rounded-full border border-gold/40 shadow-md transition-all flex items-center gap-1 z-10 pointer-events-none opacity-80 group-hover:opacity-100">
                      <IconZoomIn size={14} stroke={2} />
                      <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Zoom</span>
                    </div>

                    {/* PDF Page Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={`/images/catalog/page-${activePdfPage}.jpg`}
                        alt={`RAK Ceramics Catalog Page ${activePdfPage}`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Complete Size & Series Index from Pages 3–5 */}
                <div className="lg:col-span-7 flex flex-col h-[420px] sm:h-[460px] lg:h-full bg-obsidian-800 border border-gold/40 p-3.5 sm:p-4 w-full overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gold/30 pb-2 shrink-0">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gold">
                      RAK Ceramics Size &amp; Series Index
                    </h3>
                    <span className="text-[10.5px] text-neutral-400">
                      Pages 1–116 Specification
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-1 space-y-3 mt-2.5">
                    {RAK_SIZE_INDEX.map((group) => (
                      <div key={group.type} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white">{group.type}</h4>
                          <span className="text-[10px] text-gold/80 font-mono">{group.standard}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {group.sizes.map((s) => (
                            <div
                              key={s.sizeCm}
                              className="bg-obsidian p-2 border border-neutral-800 text-xs hover:border-gold/50 transition-colors"
                            >
                              <div className="flex justify-between font-bold text-gold">
                                <span>
                                  {s.sizeCm} ({s.sizeInch})
                                </span>
                                <span className="text-[10px] text-neutral-400">PDF pp. {s.pages}</span>
                              </div>
                              <p className="text-[10.5px] text-neutral-300 mt-0.5 leading-tight">
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
            </div>
          </section>
        );
      })()}

      {/* Interactive Fullscreen PDF Book Zoom Lightbox Modal */}
      {isPdfZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5 select-none animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsPdfZoomOpen(false);
          }}
        >
          {/* Top Lightbox Controls Bar */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white border-b border-gold/30 pb-3 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gold bg-gold/15 px-2.5 py-1 border border-gold/40 rounded-xs">
                RAK Ceramics Book
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                Page {activePdfPage} of 116
              </span>
            </div>

            {/* Center/Right Zoom and Navigation Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Zoom In / Zoom Out Controls */}
              <div className="flex items-center bg-neutral-900 border border-gold/40 rounded-full px-2 py-0.5 gap-1 shadow-sm">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
                  className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-gold hover:bg-neutral-800 rounded-full cursor-pointer transition"
                  title="Zoom Out (-)"
                >
                  <IconZoomOut size={16} stroke={2} />
                </button>
                <span className="text-[11px] font-mono font-bold text-gold px-1 min-w-[44px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                  className="w-7 h-7 flex items-center justify-center text-neutral-300 hover:text-gold hover:bg-neutral-800 rounded-full cursor-pointer transition"
                  title="Zoom In (+)"
                >
                  <IconZoomIn size={16} stroke={2} />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white px-1.5 py-0.5 transition cursor-pointer"
                  title="Reset Zoom to 100%"
                >
                  Reset
                </button>
              </div>

              {/* Prev & Next Quick Buttons in Header */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => {
                    const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
                    const prevIdx = currentIdx > 0 ? currentIdx - 1 : CATALOG_BOOK_PAGES.length - 1;
                    setActivePdfPage(CATALOG_BOOK_PAGES[prevIdx]);
                  }}
                  className="px-2.5 py-1 text-xs font-bold border border-gold/40 bg-neutral-900 text-gold hover:bg-gold hover:text-obsidian rounded-xs transition flex items-center gap-1 cursor-pointer"
                  title="Previous Page (‹)"
                >
                  <IconChevronLeft size={14} stroke={2.5} />
                  <span>Prev</span>
                </button>
                <button
                  onClick={() => {
                    const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
                    const nextIdx = currentIdx < CATALOG_BOOK_PAGES.length - 1 ? currentIdx + 1 : 0;
                    setActivePdfPage(CATALOG_BOOK_PAGES[nextIdx]);
                  }}
                  className="px-2.5 py-1 text-xs font-bold border border-gold/40 bg-neutral-900 text-gold hover:bg-gold hover:text-obsidian rounded-xs transition flex items-center gap-1 cursor-pointer"
                  title="Next Page (›)"
                >
                  <span>Next</span>
                  <IconChevronRight size={14} stroke={2.5} />
                </button>
              </div>

              {/* Close Lightbox Button */}
              <button
                onClick={() => setIsPdfZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer shadow-md"
                title="Close (Esc)"
              >
                <IconX size={18} stroke={2.5} />
              </button>
            </div>
          </div>

          {/* Center Image Canvas with Pan & Zoom */}
          <div
            className="relative flex-1 w-full max-w-5xl my-2 overflow-auto flex items-center justify-center p-2 rounded-lg bg-neutral-950/70 border border-neutral-800 cursor-grab active:cursor-grabbing no-scrollbar"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPdfZoomOpen(false);
            }}
          >
            {/* Floating Prev Button in Lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
                const prevIdx = currentIdx > 0 ? currentIdx - 1 : CATALOG_BOOK_PAGES.length - 1;
                setActivePdfPage(CATALOG_BOOK_PAGES[prevIdx]);
              }}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-obsidian/90 hover:bg-gold text-white hover:text-obsidian flex items-center justify-center transition shadow-2xl border-2 border-gold/50 cursor-pointer z-30"
              title="Previous Page (‹)"
            >
              <IconChevronLeft size={24} stroke={2.5} />
            </button>

            {/* Floating Next Button in Lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIdx = CATALOG_BOOK_PAGES.indexOf(activePdfPage);
                const nextIdx = currentIdx < CATALOG_BOOK_PAGES.length - 1 ? currentIdx + 1 : 0;
                setActivePdfPage(CATALOG_BOOK_PAGES[nextIdx]);
              }}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-obsidian/90 hover:bg-gold text-white hover:text-obsidian flex items-center justify-center transition shadow-2xl border-2 border-gold/50 cursor-pointer z-30"
              title="Next Page (›)"
            >
              <IconChevronRight size={24} stroke={2.5} />
            </button>

            {/* High-Resolution Zoomable Scaled Image */}
            <div
              className="relative transition-transform duration-150 ease-out shadow-2xl bg-white border-2 border-gold"
              style={{
                width: `${Math.round(580 * zoomLevel)}px`,
                height: `${Math.round(773 * zoomLevel)}px`,
                maxWidth: "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setZoomLevel((z) => (z >= 2.2 ? 1 : +(z + 0.4).toFixed(2)));
              }}
              title="Click to zoom in / out"
            >
              <Image
                src={`/images/catalog/page-${activePdfPage}.jpg`}
                alt={`RAK Ceramics Catalog Page ${activePdfPage}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Bottom Info & Keyboard Hints */}
          <div className="text-[11px] text-neutral-400 flex items-center gap-3 shrink-0">
            <span>Click image to toggle zoom</span>
            <span>•</span>
            <span>Use ‹ › keys to flip pages</span>
            <span>•</span>
            <span>Press Esc to close</span>
          </div>
        </div>
      )}
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
