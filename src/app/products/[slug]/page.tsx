"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ALL_PRODUCTS,
  PRODUCTS,
  BUSINESS_INFO,
  ProductItem,
} from "@/data/siteData";
import { useShop } from "@/context/ShopContext";
import { downloadProductSpecSheetPDF } from "@/lib/export";
import ProductCard from "@/components/ProductCard";
import {
  IconStarFilled,
  IconCheck,
  IconTruck,
  IconShieldCheck,
  IconCalculator,
  IconFileDownload,
  IconLayersLinked,
  IconShoppingBag,
  IconBrandWhatsapp,
  IconHeart,
  IconHeartFilled,
  IconExternalLink,
} from "@tabler/icons-react";

interface PageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const rawSlug = params?.slug ? decodeURIComponent(params.slug) : "";
  const { addSampleToBag, addToQuoteBag, toggleWishlist, wishlist } = useShop();

  const product = useMemo(() => {
    return (
      ALL_PRODUCTS.find((p) => p.slug === rawSlug || p.id === rawSlug) ||
      PRODUCTS.find((p) => p.slug === rawSlug || p.id === rawSlug) ||
      ALL_PRODUCTS[0]
    );
  }, [rawSlug]);

  const isSaved = wishlist.includes(product.id);

  const related = useMemo(() => {
    const list = ALL_PRODUCTS.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.series === product.series)
    );
    return list.slice(0, 4);
  }, [product]);

  const [sqFtInput, setSqFtInput] = useState<number>(120);
  const [includeOverage, setIncludeOverage] = useState<boolean>(true);

  const isTile =
    product.category === "Tiles" ||
    product.category === "Floor Tiles" ||
    product.category === "Wall Tiles" ||
    product.category === "Stair & Parking";

  const sqFtPerBox = product.sqFtPerBox || 14.53;
  const tilesPerBox = product.tilesPerBox || 4;
  const priceRate = product.pricePerSqFt || product.price || 115;

  const requiredSqFt = includeOverage ? sqFtInput * 1.07 : sqFtInput;
  const calculatedBoxes = isTile
    ? Math.max(1, Math.ceil(requiredSqFt / sqFtPerBox))
    : Math.max(1, Math.round(sqFtInput));
  const totalBoxCoverage = Number((calculatedBoxes * sqFtPerBox).toFixed(2));
  const totalOrderPrice = isTile
    ? Number((totalBoxCoverage * priceRate).toFixed(2))
    : Number((calculatedBoxes * priceRate).toFixed(2));

  // Reviews state
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      reviewerName: "মোঃ আব্দুল্লাহ আল নোমান",
      rating: 5,
      title: "অসাধারণ কোয়ালিটি এবং দ্রুত হোম ডেলিভারি!",
      comment: "আমি ব্রাদার্স টাইলস শোরুম থেকে নিয়েছি। ফিনিশ চমৎকার এবং কাটিং ওয়েস্টেজ একদম কম।",
      projectType: "Residential Living, Gazipur",
      date: "October 2026",
    },
    {
      id: "rev-2",
      reviewerName: "Engr. Mahmudul Hasan",
      rating: 5,
      title: "100% Genuine A-Grade RAK Slab",
      comment: "Edges are perfectly rectified. Excellent showroom hospitality at Bhabanipur, Gazipur.",
      projectType: "Duplex Villa, Uttara",
      date: "September 2026",
    },
  ]);

  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;
    setSubmittingReview(true);
    setTimeout(() => {
      setReviews((prev) => [
        {
          id: `rev-${Date.now()}`,
          reviewerName,
          rating,
          title: title || "Verified Customer Review",
          comment,
          projectType: "Gazipur / Dhaka Project",
          date: "Just now",
        },
        ...prev,
      ]);
      setReviewerName("");
      setTitle("");
      setComment("");
      setSubmittingReview(false);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 4000);
    }, 400);
  };

  return (
    <div className="bg-stonebg-light min-h-screen pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-neutral-500 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-obsidian transition">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-obsidian transition">Catalog</Link>
          <span>/</span>
          <Link
            href={`/catalog?category=${encodeURIComponent(product.category)}`}
            className="hover:text-obsidian transition"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-obsidian font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-stonebg-card p-6 border-2 border-gold/50 flex items-center justify-center overflow-hidden">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-obsidian text-gold border border-gold text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-2xs">
                  {product.badge}
                </span>
              )}
              {product.pdfPage && (
                <span className="absolute top-4 left-28 z-10 bg-white/95 text-obsidian border border-obsidian/20 text-[10px] font-bold px-2.5 py-1 uppercase shadow-2xs">
                  Catalog PDF Page {product.pdfPage}
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg border transition shadow-md cursor-pointer ${
                  isSaved
                    ? "bg-obsidian text-gold border-gold"
                    : "bg-white text-neutral-500 border-neutral-300 hover:text-gold"
                }`}
                title="Toggle Wishlist"
              >
                {isSaved ? (
                  <IconHeartFilled size={20} className="text-gold" />
                ) : (
                  <IconHeart size={20} stroke={2} />
                )}
              </button>
              <div className="relative w-full h-full shadow-tile">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => downloadProductSpecSheetPDF(product)}
                className="py-3 px-4 border border-obsidian bg-white hover:bg-obsidian hover:text-gold text-obsidian text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
              >
                <IconFileDownload size={18} className="text-gold-dark" />
                <span>Download PDF Spec Sheet</span>
              </button>

              {product.driveUrl ? (
                <a
                  href={product.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-obsidian text-gold border border-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold hover:text-obsidian transition shadow-2xs"
                >
                  <IconExternalLink size={18} />
                  <span>2000px Master Drive Image ↗</span>
                </a>
              ) : (
                <Link
                  href="/calculator"
                  className="py-3 px-4 bg-stonebg text-obsidian border border-neutral-300 hover:border-obsidian text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <IconCalculator size={18} />
                  <span>Open Tile Calculator</span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Details & Calculator */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gold-dark font-bold uppercase tracking-widest">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.series}</span>
                <span>•</span>
                <span>Code: {product.code}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-obsidian mt-1">
                {product.name}
              </h1>
              <p className="text-sm font-semibold text-neutral-700 mt-0.5">
                {product.nameBn}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1 font-bold text-gold-dark">
                  <IconStarFilled size={15} className="text-gold" />
                  {product.rating ?? 4.9} ({product.reviewCount ?? 48} Showroom Reviews)
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <IconCheck size={16} stroke={3} /> Ready Stock in Bhabanipur Showroom ({product.stockBoxes ?? 120} {isTile ? "Boxes" : "Units"})
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {product.descriptionBn} — {product.description}
            </p>

            {/* Price Box */}
            <div className="p-4 bg-obsidian text-white border-l-4 border-gold flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gold uppercase font-bold tracking-widest block">
                  Showroom Wholesale &amp; Retail Rate
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    ৳ {priceRate.toLocaleString("en-US")}
                  </span>
                  <span className="text-xs text-gold">
                    {isTile ? "/ sq. ft." : "/ unit"}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase block">Dimensions</span>
                <span className="text-xs sm:text-sm font-bold text-gold">
                  {product.sizeCm} ({product.sizeInch})
                </span>
              </div>
            </div>

            {/* Option 1: Sample Swatch */}
            <div className="p-4 bg-white border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-obsidian block">
                  Step 1: Order a Physical Sample Swatch
                </span>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  বাসার আলোতে রঙ ও ফিনিশ পরখ করতে স্যাম্পল অর্ডার করুন অথবা শোরুমে সরাসরি দেখুন।
                </p>
              </div>
              <button
                type="button"
                onClick={() => addSampleToBag(product)}
                className="px-5 py-2.5 bg-stonebg hover:bg-obsidian text-obsidian hover:text-gold border border-obsidian text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 transition cursor-pointer"
              >
                <IconLayersLinked size={16} />
                <span>+ Sample Swatch (৳100)</span>
              </button>
            </div>

            {/* Option 2: Interactive Coverage & Box Calculator */}
            <div className="p-5 bg-white border-2 border-obsidian space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-obsidian">
                  <IconCalculator size={18} className="text-gold-dark" />
                  {isTile ? "Project Sq. Ft. & Box Calculator" : "Quantity Calculator"}
                </span>
                <span className="text-[11px] text-neutral-500">
                  {isTile
                    ? `${sqFtPerBox} sq.ft. / box (${tilesPerBox} pcs)`
                    : "Complete Showroom Unit"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-obsidian mb-1">
                    {isTile
                      ? "Enter Your Area (Sq. Ft. / স্কয়ার ফিট)"
                      : "Enter Quantity (সংখ্যা)"}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={sqFtInput}
                    onChange={(e) => setSqFtInput(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm font-bold border border-neutral-400 bg-stonebg-light focus:outline-none focus:border-gold"
                  />
                </div>

                {isTile && (
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-obsidian cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={includeOverage}
                        onChange={(e) => setIncludeOverage(e.target.checked)}
                        className="w-4 h-4 accent-obsidian cursor-pointer"
                      />
                      <span>Add 7% Cutting &amp; Safety Allowance</span>
                    </label>
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-stonebg-light border border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-neutral-500 block">Recommended Quantity:</span>
                  <span className="text-base font-extrabold text-obsidian">
                    {calculatedBoxes} {isTile ? `Boxes (${totalBoxCoverage} sq.ft.)` : "Units"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 block">Estimated Total:</span>
                  <span className="text-xl font-extrabold text-gold-dark">
                    ৳ {totalOrderPrice.toLocaleString("en-US")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => addToQuoteBag(product, calculatedBoxes)}
                  className="py-3.5 bg-obsidian hover:bg-gold text-gold hover:text-obsidian border border-obsidian font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                >
                  <IconShoppingBag size={18} />
                  <span>Add {calculatedBoxes} {isTile ? "Boxes" : "Units"} to Quote</span>
                </button>
                <a
                  href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `আসসালামু আলাইকুম, আমি ${product.name} (Code: ${product.code}, Size: ${product.sizeCm}) এর ${calculatedBoxes} ${isTile ? "বক্স" : "পিস"} এর পাইকারি দর ও ডেলিভারি তথ্য জানতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 text-center shadow-xs"
                >
                  <IconBrandWhatsapp size={18} />
                  <span>WhatsApp Direct Order</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 pt-1">
              <div className="flex items-center gap-2">
                <IconTruck size={18} className="text-gold-dark shrink-0" />
                <span>ডেলিভারি: {BUSINESS_INFO.homeDeliveryBn}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconShieldCheck size={18} className="text-gold-dark shrink-0" />
                <span>100% A-Grade BSTI &amp; ISO 13006 Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <section className="bg-white border border-neutral-300 p-6 md:p-8">
          <h2 className="text-lg font-serif font-bold uppercase tracking-wider text-obsidian mb-4">
            Technical &amp; Showroom Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              ["Model Code", product.code],
              ["Brand", product.brand],
              ["Collection / Series", product.series],
              ["Category", `${product.category} (${product.subCategory || "Showroom Premium"})`],
              ["Dimensions", `${product.sizeCm} (${product.sizeInch})`],
              ["Surface Finish", product.finish || "Rectified Porcelain"],
              ["Water Absorption", product.waterAbsorption || "<= 0.1% - 0.5% (BSTI Approved)"],
              ["Thickness", product.thickness || "9.5 mm - 10.5 mm"],
              ["Coverage Per Box", `${sqFtPerBox} sq.ft. (${tilesPerBox} pcs/box)`],
              ["RAK Catalog PDF Page", product.pdfPage ? `Page ${product.pdfPage}` : "Showroom Exclusive Display"],
              ["Recommended Spaces", (product.application || ["Living Room", "Bathroom Feature Wall"]).join(", ")],
              ["Showroom Hotline", BUSINESS_INFO.mainPhone],
            ].map(([label, val]) => (
              <div key={label} className="p-3 bg-stonebg-light border border-neutral-200 flex justify-between gap-2">
                <span className="text-neutral-500 font-medium">{label}</span>
                <span className="font-bold text-obsidian text-right">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews & Submit Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl font-serif font-bold text-obsidian">
              Verified Customer Reviews ({reviews.length})
            </h2>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-obsidian">{rev.reviewerName}</span>
                      <span className="px-2 py-0.5 text-[10px] bg-obsidian text-gold font-semibold">
                        Verified Buyer • {rev.projectType}
                      </span>
                    </div>
                    <span className="text-xs text-gold-dark font-bold">
                      {"★".repeat(rev.rating)}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-obsidian">{rev.title}</h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="lg:col-span-5 bg-obsidian text-white p-6 border-2 border-gold space-y-4 h-fit"
          >
            <h3 className="text-base font-serif font-bold text-gold">
              Write a Review / অভিজ্ঞতা শেয়ার করুন
            </h3>
            {reviewSuccess && (
              <div className="p-3 bg-emerald-900/50 border border-emerald-500 text-emerald-200 text-xs">
                ধন্যবাদ! আপনার রিভিউ যুক্ত হয়েছে।
              </div>
            )}
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Your Name (আপনার নাম)</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. মোঃ আশরাফুল ইসলাম"
                className="w-full px-3 py-2 text-xs bg-stonebg-card text-obsidian border border-neutral-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-stonebg-card text-obsidian border border-neutral-500 font-bold"
              >
                <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                <option value={3}>★★★☆☆ (3 Stars - Good)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. চমৎকার মিরর পলিশ এবং মজবুত টাইলস"
                className="w-full px-3 py-2 text-xs bg-stonebg-card text-obsidian border border-neutral-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Feedback / Comment</label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="আপনার প্রজেক্টের অভিজ্ঞতা লিখুন..."
                className="w-full px-3 py-2 text-xs bg-stonebg-card text-obsidian border border-neutral-500 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={submittingReview}
              className="w-full py-2.5 bg-gold hover:bg-gold-light text-obsidian font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </section>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-neutral-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-dark block">
                  Related Collections
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  More Designs from {product.series} &amp; {product.category}
                </h2>
              </div>
              <Link
                href="/catalog"
                className="text-xs font-bold uppercase tracking-wider text-obsidian hover:text-gold-dark transition"
              >
                View Full Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
