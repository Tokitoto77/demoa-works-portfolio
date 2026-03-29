# Render deployment notes

This project was recovered from the GitHub `main` branch and can be redeployed on Render.

## 1. Push this recovered folder to GitHub

Create or update a repository with the contents of this folder:

- `client/`
- `server/`
- `shared/`
- `.env.example`
- `render.yaml`

## 2. Create a Render Web Service

Use these settings if Render does not auto-detect them:

- Build Command: `corepack enable && corepack pnpm install --frozen-lockfile && corepack pnpm build`
- Start Command: `corepack pnpm start`

## 3. Add environment variables

Copy the keys from `.env.example`.

Minimum variables to avoid startup warnings:

- `JWT_SECRET`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`

Additional variables are required if you use database-backed auth or map features:

- `DATABASE_URL`
- `OWNER_OPEN_ID`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`
- `VITE_FRONTEND_FORGE_API_KEY`

Analytics variables are optional:

- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

## 4. OAuth callback

After Render assigns your URL, make sure the OAuth callback URL is registered as:

`https://YOUR-RENDER-DOMAIN/api/oauth/callback`
