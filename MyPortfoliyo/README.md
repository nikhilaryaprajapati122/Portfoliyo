# 🌌 Nikhil Arya Prajapati — Portfolio

A modern, animated single-page portfolio with a **dark cyber-neon** aesthetic.
Built with vanilla HTML, CSS, and JavaScript — featuring a Three.js particle
field, GSAP scroll animations, glassmorphism cards, a custom glowing cursor,
and a cursor-following spotlight effect. No build step or install required.

**Live preview:** open `index.html` in any modern browser (internet needed for CDN libraries & fonts).

---

## ✨ Features

- **3D Particle Background** — 3,200-particle WebGL network (Three.js) that reacts to mouse movement and page scroll
- **Preloader** — neon ring loading animation on entry
- **Custom Cursor** — glowing ring + dot cursor with hover scaling (desktop)
- **Typewriter Hero** — rotating roles animated with Typed.js
- **Scroll Animations** — staggered section reveals, letter-spacing title effects, and animated stat counters (GSAP ScrollTrigger)
- **Glassmorphism Cards** — frosted-glass skill, project, and timeline cards with **3D tilt** and **cursor spotlight** effects
- **Skill Chips** — glowing, shimmer-on-hover technology pills (percentage-free)
- **Marquee Ticker** — infinite scrolling technology strip
- **Timeline** — glowing education journey with pulsing dots
- **Gurukul Roots** — dedicated golden-themed block celebrating traditional training: lathi chalana, dand-baithak, yoga, boxing, mallakhamb, aatma gyan, sanskaar & Vedic knowledge
- **Achievements** — medal cards (gold/bronze) showcasing national, state & district honors in boxing, kabaddi & yoga, plus a golden achievement marquee
- **Fully Responsive** — mobile hamburger menu and three breakpoints
- **Accessible** — respects `prefers-reduced-motion`

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, backdrop-filter, animations) |
| Interactivity | Vanilla JavaScript (ES6) |
| 3D Graphics | [Three.js](https://threejs.org/) r128 |
| Animations | [GSAP](https://gsap.com/) + ScrollTrigger |
| Typewriter | [Typed.js](https://typedjs.dev/) |
| Fonts | Google Fonts — Poppins, Fira Code |

All libraries load from CDNs — nothing to install.

## 📁 Project Structure

```
MyPortfoliyo/
├── index.html    # Page structure & content
├── style.css     # Theme, layout, animations, responsive rules
├── script.js     # 3D background, scroll effects, interactions
└── README.md     # Documentation (this file)
```

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser — that's it.

Optional local development server:

```bash
# VS Code: install the "Live Server" extension → click "Go Live"
# or with Node:
npx serve .
```

> **Note:** An internet connection is required for CDN libraries and Google Fonts.

## ✏️ Customization Guide

Edit **`index.html`** to update content:

| What | Where |
|---|---|
| Name / logo | Hero `h1`, navbar `.logo` |
| Typewriter roles | `script.js` → `Typed(...)` strings array |
| About text & stats | `#about` section (`data-count` values) |
| Skills | `#skills` — edit `.skill-chips` pills |
| Projects | `#projects` — `.project-card` blocks |
| Education | `#timeline` — `.timeline-item` blocks |
| Gurukul background | `#timeline` — `.gurukul` block (`.gurukul-card` items) |
| Achievements | `#achievements` — `.medal-card` blocks & badges |
| Contact info | `#contact` — email, social links |
| Social URLs | Hero, contact, and footer links |

Colors are defined once in **`style.css`** under `:root` (`--neon-1`, `--neon-2`, `--neon-3`).

## 🌐 Deployment

**Netlify (easiest):**
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop this folder onto the deploy zone
3. Your live URL is ready

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin <your-repo-url>
git push -u origin main
# Repository → Settings → Pages → Source: main branch → Save
```

## 📬 Contact

- **Email:** [nikhilaryaprajapati122@gmail.com](mailto:nikhilaryaprajapati122@gmail.com)
- **GitHub:** [github.com/nikhilaryaprajapati122](https://github.com/nikhilaryaprajapati122)
- **LinkedIn:** [Nikhil Arya Prajapati](https://www.linkedin.com/in/nikhil-arya-prajapati-45a154433/)
- **Instagram:** [@__computer__world](https://instagram.com/__computer__world)

---

### 📝 Notes
- The contact form is a front-end demo (no backend). For real submissions, connect [Formspree](https://formspree.io) or a custom API.
- © 2026 Nikhil Arya Prajapati. All rights reserved.
