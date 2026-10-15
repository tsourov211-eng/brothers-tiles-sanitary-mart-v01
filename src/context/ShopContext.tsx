"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem, PRODUCTS, ALL_PRODUCTS } from "@/data/siteData";
import { OrderRecord, OrderStatus, InvoiceRecord, CustomerRecord } from "@/types/management";
import { INITIAL_ORDERS, INITIAL_INVOICES } from "@/data/initialManagementData";

export interface QuoteBagItem {
  product: ProductItem;
  quantityBoxes: number;
  note?: string;
  itemType?: "BOX" | "SAMPLE";
  unitPrice?: number;
}

export interface NewSaleInput {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  discount: number;
  paidAmount: number;
  paymentMethod: "Cash" | "bKash" | "Bank Transfer" | "Nagad" | "Cheque";
  notes?: string;
}

interface ShopContextType {
  // Storefront Products & State
  products: ProductItem[];
  addProduct: (product: ProductItem) => void;
  updateProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  resetManagementData: () => void;

  // Management Orders & POS Sales
  orders: OrderRecord[];
  addOrder: (order: Omit<OrderRecord, "id" | "date">) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Invoices & Billing
  invoices: InvoiceRecord[];
  createSale: (saleInput: NewSaleInput) => InvoiceRecord;

  // Customers
  customers: CustomerRecord[];

  // Admin Authentication
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  managerName: string;

  // Customer Storefront State
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  quoteBag: QuoteBagItem[];
  addToQuoteBag: (product: ProductItem, quantityBoxes?: number) => void;
  addSampleToBag: (product: ProductItem) => void;
  removeFromQuoteBag: (productId: string) => void;
  updateQuoteQty: (productId: string, quantityBoxes: number) => void;
  clearQuoteBag: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  selectedProduct: ProductItem | null;
  setSelectedProduct: (product: ProductItem | null) => void;
  lang: "bn" | "en";
  setLang: (lang: "bn" | "en") => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Helper to initialize products with stock and offer metadata
function getInitialProducts(): ProductItem[] {
  return ALL_PRODUCTS.map((p, idx) => {
    const isTile =
      p.category === "Floor Tiles" ||
      p.category === "Wall Tiles" ||
      p.category === "Stair & Parking" ||
      p.category === "Tiles";
    let stock = p.stockBoxes ?? (isTile ? 120 + (idx % 5) * 20 : 30 + (idx % 4) * 8);
    let minThreshold = p.minStockThreshold ?? 20;

    // Set a couple low-stock items for immediate demonstration of stock alerts
    if (p.id === "geo-series-1") {
      stock = 8;
      minThreshold = 25;
    } else if (p.id === "rak-tread-step") {
      stock = 12;
      minThreshold = 30;
    }

    const isOffer = idx === 0 || idx === 3;
    const isHotSale = p.isBestseller || idx === 1;
    const basePrice = p.price || p.pricePerSqFt || 115;

    return {
      ...p,
      price: basePrice,
      pricePerSqFt: p.pricePerSqFt || basePrice,
      stockBoxes: stock,
      minStockThreshold: minThreshold,
      isOffer,
      discountPercent: isOffer ? 10 : undefined,
      originalPrice: isOffer ? Math.round(basePrice * 1.12) : undefined,
      isHotSale,
      isUpcoming: idx === 4,
    };
  });
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Products
  const [products, setProducts] = useState<ProductItem[]>(getInitialProducts);

  // Orders & Invoices
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [managerName, setManagerName] = useState("Manager Tsour");

  // Storefront
  const [wishlist, setWishlist] = useState<string[]>([
    "classic-super-20",
    "elegant-slab-1211",
    "sanitary-commode-luxury",
  ]);
  const [quoteBag, setQuoteBag] = useState<QuoteBagItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("btsm_products");
      if (savedProducts) {
        const parsed: ProductItem[] = JSON.parse(savedProducts);
        const baseMap = new Map(getInitialProducts().map((p) => [p.id, p]));
        const merged = parsed.map((item) => {
          const base = baseMap.get(item.id);
          if (base) {
            return {
              ...base,
              ...item,
              category: base.category,
              subCategory: base.subCategory,
            };
          }
          return item;
        });
        baseMap.forEach((baseItem, id) => {
          if (!merged.some((m) => m.id === id)) {
            merged.push(baseItem);
          }
        });
        setProducts(merged);
      }

      const savedOrders = localStorage.getItem("btsm_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedInvoices = localStorage.getItem("btsm_invoices");
      if (savedInvoices) setInvoices(JSON.parse(savedInvoices));

      const savedAdmin = localStorage.getItem("btsm_admin_session");
      if (savedAdmin === "true") setIsAdminLoggedIn(true);

      const savedWishlist = localStorage.getItem("btsm_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedBag = localStorage.getItem("btsm_quotebag");
      if (savedBag) setQuoteBag(JSON.parse(savedBag));
    } catch {
      // ignore storage errors
    }
  }, []);

