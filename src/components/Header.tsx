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
  IconChevronDown,
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

const MOBILE_CATEGORY_NAV_ITEMS = [
  { id: "new", label: "NEW ARRIVALS", href: "/catalog?filter=new" },
  { id: "tiles", label: "WALL & FLOOR TILES", href: "/catalog?category=Tiles" },
  { id: "basin", label: "BASIN", href: "/catalog?category=Basin" },
  { id: "commode", label: "COMMODE", href: "/catalog?category=Commode" },
  { id: "all", label: "VIEW ALL", href: "/catalog" },
  { id: "sanitary", label: "SANITARY", href: "/catalog?category=Sanitary" },
  { id: "accessories", label: "BATHROOM ACCESSORIES", href: "/catalog?category=Bathroom+Accessories" },
];

const VIEW_ALL_DROPDOWN_CATEGORIES = [
  {
    id: "tiles",
    label: "Wall & Floor Tiles",
    labelBn: "ওয়াল ও ফ্লোর টাইলস",
    href: "/catalog?category=Tiles",
    badge: "3500+",
  },
  {
    id: "basin",
    label: "Basin Collection",
    labelBn: "বেসিন ও ভ্যানিটি",
    href: "/catalog?category=Basin",
    badge: "450+",
  },
  {
    id: "commode",
    label: "Commode & WC",
    labelBn: "কমোড ও স্মার্ট টয়লেট",
    href: "/catalog?category=Commode",
    badge: "Popular",
  },
  {
    id: "sanitary",
    label: "Sanitary Ware",
    labelBn: "স্যানিটারি পণ্য ও প্যান",
    href: "/catalog?category=Sanitary",
  },
  {
    id: "bathroom",
    label: "Bath & Shower",
    labelBn: "বাথরুম টাইলস ও শাওয়ার",
    href: "/catalog?category=Bathroom",
  },
  {
    id: "accessories",
    label: "Bathroom Fittings",
    labelBn: "কল, মিক্সার ও ফিটিংস",
    href: "/catalog?category=Bathroom+Accessories",
  },
  {
    id: "stair",
    label: "Stair & Parking",
    labelBn: "সিঁড়ি ও পার্কিং টাইলস",
    href: "/catalog?category=Stair+%26+Parking",
  },
  {
    id: "new",
    label: "New Arrivals",
    labelBn: "নতুন কালেকশন ২০২৫–২৬",
    href: "/catalog?filter=new",
    badge: "NEW",
  },
  {
    id: "bestseller",
    label: "Bestsellers",
    labelBn: "গ্রাহকদের সেরা পছন্দ",
    href: "/catalog?filter=bestseller",
    badge: "HOT",
  },
  {
    id: "rak",
    label: "RAK Ceramics",
    labelBn: "আরএকে অনুমোদিত শোরুম",
    href: "/catalog?brand=RAK",
    badge: "OFFICIAL",
  },
];

const VIEW_ALL_QUICK_LINKS = [
  {
    label: "Tile Calculator",
    labelBn: "ফ্রি টাইলস মাপ ও খরচের হিসাব",
    href: "/calculator",
    icon: IconCalculator,
  },
  {
    label: "Showroom & RAK Specs",
    labelBn: "শোরুম বিবরণ ও স্পেসিফিকেশন",
    href: "/about",
    icon: IconBuildingStore,
  },
  {
    label: "Showroom Map & Contact",
    labelBn: "গাজীপুর ভবানীপুর শোরুম ও ম্যাপ",
    href: "/contact",
    icon: IconMapPin,
  },
];

