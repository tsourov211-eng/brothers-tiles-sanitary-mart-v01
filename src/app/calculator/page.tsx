"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconBrandWhatsapp,
  IconCalculator,
  IconRulerMeasure,
  IconInfoCircle,
  IconSparkles,
} from "@tabler/icons-react";
import CustomDropdown, { DropdownOption } from "@/components/CustomDropdown";

const TILE_SIZES = [
  { label: "60x60 cm (24x24 inch) — Standard Floor", sqFtPerTile: 3.875, tilesPerBox: 4 },
  { label: "60x120 cm (24x48 inch) — Grand Slab", sqFtPerTile: 7.75, tilesPerBox: 2 },
  { label: "80x80 cm (32x32 inch) — Large Floor", sqFtPerTile: 6.89, tilesPerBox: 3 },
  { label: "30x60 cm (12x24 inch) — Wall & Floor", sqFtPerTile: 1.9375, tilesPerBox: 8 },
  { label: "30x90 cm (12x36 inch) — Premija Wall", sqFtPerTile: 2.906, tilesPerBox: 5 },
  { label: "25x70 cm (10x28 inch) — Premium Wall", sqFtPerTile: 1.884, tilesPerBox: 8 },
  { label: "25x40 cm (10x16 inch) — Kitchen/Bath Wall", sqFtPerTile: 1.076, tilesPerBox: 12 },
  { label: "40x40 cm (16x16 inch) — Parking/Outdoor", sqFtPerTile: 1.722, tilesPerBox: 6 },
  { label: "30x30 cm (12x12 inch) — Parking/Step", sqFtPerTile: 0.968, tilesPerBox: 11 },
];

const TILE_OPTIONS: DropdownOption[] = TILE_SIZES.map((t, idx) => ({
  value: String(idx),
  label: t.label,
  subLabel: `~${t.tilesPerBox} pcs/box (${(t.sqFtPerTile * t.tilesPerBox).toFixed(2)} sq. ft./box)`,
}));

