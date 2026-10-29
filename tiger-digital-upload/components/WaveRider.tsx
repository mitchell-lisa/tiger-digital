/**
 * A wave breaking left to right with a surfer riding the face.
 *
 * Drawn here as SVG rather than shipped as a GIF: it is a few kilobytes
 * instead of a hundred, stays sharp at any size, is original artwork with no
 * licensing question behind it, and is built from the brand palette so it
 * cannot drift out of the colour system.
 *
 * Three water layers move at different speeds, which is what reads as depth.
 * The rider and the curl travel together so the surfer stays on the face of
 * the wave rather than sliding along a flat line.
 *
 * Decorative: aria-hidden, and it holds still for anyone who asks their
 * system to reduce motion.
 */
export default function WaveRider() {
  return (
    <div
      className="relative h-24 sm:h-28 lg:h-32 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      {/* Back swell: palest, slowest, furthest away. */}
      <svg
        className="wave-layer wave-back absolute bottom-0 h-full"
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={`${SWELL} ${SWELL_SHIFTED}`} fill="var(--color-first-light)" opacity="0.45" />
      </svg>

      {/* Mid swell. */}
      <svg
        className="wave-layer wave-mid absolute bottom-0 h-full"
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={`${SWELL} ${SWELL_SHIFTED}`} fill="var(--color-set-blue)" opacity="0.55" />
      </svg>

      {/* The breaking wave and its rider, travelling across the strip. */}
      <svg className="wave-rider absolute bottom-0 h-full" viewBox="0 0 560 160" fill="none">
        {/* The breaking section, shifted right so the rider has clean face to
            ride. The curl is the shape the logo is built from. */}
        <g transform="translate(150 0)">
        <path
          d="M40 150 C60 96 108 52 168 52 C214 52 246 78 252 112 C246 90 226 76 202 76 C170 76 150 100 150 124 C150 136 155 146 163 150 Z"
          fill="var(--color-deep-water)"
        />
        {/* Foam along the lip. */}
        <path
          d="M168 52 C214 52 246 78 252 112 C240 86 214 68 182 66 C176 66 170 60 168 52 Z"
          fill="var(--color-foam)"
          opacity="0.85"
        />
        {/* Spray off the lip. */}
        <g fill="var(--color-foam)" opacity="0.7">
          <circle cx="258" cy="70" r="4" />
          <circle cx="272" cy="58" r="3" />
          <circle cx="284" cy="66" r="2.2" />
          <circle cx="250" cy="52" r="2.6" />
        </g>
        </g>

        {/* Rider, dropping down the open face. The outer group places them on
            the wave and the inner one does the bobbing, so the position and
            the animation cannot drift apart. */}
        <g transform="translate(92 54) scale(1.5)">
          <g className="wave-surfer">
          {/* Board, angled into the drop. */}
          <rect
            x="-22"
            y="26"
            width="48"
            height="7"
            rx="3.5"
            fill="var(--color-swell)"
            transform="rotate(16 2 29)"
          />
          {/* Legs, crouched. */}
          <path
            d="M-2 26 L-7 14 M8 24 L7 12"
            stroke="var(--color-deep-water)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Torso, leaning into the turn. */}
          <path
            d="M-7 14 C-6 6 2 2 7 1"
            stroke="var(--color-deep-water)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Arms out for balance. */}
          <path
            d="M-4 7 L-17 2 M4 4 L16 10"
            stroke="var(--color-deep-water)"
            strokeWidth="4"
            strokeLinecap="round"
          />
            <circle cx="9" cy="-5" r="5.5" fill="var(--color-deep-water)" />
          </g>
        </g>
      </svg>

      {/* Front water, closest and fastest, so the rider sits inside the sea. */}
      <svg
        className="wave-layer wave-front absolute bottom-0 h-full"
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={`${FRONT} ${FRONT_SHIFTED}`} fill="var(--color-swell)" />
      </svg>
    </div>
  );
}

/**
 * One tile of water, repeated twice so the strip can scroll by exactly one
 * tile and start over without a seam. Both ends sit at the same height with
 * the same slope, which is what makes the join invisible.
 */
const SWELL = "M0 104 C150 74 250 74 400 104 C550 134 650 134 800 104 C950 74 1050 74 1200 104 L1200 160 L0 160 Z";
const SWELL_SHIFTED =
  "M1200 104 C1350 74 1450 74 1600 104 C1750 134 1850 134 2000 104 C2150 74 2250 74 2400 104 L2400 160 L1200 160 Z";
const FRONT = "M0 126 C120 108 220 108 340 126 C460 144 560 144 680 126 C820 106 1060 106 1200 126 L1200 160 L0 160 Z";
const FRONT_SHIFTED =
  "M1200 126 C1320 108 1420 108 1540 126 C1660 144 1760 144 1880 126 C2020 106 2260 106 2400 126 L2400 160 L1200 160 Z";
