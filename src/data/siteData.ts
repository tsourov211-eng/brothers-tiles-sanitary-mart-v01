import { RAK_CATALOG_974, PDF_CATALOG_974, PdfTileRecord } from "./rakCatalog974";

export type ProductCategory =
  | "Tiles"
  | "Floor Tiles"
  | "Wall Tiles"
  | "Basin"
  | "Commode"
  | "Sanitary"
  | "Bathroom Accessories"
  | "Stair & Parking";

export interface ShowroomCategoryMeta {
  id: ProductCategory;
  nameEn: string;
  nameBn: string;
  icon: string;
  descriptionBn: string;
  subCategories: string[];
}

export const SHOWROOM_CATEGORIES: ShowroomCategoryMeta[] = [
  {
    id: "Floor Tiles",
    nameEn: "Floor Tiles",
    nameBn: "ফ্লোর টাইলস",
    icon: "",
    descriptionBn: "২৪x২৪, ৩২x৩২, ২৪x৪৮ মিরর পলিশ, ডাবল চার্জ, উডেন ও ফুল বডি ফ্লোর টাইলস",
    subCategories: [
      "Porcelain Floor Tiles (60x60)",
      "Grand Porcelain Slab (60x120)",
      "Large Format Floor Tiles (80x80)",
      "Double Charge Porcelain (80x80)",
      "Glaze Rustic Wood Planks (60x120)",
      "Full Body Terrazzo (60x60)",
    ],
  },
  {
    id: "Wall Tiles",
    nameEn: "Wall Tiles",
    nameBn: "ওয়াল টাইলস",
    icon: "",
    descriptionBn: "১২x২৪, ১২x৩৬ প্রিমিজা মোজাইক, কিচেন ব্যাকস্প্ল্যাশ ও লাক্সারি বাথরুম ওয়াল টাইলস",
    subCategories: [
      "Ceramic Wall Tiles (30x60)",
      "Premija Luxury Wall (30x90)",
      "Kitchen Backsplash Tiles",
      "Bathroom Wall Tiles",
      "Exterior 3D Stone Cladding",
    ],
  },
  {
    id: "Basin",
    nameEn: "Basin",
    nameBn: "বেসিন",
    icon: "",
    descriptionBn: "টেবিল টপ আর্ট বেসিন, ক্যাবিনেট বেসিন, পেডেস্টাল ও আন্ডার-কাউন্টার বেসিন",
    subCategories: [
      "Table Top & Countertop Basin",
      "Cabinet Basin with Mirror",
      "Pedestal & Wall-Hung Basin",
      "Designer Art Basin",
    ],
  },
  {
    id: "Commode",
    nameEn: "Commode",
    nameBn: "কমোড",
    icon: "",
    descriptionBn: "রিমলেস ওয়ান-পিস হাই কমোড, স্মার্ট অটো-ফ্লাশ ডব্লিউসি ও স্ট্যান্ডার্ড কমোড",
    subCategories: [
      "High Commode & Smart WC",
      "Rimless One-Piece Commode",
      "Wall-Hung Concealed Commode",
      "Squatting Pan / Low Commode",
    ],
  },
  {
    id: "Sanitary",
    nameEn: "Sanitary Ware",
    nameBn: "স্যানিটারি পণ্য",
    icon: "",
    descriptionBn: "মসজিদের জায়নামাজ টাইলস, কনসিল্ড ফ্লাশ ট্যাংক, ইউরিনাল ও পাইপ ফিটিংস",
    subCategories: [
      "Mosque & Prayer Room Mihrab Slab",
      "Concealed Cistern & Flush Plates",
      "Urinals & Commercial Sanitary",
    ],
  },
  {
    id: "Bathroom Accessories",
    nameEn: "Bathroom Fittings",
    nameBn: "বাথরুম ফিটিংস",
    icon: "",
    descriptionBn: "ব্রাশড গোল্ড ও ম্যাট ব্ল্যাক শাওয়ার কলাম, মিক্সার, টাওয়েল রড ও এলইডি ভ্যানিটি মিরর",
    subCategories: [
      "Shower, Faucet, Mixer & Towel Rod",
      "Rainfall Shower Column Set",
      "Hot & Cold Basin Mixer",
      "6-in-1 Complete Brass Set",
      "Smart LED Vanity Mirror",
    ],
  },
  {
    id: "Stair & Parking",
    nameEn: "Stair & Parking Tiles",
    nameBn: "সিঁড়ি ও পার্কিং টাইলস",
    icon: "",
    descriptionBn: "এন্টি-স্কিড বুল-নোজ সিঁড়ির ধাপ ও হেভি-ডিউটি গ্যারেজ/পার্কিং ফ্লোর টাইলস",
    subCategories: [
      "Staircase Step & Bull-Nose Tiles",
      "Outdoor, Veranda & Parking Tiles",
      "Heavy-Duty Garage Tiles",
    ],
  },
];

