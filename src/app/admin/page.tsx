"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { ProductItem, BUSINESS_INFO, ProductCategory, SHOWROOM_CATEGORIES } from "@/data/siteData";
import { OrderRecord, OrderStatus, InvoiceRecord, PaymentMethod } from "@/types/management";
import {
  IconLayoutDashboard,
  IconShoppingCartPlus,
  IconUsers,
  IconShoppingBag,
  IconBox,
  IconSquarePlus,
  IconDiscount2,
  IconFlame,
  IconStar,
  IconStack2,
  IconCreditCard,
  IconFileInvoice,
  IconExternalLink,
  IconLogout,
  IconMenu2,
  IconPrinter,
  IconBrandWhatsapp,
  IconTrash,
  IconEdit,
  IconSearch,
  IconPlus,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconCoins,
  IconClock,
  IconTrendingUp,
  IconLock,
  IconBolt,
  IconArrowLeft,
  IconSparkles,
  IconRefresh,
  IconPhoto,
  IconRulerMeasure,
  IconTag,
  IconDeviceDesktop,
  IconShieldCheck,
  IconEye,
  IconHeartFilled,
  IconStarFilled,
  IconChevronRight,
  IconChevronDown,
  IconLayoutGrid,
} from "@tabler/icons-react";
import CustomDropdown, { DropdownOption } from "@/components/CustomDropdown";

const ADMIN_CATEGORY_FILTER_OPTIONS: DropdownOption[] = [
  { value: "All", label: "All Categories (সবগুলো)" },
  { value: "Floor Tiles", label: "Floor Tiles", subLabel: "ফ্লোর টাইলস" },
  { value: "Wall Tiles", label: "Wall Tiles", subLabel: "ওয়াল টাইলস" },
  { value: "Basin", label: "Basin", subLabel: "বেসিন ও ভ্যানিটি" },
  { value: "Commode", label: "Commode", subLabel: "কমোড ও প্যান" },
  { value: "Sanitary", label: "Sanitary Ware", subLabel: "স্যানিটারি" },
  { value: "Bathroom Accessories", label: "Bathroom Accessories", subLabel: "বাথরুম ফিটিংস" },
  { value: "Stair & Parking", label: "Stair & Parking", subLabel: "সিঁড়ি ও পার্কিং" },
];

const ADMIN_ORDER_STATUS_OPTIONS: DropdownOption[] = [
  { value: "All", label: "All Statuses (সব স্ট্যাটাস)" },
  { value: "Pending", label: "Pending (অপেক্ষমান)", badge: "Review" },
  { value: "Confirmed", label: "Confirmed (নিশ্চিত)", badge: "Active" },
  { value: "Delivered", label: "Delivered (ডেলিভার্ড)", badge: "Done" },
];

const POS_PAYMENT_OPTIONS: DropdownOption[] = [
  { value: "Cash", label: "Cash (নগদ ক্যাশ)", badge: "Instant" },
  { value: "bKash", label: "bKash (+880 1756-998277)", badge: "MFS" },
  { value: "Bank Transfer", label: "Bank Transfer (ব্যাংক)", badge: "EFT" },
  { value: "Nagad", label: "Nagad", badge: "MFS" },
  { value: "Cheque", label: "Cheque (চেক)", badge: "Bank" },
];

const ADMIN_BRAND_OPTIONS: DropdownOption[] = [
  { value: "RAK Ceramics", label: "RAK Ceramics", badge: "Flagship" },
  { value: "Akij Ceramics", label: "Akij Ceramics" },
  { value: "DBL Ceramics", label: "DBL Ceramics" },
  { value: "Fu-Wang Ceramic", label: "Fu-Wang Ceramic" },
  { value: "Fresh Ceramics", label: "Fresh Ceramics" },
  { value: "Mir Ceramic", label: "Mir Ceramic" },
  { value: "Abul Khair Ceramic", label: "Abul Khair Ceramic" },
  { value: "Great Wall Ceramic", label: "Great Wall Ceramic" },
  { value: "Milano Ceramics", label: "Milano Ceramics" },
  { value: "Brother's Exclusive", label: "Brother's Exclusive", badge: "Showroom" },
];

const ADMIN_COLOR_FAMILY_OPTIONS: DropdownOption[] = [
  { value: "white-gold", label: "White & Gold Marble", colorSwatch: "#F3F4F6", subLabel: "সাদা ও সোনালি" },
  { value: "black", label: "Black & Charcoal", colorSwatch: "#1F2937", subLabel: "কালো ও গ্রাফাইট" },
  { value: "grey", label: "Grey & Silver", colorSwatch: "#9CA3AF", subLabel: "ধূসর ও কংক্রিট" },
  { value: "wood", label: "Wood & Brown", colorSwatch: "#B45309", subLabel: "কাঠের রঙ ও বাদামি" },
  { value: "blue", label: "Blue & Ocean", colorSwatch: "#2563EB", subLabel: "নীল মার্বেল" },
  { value: "terracotta", label: "Terracotta & Brick", colorSwatch: "#EA580C", subLabel: "টেরাকোটা" },
  { value: "green", label: "Green & Emerald", colorSwatch: "#059669", subLabel: "সবুজ" },
  { value: "ivory", label: "Ivory & Cream", colorSwatch: "#FDFBF7", subLabel: "আইভরি" },
];

const ADMIN_PRICE_UNIT_OPTIONS: DropdownOption[] = [
  { value: "sq. ft.", label: "sq. ft. (টাইলসের জন্য)", badge: "Tiles" },
  { value: "Piece", label: "Piece (বেসিন/কমোড/ফিটিংস)", badge: "Sanitary" },
];

type AdminTab =
  | "dashboard"
  | "new-sale"
  | "customers"
  | "orders"
  | "products"
  | "add-product"
  | "offers"
  | "hot-sale"
  | "featured"
  | "stock"
  | "payments"
  | "invoices";

const SHOWROOM_IMAGE_GALLERY = [
  { path: "/images/products/premija-7003-shell.jpg", label: "Premija 7003 Shell Mosaic" },
  { path: "/images/products/elegant-slab-1211.jpg", label: "Elegant Slab 1211 Blue Gold" },
  { path: "/images/products/vista-5-gold-marble.jpg", label: "Vista 5 Calacatta Gold" },
  { path: "/images/products/rocker-slab-4-wh.jpg", label: "Rocker Slab Statuario White" },
  { path: "/images/products/premija-7002-wood.jpg", label: "Premija 7002 Natural Wood" },
  { path: "/images/products/elegant-slab-1201.jpg", label: "Elegant Slab 1201 Gold Onyx" },
  { path: "/images/products/classic-super-20.jpg", label: "Classic Super 20 Marble" },
  { path: "/images/products/aston-mak-black.jpg", label: "Aston Mak Black & Gold" },
  { path: "/images/products/sanitary-basin-luxury.jpg", label: "Table Top / Cabinet Basin" },
  { path: "/images/products/sanitary-commode-luxury.jpg", label: "Smart & High Commode" },
  { path: "/images/products/bathroom-accessories-gold.jpg", label: "Shower & Brass Mixer Set" },
  { path: "/images/products/jaynamaj-slab-gold.jpg", label: "Jaynamaj Prayer Slab" },
  { path: "/images/products/terrazzo-1-wh.jpg", label: "Terrazzo Full Body" },
  { path: "/images/products/wooden-slab-west-wood.jpg", label: "West Wood Oak Plank" },
  { path: "/images/products/rak-tread-step.jpg", label: "Staircase Step Bullnose" },
  { path: "/images/products/geo-series-1.jpg", label: "Geo Series Parking Tile" },
];

const SUBCATEGORY_MAP: Record<ProductCategory, string[]> = {
  "Floor Tiles": [
    "Porcelain Floor Tiles (60x60)",
    "Grand Porcelain Slab (60x120)",
    "Large Format Floor Tiles (80x80)",
    "Double Charge Porcelain (80x80)",
    "Glaze Rustic Wood Planks (60x120)",
    "Full Body Terrazzo (60x60)",
  ],
  "Wall Tiles": [
    "Ceramic Wall Tiles (30x60)",
    "Premija Luxury Wall (30x90)",
    "Kitchen Backsplash Tiles",
    "Bathroom Wall Tiles",
    "Exterior 3D Stone Cladding",
  ],
  "Basin": [
    "Table Top & Countertop Basin",
    "Cabinet Basin with Mirror",
    "Pedestal & Wall-Hung Basin",
    "Designer Art Basin",
  ],
  "Commode": [
    "High Commode & Smart WC",
    "Rimless One-Piece Commode",
    "Wall-Hung Concealed Commode",
    "Squatting Pan / Low Commode",
  ],
  "Sanitary": [
    "Mosque & Prayer Room Mihrab Slab",
    "Concealed Cistern & Flush Plates",
    "Urinals & Commercial Sanitary",
  ],
  "Bathroom Accessories": [
    "Shower, Faucet, Mixer & Towel Rod",
    "Rainfall Shower Column Set",
    "Hot & Cold Basin Mixer",
    "6-in-1 Complete Brass Set",
    "Smart LED Vanity Mirror",
  ],
  "Stair & Parking": [
    "Staircase Step & Bull-Nose Tiles",
    "Outdoor, Veranda & Parking Tiles",
    "Heavy-Duty Garage Tiles",
  ],
  "Tiles": [
    "General Ceramic & Porcelain Tiles",
  ],
};

const SIZE_PRESETS = [
  { cm: "60x60 cm", inch: "24x24 inch", label: "60x60 (24x24\") Floor" },
  { cm: "60x120 cm", inch: "24x48 inch", label: "60x120 (24x48\") Slab" },
  { cm: "30x60 cm", inch: "12x24 inch", label: "30x60 (12x24\") Wall" },
  { cm: "80x80 cm", inch: "32x32 inch", label: "80x80 (32x32\") Floor" },
  { cm: "30x90 cm", inch: "12x36 inch", label: "30x90 (12x36\") Luxury Wall" },
  { cm: "40x40 cm", inch: "16x16 inch", label: "40x40 (16x16\") Parking" },
  { cm: "60x42 cm", inch: "24x16 inch Countertop", label: "Table Top Basin" },
  { cm: "Standard S-Trap", inch: "Dual Tornado Flush", label: "Standard Commode" },
];

