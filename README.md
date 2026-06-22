# Design Inspiration Hub — CodeZyng

A dark-themed (with light mode), CodeZyng-branded design resource hub for design teams. Browse, search, save, and organize 66+ curated design inspiration resources across 9 categories — UI Design, Animation, Color, Icons, Illustration, Typography, Design Systems, AI Tools, and Accessibility.

## File structure

```
design-inspiration-hub/
├── index.html              Main HTML page (structure & markup only)
├── css/
│   └── styles.css          All styling (dark/light theme, layout, components)
├── js/
│   ├── data.js              Resource dataset, team roster, category colors/icons/descriptions
│   └── app.js                App logic: rendering, navigation, search, modal, bookmarks, team chart, notifications
├── images/
│   └── Codezyng-logo.png    Sidebar logo
├── full-single-file.html    Optional all-in-one version (same app, single file, same logo path)
└── README.md
```

## How to run

No build step or server required.

1. Unzip the package, keeping the folder structure intact (`index.html` must sit next to the `css/`, `js/`, and `images/` folders).
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

Or, for local development with live reload, serve it with any static file server, for example:

```
npx serve .
```

then visit the printed local URL.

## Features

- **Dashboard** — featured resources (top rated), trending this week, recently added (instantly reflects new submissions), category pill filtering, and a Team Activity chart showing resources added per teammate.
- **Browse All** — full resource grid with category/pricing filters and sort (most popular, A-Z, top rated). Updates live the moment a resource is added.
- **Categories** — dedicated page per category with live resource counts and sidebar badge counts that update immediately when a new resource is added to that category.
- **Resource detail page** — favicon, description, category/pricing/rating metadata, "Visit website" (opens the real live link), Save, Copy link.
- **Search** — live search across resource name, description, category, and URL, accessible from the top bar on every page.
- **Saved** — toggle save on any card; the Saved page, sidebar badge, and Profile stat all stay in sync immediately, from any page.
- **Add resource** — modal form with a simulated auto-fetch (paste a URL, click "Auto-fetch details" to pre-fill name, description, category, and pricing using keyword heuristics against the domain/URL). On submit, the new resource appears instantly in Browse, its Category page, Recently Added, Trending, the sidebar category badge, and the Team Activity chart — and a notification is broadcast to the whole team.
- **Team & notifications** — every team member can add resources; when anyone adds one, a notification appears in the bell dropdown (top bar) for the whole team, with a "Clear all" action. A dedicated Team page (Settings -> Team settings) lists every member with a resource-count bar chart.
- **Profile & Settings** — real, working preference toggles: Dark mode (switches the whole app theme live), Email notifications, Weekly digest, and Team add-resource alerts. Account actions and a link into the Team page.
- **Light/Dark theme** — toggling "Dark mode" in Settings switches every color token across the app instantly (cards, sidebar, borders, text) using a `data-theme` attribute and CSS variable overrides, no separate stylesheet needed.
- **Accessibility** — semantic landmarks (`nav`, `header`, `main`), ARIA labels and roles on icon-only buttons and toggle switches, visible focus states, keyboard-operable cards and toggles (Enter/Space), live region for toast notifications.
- **Responsive** — grids step down from 4/5 columns to 3, 2, then 1 column across 1280px/1024px/780px breakpoints; sidebar collapses below 780px.
- **Layout** — card grids use a wider 14-16px gap with narrower, denser cards (about 4-5 per row on desktop) for better scannability, consistent with the original CodeZyng spacing system.

## What changed from the previous version

1. Adding a resource now live-updates: its category page, the sidebar category badge count, Recently Added, Browse All, Trending, and the Team Activity chart, all in the same click.
2. Saving/un-saving a resource now reliably syncs the Saved page, sidebar badge, and Profile "Resources saved" stat regardless of which page you're on.
3. The Collections feature (nav item, page, and "Add to collection" button) has been fully removed.
4. Any team member can add a resource; doing so pushes a notification (bell icon, top bar) visible to the whole team, with a count indicator dot.
5. Card grids now have larger gaps (14-16px) and narrower card columns (4-5 per row) across Featured, Recently Added, Trending, Browse, Category, and Saved sections.
6. Settings toggles are now fully functional: Dark/Light mode actually switches the theme; Email notifications, Weekly digest, and Team alerts toggle real state with toast confirmation.
7. A new "Team Activity - Resources Added" bar chart on the Dashboard, plus a full Team page, shows how many resources each member has contributed, sorted highest to lowest.
8. All spacing/alignment was preserved from the original CodeZyng design system, only the items above were changed; colors, fonts, card styles, borders, and component shapes are untouched.

## Data

All 66+ resources are real, live links (Awwwards, Mobbin, GSAP, Framer, Coolors, Lucide, unDraw, Google Fonts, Material Design 3, shadcn/ui, v0, Lighthouse, WCAG guidelines, and more). Card thumbnails use each site's real favicon (fetched via Google's favicon service) with an initial-letter fallback if a favicon fails to load (e.g. when offline).

## Customizing

- **Add/edit resources**: edit the `DATA` array in `js/data.js`. Each entry needs `id`, `name`, `url`, `desc`, `cat`, `price` (`Free` / `Freemium` / `Paid`), `rating`, and `addedBy` (a team member id from `TEAM`).
- **Add/edit team members**: edit the `TEAM` array in `js/data.js`. Each member needs `id`, `name`, `role`, `color`, `initials`, and optionally `isCurrentUser: true` for the logged-in person.
- **Add a category**: add an entry to `CC` (color), `CI` (Font Awesome icon class), and `CD` (description) in `js/data.js`, then add a matching sidebar button (with a `data-cat` attribute) and category pill in `index.html`.
- **Theme colors**: all colors are CSS variables at the top of `css/styles.css` (`:root { --bg, --accent, --text, ... }` for dark, `html[data-theme="light"] { ... }` for light).

## Notes

- The favicon fetch and the "Auto-fetch details" feature in the Add Resource modal are client-side simulations for this prototype, wire them to a real backend/API (e.g. a metadata-scraping endpoint) for production use.
- Notifications, saved state, theme preference, and team activity counts are all in-memory for the current session (no backend/database), refreshing the page resets them to the seeded defaults. Wire up a backend (e.g. a small REST API + database) to persist these across sessions and real users.
- No external JS framework is used, plain HTML/CSS/JavaScript, with Font Awesome loaded from a CDN for icons.