export interface ProductItem {
  id: string;
  slug?: string;
  code: string;
  name: string;
  nameBn: string;
  brand: string;
  series: string;
  category: ProductCategory;
  subCategory: string;
  sizeCm: string;
  sizeInch: string;
  finish: string;
  colorFamily: string;
  image: string;
  badge?: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  waterAbsorption?: string;
  thickness?: string;
  application: string[];
  description: string;
  descriptionBn: string;
  pdfPage?: number;
  catalogPage?: number;
  tileRole?: string;
  pdfCategory?: string;
  driveUrl?: string;
  pricePerSqFt?: number;
  wholesalePricePerSqFt?: number;
  sqFtPerBox?: number;
  tilesPerBox?: number;
  samplePrice?: number;
  price?: number;
  priceUnit?: "sq. ft." | "Piece";
  swatchColors?: string[];
  rating?: number;
  reviewCount?: number;
  favoriteCount?: number;
  stockBoxes?: number;
  minStockThreshold?: number;
  isOffer?: boolean;
  discountPercent?: number;
  originalPrice?: number;
  isHotSale?: boolean;
  isUpcoming?: boolean;
  specs?: Record<string, any>;
}

export interface ColorSwatch {
  id: string;
  name: string;
  nameBn: string;
  image: string;
  hex: string;
  sampleCode: string;
}

export interface CategoryShowcase {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  image: string;
  filterCategory: string;
  sizes: string[];
}

export interface RealLifeProject {
  id: string;
  title: string;
  titleBn: string;
  location: string;
  tileUsed: string;
  size: string;
  image: string;
  featured?: boolean;
}

// IMPORTANT: Manager (+880 1932-836640) and Bikash (+880 1756-998277) numbers
// are stored in `contactPageOnlyNumbers` and rendered EXCLUSIVELY on `/contact`
// as instructed by the business owner.
export const BUSINESS_INFO = {
  nameEn: "Brother’s Tiles & Sanitary Mart",
  nameBn: "ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট",
  fullName: "Brother’s Tiles & Sanitary Mart (ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট)",
  tagline: "গাজীপুরের বিশ্বস্ত Tiles & Sanitary Showroom",
  taglineEn: "Gazipur's Trusted Tiles & Sanitary Showroom",
  subLine: "৫০০০+ ডিজাইন | পাইকারি ও খুচরা",
  subLineEn: "5,000+ Designs | Wholesale & Retail",
  productsList: ["Tiles", "Basin", "Commode", "Sanitary", "Bathroom Accessories"] as const,
  mainPhone: "+880 1625-073614",
  mainPhoneClean: "8801625073614",
  whatsappUrl: "https://wa.me/8801625073614",
  email: "btsm2482025@gmail.com",
  addressExact: "Jason Gate, Bhabanipur, Gazipur Sadar, Gazipur, Bangladesh, 1700",
  addressBn: "জেসন গেইট, ঢাকা-ময়মনসিংহ হাইওয়ের পাশে, ভবানীপুর, গাজীপুর সদর, গাজীপুর-১৭০০",
  googleMapLink: "https://share.google/6wvMeUAFpZxnxSlSD",
  facebookLink: "https://www.facebook.com/brotherstilesbd",
  homeDeliveryBn: "গাজীপুর, টঙ্গী, উত্তরা, ঢাকা, ময়মনসিংহ, টাঙ্গাইল ও আশেপাশে",
  homeDeliveryAreas: [
    "Gazipur Sadar & Bhabanipur (গাজীপুর সদর ও ভবানীপুর)",
    "Tongi (টঙ্গী)",
    "Uttara (উত্তরা)",
    "Dhaka City (ঢাকা)",
    "Mymensingh (ময়মনসিংহ)",
    "Tangail & Surrounding Areas (টাঙ্গাইল ও আশেপাশে)",
  ],
  colorTheme: {
    primary: "#0A0A0A", // কালো (Obsidian Black)
    accent: "#D4AF37",  // সোনালি (Metallic Gold)
    surface: "#FFFFFF", // সাদা (Crisp White)
  },
  // Strictly for Contact Page only (`অন্য নম্বর (শুধু Contact page)`)
  contactPageOnlyNumbers: {
    bikash: "+880 1756-998277",
    bikashClean: "8801756998277",
    manager: "+880 1932-836640",
    managerClean: "8801932836640",
  },
  brandsCarried: [
    { name: "RAK Ceramics", nameBn: "আর-এ-কে সিরামিকস", role: "Featured Flagship Brand (1500+ Tile & 50+ Sanitary Models)" },
    { name: "Akij Ceramics", nameBn: "আকিজ সিরামিকস", role: "Premium Wall, Floor & Sanitary Ware" },
    { name: "DBL Ceramics", nameBn: "ডিবিএল সিরামিকস", role: "A-Grade Porcelain & Vitrified Tiles" },
    { name: "Fu-Wang Ceramic", nameBn: "ফু-ওয়াং সিরামিক", role: "Classic & Contemporary Wall/Floor Tiles" },
    { name: "Fresh Ceramics", nameBn: "ফ্রেশ সিরামিকস", role: "Modern Residential & Commercial Tiles" },
    { name: "Mir Ceramic", nameBn: "মীর সিরামিক", role: "High-Durability Floor & Wall Tiles" },
    { name: "Abul Khair Ceramic", nameBn: "আবুল খায়ের সিরামিক", role: "Sanitary Ware, Commode & Basin" },
    { name: "Great Wall Ceramic", nameBn: "গ্রেট ওয়াল সিরামিক", role: "Floor & Kitchen Tiles" },
    { name: "Milano Ceramics", nameBn: "মিলানো সিরামিকস", role: "Designer & Decorative Collections" },
  ],
};

