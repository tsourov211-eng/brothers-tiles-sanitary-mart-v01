"use client";

import React from "react";
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
} from "@tabler/icons-react";

export default function Footer() {
  const pathname = usePathname();

  // If on admin dashboard, hide public footer
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-obsidian text-white border-t-4 border-gold">
      {/* Main Luxury Business-Card Inspired Black + Gold + White Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Business Identity */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
                alt="Brother's Tiles & Sanitary Mart"
                width={260}
                height={86}
                className="h-12 sm:h-14 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>
            <p className="text-xs text-gold font-medium">{BUSINESS_INFO.nameBn}</p>
          </div>
          <p className="text-sm text-gold font-semibold">
            {BUSINESS_INFO.tagline}
          </p>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {BUSINESS_INFO.subLine} — আমরা আর-এ-কে সিরামিকস (RAK Ceramics), আকিজ, ডিবিএল, ফু-ওয়াং, মীর এবং আবুল খায়ের ব্র্যান্ডের টাইলস ও স্যানিটারি পণ্য পাইকারি ও খুচরা মূল্যে সরবরাহ করি।
          </p>
          <div className="pt-1 flex flex-wrap gap-2">
            {BUSINESS_INFO.productsList.map((prod) => (
              <span
                key={prod}
                className="text-[11px] border border-gold/40 text-gold px-2.5 py-0.5 bg-obsidian-800"
              >
                {prod}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Product Categories & RAK Series */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gold border-b border-gold/30 pb-2">
            Products &amp; Collections
          </h4>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li>
              <Link
                href="/catalog?category=Tiles"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>Wall &amp; Floor Tiles (ওয়াল ও ফ্লোর টাইলস)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?size=60x120+cm"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>RAK 60x120 cm Grand Slabs (২৪x৪৮ স্ল্যাব)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?size=80x80+cm"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>RAK 80x80 &amp; 60x60 Mirror Polish (মিরর পলিশ)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Basin"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>Table Top, Pedestal &amp; Cabinet Basin (বেসিন)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Commode"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>High, Low &amp; Smart Commode (কমোড)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Sanitary"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>Sanitary Ware &amp; Jaynamaj Tiles (স্যানিটারি ও জায়নামাজ)</span>
              </Link>
            </li>
            <li>
              <Link
                href="/catalog?category=Bathroom+Accessories"
                className="hover:text-gold transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                <span>Bathroom Accessories &amp; Mixers (বাথরুম ফিটিংস)</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Home Delivery Zones & Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gold border-b border-gold/30 pb-2">
            Home Delivery Coverage
          </h4>
          <p className="text-xs text-gold-light font-medium">
            হোম ডেলিভারি: {BUSINESS_INFO.homeDeliveryBn}
          </p>
          <ul className="space-y-1.5 text-xs text-neutral-300">
            {BUSINESS_INFO.homeDeliveryAreas.map((area) => (
              <li key={area} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-obsidian bg-gold hover:bg-gold-light px-3.5 py-2 transition shadow"
            >
              <IconCalculator size={16} stroke={2} />
              <span>বাসার মাপ অনুযায়ী ফ্রি টাইলস ক্যালকুলেটর</span>
              <IconArrowRight size={14} stroke={2} />
            </Link>
          </div>
        </div>

        {/* Column 4: Showroom Address & Main Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold tracking-widest uppercase text-gold border-b border-gold/30 pb-2">
            Showroom &amp; Contact
          </h4>
          <div className="space-y-2.5 text-xs text-neutral-300">
            <div>
              <strong className="text-white block mb-0.5">
                ঠিকানা (Address):
              </strong>
              <p className="leading-relaxed">{BUSINESS_INFO.addressExact}</p>
            </div>
            <div>
              <strong className="text-white block mb-0.5">
                Main Phone / WhatsApp:
              </strong>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold font-bold text-sm hover:underline flex items-center gap-1"
              >
                <IconBrandWhatsapp size={16} stroke={2} />
                <span>{BUSINESS_INFO.mainPhone}</span>
              </a>
            </div>
            <div>
              <strong className="text-white block mb-0.5">
                Email:
              </strong>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-gold transition">
                {BUSINESS_INFO.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href={BUSINESS_INFO.googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold bg-white text-obsidian hover:bg-gold px-3 py-1.5 transition flex items-center gap-1"
              >
                <IconMapPin size={14} stroke={2} />
                <span>Google Map</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold border border-gold text-gold hover:bg-gold hover:text-obsidian px-3 py-1.5 transition flex items-center gap-1"
              >
                <IconBrandFacebook size={14} stroke={1.8} />
                <span>Facebook</span>
              </a>
              <Link
                href="/contact"
                className="text-[11px] font-bold border border-white/40 text-white hover:border-gold hover:text-gold px-3 py-1.5 transition flex items-center gap-1"
              >
                <IconAddressBook size={14} stroke={1.8} />
                <span>Contacts</span>
              </Link>
              <Link
                href="/admin"
                className="text-[11px] font-bold border border-gold/70 text-gold hover:bg-gold hover:text-obsidian px-3 py-1.5 transition flex items-center gap-1"
              >
                <IconUserShield size={14} stroke={1.8} />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Brand Bar */}
      <div className="border-t border-neutral-800 bg-black py-4 px-4 sm:px-8 text-[11px] text-neutral-400">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.fullName}. All Rights Reserved.
          </p>
          <p className="text-gold/90">
            Black + Gold + White Edition • {BUSINESS_INFO.addressExact}
          </p>
        </div>
      </div>
    </footer>
  );
}
