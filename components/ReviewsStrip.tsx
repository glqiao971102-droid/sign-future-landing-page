"use client";

import { useRef } from "react";
import type { SocialLinks } from "@/lib/site";
import type { Review } from "@/lib/reviews";

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="rev-stars" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "on" : undefined}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewsStrip({
  reviews,
  site,
}: {
  reviews: Review[];
  site: SocialLinks;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (reviews.length === 0) return null;

  // Show 4-star and above (Google "Highest rating"), highest first.
  const shown = reviews
    .filter((r) => r.rating >= 4)
    .sort((a, b) => b.rating - a.rating);
  if (shown.length === 0) return null;

  const count = site.googleReviewCount || String(reviews.length);
  const url = site.googleReviewsUrl;
  const hasArrows = shown.length > 1;

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const badgeInner = (
    <>
      <span className="rev-badge-title">Excellent</span>
      <Stars rating={5} />
      <span className="rev-based">Based on {count} reviews</span>
      <span className="rev-google">
        <GoogleG size={20} /> Google
      </span>
    </>
  );

  return (
    <section className="reviews-strip">
      <div className="wrap reviews-inner">
        {url ? (
          <a
            className="rev-badge"
            href={url}
            target="_blank"
            rel="noopener"
            aria-label="See our Google reviews"
          >
            {badgeInner}
          </a>
        ) : (
          <div className="rev-badge">{badgeInner}</div>
        )}

        <div className="rev-carousel">
          {hasArrows && (
            <button
              type="button"
              className="rev-arrow"
              aria-label="Previous reviews"
              onClick={() => scroll(-1)}
            >
              ‹
            </button>
          )}

          <div className="rev-track" ref={trackRef}>
            {shown.map((r, i) => (
              <div className="rev-card" key={i}>
                <div className="rev-card-head">
                  <b>{r.author}</b>
                  <GoogleG size={18} />
                </div>
                <Stars rating={r.rating} />
                {r.text && <p>{r.text}</p>}
              </div>
            ))}
          </div>

          {hasArrows && (
            <button
              type="button"
              className="rev-arrow"
              aria-label="Next reviews"
              onClick={() => scroll(1)}
            >
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