export const ANNOUNCEMENT_MESSAGES = [
  "গাজীপুরের বিশ্বস্ত Tiles & Sanitary Showroom — ৫০০০+ এক্সক্লুসিভ ডিজাইন | পাইকারি ও খুচরা | Call/WhatsApp: +880 1625-073614",
  "গাজীপুর সদর, টঙ্গী, উত্তরা, ঢাকা, ময়মনসিংহ ও টাঙ্গাইল সহ যেকোনো এলাকায় দ্রুত হোম ডেলিভারি সুবিধা",
  "বাসার ফ্লোর প্ল্যান ও মাপ অনুযায়ী ফ্রি ডিজাইন পরামর্শ ও নিখুঁত টাইলস হিসাব — Jason Gate, Bhabanipur, Gazipur",
  "RAK Ceramics, Akij, DBL, Fu-Wang ও Abul Khair ব্র্যান্ডের ১০০% এ-গ্রেড টাইলস, বেসিন, কমোড ও স্যানিটারি মার্ট",
  "জেসন গেইট, ঢাকা-ময়মনসিংহ হাইওয়ের পাশে, ভবানীপুর, গাজীপুর সদর — সরাসরি শোরুম ভিজিট করুন",
  "বাড়ি নির্মাণ ও ফ্ল্যাট প্রজেক্টের জন্য বিশেষ পাইকারি ছাড় ও স্পেশাল প্রজেক্ট রেট সুবিধা",
];

export const HERO_SLIDES = [
  {
    id: "fall-rak-collection",
    badge: "গাজীপুরের বিশ্বস্ত TILES & SANITARY SHOWROOM",
    title: "THE LUXURY RAK & SANITARY COLLECTIONS",
    titleBn: "ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট — ৫০০০+ ডিজাইন",
    subtitle: "Explore 5,000+ luxury tiles, art basins & executive sanitary ware.",
    image: "/images/hero/hero-tilebar-composite.jpg",
    ctaText: "SHOP THE COLLECTION",
    ctaLink: "/catalog",
  },
  {
    id: "grandeur-slabs",
    badge: "60CM × 120CM UNMATCHED GRANDEUR",
    title: "ELEGANT SLAB & MIRROR POLISH SERIES",
    titleBn: "লাক্সারি মার্বেল ও মিরর পলিশ ফ্লোর স্ল্যাব",
    subtitle: "Explore RAK Ceramics 60x120cm & 80x80cm porcelain slabs at wholesale rates.",
    image: "/images/hero/rak-grandeur-room.jpg",
    ctaText: "SHOP THE COLLECTION",
    ctaLink: "/catalog?size=60x120+cm",
  },
  {
    id: "wood-herringbone",
    badge: "WOOD ART & GLAZE RUSTIC SERIES",
    title: "TIMELESS WOOD & STONE TEXTURES",
    titleBn: "ন্যাচারাল উড, স্টোন আর্ট ও রাস্টিক কালেকশন",
    subtitle: "বাসার মাপ অনুযায়ী ফ্রি ডিজাইন ও হিসাব — গাজীপুর ও ঢাকায় হোম ডেলিভারি।",
    image: "/images/hero/hero-herringbone.jpg",
    ctaText: "CALCULATE TILES",
    ctaLink: "/calculator",
  },
  {
    id: "modern-living-architecture",
    badge: "MODERN RESIDENTIAL & COMMERCIAL TILES",
    title: "CONTEMPORARY LIVING & LUXURY ARCHITECTURE",
    titleBn: "আধুনিক ড্রয়িং রুম, বেডরুম ও কমার্শিয়াল টাইলস",
    subtitle: "প্রিমিয়াম চীনামাটি ও মিরর পলিশ টাইলস এবং ডিজাইনার আর্ট বেসিন।",
    image: "/images/hero/modern-living.jpg",
    ctaText: "SHOP THE COLLECTION",
    ctaLink: "/catalog",
  },
];

