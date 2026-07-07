"use client";

import { useCallback, useState } from "react";
import { useLang } from "./LanguageProvider";
import Lightbox, { metaLabel, type LightboxItem } from "./Lightbox";
import type { ShowcaseItem } from "@/lib/showcase";

export default function ShowcaseGrid({ items }: { items: ShowcaseItem[] }) {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((n: number) => setOpen(n), []);
  const L = metaLabel(lang === "zh" ? "zh" : "en");

  const lbItems: LightboxItem[] = items.map((s) => ({
    url: s.url,
    alt: s.alt,
    title: s.title,
    caption: s.description,
    location: s.location,
    size: s.size,
    businessType: s.businessType,
    baseMaterial: s.baseMaterial,
    price: s.price,
  }));

  return (
    <>
      <div className="show-grid">
        {items.map((s, i) => {
          const meta = [
            [L.location, s.location],
            [L.size, s.size],
            [L.businessType, s.businessType],
            [L.baseMaterial, s.baseMaterial],
            [L.price, s.price],
          ].filter(([, v]) => v) as [string, string][];
          return (
            <article className="show-card" key={s.url + i}>
              <button
                type="button"
                className="show-img"
                onClick={() => setOpen(i)}
                aria-label={s.title || `Image ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.url} alt={s.alt} loading="lazy" decoding="async" />
                <span className="gal-zoom" aria-hidden>
                  ⤢
                </span>
              </button>
              <div className="show-body">
                {s.title && <h3>{s.title}</h3>}
                {s.description && <p className="show-desc">{s.description}</p>}
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
            </article>
          );
        })}
      </div>

      {open !== null && lbItems[open] && (
        <Lightbox
          items={lbItems}
          index={open}
          lang={lang === "zh" ? "zh" : "en"}
          onClose={close}
          onNav={nav}
        />
      )}
    </>
  );
}
