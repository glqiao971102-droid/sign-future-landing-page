"use client";

import { useRef, useState } from "react";

/**
 * Showcase video with the animated CSS "sign lights up" fallback shown until
 * the real video actually loads (mirrors the original .has-video behaviour).
 *
 * Starts muted (required for autoplay); visitors can unmute with the video's
 * controls if they want to hear it.
 */
export default function ShowcaseVideo() {
  const [hasVideo, setHasVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

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
