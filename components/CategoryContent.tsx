"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";
import type { WorkCategory } from "@/lib/gallery";

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: WorkCategory["images"];
  index: number;
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  const total = images.length;

  // Keyboard controls: Esc to close, arrows to move.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav((index + 1) % total);
      else if (e.key === "ArrowLeft") onNav((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    // Prevent the page behind from scrolling while the lightbox is open.
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, total, onClose, onNav]);

  const img = images[index];

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

      {/* Stop clicks on the image itself from closing the box. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="lb-img"
        src={img.url}
        alt={img.alt}
        onClick={(e) => e.stopPropagation()}
      />

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

export default function CategoryContent({
  category,
}: {
  category: WorkCategory;
}) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  const label = (lang === "zh" ? category.labelZh : category.labelEn) || category.labelEn;
  const sub = (lang === "zh" ? category.subZh : category.subEn) || "";
  const images = category.images;

  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((next: number) => setOpen(next), []);

  return (
    <>
      <PageTitle id="title.work" />
      <Nav active="work" />

      <div className="wrap page-head">
        <Link href="/work" className="eyebrow" style={{ display: "inline-block" }}>
          ← {t("pg.title")}
        </Link>
        <h1>{label}</h1>
        {sub && <p>{sub}</p>}
      </div>

      <div className="wrap" style={{ marginTop: 30 }}>
        {images.length > 0 ? (
          <div className="cat-grid">
            {images.map((img, i) => (
              <button
                type="button"
                className="gal gal-btn"
                key={img.url + i}
                onClick={() => setOpen(i)}
                aria-label={img.alt || `Image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt} loading="lazy" decoding="async" />
                <span className="gal-zoom" aria-hidden>
                  ⤢
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="cat-empty">{t("cat.empty")}</p>
        )}
      </div>

      <footer className="mini-footer" style={{ marginTop: 70 }}>
        <div className="wrap">
          <Link href="/work">{t("back")}</Link>　·　© 2026 SIGN FUTURE ADVERTISING
        </div>
      </footer>

      {open !== null && images[open] && (
        <Lightbox images={images} index={open} onClose={close} onNav={nav} />
      )}
    </>
  );
}
