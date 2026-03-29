import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const BASE_URL = "https://www.intellify.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Intellify — Go Online. Grow Online.",
    template: "%s | Intellify",
  },
  description:
    "Intellify helps small and medium-sized businesses establish a professional online presence. Fully managed portfolio websites from R249/month — domain included, no upfront costs.",
  keywords: [
    "website design South Africa",
    "affordable website",
    "small business website",
    "portfolio website",
    "web design",
    "online presence",
    "domain registration",
    "managed website",
  ],
  authors: [{ name: "Intellify", url: BASE_URL }],
  creator: "Intellify",
  publisher: "Intellify",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Intellify",
    title: "Intellify — Go Online. Grow Online.",
    description:
      "Fully managed portfolio websites for South African businesses. From R249/month — domain, hosting, and code management included.",
    images: [
      {
        url: "/home.jpg",
        width: 1200,
        height: 630,
        alt: "Intellify — Go Online. Grow Online.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intellify — Go Online. Grow Online.",
    description:
      "Fully managed portfolio websites for South African businesses. From R249/month — no upfront costs.",
    images: ["/home.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Intellify",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  description:
    "Intellify helps small and medium-sized service-based businesses go online with fully managed, affordable portfolio websites.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "pieter@intellify.co.za",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
