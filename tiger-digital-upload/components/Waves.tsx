/**
 * Sets of waves crumbling across the strip above the client wall.
 *
 * Drawn as SVG rather than shipped as footage: a few kilobytes instead of
 * megabytes, sharp at any size, no licence to keep track of, and built from
 * the brand tokens so it cannot drift out of the palette.
 *
 * Three things make it read as water rather than as a sine wave:
 *
 * Spacing. Three waves together, a long lull, then two. Swell arrives in
 * sets, and evenly spaced bumps are the thing that most obviously are not.
 *
 * Asymmetry. The bands drift left, so each wave's left side is its leading
 * face. That side is steep and the back is long and gentle, the way a wave
 * stands up as it feels the bottom.
 *
 * Crumbling. Each crest carries a foam cap with spill tumbling down the
 * front of it. A crumbling wave spills forward like this; a pitching one
 * throws a hollow lip, which is a different shape and a different day.
 *
 * Four layers move at different speeds. That parallax is the depth; without
 * it the whole thing reads as one flat ribbon sliding past.
 *
 * Decorative, so aria-hidden, and it holds still for anyone who has asked
 * their system to reduce motion.
 */
export default function Waves() {
  return (
    <div
      className="relative h-24 sm:h-28 lg:h-32 overflow-hidden pointer-events-none select-none"
      aria-hidden
    >
      <Layer
        className="wave-back"
        baseline={86}
        crests={[[110, 0.8], [240, 1], [370, 0.75], [880, 1], [1025, 0.7]]}
        height={24}
        rise={30}
        back={76}
        foam={0.55}
        fill="var(--color-first-light)"
        opacity={0.5}
      />
      <Layer
        className="wave-mid"
        baseline={110}
        crests={[[85, 0.8], [215, 1], [345, 0.75], [855, 1], [1000, 0.7]]}
        height={34}
        rise={34}
        back={86}
        foam={0.8}
        fill="var(--color-set-blue)"
        opacity={0.55}
      />
      <Layer
        className="wave-front"
        baseline={134}
        crests={[[60, 0.8], [190, 1], [320, 0.75], [830, 1], [975, 0.7]]}
        height={44}
        rise={38}
        back={96}
        foam={1.1}
        fill="var(--color-swell)"
      />
      {/* The water at your feet: closest, darkest, and still. */}
      <div className="absolute inset-x-0 bottom-0 h-[9%] bg-ink" />
    </div>
  );
}

const TILE = 1200;

/**
 * One band of water. The tile repeats four times and the band slides by
 * exactly one tile, so the loop has no seam and a wide screen stays covered.
 */
function Layer({
  className,
  baseline,
  crests,
  height,
  rise,
  back,
  foam,
  fill,
  opacity = 1,
}: {
  className: string;
  baseline: number;
  crests: [number, number][];
  height: number;
  rise: number;
  back: number;
  foam: number;
  fill: string;
  opacity?: number;
}) {
  const d = wavePath({ baseline, crests, height, rise, back });
  return (
    <svg
      className={`wave-layer ${className} absolute bottom-0 h-full w-auto`}
      viewBox={`0 0 ${TILE * 4} 160`}
      fill="none"
    >
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${i * TILE} 0)`}>
          <path d={d} fill={fill} opacity={opacity} />
          {crests.map(([x, size]) => (
            <Crest key={x} x={x} y={baseline - height * size} scale={foam * size} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/**
 * Builds the waterline for one tile: flat, then a wave, then flat again.
 *
 * Both ends sit on the baseline with zero slope, which is what lets the tile
 * butt against a copy of itself without a visible join. `rise` is the steep
 * leading face and `back` the long trailing shoulder.
 */
function wavePath({
  baseline,
  crests,
  height,
  rise,
  back,
}: {
  baseline: number;
  crests: [number, number][];
  height: number;
  rise: number;
  back: number;
}) {
  let d = `M0 ${baseline}`;
  for (const [x, size] of crests) {
    const peak = baseline - height * size;
    // Flat water up to the foot of the wave.
    d += ` L${x - rise * size} ${baseline}`;
    // Up the steep leading face.
    d += ` C${x - rise * size * 0.45} ${baseline} ${x - rise * size * 0.4} ${peak} ${x} ${peak}`;
    // Down the long shoulder behind it.
    d += ` C${x + back * size * 0.45} ${peak} ${x + back * size * 0.55} ${baseline} ${x + back * size} ${baseline}`;
  }
  return `${d} L${TILE} ${baseline} L${TILE} 160 L0 160 Z`;
}

/**
 * A crumbling crest: a foam cap on the peak with spill tumbling down the
 * leading face in front of it, which is the left here because the bands
 * drift left.
 */
function Crest({ x, y, scale }: { x: number; y: number; scale: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M-27 11 C-18 1 -7 -4 5 -3 C15 -2 24 1 31 6 C21 4 11 3 0 5 C-10 6 -19 8 -27 11 Z"
        fill="var(--color-foam)"
        opacity="0.92"
      />
      <circle cx="-11" cy="10" r="2.6" fill="var(--color-foam)" opacity="0.75" />
      <circle cx="-19" cy="14" r="2" fill="var(--color-foam)" opacity="0.55" />
      <circle cx="-26" cy="18" r="1.4" fill="var(--color-foam)" opacity="0.4" />
      <circle cx="-3" cy="8" r="1.8" fill="var(--color-foam)" opacity="0.5" />
      <circle cx="11" cy="5" r="1.3" fill="var(--color-foam)" opacity="0.35" />
    </g>
  );
}
