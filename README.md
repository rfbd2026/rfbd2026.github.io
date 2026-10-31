# Aref Bahadori — Visual Identity & Packaging

Bilingual portfolio and designer-tools website, built with Next.js 14 App Router, TypeScript, Tailwind CSS, next-intl, Markdown content, and a managed MySQL backend. English pages live under `/en` (LTR); Persian pages live under `/fa` (RTL).

## Run and check

```bash
pnpm install
pnpm run dev
pnpm run lint
pnpm run typecheck
pnpm run build
```

The full content schema and safe editing steps are in [EDITING_GUIDE.md](./EDITING_GUIDE.md). Approved design rules and evidence constraints are in [BRAND.md](./BRAND.md). The current Phase 2 decisions and remaining gates are in [plan.md](./plan.md) and [TODO.md](./TODO.md).

## Main areas

- `content/work/` — genuine CV-sourced portfolio records and artwork
- `content/journal/` and `content/tools/` — bilingual teaching content
- `lib/products.ts` — the four bilingual products and exact USD/Toman prices
- `components/product-preview.tsx` — illustrative, non-deliverable product images
- `app/[locale]/` — localized visitor pages
- `app/api/` — inquiry/lead endpoints and fail-closed payment adapters
- `private/test-samples/` — unmistakable internal text markers, never public static assets
- `public/manus-routes.json` — synchronized route manifest

## Current state and constraints

- The delivered public link is a **Manus Preview**, not a production deployment.
- Product cards and details are informational; original native bundles were not supplied. All checkout and payment submissions remain closed. Prices are not an invitation to purchase.
- Local-development test sample downloads are default-off and return 404 in production/Preview.
- Customer magic-link authentication and all customer-facing email delivery remain disabled until Aref authorizes Resend.
- The Portfolio Review is listed at `$79` EN / `3,500,000` Toman FA, with payment disabled. The `$199` mentoring offer is excluded.
- Production Vercel commerce is pending a Vercel-reachable database and later owner authorization. No production sales, live crypto, or live payment credentials are configured.
- The approved A/B favicon is used for site and project branding. Preview robots remain non-indexable until a real production origin is supplied.

Never commit secrets. Use `.env.example` for names only and the platform's protected configuration for private values.
