"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import HeroSlideshow from "./HeroSlideshow";
import ShowcaseVideo from "./ShowcaseVideo";
import { useLang } from "./LanguageProvider";
import { WHATSAPP_NUMBER } from "@/lib/i18n";

const WA = `https://wa.me/${WHATSAPP_NUMBER}`;

const AUDIENCE: { src: string; id: string; icon: ReactNode }[] = [
  {
    src: "/images/aud-1.jpg",
    id: "aud1",
    icon: <path d="M6 3v8a3 3 0 0 0 6 0V3M9 3v18M18 3c-1.5 1-2 3-2 6s.5 4 2 4v8" />,
  },
  {
    src: "/images/aud-2.jpg",
    id: "aud2",
    icon: <path d="M4 9h16l-1-4H5zM5 9v11h14V9M4 9l1.5-2" />,
  },
  {
    src: "/images/aud-3.jpg",
    id: "aud3",
    icon: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M8 8l12 10M8 16L20 6" />
      </>
    ),
  },
  {
    src: "/images/aud-4.jpg",
    id: "aud4",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="12" rx="1.5" />
        <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </>
    ),
  },
  {
    src: "/images/aud-5.jpg",
    id: "aud5",
    icon: (
      <>
        <path d="M3 21V8l9-5 9 5v13z" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    src: "/images/aud-6.jpg",
    id: "aud6",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="1.5" />
        <path d="M3 18l5-5 4 3 3-3 6 5" />
      </>
    ),
  },
  {
    src: "/images/aud-7.jpg",
    id: "aud7",
    icon: <path d="m12 3 2.4 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.5z" />,
  },
  {
    src: "/images/aud-8.jpg",
    id: "aud8",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="1" />
        <path d="M3 8h18M12 8v13M8 8C6 8 5 4 8 4s4 4 4 4M16 8c2 0 3-4 0-4s-4 4-4 4" />
      </>
    ),
  },
];

function AudienceCard({
  src,
  id,
  icon,
  delay,
}: {
  src: string;
  id: string;
  icon: ReactNode;
  delay?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  return (
    <div className="aud-card" data-reveal data-delay={delay}>
      <div className={`aud-thumb${loaded ? " has-img" : ""}`}>
        {!broken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={() => setBroken(true)}
          />
        )}
        <span className="a-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {icon}
          </svg>
        </span>
      </div>
      <Trans id={id} as="span" className="aud-label" />
    </div>
  );
}

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

export default function HomeContent() {
  const { t } = useLang();
  const [ctaBroken, setCtaBroken] = useState(false);

  return (
    <>
      <PageTitle id="title.home" />
      <Nav active="home" />

      {/* Hero */}
      <HeroSlideshow />

      {/* What We Do */}
      <section className="block" id="about-do">
        <div className="wrap">
          <Trans id="do.title" as="h2" className="sec-title" />
          <Trans id="do.intro" as="p" className="sec-intro" />
          <ShowcaseVideo />
        </div>
      </section>

      {/* About */}
      <section className="block" id="about">
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

      {/* Audience */}
      <section className="block" id="audience">
        <div className="wrap">
          <Trans id="aud.title" as="h2" className="sec-title" />
          <div className="aud-grid">
            {AUDIENCE.map((a, i) => (
              <AudienceCard key={a.id} {...a} delay={i % 4 || undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta">
        <div className="cta-fallback" />
        {!ctaBroken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cta-bg"
            src="/images/cta.jpg"
            alt=""
            onError={() => setCtaBroken(true)}
          />
        )}
        <div className="wrap cta-inner" data-reveal>
          <Trans id="cta.title" as="h2" />
          <Trans id="cta.sub" as="p" />
          <a className="btn gold" href={WA} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.5-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1l-.7.9c-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.1 0-.4.1-.6.3a3 3 0 0 0-.9 2.2 5.3 5.3 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.1.5 1.6.5 2.1.4.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1Z" />
            </svg>
            <Trans id="cta.btn" as="span" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap foot-grid">
          <div>
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="brand-logo"
                src="/images/logo.png"
                alt="SIGN FUTURE ADVERTISING"
              />
            </Link>
            <Trans id="foot.desc" as="p" />
          </div>
          <div className="foot-contact">
            <span style={{ color: "var(--gold-lite)", fontWeight: 700 }}>
              {t("foot.contact")}
            </span>
            <a href={WA} target="_blank" rel="noopener">
              <Trans id="foot.wa" as="span" />: +60 12-345 6789
            </a>
            <a href="mailto:enquiry@signfuture.my">enquiry@signfuture.my</a>
            <Trans id="foot.hours" as="span" />
            <Trans id="foot.area" as="span" />
          </div>
        </div>
        <div className="foot-bottom">
          © 2026 SIGN FUTURE ADVERTISING. <Trans id="foot.rights" as="span" />
        </div>
      </footer>
    </>
  );
}
