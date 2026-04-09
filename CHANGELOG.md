# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased] — 2026-04-08

### Security

- **CVE-2025-66478**: Updated Next.js from `15.3.3` to `16.2.3` to resolve critical vulnerability

### Changed

#### Hero Section (`app/[locale]/components/hero-section.tsx`)

- Simplified to 4 text elements: headline, subheadline, primary CTA, secondary CTA
- Removed long description paragraph and tagline (`AI & Data Intelligence for a US$4 Trillion Market`)
- Switched headline font from Playfair Display (serif) to Inter (sans-serif), consistent with logo's clean institutional style
- Applied `font-semibold` weight to headline for stronger visual presence
- Subtitle color changed to `#005A6B` (teal) — matches brand logo color, contained usage
- Removed hardcoded green highlighting that competed visually with headline
- Increased vertical spacing between headline, subheadline, and CTAs
- CTA secondary redesigned as text link with arrow (`→`) instead of bordered button — reduces visual competition
- Removed gold accent line (`#caaa6d`) from hero
- Adjusted CTA hover states to teal for brand consistency

#### i18n — Hero Messages

| Key | PT-BR before | PT-BR after |
|---|---|---|
| `hero.title` | "Revolucionando o" | "Inteligência para operar o" |
| `hero.subtitle` | "Mercado Imobiliário Brasileiro" | "Mercado imobiliário com mais precisão." |
| `hero.description` | Long paragraph about IBVI's AI system | "Avaliação, dados e automação para transformar leitura de mercado em decisão." |
| `hero.tagline` | "Uma plataforma única e estratégica para um mercado de US$ 4 trilhões" | "Conheça nossa pesquisa" |
| `hero.cta_secondary` | "Desafios do Mercado" | "Ver metodologia" |

| Key | EN before | EN after |
|---|---|---|
| `hero.subtitle` | "Brazil's Real Estate Market" | "the Real Estate Market with greater precision." |
| `hero.description` | Long paragraph | "Valuation, data and automation to transform market insights into decisions." |
| `hero.tagline` | "AI & Data Intelligence for a US$4 Trillion Market" | "Learn about our research" |
| `hero.cta_secondary` | "Market Challenges" | "See Methodology" |

#### Footer Address (`messages/pt-BR.json`, `messages/en.json`)

Simplified from full street address to concise 3-line format:

```
Cidade Jardim Corporate Center
Park Tower 23º Andar
São Paulo, SP
```

Uses `<br></br>` syntax for `next-intl` `t.rich()` line breaks.

#### TypeScript Config (`tsconfig.json`)

- `jsx` changed from `"preserve"` to `"react-jsx"` for Next.js 16 compatibility
- `include` updated to include `.next/dev/types/**/*.ts`
- Reformatted arrays for readability (no functional change)

---

## Design Rationale

### Hero Simplification

Following the principle: **tese primeiro, prova depois**.

- The `US$ 4 trilhões` metric was removed from the hero — it competes with the core message rather than supporting it. It belongs in the validation/overview section below the fold.
- Color contrast within the headline was reduced — the previous design had teal dominating and competing for attention against the headline copy.
- The secondary CTA was demoted to a text link to establish clear visual hierarchy: one strong action, one optional path.

### Typography

Inter (sans-serif) was chosen over Playfair Display to align with the logo's institutional, clean aesthetic. Playfair is used throughout the PDF/report pages where an editorial feel is appropriate.
