# NXT LEVEL GAMING ESCAPE — XHAW5112 University Project

Welcome to **NXT LEVEL GAMING ESCAPE**, a premier SME gaming lounge and esports arena located in Johannesburg, South Africa. This repository contains the complete digital presence: a responsive website deployable via GitHub Pages, and a cross-platform mobile app built with React Native (Expo) plus a Kotlin Android implementation.

---

## Project Description

NXT LEVEL GAMING ESCAPE is a gaming business offering full-day LAN events, VR arena adventures, competitive esports tournaments, family game nights, and a professional streaming studio. The digital platform allows customers to browse gaming packages, build a booking with live discount calculation, and request a booking — all with a futuristic neon-gaming aesthetic.

The platform demonstrates a complete web and mobile development workflow for the XHAW5112 module, covering user experience design, front-end development, business logic implementation, testing, and documentation.

---

## Features

### Website (`index.html` + `style.css` + `script.js`)
- Responsive black-and-white single-page site (#0B0B0B background)
- Fixed black header with the supplied monochrome logo, navigation, and white "Book Now" button
- Hero section: "Enter the Game. Escape Reality." with silver highlight and dual CTAs
- 5 gaming package cards with white price badges, silver borders, and "Add to Booking" buttons
- Arena showcase section with equipment highlights
- Live booking & quotation section with cart, remove buttons, and real-time discount calculation
- Contact section with location, hours, and contact details
- Trailer modal placeholder
- Honeycomb hex pattern background with subtle silver glow effects
- Fully mobile-responsive with hamburger menu

### Mobile App (`mobile-app/App.js`)
- React Native Expo app with same dark gaming theme
- FlatList of all 5 gaming packages with cards matching website design
- Live quotation summary with same discount logic as the website
- Add/remove booking functionality
- Bottom navigation: Explore | Packages | Cart | Profile
- Booking confirmation via Alert dialog
- Runnable with `npx expo start`

### Kotlin Android (`mobile-app/MainActivity.kt`)
- Programmatic UI matching the same theme and discount logic
- Same 5 packages, cart management, and quotation display
- Booking confirmation via Toast notification

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Website | HTML5, CSS3, JavaScript (vanilla) |
| Mobile App | React Native (Expo) |
| Android Native | Kotlin |
| Fonts | Montserrat (Google Fonts) |
| Deployment | GitHub Pages |

---

## Module Outcomes

### MO01 — Roles and Responsibilities
This project demonstrates the roles within a software development team:
- **Frontend Developer**: Builds the website UI (HTML/CSS/JS) and React Native app
- **UI/UX Designer**: Designs the gaming-themed interface, color scheme, and user flow
- **Mobile Developer**: Implements the React Native and Kotlin Android apps
- **QA/Tester**: Tests the booking cart and discount logic across edge cases
- **Project Manager**: Coordinates deliverables and documentation

### MO02 — UX Design
- **Color scheme** (matched to the supplied monochrome logo):
  - Background: `#0B0B0B` (near-black)
  - Header/Footer: `#000000` (black)
  - Card/secondary surface: `#171717` (graphite)
  - CTA/Prices: `#FFFFFF` (white)
  - Borders/Highlights: `#D9D9D9` (silver)
  - Text: `#FFFFFF` (white)
- **Typography**: Montserrat Bold — futuristic gaming aesthetic
- **Logo**: Supplied black-and-white silhouette image used across the website branding
- **Visual style**: Honeycomb hex pattern background, restrained silver glow effects, and card-based layout
- **UX principles**: Clear visual hierarchy, progressive disclosure (modal for trailer), responsive design, intuitive cart interaction

### MO03 — Development & Testing
The core business logic is the **booking cart with automatic discount calculation**:

| Bookings | Discount Rate |
|----------|--------------|
| 1 | 0% |
| 2 | 5% |
| 3 | 10% |
| 4+ | 15% |

**Formula:** `total = subtotal × (1 − discountRate)`

The quotation display shows:
- Subtotal (sum of all selected packages)
- Bookings count
- Discount rate (auto-calculated)
- Discount amount (in red)
- Total quote (in large silver font)

This logic is implemented identically in three places:
1. `script.js` — `getDiscountRate()` + `calculateQuote()` (website)
2. `mobile-app/App.js` — `getDiscountRate()` + `calculateQuote()` (React Native)
3. `mobile-app/MainActivity.kt` — `getDiscountRate()` + `calculateQuote()` (Kotlin)

**Testing scenarios:**
- Add 1 package → 0% discount, total = subtotal
- Add 2 packages → 5% discount applied
- Add 3 packages → 10% discount applied
- Add 4+ packages → 15% discount applied
- Remove a package → discount recalculates automatically
- Request booking with empty cart → warning message
- Request booking with items → confirmation message with savings

### MO04 — Reflection
This project provided hands-on experience in:
- Translating a brand identity (colors, logo concept) into a functional digital product
- Implementing business rules (discount logic) consistently across web and mobile platforms
- Designing a cohesive user experience with a gaming aesthetic
- Managing a multi-platform codebase (HTML/CSS/JS, React Native, Kotlin)
- Understanding the deployment workflow for static sites (GitHub Pages) and mobile apps (Expo)

Key learnings include the importance of consistent design systems across platforms, the value of separating business logic for testability, and the practical challenges of responsive design for gaming interfaces.

### MO05 — Documentation
This README serves as the primary documentation, covering:
- Project description and features
- Technology stack
- Module outcomes mapping
- Setup and run instructions for all platforms
- Deployment instructions for GitHub Pages

---

## How to Run the Website

### Option 1: Open directly
1. Download/clone this repository
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari)

