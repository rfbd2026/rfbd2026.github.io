# Aref Bahadori Website — Approved Phase 2 Plan

**Status:** The user approved the bilingual Phase 2 plan on 2026-10-07 and subsequently supplied exact Toman prices, confirmed no paid $199 mentoring offer, and authorized a manual TRC20 testnet verification flow if technically sound. This document records those choices. The latest “CONSOLIDATED MASTER BRIEF (Final)” supersedes the immediately preceding Persian-only/ZarinPal-only instruction. Implementation proceeds in Manus Preview; checkout stays disabled until final native product files are supplied and verified.

## Product direction

Create Aref Bahadori’s bilingual business website and portfolio. Aref is a graphic designer with 8+ years of experience, based in Fort Worth, Texas, serving U.S. and Iranian audiences. The site connects four business engines: premium identity work, a case-study-led portfolio, a digital product shop, and free tools that attract designers through SEO and email signups.

The supplied 20-page bilingual CV/selected-works PDF is the genuine portfolio source; the high-resolution project ZIP is expected later. Extract and present real work from the CV; do not use unrelated stock or invent work, outcomes, testimonials, client logos, dates, or process images. Available material covers identity, packaging, posters, social/digital graphics, typography, Amazon graphics, illustration, brochures/catalogs, and related work. Keep case studies evidence-based. Do not publish CV phone/email/social details unless Aref explicitly approves those contact channels.

## Pages and experience

- **Locales:** `next-intl`, `/en` default English LTR and `/fa` Persian RTL. Add an accessible language switcher, locale-correct `lang`/`dir`, fully translated interface/content, and `hreflang` metadata. Use Persian-native numerals/formatting where appropriate and retain exact integer Toman values as the source of truth.
- **Home:** kinetic typography/wordmark; identity and packaging positioning; 8+ years; six genuine selected projects; client logos only when verified in the CV; Work/Shop/service CTAs; newsletter lead magnet for a genuinely distinct free 50-palette set.
- **About:** story-led biography and Y1–Y8 timeline grounded in the CV, design philosophy, actual software/tools. Features/press only if evidenced.
- **Work:** responsive, filterable masonry gallery (All, Branding, Packaging, Poster, Social, Typography; add Illustration/Digital only when supported by actual work) and individual case studies. Use challenge/context, process, and result sections only where sourced; never invent outcomes or testimonials. Include next/previous navigation.
- **Shop:** four user-specified products, product pages, explicit contents/license, illustrative previews, cart UI, and My Downloads. No sample/preview may be described as a final deliverable. **All purchase/checkout buttons and payment submission paths remain disabled until Aref supplies the final native product bundles and they are verified.** Do not take even test-mode customer checkouts before that gate is met. Implementation may include isolated mocked/payment-adapter checks, but no real or sandbox customer transaction is to be initiated while the gate is off.
- **Tools Lab `/tools`:** (1) fully functional Image-to-Palette Generator—local image upload/processing, five dominant colors, HEX/RGB/HSL, copy, CSS export and valid ASE export; (2) Persian/English font-pairing preview; (3) Instagram safe-zone checker. Each tool page includes at least 300 useful original SEO words.
- **Journal/Blog:** Markdown-authored, bilingual, search-friendly articles.
- **Contact & Review:** bilingual inquiry form and Calendly embed when Aref supplies the URL. Offer only the Portfolio Review: **$79 / 30 minutes in EN and 3,500,000 Toman in FA**. The $199 mentoring offer is expressly out of scope.
- **Supporting routes:** Terms, privacy, digital-product license, sitemap, robots, not-found page, checkout return/cancel handlers (no checkout until the product gate is satisfied).

## Approved design system

