export interface MegaMenuItem {
  name: string;
  nameBn?: string;
  href: string;
  badge?: string;
  colorHex?: string;
  isBold?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  titleBn?: string;
  items: MegaMenuItem[];
  viewAll?: {
    name: string;
    href: string;
  };
}

export interface MegaMenuCategory {
  id: string;
  label: string;
  href: string;
  columns: MegaMenuColumn[];
  featuredBanner?: {
    badge: string;
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
    ctaHref: string;
  };
}

export const MEGA_MENU_DATA: Record<string, MegaMenuCategory> = {
  new: {
    id: "new",
    label: "NEW ARRIVALS",
    href: "/catalog?filter=new",
    columns: [
      {
        title: "NEW TILE COLLECTIONS",
        titleBn: "নতুন টাইলস কালেকশন",
        items: [
          { name: "Premija 7003 Shell Mosaic (30x90)", href: "/catalog?q=Premija", badge: "HOT" },
          { name: "Elegant Slab 1211 Blue Gold Onyx", href: "/catalog?q=Elegant", badge: "NEW" },
          { name: "9GPBG Basic Black Grandeur (60x120)", href: "/catalog?q=Basic+Black" },
          { name: "Line Wood Be Strip Series", href: "/catalog?q=Line+Wood" },
          { name: "6608 Sugar LGR Carving Glaze", href: "/catalog?q=Sugar" },
          { name: "Jaynamaj Slab Gold Border Edition", href: "/catalog?q=Jaynamaj", badge: "EXCLUSIVE" },
        ],
        viewAll: { name: "All New Arrival Tiles →", href: "/catalog?filter=new" },
      },
      {
        title: "NEW SANITARY & BASINS",
        titleBn: "নতুন স্যানিটারি ও বেসিন",
        items: [
          { name: "Royal Gold Rim Table Top Basin", href: "/catalog?category=Basin", badge: "TRENDING" },
          { name: "RAK Venice One-Piece Luxury Commode", href: "/catalog?category=Commode" },
          { name: "Matte Black Designer Cabinet Vanity", href: "/catalog?category=Basin" },
          { name: "Slim Rimless Tornado Flush Commode", href: "/catalog?category=Commode" },
          { name: "Sensor Touch Smart LED Mirror Set", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Concealed Thermostatic Shower Mixer", href: "/catalog?category=Bathroom+Accessories" },
        ],
        viewAll: { name: "All New Sanitary Wares →", href: "/catalog?category=Sanitary" },
      },
      {
        title: "GRAND SLABS & FORMATS",
        titleBn: "লাক্সারি স্ল্যাব সিরিজ",
        items: [
          { name: "60x120 cm (24x48\") Mirror Polish Slabs", href: "/catalog?size=60x120+cm" },
          { name: "80x80 cm (32x32\") Super White Floor", href: "/catalog?size=80x80+cm" },
          { name: "60x60 cm (24x24\") Gres Porcellanato", href: "/catalog?size=60x60+cm" },
          { name: "30x90 cm (12x36\") Luxury Wall Panels", href: "/catalog?size=30x90+cm" },
          { name: "Continuous Marble Bookmatch Pattern", href: "/catalog?q=Marble" },
        ],
        viewAll: { name: "Browse All Grand Slabs →", href: "/catalog?size=60x120+cm" },
      },
      {
        title: "SHOWROOM EXCLUSIVES",
        titleBn: "শোরুম স্পেশাল অফার",
        items: [
          { name: "Gazipur Wholesale Bulk Rate", href: "/contact", isBold: true },
          { name: "Free Floor Plan Estimation & Design", href: "/calculator", isBold: true },
          { name: "Home Delivery (Gazipur, Tongi, Uttara)", href: "/about" },
          { name: "Factory Direct 100% A-Grade Guarantee", href: "/about" },
          { name: "Direct WhatsApp Quotation Support", href: "https://wa.me/8801625073614" },
        ],
        viewAll: { name: "Showroom Map & Contact →", href: "/contact" },
      },
    ],
  },

  tiles: {
    id: "tiles",
    label: "WALL & FLOOR TILES",
    href: "/catalog?category=Tiles",
    columns: [
      {
        title: "SHOP BY APPLICATION",
        titleBn: "ব্যবহার অনুযায়ী টাইলস",
        items: [
          { name: "Floor Tiles (ফ্লোর টাইলস)", href: "/catalog?category=Tiles" },
          { name: "Wall Tiles (ওয়াল টাইলস)", href: "/catalog?category=Tiles" },
          { name: "Kitchen & Backsplash (কিচেন)", href: "/catalog?category=Tiles" },
          { name: "Bathroom & Shower (বাথরুম)", href: "/catalog?category=Tiles" },
          { name: "Outdoor & Stairs (সিঁড়ি ও পার্কিং)", href: "/catalog?category=Tiles" },
          { name: "Living Room Slabs (লিভিং রুম)", href: "/catalog?size=60x120+cm" },
          { name: "Commercial & Office (কমার্শিয়াল)", href: "/catalog?size=80x80+cm" },
        ],
        viewAll: { name: "All Applications →", href: "/catalog?category=Tiles" },
      },
      {
        title: "SHOP BY SIZE & FORMAT",
        titleBn: "সাইজ ও ফরম্যাট অনুযায়ী",
        items: [
          { name: "60x120 cm (24x48\") Grand Slab", href: "/catalog?size=60x120+cm", badge: "POPULAR" },
          { name: "80x80 cm (32x32\") Large Format", href: "/catalog?size=80x80+cm" },
          { name: "60x60 cm (24x24\") Vitrified Floor", href: "/catalog?size=60x60+cm" },
          { name: "30x90 cm (12x36\") Luxury Wall", href: "/catalog?size=30x90+cm" },
          { name: "30x60 cm (12x24\") Standard Wall", href: "/catalog?size=30x60+cm" },
          { name: "25x70 cm (10x28\") Wall Tiles", href: "/catalog?size=25x40+cm" },
          { name: "25x40 cm (10x16\") Compact Wall", href: "/catalog?size=25x40+cm" },
        ],
        viewAll: { name: "All Sizes & Formats →", href: "/catalog?category=Tiles" },
      },
      {
        title: "SHOP BY BRAND & MATERIAL",
        titleBn: "ব্র্যান্ড ও উপাদান অনুযায়ী",
        items: [
          { name: "RAK Ceramics (Flagship)", href: "/catalog?brand=RAK", badge: "AUTHORIZED" },
          { name: "Akij Ceramics", href: "/catalog?brand=Akij" },
          { name: "DBL Ceramics", href: "/catalog?brand=DBL" },
          { name: "Fu-Wang Ceramic", href: "/catalog?brand=Fu-Wang" },
          { name: "Fresh Ceramics", href: "/catalog?brand=Fresh" },
          { name: "Mir Ceramic", href: "/catalog?brand=Mir" },
          { name: "Glazed Porcelain / Gres Porcellanato", href: "/catalog?category=Tiles" },
          { name: "Ceramic Glazed Wall Tiles", href: "/catalog?category=Tiles" },
        ],
        viewAll: { name: "All Brands & Materials →", href: "/catalog?category=Tiles" },
      },
      {
        title: "SHOP BY STYLE & FINISH",
        titleBn: "স্টাইল ও ফিনিশ অনুযায়ী",
        items: [
          { name: "Mirror Polish / High Gloss", href: "/catalog?q=Polish", badge: "LUXURY" },
          { name: "Carving & Sugar Glaze", href: "/catalog?q=Carving" },
          { name: "Matt & Satin Non-Slip", href: "/catalog?q=Matt" },
          { name: "Marble & Onyx Vein", href: "/catalog?q=Onyx" },
          { name: "Natural Wood & Strip", href: "/catalog?q=Wood" },
          { name: "Rustic & Concrete Texture", href: "/catalog?q=Rustic" },
          { name: "Subway & Mosaic Accent", href: "/catalog?q=Mosaic" },
        ],
        viewAll: { name: "All Styles & Looks →", href: "/catalog?category=Tiles" },
      },
      {
        title: "SHOP BY COLOR",
        titleBn: "কালার কালেকশন",
        items: [
          { name: "White & Gold (সাদা-গোল্ড)", href: "/catalog?color=white-gold", colorHex: "#EAE4D7" },
          { name: "Beige & Cream (বেইজ)", href: "/catalog?color=white-gold", colorHex: "#D8CEB9" },
          { name: "Black & Anthracite (কালো)", href: "/catalog?color=black", colorHex: "#141414" },
          { name: "Royal Blue & Grey (নীল)", href: "/catalog?color=blue", colorHex: "#58788E" },
          { name: "Emerald Green (সবুজ)", href: "/catalog?color=green", colorHex: "#3E5A4C" },
          { name: "Terracotta & Copper (টেরাকোটা)", href: "/catalog?color=terracotta", colorHex: "#9E5B40" },
          { name: "Natural Brown (উড ব্রাউন)", href: "/catalog?color=wood", colorHex: "#8A6240" },
          { name: "Cool Grey (সিলভার গ্রে)", href: "/catalog?color=blue", colorHex: "#9AA0A6" },
        ],
        viewAll: { name: "All Colors Palette →", href: "/catalog" },
      },
    ],
  },

  ceramics: {
    id: "ceramics",
    label: "CERAMICS",
    href: "/catalog?category=Ceramics",
    columns: [
      {
        title: "CERAMIC WALL COLLECTIONS",
        titleBn: "সিরামিক ওয়াল কালেকশন",
        items: [
          { name: "30x90 cm Premija Luxury Wall (30x90)", href: "/catalog?size=30x90+cm", badge: "FLAGSHIP" },
          { name: "30x60 cm Standard Ceramic Wall", href: "/catalog?size=30x60+cm", badge: "POPULAR" },
          { name: "25x70 cm European Format Cladding", href: "/catalog?size=25x70+cm" },
          { name: "25x40 cm Kitchen & Bath Ceramic", href: "/catalog?size=25x40+cm" },
          { name: "20x30 cm Classic Ceramic Subway", href: "/catalog?size=20x30+cm" },
        ],
        viewAll: { name: "All Ceramic Wall Tiles →", href: "/catalog?category=Ceramics" },
      },
      {
        title: "CERAMIC CLADDING & SPECIALS",
        titleBn: "এক্সটেরিয়র ও ক্ল্যাডিং",
        items: [
          { name: "02 - Ceramic Cladding Exterior", href: "/catalog?category=02+-+Ceramic+Cladding+Tiles", badge: "NEW" },
          { name: "Rustic 3D Stone Ceramic Facade", href: "/catalog?q=Rustic" },
          { name: "Glazed Decorative Border Series", href: "/catalog?q=Border" },
          { name: "Kitchen Backsplash Ceramic Mosaic", href: "/catalog?q=Mosaic" },
        ],
        viewAll: { name: "All Ceramic Cladding →", href: "/catalog?category=Ceramics" },
      },
      {
        title: "TOP CERAMIC BRANDS",
        titleBn: "শীর্ষ সিরামিকস ব্র্যান্ড",
        items: [
          { name: "RAK Ceramics (Official Flagship)", href: "/catalog?brand=RAK", badge: "OFFICIAL" },
          { name: "Akij Ceramics", href: "/catalog?brand=Akij" },
          { name: "DBL Ceramics", href: "/catalog?brand=DBL" },
          { name: "Fresh Ceramics", href: "/catalog?brand=Fresh" },
          { name: "Fu-Wang Ceramic", href: "/catalog?brand=Fu-Wang" },
        ],
        viewAll: { name: "Explore All Brands →", href: "/catalog?brand=RAK" },
      },
      {
        title: "SHOWROOM ASSISTANCE",
        titleBn: "শোরুম সহায়তা ও সার্ভিস",
        items: [
          { name: "Free Tile Calculator & Sizing", href: "/calculator", isBold: true },
          { name: "Gazipur Bhawanipur Showroom Map", href: "/contact", isBold: true },
          { name: "Direct WhatsApp Quotation Support", href: "https://wa.me/8801625073614" },
        ],
        viewAll: { name: "Showroom Map & Contact →", href: "/contact" },
      },
    ],
  },

  basin: {
    id: "basin",
    label: "BASIN",
    href: "/catalog?category=Basin",
    columns: [
      {
        title: "BASIN TYPES",
        titleBn: "বেসিনের ধরন",
        items: [
          { name: "Table Top Basins (টেবিল টপ)", href: "/catalog?category=Basin", badge: "POPULAR" },
          { name: "Vanity Cabinet Basins (ক্যাবিনেট)", href: "/catalog?category=Basin" },
          { name: "Pedestal Basins (পেডেস্টাল)", href: "/catalog?category=Basin" },
          { name: "Half Pedestal Wall Hung", href: "/catalog?category=Basin" },
          { name: "Under Counter & Drop-in", href: "/catalog?category=Basin" },
          { name: "Corner & Compact Basins", href: "/catalog?category=Basin" },
        ],
        viewAll: { name: "View All Basins →", href: "/catalog?category=Basin" },
      },
      {
        title: "DESIGN & LUXURY FINISHES",
        titleBn: "ডিজাইন ও কালার ফিনিশ",
        items: [
          { name: "Gold Rim Art Basins", href: "/catalog?category=Basin", badge: "ROYAL" },
          { name: "Matte Black & Matte White", href: "/catalog?category=Basin" },
          { name: "Marble Pattern Porcelain Basins", href: "/catalog?category=Basin" },
          { name: "Oval & Round Contemporary", href: "/catalog?category=Basin" },
          { name: "Square & Sharp Rectangular", href: "/catalog?category=Basin" },
          { name: "Dual-Tone Contrast Basins", href: "/catalog?category=Basin" },
        ],
        viewAll: { name: "All Basin Designs →", href: "/catalog?category=Basin" },
      },
      {
        title: "AUTHORIZED BRANDS",
        titleBn: "ব্র্যান্ডসমূহ",
        items: [
          { name: "RAK Ceramics Sanitary Ware", href: "/catalog?category=Basin&brand=RAK", badge: "FLAGSHIP" },
          { name: "Akij Sanitary Ware", href: "/catalog?category=Basin&brand=Akij" },
          { name: "Abul Khair Ceramics", href: "/catalog?category=Basin&brand=Abul+Khair" },
          { name: "Milano & Imported Collections", href: "/catalog?category=Basin" },
          { name: "100% Vitreous China Guarantee", href: "/about" },
        ],
        viewAll: { name: "All Sanitary Brands →", href: "/catalog?category=Basin" },
      },
      {
        title: "FAUCETS & ACCESSORIES",
        titleBn: "বেসিন কল ও ফিটিংস",
        items: [
          { name: "High-Neck Table Top Mixers", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Concealed Wall Mounted Faucets", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Pop-up Waste & Brass Bottle Traps", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Smart Touch LED Bathroom Mirrors", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Waterproof PVC Vanity Cabinets", href: "/catalog?category=Basin" },
        ],
        viewAll: { name: "All Basin Fixtures →", href: "/catalog?category=Bathroom+Accessories" },
      },
    ],
  },

  commode: {
    id: "commode",
    label: "COMMODE",
    href: "/catalog?category=Commode",
    columns: [
      {
        title: "COMMODE TYPES",
        titleBn: "কমোডের ধরন",
        items: [
          { name: "One-Piece High Commode (ওয়ান পিস)", href: "/catalog?category=Commode", badge: "BESTSELLER" },
          { name: "Two-Piece High Commode (টু পিস)", href: "/catalog?category=Commode" },
          { name: "Wall Hung Concealed Commode", href: "/catalog?category=Commode", badge: "MODERN" },
          { name: "Asian Squatting Pan (লো-কমোড)", href: "/catalog?category=Sanitary" },
          { name: "Smart Sensor Commode Set", href: "/catalog?category=Commode" },
          { name: "Junior & Children Commode", href: "/catalog?category=Commode" },
        ],
        viewAll: { name: "All Commode Models →", href: "/catalog?category=Commode" },
      },
      {
        title: "FLUSH & HYGIENE TECHNOLOGY",
        titleBn: "ফ্লাশ প্রযুক্তি ও বৈশিষ্ট্য",
        items: [
          { name: "Rimless Tornado Flushing", href: "/catalog?category=Commode", badge: "HYGIENIC" },
          { name: "Dual-Flush 3L / 6L Water Saver", href: "/catalog?category=Commode" },
          { name: "Soft-Close UF Seat Covers", href: "/catalog?category=Commode" },
          { name: "S-Trap (300mm / 12\" Floor Rough)", href: "/catalog?category=Commode" },
          { name: "P-Trap (180mm Wall Discharge)", href: "/catalog?category=Commode" },
          { name: "Nano Glaze Anti-Bacterial Surface", href: "/catalog?category=Commode" },
        ],
        viewAll: { name: "Compare Flush Types →", href: "/catalog?category=Commode" },
      },
      {
        title: "BRANDS & MODELS",
        titleBn: "ব্র্যান্ড ও মডেল",
        items: [
          { name: "RAK Ceramics Venice & Compact", href: "/catalog?category=Commode&brand=RAK" },
          { name: "Akij Elite & Royal Series", href: "/catalog?category=Commode&brand=Akij" },
          { name: "Abul Khair Diamond Series", href: "/catalog?category=Commode" },
          { name: "Mir Ceramics Sanitary", href: "/catalog?category=Commode" },
          { name: "BSTI Certified Standards (BDS 1162)", href: "/about" },
        ],
        viewAll: { name: "All Brands Catalog →", href: "/catalog?category=Commode" },
      },
      {
        title: "CONCEALED TANKS & PARTS",
        titleBn: "ট্যাংক, ফ্লাশ ও স্পেয়ার পার্টস",
        items: [
          { name: "Concealed In-Wall Cisterns", href: "/catalog?category=Sanitary" },
          { name: "Dual Push Flush Plates (Chrome/Gold)", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Heavy Duty Soft Close Seat Covers", href: "/catalog?category=Commode" },
          { name: "Brass Health Faucet & Jet Sprays", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Wax Rings & Connection Hoses", href: "/catalog?category=Sanitary" },
        ],
        viewAll: { name: "Sanitary Spare Parts →", href: "/catalog?category=Sanitary" },
      },
    ],
  },

  sanitary: {
    id: "sanitary",
    label: "SANITARY",
    href: "/catalog?category=Sanitary",
    columns: [
      {
        title: "SANITARY WARE",
        titleBn: "স্যানিটারি ওয়্যার",
        items: [
          { name: "Long Pan / Asian Toilet (লং প্যান)", href: "/catalog?category=Sanitary" },
          { name: "Orissa Pan with Foot Rest", href: "/catalog?category=Sanitary" },
          { name: "Sensor & Manual Urinals (ইউরিনাল)", href: "/catalog?category=Sanitary" },
          { name: "Plastic & Ceramic Cistern Tanks", href: "/catalog?category=Sanitary" },
          { name: "Bidet & Floor Mount Foot Sprays", href: "/catalog?category=Sanitary" },
          { name: "Commercial & School Toilets", href: "/catalog?category=Sanitary" },
        ],
        viewAll: { name: "All Sanitary Ware →", href: "/catalog?category=Sanitary" },
      },
      {
        title: "PLUMBING & CONCEALED FIXTURES",
        titleBn: "প্লাম্বিং ও ড্রেনেজ সিস্টেম",
        items: [
          { name: "In-Wall Concealed Flush Tanks", href: "/catalog?category=Sanitary" },
          { name: "SS Anti-Odor Floor Drains", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Angle Stop Cocks & Two-Way Valves", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Flexible SS Water Inlets & Pipes", href: "/catalog?category=Sanitary" },
          { name: "PVC/CPVC High-Pressure Fittings", href: "/catalog?category=Sanitary" },
        ],
        viewAll: { name: "Plumbing Fixtures →", href: "/catalog?category=Sanitary" },
      },
      {
        title: "BRANDS & CERTIFICATIONS",
        titleBn: "ব্র্যান্ড ও কোয়ালিটি",
        items: [
          { name: "RAK Ceramics ISO 9001:2015", href: "/about" },
          { name: "Akij Certified Vitreous China", href: "/about" },
          { name: "Abul Khair Ceramics Sanitary", href: "/catalog?category=Sanitary" },
          { name: "10-Year Porcelain Warranty", href: "/about" },
          { name: "BSTI Approved Standards", href: "/about" },
        ],
        viewAll: { name: "Showroom Specs & Certs →", href: "/about" },
      },
      {
        title: "WHOLESALE & PROJECT SUPPLY",
        titleBn: "পাইকারি ও প্রজেক্ট সরবরাহ",
        items: [
          { name: "Apartment & Building Bulk Rates", href: "/contact", isBold: true },
          { name: "Contractor & Architect Discounts", href: "/contact", isBold: true },
          { name: "Gazipur & Dhaka Site Delivery", href: "/about" },
          { name: "Instant Quotation on WhatsApp", href: "https://wa.me/8801625073614" },
        ],
        viewAll: { name: "Contact for Project Rates →", href: "/contact" },
      },
    ],
  },

  accessories: {
    id: "accessories",
    label: "BATHROOM ACCESSORIES",
    href: "/catalog?category=Bathroom+Accessories",
    columns: [
      {
        title: "SHOWER & FAUCETS",
        titleBn: "শাওয়ার ও আধুনিক কল",
        items: [
          { name: "Overhead Rain Showers (৮x৮, ১০x১০)", href: "/catalog?category=Bathroom+Accessories", badge: "TREND" },
          { name: "Concealed Hot & Cold Shower Mixers", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Basin Mixer Taps (বেসিন মিক্সার)", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Pillar Cocks & Bib Cocks (সিপি কল)", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Hand Showers with Flexible Hose", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Health Faucets / Push Sprays", href: "/catalog?category=Bathroom+Accessories" },
        ],
        viewAll: { name: "All Shower & Faucets →", href: "/catalog?category=Bathroom+Accessories" },
      },
      {
        title: "COMPLETE CP BATH SETS",
        titleBn: "সম্পূর্ণ সিপি বাথরুম সেট",
        items: [
          { name: "7-Piece Luxury CP Bathroom Sets", href: "/catalog?category=Bathroom+Accessories", badge: "BEST VALUE" },
          { name: "Towel Rails & Double Towel Bars", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Corner Glass & SS Double Shelves", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Double Soap Dish & Brush Tumbler", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Robe Hooks & Heavy Duty Pins", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Toilet Paper & Phone Holder", href: "/catalog?category=Bathroom+Accessories" },
        ],
        viewAll: { name: "View All CP Sets →", href: "/catalog?category=Bathroom+Accessories" },
      },
      {
        title: "COLORS & METALLIC FINISHES",
        titleBn: "কালার ফিনিশ",
        items: [
          { name: "Mirror Chrome Plated (ক্লাসিক ক্রোম)", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Royal Gold & Rose Gold (গোল্ডেন)", href: "/catalog?category=Bathroom+Accessories", badge: "LUXURY" },
          { name: "Matte Black (মডার্ন ম্যাট ব্ল্যাক)", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Brushed Nickel & Gunmetal", href: "/catalog?category=Bathroom+Accessories" },
          { name: "SUS 304 Solid Stainless Steel", href: "/catalog?category=Bathroom+Accessories" },
        ],
        viewAll: { name: "All Finishes & Colors →", href: "/catalog?category=Bathroom+Accessories" },
      },
      {
        title: "MIRRORS & VANITIES",
        titleBn: "মিরর ও ক্যাবিনেট",
        items: [
          { name: "Smart Touch LED Backlit Mirrors", href: "/catalog?category=Bathroom+Accessories", badge: "SMART" },
          { name: "Beveled Edge Luxury Glass Mirrors", href: "/catalog?category=Bathroom+Accessories" },
          { name: "Waterproof PVC Bathroom Cabinets", href: "/catalog?category=Basin" },
          { name: "Medicine Cabinets with Mirror", href: "/catalog?category=Bathroom+Accessories" },
        ],
        viewAll: { name: "All Mirrors & Cabinets →", href: "/catalog?category=Bathroom+Accessories" },
      },
    ],
  },
};
