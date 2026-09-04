/**
 * Single source of truth for every business fact on the site.
 * Every value below was taken from tigerdigital.marketing (Aug 2026).
 * Unknown facts are null and render nothing. Never guess.
 */

export const site = {
  name: "Tiger Digital",
  legalName: "Tiger Digital LLC",
  tagline: "Real growth. No fluff.",
  description:
    "Tiger Digital is a marketing agency for acquisition entrepreneurs. Reviews, Google Maps and AI search rankings, and Google Ads to dominate local search after the acquisition.",
  url: "https://www.tigerdigital.marketing",

  phone: "856-924-9880",
  phoneHref: "tel:+18569249880",
  email: "Joe@tigerdigital.marketing",
  city: "Moorestown",
  state: "NJ",
  stateLong: "New Jersey",
  // Supplied by Joe for the LocalBusiness schema. It is published in structured
  // data only. Nothing on the page renders it, and the legal pages say only
  // "Moorestown, New Jersey".
  streetAddress: "235 Winding Way",
  postalCode: "08057",
  hours: null as string | null, // not published

  /** Google Tag Manager container. Joe owns the container and the tags inside it. */
  gtmId: "GTM-WDK94G82",

  social: {
    instagram: "https://www.instagram.com/tigerdigitalllc",
    linkedin: "https://www.linkedin.com/company/tiger-digital-llc",
    facebook: "https://www.facebook.com/profile.php?id=61564562785554",
  },

  cta: {
    primary: { label: "Book a consultation", href: "/contact" },
    secondary: { label: "Call 856-924-9880", href: "tel:+18569249880" },
  },
};

/**
 * Reviews Joe published on his own testimonials page, quoted verbatim with the
 * names and dates as he published them. Used for schema only; the on-page
 * testimonials come from the `testimonials` array below.
 *
 * Google does not show review stars for reviews a business hosts about itself
 * (the "self-serving" rule, 2019). This markup is accurate, it just will not
 * earn a rich result. Kept because Joe asked for it.
 */
export const publishedReviews = {
  ratingValue: "5.0",
  reviewCount: "8",
  items: [
    {
      author: "Jack B.",
      datePublished: "2025-07-20",
      name: "Highly Recommended for SEO and Marketing",
      body: "Tiger Digital is the best out there for SEO, reputation management, and strategic marketing consulting. I would highly recommend any small business to leverage TD to improve their web presence.",
    },
    {
      author: "Doug A.",
      datePublished: "2025-07-18",
      name: "Explosive Lead Growth and Expert Help",
      body: "If you are looking to get your business noticed, then I would strongly suggest that you give Joe from Tiger Digital a call. I am so grateful for his hands-on help with our company. We experienced explosive leads since hiring Joe. His knowledge goes beyond his years.",
    },
  ],
};

/** Studio credit in the footer. Same on every site we build. */
export const builtBy = {
  name: "MJL Collective",
  url: "https://mjlcollective.com",
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  bullets: string[];
  results: { value: string; label: string; note?: string }[];
  resultsHeading: string;
};

export const services: Service[] = [
  {
    slug: "local-seo",
    name: "Local SEO & AI Visibility",
    short:
      "Show up across your whole service area: Google Maps, traditional search, and AI-powered search.",
    intro:
      "Most businesses are strong in some neighborhoods and invisible in others, with no clear picture of their real coverage. We track visibility on a geo-grid across your service area, neighborhood by neighborhood, and fix the blind spots. We also track how your business surfaces in AI-generated answers and optimize for those queries.",
    bullets: [
      "Geo-grid heatmap tracking across your service area",
      "Neighborhood-level visibility analysis",
      "Google Business Profile and local-intent optimization",
      "AI search visibility tracking and optimization",
    ],
    resultsHeading: "One campaign, tracked on “calibration services near me”",
    results: [
      { value: "155.6%", label: "Improvement in local visibility" },
      { value: "10.6 to 5.2", label: "Average map ranking" },
      { value: "11% to 43%", label: "Share of top-3 placements" },
    ],
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising",
    short:
      "Google Ads built around local intent. Spend where you're invisible, pull back where you already rank.",
    intro:
      "Paid ads driving traffic but not consistent conversions is the most common problem we inherit. Instead of running ads everywhere, we use local visibility data to decide where ads are actually needed, where organic rankings already carry weight, where competitors are gaining ground, and where budget creates the most impact.",
    bullets: [
      "Google Search Ads built around local intent",
      "Strategic coverage in low-visibility zones",
      "Pulling back spend where organic presence is already strong",
      "Visual reporting that makes sense without a marketing degree",
    ],
    resultsHeading: "First month after taking over one client's ad account",
    results: [
      { value: "41%", label: "Reduction in ad spend" },
      { value: "25%", label: "Increase in conversions" },
    ],
  },
  {
    slug: "reputation-management",
    name: "Reputation Management",
    short:
      "Turn happy customers into your loudest advocates with a steady flow of genuine five-star reviews.",
    intro:
      "Reviews are a critical driver in the customer journey for local businesses. Consumers rely on online feedback to decide who to call, and review volume and rating directly affect local SEO performance and organic leads. We work with established businesses that have a loyal customer base and haven't yet capitalized on it.",
    bullets: [
      "Review generation from real, satisfied customers",
      "Negative-review winbacks and response strategy",
      "Monitoring across Google and the platforms that matter for your category",
      "Clear reporting on rating, volume, and where you stand vs. competitors",
    ],
    resultsHeading: "What our reputation clients gain on average",
    results: [
      { value: "309%", label: "Average positive review growth" },
      { value: "5 mo", label: "Average time to results" },
      { value: "3.4 to 4.7", label: "Average rating boost" },
      { value: "+114", label: "Positive reviews added" },
      { value: "-110", label: "Negative reviews removed or avoided" },
    ],
  },
];