- **Design movement:** editorial gallery with quiet chrome and restrained print-production references; warm-paper/ink canvas, high-contrast blue accent, generous margins, asymmetric layouts, subtle reveal motion.
- **Core principles:** let genuine work dominate; maintain a quiet, precise frame; make EN and FA equally legible; state only evidence-backed claims.
- **Color philosophy:** warm paper and ink create a tactile, calm base; signature cobalt marks actions and annotations while each project retains its own color. Starting tokens: paper `#F3F0E8`, ink `#171717`, cobalt `#1458A6`, neutral `#77746E`, white `#FFFFFF`; verify contrast.
- **Layout paradigm:** asymmetric magazine-like compositions, generous outer margins, large work images, indexed captions and split panels; use grids where product/tool scanning benefits.
- **Signature elements:** A/B ligature wordmark concept; fine rules and crop/registration marks; blue indexing/annotation.
- **Interaction and motion:** tactile feedback, visible keyboard focus, touch-safe controls, restrained reveals and reduced-motion support; no scroll hijacking or blocking animation.
- **Typography:** EN Inter/Sora; FA Vazirmatn/IranSans with script-appropriate line height and shaping. Use licensed font files; Vazirmatn is the local fallback if a licensed IranSans file is not supplied. Test mixed numerals, long Persian labels, forms and RTL navigation.
- **Brand essence and voice:** practical visual systems for product brands—identity and packaging designed to hold together beyond the presentation board. Precise, purposeful, generous. Direct and visually literate, without inflated claims. Example lines: “Good identity doesn’t stop at the logo.” / “Make the work clear. Make the system hold.”

## Technical architecture

Use Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Markdown content and `next-intl`; modular components and meaningful initial HTML. Suggested structure:

```text
app/                  localized routes, pages, layouts and server handlers
components/           bilingual navigation, project/shop/tool UI
content/work/         project Markdown and image references
content/journal/      EN/FA articles and frontmatter
lib/                  locale, palette/ASE, payment adapters, auth, email
server/                database access and trusted verification/fulfillment
db/                   additive schema migrations
public/                route manifest, icons and small static assets
BRAND.md               approved Aref identity rules for future work
```

Use Manus Preview’s managed MySQL for users, hashed one-time login tokens, orders, entitlements and processed payment-event/transaction identifiers. Resend is the selected transactional email sender. The email magic-link flow uses cryptographically random, one-time, short-lived tokens (15 minutes), stores only a token hash, rate-limits requests, returns a generic response and sends through credentials supplied via protected configuration. After login, issue a unique app-owned `HttpOnly` session cookie with `Secure; SameSite=None` on HTTPS Preview. Do not use platform-reserved `app_session_id`. Keep credentials and private keys out of chat, source, logs and Git.

Use one server-side product/price catalog as source of truth. Browser-provided price, success redirect, callback query, wallet address, QR, or user-supplied TXID is never by itself proof of payment. Persist minimal order/entitlement data and provider references. Never store card data, private wallet keys or raw webhook payloads. Fulfillment requires server-side provider/network verification and idempotent persistence. Since checkout is closed until final assets arrive, no customer receives any download now.

## Approved prices (Toman/IRT)

Store FA amounts as integer Toman and explicitly send ZarinPal `currency: "IRT"`; do not divide by ten, silently convert from USD or use a changing FX rate. EN amounts remain the exact supplied USD values.

| Product/service | EN USD | FA Toman / IRT |
|---|---:|---:|
| Packaging Mockup Kit — Premium Box & Pouch | $29 | 1,290,000 |
| Bilingual Brand Identity Deck Template | $39 | 1,890,000 |
| Amazon A+ Content & Listing Kit | $24 | 990,000 |
| 100 Editorial Color Palettes — Print & Digital | $19 | 690,000 |
| Portfolio Review — 30 minutes | $79 | 3,500,000 |

## Payment routes and strict gates

### Stripe — EN sandbox

Keep the already provisioned Stripe sandbox Aref described (stated expiry: Dec. 6, 2026); Aref will claim it. Use Stripe test mode, server-created Checkout, the platform-managed webhook, raw-body signature verification, idempotent event handling and server-owned price IDs. No live keys/charges. The checkout entry stays disabled until all required native product files are supplied and verified.

### ZarinPal — FA sandbox

