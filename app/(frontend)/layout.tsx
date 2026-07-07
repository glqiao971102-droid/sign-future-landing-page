import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import RevealObserver from "@/components/RevealObserver";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "SIGN FUTURE ADVERTISING — 3D LED Signboards, Malaysia",
  description:
    "SIGN FUTURE ADVERTISING — premium custom 3D LED illuminated signboards in Malaysia. For shopfronts, indoor logo walls, restaurants, retail, offices and showrooms. Factory direct, design to fabrication, West Malaysia delivery, fast quote.",
};

// S3 host that serves the gallery / hero images. Warming the connection early
// makes the images load noticeably faster on the first view.
const s3Host =
  process.env.S3_BUCKET && process.env.S3_REGION
    ? `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`
    : null;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-lang="en">
      <head>
        {s3Host && (
          <>
            <link rel="preconnect" href={s3Host} crossOrigin="" />
            <link rel="dns-prefetch" href={s3Host} />
          </>
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top">
        <LanguageProvider>
          {children}
          <WhatsAppFloat />
          <RevealObserver />
        </LanguageProvider>
      </body>
    </html>
  );
}