export const clients: { name: string; logo: string; url?: string; dark?: boolean }[] = [
  { name: "MP Copiers", logo: "/clients/mp-copiers.png", url: "https://www.mpcopiers.com/" },
  { name: "Water Runner LLC", logo: "/clients/water-runner.png", url: "https://waterrunner.com/" },
  { name: "Tra-Cal", logo: "/clients/tra-cal.png", url: "https://www.tra-cal.com/" },
  { name: "Chiro Jobs", logo: "/clients/chiro-jobs.png", url: "https://www.chirojobs.com/" },
  { name: "American Discount Fence", logo: "/clients/american-discount-fence.png", url: "https://www.americandiscountfence.com/" },
  { name: "Wright Choice Therapy", logo: "/clients/wright-choice-therapy.png", url: "https://wrightchoicetherapynj.com/" },
  { name: "TeaConnect", logo: "/clients/tea-connect.png", url: "https://teaconnect.io/" },
  { name: "Barrio Costero", logo: "/clients/barrio-costero.png", url: "https://www.barriocostero.com/" },
  { name: "Cherry Hill Painting", logo: "/clients/cherry-hill-painting.png", url: "https://www.cherryhillpainting.com/" },
  { name: "Anderson Market", logo: "/clients/anderson-market.png", url: "https://www.andersonmkt.com/" },
  { name: "Reyla", logo: "/clients/reyla.png", url: "https://www.heyreyla.com/" },
  { name: "Ryfe Bar & Restaurant", logo: "/clients/ryfe.png", url: "https://ryferestaurant.com/" },
  { name: "Laylow", logo: "/clients/laylow.png", url: "https://www.laylowap.com/" },
  { name: "Miss to Mrs Bridal Boutique", logo: "/clients/miss-to-mrs.png", url: "https://misstomrsbridalboutique.com/" },
  { name: "Live Long", logo: "/clients/live-long.png" }, // website not found; add when Joe confirms
  { name: "Inspiration Mobility Group", logo: "/clients/inspiration-mobility.png", url: "https://inspirationmobility.com/", dark: true },
  { name: "DKP Gastro", logo: "/clients/dkp-gastro.png", url: "https://www.dkpgastro.com/" },
  { name: "Willco Air Conditioning, Refrigeration & Heating", logo: "/clients/willco-air-conditioning.png", url: "https://willcoairconditioning.com/" },
  // Their logo is white, made for a dark header, so it gets the navy tile.
  { name: "Resource Renewal", logo: "/clients/resource-renewal.png", url: "https://www.resourcerenewal.com/", dark: true },
  { name: "ViperJet Drain Services", logo: "/clients/viperjet-drain.png", url: "https://www.viperjetdrain.com/" },
];

export const testimonials = [
  {
    quote:
      "Tiger Digital helped us achieve 317 five-star reviews in under six months. This kind of growth exceeded our expectations and has been key to reaching more people. Their work speaks for itself!",
    name: "DKP Gastro Team",
    role: "DKP Gastro Associates",
  },
  {
    quote:
      "If you are looking to get your business noticed, then I would strongly suggest that you give Joe from Tiger Digital a call. I am so grateful for his hands-on help with our company. We experienced explosive leads since hiring Joe. His knowledge goes beyond his years.",
    name: "Doug Anderson",
    role: "CEO, Cherry Hill Painting",
  },
  {
    quote:
      "Tiger Digital skyrocketed our appointments and online presence, opening up a whole new funnel of opportunities for us!",
    name: "Miss to Mrs Bridal Boutique",
    role: "Client",
  },
  {
    quote:
      "The Tiger Digital team is professional, data-driven, and genuinely cares about the success of their clients.",
    name: "Chris Viola",
    role: "CEO & Founder, TeaConnect",
  },
];

export const team = [
  {
    name: "Joe DiMarino",
    role: "Founder & CEO",
    photo: "/team/joe.webp",
    bio: "Joe grew up in Moorestown, New Jersey, and holds a bachelor's degree in Public and International Affairs and Entrepreneurship from Princeton University. He founded Tiger Digital to drive measurable results for local businesses, and works directly with every client.",
  },
  {
    name: "Marvin Bermudez",
    role: "Digital Marketing & Web",
    photo: "/team/marvin.webp",
    bio: "Marv has extensive experience in digital marketing and web development, with a focus on increasing online visibility and generating qualified leads. Google Ads Certified, specializing in SEO, PPC, social, email, and website optimization.",
  },
  {
    name: "Santiago Mendoza",
    role: "Operations Associate, Paid Media",
    photo: "/team/santiago.webp",
    bio: "Santiago holds a Bachelor's degree in Business Administration and specializes in paid advertising and advanced analytics across all forms of paid media.",
  },
  {
    name: "Kyle Fabian",
    role: "Operations Associate",
    photo: "/team/kyle.webp",
    bio: "Kyle holds a Bachelor's degree in Mechanical Engineering and specializes in operational strategy and systems optimization, keeping every project running smoothly across the team.",
  },
  {
    name: "Gina Cooney",
    role: "Accounting Director",
    photo: "/team/gina.webp",
    bio: "Gina is a seasoned educator who continues to work in the education field and supports Tiger Digital part time.",
  },
];

export const challenges = [
  "Strong visibility in some neighborhoods, invisible in others",
  "Paid ads driving traffic, but inconsistent conversions",
  "A rating that doesn't reflect how good the work actually is",
  "No clear picture of local coverage, or what the budget is buying",
];
