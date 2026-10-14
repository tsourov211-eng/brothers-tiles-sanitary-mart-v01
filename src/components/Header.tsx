"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { BUSINESS_INFO, ANNOUNCEMENT_MESSAGES } from "@/data/siteData";
import { MEGA_MENU_DATA } from "@/data/megaMenuData";
import { useShop } from "@/context/ShopContext";
import {
  IconSearch,
  IconPhoneCall,
  IconHeart,
  IconHeartFilled,
  IconShoppingBag,
  IconLock,
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

export default function Header() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { wishlist, quoteBag, setIsDrawerOpen, lang, setLang } = useShop();

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
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
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

        {/* Center-Right: Tilebar-style Wide Rectangular Search Box + Icons */}
        <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center w-full max-w-md border border-neutral-400 focus-within:border-obsidian bg-white px-3 py-1.5"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "৫০০০+ টাইলস, বেসিন, কমোড বা RAK কোড খুঁজুন..."
                  : "Search 5,000+ Tiles, Basin, Commode, RAK Series..."
              }
              className="w-full text-xs sm:text-sm text-obsidian placeholder-neutral-500 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              aria-label="Search catalog"
              className="text-obsidian hover:text-gold-dark pl-2 cursor-pointer flex items-center"
            >
              <IconSearch size={18} stroke={2} />
            </button>
          </form>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="text-[11px] font-semibold border border-obsidian/20 hover:border-gold bg-obsidian text-gold px-2.5 py-1 tracking-wider uppercase transition shrink-0 flex items-center gap-1 cursor-pointer"
            title="Switch Language"
          >
            <IconLanguage size={14} stroke={1.8} />
            <span>{lang === "bn" ? "EN" : "বাংলা"}</span>
          </button>

          {/* Direct Call / WhatsApp Link */}
          <a
            href={`tel:${BUSINESS_INFO.mainPhoneClean}`}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-obsidian hover:text-gold-dark shrink-0"
            title="Showroom Hotline & WhatsApp"
          >
            <IconPhoneCall size={17} stroke={1.8} className="text-gold-dark" />
            <span>{BUSINESS_INFO.mainPhone}</span>
          </a>

          {/* Wishlist Icon with Red/Gold Badge (matching Tilebar header) */}
          <Link
            href="/catalog?wishlist=true"
            className="relative p-1.5 text-obsidian hover:text-gold-dark transition flex items-center justify-center"
            title="Saved Favorites"
          >
            {wishlist.length > 0 ? (
              <IconHeartFilled size={21} className="text-red-600" />
            ) : (
              <IconHeart size={21} stroke={1.8} />
            )}
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Sample & Wholesale Quote Bag Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-1.5 text-obsidian hover:text-gold-dark transition cursor-pointer flex items-center justify-center"
            title="Sample & Quotation List"
          >
            <IconShoppingBag size={21} stroke={1.8} />
            {quoteBag.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-obsidian text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {quoteBag.length}
              </span>
            )}
          </button>

          {/* Manager / Admin Portal Shortcut */}
          <Link
            href="/admin"
            className="p-1.5 text-neutral-700 hover:text-obsidian hover:bg-neutral-100 rounded transition flex items-center gap-1"
            title="Manager & Showroom Admin Portal"
          >
            <span className="sr-only">Manager Portal</span>
            <IconLock size={20} stroke={1.8} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-obsidian cursor-pointer flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <IconX size={24} stroke={2} />
            ) : (
              <IconMenu2 size={24} stroke={2} />
            )}
          </button>
        </div>
      </div>

      {/* Tier 2: Horizontal Category Navigation Bar with Mega Menu */}
      <nav
        className="hidden md:block border-t border-neutral-200 bg-white relative"
        onMouseLeave={handleMenuLeave}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between text-[14px] font-semibold tracking-wide uppercase text-obsidian">
          <div className="flex items-center space-x-1 lg:space-x-2">
            {[
              { id: "new", label: "NEW ARRIVALS", href: "/catalog?filter=new" },
              { id: "tiles", label: "WALL & FLOOR TILES", href: "/catalog?category=Tiles" },
              { id: "basin", label: "BASIN", href: "/catalog?category=Basin" },
              { id: "commode", label: "COMMODE", href: "/catalog?category=Commode" },
              { id: "sanitary", label: "SANITARY", href: "/catalog?category=Sanitary" },
              { id: "accessories", label: "BATHROOM ACCESSORIES", href: "/catalog?category=Bathroom+Accessories" },
            ].map((item) => {
              const isHovered = activeMegaMenu === item.id;
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
                      isHovered
                        ? "text-gold-dark font-bold"
                        : "hover:text-gold-dark"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gold-dark transition-all duration-200 ${
                        isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6 py-2.5 text-neutral-700">
            <Link
              href="/calculator"
              onClick={handleCloseMegaMenu}
              className="hover:text-gold-dark transition font-bold text-obsidian"
            >
              FREE TILE CALCULATOR
            </Link>
            <Link
              href="/about"
              onClick={handleCloseMegaMenu}
              className="hover:text-gold-dark transition"
            >
              SHOWROOM &amp; RAK SPECS
            </Link>
            <Link
              href="/contact"
              onClick={handleCloseMegaMenu}
              className="hover:text-gold-dark transition text-gold-dark font-bold"
            >
              CONTACT &amp; MAP
            </Link>
          </div>
        </div>

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
