import Link from "next/link"
import { CheckCircle2, ArrowRight, Globe, MonitorSmartphone, Gauge, LucideIcon } from "lucide-react"
import { SiteConfig } from "@/data/site"

const iconMap: Record<string, LucideIcon> = {
  Globe,
  MonitorSmartphone,
  Gauge,
}

interface PricingFeaturesProps {
  data: SiteConfig["home"]["pricingFeatures"]
}

export const PricingFeatures = ({ data }: PricingFeaturesProps) => {
  return (
    <div id="services" className="bg-gray-50 dark:bg-neutral-900/30 w-full overflow-hidden border-b border-gray-100 dark:border-neutral-900">
      
      {/* Top Banner - The Pricing Callout */}
      <div className="pt-24 px-6 container mx-auto max-w-5xl">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300 relative z-10 -mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {data.pricing.title} <br className="hidden md:block" /> {data.pricing.titleHighlight}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                {data.pricing.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
                {data.pricing.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end w-full md:w-auto bg-gray-50 dark:bg-neutral-900/80 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 text-center md:text-right">
              <div className="text-sm font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wider mb-2">
                {data.pricing.planName}
              </div>
              <div className="flex items-baseline gap-1.5 mb-6">
                <span className="text-gray-500 dark:text-gray-400 font-semibold text-lg">{data.pricing.pricePrefix}</span>
                <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{data.pricing.priceAmount}</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">{data.pricing.priceSuffix}</span>
              </div>
              <Link 
                href={data.pricing.buttonLink}
                className="group flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all shadow-sm"
              >
                {data.pricing.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section - The Features Grid */}
      <div className="pt-32 pb-24 px-6 bg-white dark:bg-black w-full">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white tracking-tight max-w-2xl">
              {data.features.title}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.features.items.map((item, idx) => {
              const IconComponent = iconMap[item.icon]
              
              return (
                <div 
                  key={idx}
                  className="flex flex-col bg-gray-50 dark:bg-neutral-900 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800"
                >
                  <div className="mb-6">
                    {IconComponent && (
                      <div className="inline-flex p-3 bg-white dark:bg-black text-gray-900 dark:text-white rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 mb-6">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    )}
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-gray-600 dark:text-gray-400 text-[15px] md:text-base leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}
