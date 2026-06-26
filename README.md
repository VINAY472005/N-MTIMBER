<<<<<<< HEAD
# 🪵 TimberIndia — Wood Business Website

Premium B2B wood marketplace website for pan-India timber business.
Built with **React + Vite**.

---

## 🚀 Quick Start (3 Steps)

### Step 1 — Install Node.js (if not installed)
Download from: https://nodejs.org  
Choose **LTS version** → install it.

### Step 2 — Install dependencies
Open this folder in VS Code terminal and run:
```bash
npm install
```

### Step 3 — Start the website
```bash
npm run dev
```

✅ Website opens automatically at **http://localhost:3000**

### Optional — Start frontend and backend together
```bash
npm run dev:all
```

This runs the Vite frontend and the email inquiry backend together. The backend listens on **http://localhost:4000** and the app proxies `/api` requests to it.

---

## 📁 Project Structure

```
timber-india/
├── index.html              ← Main HTML file
├── package.json            ← Dependencies
├── vite.config.js          ← Dev server config (port 3000)
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← Root component
    ├── index.css           ← Global styles + CSS variables
    ├── data.js             ← All products, categories, data
    ├── Navbar.jsx/.css     ← Fixed top navigation
    ├── Hero.jsx/.css       ← Landing hero section
    ├── Categories.jsx/.css ← 8 wood categories grid
    ├── Catalog.jsx/.css    ← Product listing + filters
    ├── WhyContact.jsx/.css ← Why Us + Contact/Inquiry form
    └── Footer.jsx/.css     ← Footer with links
```

---

## 🌐 Pages / Sections

| Section      | Description                                      |
|-------------|--------------------------------------------------|
| **Hero**     | Landing banner, stats, CTA buttons               |
| **Categories** | 8 wood categories (Planks/फंटे, Gutke/गुटके etc.) |
| **Catalog**  | 12 products with filters, prices, inquiry button |
| **Why Us**   | 6 USP cards (Pan-India, Quality, Bulk pricing)   |
| **Contact**  | Inquiry form with state dropdown, product select |
| **Footer**   | Links, branding, India badge                     |

---

## 🛠 Available Commands

| Command             | Action                                           |
|--------------------|--------------------------------------------------|
| `npm run dev`      | Start dev server at port 3000                    |
| `npm run dev:all`  | Start frontend and backend together              |
| `npm run build`    | Build for production                             |
| `npm run preview`  | Preview production build                         |

---

## ✏️ How to Edit

**Add a new product** → open `src/data.js` → add entry in `products` array

**Change phone/email** → open `src/WhyContact.jsx` → find the `c-row` section

**Change business name** → search "TimberIndia" across all files

**Add more states** → open `src/data.js` → add to `states` array

---

## 📦 Tech Stack

- **React 18** — UI components
- **Vite 8** — Dev server & bundler  
- **CSS Modules** — Scoped styling per component
- **Google Fonts** — Playfair Display + DM Sans

---

Made with ❤️ for your Father's wood business 🪵
=======
# N-MTIMBER
It is based on my personal project
>>>>>>> 4cbbd84d24a21101154b11ff233fa746c56df091
