# WAP INTELLYSIS Dashboard

## Secure operations console for WAP INTELLYSIS

The **intellysys-dashboard** is a React single-page application for signing in and accessing the WAP INTELLYSIS workspace. It provides a responsive authentication experience, optional maintenance mode for deployments, typed configuration from environment variables, and an HTTP layer ready for API integration.

---

## Description

This application is built with **Vite**, **React 19**, and **TypeScript**. Styling uses **Tailwind CSS v4** with a custom theme (primary, accent, semantic colors, sidebar). Routing is handled by **React Router**. Forms use **react-hook-form** with **Zod** validation. API calls go through **Axios** with a shared client whose base URL comes from configuration. Document titles per route use **react-helmet-async**. Notifications use **react-toastify**. Layout primitives include **Radix UI Themes** for future UI expansion.

**Current behavior:**

- The root path redirects to **`/signin`**.
- Sign-in posts credentials to **`POST /api/v1/auth/login`** with JSON body **`{ "email", "password" }`** (configure **API base URL** via env).
- When **`VITE_MAINTENANCE_MODE`** is truthy, the app shows a full-screen maintenance page instead of routes.

---

## Prerequisites

- **[Bun](https://bun.sh)** (recommended; this repo uses a Bun lockfile) **or** Node.js **20+** with **npm**, **pnpm**, or **yarn**
- A running backend that exposes the auth API (or a dev proxy) if you exercise login against a real server

---

## Installation

1. **Clone the repository** (or extract the project) and open the project root in a terminal.

2. **Install dependencies** using your package manager:

   ```bash
   bun install
   ```

   Equivalent:

   ```bash
   npm install
   ```

3. **Environment file:** copy the example env file and adjust values.

   ```bash
   cp .env.example .env
   ```

4. Edit **`.env`** in the project root. Only variables prefixed with **`VITE_`** are exposed to the browser (Vite convention).

   | Variable | Purpose |
   |----------|---------|
   | **`VITE_API_BASE_URL`** | Origin for the Axios client (no trailing slash required). Example: `https://api.example.com`. Leave empty to use same-origin requests (useful with a Vite dev proxy). |
   | **`VITE_APP_ENV`** | Optional label; defaults to Vite’s **`MODE`** if unset. |
   | **`VITE_MAINTENANCE_MODE`** | Set to **`true`**, **`1`**, or **`yes`** (case-insensitive) to show the maintenance page for all routes. Anything else or empty keeps normal behavior. |

5. **Restart the dev server** whenever you change **`.env`** so Vite reloads variables.

---

## Setup (development)

Start the development server with hot module replacement:

```bash
bun run dev
```

Then open the URL printed in the terminal (typically **http://localhost:5173**).

---

## Other scripts

| Command | Description |
|---------|-------------|
| **`bun run dev`** | Start Vite in development mode. |
| **`bun run build`** | Type-check (`tsc -b`) and produce a production build in **`dist/`**. |
| **`bun run preview`** | Serve the **`dist/`** output locally to verify production behavior. |
| **`bun run lint`** | Run ESLint on the project. |

---

## Production build

```bash
bun run build
```

Deploy the contents of **`dist/`** behind any static host or CDN. Configure **`VITE_*`** variables at **build time** for each environment (they are inlined by Vite).

---

## Project layout (overview)

| Path | Role |
|------|------|
| **`src/config/`** | Environment helpers (**`env.config.ts`**, typed keys via **`ENV_KEYS`** / **`getEnvValue`**). |
| **`src/services/`** | **`http.service.ts`** (Axios instance), **`auth.service.ts`** (login API). |
| **`src/components/`** | UI and layout (**`AuthLayout`**, **`DashboardLayout`**, **`LoginForm`**, etc.). |
| **`src/pages/`** | Route-level pages (**`SignInPage`**, **`MaintenancePage`**). |
| **`src/App.tsx`** | Routes and maintenance gate. |

Path alias **`@/`** maps to **`src/`** (see **`tsconfig.app.json`** and **`vite.config.ts`**).

---

## API note

Authentication expects:

- **Endpoint:** **`POST /api/v1/auth/login`** (resolved relative to **`VITE_API_BASE_URL`**).
- **Body:** **`{ "email": string, "password": string }`**.

Error responses may include a **`message`** field; it is surfaced in toast notifications when present.
