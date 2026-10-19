"use client";

import React from "react";
import Link from "next/link";
import ShowroomGallery from "@/components/ShowroomGallery";
import {
  BUSINESS_INFO,
  RAK_SIZE_INDEX,
  FACEBOOK_REVIEWS,
} from "@/data/siteData";
import {
  IconBrandFacebook,
  IconArrowRight,
  IconStarFilled,
} from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Real Showroom Grand Visual Tour & Gallery */}
      <ShowroomGallery />

      {/* Showroom Story & RAK Partnership */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
            আমাদের শোরুম সম্পর্কে
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
            আপনার স্বপ্নের বাড়ির জন্য, পছন্দের টাইলস ও স্যানিটারি এক ছাদের নিচে
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            গাজীপুরের ভবানীপুর (জেসন গেইট, ঢাকা-ময়মনসিংহ হাইওয়ের পাশে) অবস্থিত{" "}
            <strong>{BUSINESS_INFO.fullName}</strong> গাজীপুরের অন্যতম বিশ্বস্ত ও আধুনিক টাইলস এবং স্যানিটারি শোরুম। আমরা শুধু টাইলস দেখিয়ে দিই না—আমরা ক্লায়েন্টের প্রয়োজন, ঘরের মাপ, ডিজাইন ও বাজেট বুঝে তাদের সঙ্গে বসে বিস্তারিত আলোচনা করি এবং সঠিক গাইডলাইন প্রদান করি।
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-obsidian font-medium pt-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
              <span>৫০০০+ আধুনিক ও আকর্ষণীয় ডিজাইনের টাইলস এবং স্যানিটারি কালেকশন</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
              <span>পাইকারি দামে খুচরা বিক্রয় (Wholesale &amp; Retail Showroom)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
              <span>বাসার মাপ/প্ল্যান অনুযায়ী ফ্রি ডিজাইন ও নিখুঁত হিসাব</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2" />
              <span>গাজীপুর, টঙ্গী, উত্তরা, ঢাকা, ময়মনসিংহ, টাঙ্গাইল ও আশেপাশে দ্রুত হোম ডেলিভারি</span>
            </li>
          </ul>
        </div>

        {/* About RAK Ceramics Bangladesh (From Page 2 of Uploaded PDF) */}
        <div className="bg-stonebg-light border-l-4 border-gold p-6 sm:p-8 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-obsidian text-gold px-2.5 py-1">
            FEATURED FLAGSHIP BRAND • SERVING IN 150 COUNTRIES
          </span>
          <h3 className="text-lg font-serif font-bold text-obsidian">
            About RAK Ceramics (Bangladesh) Limited
          </h3>
          <p className="text-xs text-neutral-700 leading-relaxed">
            RAK Ceramics (Bangladesh) Limited is the country&rsquo;s largest and most respected tiles and sanitary ware brand. A joint venture entity between Bangladesh &amp; UAE (converted to public limited company on 10th June 2008 and listed on 13th June 2010), RAK Ceramics has over <strong>1,500 active models</strong> in ceramic &amp; porcelain tiles and over <strong>50 exclusive sanitary ware models</strong>, with an annual production capacity of 10.32 million SQM of tiles and 1.45 million pieces of sanitary ware.
          </p>
          <p className="text-xs text-neutral-700 leading-relaxed">
            Certified to <strong>ISO 9001:2015</strong> and <strong>ISO 14001:2015</strong>, RAK Ceramics complies with <strong>ISO 13006 (E) / BDS ISO 13006:2021</strong> for ceramic &amp; porcelain tiles and <strong>BDS 1162:2014</strong> for sanitary ware (BSTI-approved).
          </p>
        </div>
      </section>

      {/* Partner Brands Grid */}
      <section className="bg-obsidian text-white py-12 px-4 sm:px-8 border-t border-b border-gold/40">
        <div className="max-w-[1300px] mx-auto space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              AUTHORIZED &amp; MULTI-BRAND SHOWROOM
            </span>
            <h2 className="text-xl font-serif font-bold text-white mt-1">
              আমাদের শোরুমে প্রাপ্ত শীর্ষ ব্র্যান্ডসমূহ
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUSINESS_INFO.brandsCarried.map((b) => (
              <div
                key={b.name}
                className="bg-obsidian-800 border border-gold/30 p-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-gold">{b.name}</h3>
                  <p className="text-xs text-white font-medium mt-0.5">{b.nameBn}</p>
                </div>
                <p className="text-[11px] text-neutral-400 mt-2">{b.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Customer Reviews from Facebook (@brotherstilesbd) */}
      <section className="bg-stonebg py-12 px-4 sm:px-8 border-t border-neutral-300">
        <div className="max-w-[1300px] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark">
                REAL CUSTOMER VOICES FROM FACEBOOK
              </span>
              <h2 className="text-xl font-serif font-bold text-obsidian">
                গ্রাহকদের মতামত ও রিভিউ
              </h2>
            </div>
            <a
              href={BUSINESS_INFO.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1464cc] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 self-start transition shadow-sm"
            >
              <IconBrandFacebook size={16} stroke={2} />
              <span>Visit Official Facebook Page</span>
              <IconArrowRight size={14} stroke={2} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACEBOOK_REVIEWS.map((rev) => (
              <div
                key={rev.author}
                className="bg-white border border-neutral-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-0.5 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <IconStarFilled key={i} size={14} className="text-gold" />
                    ))}
                  </div>
                  <p className="text-xs italic text-obsidian leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {rev.translation}
                  </p>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <strong className="text-xs text-obsidian block">{rev.author}</strong>
                  <span className="text-[10px] text-neutral-500">
                    {rev.source} • {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
