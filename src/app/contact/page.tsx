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
    <div className="bg-white min-h-screen">
      {/* Top Luxury Black & Gold Banner */}
      <div className="bg-obsidian text-white border-b-2 border-gold py-10 px-4 sm:px-8">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              VISIT OUR SHOWROOM OR CALL DIRECTLY
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              যোগাযোগ ও শোরুম ঠিকানা (Contact Us)
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              {BUSINESS_INFO.fullName} — {BUSINESS_INFO.addressExact}
            </p>
          </div>
          <div className="bg-white/10 border border-gold/40 p-3 rounded-sm flex items-center justify-center shrink-0 shadow-lg self-start md:self-auto">
            <Image
              src="/images/logo/Brothers Tiles & Sanitary Logo-dark.png"
              alt="Brother's Tiles & Sanitary Mart Official Logo"
              width={260}
              height={86}
              className="h-14 sm:h-18 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Contact Cards Grid (Includes Main Phone/WhatsApp + Contact-Page-Only Manager & bKash Numbers) */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Main Phone / WhatsApp */}
          <div className="bg-obsidian text-white border-2 border-gold p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  MAIN PHONE / WHATSAPP
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">প্রধান হটলাইন ও হোয়াটসঅ্যাপ</h3>
              <p className="text-xl font-extrabold text-gold pt-1">
                {BUSINESS_INFO.mainPhone}
              </p>
              <p className="text-xs text-neutral-300">
                সরাসরি কল করুন অথবা হোয়াটসঅ্যাপে ছবিসহ অর্ডার ও কোটেশন নিন।
              </p>
            </div>
            <div className="pt-4 flex gap-2">
              <a
                href={`tel:${BUSINESS_INFO.mainPhoneClean}`}
                className="flex items-center justify-center gap-1.5 flex-1 bg-gold text-obsidian text-center text-xs font-bold uppercase py-2 hover:bg-gold-light transition"
              >
                <IconPhone size={14} stroke={2} />
                <span>Call</span>
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 flex-1 bg-[#25D366] text-white hover:bg-[#20ba59] text-center text-xs font-bold uppercase py-2 transition"
              >
                <IconBrandWhatsapp size={14} stroke={2} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Manager Number (Contact Page Exclusive as requested) */}
          <div className="bg-stonebg-light border-2 border-obsidian p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                  SHOWROOM MANAGER (শুধু Contact Page)
                </span>
              </div>
              <h3 className="text-lg font-bold text-obsidian">ম্যানেজার নম্বর</h3>
              <p className="text-xl font-extrabold text-obsidian pt-1">
                {BUSINESS_INFO.contactPageOnlyNumbers.manager}
              </p>
              <p className="text-xs text-neutral-600">
                শোরুম ভিজিট, পাইকারি ডিল এবং ডেলিভারি শিডিউল সংক্রান্ত তথ্যের জন্য।
              </p>
            </div>
            <div className="pt-4">
              <a
                href={`tel:${BUSINESS_INFO.contactPageOnlyNumbers.managerClean}`}
                className="flex items-center justify-center gap-2 w-full bg-obsidian hover:bg-obsidian-800 text-gold text-center text-xs font-bold uppercase py-2.5 transition"
              >
                <IconPhone size={14} stroke={2} />
                <span>Call Manager ({BUSINESS_INFO.contactPageOnlyNumbers.manager})</span>
              </a>
            </div>
          </div>

          {/* Card 3: bKash Payment Number (Contact Page Exclusive as requested) */}
          <div className="bg-stonebg-light border-2 border-obsidian p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                  BIKASH PAYMENT (শুধু Contact Page)
                </span>
              </div>
              <h3 className="text-lg font-bold text-obsidian">বিকাশ (bKash) নম্বর</h3>
              <p className="text-xl font-extrabold text-obsidian pt-1">
                {BUSINESS_INFO.contactPageOnlyNumbers.bikash}
              </p>
              <p className="text-xs text-neutral-600">
                অর্ডার কনফার্মেশন ও বুকিং পেমেন্ট পাঠানোর আগে অনুগ্রহ করে ফোনে কথা বলে নিন।
              </p>
            </div>
            <div className="pt-4">
              <a
                href={`tel:${BUSINESS_INFO.contactPageOnlyNumbers.bikashClean}`}
                className="flex items-center justify-center gap-2 w-full bg-[#e2136e] hover:bg-[#c0105d] text-white text-center text-xs font-bold uppercase py-2.5 transition"
              >
                <IconCreditCard size={14} stroke={2} />
                <span>bKash: {BUSINESS_INFO.contactPageOnlyNumbers.bikash}</span>
              </a>
            </div>
          </div>

          {/* Card 4: Official Email & Social */}
          <div className="bg-stonebg-light border-2 border-obsidian p-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                  EMAIL &amp; FACEBOOK PAGE
                </span>
              </div>
              <h3 className="text-lg font-bold text-obsidian">ইমেইল ও ফেসবুক</h3>
              <p className="text-sm font-bold text-obsidian break-all pt-1">
                {BUSINESS_INFO.email}
              </p>
              <p className="text-xs text-neutral-600">
                কর্পোরেট কোটেশন, বিল্ডার্স পার্টনারশিপ ও নতুন কালেকশন আপডেটের জন্য।
              </p>
            </div>
            <div className="pt-4 flex gap-2">
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center justify-center gap-1.5 flex-1 bg-obsidian text-gold hover:bg-obsidian-800 text-center text-xs font-bold uppercase py-2 transition"
              >
                <IconMail size={14} stroke={2} />
                <span>Email</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 flex-1 bg-[#1877F2] hover:bg-[#1464cc] text-white text-center text-xs font-bold uppercase py-2 transition"
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
            <div className="bg-obsidian text-white border-l-4 border-gold p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                EXACT SHOWROOM ADDRESS (ঠিকানা হুবহু)
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                {BUSINESS_INFO.addressExact}
              </h2>
              <p className="text-xs text-gold font-medium">
                {BUSINESS_INFO.addressBn}
              </p>
              <div className="border-t border-gold/25 pt-4 space-y-2">
                <strong className="text-xs uppercase tracking-wider text-gold block">
                  হোম ডেলিভারি এরিয়া (Home Delivery):
                </strong>
                <p className="text-xs text-neutral-200">
                  {BUSINESS_INFO.homeDeliveryBn}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={BUSINESS_INFO.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-obsidian text-xs font-bold uppercase tracking-wider px-5 py-3 transition shadow-sm"
                >
                  <IconMapPin size={16} stroke={2} />
                  <span>Open Official Google Map Link</span>
                  <IconArrowRight size={14} stroke={2} />
                </a>
                <a
                  href={BUSINESS_INFO.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-obsidian text-xs font-bold uppercase tracking-wider px-5 py-3 transition"
                >
                  <IconBrandFacebook size={16} stroke={2} />
                  <span>facebook.com/brotherstilesbd</span>
                </a>
              </div>
            </div>

            {/* Embedded Map Frame for Jason Gate, Bhabanipur, Gazipur Sadar */}
            <div className="border-2 border-obsidian overflow-hidden bg-stonebg h-72 relative">
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
            className="lg:col-span-6 bg-stonebg-light border border-neutral-300 p-6 sm:p-8 space-y-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                INSTANT WHATSAPP INQUIRY
              </span>
              <h2 className="text-xl font-serif font-bold text-obsidian mt-0.5">
                পাইকারি ও খুচরা কোটেশন বা পরামর্শের জন্য মেসেজ দিন
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
                  Your Name (আপনার নাম) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-xs text-obsidian"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
                  Phone / WhatsApp Number (মোবাইল নম্বর) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-xs text-obsidian"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
                  Delivery Area (ডেলিভারি এলাকা)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="গাজীপুর / টঙ্গী / উত্তরা / ঢাকা / ময়মনসিংহ / টাঙ্গাইল"
                  className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-xs text-obsidian"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-obsidian mb-1">
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
              <label className="block text-xs font-bold text-obsidian mb-1">
                Message / Tile Size &amp; Quantity (বিস্তারিত লিখুন)
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="কোন সাইজের টাইলস, কত স্কয়ার ফিট বা কোন ব্র্যান্ডের পণ্য প্রয়োজন তা লিখুন..."
                className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-xs text-obsidian"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-widest py-3.5 transition shadow-md"
            >
              <IconBrandWhatsapp size={18} stroke={2} />
              <span>Send Direct Message on WhatsApp ({BUSINESS_INFO.mainPhone})</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
