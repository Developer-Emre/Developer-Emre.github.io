# Developer Emre Portfolio

A personal portfolio website. This React, TypeScript, and Vite-based project presents experience, projects, skills, and contact sections in a modern single-page layout.

Live site: https://developer-emre.github.io

## Features

- Type-safe interface development with React 19 + TypeScript
- Fast development workflow and optimized build process with Vite
- Component-based architecture (sections, layout, components)
- Smooth transitions and animations with Framer Motion
- Theme management with ThemeContext
- Contact form integration with EmailJS

## Technology Stack

- React
- TypeScript
- Vite
- Framer Motion
- React Icons
- Tailwind CSS
- ESLint

## Getting Started

### Requirements

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Build Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  components/  # Reusable UI components
  context/     # Theme management and related hooks
  data/        # Portfolio content and static data sources
  layout/      # Page shell (Navbar, Footer, RootLayout)
  lib/         # Utility library code (animation, analytics)
  sections/    # Page sections (Hero, About, Experience, Projects...)
```

## Scripts

- npm run dev: Starts the Vite development server.
- npm run build: Runs TypeScript compilation, then creates a production build.
- npm run preview: Serves the build output locally in preview mode.
- npm run lint: Runs ESLint for code quality checks.

## Content Updates

Portfolio texts, projects, and profile information are managed from this file:

- src/data/portfolio.ts

## Contact

- GitHub: https://github.com/developer-emre
- LinkedIn: https://linkedin.com/in/emresarigul
- Email: emre-sarigul@outlook.com
