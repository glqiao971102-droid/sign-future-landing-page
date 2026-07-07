"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";
import type { WorkCategory } from "@/lib/gallery";

const META_LABELS = {
  en: {
    location: "Location",
    businessType: "Business Type",
    baseMaterial: "Base Material",
    price: "Price",
  },
  zh: {
    location: "地点",
    businessType: "行业类型",
    baseMaterial: "材质",
    price: "价格",
  },
} as const;

function Lightbox({
  images,
  index,
  lang,
  onClose,
  onNav,
}: {
  images: WorkCategory["images"];
  index: number;
  lang: "en" | "zh";
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

      {/* Stop clicks inside the figure from closing the box. */}
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lb-img" src={img.url} alt={img.alt} />
        {(img.title ||
          img.caption ||
          img.location ||
          img.businessType ||
          img.baseMaterial ||
          img.price) && (
          <figcaption className="lb-info">
            {img.title && <h3>{img.title}</h3>}
            {img.caption && <p>{img.caption}</p>}
            <div className="lb-meta">
              {img.location && (
                <span>
                  <b>{META_LABELS[lang].location}:</b> {img.location}
                </span>
              )}
              {img.businessType && (
                <span>
                  <b>{META_LABELS[lang].businessType}:</b> {img.businessType}
                </span>
              )}
              {img.baseMaterial && (
                <span>
                  <b>{META_LABELS[lang].baseMaterial}:</b> {img.baseMaterial}
                </span>
              )}
              {img.price && (
                <span>
                  <b>{META_LABELS[lang].price}:</b> {img.price}
                </span>
              )}
            </div>
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

  const L = META_LABELS[lang === "zh" ? "zh" : "en"];

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
          <div className="item-grid">
            {images.map((img, i) => {
              const meta = [
                [L.location, img.location],
                [L.businessType, img.businessType],
                [L.baseMaterial, img.baseMaterial],
                [L.price, img.price],
              ].filter(([, v]) => v);
              return (
                <article className="item-card" key={img.url + i}>
                  <button
                    type="button"
                    className="gal gal-btn item-media"
                    onClick={() => setOpen(i)}
                    aria-label={img.alt || img.title || `Image ${i + 1}`}
                  >
                    {/* First row loads eagerly so it's there on arrival; the
                        rest lazy-load as you scroll. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading={i < 3 ? "eager" : "lazy"}
                      fetchPriority={i < 3 ? "high" : "auto"}
                      decoding="async"
                    />
                    <span className="gal-zoom" aria-hidden>
                      ⤢
                    </span>
                  </button>

                  {(img.title || img.caption || meta.length > 0) && (
                    <div className="item-body">
                      {img.title && <h3 className="item-title">{img.title}</h3>}
                      {img.caption && (
                        <p className="item-caption">{img.caption}</p>
                      )}
                      {meta.length > 0 && (
                        <dl className="item-meta">
                          {meta.map(([label, value]) => (
                            <div key={label}>
                              <dt>{label}</dt>
                              <dd>{value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
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
        <Lightbox
          images={images}
          index={open}
          lang={lang === "zh" ? "zh" : "en"}
          onClose={close}
          onNav={nav}
        />
      )}
    </>
  );
}
