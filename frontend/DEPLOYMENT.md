# Deployment Guide

## 1. Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 2. Environment Configuration

Ensure your production environment has the following variables set. Create a `.env.production` file if needed (do not commit it to git).

```env
VITE_API_URL=https://your-api-domain.com
```

## 3. Build Application

Run the following command to generate the production build:

```bash
npm run build
```

This will create a `dist` folder containing the compiled assets.

## 4. Preview Build

To test the production build locally:

```bash
npm run preview
```

## 5. Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `frontend` directory.
3. Follow the prompts. Vercel will automatically detect Vite.

### Static Hosting (Netlify, AWS S3, etc.)

1. Upload the contents of the `dist` folder to your static web server.
2. Ensure your server is configured to rewrite all requests to `index.html` (SPA fallback).

## 6. Troubleshooting

- **Routing 404s**: Ensure your web server handles Single Page Application routing (rewriting 404s to index.html).
- **API Connection**: Verify `VITE_API_URL` is reachable from the client browser.
