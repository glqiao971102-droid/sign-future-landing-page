"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";
import type { WorkCategory } from "@/lib/gallery";

export type { WorkCategory } from "@/lib/gallery";

function CategoryCard({ category }: { category: WorkCategory }) {
  const { lang } = useLang();
  const [broken, setBroken] = useState(false);

  const label = (lang === "zh" ? category.labelZh : category.labelEn) || category.labelEn;
  const sub = (lang === "zh" ? category.subZh : category.subEn) || "";
  const cover = category.images[0]?.url;
  const count = category.images.length;

  return (
    <Link href={`/work/${category.slug}`} className="cat-card">
      <div className={`cat-card-img${!cover || broken ? " noimg" : ""}`}>
        {cover && !broken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={label}
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
          />
        )}
        {count > 0 && <span className="cat-card-count">{count}</span>}
      </div>
      <div className="cat-card-body">
        <h2>{label}</h2>
        {sub && <p>{sub}</p>}
      </div>
    </Link>
  );
}

export default function WorkContent({
  categories = [],
}: {
  categories?: WorkCategory[];
}) {
  const { lang, t } = useLang();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const labelOf = (c: WorkCategory) =>
    (lang === "zh" ? c.labelZh : c.labelEn) || c.labelEn;

  const visible = categories.filter(
    (c) => !q || labelOf(c).toLowerCase().includes(q),
  );

  return (
    <>
      <PageTitle id="title.work" />
      <Nav active="work" />

      <div className="wrap page-head">
        <Trans id="pg.eyebrow" as="span" className="eyebrow" />
        <Trans id="pg.title" as="h1" />
        <Trans id="pg.sub" as="p" />
      </div>

      <div className="wrap" style={{ marginTop: 34 }}>
        <input
          type="text"
          className="cat-search"
          style={{ maxWidth: 360 }}
          placeholder={t("cat.searchph")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {visible.length > 0 ? (
          <div className="cat-card-grid">
            {visible.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        ) : (
          <p className="cat-empty" style={{ marginTop: 30 }}>
            {t("cat.empty")}
          </p>
        )}
      </div>

      <footer className="mini-footer" style={{ marginTop: 70 }}>
        <div className="wrap">
          <Link href="/">{t("back")}</Link>　·　© 2026 SIGN FUTURE ADVERTISING
        </div>
      </footer>
    </>
  );
}
