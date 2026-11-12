This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Adding a new language

The list of languages is intentionally repeated in a few places. If a language is ever added, update all of these:

1. `messages/<locale>.json` — copy `en.json` and translate (all four files must keep identical keys).
2. `src/proxy.ts` — `locales` array.
3. `src/app/[locale]/layout.tsx` — `locales` array and `ogLocales` (e.g. `de: "de_DE"`).
4. `src/app/sitemap.ts` — `locales` array.
5. `src/app/[locale]/actions/emailTemplates.ts` — add the locale to `EmailLocale`, `normalizeLocale` and the `strings` object (buyer/donor emails).
6. `src/app/[locale]/components/sections/Navbar.tsx` — language links (desktop and mobile).
7. `src/app/[locale]/globals.css` — hero title sizes use `.lang-<locale>` rules; check the hero at 360, 640, 768 and desktop widths.
