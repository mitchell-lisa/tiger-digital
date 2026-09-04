# Tiger Digital: tigerdigital.marketing

Next.js (App Router) + TypeScript + Tailwind v4. Deployed on Vercel.

## Edit business facts
Everything factual lives in `lib/site.ts`: phone, email, services, stats, clients, testimonials, team. Change it there; nothing is hardcoded in components.

## Run locally
```
npm install
npm run dev
```

## Contact form
`app/api/contact/route.ts` sends via Resend. Set these in Vercel → Project → Settings → Environment Variables:

- `RESEND_API_KEY`
- `CONTACT_TO` (defaults to Joe@tigerdigital.marketing)
- `CONTACT_FROM` (a sender on a domain verified in Resend)

Until the key is set, the form shows the email/phone fallback instead of failing silently.

## Assets
- `public/tiger-head.png`: brand mark (also `app/icon.png` favicon)
- `public/clients/*.png`: client logos
- `public/team/*.webp`: headshots
