# Toastyyy Development Guide

Welcome to the Toastyyy ecosystem! This guide explains how to add new premium components and update the library package for distribution.

## 🏗️ Adding a New Component

Follow these steps to ensure your component follows the Toastyyy design system:

### 1. Create the Component File
Add your component to `src/components/ui/`.
Example: `src/components/ui/PremiumButton.tsx`

```tsx
import React from 'react'
import { motion } from 'framer-motion'

export default function PremiumButton({ children }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="btn-primary"
    >
      {children}
    </motion.button>
  )
}
```

### 2. Export for the Library
To make the component available to users who install Toastyyy as an npm package, you **must** export it from the main entry point:

Open `src/index.ts` and add:
```ts
export { default as PremiumButton } from './components/ui/PremiumButton'
```

### 3. Add to the Showcase (Optional)
To show off your component on the website:
- Add a demo section in `src/pages/ExamplesPage.tsx`.
- Or create a new page in `src/pages/`.

## 📦 Updating the Package

Once you've added and exported your component, you need to rebuild the library to generate the updated distribution files and TypeScript definitions.

### Run the Library Build
```bash
npm run build:lib
```

This will:
1.  Compile your components using `vite.config.lib.ts`.
2.  Generate a production bundle in `dist-lib/`.
3.  Generate TypeScript declaration files (`.d.ts`) so users get full IDE support.

## 🎨 Design Rules
- **Motion**: Use `framer-motion` for all interactions.
- **Styling**: Use Tailwind CSS and the custom CSS variables defined in `src/index.css` (e.g., `var(--brand-500)`, `var(--radius)`).
- **Aesthetics**: Ensure high-fidelity glassmorphism and premium shadows are applied where appropriate.
