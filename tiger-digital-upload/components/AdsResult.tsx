import Image from "next/image";

/**
 * The paid-ads result: the client's own Google Ads screenshot, repainted into
 * the brand palette. Google's orange chrome and black frame fought everything
 * else on the page, so the UI colours were remapped at build time. The numbers,
 * the line shapes, the axes and the dates are exactly as captured.
 */
export default function AdsResult() {
  return (
    <figure className="rounded-xl border border-line bg-paper overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 sm:px-7 pt-6 pb-5 border-b border-line">
        <p className="text-sm font-semibold">
          Google Ads <span className="text-muted font-normal">· one client account, first month after we took it over</span>
        </p>
        <p className="stat text-tiger text-lg sm:text-xl whitespace-nowrap">41% less spend, 25% more conversions</p>
      </div>

      <Image
        src="/results/ads.jpg"
        alt="Google Ads account for one client. December 2025: 12 conversions, 2.39K impressions, 138 clicks, $1.06K cost. January 2026: 15 conversions, 1.14K impressions, 111 clicks, $622 cost."
        width={1600}
        height={1088}
        sizes="(min-width: 1024px) 76rem, 100vw"
        className="w-full h-auto px-4 sm:px-6 py-6"
      />

      <figcaption className="px-5 sm:px-7 py-4 border-t border-line text-xs text-muted leading-relaxed">
        Actual client ad account, December 2025 against January 2026. Spend fell while conversions
        rose: the impressions we gave up were the ones outside the service area that were never
        going to convert.
      </figcaption>
    </figure>
  );
}
