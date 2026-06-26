# The Olivet Circle — Website

## Folder Structure
```
olivet-circle/
├── index.html        ← Page content
├── css/styles.css    ← All design & colours
├── js/main.js        ← All interactive behaviour
├── images/           ← Drop your photos here
└── README.md         ← This file
```

---

## ⚙️ Quick Setup (3 things to fill in)

Open `js/main.js` and fill in the SETTINGS block at the top:

```js
const SETTINGS = {
  whatsappNumber: "6591234567",        // ← your number, no spaces
  whatsappMessage: "Hi Carol, ...",    // ← pre-filled message
  formspreeId: "YOUR_FORM_ID",         // ← from formspree.io
  calendlyUrl: "https://calendly.com/YOUR_LINK", // ← from calendly.com
};
```

---

## 📧 Formspree Setup (Enquiry Form)
1. Go to https://formspree.io → Sign up free
2. Click "New Form" → name it "Olivet Circle Enquiry"
3. Copy the 8-character ID from the form URL
4. Paste it into SETTINGS.formspreeId in main.js

---

## 📅 Calendly Setup (Appointments)
1. Go to https://calendly.com → Sign up free
2. Set your availability and create event types
3. Copy your profile URL (e.g. calendly.com/carol-olivetcircle)
4. Paste it into SETTINGS.calendlyUrl in main.js

---

## 📸 Adding Photos

### Hero background
In `css/styles.css` find "HERO BACKGROUND IMAGE" and change:
```css
/* Replace gradient with: */
background:
  linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.45)),
  url('../images/hero-bg.jpg') center/cover no-repeat;
```

### Carol's photo
In `index.html` find `carol-img-placeholder` and replace with:
```html
<div class="carol-photo-wrap">
  <img src="images/carol.jpg" alt="Carol Chin" class="carol-photo">
</div>
```

---

## 🚀 GitHub + Netlify Deployment

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial website"
git remote add origin https://github.com/YOUR_USERNAME/olivet-circle.git
git push -u origin main
```

### Deploy on Netlify (free)
1. Go to https://netlify.com → Sign up
2. Click "Add new site" → "Import from Git"
3. Connect your GitHub and select olivet-circle repo
4. Click Deploy — live in 60 seconds
5. Connect your domain in Site Settings → Domain Management

---

## ✏️ Easy Edits

| What to change | Where |
|---|---|
| Colours | `css/styles.css` → `:root` variables at top |
| Phone / WhatsApp | `js/main.js` → SETTINGS |
| Formspree ID | `js/main.js` → SETTINGS |
| Calendly link | `js/main.js` → SETTINGS |
| Hero background photo | `css/styles.css` → .hero |
| Carol's photo | `index.html` → carol-img-placeholder |
| Any text content | `index.html` → find the section |
