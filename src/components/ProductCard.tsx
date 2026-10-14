"use client";

import React from "react";
import Image from "next/image";
import { ProductItem } from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import {
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconPlus,
  IconStarFilled,
  IconShoppingBagPlus,
} from "@tabler/icons-react";

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToQuoteBag, setSelectedProduct } = useShop();
  const isSaved = wishlist.includes(product.id);

  // Price formatting: Bangladeshi Taka sign (৳) with appropriate unit (sq. ft. for tiles, Piece for sanitary/accessories)
  const priceDisplay = product.price
    ? `৳${product.price.toLocaleString("en-US")}`
    : product.category === "Tiles"
    ? "৳১২৫"
    : "৳৮,৫০০";

  const unitDisplay =
    product.priceUnit || (product.category === "Tiles" ? "sq. ft." : "Piece");

  const ratingValue = product.rating ?? 4.9;
  const reviewCount = product.reviewCount ?? 48;
  const favoriteCount = product.favoriteCount ?? (isSaved ? 1875 : 1874);

  // Color Swatch palette dots (like Tilebar's swatches)
  const swatches =
    product.swatchColors && product.swatchColors.length > 0
      ? product.swatchColors
      : ["#D8C4B6", "#4F4A45", "#9E5B40"];

  return (
    <div className={`group flex flex-col justify-between bg-white select-none ${className}`}>
      <div>
        {/* ==============================================================
            IMAGE CONTAINER (Quick View on Hover + Wishlist Count + Badge)
           ============================================================== */}
        <div className="relative aspect-square w-full bg-[#F7F6F3] overflow-hidden border border-neutral-200 group-hover:border-neutral-300 transition">
          {/* Top-Left Badge (e.g. TOP SELLER, NEW ARRIVAL) */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 bg-white/95 text-obsidian border border-neutral-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-2xs">
              {product.badge}
            </span>
          )}

          {/* Top-Right Wishlist Pill (Heart + Count like Tilebar) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Save to Wishlist"
            className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-white/90 hover:bg-white text-obsidian border border-neutral-200/90 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold transition shadow-2xs cursor-pointer"
          >
            {isSaved ? (
              <IconHeartFilled size={12} className="text-red-600" />
            ) : (
              <IconHeart size={12} stroke={2} className="text-neutral-500" />
            )}
            <span className="text-[9px] font-mono text-neutral-600">{favoriteCount}</span>
          </button>

          {/* Product Image */}
          <div
            onClick={() => setSelectedProduct(product)}
            className="relative w-full h-full cursor-pointer"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
          </div>

          {/* Hover Floating Action: QUICK VIEW Button */}
          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white hover:bg-obsidian text-obsidian hover:text-gold text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3.5 py-2 border border-neutral-300 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <IconEye size={14} stroke={2} />
              <span>QUICK VIEW</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            SWATCH ROW & + ADD SAMPLE / QUOTE BUTTON (Under image)
           ============================================================== */}
        <div className="pt-2 pb-1 flex items-center justify-between gap-1.5">
          {/* Color swatch circles + plus icon */}
          <div className="flex items-center gap-1">
            {swatches.slice(0, 4).map((hex, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-neutral-300 shrink-0 cursor-pointer shadow-2xs hover:scale-115 transition-transform"
                style={{ backgroundColor: hex }}
                title={`Shade ${i + 1}`}
              />
            ))}
            <span
              onClick={() => setSelectedProduct(product)}
              className="text-[10px] text-neutral-400 font-bold ml-0.5 cursor-pointer hover:text-obsidian flex items-center"
              title="More options"
            >
              <IconPlus size={10} stroke={3} />
            </span>
          </div>

          {/* + ADD SAMPLE Button (Desktop view: aligned next to swatches) */}
          <button
            type="button"
            onClick={() => addToQuoteBag(product, 5)}
            className="hidden sm:inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-neutral-700 hover:text-obsidian bg-[#ECE9E2] hover:bg-gold px-2 py-0.5 border border-neutral-300/70 transition cursor-pointer"
          >
            <IconPlus size={10} stroke={2.5} />
            <span>ADD SAMPLE</span>
          </button>
        </div>

        {/* ==============================================================
            SERIES & PRODUCT NAME (Tilebar Typography)
           ============================================================== */}
        <div className="pt-0.5 space-y-0.5">
          {/* Series / Collection Name (Uppercase bold like 'PARMA', 'PORTMORE') */}
          <p
            onClick={() => setSelectedProduct(product)}
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-obsidian hover:text-gold-dark cursor-pointer truncate"
          >
            {product.series || product.brand}
          </p>

          {/* Full Tile/Sanitary Name */}
          <p
            onClick={() => setSelectedProduct(product)}
            className="text-[11px] text-neutral-600 line-clamp-1 hover:text-obsidian cursor-pointer"
            title={product.name}
          >
            {product.name}
          </p>
        </div>
      </div>

      {/* ==============================================================
          BOTTOM ROW: ৳ PRICE (sq. ft. / Piece) & ★ RATING
         ============================================================== */}
      <div>
        <div className="pt-2 mt-1.5 border-t border-neutral-100 flex items-center justify-between">
          {/* Taka Price with dynamic unit (sq. ft. or Piece) */}
          <div className="flex items-baseline">
            <span className="text-xs sm:text-sm font-extrabold text-obsidian tracking-tight">
              {priceDisplay}
            </span>
            <span className="text-[10px] sm:text-[11px] font-normal text-neutral-500 ml-1">
              {unitDisplay}
            </span>
          </div>

          {/* Rating & Review Count (★ 4.9 (381)) */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
            <IconStarFilled size={12} className="text-amber-500" />
            <span>{ratingValue.toFixed(1)}</span>
            <span className="text-neutral-400 font-normal">({reviewCount})</span>
          </div>
        </div>

        {/* ==============================================================
            MOBILE ONLY: + ADD SAMPLE BUTTON (Placed below Price & Rating row)
           ============================================================== */}
        <div className="pt-2 sm:hidden">
          <button
            type="button"
            onClick={() => addToQuoteBag(product, 5)}
            className="w-full text-center text-[10px] font-bold tracking-wider uppercase text-neutral-800 hover:text-obsidian bg-[#ECE9E2] hover:bg-gold py-1.5 border border-neutral-300 transition cursor-pointer active:scale-98 shadow-2xs flex items-center justify-center gap-1.5"
          >
            <IconShoppingBagPlus size={13} stroke={2} />
            <span>ADD SAMPLE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
