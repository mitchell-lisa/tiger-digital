import type { Metadata } from "next";
import SearchFundTrack from "@/components/SearchFundTrack";
import { requireTrack } from "@/lib/search-funds";

const track = requireTrack("traditional");

export const metadata: Metadata = {
  title: track.metaTitle,
  description: track.metaDescription,
  alternates: { canonical: "/search-funds/traditional" },
};

export default function Page() {
  return <SearchFundTrack track={track} />;
}
