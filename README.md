# URL Shortener

Browser-based URL shortener with custom aliases and click tracking. Links are stored in your browser (`localStorage`) — no backend required.

## About

This project turns long links into short ones you can share.

| Feature | What it does |
|---|---|
| **Shorten** | Paste any `http://` or `https://` URL and get a 6-character short code |
| **Custom alias** | Optional vanity path, e.g. `/my-talk` instead of a random code |
| **Click count** | Each redirect increments a local click counter |
| **Copy / delete** | Manage your short links from the dashboard |
| **Redirect** | Visiting `/:shortCode` sends you to the original URL |

**How storage works:** everything lives in the browser. Clearing site data removes your links. Short links only resolve on the same browser/device that created them (demo / personal-use app, not a hosted short-link service).

Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Quick start

```sh
git clone https://github.com/ironman-gampala/url_shortener.git
cd url_shortener
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Repo

- **Owner:** [ironman-gampala](https://github.com/ironman-gampala)
- **GitHub:** https://github.com/ironman-gampala/url_shortener
