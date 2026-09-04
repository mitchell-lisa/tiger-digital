import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import ServicesOverview from "@/components/ServicesOverview";
import Results from "@/components/Results";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoWall />
      <ServicesOverview />
      <Results />
      <HowWeWork />
      <Testimonials exclude="DKP Gastro Team" />

      <CTABand />
    </>
  );
}
