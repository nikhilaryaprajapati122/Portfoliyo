<div align="center">

# 🌌 Nikhil Arya Prajapati — Portfolio

**A modern, dark neon-themed personal portfolio website**  
built with pure HTML, CSS & JavaScript — zero dependencies, zero build tools.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/nikhilaryaprajapati122)

**Live Demo →** [GitHub Pages](https://nikhilaryaprajapati122.github.io) *(after deployment)*

</div>

---

## 📖 Overview

This is a fully dynamic, single-page portfolio that showcases my work as an aspiring **Full Stack Java Developer**. Every section — from skills to projects — is rendered from a single data file, so the entire site can be rebranded in minutes without touching a line of markup.

The UI follows a **dark glassmorphism** design language with neon cyan/purple/pink accents, smooth micro-animations, and a fully responsive layout.

---

## ✨ Features

### 🎬 Entrance & Background
- **Smart preloader** with triple failsafes (load event, timeout, and error handler) — never gets stuck
- **Particle network canvas** with connecting lines
- Animated gradient **orbs**, grid overlay, and mouse **cursor glow**

### 🧑‍💻 Hero Section
- Gradient neon headline with animated **typewriter roles**
- Circular profile photo with a **rotating neon conic ring** and pulsing glow
- **Orbiting tech icons** (React · Java · Code) revolving around the photo
- Social links, CTA buttons, and a glowing animated caret

### 📊 Dynamic Content Sections
| Section | Highlights |
|---|---|
| **About** | Bio paragraphs, quick facts, animated 2×2 stat counters |
| **Skills** | Animated progress bars with shimmer effect and gradient percentages |
| **Projects** | Filterable gallery (All / Java / Web / Games) with tilt-on-hover cards |
| **Achievements** | Certificate cards with icon/emoji support |
| **Services** | Grid of service offerings |
| **Contact** | Card-based contact details + validated demo form |

### 🎞️ Animations & UX
- Scroll-reveal transitions, count-up counters, 3D card tilt
- Gradient scroll-progress bar and back-to-top button
- Glassmorphism cards with **animated gradient borders** on hover
- Shine-sweep buttons and heartbeat footer animation
- **Resume viewer** (`resume.html`) with drag-to-pan and scroll-to-zoom

### 📱 Responsive & Accessible
- Mobile-first layout with hamburger navigation
- `prefers-reduced-motion` support and `<noscript>` fallback
- Local fonts & icons — **fully functional offline**

---

## 🛠️ Tech Stack

- **HTML5** · **CSS3** (Custom Properties, Grid, `clamp()`, conic gradients, mask compositing)
- **Vanilla JavaScript (ES6+)** — no frameworks, no libraries
- **Font Awesome 6** (bundled) · **Orbitron / Poppins / Rajdhani** fonts (bundled woff2)

---

## 🚀 Getting Started

**1. Local (quickest)**  
Download or clone the repository, then open `index.html` in your browser.

```bash
git clone https://github.com/nikhilaryaprajapati122/Portfoliyo2.git
cd Portfoliyo2
start index.html      # Windows   ·   open index.html   # macOS / Linux
```

**2. Live Server (recommended while editing)**  
Use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code for auto-reload on save.

**3. Deploy on GitHub Pages (free)**
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, select **Deploy from a branch** → `main` / `(root)` → **Save**.
4. Your site goes live at `https://<username>.github.io/<repo>/` within a minute.

---

## ✏️ Customization — Edit Everything in One File

All content lives in **`js/data.js`** (`window.PORTFOLIO_DATA`). Update it, save, refresh — done.

| Key | What it controls |
|---|---|
| `personal` | Name, typed roles, tagline, photo path, resume URL |
| `about` | Bio paragraphs, quick facts, animated stats |
| `skills` | Skill categories and proficiency levels (0–100) |
| `projects` | Project cards, tags, links, featured flag |
| `services` | Services offered |
| `achievements` | Awards & certificates (Font Awesome class **or** emoji) |
| `contact` | Email, phone, location, social links |

> 💡 **Profile photo:** place a square, face-centered image in `assets/` and point `personal.photo` to it for the cleanest circular crop.

---

## 📂 Project Structure

```
Portfoliyo2/
├── index.html              # Main portfolio page
├── resume.html             # Drag & zoom resume viewer
├── README.md
├── css/
│   └── style.css           # Full theme, animations & responsive rules
├── js/
│   ├── data.js             # ← Edit this file to update your content
│   └── script.js           # Rendering, animations & interactions
└── assets/
    ├── fonts/              # Orbitron, Poppins, Rajdhani (woff2)
    ├── fontawesome/        # Font Awesome 6 (bundled)
    ├── me.png              # Original profile image
    ├── me-face.png         # Face-cropped square version (used on site)
    └── resume.png          # Resume image for the viewer
```

---

## 📬 Contact

**Nikhil Arya Prajapati** — Aspiring Full Stack Java Developer

- 📧 Email: [nikhilaryaprajapati122@gmail.com](mailto:nikhilaryaprajapati122@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/nikhil-arya-prajapati](https://www.linkedin.com/in/nikhil-arya-prajapati-45a154433/)
- 🐙 GitHub: [github.com/nikhilaryaprajapati122](https://github.com/nikhilaryaprajapati122)
- 📸 Instagram: [@__computer__world](https://instagram.com/__computer__world)

---

## 📄 License

Free to use for learning purposes. If this template inspires your own portfolio, a credit in your README is appreciated. © 2025 Nikhil Arya Prajapati.

---

<div align="center">

**Built with ❤️, HTML, CSS & JavaScript**

⭐ *Star this repository if you found it helpful!*

</div>

