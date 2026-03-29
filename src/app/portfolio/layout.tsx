import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Plan — Websites from R249/month",
  description:
    "Get a fully managed portfolio website with no upfront costs. Intellify's Portfolio Plan includes domain registration, cloud hosting, responsive design, and ongoing updates from R249/month.",
  alternates: {
    canonical: "https://www.intellify.co.za/portfolio",
  },
  openGraph: {
    title: "Portfolio Plan — Websites from R249/month | Intellify",
    description:
      "No upfront costs. Domain, hosting, and code management included. Get your business online from R249/month.",
    url: "https://www.intellify.co.za/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
