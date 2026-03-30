import Link from "next/link"
import { site } from "@/data/site"

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black py-12 w-full mt-auto border-t border-gray-100 dark:border-neutral-900">
      <div className="container md:w-5/6 lg:w-3/4 max-w-6xl mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
          <span className="bg-orange-600 w-2.5 h-2.5 rounded-full inline-block shadow-sm" />
          {site.nav.logo}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">{site.footer.copy}</p>

        <div className="flex gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
          {site.footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

      </div>
    </footer>
  )
}