  // Sync products changes to localStorage
  const persistProducts = (newProducts: ProductItem[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem("btsm_products", JSON.stringify(newProducts));
    } catch {}
  };

  const persistOrders = (newOrders: OrderRecord[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem("btsm_orders", JSON.stringify(newOrders));
    } catch {}
  };

  const persistInvoices = (newInvoices: InvoiceRecord[]) => {
    setInvoices(newInvoices);
    try {
      localStorage.setItem("btsm_invoices", JSON.stringify(newInvoices));
    } catch {}
  };

  // Product Actions
  const addProduct = (newProduct: ProductItem) => {
    const updated = [newProduct, ...products];
    persistProducts(updated);
  };

  const updateProduct = (id: string, updatedFields: Partial<ProductItem>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    persistProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    persistProducts(updated);
  };

  const updateStock = (id: string, newStock: number) => {
    const safeStock = Math.max(0, newStock);
    const updated = products.map((p) => (p.id === id ? { ...p, stockBoxes: safeStock } : p));
    persistProducts(updated);
  };

  // Order Actions
  const addOrder = (orderData: Omit<OrderRecord, "id" | "date">): OrderRecord => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const newOrder: OrderRecord = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: dateFormatted,
    };
    const updated = [newOrder, ...orders];
    persistOrders(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    persistOrders(updated);
  };

  // POS / New Sale Creation
  const createSale = (saleInput: NewSaleInput): InvoiceRecord => {
    const now = new Date();
    const dateFormatted = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    let subtotal = 0;
    const invoiceItems = saleInput.items.map((item) => {
      const prod = products.find((p) => p.id === item.productId);
      const price = prod?.price ?? 120;
      const unit = prod?.priceUnit ?? "sq. ft.";
      const lineTotal = price * item.quantity;
      subtotal += lineTotal;

      // Automatically deduct from stock!
      if (prod && typeof prod.stockBoxes === "number") {
        updateStock(prod.id, prod.stockBoxes - item.quantity);
      }

      return {
        productId: item.productId,
        name: prod?.name ?? "Showroom Product",
        code: prod?.code ?? "BTSM-ITEM",
        quantity: item.quantity,
        unitPrice: price,
        priceUnit: unit,
        subtotal: lineTotal,
        image: prod?.image,
      };
    });

    const grandTotal = Math.max(0, subtotal - (saleInput.discount || 0));
    const paidAmount = saleInput.paidAmount;
    const dueAmount = Math.max(0, grandTotal - paidAmount);

    const invoiceNo = `INV-${now.getFullYear()}-${String(invoices.length + 90).padStart(3, "0")}`;

    const newInvoice: InvoiceRecord = {
      invoiceNo,
      date: dateFormatted,
      customerName: saleInput.customerName,
      customerPhone: saleInput.customerPhone,
      customerAddress: saleInput.customerAddress || "Gazipur",
      items: invoiceItems,
      subtotal,
      discount: saleInput.discount || 0,
      grandTotal,
      paidAmount,
      dueAmount,
      paymentMethod: saleInput.paymentMethod,
      salesPerson: managerName,
      notes: saleInput.notes,
    };

    persistInvoices([newInvoice, ...invoices]);

    // Also record in orders table
    addOrder({
      customerName: saleInput.customerName,
      customerPhone: saleInput.customerPhone,
      customerAddress: saleInput.customerAddress,
      items: invoiceItems,
      totalAmount: grandTotal,
      status: "Delivered",
      paymentMethod: saleInput.paymentMethod,
      paymentStatus: dueAmount === 0 ? "Paid" : paidAmount > 0 ? "Partial" : "Unpaid",
      source: "Showroom POS",
      notes: saleInput.notes,
    });

    return newInvoice;
  };

  // Derive Customers list from all orders & invoices
  const customers: CustomerRecord[] = React.useMemo(() => {
    const map = new Map<string, CustomerRecord>();
    orders.forEach((o) => {
      const key = o.customerPhone.trim();
      const existing = map.get(key);
      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += o.totalAmount;
        existing.lastOrderDate = o.date;
      } else {
        map.set(key, {
          id: `CUST-${Math.abs(key.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)) % 10000}`,
          name: o.customerName,
          phone: o.customerPhone,
          address: o.customerAddress,
          totalOrders: 1,
          totalSpent: o.totalAmount,
          lastOrderDate: o.date,
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Admin Auth Actions
  const adminLogin = (pass: string): boolean => {
    const validPins = ["btsm2026", "123456", "admin", "manager", "1700"];
    if (validPins.includes(pass.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem("btsm_admin_session", "true");
      } catch {}
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem("btsm_admin_session");
    } catch {}
  };

  const resetManagementData = () => {
    persistProducts(getInitialProducts());
    persistOrders(INITIAL_ORDERS);
    persistInvoices(INITIAL_INVOICES);
  };

  // Storefront Wishlist & Quote Bag
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("btsm_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const addToQuoteBag = (product: ProductItem, quantityBoxes = 5) => {
    setQuoteBag((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const next = existing
        ? prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantityBoxes: item.quantityBoxes + quantityBoxes }
              : item
          )
        : [...prev, { product, quantityBoxes }];
      try {
        localStorage.setItem("btsm_quotebag", JSON.stringify(next));
      } catch {}
      return next;
    });
    setIsDrawerOpen(true);
  };

  const addSampleToBag = (product: ProductItem) => {
    setQuoteBag((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.itemType === "SAMPLE"
      );
      if (existing) {
        return prev;
      }
      const next: QuoteBagItem[] = [
        ...prev,
        {
          product,
          quantityBoxes: 1,
          itemType: "SAMPLE",
          unitPrice: product.samplePrice || 100,
          note: "Sample Swatch (৳100)",
        },
      ];
      try {
        localStorage.setItem("btsm_quotebag", JSON.stringify(next));
      } catch {}
      return next;
    });
    setIsDrawerOpen(true);
  };

  const removeFromQuoteBag = (productId: string) => {
    setQuoteBag((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      try {
        localStorage.setItem("btsm_quotebag", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const updateQuoteQty = (productId: string, quantityBoxes: number) => {
    if (quantityBoxes <= 0) {
      removeFromQuoteBag(productId);
      return;
    }
    setQuoteBag((prev) => {
      const next = prev.map((item) =>
        item.product.id === productId ? { ...item, quantityBoxes } : item
      );
      try {
        localStorage.setItem("btsm_quotebag", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearQuoteBag = () => {
    setQuoteBag([]);
    try {
      localStorage.removeItem("btsm_quotebag");
    } catch {}
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetManagementData,

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

        wishlist,
        toggleWishlist,
        quoteBag,
        addToQuoteBag,
        addSampleToBag,
        removeFromQuoteBag,
        updateQuoteQty,
        clearQuoteBag,
        isDrawerOpen,
        setIsDrawerOpen,
        selectedProduct,
        setSelectedProduct,
        lang,
        setLang,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within a ShopProvider");
  return ctx;
}
