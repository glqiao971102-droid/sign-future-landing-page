"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";

const CATEGORIES = [
  { id: "led", key: "cat.led", sub: "cat.led.s", prefix: "led" },
  { id: "threeD", key: "cat.3d", sub: "cat.3d.s", prefix: "3d" },
  { id: "steel", key: "cat.steel", sub: "cat.steel.s", prefix: "steel" },
  { id: "normal", key: "cat.normal", sub: "cat.normal.s", prefix: "normal" },
  { id: "neon", key: "cat.neon", sub: "cat.neon.s", prefix: "neon" },
  { id: "indoor", key: "cat.indoor", sub: "cat.indoor.s", prefix: "indoor" },
];

function Gal({ file }: { file: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <a className={`gal${broken ? " noimg" : ""}`}>
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/${file}`} alt="" onError={() => setBroken(true)} />
      )}
      <span className="gal-add">{file}</span>
    </a>
  );
}

export default function WorkContent() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

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
            {CATEGORIES.map((c) => {
              const label = t(c.key).toLowerCase();
              const hidden = !!q && !label.includes(q);
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className={
                    [hidden ? "hide" : "", active === c.id ? "active" : ""]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                  onClick={() => setActive(c.id)}
                >
                  {t(c.key)}
                </a>
              );
            })}
          </nav>
        </aside>

        <main className="work-main">
          {CATEGORIES.map((c) => {
            const title = t(c.key).toLowerCase();
            const hideSection = !!q && !title.includes(q);
            return (
              <section
                className="cat"
                id={c.id}
                key={c.id}
                style={hideSection ? { display: "none" } : undefined}
              >
                <div className="cat-head">
                  <Trans id={c.key} as="h2" />
                  <Trans id={c.sub} as="span" />
                </div>
                <div className="cat-grid">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <Gal
                      key={n}
                      file={`images/work/${c.prefix}-${n}.jpg`}
                    />
                  ))}
                </div>
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
