"use client";

import { useEffect, useState } from "react";

const IDLE_AFTER = 1200;

export default function CursorRipple() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let timer: number | undefined;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setIdle(true);
      }, IDLE_AFTER);
    };
    const stop = () => {
      setIdle(false);
      window.clearTimeout(timer);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", stop);
    window.addEventListener("scroll", stop, { passive: true });
    document.documentElement.addEventListener("mouseleave", stop);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("scroll", stop);
      document.documentElement.removeEventListener("mouseleave", stop);
    };
  }, []);

  if (!idle || !pos) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[80]"
      style={{ left: pos.x, top: pos.y }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="cursor-ripple" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
    </div>
  );
}