Use the ZarinPal v4 Sandbox only: `https://sandbox.zarinpal.com/pg/v4/payment/request.json`, matching `/verify.json`, and `https://sandbox.zarinpal.com/pg/StartPay/{authority}`. Test with the official sandbox UUID merchant identifier; do not configure a live merchant. Create the payment server-side from the exact stored Toman price and `currency: "IRT"`; accept fulfillment only after the callback authority is verified server-side and the verified amount/status matches the order. The redirect alone is not proof. Preserve the explicit currency unit in database records and verify current v4 verification semantics; do not apply an undocumented Rial/Toman multiplier. The purchase path remains disabled until final product files are supplied.

### Manual USDT TRC20 — Nile testnet only

The user approved a manual test flow: show a receiving address + QR, ask for a transaction ID (TXID), and verify the exact on-chain transfer. The real-world processor candidates NOWPayments and Coinbase Commerce remain excluded. For safe, no-value testing:

- Use **TRON Nile testnet**, never Mainnet. TRON’s official documentation lists `https://api.nileex.io`, `https://nile.trongrid.io`, and `https://nile.tronscan.org`; its official Nile faucet documents free test USDT and the test-token contract `TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf` (six decimals). Label this clearly **Nile testnet USDT — no monetary value; not Tether/Mainnet USDT**.
- The approved verification backend is the documented/read-probed official Nile node API (`POST https://api.nileex.io/wallet/gettransactioninfobyid` and `POST https://api.nileex.io/walletsolidity/gettransactioninfobyid`), not a payment processor. The testnet TronScan API probe from this Sandbox received a Cloudflare 403, and TronScan’s published API examples use `apilist.tronscan.org`; do not pretend that its testnet API has been verified. A Nile TronScan link may be offered for human inspection, while the server verifies against Nile node data.
- For a TXID, require the Nile solidified transaction receipt, successful contract execution, a decoded TRC20 `Transfer` event from the expected test-token contract, the exact configured receiver address, the order’s exact expected test amount, and a TXID not previously consumed. Reject malformed, failed, pending/unconfirmed, wrong-network, wrong-token, wrong-recipient, wrong-amount, expired-order and reused-TXID submissions. Rate-limit checks; keep the node URL network-allowlisted to Nile. Never accept a browser-submitted status or transaction hash without node-side verification.
- Generate a QR of the configured **public Nile test receiver address** only. The address has not yet been supplied; do not invent or display a fake wallet address. Until Aref provides a dedicated testnet receiver address, this method stays unavailable. Do not request or store its private key.
- Any testnet amount is explicitly synthetic (no relation to Toman/USD and no FX quote); use an order-unique test amount only for testing correlation. No mainnet switch, real wallet address or real token is part of this implementation.

This removes a crypto payment processor from the test flow, but still depends on a public TRON node API and does not remove U.S. sanctions/export obligations. The U.S.-based business must not enable live transactions to Iranian residents until qualified counsel and relevant providers confirm that the specific sales and routes are permitted. A user’s selected language is not a reliable country check. This is not legal advice.

## Products and file truthfulness

Keep the exact contents and licenses from Shop-Ideas.txt:

1. Packaging Mockup Kit — Premium Box & Pouch, **$29 / 1,290,000 Toman**; 10 PSD mockups (box, pouch, tube), smart objects, 4K, organized layers, help PDF; Personal + Commercial.
2. Bilingual Brand Identity Deck Template, **$39 / 1,890,000 Toman**; Figma + InDesign + PowerPoint, 30 slides, grid system, Persian/English styles, crop-mark motif; Personal + Commercial.
3. Amazon A+ Content & Listing Kit, **$24 / 990,000 Toman**; six Photoshop templates, comparison chart, lifestyle banner, spec sheet, five color variations; client commercial use allowed.
4. 100 Editorial Color Palettes — Print & Digital, **$19 / 690,000 Toman**; ASE, Figma library, CSS variables, PDF swatch book with CMYK/RGB/HEX and inspiration imagery; Personal + Commercial.

These native bundles were not supplied. Create preview imagery only and do not claim the PSD/Figma/InDesign/PowerPoint source files exist. If internal watermarked samples are created for mocked tests, label them `TEST SAMPLE — NOT FOR RESALE — NOT A FINAL PRODUCT` and do not expose them as downloadable customer assets. Keep the free 50 palettes distinct from the paid 100-pack. The `$199` mentoring bundle is not in scope.

