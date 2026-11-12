"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VolumeX } from "lucide-react";

const STORAGE_KEY = "homely-music-muted";
const TARGET_VOLUME = 0.35;

function readMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function saveMuted(muted: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted));
  } catch {}
}

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const step = (target - audio.volume) / 20;
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + step;
      if ((step >= 0 && next >= target) || (step < 0 && next <= target)) {
        audio.volume = target;
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        onDone?.();
      } else {
        audio.volume = next;
      }
    }, 100);
  };

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
        return true;
      })
      .catch(() => {
        setPlaying(false);
        return false;
      });
  };

  const pause = () => {
    setPlaying(false);
    fadeTo(0, () => audioRef.current?.pause());
  };

  useEffect(() => {
    if (readMuted()) return;
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (audioRef.current?.paused) play();
    };
    play().then((started) => {
      if (!started) events.forEach((e) => window.addEventListener(e, start));
    });
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) {
      pause();
      saveMuted(true);
    } else {
      play();
      saveMuted(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/homely-theme.mp3" loop preload="auto" />
      <motion.button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        aria-pressed={playing}
        title={playing ? "Turn music off" : "Turn music on"}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[70] w-12 h-12 rounded-full flex items-center justify-center bg-banana/70 backdrop-blur-md border border-parchment/25 text-parchment shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-banana/90 transition-colors"
      >
        {playing ? (
          <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-brass-light"
                animate={{ height: ["30%", "100%", "45%", "80%", "30%"] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              />
            ))}
          </span>
        ) : (
          <VolumeX size={19} aria-hidden="true" />
        )}
      </motion.button>
    </>
  );
}
