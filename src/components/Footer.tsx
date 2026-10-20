"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconLayoutGrid,
  IconRosette,
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandInstagram,
  IconLink,
  IconChevronRight,
  IconTruck,
  IconMapPin,
  IconCalculator,
  IconClock,
  IconMail,
  IconHeadset,
  IconUser,
  IconArrowRight,
} from "@tabler/icons-react";

function BasinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11h16a1 1 0 0 1 1 1v1a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-1a1 1 0 0 1 1-1z" />
      <path d="M12 4v3" />
      <path d="M9 7h6" />
    </svg>
  );
}

function CommodeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h14v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V4z" />
      <path d="M7 14v4a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-4" />
      <path d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3H5V4z" />
    </svg>
  );
}

function SanitaryIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h5a4 4 0 0 1 4 4v2" />
      <path d="M10 10l6 3" />
      <path d="M8 14l1 3" />
      <path d="M12 15l1 3" />
      <path d="M16 16l1 3" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  // If on admin dashboard, hide public footer
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-neutral-950 text-white border-t-2 border-neutral-900">
      {/* 4-Column Footer Grid matching the exact design image */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-neutral-800/80">
          
          {/* Column 1: Brand & Categories */}
          <div className="space-y-3.5 lg:pr-8 text-center flex flex-col items-center">
            <Link href="/" className="inline-block mx-auto">
              <Image
                src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
                alt="Brother's Tiles & Sanitary Mart"
                width={260}
                height={80}
                className="h-12 sm:h-14 w-auto object-contain mx-auto"
                priority
              />
            </Link>

            {/* Pill with decorative horizontal lines */}
            <div className="flex items-center gap-2.5 my-3 w-full justify-center">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-gold/70 flex-1" />
              <span className="border border-gold/60 bg-gold/10 px-3.5 py-0.5 rounded-full text-gold text-[11px] font-semibold tracking-wide whitespace-nowrap shadow-xs">
                সজ্জিত ঘর, সুন্দর আগামী
              </span>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-gold/40 to-gold/70 flex-1" />
            </div>

            <h3 className="text-sm sm:text-[15px] font-bold text-white leading-snug text-center">
              টাইলস ও স্যানিটারি পণ্যের <span className="text-gold">নির্ভরযোগ্য শোরুম</span>
            </h3>

            <p className="text-xs text-neutral-400 leading-relaxed text-center">
              আধুনিক ডিজাইনের টাইলস, বেসিন, কমোড, স্যানিটারি পণ্য ও বাথরুম অ্যাকসেসরিজ এখন এক ছাদের নিচে।
            </p>

            {/* Category Buttons Row 1 & Row 2 */}
            <div className="space-y-2 pt-1 w-full flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/catalog?category=Tiles"
                  className="border border-gold/50 bg-neutral-900/50 hover:bg-gold hover:text-black text-gold px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <IconLayoutGrid size={15} />
                  <span>Tiles</span>
                </Link>
                <Link
                  href="/catalog?category=Basin"
                  className="border border-gold/50 bg-neutral-900/50 hover:bg-gold hover:text-black text-gold px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <BasinIcon />
                  <span>Basin</span>
                </Link>
                <Link
                  href="/catalog?category=Commode"
                  className="border border-gold/50 bg-neutral-900/50 hover:bg-gold hover:text-black text-gold px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <CommodeIcon />
                  <span>Commode</span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link
                  href="/catalog?category=Sanitary"
                  className="border border-gold/50 bg-neutral-900/50 hover:bg-gold hover:text-black text-gold px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <SanitaryIcon />
                  <span>Sanitary</span>
                </Link>
                <Link
                  href="/catalog?category=Bathroom+Accessories"
                  className="border border-gold/50 bg-neutral-900/50 hover:bg-gold hover:text-black text-gold px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition"
                >
                  <IconRosette size={15} />
                  <span>Bathroom Accessories</span>
                </Link>
              </div>
            </div>

            {/* Social / Quick Contact Circle Icons */}
            <div className="flex items-center justify-center gap-2.5 pt-3">
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 flex items-center justify-center transition"
              >
                <IconBrandWhatsapp size={16} stroke={2} />
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-blue-400 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition"
              >
                <IconBrandFacebook size={16} stroke={2} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-red-500 hover:border-red-500 hover:bg-red-500/10 flex items-center justify-center transition"
              >
                <IconBrandYoutube size={16} stroke={2} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-pink-400 hover:border-pink-500 hover:bg-pink-500/10 flex items-center justify-center transition"
              >
                <IconBrandInstagram size={16} stroke={2} />
              </a>
              <a
                href="/"
                aria-label="Website"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-gold hover:text-gold flex items-center justify-center transition"
              >
                <IconLink size={16} stroke={2} />
              </a>
            </div>
          </div>

          {/* Column 2: Products & Collections */}
          <div className="space-y-4 lg:px-8">
            <div className="flex items-center gap-2 pb-1">
              <IconLayoutGrid size={17} className="text-gold" />
              <h4 className="text-xs font-bold tracking-wider uppercase text-gold">
                PRODUCTS &amp; COLLECTIONS
              </h4>
            </div>

            <ul className="space-y-0 text-xs text-neutral-300">
              {[
                { label: "ওয়াল & ফ্লোর টাইলস (সকল কালেকশন)", href: "/catalog?category=Tiles" },
                { label: "বড় সাইজের টাইলস (লাক্সারি সিরিজ)", href: "/catalog?size=60x120+cm" },
                { label: "বেসিন, কমোড, স্যানিটারি ফিটিংস ও যন্ত্রাংশ", href: "/catalog?category=Basin" },
                { label: "বাথরুম অ্যাকসেসরিজ ও কমপ্লিট সেট", href: "/catalog?category=Bathroom+Accessories" },
                { label: "কিচেন, ডাইনিং ও অন্যান্য হোম সলিউশন", href: "/catalog" },
                { label: "দেশি-বিদেশি ব্র্যান্ডের এক্সক্লুসিভ পণ্য", href: "/catalog" },
                { label: "নতুন আগমন পণ্য ও বিশেষ অফার", href: "/catalog?sort=newest" },
              ].map((item, idx) => (
                <li key={idx} className="border-b border-neutral-800/80">
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-2.5 text-neutral-300 hover:text-gold transition group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                    <IconChevronRight size={14} className="text-gold shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition group"
              >
                <span>সব পণ্য দেখুন (ক্যাটাগরি অনুযায়ী)</span>
                <IconChevronRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Column 3: Home Delivery & Tools */}
          <div className="space-y-4 lg:px-8">
            <div className="flex items-center gap-2 pb-1">
              <IconTruck size={18} className="text-gold" />
              <h4 className="text-xs font-bold tracking-wider uppercase text-gold">
                HOME DELIVERY &amp; TOOLS
              </h4>
            </div>

            <div>
              <p className="text-xs font-bold text-gold mb-2.5">
                সারা বাংলাদেশে হোম ডেলিভারি সুবিধা
              </p>
              <div className="space-y-1.5 text-xs text-neutral-300">
                {[
                  "ঢাকা (সকল এরিয়া - দ্রুত ডেলিভারি)",
                  "চট্টগ্রাম",
                  "সিলেট",
                  "রাজশাহী",
                  "খুলনা",
                  "বরিশাল",
                  "রংপুর ও অন্যান্য জেলা",
                ].map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-0.5">
                    <IconMapPin size={13} className="text-gold shrink-0" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tile Calculator Card */}
            <div className="mt-3 p-3.5 rounded-xl bg-neutral-900/60 border border-gold/40">
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-gold/20 border border-gold/40 flex items-center justify-center text-gold">
                  <IconCalculator size={16} />
                </div>
                <span className="text-[10px] font-semibold border border-gold/60 bg-gold/10 text-gold px-2.5 py-0.5 rounded-full">
                  এখনই হিসাব করুন
                </span>
              </div>
              <h5 className="text-xs font-bold text-white mb-1">
                টাইল ব্যবহারের পরিমাণ ক্যালকুলেটর
              </h5>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-2.5">
                আপনার রুম সাইজ অনুযায়ী কত টাইল লাগবে সহজেই হিসাব করে নিন।
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition group"
              >
                <span>টাইল হিসাব করুন</span>
                <IconArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Column 4: Showroom & Contact */}
          <div className="space-y-3 lg:pl-8">
            <div className="flex items-center gap-2 pb-1">
              <IconMapPin size={17} className="text-gold" />
              <h4 className="text-xs font-bold tracking-wider uppercase text-gold">
                SHOWROOM &amp; CONTACT
              </h4>
            </div>

            {/* Location Card */}
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-gold text-xs font-bold">
                <IconMapPin size={14} />
                <span>আমাদের শোরুমে আসুন</span>
              </div>
              <p className="text-xs text-neutral-200">
                ব্রাদার্স টাইলস &amp; স্যানিটারি মার্ট, মোহাম্মদপুর, ঢাকা
              </p>
              <p className="text-[11px] text-neutral-400">
                (বিস্তারিত ঠিকানা / ল্যান্ডমার্ক)
              </p>
              <a
                href={BUSINESS_INFO.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-gold hover:underline pt-0.5"
              >
                <span>গুগল ম্যাপে দেখুন</span>
                <IconArrowRight size={12} />
              </a>
            </div>

            {/* Hours & Email Card */}
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <IconClock size={15} className="text-gold shrink-0" />
                <span>খোলার সময়: সকাল ৯টা – রাত ৯টা (প্রতিদিন)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <IconMail size={15} className="text-gold shrink-0" />
                <a href={`mailto:brotherstiles@gmail.com`} className="hover:text-gold transition truncate">
                  brotherstiles@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp Big CTA Card */}
            <div className="p-2.5 rounded-xl bg-neutral-950 border-2 border-emerald-500 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <IconBrandWhatsapp size={19} />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-400">WhatsApp এ কথা বলুন</p>
                  <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    +880 1711 222 333
                  </p>
                </div>
              </div>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold/70 bg-transparent hover:bg-gold text-gold hover:text-black px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap"
              >
                চ্যাট করুন
              </a>
            </div>

            {/* Action Buttons Row 1 */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_INFO.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-800 bg-neutral-900 text-white hover:border-gold hover:text-gold py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <IconMapPin size={14} />
                <span>Google Map</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-800 bg-neutral-900 text-white hover:border-gold hover:text-gold py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <IconBrandFacebook size={14} />
                <span>Facebook</span>
              </a>
            </div>

            {/* Action Buttons Row 2 */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/contact"
                className="border border-neutral-800 bg-neutral-900 text-white hover:border-gold hover:text-gold py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <IconHeadset size={14} />
                <span>Contact Us</span>
              </Link>
              <Link
                href="/admin"
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-2 px-2 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <IconUser size={14} />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Brand Bar */}
      <div className="border-t border-neutral-800/80 bg-black/90 py-4 px-4 sm:px-8 text-xs text-neutral-400">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] sm:text-xs">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">{BUSINESS_INFO.nameEn}</span>
          </p>
          <p className="text-gold/90 text-[11px] font-medium hidden md:block">
            Black + Gold + White Luxury Edition • {BUSINESS_INFO.addressExact}
          </p>
        </div>
      </div>
    </footer>
  );
}
