# Project Instructions for AI Agents

These instructions apply to every Next.js / React site built in this repository.
Read this file fully before writing any code or making any changes.

---

## 1. Site Content Source of Truth — `site.ts`

All editable site content (text, labels, lists, toggles, metadata) lives in a **single file**:

```
/src/data/site.ts
```

Think of this file as the equivalent of `_config.yml` / `sitetext.yml` in a Jekyll project.
It is the **only place** a non-developer should need to touch to update copy.

### Structure

```ts
// src/data/site.ts

export const site = {
  meta: {
    title: "Studio Name",
    description: "A short description for SEO.",
    url: "https://yourdomain.com",
  },

  nav: {
    logo: "Studio Name",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work",     href: "#work"     },
      { label: "About",    href: "#about"    },
      { label: "Contact",  href: "#contact"  },
    ],
  },

  hero: {
    show: true,                         // ← feature flag
    heading: "Transforming spaces.",
    subheading: "Interior design for considered living.",
    cta: { label: "See Our Work", href: "#work" },
  },

  services: {
    show: true,
    heading: "What We Do",
    items: [
      { title: "Residential Design", description: "Full-service interior design for homes." },
      { title: "Commercial Spaces",  description: "Offices, hospitality, and retail."       },
      { title: "Styling & Staging",  description: "Curated styling for shoots and sales."   },
    ],
  },

  work: {
    show: true,
    heading: "Selected Projects",
    items: [
      { title: "The Oakwood Residence", category: "Residential", image: "/images/work/oakwood.jpg" },
      { title: "Cafe Lumière",          category: "Commercial",  image: "/images/work/lumiere.jpg" },
    ],
  },

  about: {
    show: true,
    heading: "About the Studio",
    body: "We are a boutique interior design studio based in ...",
    image: "/images/about.jpg",
  },

  clients: {
    show: true,
    heading: "Trusted By",
    logos: [
      { name: "Brand One", image: "/images/clients/brand-one.svg" },
      { name: "Brand Two", image: "/images/clients/brand-two.svg" },
    ],
  },

  contact: {
    show: true,
    heading: "Get In Touch",
    email: "hello@studiodomain.com",
    showForm: true,
  },

  footer: {
    copy: "© 2025 Studio Name. All rights reserved.",
    socials: [
      { platform: "Instagram", href: "https://instagram.com/handle" },
      { platform: "Pinterest",  href: "https://pinterest.com/handle" },
    ],
  },
};
```

### Rules for `site.ts`

- **Never hardcode copy inside a component.** Always import from `site.ts`.
- Every section has a `show: boolean` flag. Sections with `show: false` must render `null` — no empty wrappers, no whitespace.
- Arrays (services, clients, nav links, etc.) must always be **looped** — never manually duplicated.
- Add new sections to `site.ts` first, then build the component.

---

## 2. Conditional Rendering — the `show` Flag Pattern

Every section component must check its `show` flag before rendering.
This is the React equivalent of Jekyll's `{% if condition %} ... {% endif %}`.

```tsx
// ✅ Correct pattern
import { site } from "@/data/site";

export default function Services() {
  if (!site.services.show) return null;

  return (
    <section id="services">
      <h2>{site.services.heading}</h2>
      <ul>
        {site.services.items.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```tsx
// ❌ Never do this — hardcoded copy, no show check
export default function Services() {
  return (
    <section>
      <h2>What We Do</h2>
      <li>Residential Design</li>
      <li>Commercial Spaces</li>
    </section>
  );
}
```

---

## 3. Asset Folder Structure

All static images and media must live inside `/public/assets/` — **never** scattered
loosely in `/public/`. This makes assets easy to find, replace, and hand off.

```
/public
  /assets
    /hero                  ← Hero background images, fullscreen banners
    /clients               ← Client logos (.svg preferred, .png fallback)
    /team                  ← Team member headshots (consistent size/ratio)
    /projects              ← One subfolder per project (slug-named)
      /project-name-one
        /cover.jpg         ← Grid/card thumbnail
        /01.jpg
        /02.jpg
      /project-name-two
        /cover.jpg
        /01.jpg
    /social                ← Open Graph image, Twitter card (og-image.jpg)
    /icons                 ← Favicons, app icons, any SVG UI icons not in code
    /brand                 ← Logo files (SVG + PNG), brand mark variations
    /textures              ← Background textures, noise overlays, patterns
    /video                 ← Any .mp4 / .webm background or reel clips
```

### Asset Rules

- **File naming:** always `kebab-case`. No spaces, no capitals. e.g. `oakwood-living-01.jpg`
- **Format:** use `.webp` for photos where possible (smaller, faster). Use `.svg` for logos and icons.
- **Hero images:** minimum `1920×1080px`. Compress to under `300kb` before committing.
- **Project covers:** consistent aspect ratio across all projects (recommend `4:3` or `16:9` — pick one and stick to it).
- **Team headshots:** consistent crop and aspect ratio across all members (recommend `1:1` square).
- **Client logos:** `.svg` always preferred. If `.png`, provide on transparent background.
- **OG image:** always include `/public/assets/social/og-image.jpg` at `1200×630px`.
- **Never reference** `/public/assets/...` paths directly in `<img>` tags — always use Next.js `<Image>` from `next/image` with the `/assets/...` path (Next.js strips `/public` automatically).

### Image path convention in `site.ts`

All image paths in `site.ts` must use the `/assets/` prefix:

```ts
projects: {
  items: [
    {
      title: "The Oakwood Residence",
      slug: "oakwood-residence",
      cover: "/assets/projects/oakwood-residence/cover.jpg",
      images: [
        "/assets/projects/oakwood-residence/01.jpg",
        "/assets/projects/oakwood-residence/02.jpg",
      ],
    },
  ],
},