### Option 2: GitHub Pages (live deployment)
1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select the `main` branch and `/ (root)` folder
4. Click **Save**
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`

Since `index.html` is at the repository root, GitHub Pages works immediately with no build step.

---

## How to Run the Mobile App (React Native / Expo)

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo Go app on your phone (or an Android/iOS emulator)

### Steps
```bash
cd mobile-app
npm install
npx expo start
```

Then either:
- Scan the QR code with the **Expo Go** app on your phone
- Press `a` to open in an Android emulator
- Press `i` to open in an iOS simulator
- Press `w` to open in a web browser

---

## How to Run the Kotlin Android App

### Prerequisites
- Android Studio (Hedgehog or later)
- Android SDK (API 24+)

### Steps
1. Create a new Android project in Android Studio (Empty Activity, Kotlin)
2. Replace the contents of `MainActivity.kt` with the file from `mobile-app/MainActivity.kt`
3. Ensure the package name matches: `com.nxtlevelgamingescape`
4. Click **Run** to deploy to an emulator or physical device

---

## GitHub Pages Deployment Instructions

1. Create a new repository on GitHub (e.g., `nxt-level-gaming-escape`)
2. Push all files from this project to the repository root:
   ```bash
   git init
   git add .
   git commit -m "NXT LEVEL GAMING ESCAPE - XHAW5112 project"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nxt-level-gaming-escape.git
   git push -u origin main
   ```
3. Navigate to **Settings → Pages** on your GitHub repository
4. Under **Build and deployment → Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait 1-2 minutes, then access your site at `https://<your-username>.github.io/nxt-level-gaming-escape/`

---

## Repository Structure

```
nxt-level-gaming-escape/
├── index.html              # Website (GitHub Pages root)
├── style.css               # Website styles (dark theme, hex pattern, neon)
├── script.js               # Website JS (cart + discount logic)
├── assets/
│   └── cca9db6c916aa31fb3c0133dbae49526.jpg  # Supplied monochrome logo image
├── mobile-app/
│   ├── App.js              # React Native Expo app
│   ├── MainActivity.kt     # Kotlin Android app
│   └── package.json        # Expo dependencies
├── presentation/
│   └── README.md           # PPTX placeholder
├── README.md               # This file
└── .gitignore              # Node modules, builds, etc.
```

---

## Gaming Packages

| # | Package | Price | Description |
|---|---------|-------|-------------|
| 1 | Ultimate Gaming Day | R1 500 | Full day LAN, PC + Console, VR stations, Tournaments + Snacks |
| 2 | Family Game Night | R1 500 | Co-op + Board Games, up to 6 players, pizza included |
| 3 | VR Arena Adventure | R750 | Immersive VR, multiplayer, 60-min, all gear provided |
| 4 | E-Sports Tournament Entry | R600 | Competitive play, prize pool, teams & solo welcome |
| 5 | Streaming & Content Creation | R800 | Pro studio, overlay & mic, 2-hour streaming slot |

---

## Team Members

| Role | Name | Student Number |
|------|------|---------------|
| Frontend Developer | MZWAKHE MKWANAZI| ST10511465 |
| UI/UX Designer | ZWAKHELE PANZA | ST10539588 |
| Mobile Developer | MZWAKHE MKHWANAZI | ST10511465 |
| QA / Tester | MZWAKHE MKHWANAZI | ST10511465 |
| Project Manager | MASEGO MATLALA | ST10523393 |

---

## License

This project is created for academic purposes as part of the XHAW5112 module at the University of South Africa (UNISA). © 2024 NXT LEVEL GAMING ESCAPE.