// Section 1 of Tilebar Landing Page: "Shop by Color" (6 Swatches)
export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    id: "black",
    name: "Black",
    nameBn: "কালো ও অ্যানথ্রাসাইট (Black)",
    image: "/images/colors/color-black.jpg",
    hex: "#141414",
    sampleCode: "9GPBG BASIC BLACK",
  },
  {
    id: "green",
    name: "Green",
    nameBn: "সবুজ ও এমারেল্ড (Green)",
    image: "/images/colors/color-green.jpg",
    hex: "#3E5A4C",
    sampleCode: "6608 SUGER LGR",
  },
  {
    id: "terracotta",
    name: "Terracotta",
    nameBn: "টেরাকোটা ও কপার (Terracotta)",
    image: "/images/colors/color-terracotta.jpg",
    hex: "#9E5B40",
    sampleCode: "12GP ROCKER 3 BR",
  },
  {
    id: "blue",
    name: "Blue",
    nameBn: "নীল ও আর্কটিক গ্রে (Blue & Grey)",
    image: "/images/colors/color-blue.jpg",
    hex: "#58788E",
    sampleCode: "9GPBG SHINE STONE BLUE",
  },
  {
    id: "wood",
    name: "Brown",
    nameBn: "কাঠের রঙ ও ব্রাউন (Wood & Brown)",
    image: "/images/colors/color-wood.jpg",
    hex: "#8A6240",
    sampleCode: "9GPBG LINE WOOD BE",
  },
  {
    id: "white-gold",
    name: "White & Gold",
    nameBn: "সাদা ও সোনালি মার্বেল (White & Gold)",
    image: "/images/colors/color-white-gold.jpg",
    hex: "#EAE4D7",
    sampleCode: "CLASSIC SUPER 21",
  },
  {
    id: "grey",
    name: "Grey & Silver",
    nameBn: "সিলভার ও কংক্রিট গ্রে (Grey)",
    image: "/images/products/hard-rock-costa-grey.jpg",
    hex: "#787C80",
    sampleCode: "COSTA GREY 60X60",
  },
  {
    id: "ivory",
    name: "Ivory & Cream",
    nameBn: "আইভরি ও ক্রিম মার্বেল (Cream)",
    image: "/images/products/paris-ivory-25x70.jpg",
    hex: "#F0E6D2",
    sampleCode: "PARIS IVORY 25X70",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    nameBn: "রোজ গোল্ড ও পিঙ্ক (Rose Gold)",
    image: "/images/products/rocker-4-gold-rose.jpg",
    hex: "#C58B78",
    sampleCode: "ROCKER 4 ROSE GOLD",
  },
  {
    id: "amber-gold",
    name: "Amber Gold",
    nameBn: "অ্যাম্বার গোল্ড অনিক্স (Amber Gold)",
    image: "/images/products/apollo-18-gold-onyx.jpg",
    hex: "#D49B45",
    sampleCode: "APOLLO 18 GOLD ONYX",
  },
  {
    id: "onyx-black",
    name: "Onyx Charcoal",
    nameBn: "অনিক্স ও ডিপ ব্ল্যাক (Onyx)",
    image: "/images/products/marble-9gp-03-bl.jpg",
    hex: "#22252A",
    sampleCode: "MARBLE 9GP BLACK",
  },
  {
    id: "olive-green",
    name: "Olive Green",
    nameBn: "অলিভ ও স্টোন গ্রিন (Olive)",
    image: "/images/products/geo-series-1.jpg",
    hex: "#2E4B3E",
    sampleCode: "GEO MOSS 60X60",
  },
  {
    id: "rust-red",
    name: "Rust & Brick",
    nameBn: "রাস্ট ও ব্রিক রেড (Rust Red)",
    image: "/images/products/stone-art-fred.jpg",
    hex: "#914738",
    sampleCode: "STONE ART FRED",
  },
  {
    id: "navy-blue",
    name: "Ocean Navy",
    nameBn: "নেভি ও রয়্যাল ব্লু (Navy Blue)",
    image: "/images/products/elegant-slab-1201.jpg",
    hex: "#1B365D",
    sampleCode: "ELEGANT SLAB 1201",
  },
];

// Section 2 of Tilebar Landing Page: "Explore by Category" (2 Large Editorial Cards + 5 Showroom Product Lines)
export const EDITORIAL_CATEGORIES: CategoryShowcase[] = [
  {
    id: "bath-shower-sanitary",
    title: "Bath & Shower Tile + Luxury Sanitary",
    titleBn: "বাথরুম টাইলস, বেসিন, কমোড ও বাথরুম ফিটিংস",
    subtitle: "Anti-slip 24x24 & 12x24 bathroom tiles, Table Top & Cabinet Basins, High/Smart Commodes & Gold Fittings",
    subtitleBn: "এন্টি-স্লিপ ফ্লোর টাইলস, ওয়াটারপ্রুফ ওয়াল টাইলস, কমোড, বেসিন ও শাওয়ার মিক্সার",
    image: "/images/categories/bath-shower-tile.jpg",
    filterCategory: "Bathroom",
    sizes: ["30x60 cm (12x24\")", "25x70 cm", "25x40 cm", "60x60 cm (24x24\")"],
  },
  {
    id: "kitchen-backsplash-floor",
    title: "Kitchen, Backsplash & Grand Floor Tile",
    titleBn: "কিচেন, ব্যাকস্প্ল্যাশ, ফ্লোর ও ওয়াল টাইলস",
    subtitle: "Oil & water-resistant 12x18, 12x24, 12x30 wall tiles and 24x24, 32x32, 24x48 mirror polish floor slabs",
    subtitleBn: "তেল ও পানি প্রতিরোধী প্রিমিয়াম কিচেন ওয়াল টাইলস এবং মিরর পলিশ ফ্লোর টাইলস",
    image: "/images/categories/kitchen-backsplash-tile.jpg",
    filterCategory: "Tiles",
    sizes: ["60x120 cm (24x48\")", "80x80 cm (32x32\")", "60x60 cm (24x24\")", "30x90 cm (12x36\")"],
  },
];

