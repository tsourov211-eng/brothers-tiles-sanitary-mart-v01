"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BUSINESS_INFO,
  HERO_SLIDES,
  COLOR_SWATCHES,
  EDITORIAL_CATEGORIES,
  SHOWROOM_DEPARTMENTS,
  PRODUCTS,
  REAL_LIFE_PROJECTS,
} from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import {
  IconChevronLeft,
  IconChevronRight,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [activeDept, setActiveDept] = useState<string>("All");
  const { products, wishlist, toggleWishlist, addToQuoteBag, setSelectedProduct } = useShop();

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  const currentHero = HERO_SLIDES[heroIndex];

  const prevHero = () =>
    setHeroIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  const nextHero = () =>
    setHeroIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));

  // Touch swipe support for mobile hero carousel
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextHero();
    } else if (diff < -45) {
      prevHero();
    }
    setTouchStartX(null);
  };

  // Continuous auto-play for hero carousel (loops infinitely every 3s; pauses when hovered)
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [isHeroHovered, heroIndex]);

  // Train Carousel for "Shop by Color" (continuous fluid ping-pong train movement: left-to-right then right-to-left)
  const trainRef = useRef<HTMLDivElement>(null);
  const [isTrainHovered, setIsTrainHovered] = useState(false);
  const isTrainHoveredRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const trainUserPauseRef = useRef<NodeJS.Timeout | null>(null);
  const isUserPausedRef = useRef(false);

  useEffect(() => {
    isTrainHoveredRef.current = isTrainHovered;
  }, [isTrainHovered]);

  useEffect(() => {
    let animId: number;
    let lastTime: number | null = null;

    const animateTrain = (currentTime: number) => {
      if (lastTime === null) {
        lastTime = currentTime;
      }
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      const container = trainRef.current;
      if (container && !isTrainHoveredRef.current && !isUserPausedRef.current) {
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (maxScroll > 10) {
          // Continuous constant speed: 50px/second (silky smooth, continuous train glide)
          const speed = 50;
          const step = speed * deltaTime;

          let newScroll = container.scrollLeft;
          if (directionRef.current === 1) {
            newScroll += step;
            if (newScroll >= maxScroll) {
              newScroll = maxScroll;
              directionRef.current = -1; // seamlessly glide back from right to left
            }
          } else {
            newScroll -= step;
            if (newScroll <= 0) {
              newScroll = 0;
              directionRef.current = 1; // seamlessly glide forward from left to right
            }
          }

          container.scrollLeft = newScroll;
        }
      }

      animId = requestAnimationFrame(animateTrain);
    };

    animId = requestAnimationFrame(animateTrain);

    return () => {
      cancelAnimationFrame(animId);
      if (trainUserPauseRef.current) clearTimeout(trainUserPauseRef.current);
    };
  }, []);

  const scrollTrain = (dir: "prev" | "next") => {
    if (!trainRef.current) return;
    const container = trainRef.current;
    const scrollAmount = Math.max(240, container.clientWidth * 0.5);

    // Pause auto-cruise for 2.5 seconds on manual arrow click
    isUserPausedRef.current = true;
    if (trainUserPauseRef.current) clearTimeout(trainUserPauseRef.current);
    trainUserPauseRef.current = setTimeout(() => {
      isUserPausedRef.current = false;
    }, 2500);

    if (dir === "prev") {
      directionRef.current = -1;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      directionRef.current = 1;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      {/* =====================================================================
          HERO CAROUSEL SECTION (Mobile Portrait Tilebar Studio Design + Desktop Full-Bleed)
         ===================================================================== */}
      <section
        className="relative w-full h-[76vh] min-h-[500px] max-h-[640px] sm:h-[calc(100vh-130px)] sm:min-h-[660px] sm:max-h-none lg:h-[calc(100vh-135px)] bg-obsidian overflow-hidden select-none"
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        {/* All Slides Layered for Smooth 1000ms Cross-Fade Transitions */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === heroIndex ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx <= 1}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Multi-layered luxury overlays to guarantee 100% text contrast & legibility on ANY background */}
        <div className="absolute inset-0 bg-black/35 z-12 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-transparent z-15 pointer-events-none w-full md:w-[75%] lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent z-15 pointer-events-none" />

        {/* Left & Right Carousel Arrows (Pauses auto-play only when hovered) */}
        <button
          onClick={prevHero}
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          aria-label="Previous slide"
          className="flex absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-black/60 hover:bg-gold text-white hover:text-obsidian border border-gold/50 transition text-base sm:text-xl cursor-pointer shadow-md rounded-xs"
        >
          &#8249;
        </button>
        <button
          onClick={nextHero}
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          aria-label="Next slide"
          className="flex absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center bg-black/60 hover:bg-gold text-white hover:text-obsidian border border-gold/50 transition text-base sm:text-xl cursor-pointer shadow-md rounded-xs"
        >
          &#8250;
        </button>

        {/* Slide Progress Indicator Dashes (Pauses auto-play only when hovered) */}
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2 sm:gap-2.5"
        >
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                i === heroIndex
                  ? "w-8 sm:w-10 bg-white shadow-sm"
                  : "w-5 sm:w-7 bg-white/45 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Bottom-Left Overlay Content */}
        <div className="relative z-20 max-w-[1400px] mx-auto h-full px-4 sm:px-12 pb-8 sm:pb-20 flex flex-col justify-end pointer-events-none">
          <div
            key={heroIndex}
            className="animate-slide-left max-w-2xl space-y-2 sm:space-y-3.5"
          >
            <span className="inline-block bg-obsidian/95 border border-gold text-gold text-[9px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 shadow-md">
              {currentHero.badge}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase text-white leading-[1.14] drop-shadow-[0_4px_16px_rgba(0,0,0,1)] [text-shadow:_0_2px_12px_rgba(0,0,0,0.9),_0_4px_24px_rgba(0,0,0,0.85)]">
              {currentHero.title}
            </h1>
            <p className="text-xs sm:text-base text-neutral-100 font-medium max-w-sm sm:max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,1)] line-clamp-2 sm:line-clamp-none">
              {currentHero.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-gold-light font-bold line-clamp-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
              {currentHero.titleBn}
            </p>
            <div
              onMouseEnter={() => setIsHeroHovered(true)}
              onMouseLeave={() => setIsHeroHovered(false)}
              className="pt-1.5 sm:pt-3 flex flex-wrap items-center gap-2.5 sm:gap-3 pointer-events-auto"
            >
              <Link
                href={currentHero.ctaLink}
                className="bg-white hover:bg-gold text-obsidian text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase px-5 sm:px-7 py-2.5 sm:py-3.5 transition shadow-lg inline-block active:scale-98"
              >
                {currentHero.ctaText}
              </Link>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-obsidian/95 hover:bg-gold text-gold hover:text-obsidian border border-gold text-[10px] sm:text-[11px] font-bold tracking-wider sm:tracking-widest uppercase px-4 sm:px-6 py-2.5 sm:py-3.5 transition shadow-lg active:scale-98 items-center gap-1.5"
              >
                <IconBrandWhatsapp size={15} stroke={2} />
                <span>WHATSAPP DIRECT</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 1: SHOP BY COLOR (Train Carousel: moves back & forth across all swatches)
         ===================================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-12 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-obsidian tracking-tight">
              Shop by Color
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              রঙ অনুযায়ী আপনার পছন্দের টাইলস বেছে নিন ({COLOR_SWATCHES.length}টি প্রিমিয়াম কালার শেড)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            {/* Manual Train Navigation Arrows */}
            <div className="flex items-center border border-neutral-300 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => scrollTrain("prev")}
                className="w-8 h-8 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-gold transition border-r border-neutral-300 cursor-pointer"
                title="Scroll Left"
                aria-label="Previous colors"
              >
                <IconChevronLeft size={16} stroke={2.2} />
              </button>
              <button
                type="button"
                onClick={() => scrollTrain("next")}
                className="w-8 h-8 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-gold transition cursor-pointer"
                title="Scroll Right"
                aria-label="Next colors"
              >
                <IconChevronRight size={16} stroke={2.2} />
              </button>
            </div>

            <Link
              href="/catalog"
              className="border border-obsidian hover:bg-obsidian hover:text-gold text-obsidian text-[10px] font-bold tracking-widest uppercase px-5 py-2 transition"
            >
              SHOP ALL
            </Link>
          </div>
        </div>

        {/* Train Track: All cards coupled together as train carriages */}
        <div
          className="relative group/train"
          onMouseEnter={() => setIsTrainHovered(true)}
          onMouseLeave={() => setIsTrainHovered(false)}
          onTouchStart={() => setIsTrainHovered(true)}
          onTouchEnd={() => setIsTrainHovered(false)}
        >
          {/* Subtle edge fade overlays on desktop */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 opacity-0 sm:group-hover/train:opacity-100 transition duration-300" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 opacity-0 sm:group-hover/train:opacity-100 transition duration-300" />

          <div
            ref={trainRef}
            style={{ scrollBehavior: "auto" }}
            className="flex flex-nowrap gap-4 sm:gap-5 overflow-x-auto no-scrollbar py-2 select-none"
          >
            {COLOR_SWATCHES.map((swatch, idx) => (
              <Link
                key={swatch.id}
                href={`/catalog?color=${swatch.id}`}
                className="group block w-[190px] sm:w-[215px] md:w-[230px] shrink-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-[#F7F6F3] p-5 sm:p-6 flex items-center justify-center relative overflow-hidden border border-neutral-200 group-hover:border-gold group-hover:shadow-md transition">
                  {/* Carriage Number Pill */}
                  <span className="absolute top-2 left-2.5 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="relative w-full h-3/4 shadow-[0_4px_16px_rgba(0,0,0,0.08)] group-hover:scale-105 transition duration-500">
                    <Image
                      src={swatch.image}
                      alt={swatch.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 190px, 230px"
                    />
                  </div>
                </div>

                <div className="pt-2.5 flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-obsidian group-hover:text-gold-dark transition truncate">
                      {swatch.name}
                    </p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{swatch.nameBn}</p>
                    {swatch.sampleCode && (
                      <p className="text-[9px] text-neutral-400 font-mono tracking-tight uppercase truncate">
                        {swatch.sampleCode}
                      </p>
                    )}
                  </div>
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0 mt-0.5 shadow-sm"
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: EXPLORE BY CATEGORY (Exact 2-Column Large Lifestyle Grid + 5 Product Lines)
         ===================================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-obsidian tracking-tight">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Tiles • Basin • Commode • Sanitary • Bathroom Accessories
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-obsidian hover:text-gold-dark underline"
          >
            5000+
          </Link>
        </div>

        {/* 2-Column Cards across both Mobile and Desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
          {EDITORIAL_CATEGORIES.map((cat) => (
            <div key={cat.id} className="group flex flex-col justify-between">
              <div>
                <Link href={`/catalog?category=${encodeURIComponent(cat.filterCategory)}`}>
                  <div className="relative aspect-[4/3.6] w-full bg-stonebg overflow-hidden border border-neutral-200 group-hover:border-gold transition">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex flex-wrap gap-1 sm:gap-1.5">
                      {cat.sizes.map((sz) => (
                        <span
                          key={sz}
                          className="text-[8px] sm:text-[10px] bg-obsidian/90 text-gold border border-gold/40 px-1 sm:px-2 py-0.5 font-medium leading-none"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
                <div className="pt-2 sm:pt-3">
                  <h3 className="text-xs sm:text-base font-bold text-obsidian leading-snug sm:leading-normal">
                    {cat.title}
                  </h3>
                </div>
              </div>
              <div className="pt-2 sm:pt-2.5">
                <Link
                  href={`/catalog?category=${encodeURIComponent(cat.filterCategory)}`}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[10.5px] sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase text-obsidian border-b-2 border-obsidian hover:text-gold-dark hover:border-gold-dark pb-0.5 sm:pb-1 transition group/btn"
                >
                  <span>SHOP NOW</span>
                  <span className="text-xs sm:text-sm font-bold transition-transform group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-1.5">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom 5 Core Product Lines Strip (Responsive across all devices) */}
        <div className="mt-8 sm:mt-10 bg-obsidian text-white border border-gold/40 p-4 sm:p-6 rounded-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/25">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white/10 border border-gold/40 p-1 flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo/Brothers-emblem.png"
                  alt="Brothers Emblem"
                  width={40}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                  BROTHER&rsquo;S TILES &amp; SANITARY MART DEPARTMENTS
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                  আমাদের ৫টি প্রধান প্রোডাক্ট ক্যাটাগরি — পাইকারি ও খুচরা
                </h3>
              </div>
            </div>
            <span className="text-xs text-gold font-semibold">
              হোম ডেলিভারি: {BUSINESS_INFO.homeDeliveryBn}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-4">
            {SHOWROOM_DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                href={`/catalog?category=${encodeURIComponent(dept.id)}`}
                className="group bg-obsidian-800 hover:bg-obsidian-700 border border-gold/25 hover:border-gold p-3.5 flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gold group-hover:underline">
                      {dept.name}
                    </span>
                    <span className="text-[10px] bg-gold/15 text-gold px-1.5 py-0.5">
                      {dept.count}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {dept.descriptionBn}
                  </p>
                </div>
                <p className="text-[10px] text-gold/80 font-medium mt-3 pt-2 border-t border-neutral-800">
                  Sizes/Types: {dept.sizes}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: NEW ARRIVALS (Exact 6-Card Product Row from tilebarLandingPage.jpg)
         ===================================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-obsidian tracking-tight">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 truncate">
              RAK Ceramics ২০২৫–২০২৬ নতুন কালেকশন
            </p>
          </div>
          <Link
            href="/catalog?filter=new"
            className="border border-obsidian hover:bg-obsidian hover:text-gold text-obsidian text-[10px] font-bold tracking-widest uppercase px-4 sm:px-5 py-2 transition whitespace-nowrap shrink-0"
          >
            SHOP ALL
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FULL-WIDTH FEATURED COLLABORATION BANNER
          (Exact replica of "KRAVET X TILEBAR" banner in tilebarLandingPage.jpg)
         ===================================================================== */}
      <section className="w-full my-6">
        <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] bg-stonebg overflow-hidden">
          <Image
            src="/images/hero/rak-grandeur-room.jpg"
            alt="RAK Ceramics x Brother's Tiles & Sanitary Mart"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

          <div className="relative z-10 max-w-[1400px] mx-auto h-full px-6 sm:px-12 pb-12 sm:pb-16 flex flex-col justify-end">
            <div className="max-w-xl space-y-2.5">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gold bg-obsidian/90 border border-gold/50 px-2.5 py-1">
                AUTHORIZED SHOWROOM COLLECTION • GAZIPUR
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider uppercase text-white">
                RAK CERAMICS &times; BROTHER&rsquo;S TILES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                বাংলাদেশের শীর্ষস্থানীয় <strong className="text-gold">RAK Ceramics</strong>-এর ১৫০০+ সিরামিক ও পোর্সেলিন টাইলস মডেল এবং ৫০+ এক্সক্লুসিভ স্যানিটারি ওয়্যার এখন গাজীপুরের ভবানীপুর শোরুমে পাইকারি ও খুচরা মূল্যে।
              </p>
              <div className="pt-2">
                <Link
                  href="/catalog?brand=RAK"
                  className="inline-block bg-white hover:bg-gold text-obsidian text-[10px] font-bold tracking-widest uppercase px-6 py-3 transition shadow"
                >
                  SHOP THE COLLECTION
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: BESTSELLERS & TRENDING
          (Exact 6-card row with top-right Wishlist Heart Icon inside each square card)
         ===================================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-obsidian tracking-tight">
              Bestsellers &amp; Trending
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 truncate">
              গ্রাহকদের পছন্দের সেরা কালেকশন
            </p>
          </div>
          <Link
            href="/catalog?filter=bestseller"
            className="border border-obsidian hover:bg-obsidian hover:text-gold text-obsidian text-[10px] font-bold tracking-widest uppercase px-4 sm:px-5 py-2 transition whitespace-nowrap shrink-0"
          >
            SHOP ALL
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: SPLIT 50/50 CHECKERBOARD FEATURE BLOCKS
          (Exact replica of "GET 5 SAMPLES FOR $5" + "DESIGN SERVICES" in tilebarLandingPage.jpg)
         ===================================================================== */}
      <section className="w-full my-6">
        {/* Row 1: Left Image Collage | Right Warm Stone Text Block */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[320px] sm:min-h-[400px] bg-stonebg">
            <Image
              src="/images/projects/sample-flatlay.jpg"
              alt="5,000+ Tile Designs Wholesale & Retail"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-stonebg px-8 sm:px-16 py-12 sm:py-16 flex flex-col justify-center">
            <div className="max-w-md space-y-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark">
                WHOLESALE &amp; RETAIL • 5,000+ DESIGNS
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold tracking-wide uppercase text-obsidian">
                পাইকারি দামে খুচরা বিক্রয় — ৫০০০+ ডিজাইন
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                আর-এ-কে সিরামিকস (RAK Ceramics), ফু-ওয়াং, ফ্রেশ, মীর, আকিজ, ডিবিএল ও আবুল খায়েরসহ সেরা ব্র্যান্ডের ওয়াল টাইলস, ফ্লোর টাইলস, বেসিন, কমোড ও বাথরুম এক্সেসরিজ সরাসরি পাইকারি ও খুচরা মূল্যে নিন। গাজীপুর, টঙ্গী, উত্তরা, ঢাকা, ময়মনসিংহ ও টাঙ্গাইলে দ্রুত হোম ডেলিভারি সুবিধা।
              </p>
              <div className="pt-2">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-obsidian border-b border-obsidian hover:text-gold-dark hover:border-gold-dark pb-0.5 transition"
                >
                  <span>EXPLORE ALL 5,000+ DESIGNS</span>
                  <span>&#8250;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Left Warm Stone Text Block | Right Architectural Flat-Lay Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-0">
          <div className="bg-stonebg px-8 sm:px-16 py-12 sm:py-16 flex flex-col justify-center order-2 md:order-1">
            <div className="max-w-md space-y-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gold-dark">
                FREE PLANNING &amp; MEASUREMENT SUPPORT
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold tracking-wide uppercase text-obsidian">
                DESIGN &amp; TILE CALCULATION SERVICES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                একটা সুন্দর ঘর শুধু সুন্দর টাইলস দিয়ে তৈরি হয় না—প্রয়োজন হয় সঠিক পরিকল্পনা, সঠিক মাপ আর সঠিক টাইলস নির্বাচনের। আপনার বাসার মাপ বা ফ্লোর প্ল্যান নিয়ে চলে আসুন আমাদের শোরুমে, অথবা আমাদের অনলাইন ফ্রি টাইলস ক্যালকুলেটরে হিসাব করে নিন।
              </p>
              <div className="pt-2 flex flex-wrap gap-5">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-obsidian border-b border-obsidian hover:text-gold-dark hover:border-gold-dark pb-0.5 transition"
                >
                  <span>OPEN FREE TILE CALCULATOR</span>
                  <span>&#8250;</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-gold-dark border-b border-gold-dark pb-0.5 transition"
                >
                  <span>BOOK SHOWROOM CONSULTATION</span>
                  <span>&#8250;</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[320px] sm:min-h-[400px] bg-stonebg order-1 md:order-2">
            <Image
              src="/images/projects/design-service-flatlay.jpg"
              alt="Design & Tile Calculation Services"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: REAL-LIFE PROJECTS
          (Exact asymmetric Bento Grid: 1 Tall/Large Left Image + 2x2 Right Grid from tilebarLandingPage.jpg)
         ===================================================================== */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-obsidian tracking-tight">
              Real-Life Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 truncate">
              বাস্তব প্রজেক্টসমূহের গ্যালারি
            </p>
          </div>
          <Link
            href="/about"
            className="border border-obsidian hover:bg-obsidian hover:text-gold text-obsidian text-[10px] font-bold tracking-widest uppercase px-4 sm:px-5 py-2 transition whitespace-nowrap shrink-0"
          >
            EXPLORE MORE
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Left Large Featured Project */}
          {REAL_LIFE_PROJECTS.slice(0, 1).map((proj) => (
            <div
              key={proj.id}
              className="relative aspect-square w-full bg-obsidian overflow-hidden group border border-neutral-200 hover:border-gold transition"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-obsidian/90 px-2.5 py-0.5 border border-gold/40">
                  {proj.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold">{proj.titleBn}</h3>
                <p className="text-xs text-neutral-200">
                  Tile Used: <strong className="text-gold">{proj.tileUsed}</strong> ({proj.size})
                </p>
              </div>
            </div>
          ))}

          {/* Right 2x2 Grid of 4 Projects */}
          <div className="grid grid-cols-2 gap-3.5">
            {REAL_LIFE_PROJECTS.slice(1, 5).map((proj) => (
              <div
                key={proj.id}
                className="relative aspect-square w-full bg-obsidian overflow-hidden group border border-neutral-200 hover:border-gold transition"
              >
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-gold font-bold">
                    {proj.location}
                  </span>
                  <h4 className="text-xs font-bold leading-snug">{proj.titleBn}</h4>
                  <p className="text-[10px] text-neutral-300 truncate">{proj.tileUsed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: 4-COLUMN BOTTOM VALUE PROPOSITION BAR
          (Exact replica of bottom bar in tilebarLandingPage.jpg:
           EXPERT CURATION | PREMIUM QUALITY | LOW COST SHIPPING | PERSONALIZED SUPPORT)
         ===================================================================== */}
      <section className="bg-stonebg border-t border-neutral-300 py-10 px-4 sm:px-8 mt-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1.5">
            <h4 className="text-obsidian font-bold text-xs tracking-widest uppercase">
              EXPERT CURATION
            </h4>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              ৫০০০+ এক্সক্লুসিভ ডিজাইন — RAK, Akij, DBL, Fu-Wang ও Abul Khair ব্র্যান্ডের সেরা কালেকশন।
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-obsidian font-bold text-xs tracking-widest uppercase">
              PREMIUM QUALITY
            </h4>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              ISO 9001:2015, BDS ISO 13006:2021 ও BSTI অনুমোদিত ১০০% এ-গ্রেড টাইলস ও স্যানিটারি পণ্য।
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-obsidian font-bold text-xs tracking-widest uppercase">
              FAST HOME DELIVERY
            </h4>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              গাজীপুর, টঙ্গী, উত্তরা, ঢাকা, ময়মনসিংহ, টাঙ্গাইল ও আশেপাশে দ্রুত ও নিরাপদ হোম ডেলিভারি।
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-obsidian font-bold text-xs tracking-widest uppercase">
              PERSONALIZED SUPPORT
            </h4>
            <p className="text-[11px] text-neutral-700 leading-relaxed">
              বাসার মাপ ও বাজেট অনুযায়ী ফ্রি ডিজাইন, সঠিক হিসাব এবং পাইকারি দামে খুচরা ক্রয়ের সুবিধা।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
