"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import {
  IconEye,
  IconBrandWhatsapp,
  IconShoppingCart,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToQuoteBag, setSelectedProduct } = useShop();
  const isSaved = wishlist.includes(product.id);

  const isTile =
    product.category === "Tiles" ||
    product.category === "Floor Tiles" ||
    product.category === "Wall Tiles" ||
    product.category === "Stair & Parking";

  const priceNum = product.pricePerSqFt || product.price || 115;
  const priceFormatted = priceNum.toLocaleString("en-US");
  const productHref = `/products/${product.slug || product.id}`;
  const stockCount = product.stockBoxes ?? 120;

  // Clean short title: removes "(Premija Collection)", "(Premium Collection ...)", etc.
  const shortTitle = product.name.replace(/\s*\(.*$/, "").trim() || product.name;

  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200 hover:border-gold shadow-[0_4px_18px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.13)] transition-all duration-300 group flex flex-col justify-between overflow-hidden select-none ${className}`}
    >
      <div>
        {/* ==============================================================
            IMAGE CONTAINER (4:3 aspect ratio, badges, wishlist, hover zoom)
           ============================================================== */}
        <div className="relative aspect-[4/3] bg-stonebg-card overflow-hidden">
          <Link href={productHref} className="block relative w-full h-full">
            <Image
              src={product.image}
              alt={shortTitle}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          {/* Top Header Row inside Image Container (Prevents any overlap between badges and love icon) */}
          <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2.5 sm:left-2.5 sm:right-2.5 flex items-start justify-between gap-1.5 z-10 pointer-events-none">
            {/* Left Badges (Original: Product Code on top, Badge below) */}
            <div className="flex flex-col items-start gap-0.5 sm:gap-1 min-w-0 max-w-[calc(100%-32px)] sm:max-w-[calc(100%-40px)]">
              <span className="bg-obsidian/90 text-gold text-[8px] sm:text-[10px] font-bold uppercase px-1.5 sm:px-2 py-0.5 tracking-normal sm:tracking-wider shadow-2xs truncate max-w-full">
                {product.code}
              </span>
              {product.badge && (
                <span className="bg-gold text-obsidian text-[8px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 tracking-normal sm:tracking-wider shadow-2xs truncate max-w-full">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Right Wishlist Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              aria-label="Save to wishlist"
              className={`pointer-events-auto shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition cursor-pointer shadow-2xs ${
                isSaved
                  ? "bg-obsidian text-gold border border-gold"
                  : "bg-white/95 text-obsidian border border-neutral-200/90 hover:text-gold hover:bg-white"
              }`}
            >
              {isSaved ? (
                <IconHeartFilled className="w-4 h-4 sm:w-4 sm:h-4 text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:drop-shadow-none" />
              ) : (
                <IconHeart className="w-4 h-4 sm:w-4 sm:h-4 text-obsidian sm:text-neutral-600 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] sm:drop-shadow-none" stroke={1.8} />
              )}
            </button>
          </div>

          {/* Quick View Floating Action */}
          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white hover:bg-obsidian text-obsidian hover:text-gold text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg border border-neutral-300 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <IconEye size={13} stroke={2} />
              <span>QUICK VIEW</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            CARD INFO SECTION (Series, Size, Clean Title, Price & Stock)
           ============================================================== */}
        <div className="p-2 sm:p-4 space-y-1 sm:space-y-1.5 min-w-0">
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] text-neutral-500 uppercase tracking-normal sm:tracking-wider font-semibold">
            <span className="truncate">{product.series || product.brand}</span>
            <span className="shrink-0 font-bold text-obsidian ml-1">{product.sizeCm || product.sizeInch}</span>
          </div>

          <Link
            href={productHref}
            title={product.name}
            className="block font-serif font-bold text-[11px] sm:text-sm leading-snug sm:leading-normal text-obsidian hover:text-gold-dark truncate transition-colors"
          >
            {shortTitle}
          </Link>

          <div className="pt-1.5 sm:pt-2 flex items-baseline justify-between border-t border-neutral-100">
            <div>
              <span className="text-[11px] sm:text-sm font-extrabold text-obsidian">
                ৳ {priceFormatted}
              </span>
              <span className="text-[8px] sm:text-[10px] text-neutral-500 ml-0.5 sm:ml-1">
                {isTile ? "/ sq.ft." : "/ unit"}
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] text-emerald-700 font-bold truncate ml-1">
              Stock: {stockCount} {isTile ? "Boxes" : "Units"}
            </span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          BOTTOM ACTIONS: [ADD TO CART] (Left) & [WHATSAPP] (Right)
         ============================================================== */}
      <div className="px-1.5 sm:px-4 pb-2 sm:pb-4 pt-0.5 sm:pt-1">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Add to Cart Button with Modern Border Radius */}
          <button
            type="button"
            onClick={() => addToQuoteBag(product, 5)}
            className="flex-1 min-w-0 py-1.5 sm:py-2 px-1 sm:px-2.5 bg-obsidian hover:bg-gold text-gold hover:text-obsidian border border-obsidian text-[8.5px] xs:text-[9.5px] sm:text-[11px] font-bold uppercase tracking-tight sm:tracking-wider rounded-xl transition text-center cursor-pointer active:scale-98 flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs whitespace-nowrap overflow-hidden"
            title="Add to Cart"
          >
            <IconShoppingCart size={13} className="sm:w-[15px] sm:h-[15px] shrink-0" stroke={2} />
            <span className="truncate">ADD TO CART</span>
          </button>

          {/* WhatsApp Direct Contact on the right - Modern Tabler Icon without box */}
          <a
            href={`https://wa.me/8801625073614?text=${encodeURIComponent(
              `আসসালামু আলাইকুম, আমি ${shortTitle} (Code: ${product.code}, Size: ${product.sizeCm || product.sizeInch || ""}) সম্পর্কে জানতে চাই। এটি কি স্টকে আছে?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp contact for ${shortTitle}`}
            className="shrink-0 flex items-center justify-center text-[#25D366] hover:text-[#1ea952] transition-transform duration-200 hover:scale-115 active:scale-95 cursor-pointer p-0.5 sm:p-1"
            title="Chat on WhatsApp"
          >
            <IconBrandWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" stroke={2.2} />
          </a>
        </div>
      </div>
    </div>
  );
}
