"use client";

import React, { useState } from "react";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconBrandWhatsapp,
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
  const baseAreaSqFt = lengthFt * widthFt * roomsCount;
  const totalAreaWithWastage = baseAreaSqFt * (1 + wastagePct / 100);
  const totalSqMeter = totalAreaWithWastage / 10.7639;
  const totalTilesNeeded = Math.ceil(totalAreaWithWastage / selectedTile.sqFtPerTile);
  const totalBoxesNeeded = Math.ceil(totalTilesNeeded / selectedTile.tilesPerBox);

  const whatsappEstimateLink = `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
    `আসসালামু আলাইকুম, আমি আপনাদের ওয়েবসাইটের টাইলস ক্যালকুলেটর দিয়ে আমার ঘরের মাপ হিসাব করেছি:\n` +
      `• ঘরের মাপ: ${lengthFt} ft × ${widthFt} ft (${roomsCount} টি রুম/স্পেস)\n` +
      `• মোট এরিয়া (${wastagePct}% ওয়েস্টেজ সহ): ${totalAreaWithWastage.toFixed(1)} sq.ft (${totalSqMeter.toFixed(2)} SQM)\n` +
      `• পছন্দের টাইলস সাইজ: ${selectedTile.label}\n` +
      `• আনুমানিক প্রয়োজন: ${totalTilesNeeded} পিস (${totalBoxesNeeded} বক্স)\n\n` +
      `এই মাপের জন্য পাইকারি/খুচরা মূল্য ও পরামর্শ জানতে চাই।`
  )}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-obsidian text-white border-b-2 border-gold py-10 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold block">
            বাসার মাপ/প্ল্যান অনুযায়ী ফ্রি ডিজাইন ও হিসাব
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Free Tile &amp; Box Calculator (টাইলস ক্যালকুলেটর)
          </h1>
          <p className="text-xs text-neutral-300 mt-1 max-w-2xl">
            একটা সুন্দর ঘর শুধু সুন্দর টাইলস দিয়ে তৈরি হয় না—প্রয়োজন হয় সঠিক পরিকল্পনা ও সঠিক মাপ। আপনার ঘরের দৈর্ঘ্য ও প্রস্থ দিয়ে কত পিস এবং কত বক্স টাইলস লাগবে তা সহজেই হিসাব করুন।
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-7 bg-stonebg-light border border-neutral-200 p-6 sm:p-8 space-y-5">
          <h2 className="text-base font-bold uppercase tracking-wider text-obsidian border-b border-neutral-300 pb-2.5">
            1. Enter Your Room / Wall Dimensions (ঘরের মাপ দিন)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-obsidian mb-1">
                Length (দৈর্ঘ্য - ফুট)
              </label>
              <input
                type="number"
                min={1}
                step={0.5}
                value={lengthFt}
                onChange={(e) => setLengthFt(Math.max(1, Number(e.target.value)))}
                className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-sm font-bold text-obsidian"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-obsidian mb-1">
                Width / Height (প্রস্থ/উচ্চতা - ফুট)
              </label>
              <input
                type="number"
                min={1}
                step={0.5}
                value={widthFt}
                onChange={(e) => setWidthFt(Math.max(1, Number(e.target.value)))}
                className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-sm font-bold text-obsidian"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-obsidian mb-1">
                Number of Rooms / Walls (সংখ্যা)
              </label>
              <input
                type="number"
                min={1}
                value={roomsCount}
                onChange={(e) => setRoomsCount(Math.max(1, Number(e.target.value)))}
                className="w-full border border-neutral-400 bg-white px-3 py-2.5 text-sm font-bold text-obsidian"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-obsidian mb-1.5">
              2. Select RAK / Standard Tile Size (টাইলসের সাইজ নির্বাচন করুন)
            </label>
            <CustomDropdown
              variant="default"
              value={String(selectedSizeIdx)}
              onChange={(val) => setSelectedSizeIdx(Number(val))}
              options={TILE_OPTIONS}
              ariaLabel="Select tile size"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-obsidian mb-1.5">
              3. Cutting &amp; Safety Wastage Allowance (কাটিং ও সেফটি অতিরিক্ত হিসাব)
            </label>
            <div className="flex gap-3">
              {[5, 7, 10].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setWastagePct(pct)}
                  className={`flex-1 py-2 text-xs font-bold border transition ${
                    wastagePct === pct
                      ? "bg-obsidian text-gold border-gold"
                      : "bg-white text-obsidian border-neutral-300"
                  }`}
                >
                  {pct}% Extra {pct === 7 ? "(Recommended)" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Summary Card */}
        <div className="lg:col-span-5 bg-obsidian text-white border-2 border-gold p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              INSTANT TILE ESTIMATE
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              আপনার প্রয়োজনীয় টাইলসের হিসাব
            </h3>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-obsidian-800 border border-gold/30 p-3.5">
                <span className="text-[10px] uppercase text-neutral-400 block">
                  Net Area (মূল এরিয়া)
                </span>
                <strong className="text-lg text-white">
                  {baseAreaSqFt.toFixed(1)} sq.ft
                </strong>
              </div>
              <div className="bg-obsidian-800 border border-gold/30 p-3.5">
                <span className="text-[10px] uppercase text-neutral-400 block">
                  With {wastagePct}% Wastage
                </span>
                <strong className="text-lg text-gold">
                  {totalAreaWithWastage.toFixed(1)} sq.ft
                </strong>
                <span className="block text-[10px] text-neutral-400">
                  ({totalSqMeter.toFixed(2)} SQM)
                </span>
              </div>
              <div className="bg-obsidian-800 border border-gold p-4">
                <span className="text-[10px] uppercase text-gold block">
                  Total Tiles Needed
                </span>
                <strong className="text-2xl text-white">
                  {totalTilesNeeded} Pcs
                </strong>
              </div>
              <div className="bg-gold text-obsidian p-4">
                <span className="text-[10px] uppercase font-bold block">
                  Estimated Boxes
                </span>
                <strong className="text-2xl font-extrabold">
                  {totalBoxesNeeded} Boxes
                </strong>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed pt-2">
              * নোট: ব্র্যান্ড ও সিরিজ ভেদে প্রতি বক্সে পিস সংখ্যা সামান্য ভিন্ন হতে পারে। আপনার বাসার পূর্ণাঙ্গ ফ্লোর প্ল্যান নিয়ে আমাদের শোরুমে আসুন অথবা হোয়াটসঅ্যাপে পাঠান।
            </p>
          </div>

          <div className="space-y-2.5">
            <a
              href={whatsappEstimateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-center text-xs font-bold uppercase tracking-wider py-3.5 transition rounded-none shadow-md"
            >
              <IconBrandWhatsapp size={18} stroke={2} />
              <span>Send Calculation to WhatsApp ({BUSINESS_INFO.mainPhone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
