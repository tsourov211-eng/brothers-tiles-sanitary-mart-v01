"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { BUSINESS_INFO } from "@/data/siteData";
import {
  IconBrandWhatsapp,
  IconShoppingBag,
  IconX,
  IconPlus,
  IconMinus,
  IconTrash,
  IconStarFilled,
  IconCalculator,
  IconSend,
} from "@tabler/icons-react";

export default function QuoteDrawer() {
  const pathname = usePathname();
  const {
    quoteBag,
    removeFromQuoteBag,
    updateQuoteQty,
    clearQuoteBag,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedProduct,
    setSelectedProduct,
    addToQuoteBag,
  } = useShop();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const buildWhatsAppOrderLink = () => {
    const lines = [
      `আসসালামু আলাইকুম, আমি ${BUSINESS_INFO.nameEn}-থেকে নিচের পণ্যগুলোর পাইকারি/খুচরা দর ও স্টক জানতে চাই:`,
      "",
      ...quoteBag.map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.product.code}) - Size: ${item.product.sizeCm} - Qty: ${item.quantityBoxes} Boxes/Units`
      ),
      "",
      "ডেলিভারি ঠিকানা: ",
    ];
    return `${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <>
      {/* Exact Right-Edge Sticky Floating Action Buttons (Desktop only, hidden on mobile) */}
      <div className="hidden sm:flex fixed right-3 top-1/3 z-30 flex-col gap-2.5">
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Showroom (+880 1625-073614)"
          className="w-10 h-10 rounded-full bg-obsidian border-2 border-gold text-gold hover:bg-gold hover:text-obsidian shadow-lg flex items-center justify-center transition cursor-pointer"
        >
          <IconBrandWhatsapp size={22} stroke={2} />
        </a>
        <button
          onClick={() => setIsDrawerOpen(true)}
          title="Open Cart & Order Bag"
          className="w-10 h-10 rounded-full bg-obsidian border-2 border-gold text-white hover:bg-gold hover:text-obsidian shadow-lg flex items-center justify-center transition relative cursor-pointer"
        >
          <IconShoppingBag size={20} stroke={1.8} />
          {quoteBag.length > 0 && (
            <span className="absolute -top-1 -left-1 bg-gold text-obsidian text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {quoteBag.length}
            </span>
          )}
        </button>
      </div>

      {/* Slide-Over Cart & Order Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full max-h-[100dvh] flex flex-col shadow-2xl border-l-2 border-gold overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header (Fixed at top) */}
            <div className="shrink-0 bg-obsidian text-white px-5 py-4 flex items-center justify-between border-b border-gold/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 border border-gold/40 p-1 flex items-center justify-center shrink-0">
                  <Image
                    src="/images/logo/Brothers-emblem.png"
                    alt="Brothers Logo Emblem"
                    width={36}
                    height={36}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-gold leading-tight">
                    Shopping Cart &amp; Order Bag
                  </h3>
                  <p className="text-[11px] text-neutral-300">
                    পণ্য অর্ডার ও পাইকারি/খুচরা দর জানতে হোয়াটসঅ্যাপে পাঠান
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="text-neutral-300 hover:text-gold cursor-pointer p-1 transition"
                aria-label="Close quote drawer"
              >
                <IconX size={20} stroke={2} />
              </button>
            </div>

            {/* Scrollable Items List (Scrolls independently in the middle) */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-3.5 overscroll-contain">
              {quoteBag.length === 0 ? (
                <div className="text-center py-14 space-y-3">
                  <p className="text-sm text-neutral-600">
                    আপনার কোটেশন তালিকায় এখনো কোনো টাইলস বা স্যানিটারি পণ্য যোগ করা হয়নি।
                  </p>
                  <Link
                    href="/catalog"
                    onClick={() => setIsDrawerOpen(false)}
                    className="inline-block bg-obsidian text-gold border border-gold text-xs font-bold uppercase tracking-wider px-5 py-2.5"
                  >
                    Browse 5,000+ Designs
                  </Link>
                </div>
              ) : (
                quoteBag.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 border border-neutral-200 p-3 bg-stonebg-light"
                  >
                    <div className="relative w-20 h-20 bg-white border border-neutral-200 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-obsidian truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-600">
                        Code: {item.product.code} • {item.product.sizeCm}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-300 bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuoteQty(item.product.id, item.quantityBoxes - 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                          >
                            <IconMinus size={12} stroke={2.5} />
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-semibold">
                            {item.quantityBoxes} Box/Pcs
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuoteQty(item.product.id, item.quantityBoxes + 1)}
                            className="px-2 py-0.5 text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                          >
                            <IconPlus size={12} stroke={2.5} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromQuoteBag(item.product.id)}
                          className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                        >
                          <IconTrash size={12} stroke={2} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pinned Drawer Footer (Always visible at the bottom) */}
            {quoteBag.length > 0 && (
              <div className="shrink-0 p-4 sm:p-5 border-t border-neutral-200 bg-stonebg-light shadow-[0_-4px_16px_rgba(0,0,0,0.08)] space-y-2.5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <a
                  href={buildWhatsAppOrderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-obsidian hover:bg-gold text-gold hover:text-obsidian border border-gold text-center text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-4 shadow-sm transition cursor-pointer active:scale-98"
                >
                  <IconBrandWhatsapp size={19} stroke={2} />
                  <span>Send Order via WhatsApp</span>
                </a>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-neutral-500 font-medium">
                    Total: {quoteBag.reduce((acc, i) => acc + i.quantityBoxes, 0)} Box/Pcs ({quoteBag.length} items)
                  </span>
                  <button
                    type="button"
                    onClick={clearQuoteBag}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer py-1"
                  >
                    <IconTrash size={13} stroke={1.8} />
                    <span>Clear List</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white max-w-3xl w-full border-2 border-gold shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square bg-stonebg-card p-6 flex items-center justify-center">
              <div className="relative w-full h-full shadow-tile">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-obsidian text-gold text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase border border-gold">
                  {selectedProduct.badge}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark">
                    {selectedProduct.brand} • {selectedProduct.series}
                  </span>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-neutral-500 hover:text-obsidian p-1 rounded hover:bg-neutral-100 transition cursor-pointer"
                    aria-label="Close modal"
                  >
                    <IconX size={20} stroke={2} />
                  </button>
                </div>
                <h3 className="font-serif font-bold text-xl text-obsidian">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs font-semibold text-neutral-700">
                  {selectedProduct.nameBn}
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                  {selectedProduct.descriptionBn}
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  {selectedProduct.description}
                </p>
                {/* Price & Rating Row */}
                <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold text-obsidian tracking-tight">
                      ৳{(selectedProduct.price ?? (selectedProduct.category === "Tiles" ? 145 : 8500)).toLocaleString("en-US")}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {selectedProduct.priceUnit || (selectedProduct.category === "Tiles" ? "sq. ft." : "Piece")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-neutral-800">
                    <IconStarFilled size={13} className="text-amber-500" />
                    <span>{(selectedProduct.rating ?? 4.9).toFixed(1)}</span>
                    <span className="text-neutral-400 font-normal">
                      ({selectedProduct.reviewCount ?? 48} reviews)
                    </span>
                  </div>
                </div>

                {/* Color Swatches if available */}
                {selectedProduct.swatchColors && selectedProduct.swatchColors.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                      Available Shades:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {selectedProduct.swatchColors.map((hex, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-neutral-300 shadow-2xs"
                          style={{ backgroundColor: hex }}
                          title={`Color variant ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-b border-neutral-200 py-3 my-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Model Code</span>
                    <strong className="text-obsidian">{selectedProduct.code}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Dimensions</span>
                    <strong className="text-obsidian">
                      {selectedProduct.sizeCm} ({selectedProduct.sizeInch})
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Surface Finish</span>
                    <strong className="text-obsidian">{selectedProduct.finish}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">Category</span>
                    <strong className="text-obsidian">{selectedProduct.subCategory}</strong>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block mb-1">
                    Recommended Applications
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.application.map((app) => (
                      <span
                        key={app}
                        className="text-[10px] bg-stonebg px-2 py-0.5 text-obsidian font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    addToQuoteBag(selectedProduct, 5);
                    setSelectedProduct(null);
                    setIsDrawerOpen(true);
                  }}
                  className="w-full bg-gold hover:bg-gold-dark text-obsidian font-bold text-xs uppercase tracking-widest py-3 transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <IconShoppingBag size={17} stroke={2} />
                  <span>+ Add to Cart</span>
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                      `আসসালামু আলাইকুম, আমি ${selectedProduct.name} (Code: ${selectedProduct.code}, Size: ${selectedProduct.sizeCm}) এর পাইকারি/খুচরা মূল্য জানতে চাই।`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-obsidian text-gold border border-gold hover:bg-gold hover:text-obsidian text-center text-xs font-bold uppercase tracking-wider py-2.5 transition flex items-center justify-center gap-1.5"
                  >
                    <IconBrandWhatsapp size={16} stroke={2} />
                    <span>WhatsApp Price</span>
                  </a>
                  <Link
                    href="/calculator"
                    onClick={() => setSelectedProduct(null)}
                    className="border border-obsidian text-obsidian hover:bg-obsidian hover:text-white text-center text-xs font-bold uppercase tracking-wider py-2.5 transition flex items-center justify-center gap-1.5"
                  >
                    <IconCalculator size={16} stroke={1.8} />
                    <span>Calculate Area</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
