"use client";

import { useEffect } from "react";

export type LightboxItem = {
  url: string;
  alt: string;
  title?: string;
  caption?: string;
  location?: string;
  size?: string;
  businessType?: string;
  baseMaterial?: string;
  price?: string;
};

const META_LABELS = {
  en: {
    location: "Location",
    size: "Size",
    businessType: "Business Type",
    baseMaterial: "Base Material",
    price: "Price",
  },
  zh: {
    location: "地点",
    size: "尺寸",
    businessType: "行业类型",
    baseMaterial: "材质",
    price: "价格",
  },
} as const;

export const metaLabel = (lang: "en" | "zh") => META_LABELS[lang];

// Fullscreen image popup with prev/next, keyboard controls, and a details panel.
// Shared by the gallery detail page and the home showcase grid.
export default function Lightbox({
  items,
  index,
  lang,
  onClose,
  onNav,
}: {
  items: LightboxItem[];
  index: number;
  lang: "en" | "zh";
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  const total = items.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav((index + 1) % total);
      else if (e.key === "ArrowLeft") onNav((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, total, onClose, onNav]);

  const img = items[index];
  const L = META_LABELS[lang];
  const meta = [
    [L.location, img.location],
    [L.size, img.size],
    [L.businessType, img.businessType],
    [L.baseMaterial, img.baseMaterial],
    [L.price, img.price],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lb-close" aria-label="Close" onClick={onClose}>
        ×
      </button>

      {total > 1 && (
        <button
          className="lb-nav lb-prev"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onNav((index - 1 + total) % total);
          }}
        >
          ‹
        </button>
      )}

      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lb-img" src={img.url} alt={img.alt} />
        {(img.title || img.caption || meta.length > 0) && (
          <figcaption className="lb-info">
            {img.title && <h3>{img.title}</h3>}
            {img.caption && <p>{img.caption}</p>}
            {meta.length > 0 && (
              <div className="lb-meta">
                {meta.map(([label, value]) => (
                  <span key={label}>
                    <b>{label}:</b> {value}
                  </span>
                ))}
              </div>
            )}
          </figcaption>
        )}
      </figure>

      {total > 1 && (
        <button
          className="lb-nav lb-next"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNav((index + 1) % total);
          }}
        >
          ›
        </button>
      )}

      {total > 1 && (
        <span className="lb-count">
          {index + 1} / {total}
        </span>
      )}
    </div>
  );
}
