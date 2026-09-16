"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Split from the route so the Studio bundle is only pulled in when Sanity is
 * actually configured. The marketing pages never import any of this.
 */
export default function StudioClient() {
  return <NextStudio config={config} />;
}
