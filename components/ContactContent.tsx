"use client";

import { type FormEvent } from "react";
import Link from "next/link";
import Nav from "./Nav";
import Trans from "./Trans";
import PageTitle from "./PageTitle";
import { useLang } from "./LanguageProvider";
import { WHATSAPP_NUMBER } from "@/lib/i18n";
import type { SocialLinks } from "@/lib/site";

const WA = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function ContactContent({
  social = {},
}: {
  social?: SocialLinks;
}) {
  const { t } = useLang();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text =
      "Hi SIGN FUTURE, I'd like to enquire.\n\n" +
      "Name: " + (d.get("name") || "") + "\n" +
      "Phone: " + (d.get("phone") || "") + "\n" +
      "Email: " + (d.get("email") || "") + "\n" +
      "Service: " + (d.get("service") || "") + "\n" +
      "Message: " + (d.get("msg") || "");
    window.gtag?.("event", "generate_lead", { method: "whatsapp_form" });
    window.open(`${WA}?text=` + encodeURIComponent(text), "_blank");
  };

  return (
    <>
      <PageTitle id="title.contact" />
      <Nav active="contact" />

      <div className="wrap page-head">
        <Trans id="ct.eyebrow" as="span" className="eyebrow" />
        <Trans id="ct.title" as="h1" />
        <Trans id="ct.sub" as="p" />
      </div>

      <div className="wrap contact-grid">
        {/* Left: info */}
        <div className="card">
          <Trans id="ct.reach" as="h2" />
          <div className="company-line">
            <b>SIGN FUTURE INDUSTRY SDN BHD</b>
            <span>202101003599 (1403897-U)</span>
          </div>
          <ul className="cinfo">
            <li>
              <span className="ci-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                </svg>
              </span>
              <div>
                <Trans id="ct.call" as="b" />
                <a href={WA} target="_blank" rel="noopener">
                  +60 11-5675 8370
                </a>
              </div>
            </li>
            <li>
              <span className="ci-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <div>
                <Trans id="ct.email" as="b" />
                <a href="mailto:info@signfuture.com.my">info@signfuture.com.my</a>
              </div>
            </li>
            <li>
              <span className="ci-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <Trans id="ct.addr" as="b" />
                <Trans id="ct.addrval" as="span" />
              </div>
            </li>
            <li>
              <span className="ci-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div>
                <Trans id="ct.hours" as="b" />
                <Trans id="ct.hoursval" as="span" />
              </div>
            </li>
          </ul>
          <div className="quick">
            <a className="btn wa" href={WA} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.5-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1l-.7.9c-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.1 0-.4.1-.6.3a3 3 0 0 0-.9 2.2 5.3 5.3 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.1.5 1.6.5 2.1.4.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1Z" />
              </svg>
              <Trans id="ct.wabtn" as="span" />
            </a>
            <a className="btn outline" href="tel:+601156758370">
              <Trans id="ct.callbtn" as="span" />
            </a>
          </div>
          <div className="social">
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
              >
                f
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                ◎
              </a>
            )}
            {social.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener"
                aria-label="TikTok"
              >
                ♪
              </a>
            )}
            <a href={WA} target="_blank" rel="noopener" aria-label="WhatsApp">
              ✆
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="card">
          <Trans id="ct.formtitle" as="h2" />
          <p className="note" style={{ marginTop: 8 }}>
            {t("ct.formnote")}
          </p>
          <form className="cform" onSubmit={onSubmit}>
            <div className="frow">
              <input name="name" placeholder={t("ct.ph.name")} required />
              <input name="phone" placeholder={t("ct.ph.phone")} required />
            </div>
            <input name="email" type="email" placeholder={t("ct.ph.email")} />
            <select name="service" defaultValue="">
              <option value="">{t("ct.opt.0")}</option>
              <option>{t("ct.opt.1")}</option>
              <option>{t("ct.opt.2")}</option>
              <option>{t("ct.opt.3")}</option>
              <option>{t("ct.opt.4")}</option>
              <option>{t("ct.opt.5")}</option>
              <option>{t("ct.opt.6")}</option>
            </select>
            <textarea name="msg" placeholder={t("ct.ph.msg")} />
            <button className="btn gold block" type="submit">
              <Trans id="ct.send" as="span" />
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="wrap">
        <div className="map-head">
          <Trans id="ct.maptitle" as="h2" />
        </div>
        <div className="map-wrap">
          <iframe
            src="https://www.google.com/maps?q=No%209%2C%20Jalan%20Industri%20USJ%201%2F7%2C%20Taman%20Perindustrian%20USJ%201%2C%2047600%20Subang%20Jaya%2C%20Selangor&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          />
        </div>
      </div>

      <footer className="mini-footer">
        <div className="wrap">
          <Link href="/">{t("back")}</Link>　·　© 2026 SIGN FUTURE ADVERTISING
        </div>
      </footer>
    </>
  );
}
