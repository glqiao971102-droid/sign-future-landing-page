"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fires a GA4 "generate_lead" event whenever a visitor clicks a WhatsApp,
// phone, or email link anywhere on the site (Get Quote, floating buttons,
// contact page, etc.). Uses the GA4 that's already loaded on the page.
export default function LeadTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";

      let method: string | null = null;
      if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        method = "whatsapp";
      } else if (href.startsWith("tel:")) {
        method = "call";
      } else if (href.startsWith("mailto:")) {
        method = "email";
      }

      if (method) {
        window.gtag?.("event", "generate_lead", { method });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
