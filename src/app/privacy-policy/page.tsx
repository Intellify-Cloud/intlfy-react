import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Intellify's Privacy Policy — how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.intellify.co.za/privacy-policy",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mt-32 w-full max-w-4xl mx-auto px-4 py-12">
      <div className="w-full md:w-2/3 mx-auto text-gray-700 dark:text-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4">
          Privacy Policy
        </h1>

        <p className="mb-8 leading-relaxed text-lg">
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit
          Intellify (the &quot;Site&quot;).
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
          Personal Information We Collect
        </h2>
        <p className="mb-8 leading-relaxed">
          We do not collect any data about you or use any cookies.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
          Changes
        </h2>
        <p className="mb-8 leading-relaxed">
          We may update this privacy policy from time to time for personal, operational, legal, or regulatory reasons.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
          Contact Us
        </h2>
        <p className="leading-relaxed">
          For more information about our privacy practices or if you have questions, please contact us by email at{" "}
          <a 
            href="mailto:support@intellify.co.za"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 transition-colors"
          >
            support@intellify.co.za
          </a>.
        </p>
      </div>
    </div>
  )
}
