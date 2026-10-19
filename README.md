# 🎬 3D Office Lobby + Hacking World Portfolio

Ek 3D portfolio. Pehle ek **realistic office lobby** me ek 3D person **walk karke aata hai**,
**reception par khada ho jaata hai** (wapas nahi jaata) aur aapse poochta hai kya dekhna hai.
Jab aap koi option select karte ho → ek **glitch effect** ke saath camera office ke andar ek
neon **"HACKING WORLD"** me chala jaata hai (matrix rain, code screens, neon grid) jahan content
ek cool **hacker-terminal** style me dikhta hai. Ek **"← Lobby"** button se wapas reception par aa jaate ho.

---

## ✨ Kya kya hai isme
- 🏙️ **Office Lobby** (daylight): wooden floor, glass windows, plants, sofa, reception desk — aur ek **3D person** jo realistically walk karke reception par ruk jaata hai
- 🕶️ **Hacking World** (neon): matrix-rain wall, glowing grid, neon pillars, aur **hacking/coding/SQL screens**
- 🎥 **Cinematic fixed camera** (koi 360 drag nahi) — apne aap halka sway karta hai, world switch par smooth
- 💬 **Speech bubble** reception par: "Aap kya dekhna chahenge?" → About / Skills / SE Concepts / Projects / Contact
- 📘 **SE Concepts**: SDLC, Requirement Analysis, Waterfall, Agile, Spiral, V-Model, Prototype, RAD, Incremental, Verification vs Validation
- 🤖 **AI Assistant** (Hindi + English): ab **har skill ke baare me** bhi batata hai (HTML, CSS, Java, SQL, Python, C++, Git, SE) + boss/company/projects/contact + **tool install commands** (+ copy button)
- 🎨 Warm lobby UI + neon hacker-terminal content, fully responsive

---

## 🚀 Kaise chalaye (2 tarike)

### Tarika 1 — Sabse aasan (koi install nahi)
1. `index.html` par **double-click** karo.
2. Browser me khul jayega. Bas! 🎉

> Enter Portfolio button dabao → 3D person chalega.

### Tarika 2 — Local server (agar double-click se 3D na chale)
Kuch browsers `file://` par 3D/CDN ko thoda restrict karte hai. Agar aisa lage:
- VS Code me **"Live Server"** extension install karo aur `index.html` par right-click → *Open with Live Server*.

---

## 🌐 GitHub Pages par kaise upload kare (click-to-open link)
1. GitHub par nayi repository banao (jaise `portfolio`).
2. Ye saari files upload karo (`index.html`, `css/`, `js/`, `data/`).
   - GitHub website par: **Add file → Upload files** → sab files drag karo → Commit.
   - Ya git se: `git add .` → `git commit -m "portfolio"` → `git push`.
3. Repository me **Settings → Pages** jao.
4. **Branch: `main`** aur folder `/root` select karo → **Save**.
5. 1-2 minute me link ban jayega:
   `https://<your-username>.github.io/<repo-name>/`
6. Us link par click karte hi portfolio khul jayega. ✅

---

## ✏️ Apni information kaise badle
Sab kuch **`data/content.js`** me hai. Usko kholo aur apne hisaab se badlo:
- `name`, `role`, `tagline` — aapka naam/role
- `about[]` — apne baare me
- `skills[]` — skills aur level (%)
- `projects[]` — apne projects (title, desc, tags, link)
- `contact{}` — email, GitHub, LinkedIn, Twitter
- `tools[]` — Assistant kaun se install commands bataye (aap aur bhi add kar sakte ho)

File save karke browser refresh kar do — ho jayega. 🎯

---

## ⚠️ Ek zaroori baat (security)
Browser (website) kisi visitor ke computer par khud koi software **install nahi kar sakta** —
yeh ek security rule hai, koi bhi website aisa nahi kar sakti (aur nahi karni chahiye).
Isliye Assistant **command dikhata hai + copy button** deta hai, jise visitor copy karke
khud chala sakta hai. Yehi sahi aur safe tarika hai.

---

## 🛠️ Istemal hui technologies
- **Three.js** (CDN se — koi install/build nahi)
- Pure **HTML + CSS + JavaScript**
- Google Fonts (Orbitron + Poppins)

---

Banaya gaya ❤️ se. Koi sawaal ho to Assistant se poocho!
