import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Pricing } from "@/components/sections/Pricing";
import { Portfolio } from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Intellify — Go Online. Grow Online.",
  description:
    "Intellify helps South African small businesses establish a professional online presence with fully managed portfolio websites from R249/month. Domain, hosting, and updates included.",
  alternates: {
    canonical: "https://www.intellify.co.za",
  },
  openGraph: {
    url: "https://www.intellify.co.za",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full font-sans">
      <Hero />
      <Mission />
      <Pricing />
      <Portfolio />
    </div>
  );
}
