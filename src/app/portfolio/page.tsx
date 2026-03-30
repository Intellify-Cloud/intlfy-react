"use client"

import { CheckCircle2, Quote } from "lucide-react"
import Link from "next/link"
import { site } from "@/data/site"

export default function PortfolioPage() {
  const { header, plan, featuresHeader, features, quote } = site.portfolioPage

  return (
    <div className="w-full bg-gray-50 dark:bg-black min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            {header.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">{header.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
            {header.description}
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Pricing Card */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none border border-gray-100 dark:border-neutral-800 relative z-10 top-0 lg:sticky lg:top-32 transition-transform duration-500 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-amber-400"></div>
            
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold text-sm mb-6 ring-1 ring-inset ring-orange-600/20">
              {plan.badge}
            </div>
            
            <div className="mb-6 flex items-baseline gap-2">
              <span className="text-2xl text-gray-500 dark:text-gray-400 font-bold">{plan.pricePrefix}</span>
              <span className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">{plan.priceAmount}</span>
              <span className="text-xl text-gray-500 dark:text-gray-400 font-medium ml-1">{plan.priceSuffix}</span>
            </div>
            
            <div className="mb-8 p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-center animate-in fade-in duration-500">
              <span className="text-orange-700 dark:text-orange-400 font-bold text-[17px] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {plan.uspTitle}
              </span>
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                {plan.uspDescriptionPrefix} <span className="line-through">{plan.uspDescriptionStrikethrough}</span>{plan.uspDescriptionSuffix}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {plan.description}
            </p>
            
            <Link 
              href={plan.buttonLink}
              className="group block w-full py-4 text-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[17px] font-bold rounded-xl shadow-md hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white hover:shadow-xl transition-all duration-300"
            >
              {plan.buttonText}
            </Link>
          </div>

          {/* Features Detail */}
          <div className="lg:col-span-7 lg:pl-12 py-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
              {featuresHeader}
            </h3>

            <div className="space-y-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 group-hover:scale-110 group-hover:text-emerald-400 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[17px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        {/* The Pull Quote */}
        <div className="mt-32 w-full bg-gradient-to-br from-orange-600 to-amber-500 rounded-3xl p-10 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl group">
          {/* Abstract background graphics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:bg-white/30 transition-all duration-700 pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <Quote className="absolute -top-6 -left-6 md:-top-4 md:-left-4 w-40 h-40 md:w-64 md:h-64 text-white/10 -rotate-12 transition-transform duration-700 group-hover:rotate-0 pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight md:leading-tight lg:leading-tight tracking-tight mb-10">
              {quote.text}
            </h2>
            <div className="inline-flex items-center gap-4 text-white/90 font-bold tracking-widest uppercase text-sm">
              <span className="w-8 h-px bg-white/40"></span>
              {quote.author}
              <span className="w-8 h-px bg-white/40"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
