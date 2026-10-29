/**
 * A wave breaking left to right with a surfer riding its face.
 *
 * Drawn as SVG rather than shipped as a GIF: a few kilobytes instead of a
 * hundred, sharp at any size, original artwork with no licensing question
 * behind it, and built from the brand tokens so it cannot drift out of the
 * palette.
 *
 * Two things govern the composition. The rider has to sit *on* the face of
 * the wave, inside the dark water, not beside it on flat sea - so the wave is
 * drawn large enough to have a face worth riding, and the rider is placed
 * well inside its fill. And because that fill is Deep Water, the rider is cut
 * out of it in Sand: a dark figure on dark water disappears, which is exactly
 * what the first attempt did.
 *
 * The water layers move at different speeds, which is what reads as depth.
 * Decorative, so aria-hidden, and it holds still for anyone who asks their
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

      <svg
        className="wave-layer wave-mid absolute bottom-0 h-full"
        viewBox="0 0 2400 160"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={`${SWELL} ${SWELL_SHIFTED}`} fill="var(--color-set-blue)" opacity="0.5" />
      </svg>

      {/* The breaking wave and its rider, travelling across the strip. */}
      <svg className="wave-rider absolute bottom-0 h-full" viewBox="0 0 560 160" fill="none">
        {/* The wave. Scaled up from the logo's curl so the face is big enough
            to carry a rider; the transform keeps its base on the waterline. */}
        <g transform="translate(98 -45) scale(1.3)">
          <path
            d="M40 150 C60 96 108 52 168 52 C214 52 246 78 252 112 C246 90 226 76 202 76 C170 76 150 100 150 124 C150 136 155 146 163 150 Z"
            fill="var(--color-deep-water)"
          />
          {/* Foam along the lip. */}
          <path
            d="M168 52 C214 52 246 78 252 112 C240 86 214 68 182 66 C176 66 170 60 168 52 Z"
            fill="var(--color-foam)"
            opacity="0.9"
          />
          {/* Spray thrown off the lip. */}
          <g fill="var(--color-foam)" opacity="0.65">
            <circle cx="258" cy="70" r="4" />
            <circle cx="272" cy="58" r="3" />
            <circle cx="284" cy="66" r="2.2" />
            <circle cx="250" cy="52" r="2.6" />
          </g>
        </g>

        {/* Rider, cut out of the wave face in Sand. Drawn after the wave so it
            sits on the water rather than behind it. The outer group places
            them; the inner one does the bobbing, so position and animation
            cannot drift apart. */}
        <g transform="translate(272 86) scale(1.15)">
          <g className="wave-surfer">
            {/* Spray off the tail. */}
            <path
              d="M-26 30 C-18 26 -8 26 0 29"
              stroke="var(--color-foam)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* Board, angled into the line he is drawing across the face. */}
            <rect
              x="-22"
              y="25"
              width="48"
              height="7"
              rx="3.5"
              fill="var(--color-sand)"
              transform="rotate(14 2 28)"
            />
            {/* Legs, crouched over the board. */}
            <path
              d="M-2 25 L-7 13 M8 23 L7 11"
              stroke="var(--color-sand)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Torso, leaning into the drop. */}
            <path
              d="M-7 13 C-6 5 2 1 7 0"
              stroke="var(--color-sand)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Arms out for balance. */}
            <path
              d="M-4 6 L-18 1 M4 3 L16 9"
              stroke="var(--color-sand)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="9" cy="-6" r="5.5" fill="var(--color-sand)" />
          </g>
        </g>
      </svg>

      {/* Front water, closest and fastest. It sits low enough to leave the
          wave's face clear; raising it would swallow the rider. */}
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
const SWELL = "M0 120 C150 98 250 98 400 120 C550 142 650 142 800 120 C950 98 1050 98 1200 120 L1200 160 L0 160 Z";
const SWELL_SHIFTED =
  "M1200 120 C1350 98 1450 98 1600 120 C1750 142 1850 142 2000 120 C2150 98 2250 98 2400 120 L2400 160 L1200 160 Z";
const FRONT = "M0 138 C120 124 220 124 340 138 C460 152 560 152 680 138 C820 122 1060 122 1200 138 L1200 160 L0 160 Z";
const FRONT_SHIFTED =
  "M1200 138 C1320 124 1420 124 1540 138 C1660 152 1760 152 1880 138 C2020 122 2260 122 2400 138 L2400 160 L1200 160 Z";
