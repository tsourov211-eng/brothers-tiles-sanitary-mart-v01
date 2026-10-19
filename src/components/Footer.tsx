"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconCalculator,
  IconArrowRight,
  IconBrandWhatsapp,
  IconMapPin,
  IconBrandFacebook,
  IconAddressBook,
  IconUserShield,
  IconPhone,
  IconChevronDown,
  IconClock,
  IconMail,
  IconShieldCheck,
  IconBuildingStore,
  IconTruckDelivery,
  IconSparkles,
} from "@tabler/icons-react";

export default function Footer() {
  const pathname = usePathname();

  // If on admin dashboard, hide public footer
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-obsidian text-white border-t-4 border-gold">
      {/* =========================================================================
          TOP LUXURY TRUST & SERVICE STRIP
          ========================================================================= */}
      <div className="border-b border-gold/20 bg-neutral-950/80 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {/* Trust Item 1 */}
            <div className="flex items-center gap-3.5 p-2 rounded-lg group">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors shrink-0">
                <IconShieldCheck size={22} stroke={2} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                  ১০০% অথেনটিক ব্র্যান্ড
                </h4>
                <p className="text-[11px] text-neutral-400">
                  RAK, আকিজ, ডিবিএল, ফু-ওয়াং
                </p>
              </div>
            </div>

            {/* Trust Item 2 */}
            <div className="flex items-center gap-3.5 p-2 rounded-lg group">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors shrink-0">
                <IconBuildingStore size={22} stroke={2} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                  ৫,০০০+ এক্সক্লুসিভ ডিজাইন
                </h4>
                <p className="text-[11px] text-neutral-400">
                  স্ল্যাব, ফ্লোর, ওয়াল ও স্যানিটারি
                </p>
              </div>
            </div>

            {/* Trust Item 3 */}
            <div className="flex items-center gap-3.5 p-2 rounded-lg group">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors shrink-0">
                <IconTruckDelivery size={22} stroke={2} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                  প্রজেক্টে হোম ডেলিভারি
                </h4>
                <p className="text-[11px] text-neutral-400">
                  গাজীপুর, ঢাকা, ময়মনসিংহ ও আশেপাশের জেলা
                </p>
              </div>
            </div>

            {/* Trust Item 4 */}
            <div className="flex items-center gap-3.5 p-2 rounded-lg group">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-obsidian transition-colors shrink-0">
                <IconCalculator size={22} stroke={2} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-gold transition-colors">
                  ফ্রি টাইলস ক্যালকুলেটর
                </h4>
                <p className="text-[11px] text-neutral-400">
                  ঘরের মাপ দিন, নিখুঁত হিসাব নিন
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN FOOTER 4-COLUMN LUXURY GRID - RESPONSIVE ACROSS ALL DEVICES
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Column 1: Business Identity & Brand Authority */}
        <div className="space-y-5">
          <div className="space-y-3">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
                alt="Brother's Tiles & Sanitary Mart"
                width={260}
                height={86}
                className="h-11 sm:h-12 lg:h-14 w-auto object-contain transition duration-300 group-hover:brightness-110"
              />
            </Link>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-gold/10 border border-gold/30 text-gold text-[11px] font-semibold">
              <IconSparkles size={13} className="text-gold" />
              <span>{BUSINESS_INFO.nameBn}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-white/95 leading-snug">
            {BUSINESS_INFO.tagline}
          </p>

          <p className="text-xs text-neutral-300 leading-relaxed">
            {BUSINESS_INFO.subLine} — আমরা আর-এ-কে সিরামিকস (RAK Ceramics), আকিজ, ডিবিএল, ফু-ওয়াং, মীর এবং আবুল খায়ের ব্র্যান্ডের অথোরাইজড রিটেইলার ও হোলসেলার।
          </p>

          {/* Category Pill Badges with smooth hover effect */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {BUSINESS_INFO.productsList.map((prod) => (
              <span
                key={prod}
                className="text-[11px] font-medium border border-gold/30 text-gold px-2.5 py-1 rounded-md bg-neutral-900/80 hover:bg-gold hover:text-obsidian hover:border-gold transition-colors duration-200 cursor-default"
              >
                {prod}
              </span>
            ))}
          </div>

          {/* Social / Quick Contact Circle Icons */}
          <div className="flex items-center gap-2 pt-2">
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-white transition flex items-center justify-center shadow-sm"
            >
              <IconBrandWhatsapp size={18} stroke={2} />
            </a>
            <a
              href={BUSINESS_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Showroom Location"
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition flex items-center justify-center shadow-sm"
            >
              <IconMapPin size={18} stroke={2} />
            </a>
            <a
              href={BUSINESS_INFO.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-blue-500/40 text-blue-400 hover:bg-blue-500 hover:text-white transition flex items-center justify-center shadow-sm"
            >
              <IconBrandFacebook size={18} stroke={2} />
            </a>
            <a
              href={`tel:${BUSINESS_INFO.mainPhoneClean}`}
              aria-label="Call Hotline"
              className="w-9 h-9 rounded-lg bg-neutral-900 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition flex items-center justify-center shadow-sm"
            >
              <IconPhone size={18} stroke={2} />
            </a>
          </div>
        </div>

        {/* Column 2: Product Categories & RAK Series */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gold/30">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold">
              Products &amp; Collections
            </h4>
          </div>

          <ul className="space-y-1.5 text-xs text-neutral-300">
            <li>
              <Link
                href="/catalog?category=Tiles"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  Wall &amp; Floor Tiles (ওয়াল ও ফ্লোর টাইলস)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?size=60x120+cm"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  RAK 60x120 cm Grand Slabs (২৪x৪৮ স্ল্যাব)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?size=80x80+cm"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  RAK 80x80 &amp; 60x60 Mirror Polish (মিরর পলিশ)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Basin"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  Table Top &amp; Cabinet Basin (বেসিন)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Commode"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  High, Low &amp; Smart Commode (কমোড)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Sanitary"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  Sanitary Ware &amp; Jaynamaj Tiles (স্যানিটারি)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Bathroom+Accessories"
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-neutral-900/80 hover:text-gold transition group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  Bathroom Fittings &amp; Mixers (বাথরুম ফিটিংস)
                </span>
                <IconArrowRight size={14} className="text-gold/40 group-hover:text-gold transition shrink-0" />
              </Link>
            </li>
          </ul>

          <div className="pt-1">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-light group transition"
            >
              <span>সব ৫০০০+ কালেকশন দেখুন</span>
              <IconArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Column 3: Home Delivery Zones & Smart Tools */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gold/30">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold">
              Home Delivery &amp; Tools
            </h4>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gold-light font-medium flex items-center gap-1.5">
              <IconTruckDelivery size={15} className="text-gold shrink-0" />
              <span>হোম ডেলিভারি কাভারেজ এলাকা:</span>
            </p>
            <div className="grid grid-cols-1 gap-1 text-xs text-neutral-300">
              {BUSINESS_INFO.homeDeliveryAreas.map((area) => (
                <div key={area} className="flex items-center gap-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modern Interactive Tile Calculator Card */}
          <div className="pt-1">
            <Link
              href="/calculator"
              className="block p-4 rounded-xl bg-gradient-to-br from-gold/20 via-neutral-900 to-obsidian border border-gold/40 hover:border-gold transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-gold text-obsidian flex items-center justify-center font-bold">
                  <IconCalculator size={18} stroke={2.2} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
                  ফ্রি ক্যালকুলেটর
                </span>
              </div>
              <h5 className="text-xs font-bold text-white group-hover:text-gold transition mb-1">
                বাসার মাপ অনুযায়ী টাইলস ক্যালকুলেটর
              </h5>
              <p className="text-[11px] text-neutral-400 leading-relaxed mb-3">
                রুম সাইজ দিন, কত স্কয়ারফিট ও কয় কার্টুন টাইলস লাগবে সহজেই হিসাব করুন।
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold group-hover:text-white transition">
                <span>হিসাব শুরু করুন</span>
                <IconArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 4: Showroom Address & Main Contact */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gold/30">
            <div className="w-2 h-2 rounded-full bg-gold" />
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold">
              Showroom &amp; Contact
            </h4>
          </div>

          {/* Location Card */}
          <div className="p-3 rounded-lg bg-neutral-900/70 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold">
              <IconMapPin size={15} />
              <span>শো-রুম লোকেশন:</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {BUSINESS_INFO.addressExact}
            </p>
            <p className="text-[11px] text-gold/80 font-medium">
              {BUSINESS_INFO.addressBn}
            </p>
          </div>

          {/* Hours & Email Card */}
          <div className="p-3 rounded-lg bg-neutral-900/70 border border-white/10 space-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <IconClock size={16} className="text-gold shrink-0" />
              <span>প্রতিদিন সকাল ৮:৩০ টা — রাত ১০:০০ টা (খোলা)</span>
            </div>
            <div className="flex items-center gap-2">
              <IconMail size={16} className="text-gold shrink-0" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-gold transition truncate">
                {BUSINESS_INFO.email}
              </a>
            </div>
          </div>

          {/* WhatsApp Direct VIP Hotline Card */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-green-500/40 hover:border-green-400 hover:bg-neutral-800/90 transition group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform shrink-0">
                <IconBrandWhatsapp size={20} stroke={2} />
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>হটলাইন ও WhatsApp:</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-green-400 transition">
                  {BUSINESS_INFO.mainPhone}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/30 group-hover:bg-gold group-hover:text-obsidian transition">
              চ্যাট
            </span>
          </a>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={BUSINESS_INFO.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-neutral-900 text-white border border-gold/30 hover:border-gold hover:bg-gold hover:text-obsidian py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <IconMapPin size={14} stroke={2} />
              <span>Google Map</span>
            </a>
            <a
              href={BUSINESS_INFO.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-neutral-900 text-white border border-gold/30 hover:border-gold hover:bg-gold hover:text-obsidian py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <IconBrandFacebook size={14} stroke={1.8} />
              <span>Facebook</span>
            </a>
            <Link
              href="/contact"
              className="text-xs font-semibold bg-neutral-900 text-white border border-white/20 hover:border-gold hover:text-gold py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <IconAddressBook size={14} stroke={1.8} />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/admin"
              className="text-xs font-semibold bg-neutral-900 text-gold border border-gold/40 hover:bg-gold hover:text-obsidian py-2 px-2.5 rounded-lg transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <IconUserShield size={14} stroke={1.8} />
              <span>Admin</span>
            </Link>
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
