# Next.js Migration Plan

Full migration plan for converting the Lake Michigan Shore Wineries site from Create React App (CRA) to Next.js App Router. The goal is SSR/SSG for SEO and LLM crawlability while preserving all existing functionality.

---

## Table of Contents

1. [Why Migrate](#1-why-migrate)
2. [Current Architecture Summary](#2-current-architecture-summary)
3. [Target Architecture](#3-target-architecture)
4. [File Structure Mapping](#4-file-structure-mapping)
5. [Migration Phases](#5-migration-phases)
6. [Phase 1: Scaffold and Infrastructure](#phase-1-scaffold-and-infrastructure)
7. [Phase 2: Layout, Theme, and Navigation](#phase-2-layout-theme-and-navigation)
8. [Phase 3: Static Pages](#phase-3-static-pages)
9. [Phase 4: Dynamic Winery Pages](#phase-4-dynamic-winery-pages)
10. [Phase 5: Map and Leaflet Pages](#phase-5-map-and-leaflet-pages)
11. [Phase 6: API Routes](#phase-6-api-routes)
12. [Phase 7: SEO and Metadata](#phase-7-seo-and-metadata)
13. [Phase 8: Cleanup and Deploy](#phase-8-cleanup-and-deploy)
14. [Risk Register](#9-risk-register)
15. [Dependency Changes](#10-dependency-changes)
16. [Browser API Audit](#11-browser-api-audit)

---

## 1. Why Migrate

CRA produces a single-page app where all content is rendered client-side via JavaScript. Crawlers that don't execute JS (ChatGPT, Perplexity, Bing, and Google's initial crawl pass) see only:

```
You need to enable JavaScript to run this app.
```

Next.js renders HTML on the server (SSR) or at build time (SSG). Every page ships real HTML content that any crawler can read. This is the single highest-impact change for both Google SEO and LLM discoverability.

Additional benefits:
- `next/image` for automatic image optimization (the site has 70+ images)
- File-based routing eliminates react-router-dom
- Built-in API routes replace the `/api/` Vercel serverless functions
- `generateStaticParams` pre-renders all 27 winery pages at build time
- Native `metadata` export replaces react-helmet-async
- Vercel-native framework with zero-config deploys

---

## 2. Current Architecture Summary

### Tech Stack
- **Framework:** Create React App (react-scripts 5.0.1)
- **Routing:** react-router-dom 6.25.1 (BrowserRouter)
- **UI:** MUI 5.16.6 + Emotion styled components
- **Maps:** Leaflet (AVAs page) + Google Maps API (Winery detail pages)
- **Charts:** Chart.js + react-chartjs-2
- **SEO:** react-helmet-async (per-page), JSON-LD in index.html
- **Markdown:** react-markdown + remark-gfm + remark-breaks
- **Data:** Static JSON files (wineryData.json, lms_varieties.json, content JSONs)
- **API:** 2 Vercel serverless functions (`/api/chat.js`, `/api/googleApiKey.js`)
- **Hosting:** Vercel

### Route Map
```
/                          -> HomePage.js
/grape-varieties           -> GrapeVarieties/GrapeVarieties.js
/avas                      -> AVAs/AVAs.js (Leaflet map)
/avas/lake-michigan-shore  -> AVAs/LmsAVADetails.js
/avas/fennville            -> AVAs/FennvilleAVADetails.js
/wineries/:id              -> Wineries/Wineries.js (dynamic, 27 pages)
/map                       -> ExternalRedirect to map.lakemichiganshore.wine
```

### Data Sources
| Source | Location | Used By |
|--------|----------|---------|
| `wineryData.json` | `src/data/` | Winery pages, Navigation, WineryCard, ChatBot |
| `lms_varieties.json` | `src/data/` | Grape Varieties page, Interesting Varieties sections |
| `lms_content.json` | `src/pages/AVAs/` | LMS History, Growing Conditions |
| `fennville_content.json` | `src/pages/AVAs/` | Fennville Growing Conditions |
| `lake_michigan_shore_ava.json` | `src/assets/` | AVAs map, MapPage (GeoJSON boundaries) |
| `fennville_ava.json` | `src/assets/` | AVAs map, MapPage (GeoJSON boundaries) |
| `/public/descriptions/*.md` | `public/descriptions/` | Winery detail pages (7 files) |
| `/public/register.html` | `public/` | LMS History accordion |
| Google Places API | Runtime fetch | Winery hours, reviews, phone |
| `/api/googleApiKey` | Vercel serverless | Provides Google API key to client |
| `/api/chat` | Vercel serverless | OpenAI chat completions |

### State Management
- **DrawerContext** — manages sidebar open/close state
  - `drawerOpen` (boolean), `toggleDrawer` (function)
  - Auto-closes on mobile, open by default on desktop homepage
  - Uses `useMediaQuery('(max-width:600px)')` + `useLocation()`

### Browser API Usage (SSR Hazards)
These must be wrapped in `useEffect` or guarded with `typeof window !== 'undefined'`:

| API | Files | Purpose |
|-----|-------|---------|
| `window.innerWidth` | GrapeCharts, LmsGrowingConditions, FennvilleGrowingConditions, Wineries | Responsive layout |
| `window.open()` | HomePage | External links |
| `window.scrollTo()` | WineryCard, HomePage | Scroll to top |
| `window.addEventListener('resize')` | GrapeCharts | Chart resize |
| `navigator.userAgent` | detectDevice.js | Mobile detection |
| `document.addEventListener` | ChatBot | Click outside handler |
| `document.body.style` | ChatBot | Overflow control |
| `L.map()` / Leaflet DOM | AVAs.js, MapPage.js | Map initialization |
| Google Maps LoadScript | Wineries.js | Map embed |

---

## 3. Target Architecture

### Next.js App Router with:
- **Static generation (SSG)** for all pages — content comes from JSON files at build time
- **Client components** only where needed (maps, charts, drawer, interactive elements)
- **Server components** by default for all page shells and data-driven content
- **Route handlers** for API endpoints (`/api/chat`, `/api/googleApiKey`)
- **`next/image`** for all images
- **Native `metadata` exports** replacing react-helmet-async
- **MUI 5 + Emotion** retained (compatible with App Router via `'use client'` provider)

### Rendering Strategy Per Route

| Route | Rendering | Rationale |
|-------|-----------|-----------|
| `/` | SSG (static) | No dynamic data |
| `/grape-varieties` | SSG | Data from static JSON |
| `/avas` | SSG + client hydration | Leaflet map needs browser |
| `/avas/lake-michigan-shore` | SSG | Content from static JSON |
| `/avas/fennville` | SSG | Content from static JSON |
| `/wineries/[id]` | SSG via `generateStaticParams` | 27 pages from wineryData.json. Google Places data (hours/reviews) fetched client-side |
| `/map` | `redirect()` in Next.js config | No page needed |

---

## 4. File Structure Mapping

### CRA -> Next.js

```
CRA                                    NEXT.JS (App Router)
====                                   ====================

src/index.js                        -> app/layout.js (root layout)
src/App.js                          -> app/layout.js (routes are implicit)
src/theme.js                        -> lib/theme.js
src/context/DrawerContext.js        -> providers/DrawerProvider.js ('use client')
src/utils/detectDevice.js           -> hooks/useDeviceDetect.js ('use client')
src/reportWebVitals.js              -> (remove — Next.js has built-in analytics)

src/components/Navigation/Layout.js -> components/Navigation/Layout.js ('use client')
src/components/Navigation/Navigation.js -> (same)
src/components/WineryCard.js        -> components/WineryCard.js ('use client')
src/components/VarietyCard.js       -> components/VarietyCard.js ('use client')
src/components/LargeVarietyCard.js  -> components/LargeVarietyCard.js ('use client')
src/components/ChatBot.js           -> components/ChatBot.js ('use client')

src/pages/Home/HomePage.js          -> app/page.js
src/pages/GrapeVarieties/           -> app/grape-varieties/page.js
src/pages/AVAs/AVAs.js              -> app/avas/page.js
src/pages/AVAs/LmsAVADetails.js     -> app/avas/lake-michigan-shore/page.js
src/pages/AVAs/FennvilleAVADetails.js -> app/avas/fennville/page.js
src/pages/AVAs/LmsHistory.js        -> components/avas/LmsHistory.js ('use client')
src/pages/AVAs/LmsGrowingConditions.js -> components/avas/LmsGrowingConditions.js ('use client')
src/pages/AVAs/FennvilleGrowingConditions.js -> components/avas/FennvilleGrowingConditions.js ('use client')
src/pages/AVAs/LmsTimeline.js       -> components/avas/LmsTimeline.js
src/pages/AVAs/LmsWineries.js       -> components/avas/LmsWineries.js
src/pages/AVAs/FennvilleWineries.js -> components/avas/FennvilleWineries.js
src/pages/AVAs/LmsInterestingVarieties.js -> components/avas/LmsInterestingVarieties.js ('use client')
src/pages/AVAs/FennvilleInterestingVarieties.js -> components/avas/FennvilleInterestingVarieties.js ('use client')
src/pages/AVAs/LmsMustTryBottles.js -> components/avas/LmsMustTryBottles.js
src/pages/GrapeVarieties/GrapeCharts.js -> components/GrapeCharts.js ('use client')
src/pages/Wineries/Wineries.js      -> app/wineries/[id]/page.js
src/pages/MapPage.js                -> (remove — handled by next.config.js redirect)

api/chat.js                         -> app/api/chat/route.js
api/googleApiKey.js                 -> app/api/googleApiKey/route.js

src/data/wineryData.json            -> data/wineryData.json
src/data/lms_varieties.json         -> data/lms_varieties.json
src/pages/AVAs/lms_content.json     -> data/lms_content.json
src/pages/AVAs/fennville_content.json -> data/fennville_content.json
src/assets/*.json (GeoJSON)         -> data/geojson/ (or public/)

public/assets/                      -> public/assets/ (unchanged)
public/descriptions/                -> public/descriptions/ (unchanged)
public/register.html                -> public/register.html (unchanged)
public/llms.txt                     -> public/llms.txt (unchanged)
public/llms-full.txt                -> public/llms-full.txt (unchanged)
public/sitemap.xml                  -> (auto-generate via app/sitemap.js)
public/robots.txt                   -> app/robots.js (programmatic)
public/manifest.json                -> public/manifest.json (unchanged)
```

### Target Directory Structure

```
sw_michigan_wine/
  app/
    layout.js              # Root layout (ThemeProvider, DrawerProvider, Navigation)
    page.js                # Home page (/)
    grape-varieties/
      page.js              # Grape varieties page
    avas/
      page.js              # AVAs map selector
      lake-michigan-shore/
        page.js            # LMS AVA detail page
      fennville/
        page.js            # Fennville AVA detail page
    wineries/
      [id]/
        page.js            # Dynamic winery page
    api/
      chat/
        route.js           # OpenAI chat endpoint
      googleApiKey/
        route.js           # Google API key endpoint
    sitemap.js             # Auto-generated sitemap
    robots.js              # Programmatic robots.txt
  components/
    Navigation/
      Layout.js            # Sidebar + AppBar ('use client')
    WineryCard.js           # ('use client')
    VarietyCard.js          # ('use client')
    LargeVarietyCard.js     # ('use client')
    ChatBot.js              # ('use client')
    GrapeCharts.js          # ('use client')
    avas/
      LmsHistory.js         # ('use client')
      LmsGrowingConditions.js # ('use client')
      LmsTimeline.js
      LmsWineries.js
      FennvilleWineries.js
      LmsInterestingVarieties.js # ('use client')
      FennvilleInterestingVarieties.js # ('use client')
      FennvilleGrowingConditions.js # ('use client')
      LmsMustTryBottles.js
  providers/
    ThemeProvider.js        # MUI ThemeProvider wrapper ('use client')
    DrawerProvider.js       # Drawer context ('use client')
  hooks/
    useDeviceDetect.js      # Replaces detectDevice.js ('use client')
  lib/
    theme.js               # MUI theme config (unchanged)
  data/
    wineryData.json
    lms_varieties.json
    lms_content.json
    fennville_content.json
    geojson/
      lake_michigan_shore_ava.json
      fennville_ava.json
  public/
    assets/                 # (unchanged)
    descriptions/           # (unchanged)
    register.html
    llms.txt
    llms-full.txt
    manifest.json
    favicon.png
  next.config.js
  package.json
```

---

## 5. Migration Phases

Execute in this order. Each phase produces a deployable build.

| Phase | Description | Estimated Scope |
|-------|-------------|-----------------|
| 1 | Scaffold Next.js, install deps, set up root layout + providers | Infrastructure |
| 2 | Port Layout/Navigation, theme, DrawerContext | Shell + nav working |
| 3 | Port static pages: Home, Grape Varieties, AVA detail pages | 5 pages |
| 4 | Port dynamic winery pages with `generateStaticParams` | 27 pages |
| 5 | Port Leaflet-based pages (AVAs map) as client components | 1 page |
| 6 | Port API routes | 2 endpoints |
| 7 | Replace Helmet with native metadata, add sitemap.js, robots.js | SEO |
| 8 | Remove CRA remnants, test, deploy | Cleanup |

---

## Phase 1: Scaffold and Infrastructure

### Steps

1. **Initialize Next.js alongside existing code**
   ```bash
   npx create-next-app@latest . --app --no-src-dir --js --no-tailwind --import-alias "@/*"
   ```
   Or manually: create `next.config.js`, `app/layout.js`, install `next` and `react`/`react-dom`.

2. **Install dependencies** — keep everything except CRA-specific packages:
   ```
   KEEP: @mui/material, @emotion/react, @emotion/styled, chart.js, react-chartjs-2,
         leaflet, react-leaflet, @react-google-maps/api, react-markdown, remark-gfm,
         remark-breaks, fuse.js, axios, openai, chartjs-plugin-datalabels
   
   REMOVE: react-scripts, react-router-dom, react-helmet, react-helmet-async, web-vitals
   
   ADD: next, @next/font (optional)
   ```

3. **Create `next.config.js`:**
   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     async redirects() {
       return [
         {
           source: '/map',
           destination: 'https://map.lakemichiganshore.wine/',
           permanent: true,
         },
       ];
     },
     images: {
       // All images are local, no remote patterns needed unless you add external
     },
   };
   module.exports = nextConfig;
   ```

4. **Create root layout (`app/layout.js`):**
   - Import global CSS (leaflet CSS)
   - Wrap children in ThemeProvider and DrawerProvider (both `'use client'` wrappers)
   - Set `<html lang="en">` and global `<head>` defaults
   - Define default metadata export

5. **Create MUI + Emotion App Router compatibility layer:**
   - `providers/ThemeProvider.js` — `'use client'` component wrapping `ThemeProvider` + `CssBaseline`
   - `providers/DrawerProvider.js` — `'use client'` component wrapping the drawer context
   - This is required because MUI uses Emotion which needs client-side rendering for the CSS injection

6. **Move data files:**
   - `src/data/*.json` -> `data/*.json`
   - `src/pages/AVAs/*_content.json` -> `data/*_content.json`
   - GeoJSON files -> `data/geojson/`

7. **Move public assets:**
   - `public/` directory stays as-is (Next.js uses the same convention)

### Verification
- `npm run dev` starts without errors
- Root layout renders an empty page with MUI theme applied
- All static assets accessible at their existing URLs

---

## Phase 2: Layout, Theme, and Navigation

### Steps

1. **Port `theme.js`** to `lib/theme.js` (no changes needed — pure config object).

2. **Port `DrawerContext.js`** to `providers/DrawerProvider.js`:
   - Add `'use client'` directive at top
   - Replace `useLocation()` from react-router-dom with `usePathname()` from `next/navigation`
   - Replace `useMediaQuery` usage (keep — MUI hook works client-side)
   - Everything else stays the same

3. **Port `detectDevice.js`** to `hooks/useDeviceDetect.js`:
   - Add `'use client'` directive
   - Guard `navigator.userAgent` with `typeof window !== 'undefined'`
   - Or: replace entirely with MUI's `useMediaQuery('(max-width:768px)')` which is more reliable

4. **Port `Layout.js`** to `components/Navigation/Layout.js`:
   - Add `'use client'` directive
   - Replace all `useNavigate()` with `useRouter()` from `next/navigation`
   - Replace `useLocation()` with `usePathname()` from `next/navigation`
   - Replace `<Link to="...">` with `<Link href="...">` from `next/link`
   - Keep all MUI styled components as-is
   - Keep wineryData.json import for navigation list
   - The `formatNameForUrl()` helper stays the same

5. **Wire Layout into root layout (`app/layout.js`):**
   ```jsx
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           <ThemeRegistry>
             <DrawerProvider>
               <Layout>{children}</Layout>
             </DrawerProvider>
           </ThemeRegistry>
         </body>
       </html>
     );
   }
   ```

### Verification
- Sidebar navigation renders with all winery links
- Drawer opens/closes correctly
- Navigation links work (clicking a winery link navigates to `/wineries/[id]`)
- Mobile responsive behavior works

---

## Phase 3: Static Pages

Port pages that don't need dynamic route params or complex client-side data fetching.

### Home Page (`app/page.js`)

1. Create `app/page.js` as a **server component** with a metadata export:
   ```js
   export const metadata = {
     title: 'Lake Michigan Shore Wineries | Discover Southwest Michigan Wine Country',
     description: 'Explore 27+ wineries in Michigan\'s Lake Michigan Shore and Fennville AVAs...',
     openGraph: { ... },
     twitter: { ... },
   };
   ```
2. Extract the interactive card grid into a `'use client'` component (`components/HomeCards.js`):
   - Replace `useNavigate()` with `useRouter()` from `next/navigation`
   - Replace `window.open()` calls — keep as-is (client component)
3. The page.js server component imports and renders HomeCards.

### Grape Varieties Page (`app/grape-varieties/page.js`)

1. Server component that imports variety data and passes it as props.
2. Metadata export with title, description, OG tags.
3. `GrapeCharts.js` stays as `'use client'` (uses Chart.js, window resize listener).
4. `VarietyCard` and `LargeVarietyCard` stay as `'use client'` (click handlers, dialog state).
5. The page shell (typography, grid layout) can be a server component wrapping client components.

### LMS AVA Detail Page (`app/avas/lake-michigan-shore/page.js`)

1. Server component with metadata export.
2. Read `lms_content.json` at build time via direct import.
3. Child components that need browser APIs become `'use client'`:
   - `LmsHistory.js` — fetches `/register.html`, uses `window.innerWidth`
   - `LmsGrowingConditions.js` — uses `window.innerWidth`
   - `LmsInterestingVarieties.js` — dialog state
4. Pure display components stay as server components:
   - `LmsTimeline.js` — no browser APIs
   - `LmsWineries.js` — just maps data to WineryCards
   - `LmsMustTryBottles.js` — static "coming soon"

### Fennville AVA Detail Page (`app/avas/fennville/page.js`)

1. Same pattern as LMS. Server component with client sub-components.
2. `FennvilleGrowingConditions.js` — `'use client'` (Chart.js bar chart, window.innerWidth).
3. `FennvilleInterestingVarieties.js` — `'use client'` (dialog state).

### Key Changes for All Static Pages
- Remove all `Helmet` imports and JSX — replace with `metadata` export at top of page.js
- Remove `useDrawer()` from page components — the layout handles the drawer. Pass `drawerOpen` via context if pages need it for spacing, or handle it in CSS.
- JSON-LD structured data: export via `metadata.other` or render as `<script>` in the page.

### Verification
- Each page renders full HTML when you `View Source` (not just an empty div)
- All content visible to crawlers: `curl https://localhost:3000/avas/lake-michigan-shore` returns real HTML
- Charts render after hydration
- No hydration mismatch warnings in console

---

## Phase 4: Dynamic Winery Pages

### `app/wineries/[id]/page.js`

This is the most complex page. It has:
- Dynamic route param (`:id` -> `[id]`)
- Static data from JSON (winery info, description)
- Runtime API calls (Google Places for hours/reviews)
- Google Maps embed
- Markdown description rendering
- Iframe preview (optional)

### Steps

1. **Add `generateStaticParams()`** to pre-render all 27 winery pages at build time:
   ```js
   import wineryData from '@/data/wineryData.json';

   export function generateStaticParams() {
     return wineryData.map((winery) => ({
       id: winery.name.toLowerCase().replace(/ /g, '-'),
     }));
   }
   ```

2. **Add `generateMetadata()`** for dynamic SEO per winery:
   ```js
   export function generateMetadata({ params }) {
     const winery = wineryData.find(w => ...);
     return {
       title: `${winery.name} | Lake Michigan Shore Wineries`,
       description: `Visit ${winery.name} in ${winery.address}...`,
       openGraph: { ... },
     };
   }
   ```

3. **Read markdown descriptions at build time** (server component advantage):
   ```js
   import { readFile } from 'fs/promises';
   import path from 'path';

   // In page component or generateStaticParams:
   if (winery.description.endsWith('.md')) {
     const mdPath = path.join(process.cwd(), 'public', winery.description);
     const mdContent = await readFile(mdPath, 'utf-8');
     // Pass to client component as prop
   }
   ```
   This is a major improvement: markdown is read at build time, not fetched at runtime.

4. **Split the page into server + client parts:**

   **Server component** (`page.js`):
   - Finds winery from JSON by `[id]` param
   - Reads markdown description from filesystem
   - Renders static content: name, address, logo, description
   - Renders JSON-LD Winery schema as `<script>` tag
   - Passes winery data as props to client components

   **Client components:**
   - `WineryGoogleMap.js` (`'use client'`) — Google Maps embed with LoadScript
   - `WineryHours.js` (`'use client'`) — Fetches Google Places API for hours/reviews at runtime
   - `WineryIframe.js` (`'use client'`) — Optional wines_url iframe preview
   - `WineryDescription.js` (`'use client'`) — ReactMarkdown renderer (or render in server component if no interactivity needed)

5. **Handle Google API key:**
   - The current pattern fetches `/api/googleApiKey` to get the key client-side
   - In Next.js, we can pass `NEXT_PUBLIC_GOOGLE_MAPS_KEY` as a public env var for the Maps embed
   - Or keep the API route and fetch client-side (same pattern, different route handler)
   - The Places API key should stay server-side (fetched via API route, not exposed)

6. **Handle the `formatNameForUrl` / slug matching:**
   - Current: `winery.name.toLowerCase().replace(/ /g, '-') === id`
   - Some wineries have a `slug` field that may differ from the generated slug
   - Standardize: use the `slug` field where present, fall back to name-based generation
   - `generateStaticParams` should use the same slug logic

### Verification
- `View Source` on any winery page shows full HTML: name, address, description text
- Google Places hours/reviews load after hydration
- Map renders after hydration
- All 27 winery pages are pre-rendered (check `.next/server/app/wineries/` directory)

---

## Phase 5: Map and Leaflet Pages

### AVAs Map Page (`app/avas/page.js`)

The current AVAs.js creates a Leaflet map using `L.map()` directly in a `useEffect` — it does NOT use react-leaflet components. This is 100% browser-only code.

### Strategy

1. **Server component** (`page.js`) provides the page shell + metadata:
   ```jsx
   export const metadata = { ... };

   export default function AVAsPage() {
     return <AVAsMap />;
   }
   ```

2. **Client component** (`components/avas/AVAsMap.js`) with `'use client'`:
   - Contains all the Leaflet logic (unchanged from current AVAs.js)
   - Must be dynamically imported with `ssr: false`:
     ```js
     import dynamic from 'next/dynamic';
     const AVAsMap = dynamic(() => import('@/components/avas/AVAsMap'), { ssr: false });
     ```
   - This prevents Leaflet from running during SSR (it accesses `window` and `document`)

3. **Leaflet CSS** — import in the client component or in a global CSS file.

4. **GeoJSON data** — import from `data/geojson/` (works in client components).

### MapPage.js (External Redirect)

- Not needed. Handled by `next.config.js` redirect:
  ```js
  redirects: [{ source: '/map', destination: 'https://map.lakemichiganshore.wine/', permanent: true }]
  ```

### Verification
- `/avas` page renders, Leaflet map loads after hydration
- AVA boundary polygons render
- Logo markers are clickable and navigate to detail pages
- `View Source` shows the metadata and page shell (map area will be empty until JS runs — this is fine)

---

## Phase 6: API Routes

### `/api/chat` -> `app/api/chat/route.js`

```js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages } = await request.json();
  // Same OpenAI API logic as current chat.js
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-2024-07-18',
      messages,
      max_tokens: 800,
    }),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
```

### `/api/googleApiKey` -> `app/api/googleApiKey/route.js`

```js
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ key: process.env.GOOGLE_API_KEY });
}
```

### Verification
- `POST /api/chat` returns OpenAI response
- `GET /api/googleApiKey` returns the key
- ChatBot component (if re-enabled) works end-to-end

---

## Phase 7: SEO and Metadata

### Replace react-helmet-async

Every page currently uses `<Helmet>` for `<title>`, `<meta>`, `<link rel="canonical">`, and `<script type="application/ld+json">`. In Next.js App Router, use the native `metadata` export.

**Before (CRA + Helmet):**
```jsx
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://..." />
  <meta property="og:title" content="..." />
</Helmet>
```

**After (Next.js):**
```js
export const metadata = {
  title: 'Page Title',
  description: '...',
  alternates: { canonical: 'https://...' },
  openGraph: { title: '...', description: '...', url: '...', images: ['...'] },
  twitter: { card: 'summary_large_image', title: '...', description: '...' },
};
```

For dynamic pages (wineries), use `generateMetadata()`:
```js
export async function generateMetadata({ params }) {
  const winery = getWinery(params.id);
  return { title: `${winery.name} | ...`, ... };
}
```

### JSON-LD Structured Data

Render as a `<script>` tag in the page component (server components can do this directly):
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

### Programmatic Sitemap (`app/sitemap.js`)

```js
import wineryData from '@/data/wineryData.json';

export default function sitemap() {
  const wineryUrls = wineryData.map((w) => ({
    url: `https://www.lakemichiganshore.wine/wineries/${w.slug || w.name.toLowerCase().replace(/ /g, '-')}`,
    lastModified: w.updated_at || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: 'https://www.lakemichiganshore.wine/', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.lakemichiganshore.wine/grape-varieties', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lakemichiganshore.wine/avas', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.lakemichiganshore.wine/avas/lake-michigan-shore', changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://www.lakemichiganshore.wine/avas/fennville', changeFrequency: 'weekly', priority: 0.9 },
    ...wineryUrls,
  ];
}
```

This auto-generates `/sitemap.xml` at build time — no more manual maintenance.

### Programmatic robots.txt (`app/robots.js`)

```js
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://www.lakemichiganshore.wine/sitemap.xml',
  };
}
```

### Verification
- `curl -s https://localhost:3000/ | grep '<title>'` shows the page title in HTML
- `curl https://localhost:3000/sitemap.xml` returns valid XML with all pages
- `curl https://localhost:3000/robots.txt` returns the robots directives
- Google Rich Results Test passes for JSON-LD on winery pages
- OG tags visible in page source

---

## Phase 8: Cleanup and Deploy

### Remove CRA Artifacts
- Delete `src/` directory entirely (all code has been migrated to `app/`, `components/`, etc.)
- Delete `react-scripts` from package.json
- Delete `react-router-dom` from package.json
- Delete `react-helmet` and `react-helmet-async` from package.json
- Remove CRA-specific `eslintConfig` and `browserslist` from package.json
- Delete `reportWebVitals.js`
- Delete `public/index.html` (Next.js generates its own)

### Update package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Environment Variables
- Rename/verify env vars in Vercel:
  - `OPENAI_API_KEY` (server-only, no prefix needed)
  - `GOOGLE_API_KEY` (server-only for Places API)
  - `NEXT_PUBLIC_GOOGLE_MAPS_KEY` (optional, if using public maps embed)

### Vercel Configuration
- Delete `vercel.json` — redirects are now in `next.config.js`
- Vercel auto-detects Next.js framework

### Pre-Deploy Checklist
- [ ] All pages render with full HTML content (not empty shells)
- [ ] `View Source` on every page shows real content
- [ ] Navigation between all pages works
- [ ] Drawer opens/closes, responsive on mobile
- [ ] All 27 winery pages render correctly
- [ ] Google Maps loads on winery pages
- [ ] Leaflet map loads on /avas
- [ ] Charts render on /grape-varieties and /avas/fennville
- [ ] Markdown descriptions render on winery pages
- [ ] Google Places hours/reviews load
- [ ] `/api/chat` endpoint works
- [ ] `/api/googleApiKey` endpoint works
- [ ] Sitemap.xml is valid and lists all pages
- [ ] robots.txt is correct
- [ ] OG images render in social share previews
- [ ] `llms.txt` and `llms-full.txt` are accessible
- [ ] No console errors or hydration mismatches
- [ ] Mobile layout works correctly
- [ ] All external links (map subdomain, michigan.org, etc.) work

### Verification
- Deploy to Vercel preview branch first
- Test with ChatGPT: ask it to browse a winery page and verify it sees real content
- Test with Google Rich Results Test
- Test with Facebook Sharing Debugger for OG tags

---

## 9. Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| **MUI + Emotion SSR hydration mismatches** | Broken styles on first render | Use the official `@mui/material-nextjs` adapter package. Wrap in `AppRouterCacheProvider`. |
| **Leaflet crashes during SSR** | Build failure | Always use `dynamic(() => import(...), { ssr: false })` for any component that imports Leaflet |
| **Google Maps LoadScript conflicts** | Map fails to load | Use `@react-google-maps/api` `useJsApiLoader` hook instead of `LoadScript` wrapper, in a `'use client'` component |
| **Chart.js SSR** | Build error or canvas undefined | Chart components must be `'use client'` — Chart.js requires `<canvas>` which doesn't exist in SSR |
| **`window` / `navigator` references during SSR** | Build crash or hydration error | Audit all files (see Browser API Audit below). Guard with `typeof window !== 'undefined'` or move to `useEffect` |
| **Slug mismatch between CRA and Next.js** | 404s on existing URLs, broken Google index | Use identical slug generation logic. Test every winery URL matches. Some wineries have explicit `slug` fields, some don't — normalize. |
| **`dangerouslySetInnerHTML` for register.html** | XSS risk (low — own content) | Keep as-is, content is self-controlled. Could convert to markdown long-term. |
| **Missing `'use client'` directive** | Runtime error on server | Any file using hooks (useState, useEffect, useContext, useRouter) or browser APIs MUST have `'use client'` |
| **Static file paths change** | Broken images/assets | Next.js `public/` works identically to CRA's. No path changes needed. |
| **Google Places API rate limits during build** | Build timeout | Do NOT call Google Places during build. Keep it as client-side runtime fetch only. |

---

## 10. Dependency Changes

### Remove
```
react-scripts
react-router-dom
react-helmet
react-helmet-async
web-vitals
```

### Add
```
next
@mui/material-nextjs     # MUI App Router adapter
```

### Keep (unchanged)
```
@emotion/react
@emotion/styled
@mui/material
@mui/icons-material
@mui/lab
@react-google-maps/api
@fontsource/roboto
axios
chart.js
chartjs-plugin-datalabels
fuse.js
leaflet
react-leaflet
react-chartjs-2
react-markdown
remark-gfm
remark-breaks
openai
ajv
```

---

## 11. Browser API Audit

Every instance of browser-only code that must be handled for SSR safety:

| File | API | Current Usage | Migration Action |
|------|-----|---------------|-----------------|
| `detectDevice.js` | `navigator.userAgent` | Direct access | Replace with `useMediaQuery` hook or guard with `typeof window` check |
| `HomePage.js` | `window.open()` | External link clicks | OK — in `'use client'` event handler |
| `WineryCard.js` | `window.scrollTo()` | Scroll to top on click | OK — in `'use client'` event handler |
| `GrapeCharts.js` | `window.addEventListener('resize')` | Responsive chart | OK — in `useEffect` inside `'use client'` |
| `GrapeCharts.js` | `window.innerWidth` | Mobile check | Move into `useEffect` or `useState` with SSR default |
| `LmsGrowingConditions.js` | `window.innerWidth` | Accordion default state | Use `useMediaQuery` or init with safe default, update in `useEffect` |
| `FennvilleGrowingConditions.js` | `window.innerWidth` | Same as above | Same fix |
| `LmsHistory.js` | `fetch('/register.html')` | Load HTML content | OK — in `useEffect` in `'use client'`. Or read file at build time in server component. |
| `Wineries.js` | `window.innerWidth` | iframe height | Move to `useState` + `useEffect` in `'use client'` |
| `Wineries.js` | `fetch('/api/googleApiKey')` | Load API key | OK — in `useEffect` in `'use client'` |
| `Wineries.js` | Google Places `fetch()` | Load hours/reviews | OK — in `useEffect` in `'use client'` |
| `AVAs.js` | `L.map()`, Leaflet DOM | Map initialization | Must be in `'use client'` component loaded with `dynamic(..., { ssr: false })` |
| `Layout.js` | `useMediaQuery` (MUI) | Responsive drawer | OK — MUI hook handles SSR gracefully |
| `DrawerContext.js` | `useMediaQuery` + `useLocation` | Drawer default state | Replace `useLocation` with `usePathname` from `next/navigation` |
| `ChatBot.js` | `window`, `document`, `fetch` | Multiple browser APIs | Entire component is `'use client'` — all browser APIs in event handlers or `useEffect` |
