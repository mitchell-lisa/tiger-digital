/**
 * Running tiger (animated GIF) sweeping across the strip.
 * Plain <img> so the GIF frames play.
 */
export default function RunningTiger() {
  return (
    <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/tiger-run.gif" alt="" className="tiger-run absolute bottom-0 h-full w-auto" />
    </div>
  );
}
