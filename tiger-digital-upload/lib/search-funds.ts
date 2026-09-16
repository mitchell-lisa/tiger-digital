import type { IconName } from "@/components/Icon";

/**
 * Content for the search-fund landing pages (/search-funds and its two tracks).
 *
 * Same rule as lib/site.ts: every number on these pages has to trace back to a
 * campaign we actually ran. Nothing here invents a search-fund-specific result.
 * The stats the track pages render are pulled from `services` in lib/site.ts,
 * so there is still exactly one place where a client number lives.
 */

/** The three things we sell, described the way a searcher thinks about them. */
export type Pillar = {
  slug: string;
  name: string;
  icon: IconName;
  /** Plain-language definition. No jargon the buyer would have to look up. */
  what: string;
  /** How the work actually gets done, in the order it gets done. */
  steps: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "local-seo",
    icon: "pin",
    name: "Local SEO",
    what:
      "Ranking the business across its whole service area on Google Maps and organic search, measured neighborhood by neighborhood instead of by one citywide keyword that flatters the report.",
    steps: [
      "A full rank baseline before anything changes, so you know what you actually bought",
      "Google Business Profile custody, then categories, services, and service-area cleanup",
      "Citation and NAP consistency after the entity or the ownership changes hands",
      "Service and location pages built for the terms that convert, not the terms with volume",
      "Review velocity, because rating and volume move map rank as much as content does",
    ],
  },
  {
    slug: "ai-search",
    icon: "sparkle",
    name: "AI Search Visibility",
    what:
      "Getting the business named in the answer when someone asks ChatGPT, Google AI Overviews, Gemini, Perplexity, or Copilot who to hire in your market.",
    steps: [
      "Baseline tracking of which prompts surface you, which surface a competitor, and which surface nobody",
      "Entity consistency: one name, one address, one phone, one description everywhere a model can read it",
      "Schema and structured data, so services, service area, and hours are parsed instead of guessed",
      "Content written to answer the question directly, in the shape an answer engine will lift",
      "Depth in the review corpus, because AI answers quote what customers actually wrote",
    ],
  },
  {
    slug: "paid-advertising",
    icon: "target",
    name: "Paid Advertising",
    what:
      "Google Search and Local Services Ads pointed only at the zones and terms where organic visibility is not carrying the load yet.",
    steps: [
      "Budget mapped to the rank data: spend where you are invisible, pull back where you already rank",
      "Local Services Ads and Google Guaranteed where the category supports them",
      "Call tracking and offline conversion import, so a booked job is the conversion, not a click",
      "Search-term and negative-keyword discipline from the first week, not the first quarterly review",
      "Reporting that ends at cost per booked job",
    ],
  },
];

/**
 * The handover problems every searcher hits in the first month. These are the
 * ones that cost rankings if they are handled in the wrong order, which is why
 * they get their own section rather than a bullet in a services list.
 */
export const transitionRisks: { title: string; body: string; icon: IconName }[] = [
  {
    title: "The Google Business Profile",
    icon: "profile",
    body:
      "Ownership sits with whoever claimed it, which is often a former employee or an agency the seller fired years ago. Recovering it can take weeks, and almost nothing else should ship until it is yours.",
  },
  {
    title: "The name",
    icon: "tag",
    body:
      "Renaming on day one throws away the reviews, citations, and direct search the seller spent decades building. If the thesis requires a rebrand, it gets sequenced, not switched.",
  },
  {
    title: "The reviews",
    icon: "reviews",
    body:
      "Review history follows the profile, not the LLC. Lose custody of the profile in the transition and the business restarts with no rating in a market where everyone else has one.",
  },
  {
    title: "The phone number",
    icon: "phone",
    body:
      "Port it, do not replace it. The old number is in every directory, every invoice, and the contacts of every customer the seller ever served.",
  },
  {
    title: "The tracking",
    icon: "gauge",
    body:
      "Most sellers have no conversion tracking at all. Until calls and forms are tracked, nobody can tell you what a lead costs, and every budget conversation is a guess.",
  },
  {
    title: "The website and the domain",
    icon: "globe",
    body:
      "If the site is on the seller's personal hosting or registrar account, that is a hostage situation waiting to happen. Get custody in writing before close if you can.",
  },
];

export type Track = {
  slug: string;
  /** Short label for nav, cards, and cross-links. */
  name: string;
  /** How the searcher describes their own deal. */
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lede: string;
  situation: { heading: string; points: string[] };
  /** The track-specific angle on each pillar, keyed by pillar slug. */
  pillarNotes: Record<string, string>;
  plan: { heading: string; intro: string; steps: { title: string; body: string }[] };
  reporting: { heading: string; intro: string; items: string[] };
  faqs: { q: string; a: string }[];
};

