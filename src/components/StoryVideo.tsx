"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const VIDEO_SOUND_EVENT = "homely-video-sound";

export default function StoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const setSound = (on: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !on;
    setMuted(!on);
    window.dispatchEvent(new CustomEvent(VIDEO_SOUND_EVENT, { detail: on }));
  };

  // Mute again when the video scrolls out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !video.muted) {
        video.muted = true;
        setMuted(true);
        window.dispatchEvent(new CustomEvent(VIDEO_SOUND_EVENT, { detail: false }));
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="/video/homely-intro.mp4"
        poster="/video/homely-intro-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="A short film of Homely: the restaurant on Walsgrave Road, the dining room and our dishes"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <button
        type="button"
        onClick={() => setSound(muted)}
        aria-label={muted ? "Turn video sound on" : "Turn video sound off"}
        aria-pressed={!muted}
        className="absolute bottom-4 left-4 w-11 h-11 rounded-full flex items-center justify-center bg-banana/50 backdrop-blur-md border border-parchment/25 text-parchment shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-banana/75 transition-colors"
      >
        {muted ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
      </button>
    </>
  );
}
