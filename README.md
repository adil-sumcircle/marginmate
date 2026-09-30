# MarginMitra

Mobile-first seller profit calculator using React, Vite, TypeScript, Tailwind CSS, Framer Motion and Phosphor Icons.

Run locally: npm install, then npm run dev.
Build: npm run build. Preview: npm run preview.
Netlify: build command npm run build; publish directory dist. Settings are included in netlify.toml.

Features: costs-first calculator, discount percentage, profit and margin, optional target-profit planner, local saved entries, sharing, custom delete confirmation, Calculator/Saved/Guide navigation, reduced-motion-aware animations.

Saved data uses the original marginmate-calculations local storage key. It stays in the browser and origin where saved; switching domains or ports does not transfer entries.

Source: src/App.tsx, src/calculator.ts and src/index.css. No backend or paid API needed.
