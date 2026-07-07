import { WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/i18n";
import type { SocialLinks } from "@/lib/site";

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

// Floating action buttons, bottom-right. WhatsApp is always shown; Facebook and
// Instagram appear only once their URLs are filled in Site Settings.
export default function SocialFloat({ social = {} }: { social?: SocialLinks }) {
  return (
    <div className="social-float">
      {social.instagram && (
        <a
          className="sfab ig"
          href={social.instagram}
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </a>
      )}
      {social.facebook && (
        <a
          className="sfab fb"
          href={social.facebook}
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.8-.1-1.6-.15-2.4-.15-2.4 0-4.05 1.47-4.05 4.15v2.3H7.5V14h2.75v8h3.25Z" />
          </svg>
        </a>
      )}
      <a
        className="sfab wa"
        href={waHref}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.5-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1l-.7.9c-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.1 0-.4.1-.6.3a3 3 0 0 0-.9 2.2 5.3 5.3 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.1.5 1.6.5 2.1.4.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1Z" />
        </svg>
      </a>
    </div>
  );
}
