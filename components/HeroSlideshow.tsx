"use client";

import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "/images/hero-1.jpg", alt: "THE EXCHANGE TRX illuminated signage" },
  { src: "/images/hero-2.jpg", alt: "PAVILION KUALA LUMPUR illuminated signage" },
];

export default function HeroSlideshow() {
  // Track which slide images actually loaded (mirrors the original onerror removal).
  const [broken, setBroken] = useState<boolean[]>(() => SLIDES.map(() => false));
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = SLIDES.filter((_, i) => !broken[i]);
  const hasControls = slides.length >= 2;

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    if (!hasControls) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const go = (i: number) => {
    setIdx((i + slides.length) % slides.length);
    restart();
  };

  return (
    <section className="hero">
      <div className="hero-fallback" />
      <div className="hero-slides" id="heroSlides">
        {SLIDES.map((s, i) =>
          broken[i] ? null : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              className={`hero-slide${
                slides[idx]?.src === s.src ? " is-on" : ""
              }`}
              src={s.src}
              alt={s.alt}
              onError={() =>
                setBroken((b) => {
                  const next = [...b];
                  next[i] = true;
                  return next;
                })
              }
            />
          )
        )}
      </div>
      {hasControls && (
        <>
          <button
            className="hero-arrow prev"
            type="button"
            aria-label="Previous"
            onClick={() => go(idx - 1)}
          >
            &#8249;
          </button>
          <button
            className="hero-arrow next"
            type="button"
            aria-label="Next"
            onClick={() => go(idx + 1)}
          >
            &#8250;
          </button>
          <div className="hero-dots" id="heroDots">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={i === idx ? "on" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
