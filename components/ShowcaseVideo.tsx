"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Showcase video with the animated CSS "sign lights up" fallback shown until
 * the real video actually loads (mirrors the original .has-video behaviour).
 */
export default function ShowcaseVideo() {
  const [hasVideo, setHasVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  // Browsers block autoplay WITH sound, so the video starts muted. The moment
  // the visitor does anything on the page (click / tap / scroll / key), turn
  // the sound on at 50% — no need to press the unmute button.
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart", "wheel"] as const;
    const enableSound = () => {
      const v = vidRef.current;
      if (v) {
        v.muted = false;
        v.volume = 0.5;
        v.play().catch(() => {});
      }
      events.forEach((e) => window.removeEventListener(e, enableSound));
    };
    events.forEach((e) =>
      window.addEventListener(e, enableSound, { passive: true }),
    );
    return () => events.forEach((e) => window.removeEventListener(e, enableSound));
  }, []);

  return (
    <div
      className={`video-frame${hasVideo ? " has-video" : ""}`}
      id="videoFrame"
      data-reveal
    >
      <video
        id="showcaseVid"
        ref={vidRef}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        onLoadedData={() => {
          setHasVideo(true);
          vidRef.current?.play().catch(() => {});
        }}
      >
        <source src="/videos/showcase.mp4" type="video/mp4" />
      </video>
      <div className="signscene" aria-hidden="true">
        <div className="bld">
          <div className="windows">
            <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
          </div>
          <div className="fascia">
            <div className="glow" />
            <div className="sign">SIGN FUTURE</div>
          </div>
          <div className="canopy">
            <i /><i /><i /><i /><i /><i /><i /><i />
          </div>
        </div>
      </div>
    </div>
  );
}