export default function CalculatorPage() {
  const [lengthFt, setLengthFt] = useState<number>(15);
  const [widthFt, setWidthFt] = useState<number>(12);
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState<number>(0);
  const [wastagePct, setWastagePct] = useState<number>(7);

  const selectedTile = TILE_SIZES[selectedSizeIdx];
  const safeLength = lengthFt > 0 ? lengthFt : 0;
  const safeWidth = widthFt > 0 ? widthFt : 0;
  const safeRooms = roomsCount > 0 ? roomsCount : 1;

  const baseAreaSqFt = safeLength * safeWidth * safeRooms;
  const totalAreaWithWastage = baseAreaSqFt * (1 + wastagePct / 100);
  const totalSqMeter = totalAreaWithWastage / 10.7639;
  const totalTilesNeeded = Math.ceil(totalAreaWithWastage / selectedTile.sqFtPerTile);
  const totalBoxesNeeded = Math.ceil(totalTilesNeeded / selectedTile.tilesPerBox);

  const whatsappEstimateLink = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইটের টাইলস ক্যালকুলেটর দিয়ে আমার ঘরের মাপ হিসাব করেছি:\n` +
      `• ঘরের মাপ: ${safeLength} ft × ${safeWidth} ft (${safeRooms} টি রুম/স্পেস)\n` +
      `• মোট এরিয়া (${wastagePct}% ওয়েস্টেজ সহ): ${totalAreaWithWastage.toFixed(1)} sq.ft (${totalSqMeter.toFixed(2)} SQM)\n` +
      `• পছন্দের টাইলস সাইজ: ${selectedTile.label}\n` +
      `• আনুমানিক প্রয়োজন: ${totalTilesNeeded} পিস (${totalBoxesNeeded} বক্স)\n\n` +
      `এই মাপের জন্য পাইকারি/খুচরা মূল্য ও পরামর্শ জানতে চাই।`
  )}`;

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian to-obsidian-800 text-white border-b-2 border-gold py-10 px-4 sm:px-8 shadow-sm">
        <div className="max-w-[1240px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 mb-2">
            <IconSparkles size={13} className="text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              বাসার মাপ/প্ল্যান অনুযায়ী ফ্রি ডিজাইন ও নিখুঁত হিসাব
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mt-1 flex items-center gap-3">
            <span className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 hidden sm:inline-flex">
              <IconCalculator size={26} stroke={1.8} />
            </span>
            <span>
              Free Tile &amp; Box Calculator{" "}
              <span className="text-gold-light text-xl sm:text-2xl font-sans font-normal">
                (টাইলস ক্যালকুলেটর)
              </span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
            একটা সুন্দর ঘর শুধু সুন্দর টাইলস দিয়ে তৈরি হয় না—প্রয়োজন হয় সঠিক পরিকল্পনা ও সঠিক মাপ। আপনার ঘরের দৈর্ঘ্য ও প্রস্থ দিয়ে কত পিস এবং কত বক্স টাইলস লাগবে তা সহজেই হিসাব করুন।
          </p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.07)] p-5 sm:p-7 space-y-6 relative overflow-hidden">
          {/* Subtle gold accent top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

          {/* Section 1: Dimensions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-200/80">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gold/15 text-gold-dark font-black text-xs border border-gold/30">
                1
              </span>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-obsidian flex items-center gap-1.5 flex-wrap">
                <span>Enter Your Room / Wall Dimensions</span>
                <span className="text-xs text-neutral-500 font-normal font-sans tracking-normal">
                  (ঘরের মাপ দিন)
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Length */}
              <div className="bg-[#FAF9F5] hover:bg-[#F5F3EC] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl p-3 transition-all duration-200">
                <label
                  className="block text-[11px] xl:text-xs font-bold text-obsidian mb-1.5 whitespace-nowrap"
                  title="Length (দৈর্ঘ্য - ফুট)"
                >
                  Length <span className="font-normal text-neutral-500">(দৈর্ঘ্য - ফুট)</span>
                </label>
                <div className="relative flex items-center bg-white border border-neutral-200 rounded-lg px-3 py-1.5 focus-within:border-gold shadow-2xs">
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={lengthFt === 0 ? "" : lengthFt}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setLengthFt(isNaN(val) ? 0 : val);
                    }}
                    className="w-full text-base sm:text-lg font-bold text-obsidian bg-transparent focus:outline-none"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded select-none">
                    ft
                  </span>
                </div>
              </div>

              {/* Width / Height */}
              <div className="bg-[#FAF9F5] hover:bg-[#F5F3EC] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl p-3 transition-all duration-200">
                <label
                  className="block text-[11px] xl:text-xs font-bold text-obsidian mb-1.5 whitespace-nowrap"
                  title="Width / Height (প্রস্থ/উচ্চতা - ফুট)"
                >
                  Width / Height <span className="font-normal text-neutral-500">(প্রস্থ/উচ্চতা - ফুট)</span>
                </label>
                <div className="relative flex items-center bg-white border border-neutral-200 rounded-lg px-3 py-1.5 focus-within:border-gold shadow-2xs">
                  <input
                    type="number"
                    min={1}
                    step={0.5}
                    value={widthFt === 0 ? "" : widthFt}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setWidthFt(isNaN(val) ? 0 : val);
                    }}
                    className="w-full text-base sm:text-lg font-bold text-obsidian bg-transparent focus:outline-none"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded select-none">
                    ft
                  </span>
                </div>
              </div>

              {/* Number of Rooms / Walls */}
              <div className="bg-[#FAF9F5] hover:bg-[#F5F3EC] border border-neutral-200/90 hover:border-gold/60 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 rounded-xl p-3 transition-all duration-200">
                <label
                  className="block text-[11px] xl:text-xs font-bold text-obsidian mb-1.5 whitespace-nowrap"
                  title="Number of Rooms / Walls (সংখ্যা)"
                >
                  Number of Rooms / Walls <span className="font-normal text-neutral-500">(সংখ্যা)</span>
                </label>
                <div className="relative flex items-center bg-white border border-neutral-200 rounded-lg px-3 py-1.5 focus-within:border-gold shadow-2xs">
                  <input
                    type="number"
                    min={1}
                    value={roomsCount === 0 ? "" : roomsCount}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setRoomsCount(isNaN(val) ? 0 : Math.max(1, val));
                    }}
                    className="w-full text-base sm:text-lg font-bold text-obsidian bg-transparent focus:outline-none"
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded select-none">
                    qty
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Tile Size */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-200/80">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gold/15 text-gold-dark font-black text-xs border border-gold/30">
                2
              </span>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-obsidian flex items-center gap-1.5 flex-wrap">
                <span>Select RAK / Standard Tile Size</span>
                <span className="text-xs text-neutral-500 font-normal font-sans tracking-normal">
                  (টাইলসের সাইজ নির্বাচন করুন)
                </span>
              </h2>
            </div>
            <CustomDropdown
              variant="default"
              value={String(selectedSizeIdx)}
              onChange={(val) => setSelectedSizeIdx(Number(val))}
              options={TILE_OPTIONS}
              ariaLabel="Select tile size"
            />
            {/* Tile Info Card */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-neutral-700 bg-[#FAF9F5] px-3.5 py-2.5 rounded-xl border border-neutral-200/80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                <span>
                  বক্স কাভারেজ:{" "}
                  <strong className="text-obsidian font-bold">
                    {(selectedTile.sqFtPerTile * selectedTile.tilesPerBox).toFixed(2)} sq.ft
                  </strong>{" "}
                  (~{selectedTile.tilesPerBox} pcs/box)
                </span>
              </span>
              <span className="text-[11px] font-bold text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                ১ পিস টাইলস = {selectedTile.sqFtPerTile.toFixed(2)} sq.ft
              </span>
            </div>
          </div>

          {/* Section 3: Wastage */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2.5 pb-2.5 border-b border-neutral-200/80">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gold/15 text-gold-dark font-black text-xs border border-gold/30">
                3
              </span>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-obsidian flex items-center gap-1.5 flex-wrap">
                <span>Cutting &amp; Safety Wastage Allowance</span>
                <span className="text-xs text-neutral-500 font-normal font-sans tracking-normal">
                  (কাটিং ও সেফটি অতিরিক্ত হিসাব)
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              {[5, 7, 10].map((pct) => {
                const isSelected = wastagePct === pct;
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setWastagePct(pct)}
                    className={`relative py-3 px-2 sm:px-3 text-center rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-obsidian text-gold border-gold shadow-md ring-2 ring-gold/25"
                        : "bg-white hover:bg-neutral-50 text-obsidian border-neutral-200 hover:border-gold/50 shadow-2xs"
                    }`}
                  >
                    <div className="text-sm sm:text-base font-extrabold tracking-tight">
                      {pct}% Extra
                    </div>
                    <div
                      className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${
                        isSelected ? "text-gold-light" : "text-neutral-500"
                      }`}
                    >
                      {pct === 7 ? "Recommended" : pct === 5 ? "Minimum" : "Complex Cut"}
                    </div>
                    {pct === 7 && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gold text-obsidian text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                        জনপ্রিয়
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#181818] via-[#111111] to-[#0A0A0A] text-white rounded-2xl border-2 border-gold p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_25px_rgba(212,175,55,0.12)] relative overflow-hidden lg:sticky lg:top-28">
          {/* Subtle gold gradient blur effect */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-gold/15 rounded-full blur-3xl"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                INSTANT TILE ESTIMATE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              আপনার প্রয়োজনীয় টাইলসের হিসাব
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Net Area */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 hover:border-gold/30 transition">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Net Area (মূল এরিয়া)
                </span>
                <strong className="text-lg sm:text-xl text-white font-extrabold">
                  {baseAreaSqFt.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-neutral-300">sq.ft</span>
                </strong>
              </div>

              {/* With Wastage */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-gold/30 rounded-xl p-3.5 hover:border-gold/50 transition">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                  With {wastagePct}% Wastage
                </span>
                <strong className="text-lg sm:text-xl text-gold font-extrabold">
                  {totalAreaWithWastage.toFixed(1)}{" "}
                  <span className="text-xs font-normal text-gold/80">sq.ft</span>
                </strong>
                <span className="block text-[10px] text-neutral-400 mt-0.5">
                  ({totalSqMeter.toFixed(2)} SQM)
                </span>
              </div>

              {/* Total Tiles Needed */}
              <div className="bg-obsidian-800/90 rounded-xl border border-gold/40 p-4 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-gold block mb-1">
                  Total Tiles Needed
                </span>
                <strong className="text-2xl sm:text-3xl text-white font-black">
                  {totalTilesNeeded}{" "}
                  <span className="text-sm font-semibold text-gold">Pcs</span>
                </strong>
              </div>

              {/* Estimated Boxes */}
              <div className="bg-gradient-to-br from-gold via-gold-light to-gold-dark text-obsidian rounded-xl p-4 shadow-lg shadow-gold/20 ring-1 ring-gold-light/60">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-obsidian/80 block mb-1">
                  Estimated Boxes
                </span>
                <strong className="text-2xl sm:text-3xl font-black text-obsidian">
                  {totalBoxesNeeded}{" "}
                  <span className="text-sm font-extrabold text-obsidian/90">Boxes</span>
                </strong>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white/[0.04] border border-white/5 rounded-xl p-3 text-neutral-300 leading-relaxed pt-2.5">
              <IconInfoCircle size={18} className="text-gold shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                * নোট: ব্র্যান্ড ও সিরিজ ভেদে প্রতি বক্সে পিস সংখ্যা সামান্য ভিন্ন হতে পারে। আপনার বাসার পূর্ণাঙ্গ ফ্লোর প্ল্যান নিয়ে আমাদের শোরুমে আসুন অথবা সরাসরি হোয়াটসঅ্যাপে পাঠান।
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 relative z-10">
            <a
              href={whatsappEstimateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-center text-xs sm:text-sm font-bold uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all duration-300 active:scale-[0.99]"
            >
              <IconBrandWhatsapp
                size={20}
                stroke={2.2}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Send Calculation to WhatsApp</span>
            </a>
            <p className="text-center text-[10px] text-neutral-400">
              Direct hotline: {BUSINESS_INFO.mainPhone} • ফ্রি কোটেশন ও সাপোর্ট
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

