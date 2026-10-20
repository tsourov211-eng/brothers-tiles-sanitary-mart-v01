"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconPhone,
  IconBrandWhatsapp,
  IconMail,
  IconBrandFacebook,
  IconMapPin,
  IconArrowRight,
  IconSend,
  IconTruckDelivery,
  IconCheck,
  IconUser,
  IconHeadset,
  IconLayoutGrid,
  IconExternalLink,
  IconChevronDown,
  IconWallet,
} from "@tabler/icons-react";

const DELIVERY_AREAS = [
  "Gazipur Sadar (গাজীপুর সদর)",
  "Bhabanipur (ভবানীপুর)",
  "Tongi (টঙ্গী)",
  "Uttara (উত্তরা)",
  "Dhaka City (ঢাকা)",
  "Mymensingh (ময়মনসিংহ)",
  "Tangail (টাঙ্গাইল)",
  "Other Area (অন্যান্য)",
];

const PRODUCT_CATEGORIES = [
  "Tiles",
  "Basin",
  "Commode",
  "Sanitary Ware",
  "Bathroom Accessories",
  "Complete House Package",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [productCategory, setProductCategory] = useState("Tiles");
  const [message, setMessage] = useState("");
  const [copiedBkash, setCopiedBkash] = useState(false);

  const handleCopyBkash = () => {
    try {
      navigator.clipboard.writeText(BUSINESS_INFO.contactPageOnlyNumbers.bikashClean);
      setCopiedBkash(true);
      setTimeout(() => setCopiedBkash(false), 2000);
    } catch {
      window.location.href = `tel:${BUSINESS_INFO.contactPageOnlyNumbers.bikashClean}`;
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `আসসালামু আলাইকুম (${BUSINESS_INFO.nameEn}),`,
      `নাম: ${name || "গ্রাহক"}`,
      `ফোন: ${phone || "N/A"}`,
      `ডেলিভারি এলাকা: ${deliveryArea || "গাজীপুর"}`,
      `পণ্যের ধরন: ${productCategory}`,
      `বিস্তারিত: ${message || "পাইকারি ও খুচরা মূল্য ও ক্যাটালগ জানতে চাই।"}`,
    ].join("\n");
    window.open(
      `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
        {/* ===================================================================
            TOP ROW: 4 CONTACT CARDS
           =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: MAIN HOTLINE (Dark Card) */}
          <div className="bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0A0A0A] text-white rounded-[22px] border border-neutral-800 p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:border-gold/60 transition-all duration-300 min-h-[175px]">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#3D3114] text-[#E5A93C] flex items-center justify-center shrink-0">
                  <IconPhone size={16} stroke={2.2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
                  MAIN HOTLINE
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#F3BA46] pt-1">
                {BUSINESS_INFO.mainPhone}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-2.5">
              <a
                href={`tel:${BUSINESS_INFO.mainPhoneClean}`}
                className="flex-1 bg-[#E5A93C] hover:bg-[#d4982f] text-black font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <IconPhone size={14} stroke={2.5} />
                <span>CALL</span>
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#00C853] hover:bg-[#00b047] text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <IconBrandWhatsapp size={15} stroke={2.5} />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Card 2: SHOWROOM DESK (White Card) */}
          <div className="bg-white rounded-[22px] border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:border-neutral-400 transition-all duration-300 min-h-[175px]">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5EDE0] text-[#B58A42] flex items-center justify-center shrink-0">
                  <IconUser size={16} stroke={2.2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  SHOWROOM DESK
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-[#141414] pt-1">
                {BUSINESS_INFO.contactPageOnlyNumbers.manager}
              </p>
            </div>

            <div className="pt-4">
              <a
                href={`tel:${BUSINESS_INFO.contactPageOnlyNumbers.managerClean}`}
                className="w-full bg-[#181818] hover:bg-[#282828] text-[#F3BA46] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <IconPhone size={14} stroke={2.2} />
                <span>CALL MANAGER</span>
              </a>
            </div>
          </div>

          {/* Card 3: bKash (Pixel-Perfect Redesign matching Reference Image) */}
          <div className="bg-gradient-to-br from-[#E2136E] via-[#DE126B] to-[#C90E5F] text-white rounded-[26px] p-6 flex flex-col justify-between shadow-[0_12px_35px_rgba(226,19,110,0.32)] hover:shadow-[0_16px_40px_rgba(226,19,110,0.42)] transition-all duration-300 relative overflow-hidden min-h-[195px] group">
            {/* Upper-Right Fluid Translucent Wave Overlay */}
            <svg
              viewBox="0 0 180 150"
              className="absolute top-0 right-0 w-40 sm:w-48 h-auto pointer-events-none select-none opacity-25 transition-transform duration-500 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M180 0C125 0 75 40 50 150H180V0Z"
                fill="white"
              />
            </svg>

            {/* Top Row: Official bKash Origami Bird + bKash Typography */}
            <div className="flex items-center gap-3 relative z-10">
              <svg
                viewBox="168 0 158 150"
                className="w-10 h-10 select-none shrink-0 drop-shadow-xs"
                fill="white"
                aria-hidden="true"
              >
                <polygon points="225.42,71.2 234.67,112.76 295.16,82.13" fill="white" opacity="0.92" />
                <polygon points="242.63,9.1 225.43,71.21 295.18,82.13" fill="white" opacity="1" />
                <polygon points="168.73,0 240.86,8.62 223.81,70.36" fill="white" opacity="0.9" />
                <polygon points="168.15,12.15 176.19,12.15 198.73,40.96" fill="white" opacity="0.8" />
                <polygon points="297.09,81.74 276.12,52.72 310.04,46.65" fill="white" opacity="0.9" />
                <polygon points="293.59,90.24 295.74,83.78 242.81,110.64" fill="white" opacity="1" />
                <polygon points="223.94,72.84 234.98,122.49 202.2,149.14" fill="white" opacity="0.82" />
                <polygon points="306.73,61.4 325.98,61.07 312.07,46.92" fill="white" opacity="1" />
              </svg>
              <span className="text-xl sm:text-[22px] font-bold text-white tracking-tight leading-none">
                bKash
              </span>
            </div>

            {/* Middle: Phone Number */}
            <div className="py-2.5 relative z-10">
              <p className="text-2xl sm:text-[27px] font-bold font-sans tracking-tight text-white drop-shadow-2xs">
                {BUSINESS_INFO.contactPageOnlyNumbers.bikash}
              </p>
            </div>

            {/* Bottom: Solid White Rounded Pill Button with Wallet Icon */}
            <div className="pt-1 relative z-10">
              <button
                type="button"
                onClick={handleCopyBkash}
                className="w-full bg-white hover:bg-neutral-50 active:scale-[0.99] text-[#E2136E] font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 rounded-[14px] flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md cursor-pointer"
                title="Copy bKash Number"
              >
                {/* Custom bKash Magenta Wallet Icon matching Mockup */}
                <svg
                  viewBox="0 0 24 20"
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="1" y="4" width="22" height="15" rx="3.5" fill="#E2136E" />
                  <path
                    d="M4 4V2.2A1.2 1.2 0 0 1 5.2 1h13.6A1.2 1.2 0 0 1 20 2.2V4"
                    stroke="#E2136E"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="17" cy="11.5" r="1.5" fill="white" />
                </svg>
                <span className="tracking-wider uppercase font-extrabold">
                  {copiedBkash ? "COPIED!" : "BKASH"}
                </span>
              </button>
            </div>
          </div>

          {/* Card 4: ONLINE DESK (White Card) */}
          <div className="bg-white rounded-[22px] border border-neutral-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:border-neutral-400 transition-all duration-300 min-h-[175px]">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EBF3FF] text-[#2F80ED] flex items-center justify-center shrink-0">
                  <IconHeadset size={16} stroke={2.2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  ONLINE DESK
                </span>
              </div>
              <p className="text-[14px] sm:text-[15px] font-bold font-sans text-[#141414] truncate pt-1.5" title={BUSINESS_INFO.email}>
                {BUSINESS_INFO.email}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-2.5">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex-1 bg-[#181818] hover:bg-[#282828] text-[#F3BA46] font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <IconMail size={14} stroke={2.2} />
                <span>EMAIL</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <IconBrandFacebook size={14} stroke={2.2} />
                <span>FACEBOOK</span>
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================================
            BOTTOM ROW: 2-COLUMN LAYOUT (Address & Map + WhatsApp Inquiry Form)
           =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (6 Cols): SHOWROOM ADDRESS & INTERACTIVE GOOGLE MAP
             ----------------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col gap-5 justify-between">
            {/* Card 5: Showroom Address & Home Delivery */}
            <div className="bg-gradient-to-r from-[#171717] via-[#141414] to-[#1F1B12] text-white rounded-[22px] border border-neutral-800 p-6 sm:p-7 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.18)] relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Top part: Address & Building Illustration */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#3D3114] text-[#E5A93C] flex items-center justify-center shrink-0">
                      <IconMapPin size={15} stroke={2.2} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5A93C]">
                      SHOWROOM ADDRESS
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug pt-1 max-w-sm">
                    {BUSINESS_INFO.addressExact}
                  </h3>
                </div>

                {/* Modern Architectural Showroom Illustration */}
                <div className="hidden sm:block shrink-0">
                  <svg
                    viewBox="0 0 200 150"
                    className="w-32 sm:w-36 h-auto opacity-85 select-none pointer-events-none drop-shadow-md"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="30,55 110,30 180,48 100,75" fill="#4A3B18" stroke="#E5A93C" strokeWidth="1.2" />
                    <polygon points="30,55 100,75 100,135 30,115" fill="#302610" stroke="#9A7228" strokeWidth="0.8" />
                    <polygon points="100,75 180,48 180,110 100,135" fill="#181308" stroke="#9A7228" strokeWidth="0.8" />
                    <polygon points="22,68 100,90 100,96 22,74" fill="#E5A93C" opacity="0.95" />
                    <polygon points="100,90 172,64 172,70 100,96" fill="#C48E2E" opacity="0.95" />
                    <polygon points="38,80 92,96 92,125 38,108" fill="#E5A93C" opacity="0.6" />
                    <line x1="65" y1="88" x2="65" y2="117" stroke="#181308" strokeWidth="1.2" />
                    <polygon points="108,94 172,68 172,98 108,122" fill="#E5A93C" opacity="0.4" />
                    <line x1="140" y1="81" x2="140" y2="110" stroke="#181308" strokeWidth="1.2" />
                    <circle cx="20" cy="115" r="9" fill="#E5A93C" opacity="0.4" />
                    <rect x="18" y="120" width="3.5" height="10" fill="#4A3B18" />
                  </svg>
                </div>
              </div>

              {/* Middle Section: HOME DELIVERY */}
              <div className="border-t border-neutral-800/90 pt-3.5 pb-1 flex items-start gap-3">
                <div className="text-[#E5A93C] shrink-0 mt-0.5">
                  <IconTruckDelivery size={20} stroke={2} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A93C] block">
                    HOME DELIVERY
                  </span>
                  <p className="text-xs text-neutral-300 font-medium leading-relaxed mt-0.5">
                    {BUSINESS_INFO.homeDeliveryBn}
                  </p>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={BUSINESS_INFO.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 bg-[#E5A93C] hover:bg-[#d4982f] text-black font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <IconMapPin size={15} stroke={2.5} />
                  <span>OPEN GOOGLE MAP</span>
                  <IconArrowRight size={14} stroke={2.5} />
                </a>
                <a
                  href={BUSINESS_INFO.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 bg-black/60 hover:bg-black/90 border border-neutral-700/80 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <IconBrandFacebook size={15} className="text-[#1877F2]" stroke={2.5} />
                  <span className="text-[11px] truncate">FACEBOOK.COM/BROTHERSTILESBD</span>
                </a>
              </div>
            </div>

            {/* Card 6: Interactive Google Map */}
            <div className="rounded-[22px] border border-neutral-200/90 overflow-hidden bg-neutral-100 h-[210px] sm:h-[230px] relative shadow-[0_4px_25px_rgba(0,0,0,0.04)]">
              {/* Floating location card on map */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-neutral-200/90 rounded-xl p-2.5 shadow-md flex items-start gap-2 z-10 max-w-[220px]">
                <div>
                  <p className="text-xs font-bold text-obsidian leading-tight">
                    Jayson Gate Jame Masjid
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    4CM7+XXJ, Bangladesh
                  </p>
                  <a
                    href={BUSINESS_INFO.googleMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline mt-1.5"
                  >
                    <IconExternalLink size={11} stroke={2.2} />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>

              <iframe
                title="Brother's Tiles & Sanitary Mart Map - Jason Gate, Bhabanipur, Gazipur"
                src="https://maps.google.com/maps?q=Jason+Gate,+Bhabanipur,+Gazipur+Sadar,+Gazipur,+Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (6 Cols): WHATSAPP INQUIRY FORM
             ----------------------------------------------------------------- */}
          <div className="lg:col-span-6 bg-white rounded-[22px] border border-neutral-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-6 sm:p-7 flex flex-col justify-between">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-2.5 pb-1">
                <div className="w-8 h-8 rounded-full bg-[#F5EDE0] text-[#B58A42] flex items-center justify-center shrink-0">
                  <IconSend size={15} stroke={2.2} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#A67B2E]">
                  WHATSAPP INQUIRY
                </h3>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-obsidian placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-obsidian placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition"
                  />
                </div>
              </div>

              {/* Row 2: Delivery Area & Product Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Delivery Area
                  </label>
                  <div className="relative">
                    <IconMapPin
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                    <select
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-xl pl-8 pr-8 py-2.5 text-xs text-neutral-700 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition cursor-pointer"
                    >
                      <option value="">Select area</option>
                      {DELIVERY_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Product Category
                  </label>
                  <div className="relative">
                    <IconLayoutGrid
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full appearance-none bg-[#F8F9FA] border border-neutral-200 rounded-xl pl-8 pr-8 py-2.5 text-xs text-neutral-700 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition cursor-pointer"
                    >
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <IconChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Message / Tile Size &amp; Quantity
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-xl p-3 text-xs text-obsidian placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition resize-none"
                />
              </div>

              {/* Big WhatsApp Action Button */}
              <button
                type="submit"
                className="w-full bg-[#00C853] hover:bg-[#00b047] text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#00C853]/25 hover:shadow-lg hover:shadow-[#00C853]/35 transition-all cursor-pointer"
              >
                <IconBrandWhatsapp size={19} stroke={2.5} />
                <span>SEND DIRECT MESSAGE ON WHATSAPP</span>
                <IconSend size={15} stroke={2.5} />
              </button>

              {/* Trust Checkmarks */}
              <div className="flex items-center justify-center gap-5 sm:gap-6 text-xs font-medium text-[#B58A42] pt-2">
                <span className="flex items-center gap-1">
                  <IconCheck size={14} stroke={3} /> ফ্রি কোটেশন
                </span>
                <span className="flex items-center gap-1">
                  <IconCheck size={14} stroke={3} /> সরাসরি বিক্রেতা
                </span>
                <span className="flex items-center gap-1">
                  <IconCheck size={14} stroke={3} /> দ্রুত ডেলিভারি
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