## SEO, performance, accessibility, and content editing

Implement locale-aware titles/descriptions, Open Graph, canonical URLs only after a public origin exists, `hreflang` EN/FA, accurate Product JSON-LD, sitemap, robots and source-synchronized `/manus-routes.json`; pages must have meaningful crawler-visible initial HTML. Optimize genuine CV images with `next/image` where supported. Target Lighthouse 95+ and LCP below 1.5 seconds without asserting unmeasured scores. Support phone/tablet/desktop, accessible contrast/labels/focus and reduced motion. Keep projects/articles folder- or Markdown-editable. Make Plausible/GA4 ready without invented tracking IDs.

## Preview, repository, and handoff

Build/test in **Manus Preview** with managed MySQL. Keep full Vercel database/commerce wiring pending until Aref chooses/provisions a Vercel-reachable production database. Deliver a Manus Preview link; use the owner-authorized project flow for the requested GitHub repository. Provide a three-minute Loom walkthrough showing how to add a project and product; if accurate capture is unavailable, deliver exact steps and clearly state that limitation. Save the approved brand system in `BRAND.md` and project instructions where supported; this is durable for this project/repository, not a promise of global memory across unrelated future projects.

First three revenue improvements: (1) turn real CV projects into evidence-rich case studies as the ZIP/briefs arrive; (2) use the functional palette tool and distinct free 50-pack as an SEO/email lead loop; (3) measure product and Portfolio Review conversion before expanding the catalog.

## Research references checked 2026-10-07

