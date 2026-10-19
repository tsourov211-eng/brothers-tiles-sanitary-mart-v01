"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BUSINESS_INFO, ANNOUNCEMENT_MESSAGES } from "@/data/siteData";
import { MEGA_MENU_DATA } from "@/data/megaMenuData";
import { useShop } from "@/context/ShopContext";
import {
  IconSearch,
  IconHeart,
  IconHeartFilled,
  IconShoppingBag,
  IconUserShield,
  IconMenu2,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconLanguage,
  IconHome,
  IconCategory,
  IconCalculator,
  IconMapPin,
  IconBuildingStore,
} from "@tabler/icons-react";

const CATEGORY_NAV_ITEMS = [
  { id: "new", label: "NEW ARRIVALS", href: "/catalog?filter=new" },
  { id: "tiles", label: "WALL & FLOOR TILES", href: "/catalog?category=Tiles" },
  { id: "basin", label: "BASIN", href: "/catalog?category=Basin" },
  { id: "commode", label: "COMMODE", href: "/catalog?category=Commode" },
  { id: "sanitary", label: "SANITARY", href: "/catalog?category=Sanitary" },
  { id: "accessories", label: "BATHROOM ACCESSORIES", href: "/catalog?category=Bathroom+Accessories" },
];

function isItemActive(
  itemId: string,
  pathname: string,
  currentCategory: string | null,
  currentFilter: string | null
): boolean {
  if (pathname !== "/catalog") return false;

  switch (itemId) {
    case "new":
      return currentFilter === "new";
    case "tiles":
      return (
        currentCategory === "Tiles" ||
        currentCategory === "Floor Tiles" ||
        currentCategory === "Wall Tiles"
      );
    case "basin":
      return currentCategory === "Basin";
    case "commode":
      return currentCategory === "Commode";
    case "sanitary":
      return currentCategory === "Sanitary";
    case "accessories":
      return (
        currentCategory === "Bathroom Accessories" ||
        currentCategory === "Bathroom+Accessories"
      );
    default:
      return false;
  }
}

interface CategoryNavLinksProps {
  activeMegaMenu: string | null;
  handleMenuEnter: (menuId: string) => void;
  handleCloseMegaMenu: () => void;
  pathname: string;
}

function CategoryNavLinks({
  activeMegaMenu,
  handleMenuEnter,
  handleCloseMegaMenu,
  pathname,
}: CategoryNavLinksProps) {
  return (
    <Suspense
      fallback={
        <CategoryNavLinksContent
          activeMegaMenu={activeMegaMenu}
          handleMenuEnter={handleMenuEnter}
          handleCloseMegaMenu={handleCloseMegaMenu}
          pathname={pathname}
          currentCategory={null}
          currentFilter={null}
        />
      }
    >
      <CategoryNavLinksWithParams
        activeMegaMenu={activeMegaMenu}
        handleMenuEnter={handleMenuEnter}
        handleCloseMegaMenu={handleCloseMegaMenu}
        pathname={pathname}
      />
    </Suspense>
  );
}

function CategoryNavLinksWithParams(props: CategoryNavLinksProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get("category") : null;
  const currentFilter = searchParams ? searchParams.get("filter") : null;

  return (
    <CategoryNavLinksContent
      {...props}
      currentCategory={currentCategory}
      currentFilter={currentFilter}
    />
  );
}

