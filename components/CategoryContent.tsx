"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";
import Lightbox, { metaLabel } from "./Lightbox";
import type { WorkCategory } from "@/lib/gallery";

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

  const L = metaLabel(lang === "zh" ? "zh" : "en");

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
                [L.size, img.size],
                [L.businessType, img.businessType],
                [L.baseMaterial, img.baseMaterial],
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
          items={images}
          index={open}
          lang={lang === "zh" ? "zh" : "en"}
          onClose={close}
          onNav={nav}
        />
      )}
    </>
  );
}