export const tracks: Track[] = [
  {
    slug: "self-funded",
    name: "Self-funded search",
    subtitle: "SBA-backed, one operator, debt service from month one",
    metaTitle: "Self-Funded Search: SEO, AI Search & Google Ads",
    metaDescription:
      "Local SEO, AI search visibility, and Google Ads for self-funded searchers. Take custody of the seller's digital assets, baseline what you bought, and turn on demand without breaking the rankings you paid for.",
    eyebrow: "Self-funded search",
    h1: "SEO, AI search, and Google Ads for self-funded searchers.",
    lede:
      "You signed a personal guarantee and the note starts amortizing this month. Marketing has to pay for itself quickly, and it has to avoid breaking what the seller spent thirty years building. That tension is the whole job.",
    situation: {
      heading: "What is usually true on day one",
      points: [
        "An SBA 7(a) note with a personal guarantee, and debt service due whether or not the phone rings",
        "A seller whose lead flow ran on word of mouth and a name everyone in town already knew",
        "A Google Business Profile somebody else claimed years ago and nobody can log into",
        "A website nobody has touched since the last redesign, with no tracking on the phone number",
        "No marketing hire in the budget, and no spare hours to become the marketing hire yourself",
      ],
    },
    pillarNotes: {
      "local-seo":
        "For a single-location or single-service-area business, the whole game is the grid. The seller almost certainly ranks well within a mile of the shop and disappears past it. That gap is the cheapest growth available to you, and it does not require a bigger ad budget.",
      "ai-search":
        "Answer engines lean hard on entity consistency and review depth, which is exactly what gets scrambled during an ownership change. Cleaning that up protects the referral habit the seller built and puts you in answers his competitors have not thought about yet.",
      "paid-advertising":
        "Ads are the only channel that produces calls in week one, which is why they usually go first when there is debt service. But they go on narrowly: the zones the rank data says you are invisible in, the services with the best margin, and nowhere else until the numbers say otherwise.",
    },
    plan: {
      heading: "The first 90 days",
      intro:
        "The sequence matters more than the tactics. Most of the damage we get called in to undo came from optimizing something before taking custody of it, or rebranding before anyone checked what was carrying the rankings.",
      steps: [
        {
          title: "Weeks 1-2: take custody",
          body:
            "Business profile, domain, registrar, hosting, ad accounts, Analytics, Search Console, call tracking. Before anything gets optimized it has to be in your name, and this is the step that quietly takes the longest.",
        },
        {
          title: "Weeks 2-4: baseline what you bought",
          body:
            "Rank tracking across the real service area, AI prompt tracking, and an honest read on which of the seller's leads came from search versus from the seller. You cannot show progress from a starting line you never measured.",
        },
        {
          title: "Weeks 4-8: protect, then fix",
          body:
            "Nothing gets renamed or redirected until we know what carries the rankings. Then profile, categories, citations, schema, and the pages that already earn impressions but do not convert.",
        },
        {
          title: "Weeks 6-12: turn on demand",
          body:
            "Ads go live in the low-visibility zones only. Reviews start flowing from the customer base the seller already earned, which is usually the single highest-leverage asset nobody in the deal thought to value.",
        },
      ],
    },
    reporting: {
      heading: "What lands in your inbox every month",
      intro:
        "You are the operator, the CFO, and the marketing department. The report is built to be read in five minutes between jobs.",
      items: [
        "Rank tracking on the same points every month, so movement is comparable",
        "Cost per booked job, not cost per click",
        "Rating and review count against the two or three competitors who actually take your calls",
        "A one-page read you can forward to your lender or your accountant without translating it",
      ],
    },
    faqs: [
      {
        q: "Should I rename the business after I buy it?",
        a: "Usually not right away. The seller's name is carrying reviews, citations, direct search volume, and in most markets the referral habit of everyone in town. If a rebrand is part of the thesis, we sequence it: stand the new entity up alongside the old one, migrate the profile and citations in a controlled order, and keep the review history intact. Renaming on day one is the fastest way to lose rankings you just paid for.",
      },
      {
        q: "How fast does this start producing leads?",
        a: "Paid search produces calls in the first week it is live, which is why searchers carrying debt service usually start there. Local SEO and AI visibility move on a slower curve. Across our reputation clients the average time to results is about five months. We sequence it so the fast channel funds the slow one.",
      },
      {
        q: "Can we start before close?",
        a: "Yes, and it is the cheapest time to do it. During diligence we can run a full rank baseline on the target, look at how it surfaces in AI answers, and pull whatever ad history exists. It tells you whether the lead flow you are underwriting is a durable asset or one relationship that walks out with the seller.",
      },
      {
        q: "What if the seller never did any marketing at all?",
        a: "That is usually the better version. A business with thirty years of goodwill and no digital footprint has room to move that a business already spending ten thousand a month does not.",
      },
      {
        q: "What does it cost?",
        a: "It depends on the size of the service area and the category. We scope it on the call. We would rather quote a smaller number that works than sell you a retainer your debt service cannot carry.",
      },
    ],
  },
  {
    slug: "traditional",
    name: "Traditional search fund",
    subtitle: "Investor-backed, a board to report to, a five-to-seven year hold",
    metaTitle: "Traditional Search Funds: SEO, AI Search & Paid Ads",
    metaDescription:
      "Local SEO, AI search visibility, and paid advertising for investor-backed search funds. A repeatable playbook across locations and add-ons, with CAC reporting your board and your eventual buyer will accept.",
    eyebrow: "Traditional search fund",
    h1: "SEO, AI search, and paid ads for investor-backed search funds.",
    lede:
      "You have committed capital, a board, and a five-to-seven year hold. Marketing has to do two jobs at once: move the operating number this quarter, and build an asset that still looks like an asset when a diligence team pulls it apart at exit.",
    situation: {
      heading: "What is usually true at close",
      points: [
        "A cap table of investors who expect a quarterly update with real numbers in it",
        "A larger platform business, often multi-location or multi-market, with wildly uneven visibility between them",
        "An add-on thesis, which means the marketing system has to be repeatable rather than bespoke",
        "A board that will ask what customer acquisition cost is, and will not accept a lead count as the answer",
        "An exit years out, where a buyer's diligence team will test whether growth was bought or built",
      ],
    },
    pillarNotes: {
      "local-seo":
        "With multiple locations the failure mode is averaging. A portfolio that looks healthy in aggregate is usually two strong markets subsidizing four invisible ones. We track every market separately and roll it up, so the board sees the distribution and not just the mean.",
      "ai-search":
        "Answer engines resolve a business to an entity, and multi-location operators are where entity data gets messy fastest: inconsistent names, legacy locations, duplicate profiles, franchise-era citations. Cleaning that up is unglamorous and it is the difference between being cited and being invisible.",
      "paid-advertising":
        "Spending the same amount per market is the most common waste we inherit. Some markets need ads, some need a page and twenty reviews. The rank data decides. With offline conversion import, the CAC you report to the board survives contact with the actual job data.",
    },
    plan: {
      heading: "The playbook, and why it is the asset",
      intro:
        "Anyone can run one good campaign. What holds value over a five-year hold is a system that gets applied identically to location twelve and location one, so the growth story is repeatable and the diligence story is clean.",
      steps: [
        {
          title: "Diligence and the first 30 days",
          body:
            "Baseline every market the same way before any change ships. You cannot show a board a trend line that starts after you already fixed things, and you cannot show a buyer one either.",
        },
        {
          title: "Days 30-90: one system, every location",
          body:
            "Profiles, schema, tracking, naming conventions, and review flow standardized, so onboarding a location is a checklist rather than a project.",
        },
        {
          title: "Days 90-180: channel mix per market",
          body:
            "Budget reallocated market by market based on where visibility is actually missing. This is normally where the first meaningful efficiency gain shows up.",
        },
        {
          title: "Ongoing: built to bolt on",
          body:
            "Every add-on gets the same 30-day onboarding: custody, baseline, standardize, grow. The playbook travels with the platform, which is part of what the next buyer is paying for.",
        },
      ],
    },
    reporting: {
      heading: "What the board sees",
      intro:
        "Written for the quarterly update, not for a marketing audience. Every number traces back to a source your investors can check.",
      items: [
        "Per-location rank tracking, with a portfolio roll-up",
        "Share of AI answers by market and by prompt set, tracked over time",
        "Blended and paid CAC, with offline conversions imported so the number is real",
        "A board-ready section every quarter, in your format, that you do not have to rebuild",
        "A clean, continuous attribution history, because the buyer's diligence team will ask for it",
      ],
    },
    faqs: [
      {
        q: "Can you work across multiple locations or brands?",
        a: "Yes, and it is the case the playbook is built for. Each market gets its own baseline and its own budget decision, all rolled up into one portfolio view so you are not reconciling five agency reports.",
      },
      {
        q: "How do you handle add-on acquisitions?",
        a: "The same 30-day onboarding runs every time: take custody of the digital assets, baseline before changing anything, standardize onto the platform's conventions, then grow. Doing it identically each time is what makes the growth defensible later.",
      },
      {
        q: "What exactly do you report to the board?",
        a: "Customer acquisition cost blended and by paid channel, the rank distribution across markets, share of AI answers, and the movement in rating and review volume. We write it as a section you can paste into the update rather than a dashboard login nobody opens.",
      },
      {
        q: "Do you replace an in-house marketing hire?",
        a: "Usually we come before one, then work alongside one. Early on there is rarely enough volume to justify a full-time specialist in every channel. When you do hire, we either hand over the systems or keep the channels the hire does not cover.",
      },
      {
        q: "Why does AI search matter over a five-year hold?",
        a: "Because the share of local research that starts in an answer engine instead of a results page has only moved in one direction. A business that is invisible there in year one has a structural problem by year five, and it is exactly the sort of thing a sophisticated buyer's diligence team now checks.",
      },
    ],
  },
];

/**
 * Looks up a track and throws if the slug is gone. The two track pages call
 * this at module scope, so renaming a slug here fails the build instead of
 * quietly shipping an empty page.
 */
export function requireTrack(slug: string): Track {
  const track = tracks.find((t) => t.slug === slug);
  if (!track) throw new Error(`Unknown search-fund track: ${slug}`);
  return track;
}