export const SHOWROOM_DEPARTMENTS = [
  {
    id: "Tiles",
    name: "Tiles",
    count: "3,500+ Designs",
    mainPoints: "Wall, Floor, Kitchen & Parking (12x24, 24x24, 24x48)",
    sizes: "12x18, 12x24, 12x30, 24x24, 32x32, 24x48",
    descriptionBn: "ওয়াল, ফ্লোর, কিচেন ও বাথরুম টাইলস",
    image: "/images/products/elegant-slab-1211.jpg",
  },
  {
    id: "Basin",
    name: "Basin Collection",
    count: "450+ Models",
    mainPoints: "Table Top, Pedestal, Cabinet & Designer Basins",
    sizes: "Table Top, Pedestal, Art & Cabinet Basin",
    descriptionBn: "টেবিল টপ, পেডেস্টাল ও ক্যাবিনেট বেসিন",
    image: "/images/products/sanitary-basin-luxury.jpg",
  },
  {
    id: "Commode",
    name: "Commode & WC",
    count: "380+ Models",
    mainPoints: "High Commode, Low Commode, One-Piece & Smart WC",
    sizes: "High Commode, Low Commode, One-Piece & Smart",
    descriptionBn: "হাই-কমোড, ওয়ান-পিস ও স্মার্ট কমোড",
    image: "/images/products/sanitary-commode-luxury.jpg",
  },
  {
    id: "Sanitary",
    name: "Sanitary Ware",
    count: "400+ Items",
    mainPoints: "Pan, Concealed Cistern, Urinal & Pipe Fittings",
    sizes: "Pan, Cistern, Urinal, Concealed Flush",
    descriptionBn: "প্যান, ফ্লাশ ট্যাংক ও পাইপ ফিটিংস",
    image: "/images/products/jaynamaj-slab-gold.jpg",
  },
  {
    id: "Bathroom Accessories",
    name: "Bathroom Fittings",
    count: "600+ Fittings",
    mainPoints: "Shower Columns, Mixers, Towel Rods & LED Mirrors",
    sizes: "Shower, Basin Mixer, Towel Rod, Soap Case, Mirror",
    descriptionBn: "শাওয়ার, কল, মিক্সার ও ফিটিংস",
    image: "/images/products/bathroom-accessories-gold.jpg",
  },
];

// Comprehensive Product Catalog (974 RAK Ceramics Catalog Products)
export const PRODUCTS: ProductItem[] = RAK_CATALOG_974;
// Section 7 of Tilebar Landing Page: "Real-Life Projects" (1 Tall/Large Left + 4 Grid Right)
export const REAL_LIFE_PROJECTS: RealLifeProject[] = [
  {
    id: "gazipur-duplex-kitchen",
    title: "Luxury Marble & Gold Backsplash Kitchen",
    titleBn: "গাজীপুর ডুপ্লেক্স কিচেন ও ডাইনিং প্রজেক্ট",
    location: "Bhabanipur, Gazipur Sadar",
    tileUsed: "VISTA 5 LT & ELEGANT SLAB 1202",
    size: "30x60 cm & 60x120 cm",
    image: "/images/hero/rak-grandeur-room.jpg",
    featured: true,
  },
  {
    id: "uttara-modern-bathroom",
    title: "Obsidian & Emerald Vertical Shower Suite",
    titleBn: "উত্তরা মাস্টার বাথরুম ও ফ্রি-স্ট্যান্ডিং বাথটাব",
    location: "Sector 3, Uttara, Dhaka",
    tileUsed: "9GPBG SHINE STONE BLUE & RAK Sanitary",
    size: "30x60 cm + Luxury Basin & Commode",
    image: "/images/categories/bath-shower-tile.jpg",
  },
  {
    id: "tongi-living-terrazzo",
    title: "Contemporary Terrazzo Lounge & Living",
    titleBn: "টঙ্গী মডার্ন ড্রয়িং রুম প্রজেক্ট",
    location: "Tongi, Gazipur",
    tileUsed: "6GP TERRAZZO 1 WH (Full Body)",
    size: "60x60 cm (24x24 inch)",
    image: "/images/projects/terrazzo-living.jpg",
  },
  {
    id: "mymensingh-wood-dining",
    title: "Herringbone Wood-Art Dining & Studio",
    titleBn: "ময়মনসিংহ হেরিংবোন উড-আর্ট ডাইনিং",
    location: "Mymensingh Sadar",
    tileUsed: "9GPBG LINE WOOD BE & 12GP WEST WOOD",
    size: "30x60 cm & 60x120 cm",
    image: "/images/hero/hero-herringbone.jpg",
  },
  {
    id: "tangail-parking-courtyard",
    title: "Heavy-Duty Vitrified Car Parking & Driveway",
    titleBn: "টাঙ্গাইল কমার্শিয়াল কার পার্কিং ও গ্যারেজ",
    location: "Tangail Sadar",
    tileUsed: "GP101 GDM / GLM Parking Tiles (10-13mm)",
    size: "30x30 cm & 40x40 cm",
    image: "/images/projects/parking-outdoor.jpg",
  },
];

