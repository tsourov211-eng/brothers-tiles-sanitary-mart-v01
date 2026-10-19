"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconZoomIn,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconMapPin,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export interface ShowroomSlide {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
}

export const SHOWROOM_SLIDES: ShowroomSlide[] = [
  {
    id: "facade",
    src: "/images/showroom/showroom_image.jpg",
    title: "GRAND ENTRANCE & NIGHT ILLUMINATION",
    subtitle: "Flagship Showroom Exterior • Dhaka-Mymensingh Highway",
    category: "EXTERIOR",
    location: "Main Entrance",
  },
  {
    id: "central-aisle",
    src: "/images/showroom/image5.jpg",
    title: "CENTRAL SHOWROOM CORRIDOR",
    subtitle: "Expansive Display Wings with False Ceiling LED Lighting",
    category: "TILES",
    location: "Central Wing",
  },
  {
    id: "tile-gallery",
    src: "/images/showroom/image7.jpg",
    title: "50-METER ILLUMINATED TILE RUN",
    subtitle: "Continuous Under-Shelf Focus Displays for Wall & Floor Tiles",
    category: "TILES",
    location: "Gallery A",
  },
  {
    id: "marble-slabs",
    src: "/images/showroom/image9.jpg",
    title: "LARGE FORMAT MARBLE SLABS",
    subtitle: "Emerald Blue, Portoro Gold & Imported Galaxy Granite",
    category: "SLABS",
    location: "Slab Zone",
  },
  {
    id: "floor-collection",
    src: "/images/showroom/image8.jpg",
    title: "GLOSSY PORCELAIN & ONYX TILES",
    subtitle: "High-Gloss Vitrified Surfaces for Living & Commercial Spaces",
    category: "TILES",
    location: "Floor Section",
  },
  {
    id: "decor-murals",
    src: "/images/showroom/image3.jpg",
    title: "3D SCENIC MURALS & DECOR WALLS",
    subtitle: "Nature, Waterfall & Luxury Floral Accent Highlighter Tiles",
    category: "DECOR",
    location: "Decor Studio",
  },
  {
    id: "giant-slabs",
    src: "/images/showroom/image4.jpg",
    title: "GIANT MARBLE WALL DISPLAYS",
    subtitle: "Turf-Trimmed Full-Scale Porcelain Slab Installations",
    category: "SLABS",
    location: "Gallery B",
  },
  {
    id: "sanitary-suite",
    src: "/images/showroom/image10.jpg",
    title: "SANITARY WARE & PEDESTAL BASIN SUITE",
    subtitle: "Comprehensive RAK Ceramics Sanitary Ware Showcase",
    category: "SANITARY",
    location: "Sanitary Wing",
  },
  {
    id: "basin-corridor",
    src: "/images/showroom/image6.jpg",
    title: "ARTISAN BASINS & POLISHED CORRIDORS",
    subtitle: "Height-Adjusted Vanity Fixtures & Marble Tile Combinations",
    category: "SANITARY",
    location: "Sanitary Wing",
  },
  {
    id: "vip-lounge",
    src: "/images/showroom/image2.jpg",
    title: "VIP CLIENT LOUNGE & EXPERIENCE CENTER",
    subtitle: "Comfortable Seating for Client Discussions & Free 3D Budgeting",
    category: "LOUNGE",
    location: "Executive Lounge",
  },
  {
    id: "reception",
    src: "/images/showroom/image12.jpg",
    title: "EXECUTIVE RECEPTION & CONSULTATION",
    subtitle: "Dedicated Architectural Consultants for Custom Site Measurements",
    category: "RECEPTION",
    location: "Front Desk",
  },
  {
    id: "model-house",
    src: "/images/showroom/image11.jpg",
    title: "ARCHITECTURAL MOCKUP DISPLAY",
    subtitle: "Live Roof, Driveway, Parking & Exterior Cladding Concepts",
    category: "ARCHITECTURE",
    location: "Center Stage",
  },
  {
    id: "flagship-overview",
    src: "/images/showroom/image1.png",
    title: "FLAGSHIP SHOWROOM PANORAMA",
    subtitle: "10,000+ Sq. Ft. All-in-One Tiles & Sanitary Destination",
    category: "OVERVIEW",
    location: "Full Hub",
  },
];

const SLIDE_DURATION = 3500; // Brisk page transition speed
const FLIP_DURATION = 780; // Corner page curl fold duration

