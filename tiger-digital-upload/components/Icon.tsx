/**
 * One icon set for the whole site.
 *
 * Drawn to sit beside the hand-inked tiger and the seal rather than beside a
 * stock icon font: a single 1.7 stroke weight, round caps and joins, and paths
 * that are deliberately a little off-square (a rule that tilts a degree, a
 * corner that overshoots) so they read as drawn rather than snapped to a grid.
 *
 * Everything is a stroke on `currentColor`, so colour comes from the caller and
 * the set stays on-brand wherever it lands: navy on paper, sky on navy.
 */
export type IconName =
  | "pin"
  | "sparkle"
  | "target"
  | "star"
  | "calendar"
  | "growth"
  | "plus-circle"
  | "minus-circle"
  | "profile"
  | "tag"
  | "reviews"
  | "phone"
  | "gauge"
  | "globe";

const paths: Record<IconName, React.ReactNode> = {
  // Map pin, for local search and coverage.
  pin: (
    <>
      <path d="M12 21.4c.4-.5 6.6-6.1 6.6-11.5A6.7 6.7 0 0 0 12 3.2a6.6 6.6 0 0 0-6.6 6.7c0 5.5 6.3 11.1 6.6 11.5z" />
      <circle cx="12" cy="9.8" r="2.5" />
    </>
  ),
  // Answer-engine spark, for AI search visibility.
  sparkle: (
    <>
      <path d="M12 3.2c.7 3.7 1.8 5 5.4 5.9-3.6.9-4.7 2.2-5.4 5.9-.7-3.7-1.8-5-5.4-5.9 3.6-.9 4.7-2.2 5.4-5.9z" />
      <path d="M17.8 15.1c.4 1.8.9 2.5 2.7 3-1.8.4-2.3 1.1-2.7 2.9-.3-1.8-.9-2.5-2.6-2.9 1.7-.5 2.3-1.2 2.6-3z" />
    </>
  ),
  // Target, for paid spend aimed at a zone.
  target: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="0.9" />
    </>
  ),
  star: (
    <path d="M12 3.4l2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 3.4z" />
  ),
  calendar: (
    <>
      <rect x="3.4" y="5.2" width="17.2" height="15.3" rx="2.1" />
      <path d="M3.6 10.1h16.9M8.2 3.4v3.6M15.8 3.4v3.6" />
    </>
  ),
  // Trend line climbing out of an axis, for improvement over time.
  growth: (
    <>
      <path d="M3.6 20.3V4.1" />
      <path d="M3.6 20.3h16.6" />
      <path d="M6.9 16.4l3.6-4.3 3.3 2.5 4.8-6.2" />
      <path d="M15.1 8.2h3.6v3.6" />
    </>
  ),
  "plus-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.3v7.4M8.3 12h7.4" />
    </>
  ),
  "minus-circle": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12h7.4" />
    </>
  ),
  // Person on a card, for profile ownership.
  profile: (
    <>
      <rect x="3.2" y="4.6" width="17.6" height="14.9" rx="2.2" />
      <circle cx="9.4" cy="10.6" r="2.1" />
      <path d="M6.1 16.2c.5-1.8 1.8-2.7 3.3-2.7s2.8.9 3.3 2.7" />
      <path d="M15.4 10.2h3.1M15.4 13.4h3.1" />
    </>
  ),
  // Luggage tag, for the business name.
  tag: (
    <>
      <path d="M4.2 11.1V5.3a1 1 0 0 1 1-1h5.8a2 2 0 0 1 1.4.6l7 7a1.9 1.9 0 0 1 0 2.7l-5.3 5.3a1.9 1.9 0 0 1-2.7 0l-7-7a2 2 0 0 1-.6-1.4z" />
      <circle cx="8.3" cy="8.2" r="1.3" />
    </>
  ),
  // Speech bubble with a star, for review history.
  reviews: (
    <>
      <path d="M20.4 15.3a2 2 0 0 1-2 2H7.9L3.6 21V5.6a2 2 0 0 1 2-2h12.8a2 2 0 0 1 2 2z" />
      <path d="M12 7.4l1.4 2.8 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4L12 7.4z" />
    </>
  ),
  phone: (
    <path d="M20.5 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.4 17.4 0 0 1-7.6-2.7 17.1 17.1 0 0 1-5.3-5.3A17.4 17.4 0 0 1 3 5.6a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.6c.1 1 .3 2 .7 2.9a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.4 1.9.6 2.9.7a1.8 1.8 0 0 1 1.6 1.8z" />
  ),
  // Dial, for measurement and tracking.
  gauge: (
    <>
      <path d="M3.7 16.6a8.7 8.7 0 1 1 16.6 0" />
      <path d="M12 16.3l3.9-4.6" />
      <circle cx="12" cy="16.6" r="1.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8" />
      <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z" />
    </>
  ),
};

export default function Icon({
  name,
  className = "w-6 h-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