- [ZarinPal v4 connection](https://www.zarinpal.com/docs/paymentGateway/connectToGateway), [currency](https://www.zarinpal.com/docs/paymentGateway/moreFeatures/currency.html), and [sandbox](https://www.zarinpal.com/docs/paymentGateway/sandBox.html).
- [TRON networks](https://developers.tron.network/docs/networks), [official testnet tokens](https://developers.tron.network/docs/getting-testnet-tokens-on-tron), [transaction-info API](https://developers.tron.network/reference/gettransactioninfobyid), and [TRONSCAN API reference](https://raw.githubusercontent.com/tronscan/tronscan-frontend/master/document/api.md).
- The official Nile testnet node was read-probed without broadcasting: `gettransactioninfobyid` and `walletsolidity/gettransactioninfobyid` both returned JSON 200; the all-zero invalid TXID returned `{}` as expected. The Nile block lookup returned current block data. The `nile.tronscan.org` API probe was blocked by Cloudflare (403) in this Sandbox.
- [NOWPayments API/terms](https://nowpayments.io/doc/fd-tos.pdf?v=1.4.2) and [Coinbase Commerce terms](https://www.coinbase.com/legal/commerce/terms-of-service) were reviewed; neither processor is used here.
- [U.S. Treasury OFAC Iran Sanctions FAQs](https://ofac.treasury.gov/faqs/topic/1551).

## Owner inputs remaining for later enablement

- All four final native product bundles must be supplied and verified before enabling any checkout.
- A dedicated **public Nile test receiver address** is needed before the testnet wallet/QR flow can be shown. Never supply a private key.
- Resend needs a protected application API key and a verified sender address/domain before magic-link delivery can send to arbitrary customer addresses.
- Calendly embed needs Aref’s booking URL.
- Vercel commerce remains pending until a production database is selected/provisioned and the deployment environment is authorized.


## Execution update — user direction after plan approval

Resend remains the intended future provider, but the connection request was declined. The user explicitly directed the build to continue with **magic-link sign-in and all customer email delivery disabled until they authorize Resend later**. Do not retry the connector setup, switch providers, or request a Resend key now. Build only safe, closed-by-default interfaces for the Account/Downloads and email capture areas; no login link or customer email is sent. Payment buttons and all purchase/verification submissions also remain closed until final native product bundles are supplied and verified. No real sales, live payment credentials, or TRON mainnet are enabled.


## ZarinPal verification unit clarification — 2026-10-07

The official [currency guide](https://www.zarinpal.com/docs/paymentGateway/moreFeatures/currency.html) explicitly documents that a **request** with `currency: "IRT"` uses an `amount` in Toman. The official [v4 connection guide](https://www.zarinpal.com/docs/paymentGateway/connectToGateway) and [verify SDK guide](https://www.zarinpal.com/docs/sdk/php/method/verify) say verification must use the order amount from the database; the connection guide’s verify table describes the amount in Rial, and the verify example does not document an IRT currency parameter. This leaves the exact `verify.json` unit for an IRT request ambiguous in the official material inspected. Because checkout is closed, no verification call will be made. Before any future ZarinPal activation, confirm the current v4 verify semantics directly with authoritative ZarinPal documentation/support and implement a test that proves the stored Toman amount and verification amount agree; do not guess or apply an unverified ×10 conversion.


## User-requested reference adaptation (2026-10-12)

The homepage now uses the user's reference, https://bigdreams.group, as a visual direction. Borrow only the broad art direction: a light full-height typographic landing, oversized dotted wordmark, a narrow edge-anchored navigation rail, numbered links, fine rules and generous whitespace. Keep Aref's approved warm-paper/ink/cobalt colors, bilingual English/Persian layout, verified portfolio imagery and existing features. Do not copy Big Dreams Group's logo, wording, portfolio assets or brand. Do not change payment, account, email, or product-file gates.


## Staged reference-matching build (2026-10-12)

The latest user instruction supersedes the prior warm-paper/cobalt and hero-only visual treatment for this staged homepage task. **Step 1:** build a static, mobile-first layout with the header, oversized hero wordmark, six service items, horizontal portfolio strip, community/editorial section, contact block, and footer. Use near-white, black, and crimson (`#c0003c`); use original Aref copy and CSS-made abstract placeholder artwork; do not copy Big Dreams Group's wording, logo, or photography. No animations or motion effects in Step 1. Keep the Next.js App Router, TypeScript, Tailwind CSS, and existing Framer Motion dependency; reusable home-section components; maintain EN/FA routes and RTL/LTR.

**Step 2 is deferred until the user approves Step 1.** The supplied recording shows a subtle mouse-parallax relationship between the bold hero lettering and its crimson script accent, plus a small crimson cursor dot. The menu opens as a full-viewport dark panel that slides down, with its items fading/raising in a stagger. Scrolling reveals sections with fade/slide-up and stagger, a crimson line reveal, background transitions, and large service numbers moving horizontally at a different rate. Portfolio cards enter from the side/fade, then the strip moves continuously and slowly, pauses on hover, and individual cards slightly brighten/scale. The community quote cards drift independently. Buttons change fill or border on hover. The oversized Fort Worth footer line scales/fades in near the bottom. Any implementation must respect `prefers-reduced-motion`. None of these motion behaviors is to be implemented before explicit approval.

Preserve the existing shop checkout gate, disabled customer email/magic-link flow, and account/download restrictions. The portfolio placeholders are layout-only and must not be represented as final project artwork.


## Step 2 approval received (2026-10-12)
The user approved the static Step 1 layout and authorized motion. Implement the agreed reference-informed effects using Framer Motion: gentle mouse-parallax between the Aref wordmark and crimson studio accent plus a small crimson pointer dot; full-screen menu slide with staggered link entrances; fade/slide-up scroll reveals, expanding crimson rule and scroll-linked light-to-dark community backdrop; horizontal motion of oversized service numbers; a seamless slow portfolio marquee that pauses on hover, focus, and a keyboard-accessible pause control, with subtle card brightening/scaling; gently drifting community notes; CTA fill/border hover feedback; and a footer location wordmark scale/fade reveal. Disable/short-circuit motion and smooth scrolling when `prefers-reduced-motion` is enabled. Keep Aref's layout, copy, placeholder artwork, bilingual routes, and all existing safety gates.

## Step 2 delivered (2026-10-12)
The approved Framer Motion layer is implemented. Build, type and lint checks passed; runtime checks confirmed marquee movement and pause/resume, menu exit via Escape, scroll-triggered community color change, and the reduced-motion static presentation. English and Persian preview routes respond successfully, and both mobile hero layouts were visually checked.
