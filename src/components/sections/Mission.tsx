"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Sparkles, Layers, LucideIcon } from "lucide-react"
import { site, Site } from "@/data/site"

const iconMap: Record<string, LucideIcon> = { Zap, Shield, Sparkles, Layers }

type Feature = Site["mission"]["features"][number]

export const Mission = () => {
  if (!site.mission.show) return null

  const { title, highlight, subtitle, paragraphs, features } = site.mission

  return (
    <section id="mission" className="mx-auto max-w-7xl px-4 py-24 text-slate-800 dark:text-slate-200">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <div>
          <h2 className="text-sm font-bold tracking-widest text-orange-600 dark:text-orange-500 uppercase mb-4">
            {title}
          </h2>
          <h3 className="max-w-lg text-4xl font-bold md:text-5xl text-gray-900 dark:text-white">
            {highlight}
            <span className="text-slate-400 dark:text-slate-500">{subtitle}</span>
          </h3>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-12 gap-4">
        {features.slice(0, 2).map((feature, i) => (
          <BounceCard key={feature.label} className={feature.spanCols}>
            <FeatureCardContent feature={feature} description={paragraphs[i]} />
          </BounceCard>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4">
        {features.slice(2, 4).map((feature, i) => (
          <BounceCard key={feature.label} className={feature.spanCols}>
            <FeatureCardContent feature={feature} description={paragraphs[i + 2]} />
          </BounceCard>
        ))}
      </div>
    </section>
  )
}

const FeatureCardContent = ({ feature, description }: { feature: Feature; description: string }) => {
  const IconComponent = iconMap[feature.icon]
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        {IconComponent && <IconComponent className={`h-7 w-7 ${feature.iconColor}`} />}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{feature.label}</h3>
      </div>
      <div className={`flex-1 rounded-2xl bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} p-6 flex items-center`}>
        <p className="text-base leading-relaxed text-white/95 font-medium">{description}</p>
      </div>
    </div>
  )
}

const BounceCard = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 0.95, rotate: "-1deg" }}
    className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 dark:bg-neutral-800 p-6 ${className ?? ""}`}
  >
    {children}
  </motion.div>
)
