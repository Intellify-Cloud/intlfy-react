import { siteConfig } from "@/config/site";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { PricingFeatures } from "@/components/home/PricingFeatures";
import { Portfolio } from "@/components/home/Portfolio";

export default function Home() {
  const { home, toggles } = siteConfig;

  return (
    <div className="flex flex-col w-full font-sans">
      {toggles.showHero && (
        <Hero 
          title={home.hero.title}
          subtitle={home.hero.subtitle}
          buttonText={home.hero.buttonText}
          backgroundImage={home.hero.backgroundImage}
        />
      )}

      {toggles.showMission && (
        <Mission 
          title={home.mission.title}
          highlight={home.mission.highlight}
          subtitle={home.mission.subtitle}
          paragraphs={home.mission.paragraphs}
          features={home.mission.features}
        />
      )}

      {toggles.showPricingFeatures && (
        <PricingFeatures
          data={home.pricingFeatures}
        />
      )}

      {toggles.showPortfolio && (
        <Portfolio 
          title={home.portfolio.title}
          sites={home.portfolio.sites}
        />
      )}
    </div>
  );
}
