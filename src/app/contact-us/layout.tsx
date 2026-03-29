import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Intellify. Have a question or ready to get started with your website? Send us a message and we'll get back to you.",
  alternates: {
    canonical: "https://www.intellify.co.za/contact-us",
  },
  openGraph: {
    title: "Contact Us | Intellify",
    description:
      "Have a question or ready to get started? Send us a message and we'll get back to you.",
    url: "https://www.intellify.co.za/contact-us",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
