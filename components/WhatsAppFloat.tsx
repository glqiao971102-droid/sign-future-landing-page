import { WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/i18n";

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.5-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1l-.7.9c-.1.1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.1 0-.4.1-.6.3a3 3 0 0 0-.9 2.2 5.3 5.3 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.1.5 1.6.5 2.1.4.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1Z" />
      </svg>
    </a>
  );
}
