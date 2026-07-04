"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";

export type GalleryImage = { url: string; alt: string };

export type WorkCategory = {
  slug: string;
  labelEn: string;
  labelZh: string;
  subEn: string;
  subZh: string;
  images: GalleryImage[];
};

function Gal({ image }: { image: GalleryImage }) {
  const [broken, setBroken] = useState(false);
  return (
    <a className={`gal${broken ? " noimg" : ""}`}>
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image.url} alt={image.alt} onError={() => setBroken(true)} />
      )}
      <span className="gal-add">{image.alt || "image"}</span>
    </a>
  );
}

export default function WorkContent({
  categories = [],
}: {
  categories?: WorkCategory[];
}) {
  const { lang, t } = useLang();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const labelOf = (c: WorkCategory) =>
    (lang === "zh" ? c.labelZh : c.labelEn) || c.labelEn;
  const subOf = (c: WorkCategory) => (lang === "zh" ? c.subZh : c.subEn) || "";

  return (
    <>
      <PageTitle id="title.work" />
      <Nav active="work" />

      <div className="wrap page-head">
        <Trans id="pg.eyebrow" as="span" className="eyebrow" />
        <Trans id="pg.title" as="h1" />
        <Trans id="pg.sub" as="p" />
      </div>

      <div className="wrap work-layout">
        <aside className="work-side">
          <Trans id="cat.heading" as="h3" />
          <input
            type="text"
            className="cat-search"
            placeholder={t("cat.searchph")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <nav className="cat-nav">
            {categories.map((c) => {
              const label = labelOf(c);
              const hidden = !!q && !label.toLowerCase().includes(q);
              return (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className={
                    [hidden ? "hide" : "", active === c.slug ? "active" : ""]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                  onClick={() => setActive(c.slug)}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </aside>

        <main className="work-main">
          {categories.map((c) => {
            const label = labelOf(c);
            const hideSection = !!q && !label.toLowerCase().includes(q);
            return (
              <section
                className="cat"
                id={c.slug}
                key={c.slug}
                style={hideSection ? { display: "none" } : undefined}
              >
                <div className="cat-head">
                  <h2>{label}</h2>
                  {subOf(c) && <span>{subOf(c)}</span>}
                </div>
                {c.images.length > 0 ? (
                  <div className="cat-grid">
                    {c.images.map((img, i) => (
                      <Gal key={img.url + i} image={img} />
                    ))}
                  </div>
                ) : (
                  <p className="cat-empty">{t("cat.empty")}</p>
                )}
              </section>
            );
          })}
        </main>
      </div>

      <footer className="mini-footer" style={{ marginTop: 70 }}>
        <div className="wrap">
          <Link href="/">{t("back")}</Link>　·　© 2026 SIGN FUTURE ADVERTISING
        </div>
      </footer>
    </>
  );
}