// Complete Size & Series Directory from Pages 3, 4, 5 of the uploaded RAK Ceramics PDF
export const RAK_SIZE_INDEX = [
  {
    type: "Ceramic Wall Tiles (সিরামিক ওয়াল টাইলস)",
    standard: "BDS ISO 13006:2021 (Group BIII - GL)",
    sizes: [
      { sizeCm: "30x90 cm", sizeInch: "12x36\"", series: ["Premija Collection"], pages: "1–3" },
      { sizeCm: "25x70 cm", sizeInch: "10x28\"", series: ["Paris Series", "Berlin Series", "Turin Series", "Dallas Series", "Diana Series", "Eden Series"], pages: "4–6" },
      { sizeCm: "30x60 cm", sizeInch: "12x24\"", series: ["Aston Series", "Jordana Series", "Vivid Collection", "Stone Art", "Suger Series"], pages: "7–20" },
      { sizeCm: "30x50.5 cm", sizeInch: "12x20\"", series: ["Vivid Collection", "Premium Collection", "Emir Series"], pages: "21–28" },
      { sizeCm: "25x40 cm", sizeInch: "10x16\"", series: ["Kitchen & Bathroom Wall Tiles"], pages: "29–32" },
      { sizeCm: "20x30 cm", sizeInch: "8x12\"", series: ["Victoria Series", "Classic Wall Tiles"], pages: "33–37" },
      { sizeCm: "20x7.5 & 30.5x7.5 cm", sizeInch: "Cladding", series: ["Exterior Ceramic & Rustic Cladding"], pages: "38" },
    ],
  },
  {
    type: "Porcelain Wall & Floor Tiles (পোর্সেলিন ও গ্রানাইট টাইলস)",
    standard: "BDS ISO 13006:2021 (Group BIa - GL, Water Absorption <= 0.1%)",
    sizes: [
      { sizeCm: "30x60 cm", sizeInch: "12x24\"", series: ["Rocker Series", "Hard Rock Collections", "Glaze Rustic", "RAK Tread (Self Embossed)", "Bull-nose (with Groove)", "Vista Series (Mirror Polish)"], pages: "39–53" },
      { sizeCm: "60x120 cm", sizeInch: "24x48\"", series: ["Elegant Slab Series", "Jaynamaj Slab", "Imperial Silk Series (Satin Matt)", "Rocker Slab Series", "Glaze Rustic Series", "Wooden Slab Series"], pages: "55–64" },
      { sizeCm: "80x80 cm", sizeInch: "32x32\"", series: ["Double Charge", "Rocker Series", "Lapato Series (Semi-Polished)", "Elegant Alpha (Mirror Polish)"], pages: "65–75" },
      { sizeCm: "60x60 cm", sizeInch: "24x24\"", series: ["Double Charge", "Stonechips", "Terrazzo", "Elegant Series", "Jaynamaj Tiles", "Classic Series", "Classic Super Series", "Apollo Series", "Salt & Pepper", "Dura Anti-Skid", "Wood Art", "Concrete Series", "Cementina Series", "Glaze Rustic"], pages: "76–97" },
      { sizeCm: "40x40 cm", sizeInch: "16x16\"", series: ["Industrial Tiles (Heavy Duty 13mm)", "High Tech Porcelain", "GEO Series", "Glaze Homogeneous", "Salt & Pepper (Glaze & SG)", "Industrial Marking Tiles"], pages: "98–106" },
      { sizeCm: "30.5x30.5 cm", sizeInch: "12x12\"", series: ["Salt & Pepper (Glaze)", "Step Tiles"], pages: "107" },
      { sizeCm: "30x30 cm", sizeInch: "12x12\"", series: ["Industrial Tiles (10mm)", "Full Body Vitrified Parking Tiles", "Glaze Rustic"], pages: "106, 108" },
    ],
  },
];