clients: {
  logos: [
    { name: "Brand One", image: "/assets/clients/brand-one.svg" },
  ],
},

team: {
  members: [
    { name: "Jane Smith", role: "Principal Designer", image: "/assets/team/jane-smith.jpg" },
  ],
},
```

---

## 4. Page & Section Architecture

Structure the project so the homepage is assembled from imported section components,
exactly like Jekyll's `{% include %}` pattern:

```
/public
  /assets                  ← All images and media (see Section 3)

/src
  /app
    /page.tsx              ← Homepage — imports and composes all sections
    /layout.tsx
    /projects              ← Dynamic project pages
      /[slug]
        /page.tsx
  /components
    /sections
      /Hero.tsx
      /Services.tsx
      /Work.tsx
      /About.tsx
      /Team.tsx
      /Clients.tsx
      /Contact.tsx
    /ui                    ← Reusable primitives (Button, Card, ImageGrid, etc.)
    /layout
      /Navbar.tsx
      /Footer.tsx
  /data
    /site.ts               ← The single source of truth
  /lib
    /utils.ts              ← Shared helper functions (cn, formatDate, etc.)
  /styles
    /globals.css           ← Global styles, CSS variables, font imports
  /types
    /index.ts              ← Shared TypeScript types (Project, TeamMember, etc.)
```

### Homepage (`/src/app/page.tsx`)

```tsx
import Hero     from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work     from "@/components/sections/Work";
import Clients  from "@/components/sections/Clients";
import About    from "@/components/sections/About";
import Contact  from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Work />
      <Clients />
      <About />
      <Contact />
    </main>
  );
}
```

This mirrors the Jekyll pattern exactly:

```liquid
{% include hero.html %}
{% include services.html %}
{% include work.html %}
{% include clients.html %}
{% include about.html %}
{% include contact.html %}
```

To hide any section, set `show: false` in `site.ts`. Do not delete the import.

---

## 5. Adding a New Section — Checklist

When asked to add a new section, always follow this order:

1. **Add the data block** to `site.ts` with a `show` flag and all copy.
2. **Create the component** at `/src/components/sections/NewSection.tsx`.
3. **Add the `show` guard** as the first line of the component.
4. **Loop all arrays** from `site.ts` — never hardcode list items.
5. **Import and place** the component in `/src/app/page.tsx` at the appropriate position.

---

## 6. Styling Conventions

- Use **Tailwind CSS** for all styling.
- Define brand tokens (colors, fonts, spacing) in `tailwind.config.ts` — not inline.
- Section IDs must match the `href` values in `site.ts` nav links exactly.
- Each section component is self-contained — it owns its own padding, background, and layout.

---

## 7. Questions to Ask Before Building

Before writing any code for a new site or a new section, ask the following if the answers
are not already clear from `site.ts` or the brief:

**Content**
- What sections are needed? (confirm the full list)
- Is there a logo file, or should the logo be text-only for now?
- How many services / projects / clients should be shown initially?
- Is there a contact form, or just an email link?

**Design**
- Is there a brand color palette, or should one be proposed?
- Is there a preferred font style? (editorial, minimal, bold, friendly, luxury, etc.)
- Are there reference sites or mood boards to match?
- Should the site be light, dark, or switchable?

**Content & Media**
- Are images available, or should placeholder images be used?
- Should the work/portfolio section link to individual project pages, or use a lightbox?
- Are client logos available as SVG files?
- Are team headshots available, and what crop/ratio should be used?
- Is there a hero video or will it be a static image?
- Is there a brand folder with logo files (SVG + PNG)?

**Deployment**
- Is a custom domain being connected to Vercel?
- Should `next/image` domains be configured for any external image sources?

---

## 8. Non-Negotiable Rules (Summary)

| Rule | Detail |
|---|---|
| Single source of truth | All copy lives in `site.ts` — nowhere else |
| Feature flags | Every section has `show: boolean`; hidden sections render `null` |
| Loop everything | Arrays are always `.map()`'d — never duplicated manually |
| Section components | One file per section in `/components/sections/` |
| Homepage composition | `page.tsx` imports sections — it contains no JSX of its own |
| No hardcoded copy | Components import from `site.ts`, never define their own strings |
| Asset location | All images live in `/public/assets/` — never loose in `/public/` |
| Asset naming | Always `kebab-case` — no spaces, no capitals |
| Image paths in site.ts | Always use `/assets/...` prefix, never `/public/...` |
| next/image always | Never use a plain `<img>` tag — always use Next.js `<Image>` |
| OG image required | Every site ships with `/public/assets/social/og-image.jpg` at `1200×630px` |
| Project images | Each project gets its own subfolder under `/public/assets/projects/slug-name/` |