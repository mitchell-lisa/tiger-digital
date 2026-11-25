import type { IconName } from "@/components/Icon";

/**
 * Content for /marketing-diligence.
 *
 * Kept out of the page for the same reason lib/search-funds.ts is: the copy is
 * the part that gets revised, and it is easier to revise a list than a tree of
 * JSX. Nothing here is a claim about a result. The only numbers on the page
 * come from lib/site.ts, which is where measured figures live.
 */

/** The three stages, in the order a deal actually runs. */
export const stages: {
  when: string;
  name: string;
  timing: string;
  summary: string;
  items?: { label: string; note?: string }[];
  closing?: string;
}[] = [
  {
    when: "Signed LOI",
    name: "Free snapshot",
    timing: "Right after you sign",
    summary: "A one-page read within about 48 hours, built from public data.",
    items: [
      { label: "Search demand in the area" },
      { label: "A quick Google Maps rank check" },
      { label: "Google Business Profile: claimed, complete, active" },
      { label: "Reviews and rating against the main competitors" },
      { label: "Whether they advertise, and whether there is any real SEO" },
      {
        label: "Local Services Ads eligibility",
        note: "Eligible but not on it yet is usually a good sign.",
      },
      { label: "A quick read on the website" },
      { label: "How competitive the local market is" },
      { label: "Where leads would realistically come from" },
    ],
  },
  {
    when: "Due diligence",
    name: "Marketing Diligence Report",
    timing: "While you are in diligence",
    summary:
      "An 8 to 10 page report and a 30 minute call. Each section checks one of our services before close.",
    closing:
      "It ends with a low, mid and high estimate of extra leads over 12 months, what it would cost to get there, and a plain verdict: real upside, limited upside, or marketing will not fix this. You also get a one-page summary to forward to a lender or investors.",
  },
  {
    when: "Close",
    name: "Day-one plan",
    timing: "The week you take over",
    summary:
      "The findings become the first 90 days. Custody and tracking first, then the services in the order the report pointed to.",
    closing:
      "Paid search can bring calls in week one. SEO and reputation build over months.",
  },
];

/** What the full report checks, one section per service we run. */
export const reportSections: { name: string; what: string; icon: IconName }[] = [
  {
    name: "Local SEO and AI visibility",
    what: "Rankings across the service area, neighborhood by neighborhood, and in AI answers.",
    icon: "pin",
  },
  {
    name: "Paid ads",
    what: "Where ads would fill the gaps, and roughly what a lead would cost.",
    icon: "target",
  },
  {
    name: "Reputation",
    what: "Rating and reviews against the competitors that matter.",
    icon: "reviews",
  },
  {
    name: "Custody",
    what: "Who controls the Google profile, the domain, the phone number and the ad accounts.",
    icon: "globe",
  },
  {
    name: "Owner dependency",
    what: "How much of the business depends on the owner personally.",
    icon: "profile",
  },
];

export const pricing: { name: string; price: string; when: string; note?: string }[] = [
  {
    name: "Free snapshot",
    price: "$0",
    when: "Once you are under LOI",
  },
  {
    name: "Marketing Diligence Report",
    price: "$1,000",
    when: "During diligence",
    note: "Counts as your first month if you sign on after close.",
  },
];

/** Options on the request form. Values are what arrives in the email. */
export const roles = ["Searcher", "Broker", "Lender", "Investor", "Other"];
export const dealStages = ["Just signed LOI", "In diligence", "Closing soon"];

/**
 * Shown under the form. Not legal advice drafted by us, and deliberately
 * plain: the report is research, and a buyer should not read it as a view on
 * price or on whether to do the deal.
 */
export const smallPrint =
  "Reports are for information only. They are not a valuation and not advice on price or whether to buy. We work from public data unless the buyer provides more. Growth estimates are ranges, not guarantees.";
