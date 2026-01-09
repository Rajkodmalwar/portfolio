Raj Kodmalwar – Portfolio

A modern, responsive personal portfolio built with React and Vite, featuring interactive Three.js visuals, smooth animations, and a clean UI.
Deployed using GitHub Pages with a custom domain.

🔗 Live: https://rajkodmalwar.me

Tech Stack

React 18

Vite

Three.js

@react-three/fiber

@react-three/drei

Framer Motion

Tailwind CSS

Features

Interactive 3D signature animation using Three.js

Smooth UI transitions and animations

Fully responsive (mobile, tablet, desktop)

Fast builds and optimized assets via Vite

Custom domain with HTTPS

Clean, minimal design focused on readability

Project Structure (Source)
react-portfolio-raj-final/
├── src/                # React source code
├── public/             # Static assets
├── index.html          # Vite entry HTML
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js
├── package.json

Local Development
Prerequisites

Node.js ≥ 16

npm

Install dependencies
npm install

Run locally
npm run dev


App runs at:

http://localhost:5173

Production Build
npm run build


Vite generates a production build in:

dist/

Deployment

This project is deployed using GitHub Pages with a custom domain.

Key deployment rules followed:

vite.config.js uses:

base: "/"


(required for custom domains)

Only the production build output is served by GitHub Pages

Asset paths are handled automatically by Vite

HTTPS is enforced via GitHub Pages

Common Pitfalls Avoided

No hard-coded /assets/index-*.js in source index.html

No /portfolio base path when using a custom domain

No mixing of source files and build output

No manual editing of generated build files

License

This project is for personal portfolio use.

Author

Raj Kodmalwar
Full-Stack Developer | AI & Systems Enthusiast