function isItemActive(
  itemId: string,
  pathname: string,
  currentCategory: string | null,
  currentFilter: string | null
): boolean {
  if (pathname !== "/catalog") return false;

  switch (itemId) {
    case "all":
      return !currentCategory && !currentFilter;
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
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Automatically close dropdown on navigation or filter changes
  useEffect(() => {
    setIsViewAllOpen(false);
  }, [pathname, currentCategory, currentFilter]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsViewAllOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Desktop Category Navigation */}
      <div className="hidden md:flex max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 items-center justify-between text-[11px] lg:text-[12px] xl:text-[13px] font-semibold tracking-tight lg:tracking-normal xl:tracking-wide uppercase text-obsidian overflow-x-auto no-scrollbar">
        {/* Category Links with Active Indicator */}
        <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-1.5 shrink-0">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isHovered = activeMegaMenu === item.id;
            const isActive = isItemActive(item.id, pathname, currentCategory, currentFilter);
            return (
              <div
                key={item.id}
                className="relative py-1.5 shrink-0"
                onMouseEnter={() => handleMenuEnter(item.id)}
              >
                <Link
                  href={item.href}
                  onClick={handleCloseMegaMenu}
                  className={`px-1.5 lg:px-2 xl:px-2.5 py-0.5 transition-colors relative flex items-center gap-1 whitespace-nowrap shrink-0 ${
                    isHovered || isActive
                      ? "text-gold-dark font-bold"
                      : "hover:text-gold-dark"
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-gold-dark transition-all duration-200 ${
                      isHovered || isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Utility Pages Links with Active Indicator */}
        <div className="flex items-center space-x-2 md:space-x-2.5 lg:space-x-3.5 xl:space-x-4 py-1.5 text-neutral-700 shrink-0 whitespace-nowrap ml-2 xl:ml-3">
          <Link
            href="/calculator"
            onClick={handleCloseMegaMenu}
            className={`py-0.5 px-1 transition-colors relative flex items-center whitespace-nowrap shrink-0 ${
              pathname === "/calculator"
                ? "text-gold-dark font-bold"
                : "text-obsidian font-bold hover:text-gold-dark"
            }`}
          >
            <span className="whitespace-nowrap">
              <span className="hidden xl:inline">FREE </span>TILE CALCULATOR
            </span>
            <span
              className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
                pathname === "/calculator" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </Link>
          <Link
            href="/about"
            onClick={handleCloseMegaMenu}
            className={`py-0.5 px-1 transition-colors relative flex items-center whitespace-nowrap shrink-0 ${
              pathname === "/about"
                ? "text-gold-dark font-bold"
                : "hover:text-gold-dark"
            }`}
          >
            <span className="whitespace-nowrap">
              SHOWROOM &amp; <span className="hidden xl:inline">RAK </span>SPECS
            </span>
            <span
              className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
                pathname === "/about" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </Link>
          <Link
            href="/contact"
            onClick={handleCloseMegaMenu}
            className={`py-0.5 px-1 transition-colors relative flex items-center whitespace-nowrap shrink-0 ${
              pathname === "/contact"
                ? "text-gold-dark font-bold"
                : "text-gold-dark font-bold hover:text-gold"
            }`}
          >
            <span className="whitespace-nowrap">CONTACT &amp; MAP</span>
            <span
              className={`absolute bottom-0 left-1 right-1 h-[2px] bg-gold-dark transition-all duration-200 ${
                pathname === "/contact" ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </Link>
        </div>
      </div>

      {/* Mobile Horizontal Category Rail - Keeps Same Design Across Devices */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-2.5 py-1 bg-white border-t border-neutral-100 text-[10.5px] font-bold tracking-tight uppercase whitespace-nowrap">
        {MOBILE_CATEGORY_NAV_ITEMS.map((item) => {
          const isActive = isItemActive(item.id, pathname, currentCategory, currentFilter);

          if (item.id === "all") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIsViewAllOpen((prev) => !prev)}
                className={`px-2 py-0.5 rounded-full transition-all shrink-0 inline-flex items-center gap-1 cursor-pointer ${
                  isViewAllOpen || isActive
                    ? "bg-obsidian text-gold shadow-xs ring-1 ring-gold/40"
                    : "bg-neutral-100 text-neutral-700 hover:text-gold-dark"
                }`}
                aria-expanded={isViewAllOpen}
                aria-label="View All Categories Dropdown"
              >
                <span>{item.label}</span>
                <IconChevronDown
                  size={12}
                  stroke={2.5}
                  className={`transition-transform duration-200 ${
                    isViewAllOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`px-2 py-0.5 rounded-full transition-colors shrink-0 ${
                isActive
                  ? "bg-obsidian text-gold shadow-xs"
                  : "bg-neutral-100 text-neutral-700 hover:text-gold-dark"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/calculator"
          className={`px-2 py-0.5 rounded-full transition-colors shrink-0 ${
            pathname === "/calculator"
              ? "bg-obsidian text-gold shadow-xs"
              : "bg-neutral-100 text-neutral-700 hover:text-gold-dark"
          }`}
        >
          CALCULATOR
        </Link>
        <Link
          href="/about"
          className={`px-2 py-0.5 rounded-full transition-colors shrink-0 ${
            pathname === "/about"
              ? "bg-obsidian text-gold shadow-xs"
              : "bg-neutral-100 text-neutral-700 hover:text-gold-dark"
          }`}
        >
          SHOWROOM
        </Link>
        <Link
          href="/contact"
          className={`px-2 py-0.5 rounded-full transition-colors shrink-0 ${
            pathname === "/contact"
              ? "bg-gold text-obsidian font-black shadow-xs"
              : "bg-gold/15 text-gold-dark hover:bg-gold hover:text-obsidian"
          }`}
        >
          CONTACT
        </Link>
      </div>

      {/* Mobile "VIEW ALL" Dropdown Sheet */}
      {isViewAllOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-2xs animate-in fade-in duration-150"
            onClick={() => setIsViewAllOpen(false)}
          />

          {/* Dropdown panel */}
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-b-2 border-gold shadow-2xl z-50 md:hidden max-h-[78vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="p-3.5 space-y-3.5">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                    সকল ক্যাটাগরি ও অপশন
                  </span>
                  <span className="text-[10px] bg-gold/20 text-gold-dark font-bold px-1.5 py-0.5 rounded-xs">
                    5,000+
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsViewAllOpen(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer transition"
                  aria-label="Close"
                >
                  <IconX size={15} stroke={2.2} />
                </button>
              </div>

              {/* Main "VIEW ALL 5,000+ PRODUCTS" Banner Link */}
              <Link
                href="/catalog"
                onClick={() => setIsViewAllOpen(false)}
                className="w-full bg-gradient-to-r from-obsidian via-neutral-900 to-obsidian hover:from-gold hover:to-gold-dark text-white hover:text-obsidian p-3 rounded-md flex items-center justify-between shadow-xs transition-all group"
              >
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-gold group-hover:text-obsidian">
                    VIEW ALL 5,000+ PRODUCTS
                  </div>
                  <div className="text-[11px] text-neutral-300 group-hover:text-obsidian/80">
                    আমাদের সম্পূর্ণ শোরুম কালেকশন এক সাথে দেখুন
                  </div>
                </div>
                <span className="text-sm font-bold text-gold group-hover:text-obsidian transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>

              {/* Grid of Categories (2 Columns on Mobile) */}
              <div>
                <div className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  ক্যাটাগরি অনুযায়ী নির্বাচন করুন:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {VIEW_ALL_DROPDOWN_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      onClick={() => setIsViewAllOpen(false)}
                      className="p-2.5 bg-neutral-50 hover:bg-amber-50/70 border border-neutral-200/80 hover:border-gold/60 rounded-md flex flex-col justify-between transition-colors group"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-bold text-obsidian group-hover:text-gold-dark truncate">
                          {cat.label}
                        </span>
                        {cat.badge && (
                          <span className="text-[8.5px] font-bold bg-gold/15 text-gold-dark px-1 py-0.2 rounded-2xs shrink-0">
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500 truncate">
                          {cat.labelBn}
                        </span>
                        <span className="text-neutral-400 group-hover:text-gold-dark text-xs transition-transform group-hover:translate-x-0.5">
                          &rarr;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Showroom Quick Services (Calculator, Showroom Specs, Contact) */}
              <div className="pt-1 border-t border-neutral-100">
                <div className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  শোরুম সার্ভিস ও হেল্প:
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {VIEW_ALL_QUICK_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsViewAllOpen(false)}
                        className="p-2 bg-neutral-50 hover:bg-amber-50/70 border border-neutral-200/70 hover:border-gold/50 rounded-md flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon size={16} className="text-gold-dark shrink-0" stroke={1.8} />
                          <div className="min-w-0">
                            <span className="text-[11px] font-bold text-obsidian group-hover:text-gold-dark block truncate">
                              {link.label}
                            </span>
                            <span className="text-[9.5px] text-neutral-500 block truncate">
                              {link.labelBn}
                            </span>
                          </div>
                        </div>
                        <span className="text-neutral-400 group-hover:text-gold-dark text-xs transition-transform group-hover:translate-x-0.5 shrink-0 ml-1">
                          &rarr;
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function Header() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { wishlist, quoteBag, setIsDrawerOpen, lang, setLang } = useShop();

  // Dynamically set --header-height CSS variable so sticky sub-bars lock right underneath the sticky navbar
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (navRef.current) {
        const height = navRef.current.getBoundingClientRect().height;
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
    if (typeof ResizeObserver !== "undefined" && navRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(navRef.current);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateHeaderHeight);
      window.removeEventListener("load", updateHeaderHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  // Auto-play announcement carousel every 4 seconds
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev === ANNOUNCEMENT_MESSAGES.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // If on admin management dashboard, hide customer storefront header
  if (pathname?.startsWith("/admin")) {
    return null;
  }

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
    <>
      <header className="relative bg-white z-30">
        {/* Tier 0: Top Announcement Bar Carousel (Auto rotates every 4s, left-to-right slide) */}
      <div
        className="bg-obsidian text-gold border-b border-gold/20 text-[10px] sm:text-[11px] py-1 px-3 sm:px-4"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between md:justify-center gap-1.5 sm:gap-3">
          {/* Previous Button */}
          <button
            onClick={handlePrevAnnouncement}
            aria-label="Previous announcement"
            className="text-gold/80 hover:text-white transition p-0.5 font-bold shrink-0 cursor-pointer flex items-center justify-center"
          >
            <IconChevronLeft size={13} stroke={2.4} />
          </button>

          {/* Carousel Slide Container */}
          <div className="relative overflow-hidden w-full max-w-3xl min-h-[16px] flex items-center justify-center">
            <div
              key={msgIndex}
              className="animate-slide-left text-center tracking-wide font-medium truncate w-full select-none leading-none"
            >
              {ANNOUNCEMENT_MESSAGES[msgIndex]}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextAnnouncement}
            aria-label="Next announcement"
            className="text-gold/80 hover:text-white transition p-0.5 font-bold shrink-0 cursor-pointer flex items-center justify-center"
          >
            <IconChevronRight size={13} stroke={2.4} />
          </button>
        </div>
      </div>

      {/* Tier 1: Brand Logo + Wide Search Bar + User/Wishlist/Bag Icons (Exact Tilebar Tier 1) */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Brother's Tiles & Sanitary Mart Official Logo (Homepage Link) */}
        <Link
          href="/"
          title="Brother's Tiles & Sanitary Mart - Home"
          className="flex items-center group shrink-0"
        >
          <Image
            src="/images/logo/Brothers Tiles & Sanitary Logo.png"
            alt="Brother's Tiles & Sanitary Mart Logo"
            width={260}
            height={74}
            priority
            className="h-8 sm:h-10 md:h-11 lg:h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Center-Right: Luxury Search Box + Language + Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end max-w-2xl">
          {/* Reference Search Bar for Desktop/Tablet */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center w-full max-w-[280px] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[450px] h-9 sm:h-[39px] bg-white border border-neutral-300 hover:border-neutral-400 focus-within:border-[#BE8226] focus-within:ring-2 focus-within:ring-[#BE8226]/20 rounded-full pl-3.5 pr-0 overflow-hidden transition-all duration-200 shadow-2xs group"
          >
            <IconSearch
              size={17}
              stroke={1.8}
              className="text-neutral-500 shrink-0 mr-2.5 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "টাইলস, স্যানিটারি বা কোড খুঁজুন..."
                  : "Search for tiles, sanitary ware..."
              }
              className="w-full h-full text-xs sm:text-[13px] text-obsidian placeholder:text-neutral-400 placeholder:font-normal focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-obsidian p-1 mr-1 rounded-full transition shrink-0 cursor-pointer"
                title="Clear"
              >
                <IconX size={14} stroke={2} />
              </button>
            )}
            <button
              type="submit"
              className="h-full w-12 sm:w-13 md:w-14 bg-[#BE8226] hover:bg-[#a86e1b] active:bg-[#946116] flex items-center justify-center shrink-0 transition-colors duration-150 cursor-pointer rounded-r-full"
              aria-label="Search"
              title="Search"
            >
              <IconSearch size={18} stroke={2.2} className="text-white" />
            </button>
          </form>

          {/* Language Switcher Pill */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="rounded-full bg-obsidian text-gold hover:text-white hover:bg-neutral-900 border border-gold/40 hover:border-gold px-3 py-1.5 text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Switch Language"
          >
            <IconLanguage size={13.5} stroke={2} className="text-gold" />
            <span className="font-sans">{lang === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Action Icons Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Wishlist Button */}
            <Link
              href="/catalog?wishlist=true"
              className="relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-rose-50 border border-neutral-200/90 hover:border-rose-300 text-obsidian hover:text-rose-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group"
              title="Saved Favorites (পছন্দের তালিকা)"
            >
              {wishlist.length > 0 ? (
                <IconHeartFilled
                  size={20}
                  className="text-rose-600 group-hover:scale-110 transition-transform duration-200"
                />
              ) : (
                <IconHeart
                  size={20}
                  stroke={2}
                  className="text-neutral-700 group-hover:text-rose-600 group-hover:scale-110 transition-all duration-200"
                />
              )}
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-0.5 sm:-top-1 sm:-right-1 min-w-auto sm:min-w-[18px] h-auto sm:h-[18px] px-0.5 sm:px-1 bg-transparent sm:bg-gradient-to-r sm:from-rose-600 sm:to-red-600 text-rose-600 sm:text-white text-[11px] sm:text-[9.5px] font-black sm:font-bold rounded-none sm:rounded-full flex items-center justify-center shadow-none sm:shadow-md ring-0 sm:ring-2 sm:ring-white leading-none pointer-events-none select-none">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Sample & Wholesale Quote Bag Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-amber-50/80 border border-neutral-200/90 hover:border-gold/60 text-obsidian hover:text-gold-dark transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group cursor-pointer"
              title="Sample & Quotation List (কোটেশন ব্যাগ)"
            >
              <IconShoppingBag
                size={20}
                stroke={2}
                className="text-neutral-700 group-hover:text-gold-dark group-hover:scale-110 transition-all duration-200"
              />
              {quoteBag.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-gold via-gold-light to-gold-dark text-obsidian text-[9.5px] font-black rounded-full flex items-center justify-center shadow-md ring-2 ring-white leading-none pointer-events-none select-none">
                  {quoteBag.length}
                </span>
              )}
            </button>

            {/* Admin / Manager Portal Shortcut Button */}
            <Link
              href="/admin"
              className="hidden sm:flex w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full items-center justify-center bg-[#F7F6F2] hover:bg-obsidian border border-neutral-200/90 hover:border-obsidian text-neutral-700 hover:text-gold transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs group"
              title="Admin & Showroom Portal"
            >
              <span className="sr-only">Admin Portal</span>
              <IconUserShield
                size={20}
                stroke={2}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9.5 h-9.5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#F7F6F2] hover:bg-neutral-200 text-obsidian border border-neutral-200 cursor-pointer transition-all duration-200"
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

      {/* Mobile Quick Search Bar (visible only on small screens) */}
      <div className="sm:hidden px-2.5 sm:px-3.5 pb-2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full h-[37px] bg-white border border-neutral-300 focus-within:border-[#BE8226] focus-within:ring-1 focus-within:ring-[#BE8226]/30 rounded-full pl-3 pr-0 overflow-hidden shadow-2xs"
        >
          <IconSearch size={16} stroke={1.8} className="text-neutral-500 mr-2 shrink-0 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "bn"
                ? "টাইলস, স্যানিটারি বা কোড খুঁজুন..."
                : "Search for tiles, sanitary ware..."
            }
            className="w-full h-full text-xs text-obsidian placeholder:text-neutral-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-neutral-400 hover:text-obsidian p-1 mr-1 shrink-0"
              title="Clear"
            >
              <IconX size={13} stroke={2} />
            </button>
          )}
          <button
            type="submit"
            className="h-full w-14 bg-[#BE8226] hover:bg-[#a86e1b] active:bg-[#946116] flex items-center justify-center shrink-0 cursor-pointer rounded-r-full transition-colors"
            aria-label="Search"
            title="Search"
          >
            <IconSearch size={17} stroke={2.2} className="text-white" />
          </button>
        </form>
      </div>

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
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full h-[38px] bg-white border border-neutral-300 rounded-full pl-3 pr-0 overflow-hidden shadow-2xs"
          >
            <IconSearch size={16} stroke={1.8} className="text-neutral-500 mr-2 shrink-0 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "টাইলস, স্যানিটারি বা কোড খুঁজুন..."
                  : "Search for tiles, sanitary ware..."
              }
              className="w-full h-full text-xs text-obsidian placeholder:text-neutral-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-obsidian p-1 mr-1 shrink-0"
                title="Clear"
              >
                <IconX size={13} stroke={2} />
              </button>
            )}
            <button
              type="submit"
              className="h-full w-10.5 bg-[#BE8226] hover:bg-[#a86e1b] flex items-center justify-center shrink-0 cursor-pointer rounded-r-full"
              aria-label="Search"
              title="Search"
            >
              <IconSearch size={17} stroke={2.2} className="text-white" />
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
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="col-span-2 py-2.5 px-3 bg-gold text-obsidian font-bold text-center flex items-center justify-center gap-2 rounded-lg shadow-sm">
              <IconMapPin size={16} stroke={2} />
              <span>Contact &amp; Showroom Map (যোগাযোগ)</span>
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="col-span-2 py-2 px-3 bg-neutral-900 border border-gold/30 hover:border-gold text-gold text-xs font-semibold flex items-center justify-center gap-2 rounded-lg">
              <IconUserShield size={16} stroke={1.8} />
              <span>Admin &amp; Manager Portal (অ্যাডমিন লগইন)</span>
            </Link>
          </div>
        </div>
      )}
    </header>

    {/* Tier 2: Sticky Category Navigation Bar with Mega Menu (Sticks to top of screen as you scroll down) */}
    <nav
      ref={navRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 border-b-2 border-gold shadow-sm"
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
        className="fixed inset-0 top-[38px] bg-black/20 backdrop-blur-[0.5px] z-30 pointer-events-none transition-opacity duration-200"
        aria-hidden="true"
      />
    )}
  </>
  );
}
