# Inaivo Solutions Website

Production-ready React + Tailwind marketing site with secured contact form support.

## Stack

- React (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- lucide-react
- Vercel Serverless Function (`/api/contact`)
- Cloudflare Turnstile (captcha verification)

## Contact Form Security

The contact flow is secured with:

- Server-side input validation and sanitization
- Cloudflare Turnstile verification on the backend
- Honeypot bot trap
- IP-based rate limiting on the backend
- No secret keys exposed to the browser

Email delivery providers:

- Default: FormSubmit relay (server-side)
- Optional: Resend API (recommended for production reliability)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Run frontend only:

```bash
npm run dev
```

Note: `npm run dev` serves only the Vite app. `/api/contact` is available when running Vercel dev:

```bash
npx vercel dev
```

## Environment Variables

Set these in local `.env.local` and in Vercel Project Settings -> Environment Variables.

Frontend:

- `VITE_CONTACT_API_ENDPOINT` (default `/api/contact`)
- `VITE_TURNSTILE_SITE_KEY`

Backend:

- `TURNSTILE_SECRET_KEY`
- `CONTACT_RECEIVER_EMAIL` (example: `admin@inaivosolutions.com`)

Optional backend email providers:

- `FORMSUBMIT_ENDPOINT`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## Deploy (Vercel)

1. Push project to GitHub.
2. Import repo in Vercel.
3. Add all required environment variables.
4. Deploy.

`vercel.json` is included to:

- route `/api/*` to serverless functions
- rewrite app routes to `index.html` for React Router SPA routing

## Pre-Deploy Checks

```bash
npm run lint
npm run build
```
