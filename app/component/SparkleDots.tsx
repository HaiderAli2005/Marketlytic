"use client";

import { useEffect, useState } from "react";

export default function SparkleDots() {
  const [mounted, setMounted] = useState(false);
  const gridSize = 22; // matches CSS
  const dotSize = 1.2; // matches CSS

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const sparkles = [];

  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 60; y++) {
      if (Math.random() < 0.03) {
        // 3% of dots sparkle at a time
        sparkles.push({
          id: `${x}-${y}`,
          top: y * gridSize,
          left: x * gridSize,
          delay: Math.random() * 4,
          duration: 1.5 + Math.random(),
        });
      }
    }
  }

  return (
    <>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-dot"
          style={{
            top: `${s.top}px`,
            left: `${s.left}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </>
  );
}
