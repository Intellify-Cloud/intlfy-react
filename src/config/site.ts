export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Intellify",
  contactUrl: "/contact-us",
  toggles: {
    showHero: true,
    showMission: true,
    showPortfolio: true,
    showPricingFeatures: true,
  },
  home: {
    hero: {
      subtitle: "Reach more customers",
      title: "Go Online. Grow Online.",
      buttonText: "Contact Us Today",
      backgroundImage: "/home.jpg"
    },
    mission: {
      title: "Our Mission",
      subtitle: " all in one solution",
      highlight: "Grow faster with our",
      paragraphs: [
        "Welcome to Intellify! We understand that starting a website can be overwhelming, from setting up a domain to managing the high capital expenses associated with it. That's where we step in to make the process easy and hassle-free.",
        "Our primary mission is to empower small and medium-sized service-based businesses by providing a seamless introduction to the online world. We believe that building trust and a strong online presence are crucial for fostering growth and success.",
        "With our services, we cater to your specific needs. Set yourself apart using our affordable subscription model, which eliminates the heavy upfront costs of website setup and maintenance.",
        "Let Intellify help you on this exciting journey. Together, we'll unlock your business's full potential and start elevating your brand matter. Unlock the power of an online profile now!"
      ],
      features: [
        {
          icon: "Zap",
          iconColor: "text-indigo-500",
          label: "Easy Onboarding",
          gradientFrom: "from-violet-400",
          gradientTo: "to-indigo-400",
          spanCols: "col-span-12 md:col-span-4"
        },
        {
          icon: "Layers",
          iconColor: "text-orange-500",
          label: "Business Growth",
          gradientFrom: "from-amber-400",
          gradientTo: "to-orange-400",
          spanCols: "col-span-12 md:col-span-8"
        },
        {
          icon: "Shield",
          iconColor: "text-emerald-500",
          label: "Affordable Plans",
          gradientFrom: "from-green-400",
          gradientTo: "to-emerald-400",
          spanCols: "col-span-12 md:col-span-8"
        },
        {
          icon: "Sparkles",
          iconColor: "text-red-500",
          label: "Full Potential",
          gradientFrom: "from-pink-400",
          gradientTo: "to-red-400",
          spanCols: "col-span-12 md:col-span-4"
        }
      ]
    },
    portfolio: {
      title: "Some of our websites",
      sites: [
        {
          title: "Poolware and Service",
          url: "https://www.poolwareandservice.co.za",
          logo: ""
        },
        {
          title: "Homeloans and Bonds",
          url: "https://www.homeloansandbonds.co.za",
          logo: ""
        },
        {
          title: "Evo Ultimate",
          url: "https://www.evoultimate.co.za",
          logo: ""
        },
        {
          title: "Bond Squad",
          url: "https://www.bondsquad.co.za",
          logo: ""
        },
        {
          title: "Apex Leadership",
          url: "https://www.apexleadership.co.za",
          logo: ""
        },
        {
          title: "Blue Key Home Finance",
          url: "https://www.bluekeyhomefinance.co.za",
          logo: ""
        },
        {
          title: "First Class Finance SA",
          url: "https://www.firstclassfinancesa.co.za",
          logo: ""
        },
        {
          title: "VM Home Loans",
          url: "https://www.vmhomeloans.co.za",
          logo: ""
        },
        {
          title: "Apex Leadership Next",
          url: "https://apex-leadership-next.vercel.app/",
          logo: ""
        },
        {
          title: "Ceyoni Physio",
          url: "https://phys-ceyo.vercel.app/",
          logo: ""
        },
        {
          title: "Sterling Crest Bonds",
          url: "https://www.sterlingcrestbonds.co.za",
          logo: ""
        },
        {
          title: "The Bond Studio",
          url: "https://www.thebondstudio.co.za/",
          logo: ""
        }
      ]
    },
    pricingFeatures: {
      pricing: {
        title: "Online presence.",
        titleHighlight: "Startup pricing.",
        description: "Get a fully managed, stunning portfolio website with zero capital outlay. We handle the hosting, code management, and domain so you can focus on building your brand.",
        planName: "Portfolio Plan",
        pricePrefix: "From",
        priceAmount: "R249",
        priceSuffix: "/mo",
        buttonText: "View Plan Details",
        buttonLink: "/portfolio",
        highlights: [
          "Fully Cloud-Managed",
          "Domain Included"
        ]
      },
      features: {
        title: "Included With every Portfolio Website",
        items: [
          {
            title: "Domain Registration",
            icon: "Globe", // Lucide icon
            paragraphs: [
              "We register your personalised domain name to start building your online presence.",
              "Get your dream company name before someone else does."
            ]
          },
          {
            title: "Responsive Design",
            icon: "MonitorSmartphone", // Lucide icon
            paragraphs: [
              "Your micro-site will render correctly not only on desktop-sized screen but also on mobile-sized screens."
            ]
          },
          {
            title: "Performance",
            icon: "Gauge", // Lucide icon
            paragraphs: [
              "Nobody likes a slow site, and neither does Google. Our sites are optimised for speed to improve SEO, usability and drive conversion."
            ]
          }
        ]
      }
    }
  },
  portfolioPage: {
    header: {
      titlePrefix: "Simple pricing for your ",
      titleHighlight: "digital presence.",
      description: "If customers can't easily find you, you will lose business. We move fast, we optimize, and we assist in how you think about your business. We are the perfect fit."
    },
    plan: {
      badge: "Portfolio Plan",
      pricePrefix: "From",
      priceAmount: "R249",
      priceSuffix: "/ month",
      uspTitle: "No Capital Outlay",
      uspDescriptionPrefix: "Skip the traditional ",
      uspDescriptionStrikethrough: "~R5,000 to R15,000",
      uspDescriptionSuffix: " upfront cost.",
      description: "Everything you need to establish a professional, high-performing website without the massive capital expense.",
      buttonText: "Get Started Now",
      buttonLink: "/contact-us"
    },
    featuresHeader: "Included in your monthly subscription:",
    features: [
      {
        title: "No upfront costs",
        description: "We understand that building a website can be overwhelming and a huge capital expense. We have you covered. With NO upfront fees or lump sums you can go online at a low monthly cost. We carry the risk, you carry the benefit."
      },
      {
        title: "Domain registration included",
        description: "Your online journey starts with a Domain Name! We make this part easy and its included in your monthly fee that also includes the annual renewal."
      },
      {
        title: "Fully Cloud-Managed & Secure",
        description: "We handle all the technical heavy lifting—from state-of-the-art cloud hosting to complete codebase management and seamless feature updates. You get enterprise-grade reliability without needing an IT degree."
      },
      {
        title: "Monthly hosting costs included",
        description: "Hosting is a kind of rent you pay for your website to be on a server. You don't have to worry about finding standard prices, because its fully included."
      }
    ],
    quote: {
      text: "\"High performing websites combine expert design, technical skills, copywriting and SEO to rank highly in search engines and convert clicks to customers.\"",
      author: "Intellify Philosophy"
    }
  }
}
