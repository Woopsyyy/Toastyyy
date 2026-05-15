# Toasty — Premium Frontend Ecosystem

Toasty is a fully frontend-only modern SaaS platform for React developers to build stunning analytics dashboards, charts, and UIs instantly.

## Features

- **Component System:** 50+ plug-and-play React components.
- **Charts Library:** Animated area, bar, line, and pie charts with Recharts.
- **Motion UI:** Premium animations with Framer Motion.
- **Dashboard Templates:** Admin panels, SaaS dashboards, CRM templates.
- **Playground:** Interactive component and layout preview.
- **Authentication:** Fully integrated Supabase auth (Login, Register, Forgot Password).
- **Theme Engine:** CSS-variable based light, dark, and glassmorphism themes.

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Vite**
- **Framer Motion**
- **Recharts**
- **Supabase Authentication**
- **Lucide Icons**

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Database Setup**
   Run the SQL provided in `supabase.txt` in your Supabase SQL Editor.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Pages Overview

- **Home:** Animated landing page with product showcases.
- **Docs:** Sidebar navigation with code blocks and tutorials.
- **Components:** Live previews of all UI elements with "Copy Code" buttons.
- **Playground:** Interactive workspace for charts and widgets.
- **Templates:** Dashboard layouts and full-page examples.
- **Pricing:** SaaS pricing tiers.
- **Blog & Changelog:** Content marketing structure.
- **Dashboard (Protected):** Real user dashboard behind Supabase Auth.
- **Login / Register:** Auth flows.

## Architecture

- `/src/components` - UI primitives and composite sections
- `/src/pages` - Routable page components
- `/src/layouts` - Main layout and dashboard specific layout
- `/src/providers` - Supabase Auth Context
- `/src/styles` - Tailwind and global CSS tokens
- `/src/animations` - Framer motion variants
- `/src/utils` - Helpers

Built for Vercel, Netlify, and Cloudflare Pages.
