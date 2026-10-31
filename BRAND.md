# Aref Bahadori — Brand and content rules

## Positioning
Independent visual designer building identity, packaging, and product stories that work beyond a presentation board. Based in Fort Worth, Texas; the site serves English- and Persian-speaking audiences.

## Visual system
- Editorial gallery / print-production sensibility: genuine portfolio work is the visual hero, with generous margins, asymmetric layouts, quiet chrome, and clear indexing.
- Warm paper `#F3F0E8`, ink `#171717`, signature cobalt `#1458A6`, muted text `#77746E`, and white `#FFFFFF`.
- Use an A/B monogram/ligature concept, fine rules, crop/registration marks, and cobalt annotations as recurring motifs.
- English type: Inter and Sora. Persian type: Vazirmatn; only use IranSans if a licensed font file is supplied.
- Keep Persian fully RTL and English fully LTR. Use comfortable Persian line height and do not force Latin tracking on Persian copy.
- Motion is restrained, never blocks content, and respects `prefers-reduced-motion`. Keyboard focus remains visible.

## Voice
Precise, purposeful, and generous. Make concrete claims only. Example headline: “Good identity doesn’t stop at the logo.” Example CTA: “Tell me what you are making.”

## Portfolio evidence rules
The supplied CV is the source of truth until higher-resolution source files are provided. Do not invent client briefs, outcomes, dates, award/press claims, process/sketches, tools used on a specific project, testimonials, or client logos. Describe visible work conservatively and identify the CV as its source. Do not publish personal phone, email, or social contact details unless Aref approves those channels.

## Shop and payments — current state
The four product entries and exact USD/Toman prices are informational plans. Original generated shop images are illustrative previews, not the product files. Keep all checkout/payment submissions disabled until final native product bundles are provided and verified. Keep test-only assets marked as samples, never sale deliverables. Keep magic-link login and every customer-facing email disabled until Aref later authorizes Resend. No live payment, Mainnet crypto, or $199 mentoring offer is in scope. The only proposed service offer is the 30-minute Portfolio Review at $79 EN / 3,500,000 Toman FA, with payment still disabled.

## Editing
- Add portfolio entries under `content/work/<slug>/project.md` with verified metadata and corresponding source artwork under that project’s `images/` folder. Keep English and Persian copy, category, tags, visible-work summary, evidence source, and unsupported-information notes consistent with the existing schema.
- Add teaching articles under `content/journal/` as Markdown with bilingual sections and frontmatter matching the current loader.
- Product metadata is centralized in `lib/products.ts`. Never unlock checkout by changing client UI alone or bypass the server-side `lib/payments/gates.ts` gate.


## Reference-inspired homepage treatment
- Use an oversized, dotted Aref/Bahadori wordmark and a full-height light hero; keep the warm paper, ink, and cobalt palette above.
- Use a slim edge rail with indexed navigation and square cobalt contact action, then an airy sequence of numbered editorial sections.
- Treat Big Dreams Group only as a layout and motion reference. Do not reuse its brand, logo, copy, or assets.
- Keep the English/Persian shell responsive, direction-aware, keyboard accessible, and respectful of reduced-motion preferences.


## Staged reference-match override (2026-10-12)
For this approved Step 1 homepage layout, use a near-white canvas, black text, and one strong crimson accent (`#c0003c`) instead of the previous cobalt accent. Use the Aref/Bahadori name with a crimson script accent and abstract CSS-made placeholder project panels. Keep copy original, preserve the English/Persian versions, and do not use Big Dreams Group's logo, wording, or photographs. Keep the layout static until the user explicitly approves Step 2 motion.
