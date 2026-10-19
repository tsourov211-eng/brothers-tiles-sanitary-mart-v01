"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IconArrowUp } from "@tabler/icons-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Don't display in admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="উপরে যান (Scroll to top)"
      title="উপরে যান (Scroll to top)"
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-obsidian/95 hover:bg-gold text-gold hover:text-obsidian border-2 border-gold/80 hover:border-gold shadow-lg hover:shadow-gold/30 backdrop-blur-xs flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <IconArrowUp
        size={20}
        stroke={2.5}
        className="group-hover:-translate-y-0.5 transition-transform duration-200"
      />
    </button>
  );
}
