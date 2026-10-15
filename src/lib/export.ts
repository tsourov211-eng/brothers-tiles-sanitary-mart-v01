import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { ProductItem, BUSINESS_INFO } from "@/data/siteData";

export function downloadOrderInvoicePDF(order: {
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: string;
  deliveryZone: string;
  subtotal: number;
  samplePromoDiscount?: number;
  tradeDiscount?: number;
  shippingCost?: number;
  totalAmount: number;
  paymentMethod?: string;
  createdAt: string;
  items: Array<{
    sku: string;
    name: string;
    itemType?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
}) {
  const doc = new jsPDF();

  // Obsidian Black + Metallic Gold Header
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 36, "F");
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1.2);
  doc.line(0, 36, 210, 36);

  doc.setTextColor(212, 175, 55);
  doc.setFontSize(17);
  doc.text("BROTHER'S TILES & SANITARY MART", 14, 15);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text("Gazipur's Trusted Tiles & Sanitary Showroom | 5,000+ Designs | Wholesale & Retail", 14, 22);
  doc.text(`${BUSINESS_INFO.addressExact} | Phone/WhatsApp: ${BUSINESS_INFO.mainPhone}`, 14, 29);

  doc.setTextColor(10, 10, 10);
  doc.setFontSize(13);
  doc.text(`OFFICIAL QUOTATION / INVOICE #${order.orderNumber}`, 14, 48);
  doc.setFontSize(9.5);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 55);
  doc.text(`Customer: ${order.customerName} | Phone: ${order.customerPhone}`, 14, 61);
  doc.text(`Delivery Address: ${order.shippingAddress} (${order.deliveryZone})`, 14, 67);
  doc.text(`Payment Mode: ${order.paymentMethod || "COD / Showroom"}`, 14, 73);

  autoTable(doc, {
    startY: 79,
    head: [["Model Code", "Product Description", "Type", "Qty", "Unit Rate (BDT)", "Total (BDT)"]],
    body: order.items.map((item) => [
      item.sku,
      item.name,
      item.itemType === "SAMPLE" ? "Sample Swatch" : "Box / Unit",
      String(item.quantity),
      `TK ${item.unitPrice.toLocaleString()}`,
      `TK ${item.totalPrice.toLocaleString()}`,
    ]),
    headStyles: { fillColor: [10, 10, 10], textColor: [212, 175, 55] },
  });

  const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY || 130;
  doc.setFontSize(10);
  doc.text(`Subtotal: TK ${order.subtotal.toLocaleString()}`, 135, finalY + 12);
  if (order.tradeDiscount && order.tradeDiscount > 0) {
    doc.text(`Wholesale / Trade Discount (10%): -TK ${order.tradeDiscount.toLocaleString()}`, 135, finalY + 18);
  }
  doc.setFontSize(12);
  doc.text(`Net Payable: TK ${order.totalAmount.toLocaleString()}`, 135, finalY + 28);

  doc.setFontSize(8.5);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `Home Delivery Coverage: Gazipur, Tongi, Uttara, Dhaka, Mymensingh, Tangail & Surrounding Areas | Email: ${BUSINESS_INFO.email}`,
    14,
    285
  );

  doc.save(`Brothers-Tiles-Invoice-${order.orderNumber}.pdf`);
}

export function downloadProductSpecSheetPDF(product: ProductItem) {
  const doc = new jsPDF();

  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, 210, 34, "F");
  doc.setTextColor(212, 175, 55);
  doc.setFontSize(16);
  doc.text("BROTHER'S TILES & SANITARY MART — SPEC SHEET", 14, 15);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`${BUSINESS_INFO.addressExact} | WhatsApp: ${BUSINESS_INFO.mainPhone}`, 14, 24);

  doc.setTextColor(10, 10, 10);
  doc.setFontSize(14);
  doc.text(product.name, 14, 46);
  doc.setFontSize(10);
  doc.text(`Code: ${product.code}  |  Brand: ${product.brand}  |  Series: ${product.series}`, 14, 53);
  doc.text(product.description, 14, 62, { maxWidth: 180 });

  autoTable(doc, {
    startY: 76,
    head: [["Technical Specification", "Showroom Verified Detail"]],
    body: [
      ["Product Category", `${product.category} (${product.subCategory})`],
      ["Brand & Collection", `${product.brand} — ${product.series}`],
      ["Model / Catalog Code", product.code],
      ["Dimensions", `${product.sizeCm} (${product.sizeInch})`],
      ["Surface Finish", product.finish],
      ["Water Absorption", product.waterAbsorption || "<= 0.1% - 0.5% (BSTI & ISO 13006)"],
      ["Thickness", product.thickness || "9.5 mm - 10.5 mm"],
      ["Box Coverage", `${product.sqFtPerBox || 14.53} sq.ft. (${product.tilesPerBox || 4} pcs/box)`],
      ["Indicative Rate", `TK ${(product.pricePerSqFt || product.price || 115).toLocaleString()} ${product.category === "Tiles" ? "/ sq.ft." : "/ unit"}`],
      ["Recommended Applications", product.application.join(", ")],
      ["Showroom Location", BUSINESS_INFO.addressExact],
      ["Hotline & WhatsApp", BUSINESS_INFO.mainPhone],
    ],
    headStyles: { fillColor: [10, 10, 10], textColor: [212, 175, 55] },
  });

  doc.save(`${product.id}-Spec-Sheet.pdf`);
}

export function exportCatalogAndOrdersToExcel(
  products: ProductItem[],
  orders: Array<{
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    deliveryZone: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }>
) {
  const wb = XLSX.utils.book_new();

  const productRows = products.map((p) => ({
    Code: p.code,
    Name: p.name,
    "Bengali Name": p.nameBn,
    Brand: p.brand,
    Series: p.series,
    Category: p.category,
    "Size (cm)": p.sizeCm,
    "Size (inch)": p.sizeInch,
    Finish: p.finish,
    "Rate (BDT)": p.pricePerSqFt,
    "SqFt / Box": p.sqFtPerBox,
    "Pcs / Box": p.tilesPerBox,
    "Stock (Boxes/Units)": p.stockBoxes,
  }));

  const orderRows = orders.map((o) => ({
    "Order #": o.orderNumber,
    Customer: o.customerName,
    Phone: o.customerPhone,
    "Delivery Zone": o.deliveryZone,
    "Total (BDT)": o.totalAmount,
    Status: o.status,
    Date: new Date(o.createdAt).toLocaleDateString(),
  }));

  const wsProducts = XLSX.utils.json_to_sheet(productRows);
  const wsOrders = XLSX.utils.json_to_sheet(orderRows);

  XLSX.utils.book_append_sheet(wb, wsProducts, "Showroom Inventory");
  XLSX.utils.book_append_sheet(wb, wsOrders, "Customer Quotations");

  XLSX.writeFile(wb, "Brothers-Tiles-Sanitary-Mart-Report-2026.xlsx");
}