// Technical Characteristics from Page 115 of the uploaded PDF
export const TECHNICAL_SPECS_PORCELAIN = [
  { property: "Length & Width", method: "BS EN ISO 10545-2", standard: "+/- 0.6%", rakRectified: "+/- 0.1%", rakNonRectified: "+/- 0.3%" },
  { property: "Thickness", method: "BS EN ISO 10545-2", standard: "+/- 5.0%", rakRectified: "+/- 5.0%", rakNonRectified: "+/- 5.0%" },
  { property: "Water Absorption", method: "BS EN ISO 10545-3", standard: "<= 0.5%", rakRectified: "<= 0.4% (BIa <= 0.1%)", rakNonRectified: "<= 0.4%" },
  { property: "Modulus of Rupture", method: "BS EN ISO 10545-4", standard: ">= 35 N/mm2", rakRectified: ">= 40–50 N/mm2", rakNonRectified: ">= 40 N/mm2" },
  { property: "Breaking Strength", method: "BS EN ISO 10545-4", standard: ">= 1300 N", rakRectified: ">= 1500 N", rakNonRectified: ">= 1600 N" },
  { property: "Surface Abrasion Resistance", method: "BS EN ISO 10545-6", standard: "Manufacturer Class", rakRectified: "PEI Class 2 – 5", rakNonRectified: "PEI Class 2 – 5" },
  { property: "Frost, Crazing & Chemical Resistance", method: "BS EN ISO 10545-11/12/13", standard: "No visible defect", rakRectified: "No crazing / No visible damage", rakNonRectified: "No crazing / No visible damage" },
  { property: "Resistance to Stains", method: "BS EN ISO 10545-14", standard: "Manufacturer Class", rakRectified: "Stain removed Min. Class 4", rakNonRectified: "Stain removed Min. Class 4" },
];

export const FACEBOOK_REVIEWS = [
  {
    author: "মোঃ আব্দুল্লাহ আল নোমান",
    date: "October 2026",
    source: "Facebook Review (@brotherstilesbd)",
    quote: "Ami apnader Showroom A goto masei aschilam. Apnader Sokol Staff onek valo. Apnader Appayon tao valo chi. Product Quality best❤️",
    translation: "আমি আপনাদের শোরুমে গত মাসেই এসেছিলাম। আপনাদের সকল স্টাফ অনেক ভালো, আপ্যায়নও দারুণ ছিল এবং প্রোডাক্ট কোয়ালিটি বেস্ট!",
  },
  {
    author: "Hatem Hasan",
    date: "September 2026",
    source: "Facebook Post (@brotherstilesbd)",
    quote: "Nice ❤️ — ঘরের সৌন্দর্যে মানসম্মত ব্রাদার্স টাইলস এন্ড স্যানিটারী মার্ট নতুন সংযোজন!",
    translation: "গাজীপুরের ভবানীপুরে আধুনিক ও মানসম্মত টাইলস এবং স্যানিটারি পণ্যের বিশ্বস্ত শোরুম।",
  },
  {
    author: "Jobayet Hasan & Showroom Visitors",
    date: "September 2026",
    source: "Facebook Community (@brotherstilesbd)",
    quote: "একটা সুন্দর ঘর শুধু সুন্দর টাইলস দিয়ে তৈরি হয় না—প্রয়োজন হয় সঠিক পরিকল্পনা, সঠিক মাপ আর সঠিক টাইলস নির্বাচনের।",
    translation: "বাসার মাপ/প্ল্যান অনুযায়ী ফ্রি ডিজাইন ও হিসাব এবং পাইকারি দামে খুচরা ক্রয়ের সেরা ঠিকানা।",
  },
];

// ============================================================================
// PDF CATALOG 974 + ALL PRODUCTS (974 SKUs)
// ============================================================================
export { RAK_CATALOG_974, PDF_CATALOG_974 };
export type { PdfTileRecord };

export const ALL_PRODUCTS: ProductItem[] = RAK_CATALOG_974;