export default function ShowroomGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = SHOWROOM_SLIDES.length;
  const currentSlide = SHOWROOM_SLIDES[currentIndex];
  const previousSlide = SHOWROOM_SLIDES[prevIndex];

  const triggerFlip = useCallback(
    (nextIdx: number, dir: "next" | "prev") => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
      setPrevIndex(currentIndex);
      setCurrentIndex(nextIdx);
      setFlipDirection(dir);
      setIsFlipping(true);

      flipTimeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
      }, FLIP_DURATION);
    },
    [currentIndex]
  );

  const nextSlide = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalSlides;
    triggerFlip(nextIdx, "next");
  }, [currentIndex, totalSlides, triggerFlip]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentIndex - 1 + totalSlides) % totalSlides;
    triggerFlip(prevIdx, "prev");
  }, [currentIndex, totalSlides, triggerFlip]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      const dir = index > currentIndex ? "next" : "prev";
      triggerFlip(index, dir);
    },
    [currentIndex, triggerFlip]
  );

  // Auto-play timer: flips pages briskly, pauses on hover with NO pause icon
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Lightbox Modal State for Individual Full-Size Images
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalSlides : null));
  }, [totalSlides]);

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalSlides) % totalSlides : null));
  }, [totalSlides]);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextLightboxImage();
      } else if (e.key === "ArrowLeft") {
        prevLightboxImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, nextLightboxImage, prevLightboxImage]);

  return (
    <section className="bg-obsidian text-white py-12 sm:py-16 border-b border-neutral-800">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12">
        {/* Sleek Design Book Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              SHOWROOM DESIGN BOOK
            </h2>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={BUSINESS_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-gold text-neutral-300 hover:text-obsidian border border-neutral-700 hover:border-gold px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              <IconMapPin size={14} />
              <span>Location</span>
            </a>
            <a
              href={`https://wa.me/8801625073614?text=${encodeURIComponent(
                "Hello, I would like to visit Brother's Tiles Showroom in Gazipur."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              <IconBrandWhatsapp size={15} stroke={2.2} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* ==============================================================
            ARCHITECTURAL "DESIGN BOOK" 3D SPIRAL CAROUSEL
           ============================================================== */}
        <div
          ref={playerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-neutral-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none group book-perspective"
        >
          {/* Main Book Frame (16:10 on mobile, 21:9 ultra-wide on desktop) */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-950 book-perspective">
            {/* ============================================================
                GOLDEN SPIRAL BINDING RINGS (Left Edge)
               ============================================================ */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 z-40 pointer-events-none flex flex-col justify-between py-3.5 sm:py-7 select-none">
              {/* Binder spine shadow strip */}
              <div className="absolute inset-y-0 left-0 w-6 sm:w-11 bg-gradient-to-r from-black/95 via-black/60 to-transparent border-r border-amber-500/20 backdrop-blur-[1px]" />

              {/* 14 Golden Metallic Spiral Rings */}
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="relative z-10 flex items-center h-3 sm:h-5 -ml-1 sm:-ml-1.5">
                  <svg
                    className="w-8 h-5 sm:w-12 sm:h-8 overflow-visible filter drop-shadow-[2px_3px_3px_rgba(0,0,0,0.9)]"
                    viewBox="0 0 44 32"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id={`goldCoil-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7a5710" />
                        <stop offset="25%" stopColor="#d4af37" />
                        <stop offset="48%" stopColor="#fff6b8" />
                        <stop offset="72%" stopColor="#c59b27" />
                        <stop offset="90%" stopColor="#8f6711" />
                        <stop offset="100%" stopColor="#453106" />
                      </linearGradient>
                    </defs>

                    {/* Paper punch hole */}
                    <ellipse cx="32" cy="16" rx="3.5" ry="5" fill="#080808" stroke="#3d2c0b" strokeWidth="1" />

                    {/* Golden wire ring looping through the hole and curling around to the left */}
                    <path
                      d="M 32,12 C 6,7 4,25 32,20"
                      stroke={`url(#goldCoil-${i})`}
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />

                    {/* Metallic specular highlight */}
                    <path
                      d="M 26,11 C 12,9 10,21 24,19"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.75"
                    />
                  </svg>
                </div>
              ))}
            </div>

            {/* ============================================================
                ACTIVE BASE PAGE (Underneath page revealed with integrated title)
               ============================================================ */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              <Image
                key={currentSlide.id}
                src={currentSlide.src}
                alt={currentSlide.title}
                fill
                priority
                className="object-cover transform transition-transform duration-[4500ms] ease-out scale-[1.18]"
                sizes="(max-width: 1320px) 100vw, 1320px"
              />

              {/* Diagonal corner reveal shadow lifting as top page peels away */}
              {isFlipping && (
                <div className="absolute inset-0 bg-gradient-to-tl from-black/85 via-black/40 to-transparent pointer-events-none z-15 animate-corner-shadow" />
              )}

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none z-20" />

              {/* Slide Category Badge - FOLDS WITH THIS PAGE */}
              <div className="absolute top-2.5 left-7 sm:top-5 sm:left-16 z-30 pointer-events-none">
                <span className="bg-white text-[#b8860b] font-bold text-[8.5px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-md border border-white/90">
                  {currentSlide.category}
                </span>
              </div>

              {/* Slide Title & Subtitle Card (Compact & Standard on Mobile) */}
              <div className="absolute bottom-2 left-7 right-2 sm:bottom-6 sm:left-16 sm:right-6 z-30 pointer-events-none">
                <div className="py-1.5 px-2.5 sm:p-4 rounded-lg sm:rounded-xl max-w-[85%] sm:max-w-2xl space-y-0.5 sm:space-y-1 bg-black/80 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[7.5px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-gold">
                    <span>{currentSlide.location}</span>
                    <span>•</span>
                    <span>DESIGN FOLIO</span>
                  </div>
                  <h3 className="text-[11px] sm:text-lg font-bold tracking-tight sm:tracking-wide text-white leading-tight uppercase truncate">
                    {currentSlide.title}
                  </h3>
                  <p className="text-[9px] sm:text-xs text-neutral-300 font-light truncate hidden sm:block">
                    {currentSlide.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* ============================================================
                3D CURLING PAGE (Corner peels from bottom-right towards left)
               ============================================================ */}
            {isFlipping && (
              <div
                key={`flip-${prevIndex}-${currentIndex}`}
                className={`absolute inset-0 z-20 overflow-hidden pointer-events-none ${
                  flipDirection === "next"
                    ? "animate-page-curl-next"
                    : "animate-page-curl-prev"
                }`}
              >
                <Image
                  src={previousSlide.src}
                  alt={previousSlide.title}
                  fill
                  className="object-cover scale-[1.18]"
                  sizes="(max-width: 1320px) 100vw, 1320px"
                />

                {/* Diagonal Corner Curl Shadow & Specular Fold */}
                <div className="absolute inset-0 bg-gradient-to-tl from-black/85 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-white/15 via-transparent to-transparent pointer-events-none" />

                {/* Vignette on turning sheet */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                {/* Category Badge on turning sheet - TURNS & FOLDS WITH THIS PAGE */}
                <div className="absolute top-2.5 left-7 sm:top-5 sm:left-16 z-30 pointer-events-none">
                  <span className="bg-white text-[#b8860b] font-bold text-[8.5px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full shadow-md border border-white/90">
                    {previousSlide.category}
                  </span>
                </div>

                {/* Title & Subtitle Card on turning sheet (Compact & Standard on Mobile) */}
                <div className="absolute bottom-2 left-7 right-2 sm:bottom-6 sm:left-16 sm:right-6 z-30 pointer-events-none">
                  <div className="py-1.5 px-2.5 sm:p-4 rounded-lg sm:rounded-xl max-w-[85%] sm:max-w-2xl space-y-0.5 sm:space-y-1 bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[7.5px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-gold">
                      <span>{previousSlide.location}</span>
                      <span>•</span>
                      <span>DESIGN FOLIO</span>
                    </div>
                    <h3 className="text-[11px] sm:text-lg font-bold tracking-tight sm:tracking-wide text-white leading-tight uppercase truncate">
                      {previousSlide.title}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-neutral-300 font-light truncate hidden sm:block">
                      {previousSlide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Right Edge - Stacked Paper Pages Edge */}
            <div className="absolute right-0 top-0 bottom-0 w-2.5 sm:w-4 bg-gradient-to-l from-black/80 via-neutral-900/40 to-transparent pointer-events-none z-25 border-l border-white/5 flex flex-col justify-around py-4 opacity-40">
              <div className="w-full border-r border-neutral-300 h-0.5" />
              <div className="w-full border-r border-neutral-300 h-0.5" />
              <div className="w-full border-r border-neutral-300 h-0.5" />
            </div>

            {/* Subtle Navigation Buttons (Chevron arrows) */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous page"
              className="absolute left-7 sm:left-14 top-0 bottom-16 w-12 sm:w-20 z-30 flex items-center justify-start pl-1 sm:pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white/80 hover:text-white"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-gold hover:text-obsidian hover:border-gold transition shadow-lg">
                <IconChevronLeft size={18} stroke={2.5} />
              </div>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next page"
              className="absolute right-0 top-0 bottom-16 w-14 sm:w-24 z-30 flex items-center justify-end pr-2 sm:pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white/80 hover:text-white"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-gold hover:text-obsidian hover:border-gold transition shadow-lg">
                <IconChevronRight size={18} stroke={2.5} />
              </div>
            </button>
          </div>
        </div>

        {/* ==============================================================
            SHOWROOM OVERVIEW (Clean, Modern, Architectural Grid)
           ============================================================== */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                ARCHITECTURAL ZONES
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mt-0.5">
                SHOWROOM OVERVIEW
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Click any image to view in high-resolution full size.
              </p>
            </div>
            <div className="text-[11px] text-neutral-400 font-mono tracking-wider">
              TOTAL 13 LIVE ZONES • 10,000+ SQ. FT.
            </div>
          </div>

          {/* Clean Modern 4-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SHOWROOM_SLIDES.map((slide, idx) => {
              return (
                <div
                  key={slide.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-gold/80 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:shadow-gold/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Small category tag */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-black/80 backdrop-blur-xs text-[8.5px] font-mono uppercase px-2 py-0.5 rounded text-gold border border-gold/30">
                        {slide.category}
                      </span>
                    </div>

                    {/* Quick Zoom / Enlarge Trigger Icon */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 group-hover:bg-gold text-white group-hover:text-obsidian flex items-center justify-center transition shadow-md">
                      <IconZoomIn size={14} />
                    </div>

                    {/* Index badge */}
                    <div className="absolute bottom-2 right-2 text-[9px] font-mono text-neutral-400">
                      #{String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Clean Content Footer */}
                  <div className="p-3 bg-neutral-900/90 border-t border-neutral-800 space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-gold transition-colors truncate tracking-wide">
                      {slide.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-light truncate">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Showroom Direct Visit Card */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              PHYSICAL VISIT
            </span>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white">
              Experience Our Flagship Displays in Person
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Located directly by the Dhaka-Mymensingh Highway at Jason Gate, Bhabanipur, Gazipur. Open 7 days a week from 9:00 AM to 10:00 PM.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap w-full sm:w-auto">
            <a
              href={BUSINESS_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-gold hover:bg-gold-light text-obsidian px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition text-center shadow-md whitespace-nowrap"
            >
              <IconMapPin size={13} />
              <span>Get Directions</span>
            </a>
            <a
              href={`https://wa.me/8801625073614?text=${encodeURIComponent(
                "Hello, I want to visit Brother's Tiles Showroom in Bhabanipur, Gazipur."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10.5px] sm:text-xs font-bold uppercase tracking-wider shadow-md whitespace-nowrap transition text-center"
            >
              <IconBrandWhatsapp size={14} stroke={2.2} />
              <span className="hidden sm:inline">Connect on </span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ==============================================================
          HIGH-RES SHOWROOM IMAGE LIGHTBOX MODAL
         ============================================================== */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={closeLightbox}
        >
          {/* Top Lightbox Bar */}
          <div
            className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="bg-white text-[#b8860b] font-bold text-[10px] sm:text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md border border-white">
                {SHOWROOM_SLIDES[lightboxIndex].category}
              </span>
              <span className="text-neutral-400 font-mono text-xs">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close image modal"
              className="w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-gold text-neutral-300 hover:text-obsidian border border-neutral-700 hover:border-gold flex items-center justify-center transition shadow-lg cursor-pointer"
            >
              <IconX size={20} stroke={2.2} />
            </button>
          </div>

          {/* Central High-Res Image Display with Prev/Next buttons */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-4 max-w-6xl mx-auto w-full px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevLightboxImage}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-gold text-white hover:text-obsidian border border-white/20 hover:border-gold flex items-center justify-center transition shadow-2xl cursor-pointer"
            >
              <IconChevronLeft size={24} stroke={2.5} />
            </button>

            {/* Full Image Container */}
            <div className="relative w-full h-[62vh] sm:h-[74vh] max-w-5xl rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-neutral-950 flex items-center justify-center">
              <Image
                key={SHOWROOM_SLIDES[lightboxIndex].id}
                src={SHOWROOM_SLIDES[lightboxIndex].src}
                alt={SHOWROOM_SLIDES[lightboxIndex].title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextLightboxImage}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/75 hover:bg-gold text-white hover:text-obsidian border border-white/20 hover:border-gold flex items-center justify-center transition shadow-2xl cursor-pointer"
            >
              <IconChevronRight size={24} stroke={2.5} />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-4xl mx-auto bg-neutral-900/90 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-gold">
                <span>{SHOWROOM_SLIDES[lightboxIndex].location}</span>
                <span>•</span>
                <span>GAZIPUR FLAGSHIP</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                {SHOWROOM_SLIDES[lightboxIndex].title}
              </h3>
              <p className="text-[11px] sm:text-xs text-neutral-300 font-light">
                {SHOWROOM_SLIDES[lightboxIndex].subtitle}
              </p>
            </div>

            <a
              href={`https://wa.me/8801625073614?text=${encodeURIComponent(
                `Hello, I saw this showroom image: "${SHOWROOM_SLIDES[lightboxIndex].title}". I want to know more details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition"
            >
              <IconBrandWhatsapp size={15} stroke={2.2} />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
