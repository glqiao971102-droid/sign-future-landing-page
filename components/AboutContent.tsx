"use client";

import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";

const FEATURES = [
  { src: "/images/feature-1.jpg", alt: "Factory Direct", t: "f1.t", d: "f1.d" },
  { src: "/images/feature-2.jpg", alt: "Premium Finish", t: "f2.t", d: "f2.d" },
  { src: "/images/feature-3.jpg", alt: "Fast Quote", t: "f3.t", d: "f3.d" },
  {
    src: "/images/feature-4.jpg",
    alt: "Nationwide Delivery",
    t: "f4.t",
    d: "f4.d",
  },
];

export default function AboutContent() {
  const { t } = useLang();

  return (
    <>
      <PageTitle id="title.about" />
      <Nav active="about" />

      {/* About */}
      <section className="block" id="about" style={{ paddingTop: 60 }}>
        <div className="wrap">
          <Trans id="about.title" as="h2" className="sec-title" />
          <div className="about-grid">
            <div className="about-text" data-reveal>
              <Trans id="about.p1" as="p" />
              <Trans id="about.p2" as="p" />
              <ul className="about-points">
                <li>
                  <span className="ck">✦</span>
                  <Trans id="about.b1" as="span" />
                </li>
                <li>
                  <span className="ck">✦</span>
                  <Trans id="about.b2" as="span" />
                </li>
                <li>
                  <span className="ck">✦</span>
                  <Trans id="about.b3" as="span" />
                </li>
              </ul>
            </div>
            <div className="about-stats" data-reveal data-delay={1}>
              <div className="about-stat">
                <strong className="gold">10+</strong>
                <Trans id="about.s1l" as="span" />
              </div>
              <div className="about-stat">
                <strong className="gold">1,500+</strong>
                <Trans id="about.s2l" as="span" />
              </div>
              <div className="about-stat">
                <strong className="gold">100%</strong>
                <Trans id="about.s3l" as="span" />
              </div>
              <div className="about-stat">
                <strong className="gold">13</strong>
                <Trans id="about.s4l" as="span" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="block" id="why">
        <div className="wrap">
          <Trans id="why.title" as="h2" className="sec-title" />
          <Trans id="why.intro" as="p" className="sec-intro" />
          <div className="feature-row">
            {FEATURES.map((f, i) => (
              <div
                className="feat-card"
                data-reveal
                data-delay={i || undefined}
                key={f.t}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="feat-img"
                  src={f.src}
                  alt={f.alt}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="feat-body">
                  <Trans id={f.t} as="h3" />
                  <Trans id={f.d} as="p" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mini-footer" style={{ marginTop: 40 }}>
        <div className="wrap">
          <Link href="/">{t("back")}</Link>　·　© 2026 SIGN FUTURE ADVERTISING
        </div>
      </footer>
    </>
  );
}
