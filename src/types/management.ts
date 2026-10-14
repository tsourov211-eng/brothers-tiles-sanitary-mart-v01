import { ProductItem } from "@/data/siteData";

export interface OrderItem {
  productId: string;
  name: string;
  code: string;
  quantity: number;
  unitPrice: number;
  priceUnit: "sq. ft." | "Piece";
  subtotal: number;
  image?: string;
}

export type OrderStatus = "Pending" | "Confirmed" | "Processing" | "Delivered" | "Cancelled";
export type PaymentStatus = "Paid" | "Partial" | "Unpaid";
export type PaymentMethod = "Cash" | "bKash" | "Bank Transfer" | "Nagad" | "Cheque";

export interface OrderRecord {
  id: string; // e.g. "ORD-1082"
  date: string; // e.g. "14 Oct 2026, 11:30 AM"
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  source: "Showroom POS" | "Website Quote";
}

export interface InvoiceRecord {
  invoiceNo: string; // e.g. "INV-2026-042"
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: PaymentMethod;
  salesPerson: string;
  notes?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}