function CategoryNavLinksContent({
  activeMegaMenu,
  handleMenuEnter,
  handleCloseMegaMenu,
  pathname,
  currentCategory,
  currentFilter,
}: CategoryNavLinksProps & {
  currentCategory: string | null;
  currentFilter: string | null;
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[12px] md:text-[13px] xl:text-[14px] font-semibold tracking-normal xl:tracking-wide uppercase text-obsidian">
      {/* Category Links with Active Indicator */}
      <div className="flex items-center space-x-0.5 md:space-x-1 lg:space-x-1.5 xl:space-x-2">
        {CATEGORY_NAV_ITEMS.map((item) => {
          const isHovered = activeMegaMenu === item.id;
          const isActive = isItemActive(item.id, pathname, currentCategory, currentFilter);
          return (
            <div
              key={item.id}
              className="relative py-2.5"
              onMouseEnter={() => handleMenuEnter(item.id)}
            >
              <Link
                href={item.href}
                onClick={handleCloseMegaMenu}
                className={`px-2.5 py-1 transition-colors relative flex items-center gap-1 ${
                  isHovered || isActive
                    ? "text-gold-dark font-bold"
                    : "hover:text-gold-dark"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold-dark transition-all duration-200 ${
                    isHovered || isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Utility Pages Links with Active Indicator */}
      <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-5 xl:space-x-6 py-2.5 text-neutral-700 shrink-0">
        <Link
          href="/calculator"
          onClick={handleCloseMegaMenu}
          className={`py-1 px-1 transition-colors relative flex items-center ${
            pathname === "/calculator"
              ? "text-gold-dark font-bold"
              : "text-obsidian font-bold hover:text-gold-dark"
          }`}
        >
          <span>FREE TILE CALCULATOR</span>
          <span
            className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
              pathname === "/calculator" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </Link>
        <Link
          href="/about"
          onClick={handleCloseMegaMenu}
          className={`py-1 px-1 transition-colors relative flex items-center ${
            pathname === "/about"
              ? "text-gold-dark font-bold"
              : "hover:text-gold-dark"
          }`}
        >
          <span>SHOWROOM &amp; RAK SPECS</span>
          <span
            className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
              pathname === "/about" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </Link>
        <Link
          href="/contact"
          onClick={handleCloseMegaMenu}
          className={`py-1 px-1 transition-colors relative flex items-center ${
            pathname === "/contact"
              ? "text-gold-dark font-bold"
              : "text-gold-dark font-bold hover:text-gold"
          }`}
        >
          <span>CONTACT &amp; MAP</span>
          <span
            className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
              pathname === "/contact" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { wishlist, quoteBag, setIsDrawerOpen, lang, setLang } = useShop();

  // Dynamically set --header-height CSS variable so sticky sub-bars lock right underneath the navbar
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty(
          "--header-height",
          `${Math.ceil(height)}px`
        );
      }
    };

    updateHeaderHeight();
    requestAnimationFrame(updateHeaderHeight);
    const timeout = setTimeout(updateHeaderHeight, 150);

    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("load", updateHeaderHeight);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("load", updateHeaderHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // If on admin management dashboard, hide customer storefront header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Auto-play announcement carousel every 4 seconds
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev === ANNOUNCEMENT_MESSAGES.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const handleMenuEnter = (menuId: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMegaMenu(menuId);
  };

  const handleMenuLeave = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleCloseMegaMenu = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setActiveMegaMenu(null);
  };

  const handlePrevAnnouncement = () => {
    setMsgIndex((prev) => (prev === 0 ? ANNOUNCEMENT_MESSAGES.length - 1 : prev - 1));
  };

  const handleNextAnnouncement = () => {
    setMsgIndex((prev) => (prev === ANNOUNCEMENT_MESSAGES.length - 1 ? 0 : prev + 1));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white border-b-2 border-gold shadow-sm">
      {/* Tier 0: Top Announcement Bar Carousel (Auto rotates every 4s, left-to-right slide) */}
      <div
        className="bg-obsidian text-gold border-b border-gold/25 text-xs py-2 px-3 sm:px-4"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between md:justify-center gap-2 sm:gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrevAnnouncement}
            aria-label="Previous announcement"
            className="text-gold/80 hover:text-white transition p-1 font-bold shrink-0 cursor-pointer flex items-center justify-center"
          >
            <IconChevronLeft size={16} stroke={2.2} />
          </button>

          {/* Carousel Slide Container */}
          <div className="relative overflow-hidden w-full max-w-3xl min-h-[20px] flex items-center justify-center">
            <div
              key={msgIndex}
              className="animate-slide-left text-center tracking-wide font-medium truncate w-full text-[11px] sm:text-xs select-none"
            >
              {ANNOUNCEMENT_MESSAGES[msgIndex]}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextAnnouncement}
            aria-label="Next announcement"
            className="text-gold/80 hover:text-white transition p-1 font-bold shrink-0 cursor-pointer flex items-center justify-center"
          >
            <IconChevronRight size={16} stroke={2.2} />
          </button>
        </div>
      </div>

      {/* Tier 1: Brand Logo + Wide Search Bar + User/Wishlist/Bag Icons (Exact Tilebar Tier 1) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brother's Tiles & Sanitary Mart Official Logo (Homepage Link) */}
        <Link
          href="/"
          title="Brother's Tiles & Sanitary Mart - Home"
          className="flex items-center group shrink-0"
        >
          <Image
            src="/images/logo/Brothers Tiles & Sanitary Logo.png"
            alt="Brother's Tiles & Sanitary Mart Logo"
            width={300}
            height={84}
            priority
            className="h-12 sm:h-14 md:h-16 lg:h-[68px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center-Right: Luxury Search Box + Language + Action Icons */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-1 justify-end max-w-2xl">
          {/* Redesigned Pill Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] bg-[#F7F6F2] hover:bg-[#F2F0EB] focus-within:bg-white border border-neutral-300/80 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-full px-3.5 py-2 transition-all duration-300 shadow-2xs group"
          >
            <IconSearch
              size={17}
              stroke={2}
              className="text-neutral-400 group-focus-within:text-gold-dark transition-colors shrink-0 mr-2"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "টাইলস, বেসিন বা RAK কোড খুঁজুন..."
                  : "Search 5,000+ Tiles, Basin, Commode, RAK..."
              }
              className="w-full text-xs sm:text-[13px] text-obsidian placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-obsidian p-0.5 rounded-full hover:bg-neutral-200/60 transition"
              >
                <IconX size={14} stroke={2} />
              </button>
            )}
          </form>

          {/* Language Switcher Pill */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="rounded-full bg-obsidian text-gold hover:text-white hover:bg-neutral-900 border border-gold/40 hover:border-gold px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Switch Language"
          >
            <IconLanguage size={14} stroke={2} className="text-gold" />
            <span className="font-sans">{lang === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Action Icons Group */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Wishlist Button */}
            <Link
              href="/catalog?wishlist=true"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-rose-50 border border-neutral-200/90 hover:border-rose-300 text-obsidian hover:text-rose-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group"
              title="Saved Favorites (পছন্দের তালিকা)"
            >
              {wishlist.length > 0 ? (
                <IconHeartFilled
                  size={19}
                  className="text-rose-600 group-hover:scale-110 transition-transform duration-200"
                />
              ) : (
                <IconHeart
                  size={19}
                  stroke={1.8}
                  className="text-neutral-700 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-200"
                />
              )}
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Sample & Wholesale Quote Bag Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-amber-50/80 border border-neutral-200/90 hover:border-gold/60 text-obsidian hover:text-gold-dark transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group cursor-pointer"
              title="Sample & Quotation List (কোটেশন ব্যাগ)"
            >
              <IconShoppingBag
                size={19}
                stroke={1.8}
                className="text-neutral-700 group-hover:text-gold-dark group-hover:scale-110 transition-all duration-200"
              />
              {quoteBag.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark text-obsidian text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                  {quoteBag.length}
                </span>
              )}
            </button>

            {/* Admin / Manager Portal Shortcut Button */}
            <Link
              href="/admin"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-obsidian border border-neutral-200/90 hover:border-obsidian text-neutral-700 hover:text-gold transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group"
              title="Admin & Showroom Portal"
            >
              <span className="sr-only">Admin Portal</span>
              <IconUserShield
                size={19}
                stroke={1.8}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-neutral-200 text-obsidian border border-neutral-200 cursor-pointer transition-all duration-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <IconX size={20} stroke={2} />
              ) : (
                <IconMenu2 size={20} stroke={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Horizontal Category Navigation Bar with Mega Menu */}
      <nav
        className="hidden md:block border-t border-neutral-200 bg-white relative"
        onMouseLeave={handleMenuLeave}
      >
        <CategoryNavLinks
          activeMegaMenu={activeMegaMenu}
          handleMenuEnter={handleMenuEnter}
          handleCloseMegaMenu={handleCloseMegaMenu}
          pathname={pathname}
        />

        {/* Mega Menu Dropdown Container */}
        {activeMegaMenu && MEGA_MENU_DATA[activeMegaMenu] && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-white shadow-2xl border-t border-b border-neutral-200 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => handleMenuEnter(activeMegaMenu)}
            onMouseLeave={handleMenuLeave}
          >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-7">
              <div
                className={`grid gap-8 ${
                  MEGA_MENU_DATA[activeMegaMenu].columns.length === 5
                    ? "grid-cols-5"
                    : "grid-cols-4"
                }`}
              >
                {MEGA_MENU_DATA[activeMegaMenu].columns.map((col, colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    <div className="border-b border-neutral-200 pb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-obsidian">
                        {col.title}
                      </h4>
                      {col.titleBn && (
                        <p className="text-[11px] text-neutral-600 font-medium tracking-normal mt-0.5">
                          {col.titleBn}
                        </p>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {col.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={item.href}
                            onClick={handleCloseMegaMenu}
                            className={`group/link flex items-center gap-2 text-[13px] transition-colors py-0.5 ${
                              item.isBold
                                ? "font-bold text-obsidian hover:text-gold-dark"
                                : "text-neutral-600 hover:text-gold-dark"
                            }`}
                          >
                            {/* Color Dot if color swatch exists (Exact Tilebar reference match) */}
                            {item.colorHex && (
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0 shadow-2xs group-hover/link:scale-110 transition-transform"
                                style={{ backgroundColor: item.colorHex }}
                              />
                            )}
                            <span className="group-hover/link:translate-x-0.5 transition-transform duration-150">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-gold/15 text-gold-dark border border-gold/30 rounded-xs tracking-wider shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {col.viewAll && (
                      <div className="pt-2 mt-2 border-t border-neutral-100">
                        <Link
                          href={col.viewAll.href}
                          onClick={handleCloseMegaMenu}
                          className="text-xs font-bold text-obsidian hover:text-gold-dark transition-colors flex items-center gap-1 group/va"
                        >
                          <span>{col.viewAll.name}</span>
                          <span className="group-hover/va:translate-x-1 transition-transform duration-150 text-gold-dark">
                            &rsaquo;
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for focus when Mega Menu is open */}
      {activeMegaMenu && (
        <div
          className="fixed inset-0 top-[110px] sm:top-[120px] bg-black/20 backdrop-blur-[0.5px] z-30 pointer-events-none transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian text-white border-t border-gold/30 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-gold/20">
            <Image
              src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
              alt="Brother's Tiles & Sanitary Mart"
              width={200}
              height={66}
              className="h-9 w-auto object-contain"
            />
            <span className="text-[10px] text-gold font-semibold uppercase">Showroom Menu</span>
          </div>
          <form onSubmit={handleSearchSubmit} className="flex border border-gold/40 bg-obsidian-800 px-3 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 5,000+ Tiles, Basin, Commode..."
              className="w-full text-xs text-white placeholder-neutral-400 bg-transparent focus:outline-none"
            />
            <button type="submit" className="text-gold text-xs font-bold">
              GO
            </button>
          </form>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-gold flex items-center gap-1.5 rounded-xs">
              <IconHome size={15} stroke={1.8} />
              <span>Home (হোম)</span>
            </Link>
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-white flex items-center gap-1.5 rounded-xs">
              <IconCategory size={15} stroke={1.8} />
              <span>5,000+ Designs</span>
            </Link>
            <Link href="/catalog?category=Tiles" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-neutral-300 hover:text-white flex items-center gap-1.5 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-gold/70" />
              <span>Tiles (টাইলস)</span>
            </Link>
            <Link href="/catalog?category=Basin" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-neutral-300 hover:text-white flex items-center gap-1.5 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-gold/70" />
              <span>Basin (বেসিন)</span>
            </Link>
            <Link href="/catalog?category=Commode" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-neutral-300 hover:text-white flex items-center gap-1.5 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-gold/70" />
              <span>Commode (কমোড)</span>
            </Link>
            <Link href="/catalog?category=Bathroom+Accessories" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-neutral-300 hover:text-white flex items-center gap-1.5 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-gold/70" />
              <span>Accessories</span>
            </Link>
            <Link href="/calculator" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-gold flex items-center gap-1.5 rounded-xs">
              <IconCalculator size={15} stroke={1.8} />
              <span>Tile Calculator</span>
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 px-2.5 bg-obsidian-800 text-neutral-300 flex items-center gap-1.5 rounded-xs">
              <IconBuildingStore size={15} stroke={1.8} />
              <span>About Showroom</span>
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="col-span-2 py-2.5 px-3 bg-gold text-obsidian font-bold text-center flex items-center justify-center gap-2 rounded-xs">
              <IconMapPin size={16} stroke={2} />
              <span>Contact &amp; Showroom Map (যোগাযোগ)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
