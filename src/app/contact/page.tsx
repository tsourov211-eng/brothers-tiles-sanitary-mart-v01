"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconPhone,
  IconBrandWhatsapp,
  IconCreditCard,
  IconMail,
  IconBrandFacebook,
  IconMapPin,
  IconArrowRight,
  IconSend,
  IconSparkles,
  IconBuildingStore,
  IconClock,
  IconTruckDelivery,
  IconCheck,
} from "@tabler/icons-react";
import CustomDropdown, { DropdownOption } from "@/components/CustomDropdown";

const CONTACT_CATEGORY_OPTIONS: DropdownOption[] = [
  { value: "Tiles (ওয়াল ও ফ্লোর টাইলস)", label: "Tiles", subLabel: "ওয়াল ও ফ্লোর টাইলস" },
  { value: "Basin (বেসিন)", label: "Basin", subLabel: "বেসিন ও ভ্যানিটি সেট" },
  { value: "Commode (কমোড)", label: "Commode", subLabel: "কমোড ও প্যান" },
  { value: "Sanitary Ware (স্যানিটারি)", label: "Sanitary Ware", subLabel: "স্যানিটারি সামগ্রী" },
  { value: "Bathroom Accessories (বাথরুম এক্সেসরিজ)", label: "Bathroom Accessories", subLabel: "বাথরুম ফিটিংস ও শাওয়ার" },
  { value: "Complete House Package (পূর্ণাঙ্গ বাড়ির প্যাকেজ)", label: "Complete House Package", subLabel: "পূর্ণাঙ্গ বাড়ির সম্পূর্ণ প্যাকেজ", badge: "Offer" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState("Tiles (ওয়াল ও ফ্লোর টাইলস)");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `আসসালামু আলাইকুম (${BUSINESS_INFO.nameEn}),`,
      `নাম: ${name || "গ্রাহক"}`,
      `ফোন: ${phone || "N/A"}`,
      `ডেলিভারি এলাকা: ${location || "গাজীপুর"}`,
      `পণ্যের ধরন: ${productType}`,
      `বিস্তারিত: ${message || "পাইকারি ও খুচরা মূল্য জানতে চাই।"}`,
    ].join("\n");
    window.open(
      `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Top Luxury Black & Gold Banner */}
      <div className="bg-gradient-to-r from-[#0A0A0A] via-[#141414] to-[#0A0A0A] text-white border-b-2 border-gold relative overflow-hidden py-12 px-4 sm:px-8 shadow-sm">
        {/* Subtle background gold glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />

        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30">
              <IconSparkles size={13} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                VISIT OUR SHOWROOM OR CALL DIRECTLY • ১০০% অথেনটিক পণ্য
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              যোগাযোগ ও শোরুম ঠিকানা{" "}
              <span className="text-gold-light text-xl sm:text-2xl font-sans font-normal">
                (Contact Us)
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed flex items-center gap-2">
              <IconMapPin size={16} className="text-gold shrink-0" />
              <span>
                {BUSINESS_INFO.fullName} — {BUSINESS_INFO.addressExact}
              </span>
            </p>
          </div>

          {/* Logo Card with Glassmorphism Effect */}
          <div className="bg-white/[0.06] backdrop-blur-md border border-gold/40 p-4 rounded-2xl shadow-xl flex items-center justify-center shrink-0 self-start md:self-auto hover:border-gold transition-colors duration-300">
            <Image
              src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
              alt="Brother's Tiles & Sanitary Mart Official Logo"
              width={260}
              height={86}
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Contact Cards 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Main Phone / WhatsApp (Hero Spotlight Card) */}
          <div className="bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0D0D0D] text-white rounded-2xl border-2 border-gold shadow-[0_12px_35px_rgba(212,175,55,0.18)] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group hover:border-gold-light transition-all duration-300">
            {/* Top decorative glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />

            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                  MAIN HOTLINE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                প্রধান হটলাইন ও হোয়াটসঅ্যাপ
              </h3>
              <p className="text-2xl font-black text-gold tracking-tight pt-0.5">
                {BUSINESS_INFO.mainPhone}
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে ছবিসহ অর্ডার ও কোটেশন নিন।
              </p>
            </div>

            {/* Premium Action Buttons: Call & Stunning WhatsApp Button */}
            <div className="pt-6 flex gap-2.5 relative z-10">
              <a
                href={`tel:${BUSINESS_INFO.mainPhoneClean}`}
                className="flex items-center justify-center gap-1.5 flex-1 bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-center text-xs font-bold uppercase py-3 px-3 rounded-xl shadow-md shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <IconPhone size={15} stroke={2.2} />
                <span>Call</span>
              </a>

              {/* Enhanced WhatsApp Button with Light Sweep and Glow */}
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7a6e] text-white text-center text-xs font-bold uppercase py-3 px-3 rounded-xl shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                {/* Light shimmer sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                <IconBrandWhatsapp
                  size={17}
                  stroke={2.2}
                  className="group-hover/btn:rotate-12 transition-transform duration-300 shrink-0"
                />
                <span className="tracking-wide">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Manager Number */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 hover:border-gold/60 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.12)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                SHOWROOM DESK
              </span>
              <h3 className="text-lg font-bold text-obsidian">ম্যানেজার নম্বর</h3>
              <p className="text-xl font-extrabold text-obsidian tracking-tight pt-0.5">
                {BUSINESS_INFO.contactPageOnlyNumbers.manager}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                শোরুম ভিজিট, পাইকারি ডিল এবং ডেলিভারি শিডিউল সংক্রান্ত তথ্যের জন্য।
              </p>
            </div>
            <div className="pt-6">
              <a
                href={`tel:${BUSINESS_INFO.contactPageOnlyNumbers.managerClean}`}
                className="flex items-center justify-center gap-2 w-full bg-obsidian hover:bg-obsidian-800 text-gold border border-gold/40 hover:border-gold text-center text-xs font-bold uppercase py-3 px-3 rounded-xl shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <IconPhone size={15} stroke={2} />
                <span>Call Manager</span>
              </a>
            </div>
          </div>

          {/* Card 3: bKash Payment */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 hover:border-[#e2136e]/40 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(226,19,110,0.12)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e2136e]/10 text-[#e2136e] text-[10px] font-bold uppercase tracking-wider border border-[#e2136e]/20">
                OFFICIAL BKASH
              </span>
              <h3 className="text-lg font-bold text-obsidian">বিকাশ (bKash) নম্বর</h3>
              <p className="text-xl font-extrabold text-[#e2136e] tracking-tight pt-0.5">
                {BUSINESS_INFO.contactPageOnlyNumbers.bikash}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                অর্ডার কনফার্মেশন ও বুকিং পেমেন্ট পাঠানোর আগে অনুগ্রহ করে ফোনে কথা বলে নিন।
              </p>
            </div>
            <div className="pt-6">
              <a
                href={`tel:${BUSINESS_INFO.contactPageOnlyNumbers.bikashClean}`}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#E2136E] to-[#C0105D] hover:from-[#c0105d] hover:to-[#9f0d4d] text-white text-center text-xs font-bold uppercase py-3 px-3 rounded-xl shadow-md shadow-[#e2136e]/25 hover:shadow-[#e2136e]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <IconCreditCard size={15} stroke={2} />
                <span>bKash: {BUSINESS_INFO.contactPageOnlyNumbers.bikash}</span>
              </a>
            </div>
          </div>

          {/* Card 4: Official Email & Social */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 hover:border-gold/60 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.12)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                ONLINE DESK
              </span>
              <h3 className="text-lg font-bold text-obsidian">ইমেইল ও ফেসবুক</h3>
              <p className="text-xs font-bold text-obsidian break-all pt-0.5">
                {BUSINESS_INFO.email}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                কর্পোরেট কোটেশন, বিল্ডার্স পার্টনারশিপ ও নতুন কালেকশন আপডেটের জন্য।
              </p>
            </div>
            <div className="pt-6 flex gap-2">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center justify-center gap-1.5 flex-1 bg-obsidian text-gold hover:bg-obsidian-800 text-center text-xs font-bold uppercase py-3 px-2 rounded-xl shadow-xs border border-gold/30 hover:border-gold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <IconMail size={14} stroke={2} />
                <span>Email</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 flex-1 bg-gradient-to-r from-[#1877F2] to-[#1464cc] hover:from-[#166fe5] hover:to-[#0f54b3] text-white text-center text-xs font-bold uppercase py-3 px-2 rounded-xl shadow-md shadow-[#1877F2]/25 hover:shadow-[#1877F2]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <IconBrandFacebook size={14} stroke={2} />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Exact Address, Delivery Coverage & Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 6 cols: Showroom Location Details & Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Showroom Address Card */}
            <div className="bg-gradient-to-b from-[#181818] via-[#121212] to-[#0A0A0A] text-white rounded-2xl border-2 border-gold/80 p-6 sm:p-8 space-y-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)] relative overflow-hidden">
              {/* Subtle gold glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-gold/15 rounded-full blur-2xl" />

              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    EXACT SHOWROOM ADDRESS (ঠিকানা হুবহু)
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                  {BUSINESS_INFO.addressExact}
                </h2>
                <p className="text-xs sm:text-sm text-gold-light font-medium pt-1">
                  {BUSINESS_INFO.addressBn}
                </p>
              </div>

              {/* Delivery Coverage Badge Block */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-gold/25 rounded-xl p-4 space-y-1.5 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <IconTruckDelivery size={16} stroke={2} className="text-gold" />
                  <span>হোম ডেলিভারি এরিয়া (Home Delivery):</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  {BUSINESS_INFO.homeDeliveryBn}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 relative z-10">
                <a
                  href={BUSINESS_INFO.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3.5 rounded-xl shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-center"
                >
                  <IconMapPin size={16} stroke={2.2} className="shrink-0" />
                  <span>Open Official Google Map Link</span>
                  <IconArrowRight size={14} stroke={2.2} className="shrink-0" />
                </a>
                <a
                  href={BUSINESS_INFO.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-gold/60 text-gold hover:bg-gold hover:text-obsidian text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  <IconBrandFacebook size={16} stroke={2} className="shrink-0" />
                  <span className="truncate">facebook.com/brotherstilesbd</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="rounded-2xl border-2 border-neutral-300 hover:border-gold/60 overflow-hidden bg-stonebg h-80 relative shadow-md transition-colors duration-300">
              <iframe
                title="Brother's Tiles & Sanitary Mart Map - Jason Gate, Bhabanipur, Gazipur"
                src="https://www.google.com/maps?q=Jason+Gate,+Bhabanipur,+Gazipur+Sadar,+Gazipur,+Bangladesh,+1700&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right 6 cols: Interactive Quotation & Consultation Request Form */}
          <form
            onSubmit={handleWhatsAppSubmit}
            className="lg:col-span-6 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_45px_-10px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-5 relative overflow-hidden"
          >
            {/* Top decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-[10px] font-bold uppercase tracking-widest border border-gold/30">
                <IconSparkles size={12} className="text-gold" />
                INSTANT WHATSAPP INQUIRY
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-obsidian mt-2">
                পাইকারি ও খুচরা কোটেশন বা পরামর্শের জন্য মেসেজ দিন
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                আপনার প্রয়োজন লিখে মেসেজ পাঠান, আমাদের শোরুম টিম সরাসরি হোয়াটসঅ্যাপে রিপ্লাই দেবে।
              </p>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1.5">
                  Your Name (আপনার নাম) <span className="text-gold-dark">*</span>
                </label>
                <div className="relative flex items-center bg-[#FAF9F5] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl px-3.5 py-2.5 transition-all shadow-2xs">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ কামরুল হাসান"
                    className="w-full text-xs sm:text-sm font-medium text-obsidian bg-transparent focus:outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian mb-1.5">
                  Phone / WhatsApp (মোবাইল নম্বর) <span className="text-gold-dark">*</span>
                </label>
                <div className="relative flex items-center bg-[#FAF9F5] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl px-3.5 py-2.5 transition-all shadow-2xs">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full text-xs sm:text-sm font-medium text-obsidian bg-transparent focus:outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1.5">
                  Delivery Area (ডেলিভারি এলাকা)
                </label>
                <div className="relative flex items-center bg-[#FAF9F5] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl px-3.5 py-2.5 transition-all shadow-2xs">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="গাজীপুর / ঢাকা / ময়মনসিংহ"
                    className="w-full text-xs sm:text-sm font-medium text-obsidian bg-transparent focus:outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian mb-1.5">
                  Product Category (পণ্যের ধরন)
                </label>
                <CustomDropdown
                  variant="default"
                  value={productType}
                  onChange={setProductType}
                  options={CONTACT_CATEGORY_OPTIONS}
                  ariaLabel="Select Product Category"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-obsidian mb-1.5">
                Message / Tile Size &amp; Quantity (বিস্তারিত লিখুন)
              </label>
              <div className="relative bg-[#FAF9F5] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl p-3 transition-all shadow-2xs">
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="কোন সাইজের টাইলস, কত স্কয়ার ফিট বা কোন ব্র্যান্ডের স্যানিটারি প্রয়োজন তা লিখুন..."
                  className="w-full text-xs sm:text-sm font-medium text-obsidian bg-transparent focus:outline-none placeholder:text-neutral-400 resize-none"
                />
              </div>
            </div>

            {/* Ultra-Luxury WhatsApp Submit Button */}
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#25D366] via-[#20bf5a] to-[#128C7E] p-[1px] shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/45 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <div className="relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#22bf5b] hover:to-[#17a552] text-white py-4 px-6 rounded-xl transition-all duration-300">
                {/* Light shimmer sweep animation */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <IconBrandWhatsapp
                  size={22}
                  stroke={2.2}
                  className="shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider drop-shadow-sm whitespace-nowrap">
                  Send Direct Message on WhatsApp
                </span>
                <IconSend
                  size={18}
                  stroke={2.2}
                  className="shrink-0 group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <IconCheck size={14} className="text-gold-dark" /> ফ্রি কোটেশন
              </span>
              <span className="flex items-center gap-1">
                <IconCheck size={14} className="text-gold-dark" /> সরাসরি ডিলার রেট
              </span>
              <span className="flex items-center gap-1">
                <IconCheck size={14} className="text-gold-dark" /> দ্রুত ডেলিভারি
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
