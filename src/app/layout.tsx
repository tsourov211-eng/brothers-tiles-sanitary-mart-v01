import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import ScrollToTop from "@/components/ScrollToTop";
import { BUSINESS_INFO } from "@/data/siteData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: `${BUSINESS_INFO.fullName} | ${BUSINESS_INFO.tagline}`,
  description: `${BUSINESS_INFO.tagline} — ${BUSINESS_INFO.subLine}. Authorized Dealer of RAK Ceramics, Akij, DBL, Fu-Wang & Abul Khair Tiles, Basin, Commode, Sanitary & Bathroom Accessories at ${BUSINESS_INFO.addressExact}.`,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  keywords: [
    "Brother's Tiles & Sanitary Mart",
    "ব্রাদার্স টাইলস এন্ড স্যানিটারি মার্ট",
    "Gazipur Tiles Showroom",
    "RAK Ceramics Gazipur",
    "Bhabanipur Tiles Showroom",
    "Tiles Basin Commode Sanitary Gazipur",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="overflow-x-hidden">
      <body className="min-h-screen flex flex-col bg-white text-obsidian selection:bg-gold selection:text-obsidian overflow-x-hidden w-full">
        <ShopProvider>
          <Header />
          <main className="flex-1 w-full overflow-x-hidden">{children}</main>
          <QuoteDrawer />
          <ScrollToTop />
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
