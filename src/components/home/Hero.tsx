import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BeamsBackground } from "@/components/ui/beams-background"

interface HeroProps {
  title: string
  subtitle: string
  buttonText: string
  backgroundImage: string
}

export const Hero = ({ title, subtitle, buttonText }: HeroProps) => {
  return (
    <BeamsBackground className="min-h-[90vh]">
      <div className="min-h-[90vh] flex items-center justify-center pt-24 pb-12">
        <div className="container relative mx-auto px-6 flex flex-col items-center justify-center text-center max-w-5xl">
          <div className="inline-flex items-center px-3 py-1 mb-8 text-sm font-medium text-orange-500 bg-orange-500/10 rounded-full ring-1 ring-inset ring-orange-500/30 dark:text-orange-400 dark:bg-orange-500/10 dark:ring-orange-500/30">
            {subtitle}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Go{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Online.
            </span>
            <br />
            Grow{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Online.
            </span>
          </h1>

          <p className="max-w-2xl mb-10 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            The internet, mobile phones, social media and search engines have
            changed marketing in a fundamental way. Don&apos;t lose business.
          </p>

          <Link
            href="/contact-us"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </BeamsBackground>
  )
}