const FINISH_PRESETS = [
  "Mirror Polish • Gres Porcellanato",
  "Glaze Rustic • Wood Grain",
  "Dry Squaring • Sharp Edge",
  "Anti-Skid • Bull-Nose",
  "Nano Glaze • Anti-Bacterial",
  "Full Body • High Polish",
  "Matt Finish • Smooth Touch",
  "3D Structured Stone Relief",
];

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    addOrder,
    updateOrderStatus,
    invoices,
    createSale,
    customers,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    managerName,
    resetManagementData,
  } = useShop();

  // Login form state
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  // Search & Filter states for different tabs
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");
  const [stockFilter, setStockFilter] = useState<"All" | "Low" | "Out">("All");

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<InvoiceRecord | null>(null);
  const [selectedOrderForView, setSelectedOrderForView] = useState<OrderRecord | null>(null);
  const [createdProductSuccess, setCreatedProductSuccess] = useState<ProductItem | null>(null);

  // New Sale POS Form State
  const [posCustomerName, setPosCustomerName] = useState("");
  const [posCustomerPhone, setPosCustomerPhone] = useState("");
  const [posCustomerAddress, setPosCustomerAddress] = useState("");
  const [posItems, setPosItems] = useState<{ productId: string; quantity: number }[]>([
    { productId: products[0]?.id || "", quantity: 10 },
  ]);
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posPaidAmount, setPosPaidAmount] = useState<number>(0);
  const [posPaymentMethod, setPosPaymentMethod] = useState<PaymentMethod>("Cash");
  const [posNotes, setPosNotes] = useState("");
  const [saleSuccessMessage, setSaleSuccessMessage] = useState("");

  // New Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdNameBn, setNewProdNameBn] = useState("");
  const [newProdCode, setNewProdCode] = useState("");
  const [newProdBrand, setNewProdBrand] = useState("RAK Ceramics");
  const [newProdSeries, setNewProdSeries] = useState("Premija Collection");
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>("Floor Tiles");
  const [newProdSubCategory, setNewProdSubCategory] = useState("Porcelain Floor Tiles (60x60)");
  const [newProdSizeCm, setNewProdSizeCm] = useState("60x60 cm");
  const [newProdSizeInch, setNewProdSizeInch] = useState("24x24 inch");
  const [newProdFinish, setNewProdFinish] = useState("Mirror Polish • Gres Porcellanato");
  const [newProdColor, setNewProdColor] = useState<string>("white-gold");
  const [newProdPrice, setNewProdPrice] = useState<number>(145);
  const [newProdPriceUnit, setNewProdPriceUnit] = useState<"sq. ft." | "Piece">("sq. ft.");
  const [newProdStock, setNewProdStock] = useState<number>(100);
  const [newProdMinStock, setNewProdMinStock] = useState<number>(20);
  const [newProdImage, setNewProdImage] = useState("/images/products/classic-super-20.jpg");
  const [newProdBadge, setNewProdBadge] = useState("NEW ARRIVAL");
  const [newProdIsNew, setNewProdIsNew] = useState(true);
  const [newProdIsBestseller, setNewProdIsBestseller] = useState(false);
  const [newProdIsOffer, setNewProdIsOffer] = useState(false);
  const [newProdDiscountPct, setNewProdDiscountPct] = useState<number>(10);
  const [newProdDescBn, setNewProdDescBn] = useState("");

  // =========================================================================
  // CALCULATED METRICS (MATCHING USER DASHBOARD IMAGE)
  // =========================================================================
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;

  const totalPaidRevenue = useMemo(() => {
    return invoices.reduce((acc, inv) => acc + (inv.paidAmount || 0), 0);
  }, [invoices]);

  const stockAlertsList = useMemo(() => {
    return products.filter((p) => (p.stockBoxes ?? 100) <= (p.minStockThreshold ?? 20));
  }, [products]);

  const stockAlertsCount = stockAlertsList.length;

  const offersCount = useMemo(() => products.filter((p) => p.isOffer).length, [products]);
  const hotSaleCount = useMemo(() => products.filter((p) => p.isHotSale).length, [products]);
  const featuredCount = useMemo(
    () => products.filter((p) => p.isBestseller || p.isNewArrival).length,
    [products]
  );
  const pendingOrdersCount = useMemo(
    () => orders.filter((o) => o.status === "Pending").length,
    [orders]
  );

  // POS Calculation
  const posSubtotal = useMemo(() => {
    return posItems.reduce((acc, item) => {
      const prod = products.find((p) => p.id === item.productId);
      return acc + (prod?.price || 0) * (item.quantity || 0);
    }, 0);
  }, [posItems, products]);

  const posGrandTotal = Math.max(0, posSubtotal - (posDiscount || 0));

  // =========================================================================
  // HANDLERS
  // =========================================================================
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = adminLogin(pinInput);
    if (!success) {
      setLoginError("ভুল পাসওয়ার্ড বা পিন। ডেমো পিন: btsm2026 অথবা 123456 ব্যবহার করুন।");
    } else {
      setPinInput("");
    }
  };

  const handleFillDemoPin = () => {
    setPinInput("btsm2026");
    adminLogin("btsm2026");
  };

  const handleCreateSaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName.trim() || !posCustomerPhone.trim()) {
      alert("অনুগ্রহ করে কাস্টমারের নাম ও মোবাইল নম্বর লিখুন।");
      return;
    }
    if (posItems.length === 0 || posItems.some((i) => !i.productId || i.quantity <= 0)) {
      alert("অনুগ্রহ করে অন্তত ১টি সঠিক পণ্য ও পরিমাণ নির্বাচন করুন।");
      return;
    }

    const createdInv = createSale({
      customerName: posCustomerName.trim(),
      customerPhone: posCustomerPhone.trim(),
      customerAddress: posCustomerAddress.trim() || "Gazipur",
      items: posItems,
      discount: posDiscount,
      paidAmount: posPaidAmount || posGrandTotal,
      paymentMethod: posPaymentMethod,
      notes: posNotes,
    });

    setSaleSuccessMessage(`সেল সফলভাবে সম্পন্ন হয়েছে! ইনভয়েস নং: ${createdInv.invoiceNo}`);
    setSelectedInvoiceForPrint(createdInv);

    // Reset POS Form
    setPosCustomerName("");
    setPosCustomerPhone("");
    setPosCustomerAddress("");
    setPosItems([{ productId: products[0]?.id || "", quantity: 5 }]);
    setPosDiscount(0);
    setPosPaidAmount(0);
    setPosNotes("");

    setTimeout(() => setSaleSuccessMessage(""), 6000);
  };

  const handleAutoGenerateCode = () => {
    const brandPrefix =
      newProdBrand.toLowerCase().includes("rak")
        ? "RAK"
        : newProdBrand.toLowerCase().includes("akij")
        ? "AKJ"
        : newProdBrand.toLowerCase().includes("dbl")
        ? "DBL"
        : newProdBrand.toLowerCase().includes("fu-wang")
        ? "FW"
        : "BTSM";
    const catPrefix =
      newProdCategory === "Floor Tiles"
        ? "FL"
        : newProdCategory === "Wall Tiles"
        ? "WL"
        : newProdCategory === "Basin"
        ? "BSN"
        : newProdCategory === "Commode"
        ? "CMD"
        : newProdCategory === "Sanitary"
        ? "SAN"
        : newProdCategory === "Bathroom Accessories"
        ? "ACC"
        : "STP";
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setNewProdCode(`${brandPrefix}-${catPrefix}-${randNum}`);
  };

  const handleAutoGenerateDescBn = () => {
    const brandName = newProdBrand;
    const catName = newProdCategory;
    const finish = newProdFinish;
    const size = newProdSizeCm;
    const text = `${brandName} ব্র্যান্ডের প্রিমিয়াম ${catName} (${size})। আধুনিক ${finish} ফিনিশ, টেকসই বডি ও দীর্ঘস্থায়ী স্থায়িত্বের জন্য আদর্শ। গাজীপুর শোরুমে সরাসরি পাইকারি ও খুচরা মূল্যে পাওয়া যাচ্ছে।`;
    setNewProdDescBn(text);
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    setNewProdCategory(cat);
    const subList = SUBCATEGORY_MAP[cat] || [];
    if (subList.length > 0) {
      setNewProdSubCategory(subList[0]);
    }
    if (
      cat === "Floor Tiles" ||
      cat === "Wall Tiles" ||
      cat === "Tiles"
    ) {
      setNewProdPriceUnit("sq. ft.");
    } else {
      setNewProdPriceUnit("Piece");
    }
  };

  const handleFillSampleProduct = () => {
    setNewProdName("RAK STATUARIO GOLD GRAND SLAB 60x120");
    setNewProdNameBn("আর-এ-কে স্ট্যাচুয়ারিও গোল্ড লাক্সারি মার্বেল স্ল্যাব");
    setNewProdCode("RAK-SLAB-9920");
    setNewProdBrand("RAK Ceramics");
    setNewProdSeries("Grand Slab Luxury Collection");
    setNewProdCategory("Floor Tiles");
    setNewProdSubCategory("Grand Porcelain Slab (60x120)");
    setNewProdPrice(165);
    setNewProdPriceUnit("sq. ft.");
    setNewProdStock(120);
    setNewProdMinStock(20);
    setNewProdSizeCm("60x120 cm");
    setNewProdSizeInch("24x48 inch");
    setNewProdFinish("Mirror Polish • Gres Porcellanato");
    setNewProdColor("white-gold");
    setNewProdImage("/images/products/elegant-slab-1211.jpg");
    setNewProdIsNew(true);
    setNewProdIsBestseller(true);
    setNewProdIsOffer(false);
    setNewProdDescBn("আর-এ-কে সিরামিকসের ১০০% এ-গ্রেড লাক্সারি মার্বেল পলিশ টাইলস। ড্রয়িং রুম, লিভিং ও হলরুমের জন্য অত্যন্ত প্রিমিয়াম ও টেকসই।");
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdCode.trim()) {
      alert("পণ্যের নাম ও মডেল কোড আবশ্যক।");
      return;
    }

    const newId =
      newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Date.now().toString().slice(-4);

    const created: ProductItem = {
      id: newId,
      name: newProdName.trim(),
      nameBn: newProdNameBn.trim() || newProdName.trim(),
      code: newProdCode.trim().toUpperCase(),
      brand: newProdBrand,
      series: newProdSeries,
      category: newProdCategory,
      subCategory: newProdSubCategory,
      sizeCm: newProdSizeCm,
      sizeInch: newProdSizeInch,
      finish: newProdFinish,
      colorFamily: newProdColor,
      image: newProdImage,
      price: Number(newProdPrice) || 120,
      priceUnit: newProdPriceUnit,
      stockBoxes: Number(newProdStock) || 50,
      minStockThreshold: Number(newProdMinStock) || 15,
      badge: newProdBadge || undefined,
      isNewArrival: newProdIsNew,
      isBestseller: newProdIsBestseller,
      isOffer: newProdIsOffer,
      discountPercent: newProdIsOffer ? Number(newProdDiscountPct) : undefined,
      originalPrice: newProdIsOffer ? Math.round(Number(newProdPrice) * 1.15) : undefined,
      application: [
        newProdCategory === "Floor Tiles" ? "Living Room Floor" : "Wall Accent",
        "Master Suite",
        "Commercial",
      ],
      description: `${newProdName} - Authorized showroom collection at Brother's Tiles & Sanitary Mart.`,
      descriptionBn:
        newProdDescBn.trim() ||
        `${newProdNameBn} — গাজীপুর শোরুমের সরাসরি স্টক ও পাইকারি কালেকশন।`,
      rating: 5.0,
      reviewCount: 1,
      favoriteCount: 120,
    };

    addProduct(created);
    setIsAddProductOpen(false);
    setCreatedProductSuccess(created);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    alert("পণ্যের তথ্য সফলভাবে আপডেট হয়েছে!");
  };

  // =========================================================================
  // 1. LOGIN SCREEN (IF NOT LOGGED IN)
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-obsidian text-white flex flex-col justify-between p-4 sm:p-8">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
          <Link href="/" className="flex items-center gap-2 text-xs text-gold hover:underline">
            ← Back to Public Showroom
          </Link>
          <span className="text-[11px] font-mono text-neutral-400">
            BTSM Management Portal v2.0
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto bg-neutral-900/90 border border-gold/40 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-white/10 border border-gold/50 p-1 flex items-center justify-center">
              <Image
                src="/images/logo/Brothers-emblem.png"
                alt="Brothers Emblem"
                width={50}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold block pt-1">
              BROTHER&rsquo;S TILES &amp; SANITARY MART
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Manager &amp; Admin Login
            </h1>
            <p className="text-xs text-neutral-400">
              শোরুমের স্টক, নতুন সেলস ও প্রোডাক্ট ম্যানেজমেন্ট কন্ট্রোল প্যানেল
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Manager PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Manager PIN (e.g. btsm2026)"
                className="w-full bg-black/60 border border-neutral-700 focus:border-gold px-3.5 py-2.5 text-sm text-white focus:outline-none transition font-mono tracking-wider"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 p-2.5">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-obsidian font-bold text-xs uppercase tracking-widest py-3 transition shadow cursor-pointer active:scale-98"
            >
              <IconLock size={15} stroke={2} />
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2 border-t border-neutral-800 text-center space-y-2">
            <button
              type="button"
              onClick={handleFillDemoPin}
              className="flex items-center justify-center gap-1.5 w-full text-xs bg-neutral-800 hover:bg-neutral-700 text-gold border border-gold/30 py-2 transition cursor-pointer"
            >
              <IconBolt size={15} stroke={2} />
              <span>Auto-Login with Demo PIN (btsm2026)</span>
            </button>
            <p className="text-[10px] text-neutral-500">
              Default authorized PINs: <code className="text-neutral-400">btsm2026</code>,{" "}
              <code className="text-neutral-400">123456</code>, <code className="text-neutral-400">admin</code>
            </p>
          </div>
        </div>

        <div className="text-center text-[11px] text-neutral-500 pb-2">
          {BUSINESS_INFO.fullName} • Jason Gate, Bhabanipur, Gazipur
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN MANAGER DASHBOARD (IDENTICAL TO REFERENCE IMAGE!)
  // =========================================================================
  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-obsidian font-sans">
      {/* =====================================================================
          LEFT SIDEBAR (Obsidian Luxury Black - Exact layout from reference image)
         ===================================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-obsidian text-neutral-300 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 border-r border-neutral-800 ${
          sidebarOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-y-auto flex-1 p-5 space-y-6">
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
            <div className="w-9 h-9 bg-white/10 border border-gold/40 p-1 flex items-center justify-center shrink-0">
              <Image
                src="/images/logo/Brothers-emblem.png"
                alt="Emblem"
                width={32}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide text-white font-serif">
                BROTHER&rsquo;S TILES
              </h2>
              <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                MANAGER CONSOLE
              </span>
            </div>
          </div>

          {/* Section: OVERVIEW */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block px-3 mb-1">
              OVERVIEW
            </span>
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconLayoutDashboard size={18} stroke={1.8} />
              <span>Dashboard</span>
            </button>
          </div>

          {/* Section: SALES */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block px-3 mb-1">
              SALES
            </span>
            <button
              onClick={() => {
                setActiveTab("new-sale");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "new-sale"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconShoppingCartPlus size={18} stroke={1.8} />
              <span>New Sale</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("customers");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "customers"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconUsers size={18} stroke={1.8} />
              <span>Customers</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {customers.length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("orders");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconShoppingBag size={18} stroke={1.8} />
              <span>Orders</span>
              {pendingOrdersCount > 0 && (
                <span className="ml-auto text-[10px] bg-amber-500 text-obsidian font-bold px-1.5 py-0.5 rounded">
                  {pendingOrdersCount}
                </span>
              )}
            </button>
          </div>

          {/* Section: CATALOG */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block px-3 mb-1">
              CATALOG
            </span>
            <button
              onClick={() => {
                setActiveTab("products");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconBox size={18} stroke={1.8} />
              <span>Products</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {totalProductsCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("add-product");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "add-product"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconSquarePlus size={18} stroke={1.8} className="text-gold" />
              <span className="font-semibold text-white">+ Add Product</span>
              <span className="ml-auto text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-bold">
                NEW
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("offers");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "offers"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconDiscount2 size={18} stroke={1.8} />
              <span>Offers</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {offersCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("hot-sale");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "hot-sale"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconFlame size={18} stroke={1.8} />
              <span>Hot Sale</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {hotSaleCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("featured");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "featured"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconStar size={18} stroke={1.8} />
              <span>Featured</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {featuredCount}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("stock");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "stock"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconStack2 size={18} stroke={1.8} />
              <span>Stock</span>
              {stockAlertsCount > 0 && (
                <span className="ml-auto text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                  {stockAlertsCount}
                </span>
              )}
            </button>
          </div>

          {/* Section: FINANCE */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 block px-3 mb-1">
              FINANCE
            </span>
            <button
              onClick={() => {
                setActiveTab("payments");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "payments"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconCreditCard size={18} stroke={1.8} />
              <span>Payments</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("invoices");
                setSidebarOpenMobile(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-md transition cursor-pointer ${
                activeTab === "invoices"
                  ? "bg-[#C59E35] text-obsidian font-bold shadow-sm"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
              }`}
            >
              <IconFileInvoice size={18} stroke={1.8} />
              <span>Invoices</span>
              <span className="ml-auto text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded">
                {invoices.length}
              </span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer with Logout & Link to Storefront */}
        <div className="p-4 border-t border-neutral-800 bg-black/40 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full text-xs text-gold hover:text-white px-2 py-1.5 transition"
          >
            <span>View Public Store</span>
            <IconExternalLink size={14} stroke={1.8} />
          </Link>
          <button
            onClick={adminLogout}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-800 py-2 border border-neutral-700/80 rounded transition cursor-pointer"
          >
            <IconLogout size={16} stroke={1.8} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpenMobile(false)}
        />
      )}

      {/* =====================================================================
          MAIN DASHBOARD CONTENT AREA
         ===================================================================== */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-neutral-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpenMobile(true)}
              className="lg:hidden p-1.5 border border-neutral-300 rounded text-obsidian"
              aria-label="Open sidebar"
            >
              <IconMenu2 size={18} stroke={1.8} />
            </button>
            <div className="hidden sm:block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Brother&rsquo;s Tiles &amp; Sanitary Mart • Manager Suite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-obsidian border border-neutral-300 hover:border-obsidian px-3 py-1.5 rounded bg-white transition"
            >
              <span>Showroom Front</span>
              <IconExternalLink size={14} stroke={1.8} />
            </Link>
            <button
              onClick={() => setActiveTab("add-product")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-obsidian hover:bg-neutral-800 px-3.5 py-1.5 rounded transition shadow-2xs cursor-pointer"
            >
              <IconSquarePlus size={15} stroke={2} />
              <span>Add Product</span>
            </button>
            <button
              onClick={() => setActiveTab("new-sale")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-obsidian bg-gold hover:bg-gold-dark px-3.5 py-1.5 rounded transition shadow-2xs cursor-pointer"
            >
              <IconShoppingCartPlus size={15} stroke={2} />
              <span>New Sale</span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
              <div className="w-7 h-7 rounded-full bg-obsidian text-gold text-xs font-bold flex items-center justify-center">
                M
              </div>
              <span className="text-xs font-semibold hidden md:inline text-neutral-800">
                {managerName}
              </span>
            </div>
          </div>
        </header>

        {/* ===================================================================
            VIEW 1: OVERVIEW / DASHBOARD (EXACT REPLICA OF USER REFERENCE IMAGE)
           =================================================================== */}
        {activeTab === "dashboard" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  — MANAGER DASHBOARD
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-normal text-obsidian">
                  Good day, Manager.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Manage products, sales and your showroom content from one place.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("add-product")}
                  className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian text-xs font-bold px-4 py-2.5 rounded transition cursor-pointer flex items-center gap-2 shadow"
                >
                  <IconSquarePlus size={16} stroke={2} />
                  <span>+ Add New Product</span>
                </button>
              </div>
            </div>

            {/* 4 Top Metric Cards (Exact replica from reference screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Total Products */}
              <div
                onClick={() => setActiveTab("products")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold transition cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <IconBox size={22} stroke={1.8} className="text-[#B58928]" />
                </div>
                <div className="mt-3">
                  <p className="text-[11px] text-neutral-500 font-medium">Total Products</p>
                  <p className="text-2xl sm:text-3xl font-light text-obsidian mt-0.5">
                    {totalProductsCount}
                  </p>
                </div>
              </div>

              {/* Metric 2: Total Orders */}
              <div
                onClick={() => setActiveTab("orders")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold transition cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <IconShoppingBag size={22} stroke={1.8} className="text-[#B58928]" />
                </div>
                <div className="mt-3">
                  <p className="text-[11px] text-neutral-500 font-medium">Total Orders</p>
                  <p className="text-2xl sm:text-3xl font-light text-obsidian mt-0.5">
                    {totalOrdersCount}
                  </p>
                </div>
              </div>

              {/* Metric 3: Paid Revenue */}
              <div
                onClick={() => setActiveTab("payments")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold transition cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <IconCoins size={22} stroke={1.8} className="text-[#B58928]" />
                </div>
                <div className="mt-3">
                  <p className="text-[11px] text-neutral-500 font-medium">Paid Revenue</p>
                  <p className="text-2xl sm:text-3xl font-light text-obsidian mt-0.5">
                    ৳{totalPaidRevenue.toLocaleString("en-US")}
                  </p>
                </div>
              </div>

              {/* Metric 4: Stock Alerts */}
              <div
                onClick={() => setActiveTab("stock")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold transition cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <IconClock size={22} stroke={1.8} className={stockAlertsCount > 0 ? "text-red-500" : "text-[#B58928]"} />
                </div>
                <div className="mt-3">
                  <p className="text-[11px] text-neutral-500 font-medium">Stock Alerts</p>
                  <p
                    className={`text-2xl sm:text-3xl font-light mt-0.5 ${
                      stockAlertsCount > 0 ? "text-red-600 font-semibold" : "text-obsidian"
                    }`}
                  >
                    {stockAlertsCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Metric Pill Bar (Exact replica from reference screenshot) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F1EFEA] border border-neutral-200/80 p-2 text-xs">
              <div className="flex items-center justify-between px-3 py-1 bg-white/70">
                <span className="text-neutral-600 text-[11px]">Offers</span>
                <span className="font-bold text-obsidian">{offersCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1 bg-white/70">
                <span className="text-neutral-600 text-[11px]">Hot Sale</span>
                <span className="font-bold text-obsidian">{hotSaleCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1 bg-white/70">
                <span className="text-neutral-600 text-[11px]">Featured</span>
                <span className="font-bold text-obsidian">{featuredCount}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1 bg-white/70">
                <span className="text-neutral-600 text-[11px]">Pending Orders</span>
                <span className="font-bold text-amber-600">{pendingOrdersCount}</span>
              </div>
            </div>

            {/* Quick Actions Title */}
            <div className="pt-2">
              <h2 className="text-lg font-serif font-bold text-obsidian">Quick Actions</h2>
              <p className="text-xs text-neutral-500">Frequently used manager tools.</p>
            </div>

            {/* Quick Actions (6 Cards Grid - Exact replica from reference screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Card 1: New Sale */}
              <div
                onClick={() => setActiveTab("new-sale")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconShoppingCartPlus size={24} stroke={1.8} className="text-neutral-400 group-hover:text-obsidian mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  New Sale
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Create a customer sale</p>
              </div>

              {/* Card 2: + Add Product */}
              <div
                onClick={() => setActiveTab("add-product")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconSquarePlus size={24} stroke={1.8} className="text-gold mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  + Add Product
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Publish new item to live site</p>
              </div>

              {/* Card 3: Stock */}
              <div
                onClick={() => setActiveTab("stock")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconStack2 size={24} stroke={1.8} className="text-neutral-400 group-hover:text-obsidian mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  Stock
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Update quantities quickly</p>
              </div>

              {/* Card 4: Orders */}
              <div
                onClick={() => setActiveTab("orders")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconShoppingBag size={24} stroke={1.8} className="text-neutral-400 group-hover:text-obsidian mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  Orders
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Review customer orders</p>
              </div>

              {/* Card 5: Offers */}
              <div
                onClick={() => setActiveTab("offers")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconDiscount2 size={24} stroke={1.8} className="text-neutral-400 group-hover:text-obsidian mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  Offers
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Manage offer products</p>
              </div>

              {/* Card 6: Invoices */}
              <div
                onClick={() => setActiveTab("invoices")}
                className="bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs hover:border-gold hover:shadow-sm transition cursor-pointer group"
              >
                <IconFileInvoice size={24} stroke={1.8} className="text-neutral-400 group-hover:text-obsidian mb-2 transition" />
                <h3 className="text-sm font-bold text-obsidian group-hover:text-gold-dark transition">
                  Invoices
                </h3>
                <p className="text-xs text-neutral-500 mt-1">View and print invoices</p>
              </div>
            </div>

            {/* Bottom Widgets Row (Recent Orders + Stock Alerts - Exact replica) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Widget Left: Recent Orders */}
              <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-obsidian">Recent Orders</h3>
                    <p className="text-[11px] text-neutral-400">
                      Orders from the website or New Sale will appear here.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-gold-dark hover:underline font-semibold"
                  >
                    View all &rarr;
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-xs">No orders yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-100 text-neutral-400 uppercase text-[10px]">
                          <th className="py-2">Order</th>
                          <th className="py-2">Customer</th>
                          <th className="py-2">Amount</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {orders.slice(0, 4).map((o) => (
                          <tr key={o.id} className="hover:bg-neutral-50">
                            <td className="py-2.5 font-mono font-semibold text-obsidian">{o.id}</td>
                            <td className="py-2.5">
                              <p className="font-medium text-obsidian">{o.customerName}</p>
                              <p className="text-[10px] text-neutral-400">{o.customerPhone}</p>
                            </td>
                            <td className="py-2.5 font-bold text-obsidian">
                              ৳{o.totalAmount.toLocaleString("en-US")}
                            </td>
                            <td className="py-2.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  o.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : o.status === "Confirmed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Widget Right: Stock Alerts */}
              <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 rounded-xs shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-obsidian">Stock Alerts</h3>
                    <p className="text-[11px] text-neutral-400">Quick inventory check</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("stock")}
                    className="text-xs text-gold-dark hover:underline font-semibold"
                  >
                    Manage stock &rarr;
                  </button>
                </div>

                {stockAlertsCount === 0 ? (
                  <div className="flex items-center gap-2 py-6 text-green-700 text-xs font-medium">
                    <span>✓</span>
                    <span>No low-stock products detected right now.</span>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {stockAlertsList.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2.5 bg-red-50/50 border border-red-200 text-xs"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="font-bold text-obsidian truncate">{p.name}</p>
                          <p className="text-[10px] text-red-700">
                            Available: <strong>{p.stockBoxes}</strong> (Threshold: {p.minStockThreshold})
                          </p>
                        </div>
                        <button
                          onClick={() => updateStock(p.id, (p.stockBoxes ?? 0) + 20)}
                          className="bg-obsidian text-gold hover:bg-gold hover:text-obsidian text-[10px] font-bold px-2.5 py-1 transition shrink-0 cursor-pointer"
                        >
                          + Restock 20
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: + NEW SALE (POS / INVOICE GENERATOR)
           =================================================================== */}
        {activeTab === "new-sale" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  SHOWROOM POINT OF SALE
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  Create Customer Sale &amp; Instant Invoice
                </h1>
                <p className="text-xs text-neutral-500">
                  ইনভয়েস তৈরি করুন, স্টক অটোম্যাটিকভাবে সমন্বয় হবে এবং প্রিন্ট কপি পাওয়া যাবে।
                </p>
              </div>
            </div>

            {saleSuccessMessage && (
              <div className="p-4 bg-green-50 border border-green-300 text-green-800 text-xs font-semibold rounded">
                {saleSuccessMessage}
              </div>
            )}

            <form onSubmit={handleCreateSaleSubmit} className="space-y-6 bg-white border border-neutral-200 p-6 rounded shadow-2xs">
              {/* Customer Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-obsidian border-b border-neutral-100 pb-1">
                  1. Customer Details (কাস্টমারের তথ্য)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={posCustomerName}
                      onChange={(e) => setPosCustomerName(e.target.value)}
                      placeholder="e.g. Engr. Rafiqul Islam"
                      className="w-full border border-neutral-300 px-3 py-2 text-xs rounded focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={posCustomerPhone}
                      onChange={(e) => setPosCustomerPhone(e.target.value)}
                      placeholder="e.g. +880 1711-234567"
                      className="w-full border border-neutral-300 px-3 py-2 text-xs rounded focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      value={posCustomerAddress}
                      onChange={(e) => setPosCustomerAddress(e.target.value)}
                      placeholder="e.g. Bhabanipur, Gazipur Sadar"
                      className="w-full border border-neutral-300 px-3 py-2 text-xs rounded focus:outline-none focus:border-obsidian"
                    />
                  </div>
                </div>
              </div>

              {/* Items Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-obsidian">
                    2. Selected Products &amp; Quantities (পণ্য ও পরিমাণ)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setPosItems([...posItems, { productId: products[0]?.id || "", quantity: 5 }])
                    }
                    className="text-xs text-gold-dark hover:underline font-bold"
                  >
                    + Add Another Item
                  </button>
                </div>

                <div className="space-y-2.5">
                  {posItems.map((item, idx) => {
                    const prod = products.find((p) => p.id === item.productId);
                    const lineTotal = (prod?.price || 0) * (item.quantity || 0);

                    return (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-neutral-50 border border-neutral-200 rounded"
                      >
                        <div className="flex-1">
                          <label className="block text-[10px] text-neutral-500 mb-0.5">Product</label>
                          <div className="relative">
                            <select
                              value={item.productId}
                              onChange={(e) => {
                                const updated = [...posItems];
                                updated[idx].productId = e.target.value;
                                setPosItems(updated);
                              }}
                              className="w-full appearance-none border border-neutral-300 bg-white hover:border-gold/60 pl-2.5 pr-7 py-1.5 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors font-medium text-obsidian cursor-pointer"
                            >
                              {products.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name} — ৳{p.price}/{p.priceUnit || "sq. ft."} (Stock: {p.stockBoxes})
                                </option>
                              ))}
                            </select>
                            <IconChevronDown
                              size={14}
                              stroke={2}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                            />
                          </div>
                        </div>

                        <div className="w-28">
                          <label className="block text-[10px] text-neutral-500 mb-0.5">
                            Qty ({prod?.priceUnit === "Piece" ? "Pcs" : "Boxes/Sq.Ft"})
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const updated = [...posItems];
                              updated[idx].quantity = Math.max(1, Number(e.target.value));
                              setPosItems(updated);
                            }}
                            className="w-full border border-neutral-300 bg-white px-2.5 py-1.5 text-xs rounded focus:outline-none"
                          />
                        </div>

                        <div className="w-32 text-right">
                          <label className="block text-[10px] text-neutral-500 mb-0.5">Line Total</label>
                          <span className="text-xs font-bold text-obsidian block py-1.5">
                            ৳{lineTotal.toLocaleString("en-US")}
                          </span>
                        </div>

                        {posItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setPosItems(posItems.filter((_, i) => i !== idx))}
                            className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-1.5"
                            title="Remove item"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment & Totals */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-obsidian">
                  3. Payment &amp; Discount (বিল ও পরিশোধ)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Payment Method
                    </label>
                    <CustomDropdown
                      variant="default"
                      value={posPaymentMethod}
                      onChange={(val) => setPosPaymentMethod(val as PaymentMethod)}
                      options={POS_PAYMENT_OPTIONS}
                      ariaLabel="Select payment method"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Special Discount (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={posDiscount}
                      onChange={(e) => setPosDiscount(Math.max(0, Number(e.target.value)))}
                      className="w-full border border-neutral-300 bg-white px-3 py-2 text-xs rounded focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      Paid Amount (৳)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={posPaidAmount || posGrandTotal}
                      onChange={(e) => setPosPaidAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full border border-neutral-300 bg-white px-3 py-2 text-xs rounded focus:outline-none"
                    />
                  </div>

                  <div className="bg-stonebg-light p-3 border border-neutral-200 rounded text-right flex flex-col justify-center">
                    <span className="text-[10px] text-neutral-500 uppercase">Grand Total</span>
                    <span className="text-lg font-bold text-obsidian">
                      ৳{posGrandTotal.toLocaleString("en-US")}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                  Showroom / Order Notes
                </label>
                <input
                  type="text"
                  value={posNotes}
                  onChange={(e) => setPosNotes(e.target.value)}
                  placeholder="e.g. Delivery on Friday. Paid via bKash."
                  className="w-full border border-neutral-300 px-3 py-2 text-xs rounded focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className="px-4 py-2.5 text-xs text-neutral-600 hover:text-obsidian"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian font-bold text-xs uppercase tracking-widest px-6 py-3 transition shadow cursor-pointer"
                >
                  Complete Sale &amp; Print Invoice
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================================
            VIEW 3: PRODUCTS MANAGEMENT (CATALOG)
           =================================================================== */}
        {activeTab === "products" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  SHOWROOM CATALOG MANAGEMENT
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  Products &amp; Inventory ({products.length} Items)
                </h1>
                <p className="text-xs text-neutral-500">
                  নতুন পণ্য যোগ করুন, দাম/স্টক পরিবর্তন করুন বা ওয়েবসাইটে ভিজিবিলিটি নিয়ন্ত্রণ করুন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetManagementData}
                  className="text-xs text-neutral-500 hover:text-red-600 px-3 py-2 border border-neutral-300 rounded"
                  title="Reset to factory catalog demo items"
                >
                  Reset Catalog Demo
                </button>
                <button
                  onClick={() => setActiveTab("add-product")}
                  className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition shadow cursor-pointer flex items-center gap-1.5"
                >
                  <IconPlus size={15} stroke={2} />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 border border-neutral-200 rounded">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by name, code or brand..."
                className="flex-1 text-xs border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:border-obsidian"
              />
              <CustomDropdown
                variant="default"
                className="w-full sm:w-64"
                menuClassName="w-64"
                value={productCategoryFilter}
                onChange={setProductCategoryFilter}
                options={ADMIN_CATEGORY_FILTER_OPTIONS}
                ariaLabel="Filter products by category"
              />
            </div>

            {/* Category Filter Pills Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "All", label: "All Items" },
                { id: "Floor Tiles", label: "Floor Tiles" },
                { id: "Wall Tiles", label: "Wall Tiles" },
                { id: "Basin", label: "Basin" },
                { id: "Commode", label: "Commode" },
                { id: "Sanitary", label: "Sanitary" },
                { id: "Bathroom Accessories", label: "Accessories" },
                { id: "Stair & Parking", label: "Stair & Parking" },
              ].map((c) => {
                const count =
                  c.id === "All"
                    ? products.length
                    : products.filter((p) => p.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setProductCategoryFilter(c.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition cursor-pointer ${
                      productCategoryFilter === c.id
                        ? "bg-obsidian text-gold border-obsidian shadow-xs"
                        : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        productCategoryFilter === c.id
                          ? "bg-gold text-obsidian font-bold"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Products Table */}
            <div className="bg-white border border-neutral-200 rounded overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-neutral-200 text-neutral-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Brand / Series</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Badges</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {products
                      .filter((p) => {
                        if (
                          productCategoryFilter !== "All" &&
                          p.category !== productCategoryFilter
                        )
                          return false;
                        if (productSearch.trim()) {
                          const query = productSearch.toLowerCase();
                          return (
                            p.name.toLowerCase().includes(query) ||
                            p.nameBn.toLowerCase().includes(query) ||
                            p.code.toLowerCase().includes(query) ||
                            p.brand.toLowerCase().includes(query) ||
                            p.category.toLowerCase().includes(query) ||
                            p.subCategory.toLowerCase().includes(query)
                          );
                        }
                        return true;
                      })
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-50">
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-neutral-100 relative shrink-0 border border-neutral-200">
                                <Image src={p.image} alt={p.name} fill className="object-cover" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-obsidian truncate">{p.name}</p>
                                <p className="text-[10px] text-neutral-400 font-mono">{p.code}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            <p className="font-medium text-obsidian">{p.brand}</p>
                            <p className="text-[10px] text-neutral-500">{p.series}</p>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="text-[10px] bg-neutral-100 text-neutral-800 font-bold px-2 py-0.5 rounded border border-neutral-200 block w-fit">
                              {p.category}
                            </span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5 truncate max-w-[170px]" title={p.subCategory}>
                              {p.subCategory}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-bold text-obsidian">
                            ৳{p.price?.toLocaleString()} {p.priceUnit || "sq. ft."}
                          </td>
                          <td className="py-2.5 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                (p.stockBoxes ?? 0) <= (p.minStockThreshold ?? 15)
                                  ? "bg-red-100 text-red-700 font-extrabold"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {p.stockBoxes} Boxes/Pcs
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {p.isNewArrival && (
                                <span className="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                                  NEW
                                </span>
                              )}
                              {p.isBestseller && (
                                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                                  BESTSELLER
                                </span>
                              )}
                              {p.isOffer && (
                                <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                                  OFFER
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingProduct({ ...p })}
                                className="px-2 py-1 text-xs font-semibold text-neutral-700 hover:text-obsidian border border-neutral-300 rounded hover:bg-neutral-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-800 border border-red-200 rounded hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW: ADD NEW PRODUCT (FULL DEDICATED WORKFLOW)
           =================================================================== */}
        {activeTab === "add-product" && (
          <div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Top Studio Header & Actions */}
            <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2">
                {/* Modern Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="hover:text-obsidian transition cursor-pointer"
                  >
                    Dashboard
                  </button>
                  <IconChevronRight size={13} className="text-neutral-400" />
                  <button
                    onClick={() => setActiveTab("products")}
                    className="hover:text-obsidian transition cursor-pointer"
                  >
                    Catalog
                  </button>
                  <IconChevronRight size={13} className="text-neutral-400" />
                  <span className="text-obsidian font-bold">New Product Studio</span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian tracking-tight">
                    Create &amp; Publish New Product
                  </h1>
                  <span className="bg-gold/15 text-obsidian border border-gold/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Live Catalog CMS
                  </span>
                </div>
                <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
                  শোরুমের ক্যাটালগে নতুন টাইলস বা স্যানিটারি প্রোডাক্ট যুক্ত করুন। এখানে সেভ করার সাথে সাথে মূল ওয়েবসাইট, ফিল্টার সার্চ এবং পিওএস কাউন্টারে লাইভ দৃশ্যমান হবে।
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
                <button
                  type="button"
                  onClick={handleFillSampleProduct}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-obsidian bg-neutral-100 hover:bg-neutral-200 rounded-xl transition cursor-pointer"
                  title="Auto-fill sample luxury tile data for quick preview"
                >
                  <IconSparkles size={14} className="text-gold-dark" />
                  <span>Demo Fill</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-300 rounded-xl transition cursor-pointer shadow-2xs"
                >
                  <IconArrowLeft size={14} />
                  <span>Back to Products</span>
                </button>
              </div>
            </div>

            {/* Two Column Layout: Form Left (7 Cols) + Live Preview Right (5 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Section */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={handleCreateProductSubmit} className="space-y-6">
                  {/* Card 1: Basic Information */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconBox size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          1. Basic Information <span className="font-normal text-neutral-500">(প্রাথমিক তথ্য)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Product title in English and Bengali, catalog code, and brand
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Product Name (English) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. RAK STATUARIO GOLD 60x120"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Product Name (বাংলা) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newProdNameBn}
                          onChange={(e) => setNewProdNameBn(e.target.value)}
                          placeholder="e.g. আর-এ-কে স্ট্যাচুয়ারিও গোল্ড মার্বেল স্ল্যাব"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-neutral-700">
                            Model / Catalog Code <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleAutoGenerateCode}
                            className="inline-flex items-center gap-1 text-[11px] text-gold-dark hover:text-obsidian font-semibold transition cursor-pointer"
                          >
                            <IconRefresh size={11} stroke={2} />
                            <span>Auto-Generate</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          required
                          value={newProdCode}
                          onChange={(e) => setNewProdCode(e.target.value)}
                          placeholder="e.g. RAK-FL-8021"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs font-mono uppercase text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Brand (ব্র্যান্ড)
                        </label>
                        <CustomDropdown
                          variant="default"
                          value={newProdBrand}
                          onChange={setNewProdBrand}
                          options={ADMIN_BRAND_OPTIONS}
                          ariaLabel="Select Brand"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Series / Collection Name
                        </label>
                        <input
                          type="text"
                          value={newProdSeries}
                          onChange={(e) => setNewProdSeries(e.target.value)}
                          placeholder="e.g. Elegant Slab Series / Premija Collection / Luxury Vanity"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Category Architecture */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconLayoutGrid size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          2. Category Architecture <span className="font-normal text-neutral-500">(ক্যাটাগরি নির্ধারণ)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Select department to configure website navigation and filters
                        </p>
                      </div>
                    </div>

                    {/* Interactive Category Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                      {[
                        { id: "Floor Tiles", label: "Floor Tiles", desc: "ফ্লোর টাইলস" },
                        { id: "Wall Tiles", label: "Wall Tiles", desc: "ওয়াল টাইলস" },
                        { id: "Basin", label: "Basin", desc: "বেসিন কালেকশন" },
                        { id: "Commode", label: "Commode", desc: "কমোড কালেকশন" },
                        { id: "Sanitary", label: "Sanitary", desc: "স্যানিটারি পণ্য" },
                        { id: "Bathroom Accessories", label: "Accessories", desc: "বাথরুম ফিটিংস" },
                        { id: "Stair & Parking", label: "Stair & Parking", desc: "সিঁড়ি ও পার্কিং" },
                      ].map((cat) => {
                        const isSelected = newProdCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectCategory(cat.id as ProductCategory)}
                            className={`p-3 text-left rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                              isSelected
                                ? "bg-obsidian text-white border-obsidian ring-2 ring-gold/40 shadow-sm"
                                : "bg-neutral-50/70 hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            }`}
                          >
                            <div>
                              <span className="text-xs font-bold block">{cat.label}</span>
                              <span
                                className={`text-[10px] block mt-0.5 ${
                                  isSelected ? "text-gold" : "text-neutral-500"
                                }`}
                              >
                                {cat.desc}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Dynamic Sub-Category Dropdown */}
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-xs font-semibold text-neutral-700">
                        Sub-Category (সাব-ক্যাটাগরি)
                      </label>
                      <CustomDropdown
                        variant="default"
                        value={newProdSubCategory}
                        onChange={setNewProdSubCategory}
                        options={(SUBCATEGORY_MAP[newProdCategory] || ["General"]).map((sub) => ({
                          value: sub,
                          label: sub,
                        }))}
                        ariaLabel="Select Sub-Category"
                      />
                    </div>
                  </div>

                  {/* Card 3: Pricing & Inventory Matrix */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconTag size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          3. Pricing &amp; Inventory <span className="font-normal text-neutral-500">(মূল্য ও স্টক)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Set retail price in Taka, units, stock quantity, and threshold alerts
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      {/* Price in Taka */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Price in Taka (৳) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3.5 text-xs font-bold text-neutral-500">
                            ৳
                          </span>
                          <input
                            type="number"
                            required
                            min="1"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(Number(e.target.value))}
                            placeholder="e.g. 145"
                            className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 pl-8 pr-3.5 py-2.5 text-xs font-bold text-obsidian rounded-xl transition duration-150 outline-none"
                          />
                        </div>
                      </div>

                      {/* Price Unit */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Price Unit (একক)
                        </label>
                        <CustomDropdown
                          variant="default"
                          value={newProdPriceUnit}
                          onChange={(val) => setNewProdPriceUnit(val as "sq. ft." | "Piece")}
                          options={ADMIN_PRICE_UNIT_OPTIONS}
                          ariaLabel="Select Price Unit"
                        />
                      </div>

                      {/* Initial Stock */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Initial Stock (Boxes/Pcs)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(Number(e.target.value))}
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>

                      {/* Min Stock Alert Level */}
                      <div className="sm:col-span-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-neutral-700">
                            Min Stock Alert Threshold
                          </label>
                          <span className="text-[10px] text-neutral-400">
                            এই পরিমাণের নিচে নামলে ড্যাশবোর্ডে রিস্টক অ্যালার্ট আসবে
                          </span>
                        </div>
                        <input
                          type="number"
                          min="1"
                          value={newProdMinStock}
                          onChange={(e) => setNewProdMinStock(Number(e.target.value))}
                          className="w-full sm:w-1/3 bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>
                    </div>

                    {/* Promotional Offer Switch Card */}
                    <div className="border border-neutral-200 rounded-xl p-3.5 bg-neutral-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <strong className="text-xs font-bold text-obsidian block">
                          Enable Promotional Discount Offer
                        </strong>
                        <p className="text-[11px] text-neutral-500">
                          হোমপেজের অফার সেকশনে ডিসকাউন্ট ব্যাজসহ প্রদর্শন করুন
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {newProdIsOffer && (
                          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 px-2.5 py-1 rounded-lg">
                            <input
                              type="number"
                              min="1"
                              max="90"
                              value={newProdDiscountPct}
                              onChange={(e) => setNewProdDiscountPct(Number(e.target.value))}
                              className="w-12 text-xs font-bold text-obsidian outline-none text-center"
                            />
                            <span className="text-xs text-neutral-500 font-bold">% OFF</span>
                          </div>
                        )}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newProdIsOffer}
                            onChange={(e) => setNewProdIsOffer(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-obsidian"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Technical Specifications & Dimensions */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconRulerMeasure size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          4. Dimensions &amp; Surface Finish <span className="font-normal text-neutral-500">(সাইজ ও ফিনিশ)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Configure tile size presets, custom dimensions, and surface texture
                        </p>
                      </div>
                    </div>

                    {/* Quick Size Presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-neutral-500 font-semibold block">
                        Quick Size Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {SIZE_PRESETS.map((sz) => {
                          const isActive = newProdSizeCm === sz.cm;
                          return (
                            <button
                              key={sz.label}
                              type="button"
                              onClick={() => {
                                setNewProdSizeCm(sz.cm);
                                setNewProdSizeInch(sz.inch);
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                                isActive
                                  ? "bg-obsidian text-gold border-obsidian font-bold shadow-xs"
                                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                              }`}
                            >
                              {sz.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Size in CM
                        </label>
                        <input
                          type="text"
                          value={newProdSizeCm}
                          onChange={(e) => setNewProdSizeCm(e.target.value)}
                          placeholder="e.g. 60x120 cm"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Size in Inches
                        </label>
                        <input
                          type="text"
                          value={newProdSizeInch}
                          onChange={(e) => setNewProdSizeInch(e.target.value)}
                          placeholder="e.g. 24x48 inch"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>
                    </div>

                    {/* Finish presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-neutral-500 font-semibold block">
                        Surface Finish Presets:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {FINISH_PRESETS.map((fn) => {
                          const isActive = newProdFinish === fn;
                          return (
                            <button
                              key={fn}
                              type="button"
                              onClick={() => setNewProdFinish(fn)}
                              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                                isActive
                                  ? "bg-obsidian text-gold border-obsidian font-bold shadow-xs"
                                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                              }`}
                            >
                              {fn}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Surface Finish (Custom)
                        </label>
                        <input
                          type="text"
                          value={newProdFinish}
                          onChange={(e) => setNewProdFinish(e.target.value)}
                          placeholder="e.g. Mirror Polish • Gres Porcellanato"
                          className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-neutral-700">
                          Color Family (কালার টোন)
                        </label>
                        <CustomDropdown
                          variant="default"
                          value={newProdColor}
                          onChange={setNewProdColor}
                          options={ADMIN_COLOR_FAMILY_OPTIONS}
                          ariaLabel="Select Color Family"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Media & Showroom Imagery */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconPhoto size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          5. Product Photography &amp; Assets <span className="font-normal text-neutral-500">(পণ্যের ছবি)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Enter custom image URL or select from verified showroom gallery
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="block text-xs font-semibold text-neutral-700">
                        Image URL / File Path
                      </label>
                      <input
                        type="text"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        placeholder="e.g. /images/products/elegant-slab-1211.jpg"
                        className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 px-3.5 py-2.5 text-xs font-mono text-obsidian rounded-xl transition duration-150 outline-none"
                      />
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] text-neutral-500 font-semibold block">
                        অথবা শোরুমের লাইব্রেরি থেকে ১-ক্লিকে সিলেক্ট করুন:
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto p-2 bg-neutral-50/80 border border-neutral-200/90 rounded-xl">
                        {SHOWROOM_IMAGE_GALLERY.map((img) => {
                          const isSelected = newProdImage === img.path;
                          return (
                            <div
                              key={img.path}
                              onClick={() => setNewProdImage(img.path)}
                              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "ring-3 ring-gold border-2 border-obsidian scale-95 shadow-sm"
                                  : "border border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100 hover:scale-[1.02]"
                              }`}
                              title={img.label}
                            >
                              <Image src={img.path} alt={img.label} fill className="object-cover" />
                              {isSelected && (
                                <div className="absolute inset-0 bg-obsidian/30 flex items-center justify-center">
                                  <span className="bg-obsidian text-gold text-[10px] font-bold p-1 rounded-full shadow">
                                    <IconCheck size={12} stroke={3} />
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card 6: Storefront Badges & Visibility */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                      <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                        <IconFlame size={18} stroke={1.8} />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-obsidian">
                          6. Storefront Visibility &amp; Placement <span className="font-normal text-neutral-500">(হোমপেজ প্রদর্শন)</span>
                        </h2>
                        <p className="text-[11px] text-neutral-400">
                          Highlight this product in primary homepage carousels
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <label
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          newProdIsNew
                            ? "bg-stonebg-light border-obsidian ring-1 ring-obsidian/30 shadow-2xs"
                            : "bg-neutral-50/50 hover:bg-neutral-100/60 border-neutral-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={newProdIsNew}
                          onChange={(e) => setNewProdIsNew(e.target.checked)}
                          className="mt-0.5 rounded text-obsidian focus:ring-obsidian cursor-pointer"
                        />
                        <div>
                          <strong className="text-xs font-bold text-obsidian block">
                            Mark as New Arrival (Home Page Row 1)
                          </strong>
                          <span className="text-[11px] text-neutral-500 block mt-0.5">
                            Displays in the top New Arrivals row on the homepage
                          </span>
                        </div>
                      </label>

                      <label
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          newProdIsBestseller
                            ? "bg-stonebg-light border-obsidian ring-1 ring-obsidian/30 shadow-2xs"
                            : "bg-neutral-50/50 hover:bg-neutral-100/60 border-neutral-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={newProdIsBestseller}
                          onChange={(e) => setNewProdIsBestseller(e.target.checked)}
                          className="mt-0.5 rounded text-obsidian focus:ring-obsidian cursor-pointer"
                        />
                        <div>
                          <strong className="text-xs font-bold text-obsidian block">
                            Mark as Bestseller (Home Page Row 2)
                          </strong>
                          <span className="text-[11px] text-neutral-500 block mt-0.5">
                            Displays in the top Bestsellers row on the homepage
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Card 7: Description */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-obsidian text-gold flex items-center justify-center shrink-0">
                          <IconEdit size={18} stroke={1.8} />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-obsidian">
                            7. Product Description <span className="font-normal text-neutral-500">(পণ্যের বিবরণ)</span>
                          </h2>
                          <p className="text-[11px] text-neutral-400">
                            Provide Bengali product overview for customer details view
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAutoGenerateDescBn}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 hover:bg-gold/25 border border-gold/40 text-obsidian text-xs font-bold rounded-lg transition cursor-pointer"
                      >
                        <IconSparkles size={13} className="text-gold-dark" />
                        <span>Auto-Write (বাংলা)</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <textarea
                        rows={3}
                        value={newProdDescBn}
                        onChange={(e) => setNewProdDescBn(e.target.value)}
                        placeholder="পণ্যের বাংলা বিবরণ লিখুন অথবা উপরে 'Auto-Write' বাটনে ক্লিক করুন..."
                        className="w-full bg-neutral-50/50 hover:bg-white focus:bg-white border border-neutral-200 focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 p-3.5 text-xs text-obsidian rounded-xl transition duration-150 outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Bottom Form Actions Bar */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setNewProdName("");
                        setNewProdNameBn("");
                        setNewProdCode("");
                        setNewProdDescBn("");
                      }}
                      className="text-xs font-semibold text-neutral-500 hover:text-red-600 transition cursor-pointer"
                    >
                      Clear Fields
                    </button>
                    <button
                      type="submit"
                      className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                    >
                      <IconCheck size={16} stroke={2.5} />
                      <span>Publish Product to Live Website</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Website Card Preview Simulator */}
              <div className="lg:col-span-5 sticky top-20 space-y-4">
                <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <IconDeviceDesktop size={17} className="text-obsidian" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-obsidian">
                        LIVE STOREFRONT PREVIEW
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span>Real-Time Sync</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-500">
                    ওয়েবসাইটে কাস্টমাররা কার্ডটি যেভাবে দেখতে পাবে:
                  </p>

                  {/* Simulated High-End ProductCard matching customer storefront */}
                  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    {/* Image Box */}
                    <div className="relative aspect-square w-full bg-[#F7F6F3] overflow-hidden">
                      <Image
                        src={newProdImage}
                        alt={newProdName || "Product Preview"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                        {newProdIsNew && (
                          <span className="bg-white/95 text-obsidian border border-neutral-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-2xs">
                            NEW ARRIVAL
                          </span>
                        )}
                        {newProdIsBestseller && (
                          <span className="bg-obsidian text-gold text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-2xs">
                            BESTSELLER
                          </span>
                        )}
                        {newProdIsOffer && (
                          <span className="bg-red-700 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-2xs">
                            {newProdDiscountPct}% OFF
                          </span>
                        )}
                      </div>

                      {/* Saved Pill Simulation */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-white/90 text-obsidian border border-neutral-200 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold shadow-2xs">
                        <IconHeartFilled size={12} className="text-red-600" />
                        <span className="text-[9px] font-mono text-neutral-600">120</span>
                      </div>

                      {/* Catalog Model Code Pill */}
                      <div className="absolute bottom-2.5 right-2.5 bg-black/75 text-gold text-[9px] px-2 py-0.5 rounded backdrop-blur-xs font-mono font-bold">
                        {newProdCode || "MODEL CODE"}
                      </div>

                      {/* Quick View Hover Overlay Simulation */}
                      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="bg-white text-obsidian text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 border border-neutral-300 shadow-md flex items-center gap-1.5">
                          <IconEye size={13} stroke={2} />
                          <span>QUICK VIEW</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold uppercase tracking-wide text-obsidian">
                          {newProdSeries || newProdBrand}
                        </span>
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 font-semibold px-2 py-0.5 rounded">
                          {newProdCategory}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-obsidian line-clamp-1">
                          {newProdName || "Product Name (English)"}
                        </h4>
                        <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                          {newProdNameBn || "প্রোডাক্টের নাম (বাংলা)"}
                        </p>
                      </div>

                      <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-0.5">
                        <span>{newProdSizeCm}</span>
                        {newProdSizeInch && <span>({newProdSizeInch})</span>}
                        <span>•</span>
                        <span className="truncate">{newProdFinish}</span>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-baseline justify-between">
                        <div className="flex items-baseline">
                          <span className="text-sm sm:text-base font-extrabold text-obsidian">
                            ৳{newProdPrice || 0}
                          </span>
                          <span className="text-[11px] text-neutral-500 ml-1">
                            / {newProdPriceUnit}
                          </span>
                          {newProdIsOffer && (
                            <span className="text-[10px] text-neutral-400 line-through ml-2">
                              ৳{Math.round(Number(newProdPrice) * 1.15)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
                          <IconStarFilled size={12} className="text-amber-500" />
                          <span>5.0</span>
                          <span className="text-neutral-400 font-normal">(48)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publication Readiness Checklist */}
                  <div className="bg-[#FAF8F5] border border-neutral-200/80 rounded-xl p-4 space-y-2.5 text-xs text-neutral-700">
                    <div className="flex items-center gap-2 font-bold text-obsidian">
                      <IconShieldCheck size={16} className="text-green-600" />
                      <span>Publication Checklist:</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-neutral-600">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span>প্রোডাক্ট সাবমিট করার সাথে সাথেই লাইভ স্টোরে সেভ হয়ে যাবে।</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span>হোমপেজ, ক্যাটালগ ও পিওএস কাউন্টারে এটি বিক্রির জন্য প্রস্তুত থাকবে।</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span>কাস্টমাররা হোয়াটসঅ্যাপে সরাসরি ১-ক্লিকে কোটেশন চাইতে পারবে।</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 4: STOCK MANAGEMENT
           =================================================================== */}
        {activeTab === "stock" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  SHOWROOM INVENTORY
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  Stock Level &amp; Alerts ({products.length} Products)
                </h1>
                <p className="text-xs text-neutral-500">
                  রিয়েল-টাইম স্টক আপডেট করুন, লো-স্টক অ্যালার্ট পর্যবেক্ষণ করুন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStockFilter("All")}
                  className={`text-xs px-3 py-1.5 rounded border ${
                    stockFilter === "All"
                      ? "bg-obsidian text-gold border-obsidian"
                      : "bg-white text-neutral-700 border-neutral-300"
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setStockFilter("Low")}
                  className={`text-xs px-3 py-1.5 rounded border ${
                    stockFilter === "Low"
                      ? "bg-red-700 text-white border-red-700"
                      : "bg-white text-red-700 border-red-300"
                  }`}
                >
                  Low Stock ({stockAlertsCount})
                </button>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-neutral-200 text-neutral-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Product Code &amp; Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Threshold</th>
                      <th className="py-3 px-4">Current Stock</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {products
                      .filter((p) => {
                        if (stockFilter === "Low") {
                          return (p.stockBoxes ?? 0) <= (p.minStockThreshold ?? 20);
                        }
                        return true;
                      })
                      .map((p) => {
                        const isLow = (p.stockBoxes ?? 0) <= (p.minStockThreshold ?? 20);
                        return (
                          <tr key={p.id} className="hover:bg-neutral-50">
                            <td className="py-3 px-4">
                              <p className="font-bold text-obsidian">{p.name}</p>
                              <p className="text-[10px] text-neutral-400 font-mono">{p.code}</p>
                            </td>
                            <td className="py-3 px-4">{p.category}</td>
                            <td className="py-3 px-4 text-neutral-500">
                              {p.minStockThreshold ?? 15} Boxes
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-sm font-extrabold ${
                                  isLow ? "text-red-600" : "text-neutral-800"
                                }`}
                              >
                                {p.stockBoxes}
                              </span>{" "}
                              <span className="text-[10px] text-neutral-500">
                                {p.priceUnit || "sq. ft."}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  isLow ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                                }`}
                              >
                                {isLow ? "Low Stock Alert" : "In Stock"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => updateStock(p.id, (p.stockBoxes ?? 0) - 10)}
                                  className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian font-bold rounded"
                                  title="Decrease 10"
                                >
                                  -10
                                </button>
                                <button
                                  onClick={() => updateStock(p.id, (p.stockBoxes ?? 0) + 10)}
                                  className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-obsidian font-bold rounded"
                                  title="Increase 10"
                                >
                                  +10
                                </button>
                                <button
                                  onClick={() => updateStock(p.id, (p.stockBoxes ?? 0) + 50)}
                                  className="px-2.5 py-1 bg-obsidian text-gold hover:bg-gold hover:text-obsidian font-bold rounded transition"
                                  title="Add 50 boxes restock"
                                >
                                  +50
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 5: OFFERS & HOT SALE
           =================================================================== */}
        {(activeTab === "offers" || activeTab === "hot-sale" || activeTab === "featured") && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                SPECIAL PROMOTIONS &amp; STOREFRONT SHOWCASE
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian capitalize">
                {activeTab === "offers"
                  ? "Special Offers & Discounts"
                  : activeTab === "hot-sale"
                  ? "Hot Sale & Trending Products"
                  : "Featured & Bestseller Showcase"}
              </h1>
              <p className="text-xs text-neutral-500">
                এই পণ্যগুলো ওয়েবসাইটের হোমপেজে ব্যাজসহ বিশেষ গুরুত্ব দিয়ে প্রদর্শিত হচ্ছে।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-neutral-200 p-4 rounded shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-neutral-100 relative shrink-0 border border-neutral-200">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-obsidian truncate">{p.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">{p.code}</p>
                      <p className="text-xs font-bold text-gold-dark mt-1">
                        ৳{p.price} {p.priceUnit || "sq. ft."}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.isOffer ?? false}
                        onChange={(e) => updateProduct(p.id, { isOffer: e.target.checked })}
                        className="rounded"
                      />
                      <span>Special Offer (অফার)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.isHotSale ?? false}
                        onChange={(e) => updateProduct(p.id, { isHotSale: e.target.checked })}
                        className="rounded"
                      />
                      <span>Hot Sale</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.isBestseller ?? false}
                        onChange={(e) => updateProduct(p.id, { isBestseller: e.target.checked })}
                        className="rounded"
                      />
                      <span>Homepage Bestseller</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.isNewArrival ?? false}
                        onChange={(e) => updateProduct(p.id, { isNewArrival: e.target.checked })}
                        className="rounded"
                      />
                      <span>New Arrival</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 6: ORDERS MANAGEMENT
           =================================================================== */}
        {activeTab === "orders" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  ORDER FULFILLMENT
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  Customer Orders ({orders.length})
                </h1>
                <p className="text-xs text-neutral-500">
                  ওয়েবসাইট থেকে আসা কোটেশন ও শোরুমের সেলস রেকর্ড ম্যানেজ করুন।
                </p>
              </div>

              <CustomDropdown
                variant="default"
                className="w-full sm:w-56"
                menuClassName="w-56"
                align="right"
                value={orderStatusFilter}
                onChange={setOrderStatusFilter}
                options={ADMIN_ORDER_STATUS_OPTIONS}
                ariaLabel="Filter orders by status"
              />
            </div>

            <div className="bg-white border border-neutral-200 rounded overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-neutral-200 text-neutral-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID &amp; Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items Ordered</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders
                      .filter((o) => {
                        if (orderStatusFilter !== "All" && o.status !== orderStatusFilter) {
                          return false;
                        }
                        return true;
                      })
                      .map((o) => (
                        <tr key={o.id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <p className="font-mono font-bold text-obsidian">{o.id}</p>
                            <p className="text-[10px] text-neutral-400">{o.date}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-bold text-obsidian">{o.customerName}</p>
                            <a
                              href={`https://wa.me/${o.customerPhone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-green-700 hover:underline flex items-center gap-1 font-mono"
                            >
                              {o.customerPhone}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-obsidian">
                              {o.items.length} product(s)
                            </span>
                            <p className="text-[10px] text-neutral-500 truncate max-w-xs">
                              {o.items.map((i) => `${i.name} (${i.quantity})`).join(", ")}
                            </p>
                          </td>
                          <td className="py-3 px-4 font-bold text-obsidian">
                            ৳{o.totalAmount.toLocaleString("en-US")}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                o.paymentStatus === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {o.paymentMethod} • {o.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="relative inline-block">
                              <select
                                value={o.status}
                                onChange={(e) =>
                                  updateOrderStatus(o.id, e.target.value as OrderStatus)
                                }
                                className={`appearance-none border rounded-lg pl-2.5 pr-7 py-1 text-xs font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-gold/20 ${
                                  o.status === "Delivered"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-emerald-400"
                                    : o.status === "Cancelled"
                                    ? "bg-rose-50 text-rose-800 border-rose-300 hover:border-rose-400"
                                    : o.status === "Confirmed"
                                    ? "bg-blue-50 text-blue-800 border-blue-300 hover:border-blue-400"
                                    : "bg-amber-50 text-amber-800 border-amber-300 hover:border-amber-400"
                                }`}
                              >
                                <option value="Pending">Pending (অপেক্ষমান)</option>
                                <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                                <option value="Processing">Processing (প্রক্রিয়াজাত)</option>
                                <option value="Delivered">Delivered (বিতরণকৃত)</option>
                                <option value="Cancelled">Cancelled (বাতিল)</option>
                              </select>
                              <IconChevronDown
                                size={13}
                                stroke={2}
                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrderForView(o)}
                              className="text-xs text-obsidian hover:text-gold-dark font-bold underline cursor-pointer"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 7: INVOICES & BILLING
           =================================================================== */}
        {activeTab === "invoices" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                  OFFICIAL INVOICES &amp; BILLS
                </span>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                  Showroom Invoices ({invoices.length})
                </h1>
                <p className="text-xs text-neutral-500">
                  ইনভয়েস ভিউ, প্রিন্ট ও কাস্টমারকে ডিজিটাল রিসিট প্রদান করুন।
                </p>
              </div>

              <button
                onClick={() => setActiveTab("new-sale")}
                className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded transition shadow cursor-pointer"
              >
                + Create New Invoice
              </button>
            </div>

            <div className="bg-white border border-neutral-200 rounded overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-neutral-200 text-neutral-500 uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Invoice No</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Subtotal</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Grand Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4 text-right">Print / View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {invoices.map((inv) => (
                      <tr key={inv.invoiceNo} className="hover:bg-neutral-50">
                        <td className="py-3 px-4 font-mono font-bold text-obsidian">
                          {inv.invoiceNo}
                        </td>
                        <td className="py-3 px-4 text-neutral-500">{inv.date}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-obsidian">{inv.customerName}</p>
                          <p className="text-[10px] text-neutral-400">{inv.customerPhone}</p>
                        </td>
                        <td className="py-3 px-4 text-neutral-600">
                          ৳{inv.subtotal.toLocaleString("en-US")}
                        </td>
                        <td className="py-3 px-4 text-red-600">
                          {inv.discount > 0 ? `-৳${inv.discount.toLocaleString("en-US")}` : "৳0"}
                        </td>
                        <td className="py-3 px-4 font-bold text-obsidian">
                          ৳{inv.grandTotal.toLocaleString("en-US")}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                            {inv.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedInvoiceForPrint(inv)}
                            className="inline-flex items-center gap-1.5 bg-obsidian text-gold hover:bg-gold hover:text-obsidian px-3 py-1.5 text-xs font-bold transition rounded cursor-pointer"
                          >
                            <IconPrinter size={15} stroke={1.8} />
                            <span>View &amp; Print</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 8: CUSTOMERS DIRECTORY
           =================================================================== */}
        {activeTab === "customers" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                CUSTOMER RELATIONSHIP DIRECTORY
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                Showroom Clients &amp; Contractors ({customers.length})
              </h1>
              <p className="text-xs text-neutral-500">
                সকল কাস্টমারের ক্রয়ের ইতিহাস ও সরাসরি যোগাযোগের ব্যবস্থা।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-neutral-200 p-5 rounded shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-obsidian">{c.name}</h3>
                      <p className="text-xs font-mono text-neutral-500">{c.phone}</p>
                    </div>
                    <span className="text-[10px] bg-gold/20 text-gold-dark font-bold px-2 py-0.5 rounded">
                      {c.totalOrders} Orders
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500">
                    Address: {c.address || "Gazipur Showroom Customer"}
                  </p>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase">
                        Total Purchases
                      </span>
                      <strong className="text-sm font-extrabold text-obsidian">
                        ৳{c.totalSpent.toLocaleString("en-US")}
                      </strong>
                    </div>

                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `আসসালামু আলাইকুম ${c.name}, ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট থেকে যোগাযোগ করছি।`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-3 py-1.5 rounded transition inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <IconBrandWhatsapp size={15} stroke={2} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            VIEW 9: PAYMENTS BREAKDOWN
           =================================================================== */}
        {activeTab === "payments" && (
          <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
            <div className="border-b border-neutral-200 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B58928] block">
                REVENUE &amp; COLLECTIONS
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-obsidian">
                Payment Records &amp; Breakdown
              </h1>
              <p className="text-xs text-neutral-500">নগদ, বিকাশ ও ব্যাংক ট্রান্সফারের সারসংক্ষেপ।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-neutral-200 p-5 rounded shadow-2xs">
                <span className="text-[11px] text-neutral-500 uppercase font-bold">Total Paid Revenue</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-obsidian mt-1">
                  ৳{totalPaidRevenue.toLocaleString("en-US")}
                </p>
              </div>

              <div className="bg-white border border-neutral-200 p-5 rounded shadow-2xs">
                <span className="text-[11px] text-neutral-500 uppercase font-bold">Total Invoices</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-obsidian mt-1">
                  {invoices.length}
                </p>
              </div>

              <div className="bg-white border border-neutral-200 p-5 rounded shadow-2xs">
                <span className="text-[11px] text-neutral-500 uppercase font-bold">bKash Merchant Account</span>
                <p className="text-sm font-bold text-pink-700 mt-1">
                  +880 1756-998277
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL 1: ADD NEW PRODUCT MODAL
         ===================================================================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full border border-neutral-300 rounded shadow-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="text-base font-serif font-bold text-obsidian">Add New Product to Showroom</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-neutral-500 hover:text-obsidian text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. STATUARIO GOLD 60x120"
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Product Name (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={newProdNameBn}
                    onChange={(e) => setNewProdNameBn(e.target.value)}
                    placeholder="e.g. স্ট্যাচুয়ারিও গোল্ড পোর্সেলিন স্ল্যাব"
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold">Model / Code *</label>
                    <button
                      type="button"
                      onClick={handleAutoGenerateCode}
                      className="text-[10px] text-[#B58928] hover:underline font-bold cursor-pointer"
                    >
                      Auto
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={newProdCode}
                    onChange={(e) => setNewProdCode(e.target.value)}
                    placeholder="e.g. RAK-FL-8021"
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Brand</label>
                  <div className="relative">
                    <select
                      value={newProdBrand}
                      onChange={(e) => setNewProdBrand(e.target.value)}
                      className="w-full appearance-none border border-neutral-300 hover:border-gold/60 pl-3 pr-8 py-2 text-xs rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors cursor-pointer font-medium text-obsidian"
                    >
                      <option value="RAK Ceramics">RAK Ceramics</option>
                      <option value="Akij Ceramics">Akij Ceramics</option>
                      <option value="DBL Ceramics">DBL Ceramics</option>
                      <option value="Fu-Wang Ceramic">Fu-Wang Ceramic</option>
                      <option value="Fresh Ceramics">Fresh Ceramics</option>
                      <option value="Mir Ceramic">Mir Ceramic</option>
                      <option value="Abul Khair Ceramic">Abul Khair Ceramic</option>
                      <option value="Brother's Exclusive">Brother&rsquo;s Exclusive</option>
                    </select>
                    <IconChevronDown
                      size={15}
                      stroke={2}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Category (ক্যাটাগরি)</label>
                  <div className="relative">
                    <select
                      value={newProdCategory}
                      onChange={(e) => handleSelectCategory(e.target.value as ProductCategory)}
                      className="w-full appearance-none border border-neutral-300 hover:border-gold/60 pl-3 pr-8 py-2 text-xs rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors cursor-pointer font-medium text-obsidian"
                    >
                      <option value="Floor Tiles">Floor Tiles (ফ্লোর টাইলস)</option>
                      <option value="Wall Tiles">Wall Tiles (ওয়াল টাইলস)</option>
                      <option value="Basin">Basin (বেসিন)</option>
                      <option value="Commode">Commode (কমোড)</option>
                      <option value="Sanitary">Sanitary Ware (স্যানিটারি)</option>
                      <option value="Bathroom Accessories">Accessories (বাথরুম ফিটিংস)</option>
                      <option value="Stair & Parking">Stair &amp; Parking (সিঁড়ি ও পার্কিং)</option>
                    </select>
                    <IconChevronDown
                      size={15}
                      stroke={2}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Sub-Category (সাব-ক্যাটাগরি)</label>
                <div className="relative">
                  <select
                    value={newProdSubCategory}
                    onChange={(e) => setNewProdSubCategory(e.target.value)}
                    className="w-full appearance-none border border-neutral-300 hover:border-gold/60 pl-3 pr-8 py-2 text-xs rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors cursor-pointer font-medium text-obsidian"
                  >
                    {(SUBCATEGORY_MAP[newProdCategory] || ["General"]).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown
                    size={15}
                    stroke={2}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Price Unit</label>
                  <div className="relative">
                    <select
                      value={newProdPriceUnit}
                      onChange={(e) => setNewProdPriceUnit(e.target.value as "sq. ft." | "Piece")}
                      className="w-full appearance-none border border-neutral-300 hover:border-gold/60 pl-3 pr-8 py-2 text-xs rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors cursor-pointer font-medium text-obsidian"
                    >
                      <option value="sq. ft.">sq. ft. (টাইলসের জন্য)</option>
                      <option value="Piece">Piece (বেসিন/কমোডের জন্য)</option>
                    </select>
                    <IconChevronDown
                      size={15}
                      stroke={2}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Initial Stock (Boxes/Pcs)</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Size (cm &amp; inch)</label>
                  <input
                    type="text"
                    value={newProdSizeCm}
                    onChange={(e) => setNewProdSizeCm(e.target.value)}
                    placeholder="e.g. 60x120 cm (24x48 inch)"
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Surface Finish</label>
                  <input
                    type="text"
                    value={newProdFinish}
                    onChange={(e) => setNewProdFinish(e.target.value)}
                    placeholder="e.g. Mirror Polish • Gres Porcellanato"
                    className="w-full border border-neutral-300 px-3 py-2 text-xs rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Product Image Path / Preset</label>
                <div className="relative">
                  <select
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full appearance-none border border-neutral-300 hover:border-gold/60 pl-3 pr-8 py-2 text-xs rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-obsidian transition-colors cursor-pointer font-medium text-obsidian"
                  >
                    {SHOWROOM_IMAGE_GALLERY.map((img) => (
                      <option key={img.path} value={img.path}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown
                    size={15}
                    stroke={2}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-200 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={newProdIsNew}
                    onChange={(e) => setNewProdIsNew(e.target.checked)}
                  />
                  <span>Mark as New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={newProdIsBestseller}
                    onChange={(e) => setNewProdIsBestseller(e.target.checked)}
                  />
                  <span>Mark as Bestseller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={newProdIsOffer}
                    onChange={(e) => setNewProdIsOffer(e.target.checked)}
                  />
                  <span>Mark as Special Offer</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 text-xs text-neutral-600 hover:text-obsidian"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded transition"
                >
                  Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          CELEBRATION / SUCCESS MODAL: PRODUCT PUBLISHED
         ===================================================================== */}
      {createdProductSuccess && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full border border-neutral-300 rounded-lg shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto bg-green-50 border-2 border-green-500 rounded-full flex items-center justify-center shadow-inner">
                <IconCheck size={28} className="text-green-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-100 px-3 py-0.5 rounded-full inline-block">
                LIVE ON WEBSITE
              </span>
              <h3 className="text-xl font-serif font-bold text-obsidian">
                নতুন পণ্য সফলভাবে পাবলিশ হয়েছে!
              </h3>
              <p className="text-xs text-neutral-500">
                পণ্যটি এখন আপনার মূল ওয়েবসাইট ক্যাটালগ ও পিওএস সিস্টেমে সরাসরি যুক্ত হয়ে গেছে।
              </p>
            </div>

            {/* Product Card Summary */}
            <div className="flex items-center gap-4 bg-neutral-50 p-3.5 border border-neutral-200 rounded">
              <div className="relative w-20 h-20 rounded overflow-hidden shrink-0 border border-neutral-300 bg-white">
                <Image
                  src={createdProductSuccess.image}
                  alt={createdProductSuccess.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-bold text-[#B58928] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {createdProductSuccess.brand}
                  </span>
                  <span className="text-[10px] bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded">
                    {createdProductSuccess.category}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {createdProductSuccess.code}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-obsidian truncate">
                  {createdProductSuccess.name}
                </h4>
                <p className="text-xs text-neutral-600 truncate">
                  {createdProductSuccess.nameBn}
                </p>
                <div className="text-xs font-bold text-obsidian pt-0.5">
                  ৳{createdProductSuccess.price}{" "}
                  <span className="text-[11px] font-normal text-neutral-500">
                    / {createdProductSuccess.priceUnit}
                  </span>
                  <span className="ml-3 text-[11px] font-semibold text-green-700">
                    স্টক: {createdProductSuccess.stockBoxes}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <Link
                href="/catalog"
                target="_blank"
                className="bg-obsidian hover:bg-gold text-gold hover:text-obsidian text-center font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition shadow cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>ক্যাটালগে দেখুন</span>
                <IconExternalLink size={14} stroke={1.8} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setPosItems([{ productId: createdProductSuccess.id, quantity: 5 }]);
                  setActiveTab("new-sale");
                  setCreatedProductSuccess(null);
                }}
                className="bg-[#B58928] hover:bg-gold text-obsidian font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition shadow cursor-pointer text-center"
              >
                পিওএস বিক্রয় চালান
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreatedProductSuccess(null);
                  setActiveTab("add-product");
                }}
                className="bg-white border border-neutral-300 hover:border-obsidian text-neutral-800 text-xs font-bold py-2 px-4 rounded transition cursor-pointer text-center"
              >
                + আরও পণ্য যুক্ত করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreatedProductSuccess(null);
                  setActiveTab("products");
                }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold py-2 px-4 rounded transition cursor-pointer text-center"
              >
                পণ্য তালিকা দেখুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: EDIT PRODUCT MODAL
         ===================================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full border border-neutral-300 rounded shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
              <h3 className="text-base font-serif font-bold text-obsidian">Edit Product</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-neutral-500 hover:text-obsidian text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full border border-neutral-300 px-3 py-2 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (৳)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    className="w-full border border-neutral-300 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Current Stock (Boxes/Pcs)</label>
                  <input
                    type="number"
                    value={editingProduct.stockBoxes || 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, stockBoxes: Number(e.target.value) })
                    }
                    className="w-full border border-neutral-300 px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isOffer || false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isOffer: e.target.checked })
                    }
                  />
                  <span>Offer</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestseller || false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isBestseller: e.target.checked })
                    }
                  />
                  <span>Bestseller</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival || false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })
                    }
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-2 text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-obsidian text-gold hover:bg-gold hover:text-obsidian px-4 py-2 font-bold uppercase rounded transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: OFFICIAL PRINTABLE INVOICE MODAL
         ===================================================================== */}
      {selectedInvoiceForPrint && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0">
          <div className="bg-white max-w-2xl w-full border border-neutral-300 rounded shadow-2xl p-6 sm:p-8 space-y-6 my-auto print:border-none print:shadow-none print:p-0">
            {/* Action Bar (Hidden on print) */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3 print:hidden">
              <span className="text-xs font-mono font-bold text-neutral-500">
                Official Invoice Preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 bg-obsidian text-gold hover:bg-gold hover:text-obsidian px-4 py-1.5 text-xs font-bold uppercase rounded transition cursor-pointer shadow-sm"
                >
                  <IconPrinter size={15} stroke={1.8} />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedInvoiceForPrint(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-neutral-600 hover:text-obsidian border border-neutral-300 rounded cursor-pointer"
                >
                  <IconX size={14} stroke={2} />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Official Invoice Body */}
            <div className="space-y-6">
              {/* Invoice Letterhead Header */}
              <div className="flex items-start justify-between border-b-2 border-obsidian pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-serif font-bold text-obsidian tracking-wide">
                    BROTHER&rsquo;S TILES &amp; SANITARY MART
                  </h2>
                  <p className="text-xs font-medium text-neutral-700">{BUSINESS_INFO.nameBn}</p>
                  <p className="text-[11px] text-neutral-500 max-w-sm">
                    {BUSINESS_INFO.addressExact}
                  </p>
                  <p className="text-xs font-bold text-obsidian">
                    Phone/WhatsApp: {BUSINESS_INFO.mainPhone}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs font-mono font-bold uppercase bg-stonebg px-2.5 py-1 border border-neutral-300 inline-block">
                    INVOICE
                  </span>
                  <p className="text-xs font-mono font-bold text-obsidian mt-1">
                    {selectedInvoiceForPrint.invoiceNo}
                  </p>
                  <p className="text-[11px] text-neutral-500">Date: {selectedInvoiceForPrint.date}</p>
                </div>
              </div>

              {/* Bill To */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-3 border border-neutral-200 rounded">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                    Customer Details (বিল প্রাপক)
                  </span>
                  <p className="font-bold text-obsidian text-sm">
                    {selectedInvoiceForPrint.customerName}
                  </p>
                  <p className="text-neutral-600 font-mono">{selectedInvoiceForPrint.customerPhone}</p>
                  <p className="text-neutral-500">{selectedInvoiceForPrint.customerAddress}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                    Sales Representative
                  </span>
                  <p className="font-semibold text-obsidian">{selectedInvoiceForPrint.salesPerson}</p>
                  <p className="text-neutral-500">Payment: {selectedInvoiceForPrint.paymentMethod}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border border-neutral-200">
                <thead className="bg-[#FAF8F5] border-b border-neutral-200 uppercase text-[10px] text-neutral-600">
                  <tr>
                    <th className="py-2 px-3">#</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3">Qty</th>
                    <th className="py-2 px-3">Rate</th>
                    <th className="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {selectedInvoiceForPrint.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 font-mono text-neutral-400">{idx + 1}</td>
                      <td className="py-2 px-3">
                        <p className="font-bold text-obsidian">{item.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{item.code}</p>
                      </td>
                      <td className="py-2 px-3 font-medium">
                        {item.quantity} {item.priceUnit === "Piece" ? "Pcs" : "Boxes"}
                      </td>
                      <td className="py-2 px-3 text-neutral-600">৳{item.unitPrice}</td>
                      <td className="py-2 px-3 font-bold text-right text-obsidian">
                        ৳{item.subtotal.toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Invoice Summary */}
              <div className="flex justify-between items-start text-xs pt-2">
                <div className="max-w-xs text-[11px] text-neutral-500 space-y-1">
                  <p>• বিক্রিত মাল ফেরত নেওয়া হয় না।</p>
                  <p>• টাইলস লাগানোর পূর্বে শেড ও সাইজ যাচাই করে নিন।</p>
                  {selectedInvoiceForPrint.notes && (
                    <p className="text-obsidian font-medium italic pt-1">
                      Note: {selectedInvoiceForPrint.notes}
                    </p>
                  )}
                </div>

                <div className="w-56 space-y-1.5 text-right">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal:</span>
                    <span>৳{selectedInvoiceForPrint.subtotal.toLocaleString("en-US")}</span>
                  </div>
                  {selectedInvoiceForPrint.discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount:</span>
                      <span>-৳{selectedInvoiceForPrint.discount.toLocaleString("en-US")}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-sm text-obsidian border-t border-b border-neutral-300 py-1">
                    <span>Grand Total:</span>
                    <span>৳{selectedInvoiceForPrint.grandTotal.toLocaleString("en-US")}</span>
                  </div>
                  <div className="flex justify-between text-green-700 font-bold">
                    <span>Paid Amount:</span>
                    <span>৳{selectedInvoiceForPrint.paidAmount.toLocaleString("en-US")}</span>
                  </div>
                  {selectedInvoiceForPrint.dueAmount > 0 && (
                    <div className="flex justify-between text-red-700 font-bold">
                      <span>Due Balance:</span>
                      <span>৳{selectedInvoiceForPrint.dueAmount.toLocaleString("en-US")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex justify-between text-xs text-neutral-500 border-t border-dashed border-neutral-300">
                <div className="text-center">
                  <div className="w-32 border-b border-neutral-400 mb-1" />
                  <span>Customer Signature</span>
                </div>
                <div className="text-center">
                  <div className="w-36 border-b border-neutral-400 mb-1" />
                  <span className="font-semibold text-obsidian">Authorized Seal &amp; Sign</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
