# peterkaskonas.com

Personal website and blog for Peter Kaskonas — software engineer and web developer based in Suffolk, UK. Built with [Astro](https://astro.build/) and deployed to AWS with [SST](https://sst.dev/).

## Tech Stack

- [Astro 5](https://astro.build/) — static site with selective hydration
- [React 18](https://react.dev/) — interactive islands (hero, services, contact form, etc.)
- [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) + [Framer Motion](https://www.framer.com/motion/)
- [SST v3](https://sst.dev/) — infrastructure as code, deployed to AWS (`eu-west-1`) with Cloudflare DNS
- [Resend](https://resend.com/) — transactional email for the contact form
- [pnpm](https://pnpm.io/) — package manager

## Project Structure

```
src/
├── assets/img/      # Optimized images
├── components/      # React islands + Astro components (ui/ = shadcn-style primitives)
├── content/blog/    # Blog posts (Astro content collection)
├── layouts/         # BaseLayout (SEO, theme, analytics) and BlogLayout
├── pages/
│   ├── index.astro  # Landing page
│   ├── blog/        # Blog index + dynamic post routes
│   └── api/
│       └── send-email.ts  # Contact form endpoint (Resend)
└── styles/          # Global CSS
sst.config.ts        # SST/AWS infrastructure definition
```

## Development

```bash
pnpm install
pnpm dev        # Dev server at http://localhost:4321
pnpm build      # Production build
pnpm preview    # Preview the production build
pnpm lint       # ESLint
```

## Deployment

Deployed with SST to AWS. GitHub Actions handle CI (`.github/workflows/test.yml`) and deployment (`.github/workflows/deploy.yml`).

```bash
pnpm deploy:staging   # Deploy to the staging stage
pnpm deploy:live      # Deploy to production (peterkaskonas.com)
```

The `live` stage serves [peterkaskonas.com](https://peterkaskonas.com) (with a `www` redirect) using Cloudflare DNS; other stages deploy without a custom domain.

### Configuration

- **`ResendApiKey`** — SST secret for the contact form email API. Set with `npx sst secret set ResendApiKey <value>` (or use a `RESEND_API_KEY` env var for local development).
- **`CLOUDFLARE_ZONE_ID`** — env var used by `sst.config.ts` for DNS on the `live` stage (plus Cloudflare API credentials for the provider).

## Blog

Posts live in `src/content/blog/` as an Astro content collection. Add a new markdown file there and it appears at `/blog/<slug>`.
</content>
