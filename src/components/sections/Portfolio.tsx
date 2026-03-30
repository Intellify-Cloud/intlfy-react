"use client"

import { ExternalLink } from "lucide-react"
import { site } from "@/data/site"

export const Portfolio = () => {
  if (!site.portfolio.show) return null

  const { title, subtitle, sites } = site.portfolio

  return (
    <div className="py-24 px-6 bg-gray-50 dark:bg-neutral-900/50 w-full border-t border-gray-200 dark:border-neutral-800">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-[17px] md:text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site) => {
            const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(site.url)}?w=800`
            return (
              <div
                key={site.url}
                className="group relative flex flex-col bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-800"
              >
                {/* Browser chrome */}
                <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="mx-auto bg-white dark:bg-neutral-800 text-gray-500 dark:text-gray-400 text-xs px-3 py-1 rounded-md max-w-[200px] truncate border border-gray-200 dark:border-neutral-700">
                    {site.url.replace("https://www.", "").replace("https://", "")}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotUrl}
                    alt={site.title}
                    loading="lazy"
                    className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/30 mix-blend-multiply dark:mix-blend-normal group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      Visit Site <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{site.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
