"use client";

import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { WHATSAPP_NUMBER } from "@/lib/i18n";

export default function Nav({
  active,
}: {
  active?: "home" | "work" | "contact";
}) {
  const { lang, setLang, t } = useLang();

  return (
    <header className="nav" id="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-logo"
            src="/images/logo.png"
            alt="SIGN FUTURE ADVERTISING"
          />
        </Link>
        <nav className="nav-links">
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/#about">{t("nav.about")}</Link>
          <Link href="/work" className={active === "work" ? "active" : undefined}>
            {t("nav.work")}
          </Link>
          <Link
            href="/contact"
            className={active === "contact" ? "active" : undefined}
          >
            {t("nav.contact")}
          </Link>
        </nav>
        <div className="nav-right">
          <div className="lang" id="lang">
            <button
              type="button"
              className={lang === "en" ? "on" : undefined}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <i>/</i>
            <button
              type="button"
              className={lang === "zh" ? "on" : undefined}
              onClick={() => setLang("zh")}
            >
              中文
            </button>
          </div>
          <a
            className="btn gold"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener"
          >
            {t("nav.quote")}
          </a>
        </div>
      </div>
    </header>
  );
}
