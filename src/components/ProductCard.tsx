"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import { IconEye } from "@tabler/icons-react";

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToQuoteBag, addSampleToBag, setSelectedProduct } = useShop();
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

  return (
    <div
      className={`bg-white border border-neutral-200 hover:border-gold transition group flex flex-col justify-between shadow-xs select-none ${className}`}
    >
      <div>
        {/* ==============================================================
            IMAGE CONTAINER (4:3 aspect ratio, badges, wishlist, hover zoom)
           ============================================================== */}
        <div className="relative aspect-[4/3] bg-stonebg-card overflow-hidden">
          <Link href={productHref} className="block relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          {/* Top-Left Badges: Model Code + PDF Page + Promo Badge */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10 pointer-events-none">
            <span className="bg-obsidian/90 text-gold text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider shadow-2xs">
              {product.code}
            </span>
            {product.pdfPage && (
              <span className="bg-white/95 text-obsidian border border-obsidian/20 text-[10px] font-bold px-2 py-0.5 shadow-2xs">
                PDF P.{product.pdfPage}
              </span>
            )}
            {product.badge && (
              <span className="bg-gold text-obsidian text-[10px] font-extrabold uppercase px-2 py-0.5 shadow-2xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Top-Right Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Save to wishlist"
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 flex items-center justify-center border transition cursor-pointer ${
              isSaved
                ? "bg-obsidian text-gold border-gold"
                : "bg-white/90 text-obsidian border-neutral-300 hover:bg-obsidian hover:text-gold"
            }`}
          >
            <span className={`text-sm ${isSaved ? "text-gold" : "text-neutral-500"}`}>
              {isSaved ? "♥" : "♡"}
            </span>
          </button>

          {/* Quick View Floating Action */}
          <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white hover:bg-obsidian text-obsidian hover:text-gold text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 border border-neutral-300 shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <IconEye size={13} stroke={2} />
              <span>QUICK VIEW</span>
            </button>
          </div>
        </div>

        {/* ==============================================================
            CARD INFO SECTION (Series, Size, Titles, Finish, Price & Stock)
           ============================================================== */}
        <div className="p-4 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
            <span className="truncate">{product.series || product.brand}</span>
            <span className="shrink-0 font-bold text-obsidian">{product.sizeCm || product.sizeInch}</span>
          </div>

          <Link
            href={productHref}
            className="block font-serif font-bold text-sm text-obsidian hover:text-gold-dark line-clamp-1 transition-colors"
          >
            {product.name}
          </Link>

          <p className="text-[11px] text-neutral-600 line-clamp-1">{product.nameBn}</p>

          <p className="text-[10px] text-neutral-500 line-clamp-1">
            {product.finish || "Rectified Finish"} {product.tileRole ? `• ${product.tileRole}` : ""}
          </p>

          <div className="pt-2 flex items-baseline justify-between border-t border-neutral-100">
            <div>
              <span className="text-sm font-extrabold text-obsidian">
                ৳ {priceFormatted}
              </span>
              <span className="text-[10px] text-neutral-500 ml-1">
                {isTile ? "/ sq.ft." : "/ unit"}
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold">
              Stock: {stockCount} {isTile ? "Boxes" : "Units"}
            </span>
          </div>
        </div>
      </div>

      {/* ==============================================================
          BOTTOM ACTIONS: [+ SAMPLE (৳100)] & [+ ADD TO QUOTE]
         ============================================================== */}
      <div className="px-4 pb-4 pt-1 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addSampleToBag(product)}
            className="py-2 px-2 bg-stonebg hover:bg-obsidian text-obsidian hover:text-gold border border-obsidian text-[10px] font-bold uppercase tracking-wider transition text-center cursor-pointer active:scale-98"
          >
            + Sample (৳100)
          </button>
          <button
            type="button"
            onClick={() => addToQuoteBag(product, 5)}
            className="py-2 px-2 bg-obsidian hover:bg-gold text-gold hover:text-obsidian border border-obsidian text-[10px] font-bold uppercase tracking-wider transition text-center cursor-pointer active:scale-98"
          >
            + Add to Quote
          </button>
        </div>

        {product.driveUrl && (
          <a
            href={product.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[10px] text-gold-dark hover:underline font-semibold pt-0.5"
          >
            Download 2000px Enhanced Master Image (Drive) ↗
          </a>
        )}
      </div>
    </div>
  );
}
