# 🐾 My Pet App — A Colorful Dog Breed Explorer

> A whimsical, colorful, and fully interactive Dog Breed Explorer built with **React 19**, **TypeScript**, and **Vite**, powered by the official **Dog CEO API**. Inspired by playful creative studio designs (notably Kidnichols' vibrant illustrative aesthetic) featuring bubbly typography, pastel palettes, and a retro-modern browser window container.

---

## ✨ Features

- 🐶 **Live Dog CEO API Integration**: Fetches all available breeds and sub-breeds (`https://dog.ceo/api/breeds/list/all`) and displays them in a clean, alphabetical dropdown.
- 📸 **Synchronized Breed Photo Explorer**:
  - Automatically loads a random photo for the selected breed.
  - **Breed Invariance Guarantee**: Clicking **"Fetch Another Photo"** requests another random photo strictly for the currently selected breed—never switching or jumping to another breed unexpectedly!
  - Displays the active breed spotlight title and a photo counter badge (`Breed Photo #N`).
- 🎨 **Playful Design System**:
  - Coordinated pastel palette: Lavender (`#C6A4F5`), Baby Pink (`#FFC3D0`), Sky Blue (`#9DE4F5`), Butter Yellow (`#FFE477`), Mint Green (`#A9E9B0`), with crisp Deep Blue outlines (`#1839D8`).
  - Google Fonts typography: **Fredoka** (large bubbly headings), **Nunito** (interface body copy), and **Baloo 2** (decorative quotes).
  - Whimsical details: bubbly letters with cute cartoon expressions, stars (`✦`), five-petal flowers, and a friendly doghouse landscape banner.
- 📱 **Fully Responsive Layout**:
  - Handcrafted for desktop monitors, laptops, tablets, and mobile devices (tested down to 320px).
  - Responsive navigation bar with mobile hamburger drawer.
  - Zero horizontal overflow.
- ♿ **Accessibility & Motion Preferences**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Visible focus indicators (`:focus-visible`) for complete keyboard navigation.
  - Respects `@media (prefers-reduced-motion: reduce)`.
- 🛡️ **Robust State Management**:
  - Smooth loading overlay with animated bouncing paw and friendly status messages.
  - Graceful error handling with retry capability.
  - Request concurrency locking to prevent duplicate in-flight API calls.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component tree and hooks |
| **TypeScript (~6.0.3)** | Type safety, Dog CEO API data models, and strict checking |
| **Vite 8** | Ultra-fast development server and optimized production bundler |
| **Lucide React** | Clean, accessible iconography |
| **CSS3** | Custom design system, CSS variables, keyframe animations, and media queries |
| **Dog CEO API** | Open canine REST API (`dog.ceo`) |

---

## 📁 Project Architecture

```text
My-Pet-APP_Jesoro/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   └── vite.svg
│   ├── components/
│   │   ├── About.tsx             # "Made for People Who Love Dogs" mission & feature cards
│   │   ├── BreedSelector.tsx     # Accessible dropdown combo selector
│   │   ├── DecorativeHeader.tsx  # Bubbly "MY PET APP" letters with playful faces & flowers
│   │   ├── DogExplorer.tsx       # Core explorer section, state management & fetch logic
│   │   ├── DogImage.tsx          # Photo display frame, loading overlays, and error states
│   │   ├── FeaturedBreeds.tsx    # Curated spotlight breed cards with direct explorer links
│   │   ├── Footer.tsx            # Playful footer with API credits and back-to-top button
│   │   ├── Hero.tsx              # Whimsical illustration strip, headline, badges, and CTA
│   │   └── Navbar.tsx            # Responsive navigation with mobile menu drawer
│   ├── services/
│   │   └── dogApi.ts             # Dog CEO API client, endpoints, and name formatting
│   ├── types/
│   │   └── dog.ts                # TypeScript interfaces and API payload types
│   ├── App.css                   # Component styling, layouts, and responsive breakpoints
│   ├── App.tsx                   # Main application layout and section composition
│   ├── index.css                 # Global design system, CSS variables, and resets
│   └── main.tsx                  # React DOM entry point
├── eslint.config.js              # ESLint configuration with TypeScript-ESLint & React Hooks
├── index.html                    # HTML5 shell with Google Fonts links
├── package.json                  # Dependencies and scripts (resolved TypeScript peer conflict)
├── tsconfig.json                 # TypeScript project configuration
└── vite.config.ts                # Vite React plugin configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+ recommended) and **npm** installed.

### 2. Installation
Install the project dependencies (dependency conflict between `typescript` and `typescript-eslint` has been resolved with compatible `typescript@~6.0.3`):
```bash
npm install
```

### 3. Running Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 4. Code Quality & Linting
Run ESLint to check for code standards and syntax validity:
```bash
npm run lint
```

### 5. Production Build
Compile TypeScript and bundle the application for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📋 Git Commit History

The project was developed methodically across exactly **10 meaningful Git commits**:

1. `chore: initialize and prepare my pet app project` — Inspected existing files, resolved the TypeScript dependency conflict (`typescript@~6.0.3`), configured Git identity, and verified initial setup.
2. `style: establish colorful my pet app design system` — Defined CSS custom properties for the pastel palette, typography (Fredoka, Nunito, Baloo 2), borders, shadows, and base layout.
3. `feat: create playful header and responsive navigation` — Built the bubbly decorative header with letter expressions and the responsive navigation bar with mobile toggle.
4. `feat: add colorful pet-themed hero section` — Implemented the whimsical illustration banner, headline, value badges, and call-to-action button.
5. `feat: integrate dog ceo api and breed data` — Created the `dogApi.ts` service, defined TypeScript interfaces, handled breed name formatting, and set up error handling.
6. `feat: implement breed selection and dog image explorer` — Built the `BreedSelector`, `DogImage`, and `DogExplorer` components to load breeds and show selected photos.
7. `feat: add breed-specific random dog image fetching` — Implemented the **Fetch Another Photo** button with strict breed locking, concurrency protection, and photo counters.
8. `feat: add featured breeds about section and footer` — Created spotlight breed cards with live photos, the "Made for People Who Love Dogs" section, and the comprehensive footer.
9. `style: polish responsive layout animations and interactions` — Refined mobile/tablet breakpoints, added custom scrollbars, enhanced accessibility focus rings, and removed legacy unused components.
10. `test: finalize dog explorer and verify production build` — Tested Shih Tzu and multiple breeds, verified error and loading states, confirmed ESLint passes with 0 errors, and completed production build.

---

## 👤 Author & Git Configuration

- **Developer**: Dianne Jesoro
- **GitHub Username**: `diannejesoro08-cloud`
- **GitHub Email**: `diannejesoro08@gmail.com`

---

*Enjoy exploring adorable dog breeds on My Pet App! 🐶❤️*