export const PDF_EXTRACTION_SUMMARY = {
  totalPdfPages: 116,
  productPages: 107,
  nonProductPages: 9,
  totalExtractedTiles: 974,
  enhancedResolution: "2000px on longest side (Lanczos-4 + Bilateral Denoise + Unsharp Mask)",
  googleDriveRootFolder: "https://drive.google.com/drive/folders/1RW42pUeUtlW2UOw5mBVmjR7Tx-LF9sPm",
  excelIndexDriveUrl: "https://drive.google.com/file/d/10Tb8z-a7iEocwg5dDqLUj5ZSNyXXjswn/view?usp=drivesdk",
  categories: [
    {
      id: "01 - Ceramic Wall Tiles",
      nameEn: "01 - Ceramic Wall Tiles",
      nameBn: "সিরামিক ওয়াল টাইলস (Ceramic Wall Tiles)",
      tileCount: 478,
      pdfPages: "Pages 7–43 (Catalog Pages 1–37)",
      sizes: ["30x90", "25x70", "30x60", "30x50.5", "25x40", "20x30"],
      series: [
        "Premija Collection",
        "Premium Collection - Paris & Berlin Series",
        "Premium Collection - Turin & Dallas Series",
        "Premium Collection - Dallas, Diana & Eden Series",
        "Premium Collection - Aston Series",
        "Premium Collection - Jordana Series",
        "Premium Collection - Vivid Collection",
        "Premium Collection - Stone Art",
        "Premium Collection - Suger Series",
        "Premium Collection - Vivid Collection (30x50.5)",
        "Premium Collection (30x50.5)",
        "Premium Collection - Emir Series",
        "Wall Tiles (25x40)",
        "Victoria Series",
        "Wall Tiles (20x30)",
      ],
      driveFolderUrl: "https://drive.google.com/drive/folders/11h_LAQuGpDdjFxRp9snSvKz3rYOhvYUr",
    },
    {
      id: "02 - Ceramic Cladding Tiles",
      nameEn: "02 - Ceramic Cladding Tiles",
      nameBn: "সিরামিক ও রাস্টিক ক্লাডিং টাইলস (Cladding Exterior)",
      tileCount: 7,
      pdfPages: "Page 44 (Catalog Page 38)",
      sizes: ["20x7.5", "30.5x7.5"],
      series: ["Ceramics & Rustic Cladding"],
      driveFolderUrl: "https://drive.google.com/drive/folders/1ixKXEO2x9s6WfCafuCZmk0nGTsOedUPf",
    },
    {
      id: "03 - Porcelain Wall & Floor Tiles",
      nameEn: "03 - Porcelain Wall & Floor Tiles",
      nameBn: "পোরসেলিন ওয়াল ও ফ্লোর টাইলস (30x60 Gres Porcellanato)",
      tileCount: 122,
      pdfPages: "Pages 45–54, 57–59, 100 (Catalog Pages 39–48, 51–53, 94)",
      sizes: ["30x60"],
      series: [
        "Rocker Series (30x60)",
        "Hard Rock Collections",
        "Glaze Rustic (30x60)",
        "Vista Series",
        "Wood Art Collection (30x60)",
      ],
      driveFolderUrl: "https://drive.google.com/drive/folders/1S8NFwxJ8o-rwtul-bkJ76JsQL0rsvsQD",
    },
    {
      id: "04 - Porcelain Floor Tiles",
      nameEn: "04 - Porcelain Floor Tiles",
      nameBn: "পোরসেলিন ফ্লোর ও গ্র্যান্ড স্ল্যাব টাইলস (60x120, 80x80, 60x60, 40x40)",
      tileCount: 312,
      pdfPages: "Pages 61–99, 101–103, 106–111 (Catalog Pages 55–93, 95–97, 100–105)",
      sizes: ["60x120", "80x80", "60x60", "40x40"],
      series: [
        "Elegant Slab Series",
        "Imperial Silk Series",
        "Rocker Slab Series",
        "Rocker Slab & Glaze Rustic Series",
        "Wooden Slab Series",
        "Double Charge (80x80)",
        "Rocker Series (80x80)",
        "Lapato Tiles (80x80)",
        "Elegant Alpha",
        "Double Charge (60x60)",
        "Double Charge & Stonechips (60x60)",
        "Terrazzo",
        "Elegant Series (60x60)",
        "Classic Series",
        "Classic Super Series",
        "Apollo Series",
        "Salt & Pepper / Dura (60x60)",
        "Wood Art Collection (60x60)",
        "Concrete & Cementina Series",
        "Glaze Rustic (60x60)",
        "High Tech Porcelain & GEO Series",
        "Glaze Homogeneous (40x40)",
        "Salt & Pepper (Glaze) & SG (40x40)",
      ],
      driveFolderUrl: "https://drive.google.com/drive/folders/1ONwWz9cNpCM-BwqBjHVheq9X6Pw5VQ7L",
    },
    {
      id: "05 - Porcelain Industrial, Step & Parking Tiles",
      nameEn: "05 - Porcelain Industrial, Step & Parking Tiles",
      nameBn: "ইন্ডাস্ট্রিয়াল, সিঁড়ি (Step/Tread) ও পার্কিং টাইলস",
      tileCount: 55,
      pdfPages: "Pages 55–56, 104–105, 112–114 (Catalog Pages 49–50, 98–99, 106–108)",
      sizes: ["30x60", "40x40", "30.5x30.5", "30x30"],
      series: [
        "RAK Tread Tiles (Self Embossed)",
        "Bull-nose with Groove",
        "Industrial Tiles Heavy Duty 13mm",
        "Industrial Tiles 10mm & Marking Tiles",
        "Salt & Pepper (Glaze) & Step Tiles (30.5x30.5)",
        "Parking Tiles & Glaze Rustic (30x30)",
      ],
      driveFolderUrl: "https://drive.google.com/drive/folders/1xh7UQYsgubHBwsbpOAUZ5RtraWDVBZgf",
    },
  ],
};
