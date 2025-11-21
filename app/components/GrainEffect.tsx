'use client';

export default function GrainEffect() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-5 mix-blend-overlay">
       {/* Ini pola noise SVG otomatis, gak perlu download gambar */}
       <svg className="w-full h-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}